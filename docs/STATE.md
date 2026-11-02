# Current state

- Status: P1 foundation is in place. No gameplay.
- Active phase: none until the user says `برو بعدی`. Next phase is P2 — Data model.
- Completed phases: P0 — Discovery (2026-11-02). P1 — Foundation (2026-11-02).
- Current objective: wait. P2 may add the Prisma 7.10.1 schema, migrations, constraints, indexes, seed data, and DB tests. No gameplay screens.
- Apps: `miniapp/` (React 19.3.1, Vite 8.3.5, TypeScript 6.0.3) and `backend/` (NestJS 12.3.2, TypeScript 6.0.3). Tailwind and `@tma.js/*` stay uninstalled until a screen needs them. Versions remain in `docs/ADR.md`.
- Local database: `docker compose` Postgres 17 is up and healthy on port 5432. Connection string is in `.env.example`. Prisma is not installed yet.
- Last verified commands, all exit 0: `npm test` (miniapp 1 passed, backend 1 passed), `npm run typecheck`, `npm run lint`, `npm run build`. `GET http://localhost:3000/health` returned `{ "status": "ok" }`. Browser opened `http://localhost:5173/` and showed the heading «شکار گنج». Those two dev servers were stopped after the check. `docker compose ps` showed `telegram-game-postgres-1` healthy.
- Scaffold note: Node is still `v24.13.0`, so `nest new` was not used. The app was written by hand and compiled with `tsc`. Nest generators still need Node 24.15+.
- Blockers: this folder is still not a git repository, so `.gitignore` does not protect the existing root `.env` until `git init`. That file was not opened. No device test.
- Next action: on `برو بعدی`, execute P2 only.
