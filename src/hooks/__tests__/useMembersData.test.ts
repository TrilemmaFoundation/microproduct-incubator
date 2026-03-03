import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMembersData } from "../useMembersData";

describe("useMembersData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("extracts student count from labeled row", async () => {
    const mockCSV = `Col1,Col2
Students:,123
Other,456`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useMembersData());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.capstoneStudentsCount).toBe(123);
  });

  it("uses fallback position if label is missing", async () => {
    // Falls back to Row 5, Col J (Index 9)
    const mockCSV = `Row1
Row2
Row3
Row4
C1,C2,C3,C4,C5,C6,C7,C8,C9,999`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useMembersData());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.capstoneStudentsCount).toBe(999);
  });

  it("keeps default count if HTML is received (private sheet)", async () => {
    const mockHTML = "<!DOCTYPE html><html><body>Login</body></html>";

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockHTML),
    });

    const { result } = renderHook(() => useMembersData());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.capstoneStudentsCount).toBe(100); // Default
  });

  it("handles fetch error gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useMembersData());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Failed to load members data");
  });

  it("handles non-ok response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const { result } = renderHook(() => useMembersData());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Failed to load members data");
  });
});
