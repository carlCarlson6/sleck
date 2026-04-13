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

1. **Core foundation backend and data slice** — **Salva**
   - Establish auth, persistence, tRPC primitives, and backend test scaffolding needed by every feature.
2. **Core foundation frontend shell slice** — **Aitor**
   - Replace the starter UI with the signed-in shell, providers, and navigation primitives needed by every feature.
3. **Core foundation developer workflow slice** — **Vicente**
   - Update Docker and environment workflows to support database, backend, and frontend development after the foundation lands.
4. **Core foundation review slice** — **Juanjo**
   - Review the foundation for auth, config, and security regressions before feature work begins.
5. **Server creation backend slice** — **Salva**
   - Ship server creation, owner membership, and server visibility persistence.
6. **Server creation frontend slice** — **Aitor**
   - Add the create-server flow and owner-facing server navigation.
7. **Server creation contract slice** — **Isabel**
   - Update governed contracts for server creation and server summary payloads.
8. **Server creation review slice** — **Juanjo**
   - Review creation flow validation and public/private visibility handling.
9. **Public discovery backend slice** — **Salva**
   - Add public server listing and join behavior without leaking private servers.
10. **Public discovery frontend slice** — **Aitor**
   - Add discovery UI, join states, and post-join navigation.
11. **Public discovery contract slice** — **Isabel**
   - Update governed contracts for discovery and join responses.
12. **Public discovery review slice** — **Juanjo**
   - Review privacy leakage and unauthorized join paths.
13. **Private invite backend slice** — **Salva**
   - Add private invite issuance, acceptance, revocation, and membership rules.
14. **Private invite frontend slice** — **Aitor**
   - Add invite management and invite acceptance flows.
15. **Private invite contract slice** — **Isabel**
   - Update governed contracts for private invite and membership flows.
16. **Private invite review slice** — **Juanjo**
   - Review invite secrecy, revocation behavior, and private access boundaries.
17. **Channel management backend slice** — **Salva**
   - Add channel CRUD and membership-gated listing.
18. **Channel management frontend slice** — **Aitor**
   - Add channel list and owner-only management controls.
19. **Channel management contract slice** — **Isabel**
   - Update governed contracts for channel CRUD and listing.
20. **Channel management review slice** — **Juanjo**
   - Review owner/member/non-member separation for channel actions.
21. **Channel messaging backend slice** — **Salva**
   - Add message read/send procedures with channel-bound authorization.
22. **Channel messaging frontend slice** — **Aitor**
   - Add message timeline and composer flows.
23. **Channel messaging contract slice** — **Isabel**
   - Update governed contracts for message read and create flows.
24. **Channel messaging review slice** — **Juanjo**
   - Review message access control, rendering safety, and failure handling.

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
