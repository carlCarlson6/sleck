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

The backend requires `DATABASE_URL` and `CLERK_SECRET_KEY` in its environment. See `.env.example` for required variables. If running in Docker Compose, `DATABASE_URL` is provided from `infrastructure/.env`, but you must provide your Clerk secret key in `.env` or via Compose overrides.

### Docker Compose

When running under Docker Compose, the backend is available on port 3001 and connects to the `db` service (PostgreSQL) using the `DATABASE_URL` value from `infrastructure/.env` (the example value is `postgres://sleck:sleckdev@db:5432/sleck`).
