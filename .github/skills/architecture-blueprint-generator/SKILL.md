---
name: architecture-blueprint-generator
description: 'Generate or refresh a practical architecture blueprint for Sleck, covering product domains, stack boundaries, and implementation direction.'
---

# Architecture Blueprint Generator

Use this skill when you need to turn the current repository state into a concrete architecture blueprint for Sleck.

## Purpose

Create a concise but implementation-ready view of:

- product domains such as servers, channels, invites, memberships, and messages
- frontend and backend boundaries
- data ownership and authorization boundaries
- likely extension points for real-time messaging, moderation, and search

## Instructions

1. Read `README.md`, `.github/copilot-instructions.md`, `AGENTS.md`, and any relevant source files already checked in.
2. Identify what is already decided versus what is still open.
3. Produce a blueprint that covers:
   - domain model candidates
   - route or procedure boundaries
   - frontend feature slices
   - auth and authorization rules
   - testing and tooling implications
4. Keep the blueprint aligned with the documented stack:
   - frontend: Vite, React, TypeScript, Zustand, Zod, TanStack Query, tRPC, Clerk
   - backend: Node.js, TypeScript, Express, tRPC, Drizzle, PostgreSQL, Clerk
5. Prefer actionable guidance over generic architectural theory.

## Output expectations

- Use plain language and project terminology.
- Highlight risky or uncertain areas.
- Distinguish current state, proposed structure, and future enhancements.
