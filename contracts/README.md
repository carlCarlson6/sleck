# Contracts

This directory is the **source of truth** for all cross-application API contracts in Sleck. All OpenAPI YAML files that define the interface between backend and frontend, or with external systems, must live here.

## Ownership and update flow

- **Isabel** is the only Copilot agent allowed to directly modify files under `contracts/`.
- When a plan or feature requires a contract change, the responsible agent must hand off the change to Isabel, who will update the OpenAPI YAML and document the change.
- All contract files must be OpenAPI 3.x YAML format and named by domain (e.g., `auth.yml`, `channels.yml`).
- Each contract file should include a top-level comment with its domain, version, and last update agent.

## Why this rule?

- Prevents accidental contract drift and ensures all contract changes are reviewed and documented.
- Keeps a clear audit trail of contract evolution.

See `README.md` and `plans/` for more on contract governance and agent responsibilities.
