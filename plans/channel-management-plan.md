# Channel management plan

## Problem statement

Once a server exists and membership rules are in place, server owners need to create, update, and delete channels, while members need to see the channels available inside servers they belong to.

## Assumptions and open questions

### Assumptions

- Channel CRUD permissions belong to the server owner in the first slice.
- Members can list and enter channels for servers they belong to.
- Channel hierarchy, threading, and permissions beyond server membership are out of scope for this plan.

### Open questions

- Should every new server receive a default channel automatically?
- Should channel ordering be manual in the first slice, or simply creation order?

## Task breakdown

1. **Channel backend** — **Salva**
   - Add channel persistence and procedures for create, list, update, and delete.
   - Enforce owner-only mutations and membership-gated reads.
   - Validate server ownership, membership, and invalid identifier cases explicitly.
2. **Channel UI** — **Aitor**
   - Add channel list and channel management flows in the server experience.
   - Expose create, rename, and delete controls only to server owners.
   - Provide useful empty states for servers with no channels.
3. **Contract update** — **Isabel**
   - Define or update channel CRUD and channel listing contracts.
4. **Review** — **Juanjo**
   - Review authorization separation between owner, member, and non-member behavior.

## Dependencies

- Depends on the **Core application foundation plan**.
- Depends on the **Server creation and visibility plan**.
- Should follow the **Public server discovery and join plan** and **Private server invites and membership plan** so member access rules are already exercised.

## Risks and edge cases

- Non-members must not infer channel existence.
- Delete behavior needs clear handling when messages are introduced later.
- Owner-only controls must not be exposed or executable by regular members.

## Validation strategy

- Owners can create, rename, and delete channels in their servers.
- Members can list channels but cannot mutate them.
- Non-members cannot list or access channels for servers they do not belong to.

## Recommended next agent

Refer this plan to **Salva** after both membership paths are available.
