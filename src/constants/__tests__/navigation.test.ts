import { describe, expect, it } from "vitest";
import { FOOTER_QUICK_LINKS, NAV_ITEMS, SOCIAL_LINKS } from "../navigation";

describe("NAV_ITEMS", () => {
  it("has the expected navigation items", () => {
    expect(NAV_ITEMS).toHaveLength(0);
  });
});

describe("SOCIAL_LINKS", () => {
  it("has 5 social links", () => {
    expect(SOCIAL_LINKS).toHaveLength(5);
  });

  it("each social link has name, href, and fullName", () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.name).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.fullName).toBeTruthy();
    }
  });
});

describe("FOOTER_QUICK_LINKS", () => {
  it("has 0 quick links", () => {
    expect(FOOTER_QUICK_LINKS).toHaveLength(0);
  });
});
