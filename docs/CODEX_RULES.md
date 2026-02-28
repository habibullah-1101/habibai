# CODEX_RULES.md — Habib AI (Web UI Build Rules)

This repository is an active product. Your job is to implement a ChatGPT-like **WEB UI** safely and incrementally.
Follow these rules strictly. Violations will be rejected.

---

## 1) Goal (Non-Negotiable)
- Build a **minimal, international-grade, ChatGPT-like web UI** for Habib AI.
- UI first (shell + states + responsiveness), then logic in later phases.
- Style direction: **90% ChatGPT Web + 10% subtle Habib AI branding** (accent + logo only).

---

## 2) Allowed Changes (You MAY edit/create only these paths)
You are allowed to create/modify files ONLY under:

- `app/chat/**`
- `components/chat/**`
- `components/ui/**`
- `components/icons/**`
- `styles/tokens.css`
- `docs/**` (only documentation)

If you need anything outside these paths, STOP and explain why.

---

## 3) Forbidden Changes (DO NOT TOUCH)
Do NOT modify, refactor, rename, or reformat any of these:

- `app/api/**` (backend routes)
- `lib/**` (gateway, models, presets, constants)
- `app/**` outside `app/chat/**` (except minimal import of tokens.css if explicitly requested)
- global typography / fonts (no changing default font across the app)
- project configuration:
  - `package.json`
  - lockfiles (`pnpm-lock.yaml`, `package-lock.json`, etc.)
  - `next.config.*`
  - `tsconfig.json`
  - `.env*` files
- deployment configs (Vercel, etc.)

No “cleanup refactors”. No “format the whole repo”. No mass renaming.

---

## 4) Phase Workflow (One PR = One Phase)
You must work in small phases:
- Each PR must correspond to ONE phase and stay focused.
- Keep diffs small and reviewable.
- Never mix UI work with backend work in one PR.

### Required PR metadata
Every PR must include:
- Phase name in title: `Phase X — <short title>`
- Summary: What changed, why
- File list: Which files you touched
- Verification: `pnpm build` result (and `pnpm lint/typecheck` if available)

---

## 5) UI Architecture Rules
We separate **layout/UI** from **logic**:

- `ChatShell` = layout only (sidebar/header/messages/composer)
- `ChatController` = logic only (state, useChat, handlers)
- UI components must be **pure**:
  - no network calls inside presentational components
  - no direct env usage
  - receive data via props

Do NOT put all logic and UI in a single huge file.

---

## 6) Design System Rules (ChatGPT-like)
- Dark-first (light mode later)
- Use `styles/tokens.css` for:
  - colors
  - radius
  - borders
  - focus ring
- Subtle Habib AI branding:
  - Accent used ONLY for: active item + send button (and small highlights)
  - Logo is minimal, no heavy gradients

### Performance constraints (Afghanistan-friendly)
- No heavy animations
- No video backgrounds
- No large image assets
- Avoid large icon libraries unless already installed
- Prefer inline SVG icons in `components/icons/**`

---

## 7) Responsiveness Requirements
- Desktop: sidebar visible and collapsible
- Mobile: sidebar becomes a drawer/sheet
- Composer sticks to bottom
- Message column uses `max-width` (around 720–800px) and centers

---

## 8) Accessibility (Must)
- `IconButton` must have `aria-label`
- Focus rings visible (use token `--ring`)
- Inputs must be keyboard-friendly
- Ensure clickable targets are not tiny

---

## 9) Data & State Rules (UI-first)
Until the “logic phases” begin:
- Use mock data for conversations/messages
- Buttons can be placeholders (no-op or console log) BUT must have UI states
- Implement UI states: empty, loading, error, disabled

Do NOT implement persistence/auth/payments in UI phases.

---

## 10) Testing / Verification (Required)
Before finishing ANY PR:
- Run `pnpm build`
- Fix TypeScript errors in touched files
- Ensure `/chat` route (or `/chat/ui-preview`) renders without runtime errors

If you cannot run commands, explain the risk and keep changes minimal.

---

## 11) Communication Rules
If something is ambiguous:
- Do NOT guess wildly.
- Provide 2–3 options with pros/cons and recommend one.
- Ask for explicit instruction ONLY if blocked.

---

## 12) Definition of Done (UI Phases)
A UI-phase PR is done when:
- It compiles (`pnpm build`)
- It matches ChatGPT-like minimal design
- It respects the allowed paths
- It does not change forbidden areas
- It keeps diffs clean and focused

---

End of rules.
