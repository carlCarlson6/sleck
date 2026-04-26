# sleck

Sleck is a group chat platform inspired by Slack, Discord, and Microsoft Teams. The product centers on community-style servers, channel-based conversations, and controlled access for both public and private spaces.

## What we are building

The app will let users create and join servers where members communicate through channels inside each server.

## Core functionalities

### Server management

- Users can create servers.
- Servers can be either **public** or **private**.
- Public servers are discoverable, and any user can find and join them.
- Private servers are not discoverable, and only the server owner can invite other users to join.

### Channel management

- Server owners can create, read, update, and delete server channels.

### Messaging

- Server members can chat with other members inside a server channel.

## Architecture and technologies

### Frontend

- Vite
- React
- TypeScript

> **Note:** The initial scaffold now includes foundation dependencies for tRPC, Drizzle, PostgreSQL, and Clerk in both frontend and backend. Zustand, Zod, and TanStack Query will be added in future slices.

### Backend

- Node.js
- TypeScript
- Express
- tRPC (foundation dependencies installed; not yet wired)
- Drizzle (foundation dependencies installed; not yet wired)
- PostgreSQL (local dev via Docker Compose; see below)
- Clerk (foundation dependencies installed; not yet wired)

## Local development with Docker

This repository provides a development-oriented Docker Compose setup under `infrastructure/` to run the full stack locally:

- **frontend**: Vite React app (dev server, port 5173)
- **backend**: Node.js/Express/tRPC API (dev server, port 3001)
- **db**: PostgreSQL 15 (port 5432, persistent volume)

### Quick start

1. (Optional) Copy example environment files if you want to override defaults:
   - `cp be/.env.example be/.env`
   - `cp fe/.env.example fe/.env`
2. (Optional) Adjust any secrets or environment variables in your `.env` files.
3. From the `infrastructure/` directory, copy `.env.example` to `.env` and update any placeholders you need for local development.

4. From the `infrastructure/` directory, run:
   - `docker compose up --build`

> **Important:** Docker Compose now reads its local-development variables from `infrastructure/.env`, which is gitignored. Start by copying `infrastructure/.env.example` to `infrastructure/.env`, then replace the Clerk placeholders with your real secret and publishable keys from the Clerk dashboard. Both the backend and frontend require these values to boot.

- The frontend will be available at [http://localhost:5173](http://localhost:5173)
- The backend API will be available at [http://localhost:3001](http://localhost:3001)
- The database will be available at `localhost:5432` (user: `sleck`, password: `sleckdev`, db: `sleck`)

### Service layout

- **frontend**: Hot-reloads on code changes (mounted volume). Uses `VITE_BACKEND_BASE_URL` to connect to backend.
- **backend**: Hot-reloads on code changes (mounted volume). Uses `DATABASE_URL` to connect to Postgres.
- **db**: Data persisted in a Docker volume (`sleck-db-data`).

### Environment variables

- All secrets and sensitive values should be set in `.env` files (not committed). See `.env.example` in each service and `infrastructure/.env.example` for required variables.
- Docker Compose reads its local defaults from `infrastructure/.env`, keeping the actual values out of `docker-compose.yml`.
- The backend runs on port 3001, and the frontend on port 5173, matching the minimal scaffold and Docker Compose config.
- The frontend uses `VITE_BACKEND_BASE_URL` (not `VITE_API_URL`).

### Stopping and cleaning up

- To stop all services: `docker compose down`
- To remove volumes/data: `docker compose down -v`

See `infrastructure/docker-compose.yml` for details and customization.

## Project status

This repository is currently in the planning and scaffolding stage. The product scope and target stack are defined here so the initial implementation can follow a consistent direction.

## Plan register

| Plan ID | Plan name                           | Status      |
|---------|-------------------------------------|-------------|
| PLN-001 | Initial repository scaffolding plan | Completed |
| PLN-002 | Core collaboration features implementation plan | In Progress |

See `plans/` for full plan details and status updates.

## Where to find:
- Plans: `plans/` (with register above)
- Agent commit conventions: `AGENT_COMMIT_CONVENTIONS.md`
- Agent roles: `AGENTS.md` and `.github/agents/`

## Repository tooling

Adapted from patterns used in `github/awesome-copilot`, this repository includes a lightweight tooling baseline:

- `.editorconfig` and `.gitattributes` to keep formatting and line endings consistent
- `.codespellrc` and a GitHub Actions spelling check
- a markdown line-ending check workflow
- VS Code recommendations and workspace settings in `.vscode/`
- a pull request template
- a `copilot-setup-steps` workflow for future Copilot agent workflow expansion

## Key governance and agent rules

- All agent commits must follow the conventions in `AGENT_COMMIT_CONVENTIONS.md` (commit subject: `[agent_name] | brief description`; commit body: plan name, agent in charge, task description).
- See `AGENTS.md` for agent roles and responsibilities.

## Copilot development assets

This repository also includes a curated Copilot asset set adapted for this specific project:

- `.github/instructions/` for stack, security, accessibility, and testing guidance
- `.github/agents/` for specialist agents: Danny (planning/orchestration), Aitor (frontend), Salva (backend), Vicente (devops), and Juanjo (changes review)
- `.github/skills/` for architecture blueprints and feature-slice planning
- `.github/hooks/secrets-scanner/` for optional secret scanning at the end of Copilot-driven sessions
- `AGENTS.md` as a repo-level guide to the asset layout and intended usage
- `AGENT_COMMIT_CONVENTIONS.md` for required agent commit message format
- `plans/` for approved execution plans and plan register
