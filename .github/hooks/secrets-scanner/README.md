---
name: 'Secrets Scanner'
description: 'Scan modified files for likely secrets before Copilot-driven changes are finalized.'
hooks: ['sessionEnd']
tags: ['security', 'secrets', 'hooks']
---

# Secrets Scanner

This hook scans modified and untracked files for common secret patterns before a Copilot session ends.

## Why it exists

Sleck will eventually use sensitive credentials such as Clerk keys, database URLs, and webhook tokens. This hook provides a lightweight guardrail against accidentally checking those into the repository.

## Behavior

- Scans changed files in the working tree
- Flags likely secrets such as API keys, private keys, auth tokens, and connection strings
- Supports warning mode and blocking mode

## Environment variables

- `SCAN_MODE`: `warn` or `block`
- `SCAN_SCOPE`: `diff` or `staged`
- `SKIP_SECRETS_SCAN`: set to `true` to bypass scanning
- `SECRETS_ALLOWLIST`: comma-separated substrings to ignore

## Files

- `hooks.json` defines when the hook runs
- `scan-secrets.sh` performs the scan
