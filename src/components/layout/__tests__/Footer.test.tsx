import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  };

  it("renders the Trilemma Foundation Logo", () => {
    renderFooter();
    const logo = screen.getByAltText(/Trilemma Foundation Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("foundation_white.webp"),
    );
  });

  it("renders the mission statement", () => {
    renderFooter();
    expect(
      screen.getByText(/Canadian Registered Charity/i),
    ).toBeInTheDocument();
  });

  it("renders social links", () => {
    renderFooter();
    expect(screen.getByText(/Connect/i)).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    renderFooter();
    expect(screen.getByText(/© 2025 Trilemma Foundation/i)).toBeInTheDocument();
  });
});
