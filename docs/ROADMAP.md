# Roadmap

Only one phase may be active at a time. Mark a phase complete only after its acceptance checks pass.

- [x] **P0 — Discovery:** inspect repo; verify official Telegram/WebAR constraints and stable compatible stack; finalize MVP, risks, rules, and decisions. No gameplay implementation.
- [x] **P1 — Foundation:** create/align `miniapp/` and `backend/`, scripts, env examples, Docker dev DB, health check, lint/typecheck/test/build.
- [ ] **P2 — Data model:** Prisma schema, migrations, constraints, indexes, seed data, DB tests.
- [ ] **P3 — Identity/security:** Telegram initData verification, sessions, roles, ownership, rate limits, security tests.
- [ ] **P4 — Game API:** games, missions, items, sessions, collection, score ledger, idempotent atomic operations.
- [ ] **P5 — Player UX:** onboarding, game home, mission/map, collection feedback, progress, badges, leaderboard, share links.
- [ ] **P6 — Admin:** secure admin UI and APIs for users, content, item placement, publishing, reports, analytics, settings, audit log.
- [ ] **P7 — Location:** map, permission states, distance/radius checks, accuracy handling, safe-area validation, fallback.
- [ ] **P8 — Camera/AR:** device feasibility tests, instant local preview, lightweight overlay/assets, lifecycle cleanup, fallback.
- [ ] **P9 — Game polish:** tutorial, animation/audio/haptics where supported, performance, accessibility, abuse prevention.
- [ ] **P10 — Release:** production config, backup/restore plan, observability, end-to-end/security/performance checks, deployment docs.

Phase dependencies may change only with a recorded reason in `docs/ADR.md`.
