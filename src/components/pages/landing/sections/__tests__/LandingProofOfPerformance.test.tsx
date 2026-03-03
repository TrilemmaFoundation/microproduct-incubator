import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import LandingProofOfPerformance from "../LandingProofOfPerformance";

// Mock Section to simplify
vi.mock("../../../UI/Section", () => ({
  default: ({ children }: PropsWithChildren) => (
    <section data-testid="ui-section">{children}</section>
  ),
}));

describe("LandingProofOfPerformance", () => {
  it("renders headings and iframe", () => {
    render(<LandingProofOfPerformance />);
    expect(screen.getByText(/Proof of Performance/i)).toBeInTheDocument();
    expect(screen.getByText(/Our mission is to enable/i)).toBeInTheDocument();

    const iframe = screen.getByTitle(/Proof of Performance/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("docs.google.com/presentation"),
    );
  });
});
