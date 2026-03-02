# UI Architecture — Habib AI

This document defines the structural philosophy and technical layering of the Habib AI Web Interface.

The goal is architectural stability, phase discipline, and long-term maintainability.

---

## 1. Core Architectural Principles

The UI is built with:

- Phase-controlled development
- Strict PR governance
- Token-driven styling
- Minimal diff strategy
- Layout isolation before wiring

Every UI layer must be predictable, reversible, and incremental.

No uncontrolled refactors.
No architectural surprises.

---

## 2. Phase-Based UI System

Development follows a strict order.

### Phase 0 — Governance
Repository rules and UI discipline enforcement.

- CODEX_RULES.md
- Branch policy
- PR scope control

---

### Phase 1 — Design System

Foundation layer.

Includes:
- Centralized tokens
- Base components (ButtonBase, InputBase, CardBase)

Characteristics:
- No business logic
- No variants unless explicitly defined
- Token-only styling
- Minimal API surface

This layer must remain stable.

---

### Phase 2 — Layout Shell

Structural UI layer.

Includes:
- ChatShell layout
- Sidebar structure
- Scroll isolation
- Header & composer placement

Scroll behavior:

- Root → `h-screen overflow-hidden`
- Sidebar → independent vertical scroll
- Main → flex column
- Message area → isolated scroll container
- Header & composer → fixed (non-scrolling)

Layout must be stable before wiring logic.

---

### Phase 3 — Message Wiring

Functional layer.

Includes:
- Message list rendering
- Model integration
- Streaming handling
- Composer interactions

No structural layout changes allowed here.
Only behavioral wiring.

---

### Phase 4 — Advanced Features

Enhancements only.

Examples:
- Model selector UI
- Presets
- History system
- UX refinements
- Performance tuning

Must not break earlier phase contracts.

---

## 3. Component Layering Model

The UI follows a layered structure:


Base Components
↓
Layout Components
↓
Feature Components
↓
Integration Layer




### Base Components
Pure UI primitives.

- ButtonBase
- InputBase
- CardBase

No side effects.
No routing logic.
No data awareness.

---

### Layout Components
Structural wrappers.

- ChatShell
- Sidebar container
- Header container

Responsible for:
- Flex structure
- Spacing
- Scroll behavior

Not responsible for business logic.

---

### Feature Components
Message list, composer, chat UI pieces.

May contain:
- State
- Effects
- Interaction logic

Must not modify layout contracts.

---

## 4. Design Token System

All styling must be token-driven.

Canonical tokens:

- `--bg`
- `--surface`
- `--surface-2`
- `--text`
- `--muted`
- `--border`
- `--ring`
- `--accent`
- `--accent-weak`
- `--r-sm`
- `--r-md`
- `--r-lg`

---

### Tailwind Arbitrary Rules

Allowed:
bg-[var(--surface)]
text-[var(--text)]
border-[color:var(--border)]
outline-[color:var(--ring)]


Forbidden:


Reason:
Explicit `color:` prefix avoids parsing ambiguity.

---

## 5. Scroll Isolation Strategy

To avoid layout instability:

- The document body must not scroll.
- Only defined containers may scroll.
- Sidebar and message area scroll independently.
- Fixed sections must use `shrink-0`.

Double-scroll bugs are not acceptable.

---

## 6. PR Discipline Rules

Every UI change must:

- Have exactly one objective
- Modify minimal files
- Pass `pnpm build`
- Pass TypeScript checks
- Avoid cross-cutting refactors

If a change grows too large:
Stop and split it.

---

## 7. Migration Strategy

When introducing new UI systems:

- Create new isolated components
- Do not refactor legacy ones
- Avoid deleting exports without transition plan
- Keep API surface stable

Example:
button-base.tsx → new system
button.tsx → legacy untouched



---

## 9. Architectural Boundaries

Phase boundaries must not be crossed.

Phase 2 must not:
- Introduce message logic
- Add streaming
- Modify AI integration

Phase 3 must not:
- Change layout structure
- Alter token system

Discipline ensures long-term scalability.

---

## 10. Long-Term Vision

Habib AI is not a UI clone.

It is a structured, governed, scalable AI interface foundation.

The architecture prioritizes:

- Stability
- Clarity
- Control
- Maintainability

Precision over speed.
Structure over improvisation.
