---
name: minimal-solution-engineering
description: Find the simplest maintainable implementation that meets verified requirements, security constraints, and acceptance criteria.
---

# Minimal Solution Engineering

Aim for the smallest complete solution, not a line-count target that harms correctness.

## Decision ladder
1. Remove unsupported scope.
2. Use built-in platform capabilities.
3. Use a maintained dependency when it removes meaningful complexity.
4. Add a small helper/module only when it owns a clear responsibility.

## Rules
- Do not invent future requirements or add speculative frameworks.
- Avoid duplicate logic and unnecessary layers; add abstractions at a real boundary (e.g. a confirmed external bank provider).
- Prefer clear control flow and explicit domain units over compressed clever code.
- Keep error handling at boundaries; never swallow errors.
- Delete dead code and unused dependencies.
- Test behavior at the risk boundary; do not add boilerplate tests without a clear assertion.

## Review
Ask whether every dependency, abstraction, and field has a present requirement and an owner. Keep necessary security, privacy, and reliability controls even when they add code.
