# Security baseline

- Verify Telegram `initData` server-side with HMAC-SHA-256 as documented for Mini Apps: key `WebAppData` over the bot token, then that secret over the sorted data-check-string. Enforce `auth_date` freshness and `timingSafeEqual`. The exact Node calls are in ADR-003.
- Never authenticate from `initDataUnsafe` or client-supplied Telegram IDs.
- Apply server-side role, ownership, and object-level authorization to every protected operation.
- Validate DTOs; rate-limit sensitive endpoints; protect uploads; use safe output encoding.
- Collection and score changes must be transactional, server-calculated, and idempotent.
- Keep bot tokens and secrets server-side. Commit only `.env.example` with placeholders.
- Minimize location data and retention. Do not upload camera images by default.
- Validate item placement and provide reporting/moderation for unsafe or private locations.
- Audit sensitive admin actions; avoid logging secrets, raw initData, or precise user location.
- Document residual risks. No system can be promised 100% secure.
