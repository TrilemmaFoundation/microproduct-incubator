import { describe, expect, it } from "vitest";
import { inferCountry } from "../geoUtils";

describe("inferCountry", () => {
  it("identifies UK universities by name", () => {
    expect(inferCountry("London School of Economics", 51.5, -0.1)).toBe(
      "United Kingdom",
    );
    expect(inferCountry("Imperial College London", 51.5, -0.1)).toBe(
      "United Kingdom",
    );
    expect(inferCountry("LSE", 51.5, -0.1)).toBe("United Kingdom");
    expect(inferCountry("University of Cambridge", 52.2, 0.1)).toBe(
      "United Kingdom",
    );
  });

  it("identifies Canadian universities by name", () => {
    expect(inferCountry("University of British Columbia", 49.2, -123.1)).toBe(
      "Canada",
    );
    expect(inferCountry("UBC", 49.2, -123.1)).toBe("Canada");
    expect(inferCountry("University of Toronto", 43.6, -79.3)).toBe("Canada");
    expect(inferCountry("McGill University", 45.5, -73.5)).toBe("Canada");
    expect(inferCountry("University of Waterloo", 43.4, -80.5)).toBe("Canada");
  });

  it("identifies Australian universities by name", () => {
    expect(inferCountry("University of Sydney", -33.8, 151.2)).toBe(
      "Australia",
    );
    expect(inferCountry("University of Melbourne", -37.8, 144.9)).toBe(
      "Australia",
    );
    expect(inferCountry("University of Technology Sydney", -33.8, 151.2)).toBe(
      "Australia",
    );
  });

  it("identifies Australian universities by coordinates (Southern Hemisphere/Far East)", () => {
    expect(inferCountry("Generic AU Uni", -35.0, 145.0)).toBe("Australia");
  });

  it("identifies US universities by coordinates (North America range)", () => {
    expect(inferCountry("Stanford University", 37.4, -122.1)).toBe(
      "United States",
    );
    expect(inferCountry("Harvard University", 42.3, -71.1)).toBe(
      "United States",
    );
  });

  it("defaults to United States for North American coordinates", () => {
    expect(inferCountry("Unknown North American Uni", 40.0, -100.0)).toBe(
      "United States",
    );
  });

  it("defaults to United States as fallback", () => {
    expect(inferCountry("Completely Unknown Uni", 0, 0)).toBe("United States");
  });
});
