# Agent Commit Message Conventions

All Copilot agents must follow these conventions for git commits:

## When to commit

- When an agent completes its assigned task from an approved plan, it **must create a local git commit** for that task before handing work back.
- The commit must include only the changes required for that completed task. Do not include unrelated dirty-worktree changes.
- Do not commit partial or unverified task work. If the assigned task is not complete, do not create the commit yet.

## Commit subject

- Format: `[agent_name] | brief description`
- Example: `[Vicente] | Add contract ownership docs`

## Commit body

Must include:
- Plan ID
- Plan name (as listed in `plans/`)
- Agent in charge
- Task description (what was done and why)

### Example

```
[Isabel] | Update auth contract

Plan ID: PLN-001
Plan: Initial repository scaffolding plan
Agent: Isabel
Task: Updated OpenAPI contract for auth endpoints to add password reset flow per plan step 3.
```

## Why this matters

- Ensures traceability of changes to plans and agents
- Makes it easy to audit and review agent-driven work
- Preserves each completed plan task as a local checkpoint that can be reviewed independently

See `README.md` and `plans/` for more on agent roles and plan tracking.
