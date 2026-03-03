import { useEffect, useState } from "react";
import { parseCSVLine } from "../utils/csvParser";

export interface Project {
  project: string; // "BTC" or "Soccer"
  projectTitle: string;
  university: string;
  universityAbbreviation: string;
  program: string;
  start: string;
  end: string;
  students: string;
  status: string;
  url?: string;
}

const GOOGLE_SHEET_ID = "1vJqgnEBhdeciPNDpQb66UxmD5LAKVd8dj5jr_LbbipI";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=0`;

// Helper function to parse CSV
function parseCSV(csvText: string): Project[] {
  const lines = csvText.split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());

  // Find column indices (case-insensitive matching)
  const getColumnIndex = (name: string) => {
    return headers.findIndex((h) => h.includes(name.toLowerCase()));
  };

  const projectIdx = getColumnIndex("topic");
  const projectTitleIdx = getColumnIndex("project");
  // Match exact column name to avoid matching "university abbreviation"
  const universityIdx = headers.indexOf("university");
  const universityAbbreviationIdx = getColumnIndex("university abbreviation");
  const programIdx = getColumnIndex("program");
  const startIdx = getColumnIndex("start");
  const endIdx = getColumnIndex("end");
  const studentsIdx = getColumnIndex("student");
  const statusIdx = getColumnIndex("status");

  // Parse data rows
  const projects: Project[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    // Skip empty rows
    if (values.every((v) => !v)) continue;

    const universityAbbreviation = values[universityAbbreviationIdx] || "";
    const end = values[endIdx] || "";
    const topic = values[projectIdx] || "";

    // Check for GT 2026 capstones
    let url: string | undefined;
    if (universityAbbreviation === "GT" && end.includes("2026")) {
      url = "https://github.com/TrilemmaFoundation/GT-MSA-Spring-26";
    }

    // Check for LSE capstones
    if (universityAbbreviation === "LSE") {
      if (topic.toLowerCase().includes("bitcoin")) {
        url =
          "https://github.com/TrilemmaFoundation/bitcoin-analytics-capstone-template";
      } else if (topic.toLowerCase().includes("soccer")) {
        url =
          "https://github.com/TrilemmaFoundation/soccer-analytics-capstone-template";
      }
    }

    // Check for UC Davis capstones
    if (
      universityAbbreviation === "UC Davis" ||
      (values[universityIdx] || "").includes("California, Davis")
    ) {
      url =
        "https://docs.google.com/document/d/1a1YCOFBVEDJW6m_hSNzYvzoSgjk4Q1sYLOYoDkRU2AI/edit?usp=sharing";
    }

    projects.push({
      project: topic,
      projectTitle: values[projectTitleIdx] || "",
      university: values[universityIdx] || "",
      universityAbbreviation,
      program: values[programIdx] || "",
      start: values[startIdx] || "",
      end,
      students: values[studentsIdx] || "",
      status: values[statusIdx] || "",
      url,
    });
  }

  return projects;
}

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(CSV_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch projects data");
        }

        const csvText = await response.text();
        const parsedProjects = parseCSV(csvText);
        setProjects(parsedProjects);
      } catch (err) {
        console.error("Error fetching projects data:", err);
        setError("Failed to load projects data");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
