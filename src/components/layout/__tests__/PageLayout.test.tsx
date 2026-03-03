import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import PageLayout from "../PageLayout";

describe("PageLayout", () => {
  it("renders children, header, and footer", () => {
    render(
      <MemoryRouter>
        <PageLayout>
          <div data-testid="page-content">Main Content</div>
        </PageLayout>
      </MemoryRouter>,
    );

    // Header and Footer use links so they need MemoryRouter
    expect(screen.getByTestId("page-content")).toBeInTheDocument();

    // Header should contain navigation structure
    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header uses typical layout

    // Footer should be present
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer typical layout
  });

  it("applies page-scroll-container id and custom className", () => {
    const { container } = render(
      <MemoryRouter>
        <PageLayout className="custom-layout">Content</PageLayout>
      </MemoryRouter>,
    );

    expect(container.querySelector(".custom-layout")).toBeInTheDocument();
    expect(
      container.querySelector("#page-scroll-container"),
    ).toBeInTheDocument();
  });
});
