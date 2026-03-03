import { useEffect, useState } from "react";
import { parseCSVLine } from "../utils/csvParser";
import { inferCountry } from "../utils/geoUtils";

interface University {
  university: string;
  latitude: number;
  longitude: number;
  country: string;
}

const CAPSTONES_SHEET_ID = "1vJqgnEBhdeciPNDpQb66UxmD5LAKVd8dj5jr_LbbipI";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${CAPSTONES_SHEET_ID}/export?format=csv`;

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

  // Find exact match for "university" column (not "university abbreviation")
  const getExactColumnIndex = (name: string) => {
    return headers.indexOf(name.toLowerCase());
  };

  // Use exact match to get the full university name column (column D), not abbreviation (column C)
  const universityIdx = getExactColumnIndex("university");
  const latitudeIdx = getColumnIndex("latitude");
  const longitudeIdx = getColumnIndex("longitude");

  // Parse data rows and deduplicate by university name
  const universityMap = new Map<string, University>();

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    // Skip empty rows
    if (values.every((v) => !v)) continue;

    const university = values[universityIdx]?.trim() || "";
    const latitude = parseFloat(values[latitudeIdx]) || 0;
    const longitude = parseFloat(values[longitudeIdx]) || 0;

    // Skip if missing essential data
    if (!university || !latitude || !longitude) continue;

    // Only add if we haven't seen this university before
    if (!universityMap.has(university)) {
      universityMap.set(university, {
        university,
        latitude,
        longitude,
        country: inferCountry(university, latitude, longitude),
      });
    }
  }

  return Array.from(universityMap.values());
}

export const useCapstonesData = () => {
  const [capstonesData, setCapstonesData] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapstones = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(CSV_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch capstones data");
        }

        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setCapstonesData(parsedData);
      } catch (err) {
        console.error("Error fetching capstones data:", err);
        setError("Failed to load capstones data");
      } finally {
        setLoading(false);
      }
    };

    fetchCapstones();
  }, []);

  return { capstonesData, loading, error };
};
