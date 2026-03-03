import { act, fireEvent, render, screen } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LandingDatathonCard from "../LandingDatathonCard";

// Mock framer-motion minimally
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: PropsWithChildren<Record<string, unknown>>) =>
      createElement("div", props, children),
  },
  AnimatePresence: ({ children }: PropsWithChildren) =>
    createElement(Fragment, null, children),
}));

describe("LandingDatathonCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders initial winner", () => {
    render(
      <MemoryRouter>
        <LandingDatathonCard />
      </MemoryRouter>,
    );
    // Use more specific heading query
    expect(
      screen.getByRole("heading", { name: /Datathons/i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Youssef Ahmed/i)).toBeInTheDocument();
  });

  it("navigates carousel", () => {
    render(
      <MemoryRouter>
        <LandingDatathonCard />
      </MemoryRouter>,
    );

    const nextBtn = screen.getByLabelText(/Next winner/i);
    fireEvent.click(nextBtn);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText(/Tam Nguyen/i)).toBeInTheDocument();
  });
});
