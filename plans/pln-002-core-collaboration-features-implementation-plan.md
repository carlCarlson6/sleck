# PLN-002 - Core collaboration features implementation plan

## Plan ID

PLN-002

## Status

In Progress

## Current state snapshot

- `fe/` is still the default Vite/React starter app with no Clerk, routing, tRPC client, server workspace UI, or chat experience.
- `be/` only exposes an Express `/health` endpoint and does not yet include tRPC procedures, Clerk verification, Drizzle models, or messaging APIs.
- Docker Compose exists for local full-stack development, but the application slices for auth, servers, channels, and chat are not implemented yet.

## Problem statement

Plan the next implementation work so Sleck can progress from scaffold to a usable collaboration product with four enforced phases: Clerk login, server management, channel management, and real-time channel chat.

## Proposed approach

Use one master plan with review-gated phases and explicit parallel implementation lanes inside each phase. Each phase ships a vertical slice with explicit backend, frontend, and review ownership, and later phases remain blocked until the prior phase has passed review.

## Assumptions and open questions

- Clerk is the authentication provider for both frontend session UX and backend identity verification.
- Real-time chat is required in the first chat slice and will use Server-Sent Events for message delivery plus authenticated write mutations for sending messages.
- Server management includes server creation, listing, editing, deletion, public discoverability, public join flow, private invite-only membership, and membership-aware authorization.
- Channel management is limited to server-owner CRUD for channels; moderation roles beyond ownership are out of scope for this plan.
- Channel chat includes message creation, channel history loading, live delivery, and reconnect-safe backfill. Editing, deletion, reactions, threads, attachments, and presence are out of scope.
- If cross-team interface changes become necessary later, they should be documented in the plan and tracked as separate work before implementation continues.

## Task breakdown

1. **Vicente** — Prepare cross-service foundation for the feature program: add required dependency and environment planning for Clerk, tRPC, Drizzle, and PostgreSQL usage; align local development and documentation so later slices can build on a consistent base. **Status:** Complete

   - Installed foundation dependencies for tRPC, Drizzle, PostgreSQL, and Clerk in both backend and frontend (`@trpc/server`, `@trpc/client`, `@trpc/react-query`, `@clerk/clerk-sdk-node`, `@clerk/clerk-react`, `drizzle-orm`, `pg`).
   - Updated `be/.env.example` and `fe/.env.example` to include required environment variables for Clerk and PostgreSQL.
   - Updated documentation in `README.md` to reflect the new foundation and local development expectations.
   - No business logic, auth, or API wiring added yet; only the foundation for later slices.
   - See "Parallel handoff contract" below for explicit unblocking notes for tasks 2 and 3.

---
**Parallel handoff contract for tasks 2 and 3:**

- All required foundation dependencies for Clerk, tRPC, Drizzle, and PostgreSQL are now installed in both backend and frontend workspaces.
- Backend expects `DATABASE_URL` and `CLERK_SECRET_KEY` in its environment (see `be/.env.example`).
- Frontend expects `VITE_BACKEND_BASE_URL` and `VITE_CLERK_PUBLISHABLE_KEY` in its environment (see `fe/.env.example`).
- Local development is aligned: Docker Compose provides Postgres on `localhost:5432` (user: `sleck`, password: `sleckdev`, db: `sleck`).
- No business logic, auth, or tRPC wiring is present yet; Salva and Aitor should begin from this foundation.
- No contract or API shape is defined yet; Salva must publish backend context/auth contract at kickoff for Aitor.
- No blockers for tasks 2 and 3; both can proceed in parallel from this base.
---
2. **Salva** — Implement backend authentication foundation: Express/tRPC wiring, authenticated context creation, Clerk token verification, protected procedure helpers, and application-side identity plumbing. **Status:** Complete

---

### Backend auth/context contract for Aitor (Phase 1)

- **tRPC endpoint path:** `/trpc`
- **Context shape:**
  - `req`: IncomingMessage (raw Express request)
  - `user`: null if unauthenticated, else:
    - `id`: Clerk user ID (string)
    - `email`: primary email (string|null)
    - `clerkUser`:
      - `id`: Clerk user ID
      - `emailAddresses`: array of `{ emailAddress: string }`
      - `firstName`: string|null
      - `lastName`: string|null
      - `imageUrl`: string|null
- **Procedure helpers:**
  - `publicProcedure`: no auth required
  - `protectedProcedure`: requires valid Clerk token; throws `UNAUTHORIZED` error if not present/valid
- **Example procedures:**
  - `publicHello`: public, input `{ name?: string }`, output `{ message: string }`
  - `whoami`: protected, no input, output `{ id, email, profile }` (profile = `clerkUser`)
- **Auth expectations:**
  - Clerk JWT must be provided as Bearer token (or via Clerk SDK supported means)
  - If token is missing/invalid, `protectedProcedure` throws `UNAUTHORIZED` (tRPC error)
  - `publicProcedure` always accessible
- **Error behavior:**
  - Auth errors are surfaced as tRPC `UNAUTHORIZED` errors (code: 'UNAUTHORIZED', message: 'Authentication required')
  - No silent fallback to partial context
- **/health endpoint:** remains at `/health` (public)
- Backend auth now runs through Clerk's Express middleware before tRPC context creation, and the backend still preserves `/health` as a public endpoint.
- Phase 1 backend foundation includes a concrete public procedure (`publicHello`) and protected procedure (`whoami`) for frontend integration and auth verification.
---

3. **Aitor** — Implement frontend authentication foundation: Clerk provider setup, signed-in/signed-out entry flows, guarded app shell, and the first authenticated navigation frame for the product. **Status:** Complete

    - ClerkProvider is now wired in the frontend bootstrap (main.tsx) using VITE_CLERK_PUBLISHABLE_KEY from environment.
    - Signed-out users see a high-contrast, accessible sign-in entry point using Clerk's SignInButton (modal mode).
    - Signed-in users are gated into a guarded app shell, with a minimal navigation frame (AppNavFrame) and placeholder workspace.
    - No server/channel/chat features are present yet; only the auth foundation and navigation frame.
    - Consumed backend contract assumptions: Clerk is the auth provider, frontend uses Clerk publishable key, no backend auth API is required for this phase, and no business logic or tRPC wiring is present yet.
    - UI is accessible, keyboard-friendly, and visually aligned with the terminal-inspired style guidance.
    - No changes to contracts/ or backend API assumptions for this phase.

4. **Juanjo** — Review Phase 1 for auth correctness, secret handling, build readiness, and unauthorized access gaps. **Status:** Blocked

   - Review found a blocking Phase 1 runtime/config mismatch: the current Clerk env contract is incomplete across frontend, backend, Docker Compose, and documentation, so a fresh local setup does not reliably boot the signed-out frontend or public tRPC endpoint.
   - Follow-up remediation aligned Docker Compose and documentation for the frontend Clerk key requirement, but Phase 1 remains blocked because the current backend Clerk middleware still makes `GET /trpc/publicHello` fail with `Publishable key is missing` under the documented backend environment contract.
   - Required remediation before task 4 can pass: align the actual Clerk runtime requirements across backend auth middleware, service code, `.env.example` files, Docker Compose defaults, and README guidance; then re-run the Phase 1 review gate.
5. **Salva** — Implement backend server management slice: server, membership, and invite data modeling; APIs for create/read/update/delete; public discovery and join; private invite-only membership; and ownership/membership authorization rules. **Status:** Pending
6. **Aitor** — Implement frontend server management UX: create server flow, server list/discovery, join flow for public servers, invite acceptance entry points for private servers, and owner-facing server settings screens. **Status:** Pending
7. **Juanjo** — Review Phase 2 for public/private boundary correctness, authorization coverage, and API/UI consistency. **Status:** Pending
8. **Salva** — Implement backend channel management slice: channel data model, owner-only channel CRUD procedures, membership-gated channel reads, and channel ordering/selection rules within servers. **Status:** Pending
9. **Aitor** — Implement frontend channel management UX inside the server workspace: channel list, create/edit/delete dialogs, selection state, and empty/error states consistent with permissions. **Status:** Pending
10. **Juanjo** — Review Phase 3 for channel authorization, security, and product behavior regressions. **Status:** Pending
11. **Vicente** — Add the real-time transport foundation for chat using Server-Sent Events, including local development/runtime considerations, connection lifecycle expectations, and any required environment or deployment adjustments. **Status:** Pending
12. **Salva** — Implement backend channel chat slice: message persistence model, membership-gated history reads, send-message mutations, SSE publication pipeline, and reconnect/backfill behavior. **Status:** Pending
13. **Aitor** — Implement frontend channel chat UX: history loading, message composer, live stream subscription handling, optimistic/send states, and accessible status/error feedback for the active channel. **Status:** Pending
14. **Juanjo** — Review Phase 4 and overall readiness for the collaboration baseline: chat authorization, transport abuse risks, build/config issues, and cross-phase regressions. **Status:** Pending

## Parallel execution lanes

- **Phase 1 parallel lane:** after task 1 is complete, dispatch tasks 2 and 3 together. Task 4 starts only after both implementation tasks are complete and locally committed.
- **Phase 2 parallel lane:** after task 4 is complete, dispatch tasks 5 and 6 together. Salva should publish the server-management API and authorization assumptions at kickoff so Aitor can proceed without waiting for task 5 to finish. Task 7 starts only after both implementation tasks are complete and locally committed.
- **Phase 3 parallel lane:** after task 7 is complete, dispatch tasks 8 and 9 together. Salva should publish the channel-management procedure and permission assumptions at kickoff so Aitor can proceed in parallel. Task 10 starts only after both implementation tasks are complete and locally committed.
- **Phase 4 staging:** task 11 remains the transport prerequisite. After task 11 is complete, dispatch tasks 12 and 13 together. Vicente and Salva should make the SSE transport, event payload, reconnect, and mutation/query assumptions explicit at kickoff so Aitor can proceed in parallel. Task 14 starts only after tasks 11, 12, and 13 are complete and locally committed.

## Dependencies

- Task 2 depends on task 1.
- Task 3 depends on task 1.
- Task 4 depends on tasks 2 and 3.
- Task 5 depends on task 4.
- Task 6 depends on task 4.
- Task 7 depends on tasks 5 and 6.
- Task 8 depends on task 7.
- Task 9 depends on task 7.
- Task 10 depends on tasks 8 and 9.
- Task 11 depends on task 10.
- Task 12 depends on task 11.
- Task 13 depends on task 11.
- Task 14 depends on tasks 11, 12, and 13.

## Parallel handoff instructions

1. Danny should dispatch every ready task in the same parallel lane in one orchestration step, with exactly one agent assigned to each task.
2. The backend or transport owner for a parallel lane must document the contract that unblocks the paired task at kickoff in the plan or handoff context: routes or procedures, key payload shapes, authorization expectations, and any known blockers.
3. Aitor may proceed on a parallel frontend task from that documented contract and should avoid inventing behavior that conflicts with the plan's public/private server and membership rules.
4. If a parallel task discovers an interface change that invalidates the paired task, the agent should stop, update the plan, and re-route through Danny before continuing.
5. Juanjo should only begin the review task for a phase after every implementation task in that phase's lane is complete and committed according to `AGENT_COMMIT_CONVENTIONS.md`.

## Risks and edge cases

- Clerk identity must be mapped cleanly into application ownership and membership checks without trusting client-supplied user IDs.
- Public server discovery must not leak private server metadata, invite details, or channel contents.
- Membership checks must gate both channel history reads and message writes; joining a public server must remain distinct from merely discovering it.
- SSE connections must authenticate correctly, recover on reconnect, and avoid leaking messages across servers or channels.
- Message ordering, duplicate delivery on reconnect, and initial history/backfill boundaries need explicit handling to keep chat reliable.
- The scaffold currently lacks most target-stack dependencies, so the foundation phase must avoid introducing conflicting abstractions that slow later slices.

## Validation strategy

- Phase 1: verify authenticated and unauthenticated flows, protected backend entrypoints, and local configuration for Clerk-backed login.
- Phase 2: verify public server discovery/join, private invite-only membership, owner-only server settings, and denied access paths.
- Phase 3: verify owner-only channel CRUD, membership-based channel visibility, and stable workspace navigation states.
- Phase 4: verify two-member live chat delivery in a shared channel, denied access for non-members, reconnect-safe history/backfill, and accessible composer/status behavior.
- Run the documented backend/frontend build and validation commands at each phase, then complete a Juanjo review gate before unlocking the next phase.

## Next task referral

The active blocker should be assigned to **Vicente** to align the Phase 1 Clerk runtime contract across service configuration, Docker Compose, and documentation so task 4 can be re-reviewed. Once Juanjo clears task 4, Danny should refer task 5 to **Salva** next for the user-requested limited execution window before manual review.
