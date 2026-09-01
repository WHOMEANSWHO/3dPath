// Slow vs fast video packs. Only real YouTube IDs — never invented.
// Timestamps are seconds. Clips may set videoId to jump between videos in one lesson.
// If a timestamp is not confirmed, the clip starts at 0 with an honest label.

import type { Clip, Lesson } from "./catalogue";

export type Pace = "slow" | "fast";

export interface PacePack {
  videoId: string;
  videoNote: string;
  clips: Clip[];
  /** Clip index per written step. Missing entries spread steps across clips in order. */
  stepClips?: Array<number | null>;
}

/** Which clip a step should play. Null = this lesson has no video to jump. */
export const clipIndexForStep = (pack: PacePack, stepIndex: number, stepCount = pack.clips.length): number | null => {
  const n = pack.clips.length;
  if (n === 0) return null;
  const mapped = pack.stepClips?.[stepIndex];
  if (mapped === null) return null;
  if (typeof mapped === "number" && mapped >= 0 && mapped < n) return mapped;
  const total = Math.max(1, stepCount);
  return Math.min(Math.floor((stepIndex * n) / total), n - 1);
};

const fallback = (lesson: Lesson): PacePack => ({
  videoId: lesson.videoId,
  videoNote: lesson.videoNote,
  clips: lesson.clips,
});

/**
 * Confirmed IDs only:
 * kVcY7K-JA1Y  Grant Abbitt — Blender 5 Complete Beginners, Part 1 (interface)
 * 7MRonzqYJgw  Grant Abbitt — Complete Beginners Guide 2.8 (older interface)
 * F_JK9eaYYTQ  Grant Abbitt — low-poly animal (edit-mode keys; skip the creature)
 * 8XyIYRW_2xk  Blender Fundamentals — Interface Overview
 * MF1qEhBSfq4  Blender Fundamentals — First Steps
 * ILqOWe3zAbk  Blender Fundamentals — Viewport Navigation
 * hTL6AKR8YDs  Blender Fundamentals — Select & Transform
 * 34FBeC9mktE  Blender Fundamentals — Object and Edit Mode
 * JSvGts95S7A  Blender Fundamentals — Bevel Tool
 * -tbSCMbJA6o  Blender Guru Donut 5.0 Part 1 (fast track only)
 * nIoXOplUvAw  Blender Guru 3.0 Part 1
 * zv3NdateGqs  Sollumz install
 * NN-fjCbPO1Q  Desertos — custom MLO interior in Blender (from-scratch follow-along)
 * hBH1vZY8rWc  Vertex painting (Sollumz FAQ)
 * fgCK5FRsZMM  Sollumz MLO + lights (older UI; lights ~55:42)
 * QZtFRk6ANm0  CodeWalker ymap / props (RIB SOSAY)
 * E5JgRiQMneo  RIB SOSAY — How to make a FiveM MLO Part 4 (stream)
 * VDoAjV3kv2g  Tobii — creating/modifying ymaps
 * z3QwE87YtDk  Twisle — custom ymaps (places a gate)
 * uPHig3V-cqo  RoyalT — clearing land (MLO Part 1; outdoor deletions only)
 * GgZ82sue3kM  ook_3D / Cfx Part 1 — tooling
 * fCQ5JlbWcSE  ook_3D / Cfx Part 2 — export & import
 * FOBlazpGIhA  ook_3D / Cfx Part 3 — create assets in Blender
 * dVBO3_ZGL_Q  ook_3D / Cfx Part 4 — ymap / map resource
 * UN7iaK5ADpk  ook_3D / Cfx Part 5 — collision
 * dVkvYm4eDeI  ook_3D / Cfx Part 6 — LODs
 * 11EXhLYfJLs  ook_3D / Cfx Part 7 — map animation
 * ajqNHqB8mYw  ook_3D / Cfx Part 8 — doors / sliding gates
 * K_Kk4n_-Z8s  RoyalT — export XMLs from CodeWalker
 * s91lzkS8rKY  RoyalT — model, export, test interior
 * na_62B-OxGs  RoyalT — fill ground and collision
 * gG_8NeiXKRE  RoyalT — remove props, occlusions, YMF
 * 9jPKQLiXSuA  RoyalT — MLO from scratch intro
 * -24PBSYT74w  Bumpy86 — simple prop collisions
 *
 * Grant Part 1 chapters (Class Central): download 53, interface 97, nav 127,
 * viewport 192, Shift+A 281, cursor 341, G 374, R/S 465, gizmos 499,
 * challenge 593, typed numbers 606.
 *
 * Donut 5.0 Part 1: nav 50, add 362, G 733, edit 942, loop/inset 1363.
 */

const GRANT5 = "kVcY7K-JA1Y";
const DONUT = "-tbSCMbJA6o";
const MLO = "NN-fjCbPO1Q";
const CW = "QZtFRk6ANm0";
const CFX1 = "GgZ82sue3kM";
const CFX2 = "fCQ5JlbWcSE";
const CFX3 = "FOBlazpGIhA";
const CFX4 = "dVBO3_ZGL_Q";
const CFX5 = "UN7iaK5ADpk";
const CFX6 = "dVkvYm4eDeI";
const CFX7 = "11EXhLYfJLs";
const CFX8 = "ajqNHqB8mYw";
const YMAP_EDIT = "VDoAjV3kv2g";
const GATE_YMAP = "z3QwE87YtDk";

const PACKS: Record<number, Record<Pace, PacePack>> = {
  1: {
    slow: {
      videoId: GRANT5,
      videoNote:
        "Grant Abbitt — Blender 5 Part 1 (the slow one). Starts at 0.75×. Pause after every control and copy it. Official shorts below are one idea each.",
      clips: [
        { label: "First steps (official, 1 min)", start: 0, videoId: "MF1qEhBSfq4" },
        { label: "Viewport navigation (official, 4 min)", start: 0, videoId: "ILqOWe3zAbk" },
        { label: "Grant: orbit, pan, zoom", start: 127, videoId: GRANT5 },
        { label: "Grant: viewport, camera, ortho", start: 192, videoId: GRANT5 },
      ],
      stepClips: [2, 2, 2, 3, 3, 2],
    },
    fast: {
      videoId: DONUT,
      videoNote: "Blender Guru Donut 5.0 Part 1 — faster. Watch at 1×. Steal camera only; skip icing.",
      clips: [
        { label: "Download and navigation", start: 50 },
        { label: "Adding objects", start: 362 },
      ],
      stepClips: [0, 0, 0, 0, 0, 0],
    },
  },
  2: {
    slow: {
      videoId: GRANT5,
      videoNote: "Stay on Grant Part 1. Starts at 0.75×. Type the numbers — do not drag.",
      clips: [
        { label: "Grant: Move [[G]] and axis locks", start: 374, videoId: GRANT5 },
        { label: "Grant: Rotate [[R]] and Scale [[S]]", start: 465, videoId: GRANT5 },
        { label: "Grant: typed numbers (90°, scale 3)", start: 606, videoId: GRANT5 },
        { label: "Select & Transform (official)", start: 0, videoId: "hTL6AKR8YDs" },
      ],
      stepClips: [0, 1, 1, 2, 2],
    },
    fast: {
      videoId: DONUT,
      videoNote: "Donut Part 1 at 1×. Grab [[G]], rotate [[R]], scale [[S]] — then stop. No icing.",
      clips: [
        { label: "Move tool [[G]]", start: 733 },
        { label: "Edit mode (peek only — next lesson)", start: 942 },
      ],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  3: {
    slow: {
      videoId: "34FBeC9mktE",
      videoNote:
        "Official Object and Edit Mode first (3 min), then Grant's low-poly animal for [[Tab]] [[E]] [[Ctrl+R]]. Watch Grant at 0.75×. Pause before every key. Skip the stag — steal the keys.",
      clips: [
        { label: "Object and Edit Mode (official)", start: 0, videoId: "34FBeC9mktE" },
        { label: "Grant: edit mode, vertices, faces", start: 0, videoId: "F_JK9eaYYTQ" },
        { label: "Grant: extrude [[E]] (body of the stag — keys only)", start: 0, videoId: "F_JK9eaYYTQ" },
      ],
      stepClips: [0, 1, 1, 1, 2],
    },
    fast: {
      videoId: DONUT,
      videoNote: "Donut Part 1 — Edit mode at 1×. Copy [[Tab]] and face delete; ignore the mug.",
      clips: [
        { label: "Edit mode", start: 942 },
        { label: "Loop cut and inset (mug — steal the keys only)", start: 1363 },
      ],
      stepClips: [0, 0, 0, 0, 1],
    },
  },
  4: {
    slow: {
      videoId: GRANT5,
      videoNote:
        "Origins live on the 3D cursor and the orange dot. Grant's cursor clip, then official Select & Transform. Apply [[Ctrl+A]] from the written steps — there is no honest dedicated apply-transforms video in this pack.",
      clips: [
        { label: "Grant: 3D cursor (where things appear)", start: 341, videoId: GRANT5 },
        { label: "Select & Transform (official)", start: 0, videoId: "hTL6AKR8YDs" },
      ],
      stepClips: [1, 1, 1, 0, 1],
    },
    fast: {
      videoId: "hTL6AKR8YDs",
      videoNote: "Official Select & Transform at 1×, then do [[Ctrl+A]] and Set Origin from the steps. Do not skip apply.",
      clips: [{ label: "Select & Transform", start: 0, videoId: "hTL6AKR8YDs" }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  5: {
    slow: {
      videoId: GRANT5,
      videoNote:
        "Grant types 90 and 3 at 0.75× — that is the habit. Scene units are in Official reading below; there is no separate units video.",
      clips: [{ label: "Grant: typed rotation and scale", start: 606, videoId: GRANT5 }],
      stepClips: [0, 0, 0, 0, 0],
    },
    fast: {
      videoId: GRANT5,
      videoNote: "Same typed-number clip at 1×. Then measure against ref_human — the N panel is the lesson.",
      clips: [{ label: "Typed numbers", start: 606 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  6: {
    slow: {
      videoId: GRANT5,
      videoNote:
        "No new modelling. The crate is already made. Grant's 3D cursor clip if the origin is wrong, then inspect the .blend from the steps.",
      clips: [
        { label: "Grant: 3D cursor (origin)", start: 341, videoId: GRANT5 },
        { label: "Select & Transform (official)", start: 0, videoId: "hTL6AKR8YDs" },
      ],
      stepClips: [1, 1, 0, 1, 1],
    },
    fast: {
      videoId: "",
      videoNote: "No video. Open yesterday's .blend. If you skipped Make a crate, go there first — this lesson will not teach modelling.",
      clips: [],
    },
  },
  7: {
    slow: {
      videoId: CFX1,
      videoNote:
        "Official Cfx/ook_3D Part 1 at 0.75× — Blender, Sollumz, CodeWalker. Then Holloware's install if a Preferences click is unclear. Convert/export is the next clip; skip rooms.",
      clips: [
        { label: "Cfx Part 1: tooling (official)", start: 0, videoId: CFX1 },
        { label: "Installing Sollumz (click-by-click)", start: 0, videoId: "zv3NdateGqs" },
        { label: "Convert / export (Desertos — skip rooms)", start: 0, videoId: MLO },
      ],
      stepClips: [1, 2, 2, 2, 2],
    },
    fast: {
      videoId: CFX3,
      videoNote: "Cfx Part 3 at 1× — drawable, shader, ytyp. Install from Part 1 if Sollumz is missing.",
      clips: [
        { label: "Cfx Part 3: create a drawable", start: 0, videoId: CFX3 },
        { label: "Convert / export (Desertos — skip rooms)", start: 0, videoId: MLO },
      ],
      stepClips: [0, 0, 0, 1, 1],
    },
  },
  8: {
    slow: {
      videoId: CFX5,
      videoNote:
        "Official Cfx/ook_3D Part 5 at 0.75× — world collision and embedded bounds. Primitive box on the crate, not the render mesh. Prop collision short is extra.",
      clips: [
        { label: "Cfx Part 5: collision (official)", start: 0, videoId: CFX5 },
        { label: "Simple prop collisions (Blender/Sollumz)", start: 0, videoId: "-24PBSYT74w" },
      ],
      stepClips: [0, 1, 1, 0, 0],
    },
    fast: {
      videoId: CFX5,
      videoNote: "Same official collision video at 1×. Box bound, wood material, re-export.",
      clips: [{ label: "Cfx Part 5: collision", start: 0, videoId: CFX5 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  9: {
    slow: {
      videoId: CFX4,
      videoNote:
        "Official Cfx/ook_3D Part 4 at 0.75× — ymap, extents, flags, manifest, this_is_a_map. RIB SOSAY is company for the folder copy.",
      clips: [
        { label: "Cfx Part 4: place and stream (official)", start: 0, videoId: CFX4 },
        { label: "CodeWalker: files into a map resource", start: 0, videoId: CW },
      ],
      stepClips: [0, 0, 1, 1, 1],
    },
    fast: {
      videoId: CFX4,
      videoNote: "Cfx Part 4 at 1×, then write the fxmanifest from the docs — do not copy a mystery manifest.",
      clips: [
        { label: "Cfx Part 4: map resource", start: 0, videoId: CFX4 },
        { label: "RIB SOSAY: MLO onto the server (Part 4)", start: 0, videoId: "E5JgRiQMneo" },
      ],
      stepClips: [0, 0, 1, 1, 1],
    },
  },
  10: {
    slow: {
      videoId: MLO,
      videoNote: "Desertos custom MLO at 0.75× — watch limbo and rooms twice before you touch anything. The full from-scratch job is the next class. Sollumz create-ytyp is the written twin.",
      clips: [{ label: "Custom MLO interior in Sollumz", start: 0 }],
      stepClips: [0, 0, 0, 0, 0],
    },
    fast: {
      videoId: "fgCK5FRsZMM",
      videoNote: "Older Sollumz UI — menus moved. Use it for rooms/portals shape, then match current panels.",
      clips: [{ label: "MLO with lights (older UI)", start: 0 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  11: {
    slow: {
      videoId: MLO,
      videoNote: "Same Sollumz MLO video. Portal section — 0.75×, stand in the doorway after. Room → Limbo, then Flip Direction if the arrow lies.",
      clips: [{ label: "Sollumz MLO (portals in this video)", start: 0 }],
      stepClips: [0, 0, 0, 0, 0],
    },
    fast: {
      videoId: "fgCK5FRsZMM",
      videoNote: "Older UI. Steal portal from/to and flip; then do it in current Sollumz.",
      clips: [{ label: "Portals (older tutorial)", start: 0 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  12: {
    slow: {
      videoId: "hBH1vZY8rWc",
      videoNote: "Vertex painting — Sollumz FAQ video. Starts at 0.75×. Green inside, low values, not 255.",
      clips: [
        { label: "Vertex colour", start: 0, videoId: "hBH1vZY8rWc" },
        { label: "Lights in an MLO (older UI, 55:42)", start: 3342, videoId: "fgCK5FRsZMM" },
      ],
      stepClips: [0, 0, 0, 1, 1],
    },
    fast: {
      videoId: "hBH1vZY8rWc",
      videoNote: "Vertex paint at 1×, then the lights clip. Judge in-game, not in Blender.",
      clips: [
        { label: "Vertex colour", start: 0, videoId: "hBH1vZY8rWc" },
        { label: "Adding lights", start: 3342, videoId: "fgCK5FRsZMM" },
      ],
      stepClips: [0, 0, 0, 1, 1],
    },
  },
  13: {
    slow: {
      videoId: CFX3,
      videoNote:
        "Official Cfx/ook_3D Part 3 at 0.75× — drawable, shader, vertex colour. Then block a two-storey shell from boxes. Grant is extra for silhouette habits.",
      clips: [
        { label: "Cfx Part 3: assets in Blender (official)", start: 0, videoId: CFX3 },
        { label: "Grant: blocking from a cube (steal silhouette habits)", start: 0, videoId: "F_JK9eaYYTQ" },
      ],
      stepClips: [1, 1, 0, 0, 0],
    },
    fast: {
      videoId: CFX3,
      videoNote: "Cfx Part 3 at 1×, then cut holes with donut keys if you need [[Ctrl+R]]. No drainpipes.",
      clips: [
        { label: "Cfx Part 3: create the drawable", start: 0, videoId: CFX3 },
        { label: "Loop cut / inset (donut — keys only)", start: 1363, videoId: DONUT },
      ],
      stepClips: [0, 1, 0, 0, 0],
    },
  },
  14: {
    slow: {
      videoId: CFX5,
      videoNote:
        "Official collision video — the hole in the world ybn. 0.75×. Then Desertos doorway if you need to see a portal meet the street. Millimetre gap, walk street-to-room.",
      clips: [
        { label: "Cfx Part 5: world collision hole", start: 0, videoId: CFX5 },
        { label: "Desertos: doorway / portal (skip modelling)", start: 0, videoId: MLO },
      ],
      stepClips: [1, 0, 0, 1, 1],
    },
    fast: {
      videoId: CFX5,
      videoNote: "Part 5 at 1×. Align openings, millimetre gap, walk street-to-room.",
      clips: [{ label: "Cfx Part 5: collision / doorway", start: 0, videoId: CFX5 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  15: {
    slow: {
      videoId: CFX6,
      videoNote:
        "Official Cfx/ook_3D Part 6 at 0.75× — HD and LOD drawables, two ymaps, parent filename, ParentIndex 0, NumChildren 1, Manifest Generator. Pause and copy every field.",
      clips: [{ label: "Cfx Part 6: LODs (official)", start: 0, videoId: CFX6 }],
      stepClips: [0, 0, 0, 0, 0],
    },
    fast: {
      videoId: CFX6,
      videoNote: "Same official LOD video at 1×, then drive away from the building and watch the swap.",
      clips: [{ label: "Cfx Part 6: LODs", start: 0, videoId: CFX6 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  16: {
    slow: {
      videoId: CFX2,
      videoNote: "Official Cfx/ook_3D Part 2 at 0.75× — CodeWalker camera, select, export. Save nothing today. WASD, Shift to go faster.",
      clips: [
        { label: "Cfx Part 2: explore and export (official)", start: 0, videoId: CFX2 },
        { label: "RIB SOSAY: CodeWalker world view", start: 0, videoId: CW },
      ],
      stepClips: [0, 0, 1, 1, 0],
    },
    fast: {
      videoId: CFX2,
      videoNote: "Part 2 at 1.25× if you already know WASD. Still save nothing this lesson.",
      clips: [{ label: "Cfx Part 2: CodeWalker", start: 0, videoId: CFX2 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  17: {
    slow: {
      videoId: CFX4,
      videoNote:
        "Official Cfx/ook_3D Part 4 — this time you save a {{.ymap}}. 0.75×. New YMAP, Calculate Extents and Flags, Manifest Generator.",
      clips: [
        { label: "Cfx Part 4: ymap and resource (official)", start: 0, videoId: CFX4 },
        { label: "RIB SOSAY: place and save", start: 0, videoId: CW },
      ],
      stepClips: [0, 1, 1, 0, 0],
    },
    fast: {
      videoId: CFX4,
      videoNote: "Part 4 at 1×. New ymap, fence a yard, extents + flags, stream, walk it.",
      clips: [{ label: "Cfx Part 4: place and save", start: 0, videoId: CFX4 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  18: {
    slow: {
      videoId: CFX4,
      videoNote:
        "Part 4 again for the resource tree. Official reading is Cfx resources + CodeWalker project files. The fifteen-minute rebuild is still the teacher.",
      clips: [{ label: "Cfx Part 4: map resource layout", start: 0, videoId: CFX4 }],
      stepClips: [0, 0, 0, 0, 0],
    },
    fast: {
      videoId: CFX1,
      videoNote: "Part 1 workspace, then zip it and prove the rebuild. Fast does not skip the README.",
      clips: [{ label: "Cfx Part 1: tooling / folders", start: 0, videoId: CFX1 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  19: {
    slow: {
      videoId: "F_JK9eaYYTQ",
      videoNote:
        "Grant's cube-to-shape at 0.75× for [[Shift+A]] [[S]] [[E]], then the official bevel short. Pause after every key. You are making a 1 m crate, not a stag.",
      clips: [
        { label: "Grant: typed scale (make it 1 m)", start: 606, videoId: GRANT5 },
        { label: "Grant: cube → shape (steal the keys, skip the stag)", start: 0, videoId: "F_JK9eaYYTQ" },
        { label: "Bevel tool (official)", start: 0, videoId: "JSvGts95S7A" },
      ],
      stepClips: [0, 1, 1, 2, 1],
    },
    fast: {
      videoId: DONUT,
      videoNote:
        "Donut 5.0 Part 1 at 1× — add, grab, shade. Then you still block a crate, not icing. Official bevel if the donut skips [[Ctrl+B]].",
      clips: [
        { label: "Adding objects", start: 362 },
        { label: "Move [[G]]", start: 733 },
        { label: "Edit mode", start: 942 },
        { label: "Bevel (official)", start: 0, videoId: "JSvGts95S7A" },
      ],
      stepClips: [0, 0, 1, 3, 0],
    },
  },
  20: {
    slow: {
      videoId: "F_JK9eaYYTQ",
      videoNote:
        "Same Grant animal at 0.75× — steal [[Ctrl+R]] and [[E]] for planks and the lip. Skip the creature. Official loop-cut page is in reading.",
      clips: [{ label: "Grant: [[E]] and loop cuts on a cube", start: 0, videoId: "F_JK9eaYYTQ" }],
      stepClips: [0, 0, 0, 0, 0],
    },
    fast: {
      videoId: DONUT,
      videoNote: "Donut Part 1 — loop cut and inset on the mug at 1×. Steal [[Ctrl+R]] [[I]] [[E]], then do them on the crate. No icing.",
      clips: [
        { label: "Edit mode", start: 942 },
        { label: "Loop cut / inset (mug — keys only)", start: 1363 },
      ],
      stepClips: [0, 1, 1, 0, 0],
    },
  },
  21: {
    slow: {
      videoId: GRANT5,
      videoNote:
        "Origins and the 3D cursor. Starts at 0.75×, then [[Ctrl+A]], merge, collection, save. The donut save chapter is Fast-only.",
      clips: [
        { label: "Grant: 3D cursor", start: 341, videoId: GRANT5 },
        { label: "Select & Transform (official)", start: 0, videoId: "hTL6AKR8YDs" },
      ],
      stepClips: [1, 1, 1, 0, 1],
    },
    fast: {
      videoId: DONUT,
      videoNote: "Donut Part 1 save at 27:11, then Grant's cursor if origin is wrong. Apply and name from the steps.",
      clips: [
        { label: "Donut Part 1: save the file", start: 1631, videoId: DONUT },
        { label: "Grant: 3D cursor", start: 341, videoId: GRANT5 },
      ],
      stepClips: [1, 1, 1, 1, 0],
    },
  },
  22: {
    slow: {
      videoId: "",
      videoNote: "No video. The pallet is the teacher. One 30-second peek at yesterday's steps if you are stuck, then close them.",
      clips: [],
    },
    fast: {
      videoId: "",
      videoNote: "No video on Fast either. The donut is finished; you make a second box without it.",
      clips: [],
    },
  },
  23: {
    slow: {
      videoId: "zv3NdateGqs",
      videoNote:
        "You already did this on the crate. Sollumz install if needed, then convert/export for the pallet. 0.75×. Skip rooms.",
      clips: [
        { label: "Installing Sollumz", start: 0, videoId: "zv3NdateGqs" },
        { label: "Convert / export (skip rooms)", start: 0, videoId: MLO },
      ],
      stepClips: [1, 1, 1, 1, 1],
    },
    fast: {
      videoId: MLO,
      videoNote: "Same convert/export at 1×. Unique archetype name. Then stand on it in-game.",
      clips: [{ label: "Drawable / export (Sollumz)", start: 0, videoId: MLO }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  24: {
    slow: {
      videoId: "",
      videoNote: "No video. Walk the doorway at midnight and noon. Official reading if walls glow or the portal lies.",
      clips: [],
    },
    fast: {
      videoId: "",
      videoNote: "No video. The doorway is the teacher. Two screenshots into notes.",
      clips: [],
    },
  },
  25: {
    slow: {
      videoId: "",
      videoNote: "No video. One peek at lesson 13's steps if you are lost, then close them. Cfx Part 3 is scale, not a shed tutorial.",
      clips: [],
    },
    fast: {
      videoId: "",
      videoNote: "No video. Boxes, 4 by 3 m, door 2.1 by 0.9 m. Then stop.",
      clips: [],
    },
  },
  26: {
    slow: {
      videoId: CFX4,
      videoNote:
        "Official Part 4 plus the compound video — this time the archetype name is yours. 0.75×. Extents, flags, walk the yard.",
      clips: [
        { label: "Cfx Part 4: place and save (official)", start: 0, videoId: CFX4 },
        { label: "RIB SOSAY: CodeWalker place", start: 0, videoId: CW },
      ],
      stepClips: [1, 1, 0, 0, 0],
    },
    fast: {
      videoId: CFX4,
      videoNote: "Part 4 at 1×. Sit your crate on the ground. If it is invisible, _manifest.ymf and the ytyp — not a new fence.",
      clips: [{ label: "Cfx Part 4: place and save", start: 0, videoId: CFX4 }],
      stepClips: [0, 0, 0, 0, 0],
    },
  },
  27: {
    slow: {
      videoId: CFX2,
      videoNote:
        "Official Cfx/ook_3D Part 2 at 0.75× — export XML, textures, import. Then RoyalT on an MLO site. Pause after every export. Tiny unused building, not MRPD.",
      clips: [
        { label: "Cfx Part 2: export and import (official)", start: 0, videoId: CFX2 },
        { label: "RoyalT: exporting XMLs from CodeWalker", start: 0, videoId: "K_Kk4n_-Z8s" },
        { label: "RoyalT: from-scratch intro (what this class is)", start: 0, videoId: "9jPKQLiXSuA" },
      ],
      stepClips: [0, 1, 1, 0, 2],
    },
    fast: {
      videoId: "K_Kk4n_-Z8s",
      videoNote: "RoyalT export at 1×. Same job as Cfx Part 2. Still a small unused building — not a PD conversion.",
      clips: [
        { label: "RoyalT: export XMLs", start: 0, videoId: "K_Kk4n_-Z8s" },
        { label: "Cfx Part 2 (if a menu moved)", start: 0, videoId: CFX2 },
      ],
      stepClips: [0, 0, 0, 1, 0],
    },
  },
  28: {
    slow: {
      videoId: MLO,
      videoNote:
        "Desertos — custom MLO in Blender at 0.75×. He names every key. Pause and copy onto YOUR site. Skip Discord. You are modelling new walls, not converting a GTA interior.",
      clips: [
        { label: "Desertos: custom interior from scratch", start: 0, videoId: MLO },
        { label: "RoyalT: model, export, test", start: 0, videoId: "s91lzkS8rKY" },
      ],
      stepClips: [0, 0, 0, 0, 0],
    },
    fast: {
      videoId: "s91lzkS8rKY",
      videoNote: "RoyalT model/export at 1×. Steal the pipeline; still make your own shell. Desertos is there if you need a key named.",
      clips: [
        { label: "RoyalT: model and test interior", start: 0, videoId: "s91lzkS8rKY" },
        { label: "Desertos (keys, if you stall)", start: 0, videoId: MLO },
      ],
      stepClips: [0, 0, 0, 0, 1],
    },
  },
  29: {
    slow: {
      videoId: MLO,
      videoNote:
        "Same Desertos video — skip modelling, stay on collision, room IDs, ytyp, portals, stream. 0.75×. create-ytyp is the written twin.",
      clips: [
        { label: "Desertos: collision, ytyp, portals, stream", start: 0, videoId: MLO },
        { label: "RoyalT: export and test interior", start: 0, videoId: "s91lzkS8rKY" },
      ],
      stepClips: [0, 0, 0, 0, 1],
    },
    fast: {
      videoId: "s91lzkS8rKY",
      videoNote: "RoyalT test-interior at 1×, then Desertos only if a portal step is missing. Room → Limbo.",
      clips: [
        { label: "RoyalT: test interior", start: 0, videoId: "s91lzkS8rKY" },
        { label: "Older Sollumz UI (portals/lights)", start: 0, videoId: "fgCK5FRsZMM" },
      ],
      stepClips: [0, 0, 1, 1, 0],
    },
  },
  30: {
    slow: {
      videoId: CFX5,
      videoNote:
        "Official Part 5 first — hole the world ybn. Then RoyalT fill-ground and remove-props/occlusions. Same files as an MRPD replacement, tiny site. 0.75×.",
      clips: [
        { label: "Cfx Part 5: world collision (official)", start: 0, videoId: CFX5 },
        { label: "RoyalT: fill ground and collision", start: 0, videoId: "na_62B-OxGs" },
        { label: "RoyalT: remove props, occlusions, YMF", start: 0, videoId: "gG_8NeiXKRE" },
      ],
      stepClips: [0, 1, 2, 0, 2],
    },
    fast: {
      videoId: "gG_8NeiXKRE",
      videoNote: "RoyalT removal at 1× after you have cut the ybn hole (Part 5). Walk street-to-room before you call it done.",
      clips: [
        { label: "Cfx Part 5: collision hole", start: 0, videoId: CFX5 },
        { label: "RoyalT: remove props and occlusions", start: 0, videoId: "gG_8NeiXKRE" },
      ],
      stepClips: [0, 1, 1, 0, 1],
    },
  },
  31: {
    slow: {
      videoId: YMAP_EDIT,
      videoNote:
        "Tobii at 0.75× — creating and modifying ymaps. Pause after Add to Project. Save under the vanilla filename. Cfx Part 4 is the stream folder.",
      clips: [
        { label: "Tobii: create and modify ymaps", start: 0, videoId: YMAP_EDIT },
        { label: "Cfx Part 4: stream a ymap (official)", start: 0, videoId: CFX4 },
      ],
      stepClips: [0, 0, 0, 0, 1, 1],
    },
    fast: {
      videoId: YMAP_EDIT,
      videoNote: "Tobii at 1×. Move one outdoor gate. Original ymap name. Old spot empty in-game.",
      clips: [
        { label: "Tobii: modify ymaps", start: 0, videoId: YMAP_EDIT },
        { label: "Cfx Part 4: stream", start: 0, videoId: CFX4 },
      ],
      stepClips: [0, 0, 0, 0, 1, 1],
    },
  },
  32: {
    slow: {
      videoId: "gG_8NeiXKRE",
      videoNote:
        "RoyalT remove-props at 0.75×, then clearing-land only for the outdoor deletions. He is prepping an MLO — you stop before rooms. Outdoor lot, not a building.",
      clips: [
        { label: "RoyalT: remove props", start: 0, videoId: "gG_8NeiXKRE" },
        { label: "RoyalT: clearing land (stop before the interior)", start: 0, videoId: "uPHig3V-cqo" },
        { label: "Tobii: modifying ymaps", start: 0, videoId: YMAP_EDIT },
      ],
      stepClips: [2, 0, 0, 0, 1, 2],
    },
    fast: {
      videoId: "gG_8NeiXKRE",
      videoNote: "RoyalT remove-props at 1×. Same job on a car park. Do not follow him into an interior.",
      clips: [
        { label: "RoyalT: remove props", start: 0, videoId: "gG_8NeiXKRE" },
        { label: "Tobii: modify ymaps", start: 0, videoId: YMAP_EDIT },
      ],
      stepClips: [1, 0, 0, 0, 1, 1],
    },
  },
  33: {
    slow: {
      videoId: GATE_YMAP,
      videoNote:
        "Twisle at 0.75× — he places a gate on a house; you place one on a drive-through. Pause and copy onto YOUR lot. Then Cfx Part 4 for extents, flags, manifest.",
      clips: [
        { label: "Twisle: custom ymap (he places a gate)", start: 0, videoId: GATE_YMAP },
        { label: "Cfx Part 4: new ymap and resource (official)", start: 0, videoId: CFX4 },
        { label: "RIB SOSAY: add a prop", start: 0, videoId: CW },
      ],
      stepClips: [1, 2, 0, 2, 1, 1],
    },
    fast: {
      videoId: GATE_YMAP,
      videoNote: "Twisle at 1× for the gate. Your lot, not his house. Extents, flags, drive in.",
      clips: [
        { label: "Twisle: place a gate", start: 0, videoId: GATE_YMAP },
        { label: "Cfx Part 4: ymap resource", start: 0, videoId: CFX4 },
      ],
      stepClips: [1, 1, 0, 0, 1, 1],
    },
  },
  34: {
    slow: {
      videoId: "",
      videoNote: "No video. Drive in, park, walk the fence. One peek at lesson 33's steps if you are stuck, then close them.",
      clips: [],
    },
    fast: {
      videoId: "",
      videoNote: "No video on Fast either. The compound is finished when you can use it without Twisle.",
      clips: [],
    },
  },
  35: {
    slow: {
      videoId: CFX2,
      videoNote:
        "Official Cfx/ook_3D Part 2 at 0.75× — export XML, textures, import. Do it twice, once per neighbouring building. Pause after every file. Not interiors.",
      clips: [
        { label: "Cfx Part 2: export and import (official)", start: 0, videoId: CFX2 },
        { label: "RoyalT: export XMLs from CodeWalker", start: 0, videoId: "K_Kk4n_-Z8s" },
      ],
      stepClips: [0, 0, 0, 1, 0],
    },
    fast: {
      videoId: "K_Kk4n_-Z8s",
      videoNote: "RoyalT export at 1×. Same job twice. Two small neighbouring shells, one .blend, do not Join yet.",
      clips: [
        { label: "RoyalT: export XMLs", start: 0, videoId: "K_Kk4n_-Z8s" },
        { label: "Cfx Part 2 (if a menu moved)", start: 0, videoId: CFX2 },
      ],
      stepClips: [0, 0, 0, 1, 0],
    },
  },
  36: {
    slow: {
      videoId: CFX3,
      videoNote:
        "Official Part 3 at 0.75× — Convert to Drawable. Then Grant only for blocking the connecting box. Do not Boolean the vanilla meshes.",
      clips: [
        { label: "Cfx Part 3: drawable in Blender (official)", start: 0, videoId: CFX3 },
        { label: "Grant: blocking from a cube (connecting piece)", start: 0, videoId: "F_JK9eaYYTQ" },
      ],
      stepClips: [1, 1, 0, 0, 0, 0],
    },
    fast: {
      videoId: CFX3,
      videoNote: "Part 3 at 1×. Convert both shells plus the gap box to one drawable. Origin at the combined base.",
      clips: [{ label: "Cfx Part 3: convert to drawable", start: 0, videoId: CFX3 }],
      stepClips: [0, 0, 0, 0, 0, 0],
    },
  },
  37: {
    slow: {
      videoId: CFX4,
      videoNote:
        "Official Part 4 at 0.75× — new entity, extents, flags, stream. Tobii for deleting the two vanilla shells. Part 5 only if an invisible wall remains.",
      clips: [
        { label: "Cfx Part 4: place and stream (official)", start: 0, videoId: CFX4 },
        { label: "Tobii: modifying ymaps", start: 0, videoId: YMAP_EDIT },
        { label: "Cfx Part 5: world collision (if you hit a ghost wall)", start: 0, videoId: CFX5 },
      ],
      stepClips: [0, 1, 0, 0, 1, 2],
    },
    fast: {
      videoId: CFX4,
      videoNote: "Part 4 at 1×. Two vanilla entities out, one archetype in. Walk the perimeter.",
      clips: [
        { label: "Cfx Part 4: place and stream", start: 0, videoId: CFX4 },
        { label: "Tobii: delete vanilla entities", start: 0, videoId: YMAP_EDIT },
      ],
      stepClips: [0, 1, 0, 0, 1, 1],
    },
  },
  38: {
    slow: {
      videoId: "",
      videoNote: "No video. Walk the old gap and the perimeter. One peek at lessons 36–37 if you are stuck, then close them.",
      clips: [],
    },
    fast: {
      videoId: "",
      videoNote: "No video on Fast either. Two buildings are one when you can walk them without Part 3.",
      clips: [],
    },
  },
  39: {
    slow: {
      videoId: CFX8,
      videoNote:
        "Official Cfx/ook_3D Part 8 at 0.75× — doors and sliding gates. Origin at the bottom corner. Sliding Door (8). Part 7 is extra looping animation, not the gate itself.",
      clips: [
        { label: "Cfx Part 8: doors and sliding gates (official)", start: 0, videoId: CFX8 },
        { label: "Cfx Part 7: map animation (extra)", start: 0, videoId: CFX7 },
      ],
      stepClips: [0, 0, 0, 0, 0, 1],
    },
    fast: {
      videoId: CFX8,
      videoNote: "Part 8 at 1×. Bottom-corner origin, Sliding Door (8), Dynamic + Enable Door Physics. No lock script.",
      clips: [
        { label: "Cfx Part 8: sliding gates", start: 0, videoId: CFX8 },
        { label: "Cfx Part 7: map animation (extra)", start: 0, videoId: CFX7 },
      ],
      stepClips: [0, 0, 0, 0, 0, 1],
    },
  },
};

export const packFor = (lesson: Lesson, pace: Pace): PacePack => PACKS[lesson.id]?.[pace] ?? fallback(lesson);
