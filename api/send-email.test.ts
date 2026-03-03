import { beforeEach, describe, expect, it, vi } from "vitest";
import handler, { config } from "./send-email";

// Mock the Resend module
const { mockSend } = vi.hoisted(() => {
  return { mockSend: vi.fn() };
});

vi.mock("resend", () => {
  return {
    Resend: vi.fn(
      class {
        emails = {
          send: mockSend,
        };
      },
    ),
  };
});

describe("POST /api/send-email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "test_api_key";
    // Reset rate limit map if possible via valid requests or just use different IPs for tests
  });

  interface MockReq {
    method: string;
    body: Record<string, unknown>;
    headers: Record<string, string | string[] | undefined>;
  }

  interface MockRes {
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  }

  const createReq = (
    body: Record<string, unknown>,
    method = "POST",
    ip = "127.0.0.1",
  ): MockReq => ({
    method,
    body,
    headers: {
      "x-forwarded-for": ip,
    },
  });

  const createRes = (): MockRes => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    return res;
  };

  it("should use nodejs runtime", () => {
    expect(config.runtime).toBe("nodejs");
  });

  it("should return 405 if method is not POST", async () => {
    const req = createReq({}, "GET");
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 400 if required fields are missing", async () => {
    const req = createReq({
      role: "Software Engineer", // Missing name, email, etc.
      submissionTime: 5000,
    });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it("should return 400 for invalid email", async () => {
    const req = createReq({
      name: "Test User",
      email: "invalid-email",
      resume: "http://resume.com",
      github: "http://github.com",
      role: "Dev",
      submissionTime: 5000,
    });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid email address" });
  });

  it("should return 400 for invalid URLs", async () => {
    const req = createReq({
      name: "Test User",
      email: "test@example.com",
      resume: "not-a-url",
      github: "http://github.com",
      role: "Dev",
      submissionTime: 5000,
    });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid URL provided" });
  });

  it("should silently succeed if honeypot is filled", async () => {
    const req = createReq({
      name: "Bot User",
      email: "bot@example.com",
      resume: "http://resume.com",
      github: "http://github.com",
      website: "http://spam-site.com", // Honeypot filled
      submissionTime: 5000,
    });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      id: "spam-filtered",
    });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("should silently succeed if submission is too fast", async () => {
    const req = createReq({
      name: "Fast Bot",
      email: "bot@example.com",
      resume: "http://resume.com",
      github: "http://github.com",
      submissionTime: 100, // < 3 seconds
    });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      id: "spam-filtered-timing",
    });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("should apply rate limiting", async () => {
    const ip = "192.168.1.1";
    const payload = {
      name: "Spammer",
      email: "spammer@example.com",
      resume: "http://resume.com",
      github: "http://github.com",
      role: "Dev",
      submissionTime: 5000,
    };

    const executeRequest = async () => {
      const req = createReq(payload, "POST", ip);
      const res = createRes();
      await handler(req, res);
      return res;
    };

    // Send 5 allowed requests
    for (let i = 0; i < 5; i++) {
      mockSend.mockResolvedValueOnce({ data: { id: `id_${i}` }, error: null });
      const res = await executeRequest();
      // Just checking it didn't fail with 429 yet.
      // It might fail validation mocks if I don't set up mocks perfectly each time,
      // but here we just care about rate limit.
      // To simplify, let's assume validation passes or fails, but NOT 429.
      // Actually, validation runs AFTER rate limit.
      // So if rate limit is hit, we get 429.
      if (res.status.mock.calls[0][0] === 429) {
        throw new Error(`Request ${i} was rate limited unexpectedly`);
      }
    }

    // 6th request should be blocked
    const resBlocked = await executeRequest();
    expect(resBlocked.status).toHaveBeenCalledWith(429);
    expect(resBlocked.json).toHaveBeenCalledWith({
      error: "Too many requests. Please try again later.",
    });
  });

  it("should send email and return 200 on valid request", async () => {
    mockSend.mockResolvedValueOnce({
      data: { id: "email_id_123" },
      error: null,
    });

    const req = createReq(
      {
        name: "Test User",
        email: "test@example.com",
        resume: "http://resume.com",
        github: "http://github.com",
        coverNote: "Hello",
        role: "Software Engineer (Fellow)",
        submissionTime: 5000,
      },
      "POST",
      "10.0.0.1",
    );

    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      id: "email_id_123",
    });

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["matt@trilemma.foundation"],
        subject: "New Application: Software Engineer (Fellow) - Test User",
      }),
    );
  });

  it("should return 500 if Resend returns an error", async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: "Resend API Error" },
    });

    const req = createReq(
      {
        name: "Test User",
        email: "test@example.com",
        resume: "http://resume.com",
        github: "http://github.com",
        role: "Software Engineer (Fellow)",
        submissionTime: 5000,
      },
      "POST",
      "10.0.0.2",
    );

    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Resend API Error" });
  });
});
