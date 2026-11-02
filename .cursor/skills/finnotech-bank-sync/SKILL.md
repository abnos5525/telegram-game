---
name: finnotech-bank-sync
description: Unused bank-sync notes. Do not apply to this treasure-hunt Mini App.
---

# Bank Sync — verify before implementation

## Gate
The active provider is not confirmed. The supplied API.ir endpoint targets Shahkar and the public OpenAPI did not expose transaction statements. Do not implement a Finnotech-specific adapter or call `BANK_API` until official provider docs confirm read-only transactions, consent and response contract.

## Provider-agnostic normalized boundary
Define a small interface only when a real provider contract is available. Keep provider DTOs/mapping inside the adapter. Confirm transaction identity, direction, exact integer amount + currency/unit, timestamp/timezone, account identity, pagination and historical window from primary docs.

## Reliable sync principles
- Use bounded request timeouts and bounded exponential retries only for transient failures; do not retry auth/consent/validation failures.
- Persist a safe checkpoint only after a batch is committed. Make retries idempotent using a verified stable provider reference; define fallback behavior when absent.
- Serialize sync per account; make on-demand and scheduled triggers share the same idempotency/lock policy.
- Reconcile fetched counts/time ranges where provider supports it; expose last successful sync and actionable consent errors.
- Treat every response as sensitive. Avoid raw payload persistence; redact provider logs and fixtures.

## Questions to resolve
Statement endpoint/scopes; banks supported; consent creation/expiry/revoke; sandbox; pagination/date limits; rate limiting; status codes; amount and date semantics; duplicate/correction behavior; data retention and deletion; pricing/support/SLA.
