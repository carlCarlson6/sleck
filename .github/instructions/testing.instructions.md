---
description: 'Testing guidance for Sleck application code, with emphasis on Vitest-friendly TypeScript testing patterns.'
applyTo: '**/*.{test,spec}.{ts,tsx,js,jsx},**/vitest.config.*'
---

# Testing instructions

## General testing rules

- Prefer deterministic tests with clear Arrange-Act-Assert structure.
- Name tests around behavior, not implementation details.
- Cover authorization boundaries, validation failures, and edge cases for every critical flow.
- Add tests when introducing new business rules or changing existing behavior.

## Frontend testing

- Test user-facing behavior rather than internal component details.
- Cover keyboard interaction, empty states, loading states, and permission-driven UI branches.

## Backend testing

- Cover tRPC input validation, authorization checks, and expected failure modes.
- Test server privacy rules, invite flows, membership transitions, channel CRUD, and message permissions.
- Prefer focused tests for business logic and contract boundaries over overly broad setup-heavy tests.

## Data and auth scenarios

- Include tests for owner vs member vs non-member behavior.
- Include tests for public vs private server access differences.
- Include tests for invalid IDs, stale invites, and missing authentication context.
