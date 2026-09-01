# 3dPath

A FiveM mapping school: Blender first, then props, interiors (MLOs), full
buildings, CodeWalker world edit, and outdoor compounds. Slow/fast lesson
pace, timestamped videos, written keybind steps.

People can run **one file**. They do not need Node, Python, or Vite.

## Download

- **Finished app:** [3dPath.exe](https://github.com/WHOMEANSWHO/3dPath/releases/latest/download/3dPath.exe) — latest [Release](https://github.com/WHOMEANSWHO/3dPath/releases/latest), one file, no Node.
- **Unbuilt source:** this repo (`3dpath/`).

Do not download an exe from the repo tree. Ship the GitHub Release asset — that is what the link above uses.

## How to use it

1. Download **3dPath.exe**.
2. Double-click it. Windows may ask to allow it.
3. Learn. Progress stays on that PC (browser storage inside the app).
4. You still need the internet for YouTube playback and official-doc links. Blender, GTA V, CodeWalker, and FiveM stay separate installs.

Windows SmartScreen may appear because the app is not signed. **More info → Run anyway**.

The window is the school. Official doc links open in the normal browser. YouTube stays in the lesson.

## Requirements

- Windows 10 or 11, 64-bit (WebView2 — already on most PCs)
- Internet for videos and docs

## Build from source

```text
cd 3dpath
npm install
python -m pip install -r desktop-requirements.txt
python build.py
```

`build.py` writes `release\3dPath.exe`. Ship that file as a GitHub Release asset.

Curriculum edits: change files under `3dpath/src/data/`, then `python build.py` again (or `npm run build` while you are still using the local bat).

## Open from source (this PC, while editing)

Double-click `Start 3dPath.bat` in this folder (or in Documents\3d). Keep that
window open while you learn. YouTube will not play inside a double-clicked
`.html` file (Error 153). The bat opens 3dPath at `http://127.0.0.1` on this
machine only.

```
npm install        # first time only
npm run build      # rebuild the local HTML
npm start          # same as the bat
```

`npm run dev` is only for editing the source.

## Two layouts

The app switches at 1200px window width:

- Below 1200 (portrait second monitor, 1080 x 1920): single column, top bar
  with a slide-over menu, full-width 16:9 player, sticky Complete / Repeat /
  Next footer pinned to the window.
- 1200 and up (main monitor, 1920 x 1080): two-column lesson workspace.
- 2200 and up (2560 x 1440): the right side splits again.

## Videos

Each lesson has a **Slow** and **Fast** pack in `src/data/pace.ts`. Default is Slow.
Only real YouTube IDs are baked in. 3dPath links to other people’s videos; it does
not ship those videos in the exe.

## Content

Everything lives in `src/data/`:

- `catalogue.ts` — topics, classes, and all 38 lessons
- `pace.ts` — Slow / Fast video packs and clip timestamps
- `monthTrack.ts` — the September 2026 Tue/Thu/Fri playlist
- `reference.ts` — the formats glossary and field notes

## License

MIT. See [LICENSE](../LICENSE). You can use, share, and change 3dPath. The linked
YouTube lessons and official docs stay with their authors.
