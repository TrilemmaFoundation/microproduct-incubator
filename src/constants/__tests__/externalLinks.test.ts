import { describe, expect, it } from "vitest";
import { EXTERNAL_LINKS } from "../externalLinks";

describe("EXTERNAL_LINKS", () => {
  it("exports all required link keys", () => {
    const expectedKeys = [
      "discord",
      "enrollmentForm",
      "mentorForm",
      "github",
      "twitter",
      "linkedIn",
      "email",
      "stackingSatsTournament",
    ];
    for (const key of expectedKeys) {
      expect(EXTERNAL_LINKS).toHaveProperty(key);
    }
  });

  it("has string values for every link", () => {
    for (const value of Object.values(EXTERNAL_LINKS)) {
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    }
  });

  it("has valid URLs or mailto links", () => {
    for (const value of Object.values(EXTERNAL_LINKS)) {
      expect(value).toMatch(/^(https?:\/\/|mailto:)/);
    }
  });
});
