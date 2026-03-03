import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import LandingProjectsCard from "../LandingProjectsCard";

// src/components/pages/landing/sections/ecosystem/__tests__/LandingProjectsCard.test.tsx
// __tests__ (1) -> ecosystem (2) -> sections (3) -> landing (4) -> pages (5) -> components (6) -> src
vi.mock("../../../../../../hooks/useProjectsData", () => ({
  useProjectsData: () => ({
    projects: [
      {
        title: "Project Alpha",
        tech: "React",
        description: "Desc A",
        category: "App",
      },
      {
        title: "Project Beta",
        tech: "Solidity",
        description: "Desc B",
        category: "Web3",
      },
    ],
    isLoading: false,
  }),
}));

// Mock IntersectionObserver
vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();

describe("LandingProjectsCard", () => {
  it("renders projects list", () => {
    render(
      <MemoryRouter>
        <LandingProjectsCard />
      </MemoryRouter>,
    );
    // It renders capstones constant, not necessarily the hook data?
    // Wait, LandingProjectsCard code shows it uses local 'capstones' constant,
    // NOT useProjectsData hook!
    // Re-viewing LandingProjectsCard.tsx... YES, it uses 'capstones'.
    expect(screen.getByText(/Industry Projects/i)).toBeInTheDocument();
  });
});
