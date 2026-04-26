# Sleck Backend Scaffold

This is the minimal backend scaffold for Sleck, using Express and TypeScript.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the backend in development mode (with hot reload)
- `npm run build` — compile TypeScript to JavaScript
- `npm start` — run the compiled backend

## Structure

- `src/` — source code
- `dist/` — compiled output

## Health Check

A health endpoint is available at `/health`.

## Environment

No environment variables are required for this minimal scaffold. See `.env.example`.

### Docker Compose

When running under Docker Compose, the backend is available on port 3001 and connects to the `db` service (PostgreSQL) at `postgres://sleck:sleckdev@db:5432/sleck` (set as `DATABASE_URL` for future use).
