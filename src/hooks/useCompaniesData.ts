import { useEffect, useState } from "react";
import { parseCSVLine } from "../utils/csvParser";

export interface Company {
  company: string;
  companySlug: string;
  companyUrl: string;
  category: string;
}

// Derived from https://docs.google.com/spreadsheets/d/1Ebc3thu5tZ3Cq-mZsIcurug_iEcNvtmQdTQLpLKoffQ/edit?usp=sharing
const COMPANIES_SHEET_ID = "1Ebc3thu5tZ3Cq-mZsIcurug_iEcNvtmQdTQLpLKoffQ";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${COMPANIES_SHEET_ID}/export?format=csv`;

// Helper structure to map CSV headers to our interface keys
interface ColumnMapping {
  companyIdx: number;
  companySlugIdx: number;
  companyUrlIdx: number;
  categoryIdx: number;
}

function parseCSV(csvText: string): Company[] {
  const lines = csvText.split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());

  // Helper to find column index
  const getIndex = (substring: string) =>
    headers.findIndex((h) => h.includes(substring.toLowerCase()));

  const mapping: ColumnMapping = {
    companyIdx:
      getIndex("company name") !== -1
        ? getIndex("company name")
        : getIndex("company"),
    companySlugIdx: getIndex("slug"),
    companyUrlIdx: getIndex("url"),
    categoryIdx: getIndex("category"),
  };

  // If critical columns are missing, we might want to warn or return empty
  // For now, we'll try to parse what we can

  const companies: Company[] = [];

  // Start from row 1 (skip header)
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    // Ensure we have enough columns for the indices we found
    // But some rows might be shorter if trailing columns are empty

    const company = (
      mapping.companyIdx !== -1 ? values[mapping.companyIdx] : ""
    ).trim();
    const rawSlug = (
      mapping.companySlugIdx !== -1 ? values[mapping.companySlugIdx] : ""
    ).trim();
    const url = (
      mapping.companyUrlIdx !== -1 ? values[mapping.companyUrlIdx] : ""
    ).trim();
    const category = (
      mapping.categoryIdx !== -1 ? values[mapping.categoryIdx] : "Other"
    ).trim();

    if (!company) continue;

    // Fallback for slug: strictly letters and numbers, lowercase
    const cleanSlug =
      rawSlug || company.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    companies.push({
      company,
      companySlug: cleanSlug,
      companyUrl: url,
      category: category || "Other",
    });
  }

  return companies;
}

export const useCompaniesData = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const CACHE_KEY = "trilemma_companies_cache";
        const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { timestamp, data } = JSON.parse(cached);
            const age = Date.now() - timestamp;
            if (age < CACHE_TTL && Array.isArray(data) && data.length > 0) {
              setCompanies(data);
              setLoading(false);
              return; // Return early if cache hit and valid
            }
          } catch {
            // invalid cache, ignore and fetch
            console.warn("Invalid companies cache, refetching.");
          }
        }

        const response = await fetch(CSV_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch companies data");
        }

        const csvText = await response.text();
        // Check for HTML response (e.g. login page / private sheet)
        if (csvText.trim().startsWith("<!DOCTYPE html>")) {
          throw new Error(
            "Received HTML instead of CSV. Ensure sheet is public.",
          );
        }

        const parsedData = parseCSV(csvText);
        setCompanies(parsedData);

        // Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            data: parsedData,
          }),
        );
      } catch (err) {
        console.error("Error fetching companies data:", err);
        setError("Failed to load companies data");

        // Fallback: Try to use stale cache if available, even if expired,
        // so we show something instead of nothing.
        const cached = localStorage.getItem("trilemma_companies_cache");
        if (cached) {
          try {
            const { data } = JSON.parse(cached);
            if (Array.isArray(data) && data.length > 0) {
              console.warn("Serving stale companies data due to fetch error");
              setCompanies(data);
              // Keep error state null because we successfully recovered?
              // Or keep it to inform? Let's clear it if we have stale data to show.
              setError(null);
            }
          } catch {
            /* ignore */
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
};
