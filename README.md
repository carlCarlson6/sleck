# sleck

Sleck is a group chat platform inspired by Slack, Discord, and Microsoft Teams. The product centers on community-style servers, channel-based conversations, and controlled access for both public and private spaces.

## What we are building

The app will let users create and join servers where members communicate through channels inside each server.

## Core functionalities

### Server management

- Users can create servers.
- Servers can be either **public** or **private**.
- Public servers are discoverable, and any user can find and join them.
- Private servers are not discoverable, and only the server owner can invite other users to join.

### Channel management

- Server owners can create, read, update, and delete server channels.

### Messaging

- Server members can chat with other members inside a server channel.

## Architecture and technologies

### Frontend

- Vite
- React
- TypeScript
- Zustand
- Zod
- TanStack Query
- tRPC
- Clerk

### Backend

- Node.js
- TypeScript
- Express
- tRPC
- Drizzle
- PostgreSQL
- Clerk

## Project status

This repository is currently in the planning and scaffolding stage. The product scope and target stack are defined here so the initial implementation can follow a consistent direction.

## Repository tooling

Adapted from patterns used in `github/awesome-copilot`, this repository includes a lightweight tooling baseline:

- `.editorconfig` and `.gitattributes` to keep formatting and line endings consistent
- `.codespellrc` and a GitHub Actions spelling check
- a markdown line-ending check workflow
- VS Code recommendations and workspace settings in `.vscode/`
- a pull request template
- a `copilot-setup-steps` workflow for future Copilot agent workflow expansion

## Copilot development assets

This repository also includes a curated Copilot asset set adapted for this specific project:

- `.github/instructions/` for stack, security, accessibility, and testing guidance
- `.github/agents/` for specialist agents: Danny (planning/orchestration), Aitor (frontend), Salva (backend), Vicente (devops), and Juanjo (changes review)
- `.github/skills/` for architecture blueprints and feature-slice planning
- `.github/hooks/secrets-scanner/` for optional secret scanning at the end of Copilot-driven sessions
- `AGENTS.md` as a repo-level guide to the asset layout and intended usage
