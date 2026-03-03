import { render } from "@testing-library/react";
import type React from "react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Landing from "../Landing";

// Mock data hooks
vi.mock("../../../../hooks/useCompaniesData", () => ({
  useCompaniesData: () => ({ companies: [], loading: false, error: null }),
}));
vi.mock("../../../../hooks/useCommunityData", () => ({
  useCommunityData: () => ({
    communityData: [],
    loading: false,
    error: null,
  }),
}));

// Mock framer-motion
vi.mock("framer-motion", () => {
  return {
    motion: new Proxy(
      {},
      {
        get: (_target, property: string) => {
          return ({ children }: { children?: ReactNode }) => {
            const Component = property as React.ElementType;
            return <Component>{children}</Component>;
          };
        },
      },
    ),
    AnimatePresence: ({ children }: { children?: ReactNode }) => (
      <>{children}</>
    ),
  };
});

describe("Landing Page", () => {
  it("renders successfully", () => {
    const { container } = render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>,
    );
    expect(
      container.querySelector("#page-scroll-container"),
    ).toBeInTheDocument();
  });
});
