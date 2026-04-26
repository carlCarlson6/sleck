# PLN-001 - Initial repository scaffolding plan

## Plan ID

PLN-001

## Status

In progress

## Problem statement

Scaffold the first runnable Sleck stack so the repository matches its documented structure: a minimal Express backend in `be/`, a minimal Vite React frontend in `fe/`, and Docker Compose infrastructure in `infrastructure/` to run both services with PostgreSQL locally.

## Assumptions and open questions

- Scope is intentionally minimal for the first slice.
- The backend is Express-based and TypeScript-based.
- The frontend is a React app created with Vite and TypeScript.
- PostgreSQL is part of the local Docker stack, but application data modeling is deferred.
- Clerk, tRPC, Drizzle, and product features are deferred until the base scaffold is in place.

## Task breakdown

1. **Salva** — Scaffold the backend under `be/` with Express, TypeScript, package scripts, environment template, and a minimal health endpoint. **Status:** Done (`bcfb51d`)
2. **Aitor** — Scaffold the frontend under `fe/` with Vite, React, TypeScript, package scripts, environment template, and a minimal app shell that can target the backend. **Status:** Done (`ebe3a16`)
3. **Vicente** — Add `infrastructure/docker-compose.yml` and related container configuration so frontend, backend, and PostgreSQL run together locally with safe development defaults. **Status:** Done (`152d244`)
4. **Juanjo** — Review the scaffold for configuration correctness, secret handling, documentation accuracy, and readiness for the next feature slice. **Status:** In progress

## Dependencies

- Task 3 depends on tasks 1 and 2.
- Task 4 depends on task 3.

## Risks and edge cases

- The repo README previously described directories that did not yet exist; docs must stay aligned with the actual scaffold.
- Docker Compose must not depend on committed secret files.
- PostgreSQL should be wired for local development without prematurely introducing schema or auth complexity.
- The scaffold should stay minimal and avoid locking in abstractions that conflict with the longer-term target stack.

## Validation strategy

- `be/` builds and starts with documented commands.
- `fe/` builds and starts with documented commands.
- Docker Compose can run frontend, backend, and PostgreSQL together locally.
- Repo and service documentation reflect the actual scaffolded workflow.
- A final review confirms configuration and security basics before the plan is marked complete.
