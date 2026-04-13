# Server creation and visibility plan

## Execution status

- Overall status: **Completed**
- Data and business rules — **Done** (**Salva**)
- Frontend flow — **Done** (**Aitor**)
- Contract update — **Done** (**Isabel**)
- Review — **Done** (**Juanjo**)

## Problem statement

Sleck needs the first product-level entity: a user must be able to create a server, choose whether it is public or private, and become its owner immediately.

## Assumptions and open questions

### Assumptions

- A created server automatically creates an owner membership for the creator.
- Public/private visibility is stored as explicit server state, not inferred from invite settings.
- The first slice can use a simple create flow without advanced branding or customization.

### Open questions

- Should server names be globally unique, unique per owner, or non-unique with an internal identifier?
- Should the first slice include server editing at creation time only, or also later settings updates?

## Task breakdown

1. **Data and business rules** — **Salva**
   - Add server and membership persistence with owner role support.
   - Implement server creation and server listing procedures for the authenticated user.
   - Enforce ownership and membership invariants at creation time.
2. **Frontend flow** — **Aitor**
   - Add a server creation entry point and form in the signed-in application shell.
   - Add initial server navigation so created servers are visible to the owner.
   - Surface public/private visibility clearly in the UI.
3. **Contract update** — **Isabel**
   - Define or update the contract for server creation and server summary payloads.
4. **Review** — **Juanjo**
   - Check owner creation flow, input validation, and privacy flag enforcement.

## Dependencies

- Depends on the **Core application foundation plan**.

## Risks and edge cases

- Ownership must not be assignable from the client.
- Private/public state must be persisted explicitly so later discovery and invite logic stay predictable.
- Empty-state UX matters because this is the first useful product action.

## Validation strategy

- An authenticated user can create a public server and a private server.
- The creator is stored and recognized as the owner in both cases.
- The frontend server list reflects the created server without exposing private data to other users.

## Recommended next agent

After the foundation plan, refer this plan to **Salva** first for data and procedure work.
