import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCommunityData } from "../useCommunityData";

describe("useCommunityData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns loading state initially", () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves
    const { result } = renderHook(() => useCommunityData());
    expect(result.current.loading).toBe(true);
    expect(result.current.communityData).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("fetches and parses community data successfully", async () => {
    const mockCSV = `University,Latitude,Longitude,Country
London School of Economics,51.5144,-0.1165,United Kingdom
Harvard University,42.3770,-71.1167,United States`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useCommunityData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.communityData).toHaveLength(2);
    expect(result.current.communityData[0]).toEqual({
      university: "London School of Economics",
      latitude: 51.5144,
      longitude: -0.1165,
      country: "United Kingdom",
    });
    expect(result.current.error).toBeNull();
  });

  it('handles misspelled "Unviersity" header', async () => {
    const mockCSV = `Unviersity,Latitude,Longitude,Country
LSE,51.5,-0.1,UK`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useCommunityData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.communityData[0].university).toBe("LSE");
  });

  it("handles fetch errors gracefully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useCommunityData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.communityData).toEqual([]);
    expect(result.current.error).toBe("Failed to load community data");
  });

  it("handles network exceptions", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCommunityData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.communityData).toEqual([]);
    expect(result.current.error).toBe("Failed to load community data");
  });

  it("handles empty CSV", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(""),
    });

    const { result } = renderHook(() => useCommunityData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.communityData).toEqual([]);
  });

  it("skips empty rows", async () => {
    const mockCSV = `University,Latitude,Longitude,Country
LSE,51.5,-0.1,UK
,,,
Harvard,42.3,-71.1,USA`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useCommunityData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.communityData).toHaveLength(2);
    expect(result.current.communityData[1].university).toBe("Harvard");
  });
});
