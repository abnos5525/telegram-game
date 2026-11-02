---
name: token-efficient-agent
description: Minimize AI token consumption with modern agent patterns while keeping best-quality output. Use in every coding session, especially long ones.
---

# Token-Efficient Agent

Goal: best result per token. Every read, write, and output must earn its cost.

## Planning
- One short plan (≤5 bullets) before acting. No essays, no restating the request.
- Fix the target file list first, then execute — avoids exploration loops.

## Reading
- Batch independent reads/searches in one tool block.
- `search_files` with include filters beats reading whole files. Read only the needed offset/limit of large files.
- Read a file once; keep its model in working memory; never re-read unchanged files.

## Writing
- Prefer minimal targeted edits over rewriting files.
- Never reprint unchanged code in responses. Show only diffs/new code, or the file path + one-line summary.
- Generate files directly with tools; don't paste file contents in chat "for review".

## Output
- Terse summaries: what changed, where, why, next step. Bullets over prose.
- No filler ("Great question!"), no apologies, no repeating the user's words.
- Skip well-known basics; explain only non-obvious decisions.

## Scope discipline
- Smallest sufficient change set. No drive-by refactors or reformatting.
- Stop when done — no unrequested "extra improvements".
