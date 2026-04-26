# Copilot instructions for `sleck`

## Repository state

- This repository now includes application code and structure:
  - `be/` (backend, Node.js/TypeScript/Express/tRPC)
  - `fe/` (frontend, Vite/React/TypeScript)
  - `infrastructure/` (Docker Compose, infra config)
  - `plans/` (plan register and execution plans)
- Local build, test, and dev commands exist in both `be/` and `fe/` (see their READMEs).
- Docker Compose infrastructure is provided for local full-stack development.
- Copilot-facing assets live in `.github/instructions/`, `.github/agents/`, `.github/skills/`, `.github/hooks/`, and `AGENTS.md`.

## Build, test, and lint commands

- Build, test, and dev commands are now present in both `be/` and `fe/`:
  - Backend: see `be/README.md` for `npm install`, `npm run dev`, and related commands.
  - Frontend: see `fe/README.md` for `npm install`, `npm run dev`, and related commands.
- Docker Compose can be used for local full-stack development (see `infrastructure/`).
- Repo-level automation exists in GitHub Actions for markdown line-ending checks and spelling checks.

## High-level architecture

- The repository is organized into backend (`be/`), frontend (`fe/`), infrastructure (`infrastructure/`), and plans (`plans/`).
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

Every approved plan must have a stable plan identifier in the format `PLN-###`. Record that ID in the plan document itself and in the repo plan register so plan status and related commits can be tracked unambiguously even if plan titles evolve.

When agents execute an approved plan, they **must** commit changes according to the repository conventions in `AGENT_COMMIT_CONVENTIONS.md`. Do not invent new formats. The commit subject and body must follow the required structure, including plan ID, plan name, agent, and task description. This ensures traceability and consistency across all agent-driven work.

- When an agent completes its assigned task from an approved plan, it **must create a local git commit** for that task before handoff.
- The commit must contain only the completed task's changes and must not include unrelated worktree changes.
- If the task is not complete, the agent must not create the commit yet.
- Approved plans may define explicit parallel execution lanes. When a lane is marked ready, Danny should dispatch each task in that lane concurrently to different agents while preserving single-agent ownership per task.
- For a parallel lane, the backend or transport owner must publish the contract that unblocks the paired task at kickoff: relevant procedures or routes, payload shapes, authorization rules, environment assumptions, and known blockers.
- Review tasks remain sequential gates: Juanjo starts only after every implementation task in the lane is complete and locally committed.

- `.gitignore` covers Node, TypeScript, and web-app artifacts. Node modules and build outputs are ignored; `.env.example` is committed as a template.
- Environment files: `.env*` is ignored, `.env.example` is committed for each service. Do not commit real `.env` or `db.env` files.
- Formatting and line-ending behavior is anchored by `.editorconfig` and `.gitattributes`.
- VS Code workspace recommendations: `.vscode/extensions.json` and `.vscode/settings.json`.
- GitHub collaboration tooling: PR template, markdown line-ending check, spelling check, Copilot setup steps.
- Use `.github/instructions/` for stack-specific guidance, `.github/agents/` for agent roles, `.github/skills/` for reusable workflows.
- All agent commits must follow `AGENT_COMMIT_CONVENTIONS.md`.
- The optional `.github/hooks/secrets-scanner/` helps prevent secret leaks.
