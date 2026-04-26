---
description: 'Accessibility guidance for Sleck user interfaces, especially chat, navigation, and server management flows.'
applyTo: '**/*.{tsx,jsx,css,scss,md}'
---

# Accessibility instructions

## Core expectations

- Aim for WCAG 2.2 AA-friendly behavior by default.
- Prefer semantic HTML before ARIA.
- Every interactive control must have a visible or programmatic label.

## Chat and navigation patterns

- Ensure keyboard access for server navigation, channel lists, message composer actions, and dialogs.
- Preserve clear focus order when sidebars, modals, popovers, or menus open.
- Use proper button elements for actions and links for navigation.
- Provide meaningful empty states and status updates for loading, sent, failed, and unread states.

## Forms and dialogs

- Associate inputs with labels and helpful error text.
- Announce validation errors clearly.
- Trap focus in modal dialogs and restore focus when they close.

## Visual behavior

- Default to a minimalistic UI with a terminal or console-inspired visual language.
- Use cyber-punk styling as restrained accenting rather than decorative overload.
- Keep the application high contrast by default, with clear separation between surfaces, borders, text, and interactive states.
- Prefer readable dark themes, crisp outlines, and sparse layouts over dense or low-contrast presentation.
- Use accent colors consistently for actions, status, and focus, but ensure the interface remains understandable without them.
- Do not rely on color alone to communicate status, role, or validation.
- Maintain sufficient contrast for text, icons, badges, and interactive states.
- Respect reduced-motion preferences for animated chat or presence UI.
