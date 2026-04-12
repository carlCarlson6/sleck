# Initial repository scaffolding plan

## Problem statement

Set up the first executable project structure for Sleck by introducing:

- a backend scaffold in `./be` with an npm project, required backend dependencies, and base boilerplate code
- a frontend scaffold in `./fe` using Vite + React + TypeScript, plus the agreed supporting libraries while preserving the standard Vite starter app
- an `infrastructure/` area with Docker and Docker Compose configuration so the stack can run locally
- a `contracts/` area for OpenAPI YAML files as the cross-application contract source of truth
- a new Copilot agent named `Isabel` responsible for maintaining contract files, plus repo instructions that prevent other agents from editing those files directly
- documented git commit conventions for agents, with commit subject format `[agent_name] | brief description` and commit body including the plan name, assigned agent, and task description

The work should preserve the documented frontend/backend split, keep contracts explicit from day one, and leave the repo ready for incremental feature slices.

## Assumptions and open questions

### Assumptions

- `be` and `fe` will start as separate npm projects instead of introducing a root workspace immediately.
- Docker setup will target local development first, likely with `fe`, `be`, and `postgres` services.
- The contracts repository area will start with at least one baseline OpenAPI document and a small README describing ownership and update flow.
- Commit conventions will be documented in a repository markdown file and reflected in Copilot instructions so future agent-created commits follow the same shape.

### Open questions to confirm before implementation

- Should we keep `be` and `fe` fully independent, or introduce npm workspaces at the root during this first scaffold?
- Should Docker Compose run only local development services, or should we also prepare production-oriented Dockerfiles now?
- Do you want one shared contract file initially, or separate OpenAPI files per bounded area such as auth, servers, channels, and messages?
- Should the commit convention documentation live in a dedicated contributor guide (recommended) or be folded into `README.md` only?

## Task breakdown

1. **Repository governance and contract ownership** — **Vicente**
   - Create a `plans/` directory in the repository and store this execution plan there.
   - Update `README.md` with a plan register that lists plan names and statuses.
   - Create the `contracts/` directory shape and documentation for OpenAPI source-of-truth usage.
   - Add the new `Isabel` agent definition and update Copilot instructions/agent docs to reserve `contracts/**/*.yml` changes for Isabel.
   - Add markdown documentation for agent commit message conventions and update repo guidance files to reference it.

2. **Backend scaffold in `be/`** — **Salva**
   - Initialize a Node + TypeScript npm project in `be/`.
   - Add backend baseline dependencies aligned with the repo target stack.
   - Create base boilerplate for app startup, environment loading, health endpoint, and initial structure for Express + tRPC integration.
   - Add `.env.example` entries needed for backend startup without committing secrets.

3. **Frontend scaffold in `fe/`** — **Aitor**
   - Generate a Vite React TypeScript app in `fe/`.
   - Add the agreed frontend libraries while keeping the starter UI functional.
   - Establish a minimal folder structure ready for providers, routing, API client wiring, and auth integration later.
   - Add `.env.example` entries needed for frontend startup.

4. **Local infrastructure in `infrastructure/`** — **Vicente**
   - Add Dockerfiles and Docker Compose configuration for local orchestration.
   - Wire service-level environment expectations for frontend, backend, and PostgreSQL.
   - Document the local startup flow and service boundaries in `README.md`.

5. **Cross-check and hardening review** — **Juanjo**
   - Review the scaffold for security/configuration gaps, especially secret handling, env file hygiene, contract ownership rules, and Docker defaults.
   - Review generated boilerplate and docs for conflicts with the commit convention and agent responsibilities.

## Dependencies

- Task 1 should happen first because contract ownership and commit conventions affect all later work.
- Task 2 and Task 3 can proceed in parallel after Task 1.
- Task 4 depends on enough output from Task 2 and Task 3 to containerize both applications coherently.
- Task 5 depends on Tasks 1–4 being complete.

## Risks and edge cases

- The repo currently has no established workspace strategy, so introducing workspaces accidentally could create unnecessary root-level complexity.
- Using OpenAPI as the source of truth while planning to use tRPC later creates a drift risk unless ownership and update discipline are explicit from the start.
- Generated scaffolds may introduce defaults that conflict with Docker networking, environment-variable handling, or future Clerk integration.
- Backend and frontend boilerplates may assume direct runtime execution patterns that need adjustment for Compose-based local development.
- Future public/private server behavior is not implemented yet, but the initial contracts and folder layout should leave space for explicit auth and authorization boundaries.

## Validation strategy

- Backend starts locally from `be/` with its documented npm scripts.
- Frontend starts locally from `fe/` with the standard Vite developer flow.
- Docker Compose can boot the documented local stack successfully.
- `contracts/` contains documented OpenAPI source-of-truth files and instructions naming Isabel as the only contract-editing agent.
- Repo markdown/docs clearly explain:
  - project folder layout
  - Docker usage
  - contract ownership rules
  - agent commit message conventions
- Final review confirms no secrets are committed and no agent instructions conflict with each other.

## Recommended execution order

Start with **Vicente** on **Task 1: Repository governance and contract ownership** so the repo rules are in place before backend/frontend scaffolding begins.
