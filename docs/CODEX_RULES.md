## 1. Golden Rule

Minimal change.  
Minimal files.  
Minimal risk.

Precision over speed.  
Stability over cleverness.  
Control over automation.

---

## 2. Token & Tailwind Arbitrary Value Rules (Strict)

To avoid Tailwind parsing inconsistencies and token drift, the following rules are mandatory for all new UI code.

### 2.1 Border Color Rule (Critical)

When using CSS variables for border color, you MUST use:

- `border border-[color:var(--border)]`

You MUST NOT use:

- `border-[var(--border)]`

Reason:
Tailwind may interpret `border-[...]` as border-width instead of border-color.
Using the explicit `color:` prefix ensures correct parsing.

This rule applies to:
- border color tokens
- outline color tokens
- ring color tokens (when using arbitrary values)

---

### 2.2 Arbitrary Token Convention

When using CSS variables inside Tailwind arbitrary values:

Allowed patterns:

- `bg-[var(--surface)]`
- `text-[var(--text)]`
- `border-[color:var(--border)]`
- `outline-[color:var(--ring)]`
- `ring-[color:var(--ring)]`

Do NOT mix inconsistent patterns across components.
New UI components must follow the same convention used in the Design System base components.

---

### 2.3 Token Source of Truth

For new UI work (Design System and Chat UI), the canonical token namespace is:

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

Legacy tokens such as:
- `--background`
- `--foreground`
- or other theme aliases

Must NOT be used in new UI components unless explicitly instructed.

---

### 2.4 Inline Style Policy

Inline `style={{ ... }}` usage is discouraged.

Allowed:
- Very small, isolated dynamic values (e.g. animationDelay)

Forbidden:
- Structural layout styling
- Color, border, background styling
- Token-based styling via inline styles

If inline style is used:
- It must be justified in the PR summary.
- It must not replace token-based class styling.

---

### 2.5 Consistency Over Cleverness

Do not introduce alternative token syntax, utility patterns, or style approaches
if an equivalent pattern already exists in the Design System base components.

Match existing patterns.
Do not invent new ones.
