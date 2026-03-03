import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useProjectsData } from "../useProjectsData";

describe("useProjectsData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns loading state initially", () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => { })); // Never resolves
    const { result } = renderHook(() => useProjectsData());
    expect(result.current.loading).toBe(true);
    expect(result.current.projects).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("fetches and parses projects successfully", async () => {
    const mockCSV = `topic,project,university abbreviation,university,program,start,end,student,status
BTC,Test Project,MIT,Massachusetts Institute of Technology,CS,2024-01,2024-06,3,Completed`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useProjectsData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.projects).toHaveLength(1);
    expect(result.current.projects[0]).toEqual({
      project: "BTC",
      projectTitle: "Test Project",
      universityAbbreviation: "MIT",
      university: "Massachusetts Institute of Technology",
      program: "CS",
      start: "2024-01",
      end: "2024-06",
      students: "3",
      status: "Completed",
    });
    expect(result.current.error).toBeNull();
  });

  it("handles fetch errors gracefully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useProjectsData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.projects).toEqual([]);
    expect(result.current.error).toBe("Failed to load projects data");
  });

  it("handles network exceptions", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProjectsData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.projects).toEqual([]);
    expect(result.current.error).toBe("Failed to load projects data");
  });

  it("handles empty CSV", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(""),
    });

    const { result } = renderHook(() => useProjectsData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.projects).toEqual([]);
  });

  it("assigns correct URLs for specific universities", async () => {
    const headers =
      "topic,project,university abbreviation,university,program,start,end,student,status";
    const mockCSV = `${headers}
Bitcoin,P1,GT,GT,MS,2024,2026,5,O
Bitcoin,P2,LSE,LSE,MS,2024,2025,5,O
Soccer,P3,LSE,LSE,MS,2024,2025,5,O
Analysis,P4,UC Davis,UCD,MS,2024,2025,5,O
Analysis,P5,Other,"University of California, Davis",MS,2024,2025,5,O`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSV),
    });

    const { result } = renderHook(() => useProjectsData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.projects[0].url).toBe(
      "https://github.com/TrilemmaFoundation/GT-MSA-Spring-26",
    );
    expect(result.current.projects[1].url).toBe(
      "https://github.com/TrilemmaFoundation/bitcoin-analytics-capstone-template",
    );
    expect(result.current.projects[2].url).toBe(
      "https://github.com/TrilemmaFoundation/soccer-analytics-capstone-template",
    );
    expect(result.current.projects[3].url).toBe(
      "https://docs.google.com/document/d/1a1YCOFBVEDJW6m_hSNzYvzoSgjk4Q1sYLOYoDkRU2AI/edit?usp=sharing",
    );
    expect(result.current.projects[4].url).toBe(
      "https://docs.google.com/document/d/1a1YCOFBVEDJW6m_hSNzYvzoSgjk4Q1sYLOYoDkRU2AI/edit?usp=sharing",
    );
  });
});
