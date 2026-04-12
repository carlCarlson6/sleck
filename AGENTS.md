# AGENTS.md

This repository includes GitHub Copilot assets tailored for a Slack/Discord/Teams-style group chat application.

## Project context

- Frontend target stack: Vite, React, TypeScript, Zustand, Zod, TanStack Query, tRPC, Clerk
- Backend target stack: Node.js, TypeScript, Express, tRPC, Drizzle, PostgreSQL, Clerk
- Core product areas: servers, membership, channels, invitations, and channel-based messaging

## Agentic asset layout

- `.github/copilot-instructions.md` contains the project-wide baseline rules.
- `.github/instructions/` contains focused instructions for stack, security, accessibility, and testing.
- `.github/agents/` contains specialist agents: Danny (planning/orchestration), Aitor (frontend), Salva (backend), Vicente (devops), and Juanjo (changes review).
- `.github/skills/` contains reusable workflows for architecture and feature slicing.
- `.github/hooks/` contains optional Copilot hook integrations, including a secrets scanner.

## Working conventions

- Prefer project-specific instructions over generic framework advice.
- Keep frontend and backend concerns separated, but design them as one cohesive product.
- Treat auth, authorization, private server visibility, and membership boundaries as first-class concerns.
- Prefer strongly typed boundaries with Zod and TypeScript instead of implicit contracts.
- Update `README.md` and Copilot assets when the stack, architecture, or workflow changes materially.
