---
name: phase-runner
description: Use when starting or completing one project roadmap phase.
---
# Run one roadmap phase

1. Read `docs/STATE.md`; identify the single active phase. Read only its relevant roadmap entry and required docs.
2. Inspect `git status`, existing code, scripts, and current conventions before editing.
3. Convert the phase into a short checklist with observable acceptance criteria.
4. Implement the smallest complete vertical slice. Do not add speculative abstractions or dependencies.
5. Run the narrowest relevant tests first, then typecheck/lint/build when applicable.
6. Review changed files for regressions, security, accessibility, and mobile behavior relevant to the phase.
7. If a test fails, diagnose and fix it; do not hide, skip, or claim success. Do not loop blindly.
8. Update `docs/STATE.md`; update `ROADMAP.md` checkboxes and `ADR.md` only when needed.
9. Report in Persian: outcome, key files, tests actually run, remaining risks, and next phase.
10. Stop. Never start the next phase until the user says `برو بعدی`.

Token discipline: do not reread unrelated docs, dump entire files, repeat the product brief, or spawn subagents for routine changes. Do not run multiple independent reviewers per phase. Use one independent reviewer only for a sensitive or complex change. Do not repeat Phase 0 web research; look up versions again only when a dependency actually needs to change.
