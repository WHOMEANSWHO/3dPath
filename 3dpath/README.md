# 3dPath

A personal school for one beginner: Blender first, then FiveM props,
interiors (MLOs), full buildings, CodeWalker world edit, and outdoor
compounds — gates, lots, and areas that are not a building.

Curriculum, video packs, progress, checklists, notes, and pace live on this
machine (data files + browser localStorage). Nothing is hosted on the internet.
You only need the network for YouTube playback and the official-doc links.

## Open (this PC only)

Double-click `Start 3dPath.bat` in this folder (or in Documents\3d). Keep that
window open while you learn.

YouTube will not play inside a double-clicked `.html` file (Error 153 — no
website address for the embed). The bat opens 3dPath at `http://127.0.0.1`
on this machine only: no internet hosting, no Vite, no `npm run dev`.

After a curriculum change, run `npm run build` once so the HTML is rebuilt.

```
npm install        # first time only
npm run build      # rebuild the local HTML
npm start          # same as the bat
```

`npm run dev` is only for editing the source. You do not need it to learn.

Fonts are self-hosted (bundled from npm) — no Google Fonts calls at runtime.

## Two layouts

The app switches at 1200px window width:

- Below 1200 (portrait second monitor, 1080 x 1920): single column, top bar
  with a slide-over menu, full-width 16:9 player, sticky Complete / Repeat /
  Next footer pinned to the window. Base type is bumped to 17px.
- 1200 and up (main monitor, 1920 x 1080): two-column lesson workspace —
  player and clips left (~55%), guide, checklist, tips and notes right (~45%),
  each column scrolling independently, actions pinned to the bottom of the
  right column.
- 2200 and up (2560 x 1440): the right side splits again — guide beside
  checklist / tips / notes — so the extra width carries more of the lesson.

On portrait, once a video is linked, scrolling past the player docks it as a
slim floating mini-player under the top bar (same iframe — playback survives).

## Videos

Each lesson has a **Slow** and **Fast** pack in `src/data/pace.ts` (different
YouTube IDs and timestamps). Toggle Slow / Fast in the header (landscape) or
on the lesson / menu (portrait). Default is Slow.

Only real IDs are baked in. Lessons without a confirmed ID still show
paste-a-link. A pasted link overrides the **current pace** only.

Clips auto-seek (`youtube.com/embed/ID?start=SECONDS`). A clip
may set its own `videoId` so one lesson can jump between videos.

To add more videos, edit `src/data/pace.ts`. Do not invent IDs.

## Content

Everything lives in `src/data/`:

- `catalogue.ts` — topics, classes, and all 38 lessons (gates, steps,
  attributed community tips, checklists). Project lessons make a finished thing.
- `pace.ts` — Slow / Fast video packs and clip timestamps
- `monthTrack.ts` — the September 2026 Tue/Thu/Fri playlist
- `reference.ts` — the formats glossary and field notes

## Demo scenes

For screenshots or a quick look at states, append `?scene=` (on a local file,
put it after the hash: `3dPath.html#/lessons/6?scene=clip`):

- `/?scene=midway` — a few lessons complete, mid-course home
- `/lessons/6?scene=clip` — clip selected, checklist partly done
- `/lessons/6?scene=complete` — gate passed
- `/lessons/6?scene=failed` — gate failed

A scene overwrites saved progress in that browser profile, so keep it away
from your real one. `shots/shoot.mjs` renders the deliverable frames with the
bundled headless Chromium (`node shots/shoot.mjs` against `npm run preview`).
