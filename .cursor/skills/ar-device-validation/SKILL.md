---
name: ar-device-validation
description: Use when validating Telegram Mini App camera, GPS, compass, WebAR, caching, or mobile performance.
---
# Telegram WebAR validation

1. Read the current official Telegram Mini Apps docs ([core.telegram.org/bots/webapps](https://core.telegram.org/bots/webapps)) and browser API docs. Prefer those over community issues.
2. Separate three capabilities: Telegram `LocationManager` proximity, `DeviceOrientation` heading (`absolute === true` only), and a local camera overlay. World-anchored WebXR is out of the MVP (ADR-002). Telegram does not document `getUserMedia` or WebXR.
3. Test Telegram Android and iOS WebViews on real devices; record OS, Telegram version, browser engine where known, and outcomes.
4. Check permission grant/denial, HTTPS, camera lifecycle, orientation, GPS accuracy, background/resume, low memory, and network loss.
5. Measure first usable frame, frame rate, memory, battery impact, asset bytes, and repeated-download behavior.
6. Do not infer support from desktop Chrome alone. Use feature detection and a map/list fallback.
7. Do not claim precise spatial anchoring unless verified with a suitable tracking technology on target devices.
8. Record tested facts and unresolved limitations in `docs/STATE.md` or a focused test report.
