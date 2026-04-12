# Copilot instructions for `sleck`

## Repository state

- This repository is still a scaffold. The only tracked project files today are `README.md`, `.gitignore`, and this instructions file.
- `README.md` now defines the intended product as a Slack/Discord/Teams-style group chat application with server, channel, and member-based communication.
- There is no committed application code, package manifest, build config, test config, or deployment config yet. Do not assume a framework, runtime, or package manager until one is checked in.

## Build, test, and lint commands

- No checked-in build, test, or lint commands exist yet.
- Before proposing commands, inspect newly added manifests or task runners in the repository itself instead of defaulting to `npm`, `yarn`, `pnpm`, `make`, or another tool by assumption.
- Repo-level automation now exists in GitHub Actions for markdown line-ending checks and spelling checks, but there are still no application build or test commands checked in.

## High-level architecture

- No implementation architecture is present yet, but the target stack has been chosen and should guide initial setup work.
- Frontend target stack: `vite`, `react`, `typescript`, `zustand`, `zod`, `@tanstack/react-query`, `trpc`, and `clerk`.
- Backend target stack: `node`, `typescript`, `express`, `trpc`, `drizzle`, `postgresql`, and `clerk`.
- Until code is checked in, treat these as the intended technologies rather than inferred implementation details.

## Product scope currently defined

- Users can create servers.
- Servers can be public or private.
- Public servers must be discoverable and joinable by any user.
- Private servers must not be discoverable; only server owners can invite users into them.
- Server owners can CRUD server channels.
- Server members can chat with the rest of the members through a server channel.

## Key conventions already visible in the repo

- `.gitignore` is a broad JavaScript/TypeScript and web-app template. It already anticipates Node dependencies, TypeScript build artifacts, coverage output, ESLint/stylelint caches, and framework outputs such as Next.js, Nuxt, Gatsby, SvelteKit, and VitePress.
- Environment files follow the pattern `.env*` ignored with `!.env.example` preserved. If environment variables are introduced, keep a committed `.env.example` as the documented template.
- Because the repository has not established module boundaries or app layers yet, keep any newly introduced structure explicit in committed config and docs so later sessions can discover the intended stack quickly.
- When the first implementation files are added, prefer aligning them with the documented frontend/backend split instead of introducing a different stack by default.
- Formatting and line-ending behavior is now anchored by `.editorconfig` and `.gitattributes`; follow those defaults instead of editor-specific conventions.
- VS Code workspace recommendations live in `.vscode/extensions.json`, and repository-wide editor defaults live in `.vscode/settings.json`.
- GitHub collaboration tooling now includes `.github/pull_request_template.md`, `.github/workflows/check-line-endings.yml`, `.github/workflows/codespell.yml`, and `.github/workflows/copilot-setup-steps.yml`.
