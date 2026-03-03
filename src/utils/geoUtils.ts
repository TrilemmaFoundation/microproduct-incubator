/**
 * Helper function to infer country from university name and coordinates.
 *
 * @param university - Full name of the university
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns The inferred country name
 */
export function inferCountry(
  university: string,
  latitude: number,
  longitude: number,
): string {
  const name = university.toLowerCase();

  // UK universities
  if (
    name.includes("london school") ||
    name.includes("lse") ||
    name.includes("university college london") ||
    name.includes("imperial college") ||
    name.includes("oxford") ||
    name.includes("cambridge")
  ) {
    return "United Kingdom";
  }

  // Canadian universities
  if (
    name.includes("british columbia") ||
    name.includes("ubc") ||
    name.includes("toronto") ||
    name.includes("montreal") ||
    name.includes("mcgill") ||
    name.includes("waterloo")
  ) {
    return "Canada";
  }

  // Australian universities
  if (
    name.includes("sydney") ||
    name.includes("melbourne") ||
    name.includes("technology sydney") ||
    (latitude < 0 && longitude > 140 && longitude < 160)
  ) {
    return "Australia";
  }

  // US universities (default for North America coordinates)
  if (latitude > 24 && latitude < 50 && longitude > -130 && longitude < -65) {
    return "United States";
  }

  // Default fallback
  return "United States";
}
