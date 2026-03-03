import { render, screen } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import LandingHero from "../LandingHero";

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = (await vi.importActual(
    "framer-motion",
  )) as typeof import("framer-motion");
  const renderAs = (tag: string) => {
    return ({
      children,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) =>
      createElement(tag, props, children);
  };
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: renderAs("div"),
      h1: renderAs("h1"),
      p: renderAs("p"),
    },
  };
});

// Mock UniversityMarquee
vi.mock("../LandingUniversityMarquee", () => ({
  default: () => <div data-testid="university-marquee">Marquee</div>,
}));

describe("LandingHero", () => {
  it("renders heading and description", () => {
    render(
      <MemoryRouter>
        <LandingHero />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Global Talent Incubator/i)).toBeInTheDocument();
    expect(screen.getByText(/Data-driven R&D lab/i)).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(
      <MemoryRouter>
        <LandingHero />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", { name: /Onboard to Project/i }),
    ).toBeInTheDocument();
    // DiscordButton links to mentor form
    expect(
      screen.getByRole("link", { name: /Apply to Mentor/i }),
    ).toBeInTheDocument();
  });

  it("renders university marquee", () => {
    render(
      <MemoryRouter>
        <LandingHero />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("university-marquee")).toBeInTheDocument();
  });
});
