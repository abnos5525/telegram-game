---
name: security-review
description: Use before releasing auth, admin, scoring, location, uploads, or other sensitive flows.
---
# Focused security review

Review only the changed flow and its dependencies:
- Authentication and Telegram initData validation, freshness, replay handling.
- Authorization, ownership, role checks, and IDOR.
- DTO validation, injection, XSS, unsafe file handling, and rate limits.
- Idempotency, transaction boundaries, race conditions, and score/reward tampering.
- Secret exposure, logs, privacy, location minimization, and admin audit trails.
- Abuse cases: repeated collection, spoofed location, concurrent requests, and stale sessions.
Run focused tests. Report verified issues by severity, evidence, and concrete fix. Do not claim a complete security audit from a limited review.
