# Audit Checklist (Quick Pass/Fail)

## A) Repository hygiene
- [x] PASS — Conflict markers scan: `rg -n "^(<<<<<<<|=======|>>>>>>>)"` (none found)
- [x] PASS — TODO/FIXME scan: `rg -n "TODO|FIXME|XXX|HACK"` (no actionable source TODOs)
- [x] PASS — File naming/component structure spot-check (`components/*`, `components/ui/*`, `lib/*`)
- [ ] FAIL — About navigation integrity (`/about` linked in UI but missing in baseline branch)

## B) Build + lint + typecheck
- [x] PASS — `pnpm install`
- [x] PASS — `pnpm run build`
- [x] PASS — `pnpm run lint`
- [x] PASS — `pnpm run dev` smoke start (server ready at localhost:3000)
- [ ] FAIL — Build-script policy warning: ignored scripts (`sharp`, `unrs-resolver`) may be environment-sensitive

## C) UI/UX verification
- [x] PASS — Header logo present
- [x] PASS — About link present in header/footer
- [x] PASS — New Chat button wired
- [x] PASS — Theme toggle present
- [x] PASS — Composer large textarea layout (empty + active)
- [x] PASS — `Ctrl/Cmd+Enter` send behavior implemented
- [x] PASS — `Enter` newline behavior implemented
- [x] PASS — Model/Preset/Templates controls in composer footer
- [x] PASS — Upload button opens file picker
- [x] PASS — Templates open/close behavior (toggle/outside/Escape in code)
- [x] PASS — Templates long-list scroll container in place
- [x] PASS — Template selection populates/focuses proper textarea
- [x] PASS — Saved prompt save/delete/select flows implemented
- [x] PASS — Saved prompts persisted via localStorage
- [x] PASS — User/assistant message styling differentiated
- [x] PASS — Streaming renderer path present (`Streamdown`)
- [ ] FAIL — Full browser automation run unstable in this container (Playwright Chromium crash)

## D) API route verification (`/api/chat`)
- [x] PASS — `modelId` validation enforced
- [x] PASS — `presetId` validation enforced
- [x] PASS — Client sends `modelId` + `presetId` in request body
- [x] PASS — Preset system prompt selected from preset list
- [x] PASS — Invalid model returns 400 JSON
- [x] PASS — Invalid preset returns 400 JSON
- [ ] FAIL — No rate-limiting implementation in baseline
- [ ] FAIL — No auth/quota enforcement in baseline
- [ ] FAIL — No input-size/message-count safety caps in baseline

## E) Public launch readiness risks
- [ ] FAIL — Cost abuse possible via anonymous high-volume API calls
- [ ] FAIL — Missing quota + kill-switch controls for emergency containment
- [x] PASS — Actionable mitigation plan documented in `AUDIT_REPORT.md`

## Separate fix PRs opened
- [x] PR 1 (single issue): add `/about` route.
- [x] PR 2 (single issue): add `/api/chat` input/message-size guardrails.
