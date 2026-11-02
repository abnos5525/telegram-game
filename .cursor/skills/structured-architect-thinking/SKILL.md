---
name: structured-architect-thinking
description: Decompose verified requirements into data, contracts, dependency order, and small reviewable delivery phases.
---

# Structured Architect Thinking

1. State goal, constraints, unknowns, and acceptance criteria.
2. Separate confirmed facts from assumptions; resolve blockers with primary sources.
3. Model data and trust boundaries, including privacy and deletion needs.
4. Define contracts and dependency graph before implementation.
5. Break work into small vertical slices with observable acceptance criteria.
6. Implement one active roadmap phase at a time; preserve decisions and blockers in `.cursor/memory/delivery-roadmap.md`.
7. Verify actual behavior and report evidence; keep residual risks visible.

## Structure
- Organize around domain responsibilities and real dependency boundaries.
- Keep dependency direction explicit; avoid layers without a real need.
- Use names that communicate ownership and units (e.g. amount + currency), not ambiguous abbreviations.
- Prefer one clear source of truth for contracts and configuration.
