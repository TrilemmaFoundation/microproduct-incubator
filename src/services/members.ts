/**
 * Removes middle names from a full name, keeping only first and last name
 */
export function removeMiddleName(fullName: string): string {
  if (!fullName || !fullName.trim()) {
    return fullName;
  }

  const nameParts = fullName
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  if (nameParts.length <= 2) {
    return fullName.trim();
  }

  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
}

/**
 * Converts Google Drive sharing URLs to direct image URLs
 * Supports formats like:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID (already direct)
 * - Just a file ID (e.g., "1a2b3c4d5e6f7g8h9i0j")
 * - Direct image URLs (returns as-is)
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url || !url.trim()) {
    return url;
  }

  const trimmedUrl = url.trim();

  // If it's already a direct image URL (http/https and not a Google Drive URL), return as-is
  if (
    (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) &&
    !trimmedUrl.includes("drive.google.com")
  ) {
    return trimmedUrl;
  }

  // Extract file ID from different Google Drive URL formats
  let fileId: string | null = null;

  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const fileIdMatch = trimmedUrl.match(/\/file\/d\/([a-zA-Z0-9_\s-]+)/);
  if (fileIdMatch) {
    fileId = fileIdMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID or uc?id=FILE_ID or uc?export=view&id=FILE_ID
  // This regex captures everything after id= until &, #, or end of string (may include spaces)
  if (!fileId) {
    const openIdMatch = trimmedUrl.match(/[?&]id=([^&#]+)/);
    if (openIdMatch) {
      fileId = openIdMatch[1].trim();
    }
  }

  // If it looks like just a file ID (alphanumeric, dashes, underscores, spaces, typically 25-30 chars)
  // Google Drive file IDs are usually 25-33 characters
  if (!fileId && /^[a-zA-Z0-9_\s-]{20,50}$/.test(trimmedUrl)) {
    fileId = trimmedUrl;
  }

  // Clean the file ID: remove all spaces and validate
  if (fileId) {
    // Remove all whitespace (spaces, tabs, newlines)
    const cleanFileId = fileId.replace(/\s+/g, "").trim();

    // Validate it's a proper file ID format (20-40 alphanumeric chars, dashes, underscores)
    if (cleanFileId && /^[a-zA-Z0-9_-]{20,40}$/.test(cleanFileId)) {
      // Use lh3.googleusercontent.com/d/ format which is more reliable for direct embedding
      // than the thumbnail redirect service
      return `https://lh3.googleusercontent.com/d/${cleanFileId}=w500`;
    }
  }

  // If it's a Google Drive URL we couldn't parse, try to extract any ID-like string
  if (trimmedUrl.includes("drive.google.com")) {
    // Look for file IDs in the URL, handling potential spaces
    // Match sequences of 20-40 alphanumeric chars, dashes, underscores, or spaces
    const anyIdMatch = trimmedUrl.match(/([a-zA-Z0-9_\s-]{20,40})/);
    if (anyIdMatch) {
      const cleanId = anyIdMatch[1].replace(/\s+/g, "").trim();
      if (/^[a-zA-Z0-9_-]{20,40}$/.test(cleanId)) {
        return `https://lh3.googleusercontent.com/d/${cleanId}=w500`;
      }
    }
  }

  return trimmedUrl;
}

export interface Member {
  Name: string;
  Capstone: string;
  Project: string;
  Contribution: string;
  URL: string;
  "Headshot URL"?: string;
}

export async function fetchTeamMembers(): Promise<Member[]> {
  const sheetId = "1a8Zf0fPsy3KON942hHyJcBh5m_dyZBzbzCPoyeRAJEM";
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const response = await fetch(csvUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Google Sheet (${response.status}): ${response.statusText}`,
    );
  }

  const csvText = await response.text();
  const lines = csvText.split("\n").filter((line) => line.trim());
  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().replace(/^"|"$/g, ""));
  const getHeaderIndex = (search: string) =>
    headers.findIndex(
      (h) => h.toLowerCase().replace(/\s+/g, "") === search.toLowerCase(),
    );

  const nameIndex = getHeaderIndex("name");
  const capstoneIndex = getHeaderIndex("capstone");
  const projectIndex = getHeaderIndex("project");
  const contributionIndex = getHeaderIndex("contribution");
  const urlIndex = getHeaderIndex("url");
  const headshotUrlIndex = getHeaderIndex("headshoturl");

  if (
    nameIndex === -1 ||
    capstoneIndex === -1 ||
    projectIndex === -1 ||
    contributionIndex === -1
  ) {
    throw new Error("Required columns not found in sheet");
  }

  const members: Member[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        if (inQuotes && line[j + 1] === '"') {
          current += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const maxIndex = Math.max(
      nameIndex,
      capstoneIndex,
      projectIndex,
      contributionIndex,
      urlIndex,
      headshotUrlIndex,
    );
    if (values.length > maxIndex) {
      const cleanValue = (val: string) =>
        val?.replace(/^"|"$/g, "").trim() || "";
      const rawHeadshotUrl =
        headshotUrlIndex !== -1 ? cleanValue(values[headshotUrlIndex]) : "";
      const processedHeadshotUrl = rawHeadshotUrl
        ? convertGoogleDriveUrl(rawHeadshotUrl)
        : undefined;

      const member: Member = {
        Name: removeMiddleName(cleanValue(values[nameIndex])),
        Capstone: cleanValue(values[capstoneIndex]),
        Project: cleanValue(values[projectIndex]),
        Contribution: cleanValue(values[contributionIndex]),
        URL: urlIndex !== -1 ? cleanValue(values[urlIndex]) : "",
        "Headshot URL": processedHeadshotUrl,
      };

      if (member.Name && member.Contribution) {
        members.push(member);
      }
    }
  }

  return members;
}
