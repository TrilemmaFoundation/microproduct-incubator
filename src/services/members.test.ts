import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  convertGoogleDriveUrl,
  fetchTeamMembers,
  removeMiddleName,
} from "./members";

describe("removeMiddleName", () => {
  it("keeps first and last name", () => {
    expect(removeMiddleName("John Michael Doe")).toBe("John Doe");
    expect(removeMiddleName("John Michael David Doe")).toBe("John Doe");
  });

  it("handles two names correctly", () => {
    expect(removeMiddleName("John Doe")).toBe("John Doe");
  });

  it("handles single names", () => {
    expect(removeMiddleName("John")).toBe("John");
  });

  it("handles empty strings", () => {
    expect(removeMiddleName("")).toBe("");
    expect(removeMiddleName("  ")).toBe("  ");
  });
});

describe("convertGoogleDriveUrl", () => {
  it("should convert standard view links", () => {
    const input =
      "https://drive.google.com/file/d/1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB/view?usp=sharing";
    const expected =
      "https://lh3.googleusercontent.com/d/1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB=w500";
    expect(convertGoogleDriveUrl(input)).toBe(expected);
  });

  it("should convert uc?id= links", () => {
    const input =
      "https://drive.google.com/uc?id=1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB";
    const expected =
      "https://lh3.googleusercontent.com/d/1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB=w500";
    expect(convertGoogleDriveUrl(input)).toBe(expected);
  });

  it("should handle raw IDs", () => {
    const input = "1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB";
    const expected =
      "https://lh3.googleusercontent.com/d/1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB=w500";
    expect(convertGoogleDriveUrl(input)).toBe(expected);
  });

  it("returns original URL if not a Google Drive URL", () => {
    expect(convertGoogleDriveUrl("https://example.com/img.png")).toBe(
      "https://example.com/img.png",
    );
  });

  it("handles malformed drive URLs with fallback search", () => {
    expect(
      convertGoogleDriveUrl(
        "https://drive.google.com/some/weird/path/1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB",
      ),
    ).toContain("lh3.googleusercontent.com");
  });
});

describe("fetchTeamMembers", () => {
  let fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("fetches and parses team members correctly", async () => {
    const mockCsv = `Name,Capstone,Project,Contribution,URL,Headshot URL
John Michael Doe,Capstone A,Project X,Code,https://john.com,https://drive.google.com/file/d/1Ed64FNQBA2wY3DEXp4rQGWLBjF7mlbCB/view
Jane Smith,Capstone B,Project Y,Design,,
`;
    fetchMock.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCsv),
    });

    const members = await fetchTeamMembers();
    expect(members).toHaveLength(2);
    expect(members[0].Name).toBe("John Doe"); // removeMiddleName should be called
    expect(members[0].Capstone).toBe("Capstone A");
    expect(members[0]["Headshot URL"]).toContain("lh3.googleusercontent.com");
  });

  it("throws error on failed fetch", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchTeamMembers()).rejects.toThrow(/Failed to fetch/);
  });

  it("returns empty array for empty sheet", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("Name,Capstone,Project,Contribution\n"),
    });

    const members = await fetchTeamMembers();
    expect(members).toEqual([]);
  });

  it("throws error if required columns are missing", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("Wrong,Header,Columns\nData,Data,Data"),
    });

    await expect(fetchTeamMembers()).rejects.toThrow(
      /Required columns not found/,
    );
  });
});
