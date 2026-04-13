# Core functionality roadmap

## Problem statement

Review the documented product scope against the current implementation, identify what is still missing, and define an execution roadmap that turns the scaffold into a working first slice of Sleck.

## Current implementation review

### Documented core functionality in `README.md`

- Users can create servers.
- Servers can be public or private.
- Public servers are discoverable and joinable by any user.
- Private servers are hidden and invite-only.
- Server owners can CRUD channels.
- Server members can chat in server channels.

### Current code status

- `be/` has only an Express bootstrap, a health endpoint, and an empty tRPC router.
- `fe/` still renders the default Vite starter UI with no app shell, auth, routing, API wiring, or product flows.
- Docker and repo governance are present, but there is no product data model, no Clerk integration, no Drizzle wiring, no feature tests, and no contract updates for the planned API surface.

## Assumptions and open questions

### Assumptions

- Clerk remains the identity provider for authenticated product flows.
- PostgreSQL and Drizzle will be introduced as the persistence layer before feature-specific business logic.
- The first messaging slice should prioritize correctness and access control over real-time delivery.
- Contract updates needed by these plans will be handed off to **Isabel**.

### Open questions

- Should the first release include unauthenticated public server browsing, or require sign-in before discovery and join?
- Should private invites be token-only links, code-based, or both?
- Should the first messaging slice support message editing and deletion, or only send and read?

## Task breakdown

1. **Core application foundation plan** — **Salva**, **Aitor**, **Vicente**, **Juanjo**
   - Establish auth, data, API, client providers, and test scaffolding needed by every feature.
2. **Server creation and visibility plan** — **Salva**, **Aitor**, **Isabel**, **Juanjo**
   - Ship server creation with owner membership and public/private visibility.
3. **Public server discovery and join plan** — **Salva**, **Aitor**, **Isabel**, **Juanjo**
   - Add discovery and self-join for public servers without leaking private servers.
4. **Private server invites and membership plan** — **Salva**, **Aitor**, **Isabel**, **Juanjo**
   - Add invite issuance, acceptance, and private membership controls.
5. **Channel management plan** — **Salva**, **Aitor**, **Isabel**, **Juanjo**
   - Add owner-only channel CRUD and member channel listing.
6. **Channel messaging plan** — **Salva**, **Aitor**, **Isabel**, **Juanjo**
   - Add channel message read/send flows for members.

## Dependencies

- The **Core application foundation plan** is a hard prerequisite for all other plans.
- **Server creation and visibility** depends on the foundation plan.
- **Public server discovery and join** depends on the foundation plan and server creation.
- **Private server invites and membership** depends on the foundation plan and server creation.
- **Channel management** depends on the foundation plan and server creation; it should follow public/private membership work so authorization rules are stable.
- **Channel messaging** depends on the foundation plan, server creation, membership flows, and channel management.

## Risks and edge cases

- Private server metadata must never leak through public discovery, lookup, or search APIs.
- Owner, member, and non-member permissions must stay distinct across all plans.
- Missing auth integration could cause broad rework if feature work starts before the foundation is in place.
- Messaging scope can expand quickly; real-time delivery, unread state, and moderation should be explicitly deferred unless requested.

## Validation strategy

- Every plan should include backend authorization tests and frontend behavior tests for its own scope.
- Public/private visibility rules must be proven through both positive and negative test cases.
- Each feature should be demonstrable through the frontend, not only through backend procedure coverage.

## Recommended execution order

1. **Core application foundation plan**
2. **Server creation and visibility plan**
3. **Public server discovery and join plan**
4. **Private server invites and membership plan**
5. **Channel management plan**
6. **Channel messaging plan**

After the roadmap is approved, refer the next task to **Salva** for execution of the **Core application foundation plan**.
