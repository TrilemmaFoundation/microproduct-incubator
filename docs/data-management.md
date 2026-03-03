# Data Management

The Trilemma Foundation website uses an externalized data strategy, allowing non-technical team members to update content like projects, capstones, and university partners without modifying the source code.

## External Data Sources

We primarily use **Google Sheets** as a lightweight, collaborative CMS. Sheets are exported as CSVs and consumed by the frontend.

### Configuration
Google Sheets are shared with "Anyone with the link can view" permissions. The export URL format used is:
`https://docs.google.com/spreadsheets/d/[SHEET_ID]/export?format=csv&gid=[GID]`

## Data Processing Pipeline

### 1. Custom Parsing (`src/utils/csvParser.ts`)
Since standard CSV feeds can contain quoted strings with commas and escaped quotes, we use a custom `parseCSVLine` function. This manual parser ensures:
- Correct handling of `"Quoted, containing commas"` fields.
- Trimming of leading/trailing whitespace.
- Support for escaped quotes (`""`).

### 2. Custom Hooks (`src/hooks/`)
Feature-specific hooks manage the lifecycle of data fetching:

- **`useProjectsData`**: Fetches the global projects listing.
- **`useCapstonesData`**: Fetches capstone project deliverables.
- **`useCommunityData`**: Load university partner coordinates for the marquee and maps.
- **`useMembersData`**: Loads team member information.

### 3. Type Safety
All ingested data is mapped to TypeScript interfaces defined in `src/types/`. This ensures that any changes to the Google Sheets structure are caught during local development.

## How to Update Data

> [!IMPORTANT]
> When adding new columns to a Google Sheet, ensure you update the corresponding TypeScript interface in the codebase to prevent runtime errors or missing data.

### Projects Table
1. Open the source Google Sheet.
2. Edit existing rows or add new ones.
3. The website will automatically reflect changes on the next client-side refresh (or build).

### University Partners
University logos and coordinate data are managed in `src/constants/community.json` for static data and supplemented by Google Sheets for dynamic updates.

## Performance & Caching
- **Client-Side Fetching**: Redundant fetches are avoided by using React's `useEffect` and dependency tracking.
- **CSV vs API**: We use CSV exports instead of the full Google Sheets API to avoid the complexity of OAuth/API Keys and to minimize bundle size.
