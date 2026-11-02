# Current state

- Status: P3 identity checks are in the API. No gameplay collection route yet.
- Active phase: none until the user says `برو بعدی`. Next phase is P4 — Game API.
- Completed phases: P0 — Discovery. P1 — Foundation. P2 — Data model. P3 — Identity/security (2026-11-02).
- Current objective: wait. P4 may add games, missions, items, sessions, collection, the score ledger, and idempotent atomic operations.
- Auth: `POST /auth/telegram` verifies `initData` with the bot token, rejects a stale `auth_date`, and upserts a `PLAYER`. The response token is an HMAC session of one hour. Each protected request loads the user and role from the database. `GET /users/:id` is only for the same user or an `ADMIN`. An admin read of someone else writes `user.read` to `AuditLog`.
- Rate limit: `POST /auth/telegram` allows `AUTH_RATE_LIMIT` attempts per minute per client address, default 10. The counter is in memory and resets on restart.
- Node on this machine is `v26.13.0`. Nest generators are no longer blocked by the old 24.13 runtime.
- Last verified commands, all exit 0, in `backend/`: `npm test` (8 passed), `npm run typecheck`, `npm run lint`, `npm run build`. Miniapp scripts were not rerun.
- Residual risk: a stolen token works until it expires, and the rate limit does not span multiple server processes. Secrets stay in gitignored `backend/.env`.
- Next action: on `برو بعدی`, execute P4 only.
