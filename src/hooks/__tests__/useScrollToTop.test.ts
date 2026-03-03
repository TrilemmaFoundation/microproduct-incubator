import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useScrollToTop } from "../useScrollToTop";

describe("useScrollToTop", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock window.scrollTo if not already mocked in setup
    window.scrollTo = vi.fn();

    // Clean up JSDOM between tests
    document.body.innerHTML = "";
  });

  it("returns a function", () => {
    const { result } = renderHook(() => useScrollToTop());
    expect(typeof result.current).toBe("function");
  });

  it("calls window.scrollTo when invoked", () => {
    const { result } = renderHook(() => useScrollToTop());
    result.current();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("calls behavior: smooth when requested", () => {
    const { result } = renderHook(() => useScrollToTop());
    result.current(true);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("attempts to scroll container if it exists", () => {
    // Setup container
    const container = document.createElement("div");
    container.id = "page-scroll-container";
    container.scrollTo = vi.fn();
    document.body.appendChild(container);

    const { result } = renderHook(() => useScrollToTop());
    result.current();

    expect(container.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "auto",
    });
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
