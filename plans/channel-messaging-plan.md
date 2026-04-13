# Channel messaging plan

## Problem statement

Sleck needs the first working chat flow: members of a server channel must be able to read channel messages and send new messages within the access rules of their server membership.

## Assumptions and open questions

### Assumptions

- The first slice covers message listing and message creation only.
- Real-time transport, message editing, deletion, reactions, and unread tracking are deferred.
- Channel access derives from server membership, not separate per-channel ACLs.

### Open questions

- Should the first slice include pagination from the start, or a simple bounded recent-message feed?
- Should optimistic UI be included immediately, or deferred until the base message flow is stable?

## Task breakdown

1. **Message backend** — **Salva**
   - Add message persistence and procedures for reading recent messages and sending new ones.
   - Enforce membership-gated reads and writes at the channel boundary.
   - Validate channel existence, membership, and malformed payloads explicitly.
2. **Message UI** — **Aitor**
   - Add channel message timeline and composer UI.
   - Handle loading, empty, sent, and failed states clearly.
   - Keep the UI keyboard-friendly and suitable for chat usage.
3. **Contract update** — **Isabel**
   - Define or update message read and message create contracts.
4. **Review** — **Juanjo**
   - Review message access control, unsafe rendering risks, and failure handling.

## Dependencies

- Depends on the **Core application foundation plan**.
- Depends on the **Server creation and visibility plan**.
- Depends on the **Public server discovery and join plan** and **Private server invites and membership plan** for stable membership behavior.
- Depends on the **Channel management plan**.

## Risks and edge cases

- Non-members must not read or post messages even if they know a channel identifier.
- Message rendering must avoid unsafe handling of user-authored content.
- Message history shape should leave room for later pagination without breaking clients.

## Validation strategy

- Members can read and send messages in channels they can access.
- Non-members cannot read or send messages in those channels.
- Frontend timeline and composer handle empty, loading, and error states coherently.

## Recommended next agent

This is the final core feature plan and should be handed to **Salva** after channel CRUD is complete.
