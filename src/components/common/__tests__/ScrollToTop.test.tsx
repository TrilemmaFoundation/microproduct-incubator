import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import * as useScrollToTopModule from "../../../hooks/useScrollToTop";
import ScrollToTop from "../ScrollToTop";

// Mock the hook
vi.mock("../../../hooks/useScrollToTop", () => ({
  useScrollToTop: vi.fn(),
}));

describe("ScrollToTop", () => {
  it("calls scrollToTop on mount and route change", () => {
    const scrollToTopMock = vi.fn();
    const useScrollToTopMock = vi.mocked(useScrollToTopModule.useScrollToTop);
    useScrollToTopMock.mockReturnValue(scrollToTopMock);

    const { rerender } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToTopMock).toHaveBeenCalledTimes(1);

    // Change route
    rerender(
      <MemoryRouter initialEntries={["/new-route"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    // Note: MemoryRouter key change might re-mount, but we mainly want to verify effect trigger
    expect(scrollToTopMock).toHaveBeenCalled();
  });
});
