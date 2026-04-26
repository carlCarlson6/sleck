# Sleck Frontend

This is the minimal frontend scaffold for Sleck, built with [Vite](https://vitejs.dev/) and [React](https://react.dev/) using TypeScript.

## Getting Started

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. The app will be available at http://localhost:5173 by default.

## Environment Variables

- `VITE_BACKEND_BASE_URL`: Base URL for the Sleck backend (default: http://localhost:3001)
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key used by the frontend auth UI

  When running in Docker Compose, `VITE_CLERK_PUBLISHABLE_KEY` is set in `infrastructure/docker-compose.yml` (default is a placeholder; replace with your real Clerk publishable key).

Copy `.env.example` to `.env`, replace the Clerk placeholder with your real publishable key, and adjust the backend URL as needed.

## Structure

- `src/` — React app source code
- `public/` — Static assets

## Notes

- This is a minimal, accessible scaffold with Clerk-based auth gating for signed-in and signed-out states.
- See the root README for project-wide instructions.
