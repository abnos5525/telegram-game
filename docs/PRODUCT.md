# Product brief

## Goal
A playful, mobile-first Telegram Mini App treasure hunt. Players explore real places, discover virtual collectibles, complete missions, earn server-validated points, and share results.

## MVP user loop
Discover game -> view mission/map -> approach an item -> open camera/preview -> collect -> receive verified reward -> unlock/share progress.

## MVP scope
- Single-player accounts/sessions.
- Games, ordered missions, collectible items, rarity, points, badges, and individual leaderboard.
- Location-based discovery using proximity checks.
- Camera-based local preview/overlay with lightweight assets and a clear fallback.
- Shareable result and Telegram deep links/referrals.
- Admin panel: users, games, missions, items, coordinates/radius, publishing, reports, basic analytics, roles, and audit history.
- Seed a small but complete playable sample; no dead buttons or placeholder-only screens.

## Non-goals for MVP
No AI, multiplayer, teams, tournaments, payments, blockchain, hardware purchase, bank integrations, or full 3D world anchoring unless Phase 0 proves a small feature is feasible and necessary.

## Product principles
Fun and delightful before dashboard-like UI; fast first feedback; privacy by default; accessible mobile UX; fair rewards; no dark patterns. Future monetization may include sponsored hunts and branded placements, but do not let this expand MVP scope.

## AR truth
A local camera overlay is not the same as an object anchored precisely in the physical world. Telegram documents `LocationManager` and `DeviceOrientation` (Bot API 8.0+), not WebXR or live camera capture. Proximity and approximate heading are best-effort. The map/list flow plus a server radius check is the path that must work when camera or compass is missing. See `docs/ADR.md`.
