---
name: nestjs-api-craft
description: NestJS 12 backend craftsmanship for backend/. Use when building or reviewing the treasure-hunt API.
---

# NestJS API Craft

Pins: `docs/ADR.md`. Official initData rules: [Validating data received via the Mini App](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app).

## Module anatomy
`feature.module.ts`, thin `feature.controller.ts`, `feature.service.ts`, `dto/` classes, and a spec file. Shared: config validated at boot, Prisma, auth guards.

## Validation and errors
- DTO classes with `class-validator`, applied by a global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, transform).
- Throw Nest HTTP exceptions. One error shape: `{ error: { code, message, details? } }`.
- Do not add Zod, a response-envelope interceptor, or `@nestjs/schedule` unless a phase records the need.

## Auth
1. Client posts the raw `initData` string.
2. Verify with Node `createHmac` as in ADR-003. Key for the first HMAC is the string `WebAppData`; message is the bot token. Second HMAC key is that digest; message is the sorted data-check-string. Reject stale `auth_date` and compare with `timingSafeEqual`.
3. Upsert the user from the verified payload only. Return a short-lived bearer token. Do not accept `initDataUnsafe` or a body user id.

## Testing
- Unit-test services with a mocked Prisma client. Test the initData check with a vector generated from a fake bot token.
- Integration tests hit the app and a test database. Cover auth rejection before any gameplay route.
