---
name: ux-finance-app
description: Unused finance-app UX notes. Do not apply to this treasure-hunt Mini App.
---

# UX — Personal Finance Mini App

## Core mental model
The user's question: «این ماه پولم کجا رفت؟» Every screen must answer a money question in ≤3 seconds.

## Hierarchy rules
- Number first: amount big/bold, label small/muted, context (category, time) tertiary.
- Persian digits + تومان everywhere (Rial only in raw detail). Big amounts as «۱٫۲ میلیون تومان», exact amounts in full digits.
- Progressive disclosure: month summary → category → transaction list → single txn detail (raw bank data).

## Key screens
1. **Dashboard**: this month's total, donut by category, top 3 categories, last 5 txns, sync-status pill.
2. **Month view**: Jalali month switcher, daily bar chart, category list with % and trend vs previous month.
3. **Transactions**: grouped by day, sticky date headers, filters (category, direction, search), infinite scroll.
4. **Settings**: accounts (masked IBAN), sync now, category rules, theme follows Telegram.

## Trust & safety UX
- Never ask for bank card password/CVV2 — consent happens in the bank/open-banking flow; say so explicitly.
- Show sync freshness («آخرین به‌روزرسانی: ۲ ساعت پیش») and sync errors with a retry action.
- Mask IBAN/card in lists; full numbers only on tap.

## Interaction
- Bottom navigation (3–4 items, thumb zone). Primary action = Telegram MainButton when available.
- Optimistic UI for user edits (rename category); never block the UI on sync.
- Empty states teach the next action («بانک را متصل کن»).

## Numbers & dates
- Jalali months everywhere; relative times («۳ روز پیش»); Persian weekday names.
- Deltas: color + arrow + percentage; always compare like-for-like months.
