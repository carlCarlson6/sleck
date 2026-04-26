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

The backend requires `DATABASE_URL`, `CLERK_SECRET_KEY`, and `CLERK_PUBLISHABLE_KEY` in its environment. See `.env.example` for required variables. If running in Docker Compose, all three variables are provided from `infrastructure/.env` (copied from `.env.example`).

### Docker Compose

When running under Docker Compose, the backend is available on port 3001 and connects to the `db` service (PostgreSQL) using the `DATABASE_URL` value from `infrastructure/.env` (the example value is `postgres://sleck:sleckdev@db:5432/sleck`).
