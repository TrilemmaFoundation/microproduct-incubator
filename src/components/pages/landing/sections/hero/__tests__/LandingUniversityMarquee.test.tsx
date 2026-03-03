import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingUniversityMarquee from "../LandingUniversityMarquee";

// src/components/pages/landing/sections/hero/__tests__/LandingUniversityMarquee.test.tsx
// __tests__ (1) -> hero (2) -> sections (3) -> landing (4) -> pages (5) -> components (6) -> src
vi.mock("../../../../../../hooks/useCommunityData", () => ({
  useCommunityData: () => ({
    communityData: [
      { university: "University A", country: "USA", latitude: 0, longitude: 0 },
      { university: "University B", country: "UK", latitude: 0, longitude: 0 },
    ],
    loading: false,
  }),
}));

describe("LandingUniversityMarquee", () => {
  it("renders the marquee with university names", () => {
    render(<LandingUniversityMarquee />);
    expect(screen.getAllByText("University A").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getAllByText("University B").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getByText(/from 2 universities/i)).toBeInTheDocument();
  });
});
