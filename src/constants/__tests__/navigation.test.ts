import { describe, expect, it } from "vitest";
import { FOOTER_QUICK_LINKS, NAV_ITEMS, SOCIAL_LINKS } from "../navigation";

describe("NAV_ITEMS", () => {
  it("has the expected navigation items", () => {
    expect(NAV_ITEMS).toHaveLength(3);
    const labels = NAV_ITEMS.map((item) => item.label);
    expect(labels).toEqual(["Projects", "Tournaments", "Team"]);
  });

  it("each item has label, icon, and href", () => {
    for (const item of NAV_ITEMS) {
      expect(item.label).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(item.href).toMatch(/^\//);
    }
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
  it("has 4 quick links", () => {
    expect(FOOTER_QUICK_LINKS).toHaveLength(4);
  });

  it("each quick link has label and href", () => {
    for (const link of FOOTER_QUICK_LINKS) {
      expect(link.label).toBeTruthy();
      expect(link.href).toMatch(/^\//);
    }
  });
});
