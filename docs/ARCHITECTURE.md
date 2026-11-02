# Architecture baseline

- Two deployable apps: `miniapp/` (React + TypeScript + Vite) and `backend/` (NestJS + TypeScript).
- PostgreSQL + Prisma; REST API; modular monolith.
- Pinned versions and rejected packages are in `docs/ADR.md` (ADR-001). Do not install them before P1, and do not install rejected packages.
- Frontend, when a screen needs them: `@tma.js/sdk-react`, TanStack Query, React Router, Tailwind CSS. Add Zustand, React Hook Form, Zod, or Leaflet only for a concrete screen. Do not add MUI or Three.js in the MVP.
- Backend, smallest set: NestJS 12, Prisma 7.10.1, `class-validator`, Helmet, throttling, structured logging. Add Swagger when the public API needs a generated contract.
- Tests: frontend unit/component tests, backend unit/integration tests, and Playwright for critical flows when useful.
- Docker Compose only for local dependencies/dev environment.
- No Kafka, Redis, Kubernetes, microservices, or WebSockets in MVP without measured need.
- Server owns identity, authorization, game state, collection validation, and score calculation.
- Use database constraints, transactions, idempotency, and migrations for correctness.
- Keep camera, location, and orientation behind frontend services so unsupported devices can use the map/list fallback. See ADR-002. `client/` and `server/` are leftover kit stubs; new code goes in `miniapp/` and `backend/`.
