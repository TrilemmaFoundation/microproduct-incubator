# Testing Documentation

This document provides an overview of the testing strategy, structure, and implemented tests for the Trilemma Foundation website.

## Overview

The project uses a comprehensive testing suite to ensure the reliability of data parsing, hook logic, and UI components. We follow a "test as you build" philosophy, aiming for high coverage especially in data-handling logic.

## Testing Stack

- **Framework**: [Vitest 4](https://vitest.dev/) (Vite-native testing framework)
- **Environment**: [jsdom](https://github.com/jsdom/jsdom) (for DOM simulation)
- **Library**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Coverage**: [v8](https://v8.dev/) (embedded in Vitest)

## Test Structure

Tests are located in `__tests__` directories alongside the code they test:

```text
src/
├── components/
│   ├── UI/
│   │   └── __tests__/        # UI Component tests
│   ├── layout/
│   │   └── __tests__/        # Layout tests
│   └── pages/
│       └── .../
│           └── __tests__/    # Page-specific section tests
├── hooks/
│   └── __tests__/            # Custom hook tests (fetching & parsing)
└── utils/
    └── __tests__/            # Utility function tests (CSV, Geo, etc.)
```

## Implemented Tests

### 1. Utilities (`src/utils/__tests__`)
- **`csvParser.test.ts`**: Validates the custom CSV line parser. Handles quoted values, escaped quotes, whitespace trimming, and edge cases like trailing quotes and mixed fields.
- **`geoUtils.test.ts`**: Verifies logic for inferring country names from university names or coordinates.

### 2. Hooks (`src/hooks/__tests__`)
These tests mock global `fetch` to verify data fetching and complex parsing logic:
- **`useCommunityData.test.ts`**: Tests fetching and parsing university coordinates. Handles misspelled headers (e.g., "Unviersity").
- **`useProjectsData.test.ts`**: Verifies parsing of project metadata from Google Sheets.
- **`useMembersData.test.ts`**: Validates team member data loading.
- **`useCapstonesData.test.ts`**: Tests capstone project data loading.
- **`useBodyScrollLock.test.ts`**: Verifies DOM manipulation for scroll locking during modals/navigation.

### 3. UI Components (`src/components/UI/__tests__`)
Focuses on rendering, variance (props), and basic interaction:
- **`Button.test.tsx`** & **`SecondaryButton.test.tsx`**: Tests variants, sizes, and disabled states.
- **`StatusBadge.test.tsx`**: Verifies color mapping based on project status.
- **`SectionTitle.test.tsx`**: Tests the orange/white split title rendering and alignment.
- **`ResourceCard.test.tsx`**: Verifies card rendering and external link behavior.

### 4. Layout & Pages
- **`Header.test.tsx`**: Tests navigation menu rendering and mobile menu toggle.
- **`Footer.test.tsx`**: Verifies branding, quick links, and social links.
- **`ProjectsTable.test.tsx`**: Tests data display and filtering/sorting in the main projects table.

## Running Tests

### Commands
```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Open Vitest UI
npm run test:ui
```

### Coverage Goals
- **Hooks & Utils**: 95%+ coverage (all edge cases for data parsing).
- **UI Components**: Rendering of all major variants and critical click handlers.

## Best Practices
1. **Mock Fetch**: Always use `vi.fn()` to mock `global.fetch` in hooks.
2. **User Events**: Use `@testing-library/user-event` for complex interactions.
3. **Data Snapshots**: When testing parsers, use realistic CSV snippets from the actual Google Sheets.
4. **No Side Effects**: Ensure `vi.restoreAllMocks()` is called in `beforeEach` or `afterEach`.
