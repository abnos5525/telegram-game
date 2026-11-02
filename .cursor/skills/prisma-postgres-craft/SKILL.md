---
name: prisma-postgres-craft
description: PostgreSQL + Prisma ORM schema design, migrations, and queries. Use when modeling data or writing DB queries in backend/.
---

# Prisma + PostgreSQL Craft

This product stores games, missions, items, integer points, and coordinates. Do not add rial amounts, Jalali period keys, or bank-transaction tables.

## Schema design steps
1. Entities from product nouns → fields from UI questions → relations from real traversal.
2. Types: `Int` for points, `DateTime` in UTC, `String` ids, enums for closed sets. Store coordinates with the precision the placement phase decides.
3. Denormalize only for a measured read path.
4. Constraints are the API: unique for idempotency, FK onDelete behavior, sensible defaults. Pin Prisma `7.10.1` (ADR-001).

## Migration workflow
- `prisma migrate dev --name <slug>` locally; review the SQL; never edit applied migrations; `migrate deploy` in prod. Schema drift = stop and fix immediately.

## Query recipes
- Lists: paginate with `take` and a cursor. Do not load unbounded leaderboard or item tables.
- Existence checks: `findFirst({ select: { id: true } })`.
- Collection writes: one `$transaction` with a unique constraint so a replay cannot score twice.

## Performance
- Add indexes for demonstrated filters only, such as a unique Telegram id and the foreign keys a real query uses.
- Use explicit `select`. Do not add a connection pooler in the MVP.

## Gotchas
- Points are `Int`. Do not model them as `BigInt` or `Decimal`.
- Store timestamps in UTC.
