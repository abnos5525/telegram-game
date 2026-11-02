---
name: tailwind-mui-designer
description: Unused Tailwind-plus-MUI finance UI notes. Do not add MUI to this treasure-hunt Mini App. Use .cursor/rules/10-frontend.mdc.
---

# Tailwind + MUI Designer

Creative quality bar: looks designed, not generated.

## System first
- Tokens in one place: palette (bg, surface, text, muted, accent, success, danger), radius (sm 8 / md 12 / card 16), 4px spacing grid, soft shadow.
- MUI theme + Tailwind `@theme` read the same tokens; Telegram `themeParams` feeds the palette; dark mode is first-class.
- Typography scale: display/bold for money, body for labels, caption for meta. Vazirmatn everywhere; `tabular-nums` for numbers.

## Combo rules
- MUI for: Dialog, Drawer, DatePicker, Snackbar, Menu, BottomNavigation, List, Chip.
- Tailwind for: layout (grid/flex), spacing, page composition, gradients, one-off styles.
- MUI internals styled via `sx`/theme only. Composition pattern: MUI component inside a Tailwind-styled wrapper.

## Finance UI recipes
- **SummaryCard**: accent gradient bar, big tabular amount, delta vs last month (▲/▼ + color), icon chip.
- **TxnRow**: category icon (rounded, tinted bg) + title + meta (time, account) + amount (green/red by direction, tabular-nums).
- **MonthSwitcher**: pill chevrons + Jalali month name (فروردین…اسفند).
- **Donut** (Recharts) with category colors + total in center; bar chart for daily spend; legend as chips.
- **Empty state**: icon/illustration + one-line hint + CTA. **Loading**: skeletons matching the final layout.

## Motion & polish
- framer-motion: 150–250ms ease-out; stagger lists (30–50ms); animate number changes. Respect `prefers-reduced-motion`.
- Dark TMA: 1px borders (white/8%), soft shadows, subtle gradients; avoid pure black.
- RTL: logical utilities only; mirror directional icons (chevrons, arrows).

## Accessibility
- Contrast AA, touch targets ≥44px, visible focus rings, icon + text (never color alone).
