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

  When running in Docker Compose, this is set automatically to `http://localhost:3001`.

Copy `.env.example` to `.env` and adjust as needed.

## Structure

- `src/` — React app source code
- `public/` — Static assets

## Notes

- This is a minimal, accessible scaffold. No business logic, state management, or auth is included yet.
- See the root README for project-wide instructions.
