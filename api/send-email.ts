import { Resend } from "resend";

export const config = {
  runtime: "nodejs",
};

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic types for Vercel Serverless Functions
interface RequestBody {
  name?: string;
  email?: string;
  institutionalEmail?: string;
  personalEmail?: string;
  resume?: string;
  cv?: string;
  github?: string;
  coverNote?: string;
  role?: string;
  website?: string;
  submissionTime?: number;
}

interface VercelRequest {
  method: string;
  body: RequestBody;
  headers: { [key: string]: string | string[] | undefined };
}

interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get IP for rate limiting
    const ip = (req.headers["x-forwarded-for"] as string) || "unknown";

    // Simple in-memory rate limiting (per lambda instance)
    // Note: For robust distributed rate limiting, use Vercel KV or Upstash
    if (isRateLimited(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return res
        .status(429)
        .json({ error: "Too many requests. Please try again later." });
    }

    const {
      name,
      email,
      institutionalEmail,
      personalEmail,
      resume,
      cv,
      github,
      coverNote,
      role,
      website,
      submissionTime,
    } = req.body;

    // Anti-spam checks

    // 1. Honeypot check: If 'website' is filled, it's likely a bot.
    if (website) {
      console.log(`Spam detected: Honeypot field filled. IP: ${ip}`);
      // Silently succeed to fool the bot
      return res.status(200).json({ success: true, id: "spam-filtered" });
    }

    // 2. Time-based check: If submission is too fast (< 3 seconds), it's likely a bot.
    // submissionTime is in milliseconds (duration calculated on client)
    if (!submissionTime || submissionTime < 3000) {
      console.log(
        `Spam detected: Submission too fast (${submissionTime}ms). IP: ${ip}`,
      );
      // Silently succeed
      return res
        .status(200)
        .json({ success: true, id: "spam-filtered-timing" });
    }

    // Determine primary email (prefer institutional, fallback to personal, then generic email)
    const primaryEmail = institutionalEmail || personalEmail || email;

    // Validation
    if (!name || !primaryEmail || !resume || !github || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!isValidEmail(primaryEmail)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!isValidUrl(resume) || !isValidUrl(github)) {
      return res.status(400).json({ error: "Invalid URL provided" });
    }

    if (cv && !isValidUrl(cv)) {
      return res.status(400).json({ error: "Invalid CV URL" });
    }

    const { data, error } = await resend.emails.send({
      from: "Trilemma Careers <careers@opportunities.trilemma.foundation>",
      to: ["matt@trilemma.foundation"],
      replyTo: primaryEmail,
      subject: `New Application: ${role} - ${name}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Role:</strong> ${escapeHtml(role)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Institutional Email:</strong> ${institutionalEmail ? escapeHtml(institutionalEmail) : "N/A"}</p>
        <p><strong>Personal Email:</strong> ${personalEmail ? escapeHtml(personalEmail) : "N/A"}</p>
        <p><strong>Generic Email:</strong> ${email ? escapeHtml(email) : "N/A"}</p>
        
        <h3>Links</h3>
        <p><strong>Resume:</strong> <a href="${escapeHtml(resume)}">${escapeHtml(resume)}</a></p>
        <p><strong>CV:</strong> ${cv ? `<a href="${escapeHtml(cv)}">${escapeHtml(cv)}</a>` : "N/A"}</p>
        <p><strong>GitHub/Portfolio:</strong> <a href="${escapeHtml(github)}">${escapeHtml(github)}</a></p>
        
        <h3>Cover Note</h3>
        <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;">
          ${coverNote ? escapeHtml(coverNote).replace(/\n/g, "<br/>") : "No cover note provided."}
        </blockquote>
        
        <hr/>
        <p style="font-size: 10px; color: #888;">Submitted from IP: ${ip}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Helpers

const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Max 5 requests per IP per 15 mins

function isRateLimited(ip: string): boolean {
  if (ip === "unknown") return false; // Skip if we can't determine IP (local dev sometimes)

  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out old timestamps
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function escapeHtml(text: string): string {
  if (!text) return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
