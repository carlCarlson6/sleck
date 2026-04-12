# Sleck Backend (`be/`)

This is the backend service for Sleck, built with Node.js, TypeScript, Express, tRPC, and Drizzle ORM.

## Getting Started

### Local development (standalone)

1. Copy `.env.example` to `.env` and fill in any required values.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend in development mode:
   ```sh
   npm run dev
   ```

- The backend will start on the port specified in `.env` (default: 4000).
- Health check: [http://localhost:4000/health](http://localhost:4000/health)

### Local development (Docker Compose)

You can also run the backend as part of the full stack using Docker Compose:

1. Ensure you have a `.env` file (see `.env.example`).
2. From the `infrastructure/` directory, run:
   ```sh
   docker compose up --build
   ```

- The backend will be available at [http://localhost:4000](http://localhost:4000)
- The database will be available at `db:5432` inside the container

## Project Structure

- `src/` - TypeScript source code
  - `index.ts` - App entrypoint
  - `trpc/` - tRPC routers (empty root for now)
- `scripts/` - Local dev scripts
- `.env.example` - Example environment variables

## Stack
- Node.js + TypeScript
- Express (thin, tRPC-oriented)
- tRPC (API layer)
- Drizzle ORM (PostgreSQL)
- Zod (validation)
- dotenv (env handling)

## Notes
- This is a scaffold only. No business logic or database wiring is present yet.
- Designed for later integration with Clerk, Drizzle, and tRPC routers.
- No root workspace is used; backend is self-contained in `be/`.
