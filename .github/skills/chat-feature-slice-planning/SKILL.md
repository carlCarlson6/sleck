---
name: chat-feature-slice-planning
description: 'Break a Sleck feature into vertical slices that cover data, API, UI, auth, and testing without losing the end-to-end product flow.'
---

# Chat Feature Slice Planning

Use this skill when a feature request needs to be decomposed into a practical build plan.

## Best-fit use cases

- server creation and discovery
- private server invites
- channel CRUD
- membership management
- channel messaging flows
- moderation, permissions, and role-sensitive behavior

## Instructions

1. Restate the feature in product terms.
2. Break it into vertical slices instead of layer-only tasks.
3. For each slice, capture:
   - data model changes
   - API or tRPC procedures
   - frontend UI or navigation changes
   - authorization rules
   - testing needs
4. Mark dependencies clearly.
5. Call out edge cases such as:
   - public vs private visibility
   - owner vs member behavior
   - invite expiry or invalid invites
   - empty state and error state UX

## Output expectations

- Prefer short, buildable phases.
- Keep scope honest; defer non-essential enhancements explicitly.
- Make the plan understandable to both a human developer and Copilot.
