# Architecture decisions

## ADR-001 — MVP stack pins

- Status: accepted in P0 (2026-11-02). P1 installed the backend and the miniapp shell. Tailwind and `@tma.js/*` are still not installed.
- Runtime: Node.js 24.15 or newer for Nest 12 generators. This machine has Node `v24.13.0`, which is below the schematics minimum in the [NestJS 12 migration guide](https://docs.nestjs.com/migration-guide). Upgrade Node before `nest new` / `nest generate`.
- Frontend (`miniapp/`): React `19.3.1`, Vite `8.3.5`, TypeScript `6.0.3`, Tailwind CSS `4.3.3` when UI work starts. Telegram client SDK: `@tma.js/sdk` `3.3.0` and `@tma.js/sdk-react` `3.0.23` (React 17–19 peer). Do not start new code on `@telegram-apps/*`.
- Backend (`backend/`): NestJS `12.3.2` (`@nestjs/core` latest on 2026-11-02; Node `>=20`), TypeScript `6.0.3`. Nest schematics peer on TypeScript 6. Do not install TypeScript 7 for `nest build`; 7.0.2 is current `latest` and the Nest CLI still needs the TypeScript 6 compiler API ([migration guide](https://docs.nestjs.com/migration-guide)).
- Data: PostgreSQL 17 in local Docker only. Prisma CLI and Client are installed at `7.10.1`. Do not upgrade to the Prisma 8 release candidate. Runtime uses `@prisma/adapter-pg`, which the generated client requires.
- Tests/lint to confirm when scaffolding in P1: Vitest for the ESM Nest app and for Vite; oxlint if `nest new` emits it. Playwright waits until a critical flow exists.
- Validation: `class-validator` with Nest `ValidationPipe`, matching the backend rule. Nest 12 also supports Standard Schema; do not add Zod unless a measured gap appears.
- Explicitly not in the MVP install set: MUI, Three.js, a WebXR engine, Redis, Kafka, `@nestjs/schedule`, and any bank/open-banking client.

## ADR-002 — Sensors and AR capability split

- Status: accepted in P0. No device test has been run.
- Official Mini App surface is [core.telegram.org/bots/webapps](https://core.telegram.org/bots/webapps). It documents `LocationManager` and `DeviceOrientation` from Bot API 8.0. It does not document `getUserMedia`, WebXR, or world anchoring.
- Proximity uses `LocationManager` (`init`, then `getLocation`). Raw `navigator.geolocation` is only a fallback when the Telegram API reports location unavailable.
- Approximate heading uses `DeviceOrientation.start({ need_absolute: true })`. If `absolute` is false, the reading is not a compass.
- The guaranteed collect flow is map/list plus server-side radius check. A camera preview is best-effort local overlay after a user gesture, feature-detected, and cleaned up on exit. It is not centimeter-level placement.
- `showScanQrPopup` is a QR dialog, not an AR mode. `shareMessage` (Bot API 8.0) plus server `savePreparedInlineMessage` is the share path for a later phase.
- A community report of Android WebView camera limits is not a Telegram specification: [tma.js issue 681](https://github.com/Telegram-Mini-Apps/tma.js/issues/681). P8 must retest current Telegram Android, iOS, and Desktop builds.

## ADR-003 — Identity

- Status: accepted in P0. Implementation is P3.
- The server checks `Telegram.WebApp.initData` with the bot token. `initDataUnsafe` and any client-sent user id are not credentials.
- Node verification shape, matching the official key/message description:

```ts
createHmac('sha256', 'WebAppData').update(botToken).digest();
createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
```

- Compare the hex digest with `timingSafeEqual` on equal-length buffers. Reject a stale `auth_date`. Initial max age is 24 hours and can change in P3; Telegram documents the field and does not mandate that window.
- Third-party Ed25519 `signature` verification is only for callers who must not hold the bot token. This backend holds the token and uses the HMAC path.
- After a valid check, issue a short-lived bearer token kept in memory. Each Mini App launch sends `initData` again. Do not store the token in `localStorage`. Do not log the raw `initData` or the bot token.
