import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useBodyScrollLock } from "../useBodyScrollLock";

describe("useBodyScrollLock", () => {
  afterEach(() => {
    // Reset body styles after each test
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  });

  it("locks scroll when isLocked is true", () => {
    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.width).toBe("100%");
  });

  it("unlocks scroll when isLocked is false", () => {
    const { rerender } = renderHook(
      ({ isLocked }) => useBodyScrollLock(isLocked),
      {
        initialProps: { isLocked: true },
      },
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender({ isLocked: false });

    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.position).toBe("");
    expect(document.body.style.width).toBe("");
  });

  it("cleans up styles on unmount", () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.position).toBe("");
    expect(document.body.style.width).toBe("");
  });

  it("handles scroll container if present", () => {
    const div = document.createElement("div");
    div.id = "page-scroll-container";
    document.body.appendChild(div);

    const { rerender, unmount } = renderHook(
      ({ isLocked }) => useBodyScrollLock(isLocked),
      {
        initialProps: { isLocked: true },
      },
    );
    expect(div.style.overflow).toBe("hidden");

    rerender({ isLocked: false });
    expect(div.style.overflow).toBe("");

    rerender({ isLocked: true });
    expect(div.style.overflow).toBe("hidden");

    unmount();
    expect(div.style.overflow).toBe("");

    document.body.removeChild(div);
  });
});
