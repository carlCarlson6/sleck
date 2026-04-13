# Private server invites and membership plan

## Problem statement

Private servers must stay hidden from discovery and only become accessible through owner-managed invites that create valid memberships when accepted.

## Assumptions and open questions

### Assumptions

- Only the server owner can issue, revoke, or inspect invites in the first slice.
- Invite acceptance creates a member membership and does not grant ownership or moderation permissions.
- The first slice can support link-based invites with optional expiry and revocation.

### Open questions

- Should invites be single-use, reusable until expiry, or configurable per invite?
- Should owners be able to remove members in the same plan, or defer that to later moderation work?

## Task breakdown

1. **Invite and membership backend** — **Salva**
   - Add invite persistence, issuance, listing, revocation, and acceptance procedures.
   - Enforce owner-only invite management and hide private server details from non-members before acceptance.
   - Create membership on acceptance and block expired, revoked, or malformed invites.
2. **Invite management and acceptance UI** — **Aitor**
   - Add owner invite management affordances for private servers.
   - Add invite acceptance flow with clear success, invalid, expired, and already-used messaging.
   - Make private server access states explicit for invited users versus non-members.
3. **Contract update** — **Isabel**
   - Define or update invite management and invite acceptance contracts.
4. **Review** — **Juanjo**
   - Review invite secrecy, revocation behavior, and non-member access boundaries.

## Dependencies

- Depends on the **Core application foundation plan**.
- Depends on the **Server creation and visibility plan**.

## Risks and edge cases

- Private server metadata leakage is the primary security risk.
- Revoked, expired, or replayed invite tokens must fail closed.
- Invite acceptance must not create duplicate memberships or bypass authentication rules.

## Validation strategy

- Owners can issue and revoke private server invites.
- Invited users can join through a valid invite and become members.
- Non-members cannot discover or access private servers without a valid invite.

## Recommended next agent

This can start after server creation is stable; refer it to **Salva** in parallel with public discovery if desired.
