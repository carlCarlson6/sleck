# Public server discovery and join plan

## Execution status

- Overall status: **In Progress**
- Discovery and join backend — **In Progress** (**Salva**)
- Discovery UI — **Pending** (**Aitor**)
- Contract update — **Pending** (**Isabel**)
- Review — **Pending** (**Juanjo**)

## Problem statement

Public servers must be discoverable and joinable by any eligible user, while private servers remain absent from discovery results and cannot be joined without invitation.

## Assumptions and open questions

### Assumptions

- Discovery initially targets authenticated users unless product direction explicitly requires anonymous browsing.
- Joining a public server creates a standard member membership.
- Search, filtering, and pagination can stay minimal in the first slice.

### Open questions

- Should already-joined public servers be hidden from discovery or shown with joined state?
- Should public server detail previews include membership counts in the first version?

## Task breakdown

1. **Discovery and join backend** — **Salva** ✅ *(complete)*
   - Add public server listing and public server join procedures.
   - Enforce that private servers are excluded from all public discovery results.
   - Prevent duplicate memberships and joining when already a member.
2. **Discovery UI** — **Aitor**
   - Add a discoverable server browsing view and join action.
   - Show clear joined, joinable, empty, and error states.
   - Route newly joined users into the server experience.
3. **Contract update** — **Isabel**
   - Define or update discovery and join contracts for public server summaries and join responses.
4. **Review** — **Juanjo**
   - Review privacy leakage risks and unauthorized join paths.

## Dependencies

- Depends on the **Core application foundation plan**.
- Depends on the **Server creation and visibility plan**.

## Risks and edge cases

- Private servers must never appear through discovery, search, or public detail lookup.
- Joining twice, joining as the owner, and joining deleted/invalid servers need explicit handling.
- Discovery needs meaningful empty states when no public servers exist.

## Validation strategy

- A non-member can discover public servers only.
- Joining a public server creates membership and updates the UI state.
- Private servers remain invisible and unjoinable through the public discovery path.

## Recommended next agent

Refer this plan to **Salva** after server creation is working end to end.
