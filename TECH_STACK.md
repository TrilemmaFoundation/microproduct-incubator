# Tech Stack

> **Trilemma Foundation Website** - Technical stack for the data-driven R&D lab platform

## Frontend
- Framework: React 19.0.0
- Language: TypeScript 5.5.3
- Routing: React Router DOM v7.8.2 (lazy loading enabled)
- State: React hooks (useState, useEffect, useMemo)
- UI / Design System: Custom Tailwind CSS design system with UI kit preset
- Styling: Tailwind CSS 3.4.13 with tailwind-scrollbar plugin
- Tables: @tanstack/react-table 8.21.3 (sorting, filtering, pagination)
- Date Utilities: date-fns 4.1.0
- Forms: External (Google Forms for enrollment)
- Data Fetching: Custom hooks fetching from Google Sheets CSV export
- Charts: None
- Build Tool: Vite 7.0.0

## Custom Hooks
- `useProjectsData`: Fetches project data from Google Sheets CSV with loading/error states
- `useBodyScrollLock`: Prevents background scroll for modals and mobile menu overlays

## Backend
- Runtime / Platform: Vercel Serverless Functions (Node.js)
- Email: Resend API integration

## Data
- Primary DB: None (Google Sheets via CSV export)
- ORM / Query Layer: Custom CSV parser
- Migrations: None
- Cache: Client-side (React state)
- Search: Client-side (TanStack Table)
- Blob Storage: None

## Infra & Deploy
- Hosting: Vercel
- Container / Orchestration: Vercel
- Reverse Proxy / CDN: Vercel Edge Network
- CI/CD: Vercel (automatic deployments on push to main)
- Env / Config: Environment variables (Vercel Dashboard)

## Observability & Security
- Logging: Console logging
- Metrics / Monitoring: Vercel Analytics
- Tracing: None
- Alerts: None
- Secrets: Environment variables
- Access Control: None
- Encryption: HTTPS (Vercel)

## Integrations
- Payments: None
- Analytics: Vercel Analytics (@vercel/analytics 1.5.0)
- Email / SMS / Push: None
- External APIs:
  - Google Sheets (project data via CSV export)
  - Google Docs (embedded resource documents with fullscreen viewer)
- Auth Providers: None

## Testing & Quality
- Framework: Vitest
- Environment: jsdom
- Library: React Testing Library
- Coverage: v8 (c8)
- Linting: Biome 2.3.10
- Formatting: Biome 2.3.10

## Dev Experience & Meta
- Package Manager: npm
- Codegen / Scaffolding: None
- Pre-commit: None
- Docs: Inline code comments, README.md
- Repo / Branching: Git (main, feature/*, bugfix/*, hotfix/*)
- Environments: Development (localhost:3000), Production (trilemma.foundation)

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.0.0 | UI framework |
| react-dom | 19.0.0 | React DOM renderer |
| react-router-dom | 7.8.2 | Client-side routing |
| @tanstack/react-table | 8.21.3 | Data table with sorting/filtering/pagination |
| resend | 6.9.1 | Email API client |
| framer-motion | 12.29.0 | Animation library |
| leaflet | 1.9.4 | Map visualization |
| date-fns | 4.1.0 | Date formatting utilities |
| @vercel/analytics | 1.5.0 | Analytics integration |
| tailwindcss | 3.4.13 | Utility-first CSS framework |
| vite | 7.0.0 | Build tool and dev server |
| vitest | 4.0.18 | Testing framework |
| @biomejs/biome | 2.3.10 | Linting and formatting |
