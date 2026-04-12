# Copilot instructions for `sleck`

## Repository state

- This repository now includes application code and structure:
  - `be/` (backend, Node.js/TypeScript/Express/tRPC)
  - `fe/` (frontend, Vite/React/TypeScript)
  - `infrastructure/` (Docker Compose, infra config)
  - `contracts/` (OpenAPI contracts, Isabel-governed)
  - `plans/` (plan register and execution plans)
- Local build, test, and dev commands exist in both `be/` and `fe/` (see their READMEs).
- Docker Compose infrastructure is provided for local full-stack development.
- Contract governance and Isabel agent rules are enforced for all changes to `contracts/`.
- Copilot-facing assets live in `.github/instructions/`, `.github/agents/`, `.github/skills/`, `.github/hooks/`, and `AGENTS.md`.

## Build, test, and lint commands

- Build, test, and dev commands are now present in both `be/` and `fe/`:
  - Backend: see `be/README.md` for `npm install`, `npm run dev`, and related commands.
  - Frontend: see `fe/README.md` for `npm install`, `npm run dev`, and related commands.
- Docker Compose can be used for local full-stack development (see `infrastructure/`).
- Repo-level automation exists in GitHub Actions for markdown line-ending checks and spelling checks.

## High-level architecture

- The repository is organized into backend (`be/`), frontend (`fe/`), infrastructure (`infrastructure/`), contracts (`contracts/`), and plans (`plans/`).
- Frontend stack: Vite, React, TypeScript, Zustand, Zod, TanStack Query, tRPC, Clerk.
- Backend stack: Node.js, TypeScript, Express, tRPC, Drizzle, PostgreSQL, Clerk.
- See each service's README for details and commands.

## Product scope currently defined

- Users can create servers.
- Servers can be public or private.
- Public servers must be discoverable and joinable by any user.
- Private servers must not be discoverable; only server owners can invite users into them.
- Server owners can CRUD server channels.
- Server members can chat with the rest of the members through a server channel.

## Key conventions in the repo

### Commit conventions for plan-driven work

When agents execute an approved plan, they **must** commit changes according to the repository conventions in `AGENT_COMMIT_CONVENTIONS.md`. Do not invent new formats. The commit subject and body must follow the required structure, including plan name, agent, and task description. This ensures traceability and consistency across all agent-driven work.

- `.gitignore` covers Node, TypeScript, and web-app artifacts. Node modules and build outputs are ignored; `.env.example` is committed as a template.
- Environment files: `.env*` is ignored, `.env.example` is committed for each service. Do not commit real `.env` or `db.env` files.
- Formatting and line-ending behavior is anchored by `.editorconfig` and `.gitattributes`.
- VS Code workspace recommendations: `.vscode/extensions.json` and `.vscode/settings.json`.
- GitHub collaboration tooling: PR template, markdown line-ending check, spelling check, Copilot setup steps.
- Use `.github/instructions/` for stack-specific guidance, `.github/agents/` for agent roles, `.github/skills/` for reusable workflows.
- Only Isabel may modify `contracts/`; all other agents must hand off contract changes.
- All agent commits must follow `AGENT_COMMIT_CONVENTIONS.md`.
- The optional `.github/hooks/secrets-scanner/` helps prevent secret leaks.
