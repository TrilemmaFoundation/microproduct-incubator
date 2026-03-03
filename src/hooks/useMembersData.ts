import { useEffect, useState } from "react";
import { parseCSVLine } from "../utils/csvParser";

const MEMBERS_SHEET_ID = "1a8Zf0fPsy3KON942hHyJcBh5m_dyZBzbzCPoyeRAJEM";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${MEMBERS_SHEET_ID}/export?format=csv`;

export const useMembersData = () => {
  const [capstoneStudentsCount, setCapstoneStudentsCount] =
    useState<number>(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(CSV_URL);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch members data: ${response.status} ${response.statusText}`,
          );
        }

        const csvText = await response.text();
        // Check if csvText looks like HTML (Google login page) instead of CSV
        if (csvText.trim().startsWith("<!DOCTYPE html>")) {
          return;
        }

        const lines = csvText.split("\n").filter((line) => line.trim());

        // Find the row containing "Students:" (case-insensitive)
        let found = false;
        for (const line of lines) {
          const values = parseCSVLine(line);
          // Look for "Students:" or similar in any column
          const studentsLabelIndex = values.findIndex((v) =>
            v.toLowerCase().includes("students:"),
          );

          if (
            studentsLabelIndex !== -1 &&
            values.length > studentsLabelIndex + 1
          ) {
            // The count should be in the next column
            const potentialValue = values[studentsLabelIndex + 1];
            const val = parseInt(potentialValue.replace(/[^0-9]/g, ""), 10);

            if (!Number.isNaN(val)) {
              setCapstoneStudentsCount(val);
              found = true;
              break;
            }
          }
        }

        if (!found) {
          console.warn("Could not find 'Students:' label in members sheet.");
          // Fallback: try the hardcoded position if search failed (Row 5, Col J / Index 9)
          if (lines.length >= 5) {
            const row5Values = parseCSVLine(lines[4]);
            if (row5Values.length >= 10) {
              const val = parseInt(row5Values[9].replace(/[^0-9]/g, ""), 10);
              if (!Number.isNaN(val)) {
                setCapstoneStudentsCount(val);
              }
            }
          }
        }
      } catch (err) {
        console.error("Error fetching members data:", err);
        setError("Failed to load members data");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { capstoneStudentsCount, loading, error };
};
