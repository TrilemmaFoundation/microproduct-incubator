# Deployment Guide

The Trilemma Foundation website is hosted on **Vercel**, benefiting from global edge distribution, automatic SSL, and seamless CI/CD integration.

## Hosting Environment

- **Platform**: Vercel
- **Production URL**: [trilemma.foundation](https://www.trilemma.foundation/)
- **Build Engine**: Vite

## CI/CD Pipeline

The deployment process is fully automated via GitHub integration:

1. **Preview Deployments**: Every Pull Request (PR) triggers a unique preview URL. This allows for testing changes in a production-like environment before merging.
2. **Production Deployment**: Pushes to the `main` branch trigger an automatic build and deployment to the production environment.
3. **Build Command**: `npm run build` (runs `vite build`).
4. **Output Directory**: `dist/`.

## Environment Variables

The following secrets and configuration variables must be set in the Vercel Dashboard:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key for the Resend email service (used in `/api/send-email`). |
| `VITE_GA_ID` | (Optional) Google Analytics measurement ID. |

## Local Configuration

To run the project locally with production-like settings:

1. Clone the repo and run `npm install`.
2. Create a `.env.local` file (do not commit this).
3. Populate with necessary keys for local API testing.
4. Run `npm run dev`.

## Site Configuration (`vercel.json`)

The `vercel.json` file handles routing and rewrites:
- **SPA Routing**: All non-file requests are rewritten to `index.html` to support client-side routing via React Router.
- **API Routes**: Subdirectory `/api` is automatically handled as serverless functions.

## Troubleshooting

- **Build Failures**: Usually caused by TypeScript errors. Ensure `npm run check` passes locally before pushing.
- **API Errors (500)**: Check Vercel function logs in the dashboard to debug serverless execution failures.
- **Stale Content**: If Google Sheets data isn't updating, ensure the export link is still valid and the sheet has public view access.
