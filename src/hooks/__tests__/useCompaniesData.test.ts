import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCompaniesData } from "../useCompaniesData";

describe("useCompaniesData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    // vi.useFakeTimers() was removed because it conflicts with waitFor (which needs real intervals)
  });

  afterEach(() => {
    // No longer need to cleanup timers
  });

  const mockCSV = `company,slug,url,category
Test Company,test-company,https://example.com,Tech`;

  it("returns loading state initially", () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useCompaniesData());
    expect(result.current.loading).toBe(true);
    expect(result.current.companies).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("fetches and parses companies successfully (no cache)", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });
    global.fetch = fetchSpy;

    const { result } = renderHook(() => useCompaniesData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.companies).toHaveLength(1);
    expect(result.current.companies[0]).toEqual({
      company: "Test Company",
      companySlug: "test-company",
      companyUrl: "https://example.com",
      category: "Tech",
    });

    // Verify cache was set
    const cached = localStorage.getItem("trilemma_companies_cache");
    expect(cached).not.toBeNull();
    if (cached === null) {
      throw new Error("Expected companies cache to be set");
    }
    const parsedCache = JSON.parse(cached);
    expect(parsedCache.data).toHaveLength(1);
  });

  it("serves data from cache if valid and skips fetch", async () => {
    const cachedData = {
      timestamp: Date.now(),
      data: [
        {
          company: "Cached Company",
          companySlug: "cached-company",
          companyUrl: "https://cached.com",
          category: "Cached",
        },
      ],
    };
    localStorage.setItem(
      "trilemma_companies_cache",
      JSON.stringify(cachedData),
    );

    const fetchSpy = vi.fn();
    global.fetch = fetchSpy;

    const { result } = renderHook(() => useCompaniesData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.companies).toEqual(cachedData.data);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("refetches if cache is expired", async () => {
    const ONE_HOUR = 60 * 60 * 1000;
    const cachedData = {
      timestamp: Date.now() - (ONE_HOUR + 1000), // Expired
      data: [],
    };
    localStorage.setItem(
      "trilemma_companies_cache",
      JSON.stringify(cachedData),
    );

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useCompaniesData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Should return new data from fetch, not old cache
    expect(result.current.companies[0].company).toBe("Test Company");
    expect(global.fetch).toHaveBeenCalled();
  });

  it("serves stale cache on fetch error", async () => {
    const cachedData = {
      timestamp: Date.now() - 9999999, // Very expired
      data: [
        {
          company: "Stale Company",
          companySlug: "stale-company",
          companyUrl: "https://stale.com",
          category: "Stale",
        },
      ],
    };
    localStorage.setItem(
      "trilemma_companies_cache",
      JSON.stringify(cachedData),
    );

    global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useCompaniesData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.companies).toEqual(cachedData.data);
    // Error might be null because we successfully recovered, or we might want to suppress it.
    // Based on implementation: setError(null) is called when stale data is found.
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error with no cache", async () => {
    const fetchSpy = vi.fn().mockRejectedValue(new Error("Network Error"));
    global.fetch = fetchSpy;

    const { result } = renderHook(() => useCompaniesData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.companies).toEqual([]);
    expect(result.current.error).toBe("Failed to load companies data");
    expect(fetchSpy).toHaveBeenCalled();
  });
});
