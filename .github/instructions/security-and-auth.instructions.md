---
description: 'Security guidance for auth, authorization, data access, and secret handling in Sleck.'
applyTo: '**/*.{ts,tsx,js,jsx,sql,md,yml,yaml,json}'
---

# Security and authorization instructions

## Authentication and identity

- Use Clerk for authentication, but verify the authenticated identity on every protected backend entrypoint.
- Never trust client-provided user identifiers when the authenticated user can be derived from session context.
- Fail closed when identity or session state is missing or invalid.

## Authorization

- Enforce authorization separately from authentication.
- Require explicit ownership checks for server settings, channel CRUD, invite management, and other privileged actions.
- Require membership checks before allowing channel reads, message creation, or server interaction.
- Public discoverability must not bypass the need to join before reading or writing channel content.
- Private servers must never appear in public discovery flows or unauthenticated metadata queries.

## Validation

- Validate all untrusted input with Zod or equivalent boundary validation before business logic runs.
- Normalize identifiers before querying or comparing them.
- Reject malformed pagination, search, filter, and invite payloads explicitly.

## Data access

- Prefer Drizzle or other parameterized access patterns; never concatenate SQL manually.
- Avoid overfetching sensitive membership, invite, or user profile data.
- Do not log tokens, Clerk secrets, database credentials, invite secrets, or private message content.

## Secrets and config

- Read secrets from environment variables or secret stores only.
- Keep `.env.example` as the committed template when new configuration is introduced.
- Treat webhook secrets, Clerk keys, and database URLs as sensitive even in development.

## Real-time and messaging concerns

- Authorize message creation and reads at the channel boundary, not only at the server boundary.
- Treat message editing and deletion as permissioned actions with clear auditability expectations.
- Sanitize or safely render user-authored rich text or markdown to avoid XSS.
