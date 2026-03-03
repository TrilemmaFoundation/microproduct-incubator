import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCapstonesData } from "../useCapstonesData";

describe("useCapstonesData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and parses capstones successfully with deduplication", async () => {
    const mockCSV = `latitude,longitude,university abbreviation,university
51.5,-0.1,LSE,London School of Economics
51.5,-0.1,LSE,London School of Economics
49.2,-123.1,UBC,University of British Columbia`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useCapstonesData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Should have 2 unique universities
    expect(result.current.capstonesData).toHaveLength(2);

    const ubc = result.current.capstonesData.find((u) =>
      u.university.includes("British Columbia"),
    );
    expect(ubc?.country).toBe("Canada");

    const lse = result.current.capstonesData.find((u) =>
      u.university.includes("Economics"),
    );
    expect(lse?.country).toBe("United Kingdom");
  });

  it("handles fetch errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    const { result } = renderHook(() => useCapstonesData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to load capstones data");
  });

  it("handles empty rows and missing data in CSV", async () => {
    const mockCSV = `latitude,longitude,university
, , 
51.5,-0.1,London School of Economics
, , Missing
51.5,-0.1,`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useCapstonesData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Only the one valid row should be parsed
    expect(result.current.capstonesData).toHaveLength(1);
  });

  it("handles CSV with less than 2 lines", async () => {
    const mockCSV = `latitude,longitude,university`;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useCapstonesData());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.capstonesData).toHaveLength(0);
  });
});
