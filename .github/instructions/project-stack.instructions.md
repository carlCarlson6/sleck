---
description: 'Project-specific coding guidance for the Sleck frontend and backend stack.'
applyTo: '**/*.{ts,tsx,js,jsx,sql,md,json}'
---

# Sleck stack instructions

Apply these rules when generating or editing code for this repository:

## Architecture

- Keep the frontend and backend as distinct layers with explicit boundaries.
- Prefer feature-oriented organization around servers, channels, memberships, invites, and messages.
- Model shared contracts deliberately; avoid loose request or response shapes.
- Prefer incremental vertical slices over broad scaffolding that is not yet wired end to end.

## Frontend

- Use React and TypeScript with function components and hooks.
- Prefer server-state concerns in TanStack Query and local UI state in Zustand.
- Use Zod to validate untrusted data at boundaries.
- Keep channel, server, and membership permissions visible in component and route design.
- Prefer accessible, keyboard-friendly interaction patterns for chat and navigation UI.
- Default the UI direction to a minimalistic, high-contrast interface with a terminal or console-inspired feel.
- Use restrained cyber-punk accents for emphasis, but keep the overall layout clean, sparse, and readable.
- Favor dark surfaces, clear borders, monospaced or terminal-friendly typography accents, and explicit focus or active states.
- Treat the visual theme as a product-level default across server lists, channel panels, message feeds, composer areas, and dialogs.

## Backend

- Use TypeScript throughout the backend.
- Treat tRPC procedures as the public API boundary and validate input with Zod.
- Keep Express concerns thin; business rules should live in application logic, not transport glue.
- Prefer explicit authorization checks for server ownership, membership, invites, and channel access.
- Prefer Drizzle query composition and parameterized access patterns over handwritten SQL string building.

## Data and auth

- Treat Clerk as the source of identity, but keep application authorization rules inside this codebase.
- Preserve a clear difference between public server discovery and private server invitation-only access.
- Never assume membership implies ownership or moderation privileges.
- Design data models so channel access and message visibility always derive from server membership rules.

## Quality bar

- Favor small, composable modules over broad utility dumping grounds.
- Keep naming explicit and domain-driven.
- Update documentation when product behavior, architecture, or workflow changes.
