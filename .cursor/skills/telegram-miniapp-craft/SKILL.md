---
name: telegram-miniapp-craft
description: Telegram Mini App development with React and @tma.js/sdk-react. Use for anything in miniapp/ touching Telegram platform APIs.
---

# Telegram Mini App Craft

Versions and rejected libraries: `docs/ADR.md`. Official behavior: [core.telegram.org/bots/webapps](https://core.telegram.org/bots/webapps).

## Bootstrap
Load the official `telegram-web-app.js` before app code, then initialize `@tma.js/sdk-react` once in a provider (`init`, restore launch params if the SDK requires it, theme CSS variables, viewport). Components use that provider. Do not import a second SDK ad hoc, and do not use `@telegram-apps/*` for new code.

## Platform APIs
- **MainButton**: one primary action per screen; show or hide with the route; always wire `onClick`.
- **BackButton**: show when the navigation stack is non-empty; keep it aligned with router history.
- **HapticFeedback**: success, error, and selection only.
- **Viewport**: `viewportStableHeight` / `--tg-viewport-stable-height` and safe-area insets. Do not pin footers to the animated `viewportHeight`.
- **LocationManager** and **DeviceOrientation**: see ADR-002. Request location only after a user action.
- **shareMessage**: needs a server-side `savePreparedInlineMessage` id. Do not build this before the share phase.

## Auth
Send the raw `initData` string to the backend. The server verifies HMAC (ADR-003) and returns a short-lived bearer token kept in memory. Never trust `initDataUnsafe` or a client-supplied Telegram id.

## Dev setup
Serve the Vite app on HTTPS (a tunnel such as cloudflared or ngrok), then set that URL in BotFather. `TELEGRAM_BOT_TOKEN` stays on the server. Desktop, iOS, and Android WebViews differ; record real-device results before claiming camera or location support.

## Pitfalls
- No `alert` / `confirm`. Use an in-app dialog. External URLs go through `openLink()`.
- Feature-detect. Missing location, compass, or camera must fall back to map/list.
- Code-split heavy routes. The Mini App pays the download cost on every open.
