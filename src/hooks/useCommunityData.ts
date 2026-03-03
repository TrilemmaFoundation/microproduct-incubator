import { useEffect, useState } from "react";
import { parseCSVLine } from "../utils/csvParser";

interface University {
  university: string;
  latitude: number;
  longitude: number;
  country: string;
}

const COMMUNITY_SHEET_ID = "1TtaWqCZry5dlYEGO4uWn1JqEt8K4uC_g_g8sRzJaMR8";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${COMMUNITY_SHEET_ID}/export?format=csv`;

// Helper function to parse CSV
function parseCSV(csvText: string): University[] {
  const lines = csvText.split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());

  // Find column indices (case-insensitive matching)
  const getColumnIndex = (name: string) => {
    return headers.findIndex((h) => h.includes(name.toLowerCase()));
  };

  // Note: "University" is misspelled as "Unviersity" in the sheet
  const universityIdx = headers.findIndex(
    (h) => h.includes("university") || h.includes("viersity"),
  );
  const latitudeIdx = getColumnIndex("latitude");
  const longitudeIdx = getColumnIndex("longitude");
  const countryIdx = getColumnIndex("country");

  // Parse data rows
  const universities: University[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    // Skip empty rows
    if (values.every((v) => !v)) continue;

    universities.push({
      university: values[universityIdx] || "",
      latitude: parseFloat(values[latitudeIdx]) || 0,
      longitude: parseFloat(values[longitudeIdx]) || 0,
      country: values[countryIdx] || "",
    });
  }

  return universities;
}

export const useCommunityData = () => {
  const [communityData, setCommunityData] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(CSV_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch community data");
        }

        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setCommunityData(parsedData);
      } catch (err) {
        console.error("Error fetching community data:", err);
        setError("Failed to load community data");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, []);

  return { communityData, loading, error };
};
