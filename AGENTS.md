# AGENTS.md

This repository includes GitHub Copilot assets tailored for a Slack/Discord/Teams-style group chat application.

## Project context

- Frontend target stack: Vite, React, TypeScript, Zustand, Zod, TanStack Query, tRPC, Clerk
- Backend target stack: Node.js, TypeScript, Express, tRPC, Drizzle, PostgreSQL, Clerk
- Core product areas: servers, membership, channels, invitations, and channel-based messaging

## Agentic asset layout

- `.github/copilot-instructions.md` contains the project-wide baseline rules.
- `.github/instructions/` contains focused instructions for stack, security, accessibility, and testing.
- `.github/agents/` contains specialist agents: Danny (planning/orchestration), Aitor (frontend), Salva (backend), Vicente (devops), Juanjo (changes review), and Isabel (contracts).
- `.github/skills/` contains reusable workflows for architecture and feature slicing.
- `.github/hooks/` contains optional Copilot hook integrations, including a secrets scanner.

## Agent roles and contract rules

- **Isabel** is the only agent allowed to directly modify files under `contracts/` (including all `*.yml` and `*.yaml` files). All other agents must hand off contract changes to Isabel and may not edit or commit changes to `contracts/` directly.
- All agent commits must follow the conventions in `AGENT_COMMIT_CONVENTIONS.md`.
- When executing an approved plan, agents **must** use the commit subject and body format described in `AGENT_COMMIT_CONVENTIONS.md` (plan name, agent, task description). Do not invent new formats for plan-driven work.
- When an agent completes its assigned task from an approved plan, it **must create a local git commit** for that task before handing off or stopping.
- Plan-task commits must contain only the changes for that completed task; agents must not sweep unrelated local changes into the commit.
- Commit subject: `[agent_name] | brief description`
- Commit body: plan name, agent in charge, task description

## Working conventions

- Prefer project-specific instructions over generic framework advice.
- Keep frontend and backend concerns separated, but design them as one cohesive product.
- Treat auth, authorization, private server visibility, and membership boundaries as first-class concerns.
- Prefer strongly typed boundaries with Zod and TypeScript instead of implicit contracts.
- Update `README.md` and Copilot assets when the stack, architecture, or workflow changes materially.

See `plans/`, `contracts/`, and `AGENT_COMMIT_CONVENTIONS.md` for more on agent responsibilities and plan tracking.
