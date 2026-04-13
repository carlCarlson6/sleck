# Core application foundation plan

## Problem statement

The repository has only frontend and backend scaffolding. Before shipping any product feature, Sleck needs a shared application foundation for authentication, persistence, typed API boundaries, frontend providers, and basic testing.

## Assumptions and open questions

### Assumptions

- Clerk will provide the authenticated identity for protected flows.
- PostgreSQL is the primary datastore and Drizzle is the ORM layer.
- The first foundation slice should include only the primitives needed to unblock the core product plans.

### Open questions

- Which Clerk integration mode should be used first: local dev mock identity, full Clerk middleware, or both?
- Should routing be introduced immediately in the frontend, or can the initial shell stay single-route until server features land?

## Task breakdown

1. **Backend foundation** — **Salva**
   - Add environment validation, database connection setup, and Drizzle schema/migration scaffolding.
   - Introduce tRPC context with authenticated identity resolution and shared public/protected procedure helpers.
   - Define initial core tables and types needed by later plans: users, servers, memberships, channels, invites, and messages.
   - Add backend test tooling and initial auth/validation test helpers.
2. **Frontend foundation** — **Aitor**
   - Replace the Vite starter UI with an application shell ready for authenticated product flows.
   - Add app-level providers for Clerk, TanStack Query, and tRPC client wiring.
   - Create route and layout primitives for signed-in, signed-out, loading, and empty states.
   - Add minimal shared state for current server and current channel selection.
3. **Contract baseline** — **Isabel**
   - Create or extend domain contract files so planned server, membership, channel, and message endpoints have a governed source of truth.
4. **Developer workflow updates** — **Vicente**
   - Ensure local Docker and env setup cover database migrations, backend startup, and frontend-to-backend wiring.
   - Update service README guidance only where the new foundation changes setup steps.
5. **Cross-check and review** — **Juanjo**
   - Review auth boundaries, env handling, and any data-access or configuration gaps introduced by the foundation work.

## Dependencies

- No prior feature plan depends on this plan; it is the entry point for all product work.

## Risks and edge cases

- If auth context and protected procedure helpers are inconsistent, later authorization rules will drift.
- Over-designing the frontend shell now could slow down feature delivery; keep it intentionally thin.
- Contract and implementation drift is a risk unless Isabel updates happen alongside backend API changes.

## Validation strategy

- Authenticated and unauthenticated request paths behave differently at the tRPC boundary.
- Frontend bootstraps with providers and can render a signed-in shell instead of the Vite starter.
- Database and migration workflow are documented and runnable in local development.

## Recommended next agent

Start with **Salva** on backend foundation, then hand off frontend shell work to **Aitor** once API/auth primitives are defined.
