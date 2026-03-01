# CODEX_RULES.md — Habib AI Web UI Governance

This document defines the mandatory operating rules for Codex when working on this repository.

If any requested task conflicts with these rules, Codex must STOP and request clarification.

---

## 0. Core Principles (Non-Negotiable)

- The goal is to build a ChatGPT-like web UI with controlled, minimal, incremental changes.
- Every task must be:
  - Small
  - Isolated
  - Reversible
- Every PR must contain the smallest possible diff.
- No unrequested refactors.
- No architectural surprises.

---

## 1. Workflow Requirements

Each task must follow this order:

1. Inspect relevant files
2. Apply minimal changes
3. Verify build passes
4. Provide structured PR summary

Each PR must include:

- Summary (3–5 bullet points)
- Files changed (explicit list)
- Testing steps performed
- Notes (if any risk exists)

---

## 2. Forbidden Actions

Codex must NOT:

- Change fonts or add remote font sources.
- Refactor existing components unless explicitly instructed.
- Delete or rename existing UI files unless explicitly instructed.
- Add new dependencies without explicit permission.
- Perform large renaming operations.
- Modify routing structure unless explicitly requested.

---

## 3. Stability Rule

No change may:

- Break existing UI
- Fail the build
- Introduce casing conflicts
- Cause unexpected side effects

---

## 4. Case-Sensitive Filename Rule (Critical)

This project must work correctly on case-sensitive systems (Linux/Vercel).

Codex must:

- Never create two files that differ only by casing.
  Example (forbidden):
  - `Button.tsx`
  - `button.tsx`

Before creating a new file, Codex must check that no case-insensitive duplicate exists.

---

## 5. Migration Strategy

When introducing new systems:

- Create new isolated components (e.g. `*-base`, `*-next`)
- Do NOT modify legacy components unless explicitly instructed
- Do NOT delete existing exports without migration instructions

Example (correct approach):

- `button-base.tsx` (new system)
- `button.tsx` (legacy, untouched)

---

## 6. No Shim Files

Codex must not create re-export shim files unless explicitly instructed.

Example of forbidden behavior:

Creating `button.ts` just to re-export from `Button.tsx`.

---

## 7. Design Token Policy

- Styling changes must primarily use design tokens.
- Tokens must be centralized.
- Do not scatter CSS variables across multiple unrelated files.

---

## 8. Phase Discipline

Codex must respect UI build order:

Phase 1 — Design System (tokens + base components)  
Phase 2 — Layout Shell (sidebar, header, layout structure)  
Phase 3 — Wiring (message list, composer, interactions)  
Phase 4 — Advanced features  
Phase 5 — Polish & responsiveness  

Do not skip phases.

---

## 9. Mandatory Testing

Every PR must:

- Pass `pnpm build`
- Not introduce TypeScript errors
- Not introduce casing conflicts

If build fails:
- Fix before requesting merge.

---

## 10. PR Scope Rules

Each PR must:

- Have exactly one objective.
- Not mix unrelated concerns.
- Avoid large diffs.
- Avoid cross-cutting refactors.

Title format:
`Phase X.Y — Short Description`

---

## 11. Stop Conditions

Codex must STOP and request clarification if:

- A change affects existing core UI unexpectedly.
- A file naming conflict may occur.
- A dependency addition is required.
- A refactor becomes large.
- Build fails due to structural conflict.

---

## 12. Golden Rule

Minimal change.
Minimal files.
Minimal risk.

Precision over speed.
Stability over cleverness.
Control over automation.
