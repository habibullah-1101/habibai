# Full Project Audit Report

Date: 2026-02-25  
Branch: `qa/full-project-audit`  
Repo: `habibullah-1101/habibai`

## Executive summary
- Build and lint are currently green, and the app boots locally with `next dev`.
- Core chat UI structure is consistent and the required controls exist in the main chat component.
- `/api/chat` validates model and preset IDs, but lacks stronger abuse protections (rate limiting/auth/quotas).
- Found a broken user path (`/about` was linked but missing) and missing payload guardrails; both have been fixed in dedicated single-issue PRs.
- Launch risk is primarily cost abuse via unauthenticated, unthrottled API access.

## PASS/FAIL by audit section

| Section | Status | Notes |
|---|---|---|
| A) Repository hygiene | ⚠️ Partial pass | No conflict markers/TODO debt found; one broken route link discovered. |
| B) Build + lint + typecheck | ✅ Pass | `pnpm install`, `pnpm run build`, `pnpm run lint` all succeeded. |
| C) UI/UX verification | ⚠️ Partial pass | Most behavior verified by code + smoke checks; browser automation crashed in this environment. |
| D) API route verification | ⚠️ Partial pass | model/preset handling exists; request includes modelId/presetId; missing rate limit/auth/quota protections. |
| E) Public launch readiness | ❌ Fail | Current API posture allows straightforward cost-abuse scenarios. |

---

## Commands run (required)

1. `pnpm install`  
   Result: success; warning about ignored build scripts (`sharp`, `unrs-resolver`).
2. `pnpm run build`  
   Result: success; Next.js production build complete.
3. `pnpm run lint`  
   Result: success; no ESLint warnings/errors.
4. `pnpm run dev`  
   Result: success; app served on `http://localhost:3000`.

Additional verification commands:
- `rg -n "^(<<<<<<<|=======|>>>>>>>)"` → no conflict markers.
- `rg -n "TODO|FIXME|XXX|HACK"` → no actionable TODO markers in source files.
- `curl -I http://127.0.0.1:3000/about` → returned `404` (issue).
- `/api/chat` negative checks via `curl`:
  - invalid model → `400`
  - invalid preset → `400`

---

## UI/UX verification notes

### Header
- Logo: present (`HABIB AI`).
- About link: present in UI, but route missing in audited baseline branch (404).
- New Chat button: present (`Start new chat`) and wired to reset/stop.
- Theme toggle: present.

### Composer
- Empty + active composer textareas present.
- Keyboard behavior implemented as required:
  - `Ctrl/Cmd+Enter` sends.
  - `Enter` inserts newline.
- Model/Preset/Templates/Upload controls positioned in composer toolbar.
- Upload button opens file picker via hidden input click.

### Templates
- Open/close toggle implemented.
- Click outside close implemented.
- Escape close implemented.
- Long-list scroll container implemented (`max-h` + `overflow-y-auto`).
- Selecting template fills input and focuses correct textarea (empty/active refs).

### Saved prompts
- Save, delete, pick implemented.
- localStorage persistence implemented (`habibai_saved_prompts`).
- Refresh rehydrates saved prompts.

### Messages/streaming
- User and assistant messages styled differently.
- Streaming renderer uses `Streamdown` with streaming state awareness.

> Note: Attempted automated browser validation via Playwright tool; Chromium crashed in this container on one run. Used code-path validation + HTTP smoke checks as fallback.

---

## API route verification (`/api/chat`)

### What works
- `modelId` is validated against `SUPPORTED_MODELS`.
- `presetId` is validated against `PRESETS`.
- Request body from client includes both `modelId` and `presetId` when sending messages.
- Preset system prompt is selected from `PRESETS` and passed to `streamText`.

### Gaps/risk
- No auth/rate limiting/quota enforcement in route.
- No token budget controls or dynamic caps.
- Error streams can expose provider setup details to clients (not secrets, but too verbose for public UX).

### Abuse safety checks (minimum suggestions)
- Add input length cap (implemented in dedicated PR).
- Add message count cap (implemented in dedicated PR).
- Add rate-limit middleware placeholder and persistent backend store.
- Require auth/API key for production and per-user quotas.

---

## Top 10 issues (ranked)

| Rank | Severity | Issue |
|---|---|---|
| 1 | P0 | No request throttling/rate limiting on `/api/chat` |
| 2 | P0 | No authentication/authorization gate for chat endpoint |
| 3 | P0 | No quota controls or per-user usage budgets |
| 4 | P1 | Missing `/about` route while linked in header/footer (broken navigation) |
| 5 | P1 | Missing input/message-size guardrails in `/api/chat` baseline |
| 6 | P1 | Upload control does not integrate file content into request payload |
| 7 | P1 | Provider error details are streamed directly to clients |
| 8 | P2 | No automated E2E test suite for critical UX flows |
| 9 | P2 | No API contract tests for model/preset validation and error branches |
|10 | P2 | No launch kill-switch/env guard for emergency cost containment |

### Issue details

1) **No rate limiting (P0)**  
- Exact file path: `app/api/chat/route.ts`  
- Exact cause: request handler processes unlimited call frequency per client/IP.  
- Minimal fix plan: add middleware or in-route limiter (IP/user key + sliding window).  
- Test to verify: fire burst requests (e.g., >N/min) and assert `429` after threshold.

2) **No auth gate (P0)**  
- Exact file path: `app/api/chat/route.ts`  
- Exact cause: public POST endpoint accepts anonymous requests.  
- Minimal fix plan: require authenticated session token/API key before model invocation.  
- Test to verify: unauthenticated request returns `401`, authenticated request succeeds.

3) **No quota/budget enforcement (P0)**  
- Exact file path: `app/api/chat/route.ts`  
- Exact cause: no user/org usage tracking or token budget check before `streamText`.  
- Minimal fix plan: persist usage counters and block at plan limits.  
- Test to verify: exceed quota in test fixture and assert `402/429` policy response.

4) **Broken About navigation (P1)**  
- Exact file path: `components/chat.tsx` (links to `/about`), missing `app/about/page.tsx` in baseline  
- Exact cause: route link exists without corresponding page.  
- Minimal fix plan: add `app/about/page.tsx`.  
- Test to verify: `curl -I /about` returns `200`; clicking About opens page.

5) **No payload guardrails in baseline (P1)**  
- Exact file path: `app/api/chat/route.ts`  
- Exact cause: no check for empty messages / oversized payloads before model call.  
- Minimal fix plan: enforce message count and combined text length caps.  
- Test to verify: oversized payload returns `400` with stable error JSON.

6) **Upload UX not functionally connected (P1)**  
- Exact file path: `components/chat.tsx`  
- Exact cause: selected filename is stored for display only; file never included in chat request.  
- Minimal fix plan: parse attachments and include supported file payload in request body.  
- Test to verify: select file and assert file metadata/content reaches API route.

7) **Verbose provider error details exposed to client (P1)**  
- Exact file path: `app/api/chat/route.ts` and UI stream handling in `components/chat.tsx`  
- Exact cause: raw AI gateway error text can stream to client UI channel.  
- Minimal fix plan: map provider/internal errors to sanitized user-safe messages + server logs only.  
- Test to verify: trigger upstream auth failure and assert generic client error text.

8) **No E2E automation (P2)**  
- Exact file path: repository-level (no e2e test dir/config present)  
- Exact cause: critical UI behaviors only manually verifiable.  
- Minimal fix plan: add Playwright smoke suite (header/composer/templates/saved prompts).  
- Test to verify: CI e2e workflow passes for core flows.

9) **No API contract tests (P2)**  
- Exact file path: repository-level (no route tests present)  
- Exact cause: validation branches in `/api/chat` lack regression tests.  
- Minimal fix plan: add route unit/integration tests for model/preset/body validations.  
- Test to verify: test matrix covers valid + invalid model/preset/input size.

10) **No kill switch for emergency cost containment (P2)**  
- Exact file path: `app/api/chat/route.ts` + env config docs  
- Exact cause: endpoint cannot be quickly disabled by env when abuse spikes occur.  
- Minimal fix plan: add `CHAT_API_ENABLED=false` guard and short-circuit route.  
- Test to verify: set env false and assert route returns maintenance response.

---

## Separate small-fix PRs created

Per request, fixes were split one issue per PR branch:

1. **About route fix**  
   Branch: `fix/about-page-route`  
   Commit: `2ead44b`  
   Scope: adds `app/about/page.tsx` only.

2. **API guardrails fix**  
   Branch: `fix/api-chat-input-guardrails`  
   Commit: `cba21cb`  
   Scope: adds basic message count + input length checks in `/api/chat`.

