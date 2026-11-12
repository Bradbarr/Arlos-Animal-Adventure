# Arlo's Animal Adventure

A game made for Arlo (age 6). Rescue lost baby animals across 30 landscapes, learn maths, reading and nature along the way, and build them a sanctuary where they grow up.

## Play
Open the game's GitHub Pages address (Settings → Pages shows it).

**Full screen on a tablet or phone:**
- **iPad / iPhone:** open the link in Safari → Share → **Add to Home Screen**. Open it from the new icon.
- **Android:** open the link in Chrome → ⋮ menu → **Install app** (or Add to Home screen).

Once opened, it works offline. Saves stay on the device; use **💾 Backup** on the main menu to move a save between devices.

## What's here
- `index.html`, `manifest.webmanifest`, `sw.js`, `icons/` — the installable game that GitHub Pages serves.
- `source/` — the source files (`src/`), the build script, the changelog and the V4 brief.

## Changing the game
Edit files in `source/src/`, then run `sh source/build.sh` (update the path at the top of the script to wherever the folder lives). It writes a single-file `index.html` and the installable `web/` folder; copy the `web/` contents to the top of this repository.
