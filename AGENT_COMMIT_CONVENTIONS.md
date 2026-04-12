# Agent Commit Message Conventions

All Copilot agents must follow these conventions for git commits:

## Commit subject

- Format: `[agent_name] | brief description`
- Example: `[Vicente] | Add contract ownership docs`

## Commit body

Must include:
- Plan name (as listed in `plans/`)
- Agent in charge
- Task description (what was done and why)

### Example

```
[Isabel] | Update auth contract

Plan: Initial repository scaffolding plan
Agent: Isabel
Task: Updated OpenAPI contract for auth endpoints to add password reset flow per plan step 3.
```

## Why this matters

- Ensures traceability of changes to plans and agents
- Makes it easy to audit and review agent-driven work

See `README.md` and `plans/` for more on agent roles and plan tracking.
