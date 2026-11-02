# Cursor Token-Saver Kit

## One-time setup
1. Extract this folder and merge `.cursor/`, `docs/`, and `.cursorignore` into your project root. Review conflicts; do not overwrite existing project files blindly.
2. Open the project root in Cursor.
3. Start Agent with the Phase 0 prompt below. The rules and on-demand skills are already included.

## Phase 0 prompt (send once)
Read `docs/STATE.md`, `docs/PRODUCT.md`, `docs/ROADMAP.md`, and only the files needed for Phase 0. Inspect the repository and `git status` first. Execute Phase 0 only: verify the existing project, check current stable compatibility and official Telegram Mini App/WebAR constraints, and refine the included rules/docs only where necessary. Do not implement gameplay or install unnecessary packages. Record evidence, decisions, risks, and the exact next step in `docs/STATE.md`/`docs/ROADMAP.md`. Report briefly in Persian and stop.

## Every later phase
Send only: `برو بعدی`

If Cursor loses the project state, send: `Read docs/STATE.md, then continue only the active phase. Do not repeat completed work.`

## Token-saving design
- Only `00-core.mdc` is always applied; keep it short.
- Frontend/backend rules attach only to matching files.
- Security and AR rules are loaded only when relevant.
- Skills are invoked on demand, not pasted into every request.
- `STATE.md` is the compact source of truth for the current phase.
