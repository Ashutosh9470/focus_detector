# Neuro Focus Detector (MVP) ✅

**Detects attention drops using inactivity, tab switching, and an optional camera.**

---

## 🔎 Overview
This Chrome extension monitors simple signals (user interactions, tab visibility, and optional webcam) to estimate whether the user is focused or not and updates the popup UI in real time.

- Name: **Neuro Focus Detector (MVP)**
- Manifest: **Manifest V3**
- Core idea: Keep detection local and privacy-first.

---

## ⚙️ Features
- Detects inactivity (default threshold: 7s) and marks focus as LOW
- Detects tab switch (visibility change) and updates focus
- Optional camera-based monitoring (user must explicitly enable it)
- Lightweight popup UI showing current focus state

---

## 🚀 Quick start — Install locally
1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode** (top-right).
3. Click **Load unpacked** and select this repository folder.
4. Open the extension popup to see the current focus status.

---

## ℹ️ Usage
- Open the extension popup (`Neuro Focus`).
- The **Current Focus** badge will show `NORMAL` or `LOW`.
- Click **Enable Camera** to allow webcam-based detection (optional).
- Permissions: `activeTab` (declared), camera access requested only when you press **Enable Camera**.

---

## 🧩 Files & Behavior (short)
- `content.js` — Injected into pages; reports user activity and visibility changes.
- `background.js` — Service worker that tracks last activity, runs inactivity timer (7s), and manages the camera stream.
- `popup.html` / `popup.js` — UI for showing status and enabling the camera.
- `manifest.json` — Extension metadata (manifest_version 3).

---

## 🔧 Development & Debugging Tips
- Reload/update: Use `chrome://extensions` → **Reload** for the unpacked extension.
- Inspect the popup: Open popup → right-click → **Inspect** to see console logs from `popup.js`.
- Inspect content logs: Open DevTools on the page where `content.js` runs.
- Inspect background/service worker logs: `chrome://extensions` → find the extension → click **Service worker** (Inspect) to view console logs.
- To change inactivity threshold, edit the value `7000` in `background.js` (milliseconds).

---

## 🔒 Privacy
- All processing is done locally in the browser.
- Camera is only accessed if you explicitly enable it from the popup.
- No network requests are made by the extension by default.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome. Please open an issue first if you want to add larger features.

---

## 📝 License
This project is provided without an explicit license in the repo. Add a `LICENSE` file to indicate the desired license (e.g., MIT) if you want to make the terms explicit.

---

Happy hacking! 💡
