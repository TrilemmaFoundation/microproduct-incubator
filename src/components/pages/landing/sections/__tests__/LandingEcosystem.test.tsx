import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingEcosystem from "../ecosystem/LandingEcosystem";

vi.mock("../ecosystem/LandingDatathonCard", () => ({
  // Use a simple component that memo handles fine
  __esModule: true,
  default: () => <div data-testid="datathon-card">Datathon</div>,
}));
vi.mock("../ecosystem/LandingProjectsCard", () => ({
  __esModule: true,
  default: () => <div data-testid="projects-card">Projects</div>,
}));

describe("LandingEcosystem", () => {
  it("renders both cards", () => {
    render(<LandingEcosystem />);
    expect(screen.getByTestId("datathon-card")).toBeInTheDocument();
    expect(screen.getByTestId("projects-card")).toBeInTheDocument();
  });
});
