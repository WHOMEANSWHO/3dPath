// 3dPath catalogue: Topic -> Class -> Lesson.
// Inline marks inside strings: [[G]] renders a keyboard stamp, {{.ydr}} a file stamp.
// Pace-specific videos live in pace.ts. Official reading lives in reading.ts.
// Paste-a-link still overrides. Clip.videoId switches the player when a clip
// uses a different video than the pack default.

import { EXTRA_LESSONS } from "./lessonsExtra";

export type TopicId = "blender" | "props" | "interiors" | "buildings" | "codewalker" | "areas";

export interface Clip {
  label: string;
  start: number; // seconds into that clip's video
  videoId?: string; // if set, this clip loads its own video
}

export interface Tip {
  text: string;
  source: string;
  url: string;
}

export interface Lesson {
  id: number;
  classId: string;
  kind?: "skill" | "project"; // project = make a finished thing, like the donut
  title: string;
  doneWhen: string;
  intro: string;
  dont: string;
  steps: string[];
  clips: Clip[];
  videoId: string; // empty = show the link field
  videoNote: string;
  tips: Tip[];
  checklist: string[];
  /**
   * Order inside the class (and the path). Defaults to id × 10 so a new
   * lesson can sit before a video-off gate without renumbering old ids.
   */
  sort?: number;
}

export interface CourseClass {
  id: string;
  topic: TopicId;
  name: string;
  blurb: string;
}

export interface Topic {
  id: TopicId;
  n: number;
  name: string;
  blurb: string;
  stamp: string;
  /** Extra landing page (Areas). Topic cards and crumbs use this when set. */
  hub?: string;
}

export const TOPICS: Topic[] = [
  { id: "blender", n: 1, name: "Blender", blurb: "The tool everything else depends on. Drills first, then you make a crate the way the donut teaches a donut.", stamp: ".blend" },
  { id: "props", n: 2, name: "Props for FiveM", blurb: "That crate, taken properly from a .blend to a street in San Andreas — then a second prop to prove it stuck.", stamp: ".ydr" },
  { id: "interiors", n: 3, name: "Interiors (MLOs)", blurb: "Rooms the engine believes in. Drills first, then a full interior from scratch — and you drop it where a vanilla building was, like an MRPD replacement. Your mesh, not a converted GTA interior.", stamp: ".ytyp" },
  { id: "buildings", n: 4, name: "Full buildings", blurb: "A shell that reads from across the road, a shed without a tutorial, then two neighbouring vanilla buildings made into one.", stamp: ".ydd" },
  { id: "codewalker", n: 5, name: "CodeWalker & world edit", blurb: "The viewer, a new ymap, then your crate in that yard. Moving gates and editing open ground is Compounds & areas.", stamp: ".ymap" },
  { id: "areas", n: 6, name: "Compounds & areas", blurb: "Yards, car parks, gates and fences — editing land that is not a building. No MLO. No shell you walk inside.", stamp: ".ymap", hub: "/areas" },
];

export const CLASSES: CourseClass[] = [
  { id: "blender-interface", topic: "blender", name: "Blender interface", blurb: "Move around, move things, add and duplicate, then turn a cube into a room — the first made thing." },
  { id: "blender-habits", topic: "blender", name: "Modelling habits", blurb: "Clean meshes, real scale, face orientation and grid snap, so the crate project does not lie to you." },
  { id: "blender-make", topic: "blender", name: "Make a crate", blurb: "The donut, for mapping. Follow along, then make it again with the video off. Every later class uses these keys." },
  { id: "props-first", topic: "props", name: "Your first prop", blurb: "That crate, exported, solid, spawned — then you fix the invisible one, paint it for outdoors, and a pallet to prove it stuck." },
  { id: "mlo-fundamentals", topic: "interiors", name: "MLO fundamentals", blurb: "Limbo, rooms, portals, a second room, then Make an MLO is the full job." },
  { id: "mlo-make", topic: "interiors", name: "Make an MLO", blurb: "The donut, for interiors. Model your own rooms from scratch, furnish them, replace a small vanilla building, then walk it with the video off." },
  { id: "building-shell", topic: "buildings", name: "Building shells", blurb: "Silhouette, doorway, collision, LODs — official Cfx video, then a shed from boxes with no tutorial. Two neighbouring shells into one is the next class." },
  { id: "building-join", topic: "buildings", name: "Two into one", blurb: "Two neighbouring vanilla shells, one drawable, both old buildings gone in-game. The seam and both collision holes are part of the job." },
  { id: "world-edit", topic: "codewalker", name: "World edit basics", blurb: "The viewer, gizmos, a new ymap, extents and the manifest, then your crate in that yard. Gates and car parks are the Areas class." },
  { id: "area-edit", topic: "areas", name: "Gates, compounds, open ground", blurb: "Move a vanilla gate, clear a lot, fence a compound, dress it, then a sliding gate the engine opens — not a building." },
];

const CORE_LESSONS: Lesson[] = [
  // ── Blender interface ────────────────────────────────────────────────
  {
    id: 1,
    classId: "blender-interface",
    title: "Orbit, pan and zoom",
    doneWhen: "You can circle the default cube, frame it, and never lose it — without thinking.",
    intro:
      "Everything later sits on top of the camera. Today you only fly it. Slow is fine; hesitation is what we are removing.",
    dont: "Do not touch the modelling tools today. If the camera is not second nature, every later lesson costs double.",
    steps: [
      "Hold the middle mouse button and drag to orbit around the cube. Do not click the cube first — just drag in empty viewport.",
      "Hold [[Shift]] and the middle mouse button together, then drag to pan (slide the view sideways).",
      "Roll the mouse wheel to zoom. Scroll up = closer, down = further. If you have no wheel, hold [[Ctrl]] and middle-drag.",
      "Select the cube with left-click, then press [[Numpad .]] (period on the number pad) to frame it. Laptop: [[Numpad .]] is often [[Fn]] plus a key, or turn on Emulate Numpad in Preferences.",
      "Press [[Home]] to frame the whole scene. [[Numpad 1]] front, [[Numpad 3]] side, [[Numpad 7]] top, [[Numpad 5]] perspective on/off.",
      "Get lost on purpose: zoom into nothing, spin away, then recover with [[Numpad .]]. Ten times. That is the lesson.",
    ],
    clips: [
      { label: "Navigation: orbit, pan, zoom", start: 127 },
      { label: "The move tool and [[G]]", start: 374 },
    ],
    videoId: "",
    videoNote: "Grant Abbitt's beginner Blender series — the slow one. Starts at 0.75×.",
    tips: [
      {
        text: "If orbiting spins round the wrong point, press [[Numpad .]] on your selection first. Blender orbits the view centre, not the object.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/editors/3dview/navigate/navigation.html",
      },
      {
        text: "On a trackpad or two-button mouse, turn on Emulate 3 Button Mouse in Preferences. [[Alt]] plus drag then orbits.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/editors/preferences/input.html",
      },
      {
        text: "Set Zoom To Mouse Position in Preferences. The viewport stops drifting away from what you are looking at.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/editors/preferences/navigation.html",
      },
    ],
    checklist: [
      "Orbited, panned and zoomed without looking up the keys",
      "Framed the cube with Numpad . five times",
      "Got lost and recovered, ten times",
      "Preferences saved (mouse emulation if needed)",
    ],
  },
  {
    id: 2,
    classId: "blender-interface",
    title: "Move, rotate and scale",
    doneWhen: "Three cubes: one moved exactly 2 m, one turned exactly 45 degrees, one at exactly half size — typed, not eyeballed.",
    intro:
      "Grab, rotate, scale. The trick a slow learner keeps forever: type the number. Dragging is for roughing in; numbers are for finishing.",
    dont: "Do not drag freehand when a number will do. Freehand is how furniture ends up 3 cm off the floor.",
    steps: [
      "Press [[G]] (grab/move). Then tap [[X]], [[Y]] or [[Z]] to lock that axis. Type [[2]] and press [[Enter]] — moved exactly 2 metres. [[Esc]] before Enter cancels.",
      "Press [[R]] (rotate), then [[Z]] for turntable spin, type [[45]], [[Enter]].",
      "Press [[S]] (scale), type [[0.5]], [[Enter]]. Half size on all axes. [[S]] then [[Z]] then [[2]] stretches height only.",
      "Hold [[Shift]] while typing a number for smaller increments when dragging. Prefer typed values over dragging.",
      "Open the sidebar with [[N]]. Location / Rotation / Scale there is the truth. The viewport is only a picture of those numbers.",
    ],
    clips: [
      { label: "Grab, axis locks, typed values", start: 374 },
      { label: "Rotate and scale", start: 566 },
    ],
    videoId: "",
    videoNote: "Same series as lesson 1. Repeat the transform section rather than pushing on.",
    tips: [
      {
        text: "Press the axis key twice ([[G]] [[X]] [[X]]) to move along the object's own axis instead of the world's.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/transform/basics.html",
      },
      {
        text: "Scale in object mode is a multiplier, not a size. Anything that leaves Blender should end at scale 1,1,1 — see the clean-mesh lesson.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
      },
      {
        text: "Raise undo steps to 100 or more in Preferences before you need them.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/editors/preferences/system.html",
      },
    ],
    checklist: [
      "Moved a cube exactly 2 m along one axis",
      "Rotated exactly 45 degrees by typing it",
      "Scaled to exactly half size by typing it",
      "Checked all three in the N panel",
      "Cancelled a transform with Esc without side effects",
    ],
  },
  {
    id: 3,
    classId: "blender-interface",
    kind: "project",
    title: "Edit mode: the first room",
    doneWhen: "A 4 by 4 metre room — floor, three walls, one open side — built from a single cube with no tutorial open.",
    intro:
      "Object mode arranges things; edit mode changes their shape. One cube becomes a room. That jump is the whole lesson.",
    dont: "Do not model furniture, skirting or window frames. A room is six planes and an opening. Anything more is procrastination in disguise.",
    steps: [
      "Select the cube and press [[Tab]] to enter edit mode.",
      "Press [[1]], [[2]], [[3]] to switch between vertex, edge and face select. Live in face mode today.",
      "Scale the cube to 4 m by 4 m by 2.8 m using [[S]] with typed values (check the N panel in object mode).",
      "Select the top face and delete it, then one side face for the open wall: [[X]] then Faces.",
      "Add thickness later; for now a shell is honest. Use [[Ctrl+R]] to cut one loop and move it, just to feel the tool.",
    ],
    clips: [
      { label: "Edit mode and selection modes", start: 812 },
      { label: "Extrude and loop cut", start: 1104 },
    ],
    videoId: "",
    videoNote: "Pause before every action. Do the step, then resume. Never watch ahead of your hands.",
    tips: [
      {
        text: "Model at real scale from the first minute. A GTA character is about 1.8 m tall; doors are about 2.1 m. Wrong scale is the number one beginner giveaway in-game.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
      {
        text: "Turn on Face Orientation in overlays: blue faces point out, red point in. Red walls will render invisible from inside the game.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/editors/3dview/display/overlays.html",
      },
      {
        text: "Stay flat-shaded on boxy geometry. Smooth shading hides bad normals until it is too late to care.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/shading.html",
      },
    ],
    checklist: [
      "Entered and left edit mode with Tab, on purpose",
      "Room is 4 x 4 x 2.8 m, checked in the N panel",
      "Top removed, one wall open",
      "All faces blue in Face Orientation",
      "Built a second room without the video",
    ],
  },

  // ── Modelling habits ─────────────────────────────────────────────────
  {
    id: 4,
    classId: "blender-habits",
    title: "Clean meshes and origins",
    doneWhen: "Your room from lesson 3 passes inspection: scale 1,1,1 applied, origin at bottom centre, no loose vertices, a real name.",
    intro:
      "Nothing here looks like progress and all of it is. A dirty mesh exports politely and then fails in-game, where the error messages are worse.",
    dont: "Never export anything with unapplied scale. Not once. Not to test.",
    steps: [
      "Select your object and apply transforms: [[Ctrl+A]], then All Transforms.",
      "In edit mode select all with [[A]], then [[M]] and Merge by Distance to kill doubled vertices.",
      "Recalculate normals outside with [[Shift+N]].",
      "Set the origin: Object menu, Set Origin, then snap it to the bottom centre (place the 3D cursor first if needed).",
      "Rename mesh and object properly. Cube.003 is not a name; room_shell_4m is.",
    ],
    clips: [{ label: "Apply transforms and origins", start: 245 }],
    videoId: "",
    videoNote: "Short lesson. Spend the saved time re-checking yesterday's room with today's rules. The crate is the next class.",
    tips: [
      {
        text: "Sollumz reads the object's transform on export. Unapplied scale means your prop lands the wrong size in-game and nobody tells you why.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
      },
      {
        text: "Origin at bottom centre makes props sit on the ground when placed. Origin in the middle buries them half-in, half-out.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
      {
        text: "Adopt one naming scheme now and keep it for life: thing_material_size. Your future self greps for these.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
    ],
    checklist: [
      "Ctrl+A applied — scale reads 1,1,1",
      "Merge by Distance run, removed count noted",
      "Normals recalculated, all blue",
      "Origin at bottom centre",
      "Object and mesh renamed properly",
    ],
  },
  {
    id: 5,
    classId: "blender-habits",
    kind: "project",
    title: "Real-world scale",
    doneWhen: "Doorway 2.1 by 0.9 m, ceiling 2.8 m — all checked against a 1.8 m reference figure, not your eyes.",
    intro:
      "The game has a fixed-size human in it. Everything you build is measured against that human, whether you meant it or not.",
    dont: "Do not trust your eyes for size. Eyes adapt; the N panel does not.",
    steps: [
      "Confirm the scene units are metric with unit scale 1.0.",
      "Add a reference block: 0.45 wide, 0.3 deep, 1.8 m tall. Name it ref_human and keep it in every scene.",
      "Measure your room's door against it. Resize the opening to 2.1 by 0.9 m with typed transforms.",
      "Set ceiling height between 2.6 and 3 m. Vanilla GTA interiors sit in this band.",
      "Walk the measure tool round the room and write the numbers into your notes below.",
    ],
    clips: [{ label: "Units and the measure tool", start: 90 }],
    videoId: "",
    videoNote: "Any short units video will do — the doing matters more than the watching here.",
    tips: [
      {
        text: "When in doubt, extract a vanilla prop or interior and measure it. Rockstar's sizes are the house style you are joining.",
        source: "Cfx Part 2",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
      },
      {
        text: "Stairs read wrong fastest: risers about 0.17 m, treads about 0.28 m. Get these right and everything else looks intentional.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
      {
        text: "Keep ref_human in the exported collection's exclusions — you only need it in Blender.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
      },
    ],
    checklist: [
      "Units metric, scale 1.0",
      "ref_human block made and saved",
      "Door resized to 2.1 x 0.9 m",
      "Ceiling within 2.6–3 m",
      "Measurements written into notes",
    ],
  },

  // ── Your first prop ──────────────────────────────────────────────────
  {
    id: 6,
    classId: "props-first",
    title: "The crate, ready for Sollumz",
    doneWhen: "Yesterday's 1 m crate is in its own collection, named with your prefix, origin at the bottom, and you would not be ashamed to export it.",
    intro:
      "Blender class already made the crate. Today you only inspect it. If it is wrong, fix it here — do not start a second mesh to avoid the first.",
    dont: "Do not model a new crate unless the old one is actually rubbish. Do not texture anything yet.",
    steps: [
      "Open the .blend from Make a crate. If you skipped that class, do those four lessons first — this one will not teach modelling.",
      "Check the N panel: size about 1 m, scale 1,1,1. Apply [[Ctrl+A]] All Transforms if it is not.",
      "Origin at bottom centre. Name object and mesh xn_crate_wood (your prefix, not xn_ if you picked another).",
      "Collection named after the prop. ref_human stays out of it.",
      "Save. The next lesson is Sollumz, not more modelling.",
    ],
    clips: [],
    videoId: "",
    videoNote: "No new modelling video. If the crate is not done, go back to Make a crate — Slow Grant / Fast donut live there.",
    tips: [
      {
        text: "Open a vanilla crate in CodeWalker's model viewer and count what Rockstar spent: your budget is similar, not bigger.",
        source: "CodeWalker (GitHub)",
        url: "https://github.com/dexyfex/CodeWalker",
      },
      {
        text: "Archetype names must be unique across the whole game. Prefix yours (xn_) or a vanilla prop may silently win.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
      {
        text: "One object, one drawable. Do not parent decorative extras yet — merged simple meshes export cleanest.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
      },
    ],
    checklist: [
      "Opened the Blender-class crate, not a new cube",
      "Scale 1,1,1, about 1 m",
      "Origin bottom centre",
      "Named with your prefix",
      "In its own collection",
    ],
  },
  {
    id: 7,
    classId: "props-first",
    title: "Export to .ydr with Sollumz",
    doneWhen: "A {{.ydr}} exists on disk, opens in CodeWalker's model viewer, and lives in a folder you can find again.",
    intro:
      "Sollumz is the bridge between Blender and the RAGE engine. Today you cross it once with the simplest possible cargo.",
    dont: "Do not fight materials today. One default GTA shader, embedded texture, done. Texturing is its own lesson later.",
    steps: [
      "Install the Sollumz add-on and enable it in Preferences.",
      "Select the crate and convert it to a Sollumz Drawable from the object menu.",
      "Give it one material using the default (basic) GTA shader. Assign any plain image as an embedded texture for now.",
      "Export as {{.ydr}} into your project's export folder.",
      "Open the file in CodeWalker's model viewer. If it looks right there, it will look right in-game.",
    ],
    clips: [
      { label: "Installing Sollumz", start: 65 },
      { label: "Convert to drawable and export", start: 342 },
    ],
    videoId: "",
    videoNote: "Use a current Sollumz tutorial — the add-on moves fast and old menus lie.",
    tips: [
      {
        text: "Embedded textures travel inside the {{.ydr}}; external ones need a matching {{.ytd}}. Start embedded — one file, fewer ways to fail.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
      },
      {
        text: "Check every export in CodeWalker before the game. The viewer loads in seconds; a server restart does not.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
      {
        text: "Keep exports out of your source folder. sources/ for .blend, exports/ for game files — mixing them ends in overwriting the wrong one.",
        source: "Cfx Part 1",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-1/",
      },
    ],
    checklist: [
      "Sollumz installed and enabled",
      "Crate converted to Drawable",
      "One shader, embedded texture",
      ".ydr exported to the right folder",
      "Opened and inspected in CodeWalker",
    ],
  },
  {
    id: 8,
    classId: "props-first",
    title: "Collision: the .ybn",
    doneWhen: "The crate's bound composite exists, hugs the mesh, uses a box bound, and re-exports clean.",
    intro:
      "Without collision your crate is a ghost. Collision is invisible work — which is exactly why doing it properly now becomes a habit.",
    dont: "Do not use the render mesh as collision. Collision wants the simplest shape that feels right, not the prettiest.",
    steps: [
      "Add a Bound Composite to the crate's drawable in Sollumz.",
      "Inside it create a Box bound and size it to hug the crate exactly.",
      "Set the collision material (wood) so bullets, feet and sound behave.",
      "Leave flags at sensible defaults for a static prop.",
      "Re-export the {{.ydr}} (embedded bounds) and re-check in CodeWalker with collision view on.",
    ],
    clips: [{ label: "Bounds in Sollumz", start: 188 }],
    videoId: "",
    videoNote: "Watch once through before doing — bounds are quick when you know the shape of the job.",
    tips: [
      {
        text: "Primitive bounds (box, cylinder, sphere) are cheaper and more reliable than mesh bounds. Reach for geometry bounds only when the shape truly demands it.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-collisions",
      },
      {
        text: "An oversized bound is an invisible wall. Players walk into nothing and blame your whole map.",
        source: "Cfx Part 5",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-5/",
      },
      {
        text: "Collision materials drive footstep sound and bullet decals — wood should sound like wood. Apply the General (default) flag preset on Bound GeometryBVH or the bound is a ghost.",
        source: "Sollumz FAQ",
        url: "https://docs.sollumz.org/support/faq",
      },
    ],
    checklist: [
      "Bound composite added",
      "Box bound hugs the mesh",
      "Wood collision material set",
      "Re-exported without errors",
      "Collision visible in CodeWalker",
    ],
  },
  {
    id: 9,
    classId: "props-first",
    kind: "project",
    title: "Spawn it in-game",
    doneWhen: "Your crate spawns by name on a local test server and you can walk a full circle round it in first person.",
    intro:
      "The last metre. A resource folder, a manifest, an archetype definition — then your object exists in the same world as everything Rockstar shipped.",
    dont: "Do not test on a live server. Localhost only until the lesson after next, and honestly long after that too.",
    steps: [
      "Make a resource folder with a stream/ directory and drop the {{.ydr}} in it.",
      "Create a {{.ytyp}} with the crate's archetype (Sollumz can export one) and stream it too.",
      "Write the fxmanifest and register the {{.ytyp}} with a data_file line.",
      "Start the resource on your localhost server and restart it.",
      "Spawn the crate by archetype name (object spawner or a one-line script) and inspect it from every side.",
    ],
    clips: [{ label: "Streaming assets on FiveM", start: 132 }],
    videoId: "",
    videoNote: "The official docs below are the truth; the video is just company.",
    tips: [
      {
        text: "Maps need this_is_a_map 'yes'. A {{.ytyp}} is registered with data_file — usually DLC_ITYP_REQUEST pointing at the streamed file.",
        source: "Cfx resource manifest",
        url: "https://docs.fivem.net/docs/scripting-reference/resource-manifest/",
      },
      {
        text: "Cfx Part 4 is the whole spawn path: stream folder, fxmanifest, calculate extents, then Manifest Generator for _manifest.ymf.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Name resources like folders you will still respect in a year: xn_props, not test2_final_REAL.",
        source: "Cfx resources intro",
        url: "https://docs.fivem.net/docs/scripting-manual/introduction/introduction-to-resources/",
      },
    ],
    checklist: [
      "Resource folder with stream/",
      ".ytyp exported and registered",
      "fxmanifest written by hand, understood",
      "Crate spawns by name on localhost",
      "Walked a full circle round it",
    ],
  },

  // ── MLO fundamentals ─────────────────────────────────────────────────
  {
    id: 10,
    classId: "mlo-fundamentals",
    title: "Limbo and rooms",
    doneWhen: "Your interior loads with a limbo and one room, and the room's bounds hug the space — floor to ceiling, wall to wall.",
    intro:
      "An MLO is not a model with a hole in it. It is a small database: rooms, and rules about what renders where. Limbo is room zero — the outside looking in. The next class is the full from-scratch interior; today is only limbo and one room.",
    dont: "Do not size room bounds generously 'to be safe'. Too big leaks audio and light; too small culls your own walls in front of you.",
    steps: [
      "Convert your room model into a Sollumz MLO archetype.",
      "Confirm limbo exists as room 0. It always exists; you never delete it.",
      "Add room 1 and size its bounds to hug the interior exactly.",
      "Set basic room flags and give the room a sensible name.",
      "Export the {{.ytyp}} and drawables; load in CodeWalker and check the room bounds visually.",
    ],
    clips: [
      { label: "MLO structure: limbo and rooms", start: 154 },
      { label: "Room bounds in practice", start: 508 },
    ],
    videoId: "",
    videoNote: "This is the hardest mental model in the course. Watch the structure clip twice before touching anything.",
    tips: [
      {
        text: "Room bounds drive audio occlusion and interior lighting. Most 'my interior sounds outdoors' bugs are just oversized bounds. Set bounds from the collision selection.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        text: "Limbo is not decoration — Create Limbo Room first, then add real rooms. The engine swaps you into limbo the moment you leave every real room.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        text: "One room per real space. Corridors are rooms too, not gaps between rooms.",
        source: "Sollumz interiors",
        url: "https://docs.sollumz.org/tutorials/creating-interiors",
      },
    ],
    checklist: [
      "MLO archetype created",
      "Limbo present as room 0",
      "Room 1 bounds hug the space",
      ".ytyp exported",
      "Bounds inspected in CodeWalker",
    ],
  },
  {
    id: 11,
    classId: "mlo-fundamentals",
    title: "Portals",
    doneWhen: "Standing inside, the outside world stays visible through the doorway — and you can step through and back with no flicker.",
    intro:
      "A portal is a window the engine looks through. No portal, no outside world: the doorway shows void and the room seals itself off.",
    dont: "Do not size a portal by eye to look tidy. It covers the whole opening, edge to edge, or the engine culls the wrong things at the worst moments.",
    steps: [
      "Create a portal across the door opening, exactly the size of the hole.",
      "Link it from room 1 to limbo (inside to outside).",
      "Check the corner order — a flipped portal works one way and gaslights you.",
      "Export, load in, and stand in the doorway. Look both ways slowly.",
      "Step fully inside and turn round. If the world outside disappears, the portal is missing, undersized or flipped.",
    ],
    clips: [
      { label: "Creating and linking portals", start: 96 },
      { label: "Debugging a flipped portal", start: 433 },
    ],
    videoId: "",
    videoNote: "Short video, long practice. Most of this lesson happens standing in a doorway.",
    tips: [
      {
        text: "It is very important to go out from inside when limbo is one of the parts: Room → Limbo. Use Flip Direction if the arrow lies.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        text: "Every hole in the shell needs a portal: windows too, not just doors. A porthole-less window is a void with curtains.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        text: "Portal flags handle special cases — one-way, mirror, glass. Leave them at defaults until a default visibly fails you.",
        source: "Sollumz interiors",
        url: "https://docs.sollumz.org/tutorials/creating-interiors",
      },
    ],
    checklist: [
      "Portal spans the opening exactly",
      "Linked room 1 to limbo",
      "Corner order verified",
      "Doorway test passed both ways",
      "No flicker walking through",
    ],
  },
  {
    id: 12,
    classId: "mlo-fundamentals",
    kind: "project",
    title: "Finish the room: vertex colour and light",
    doneWhen: "The interior reads correctly at midnight and midday — no glowing walls, one believable artificial light.",
    intro:
      "GTA interiors are lit by paint. Vertex colour tells the engine how much ambient light each corner receives. Get this wrong and walls glow at 3 a.m.",
    dont: "Do not paint everything full white. Bright vertex colour means 'floodlit'; an interior painted 255 never gets dark and never looks real.",
    steps: [
      "Enter vertex paint mode on the interior mesh.",
      "Fill everything with a dark base, then lift the areas near the doorway and window.",
      "Keep the green channel doing the ambient work — low values, raised gently where daylight reaches.",
      "Add one artificial light to the room's definition and set a warm colour and modest intensity.",
      "Export, then check in-game at 00:00 and 12:00 before calling it done.",
    ],
    clips: [
      { label: "Vertex colour for interiors", start: 172 },
      { label: "Interior lights", start: 521 },
    ],
    videoId: "",
    videoNote: "Judge results in-game, not in Blender — the viewport lies about GTA lighting.",
    tips: [
      {
        text: "GREEN for inside MLOs, RED for outdoors. A mix and a gradient, not a flat flood. Color 1, Face Corner, Byte Color.",
        source: "Sollumz FAQ",
        url: "https://docs.sollumz.org/support/faq",
      },
      {
        text: "Sollumz's interior tutorial uses green at about 0.2 and everything else at 0 as a starting coat.",
        source: "Sollumz texturing",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/texturing",
      },
      {
        text: "Test lighting at several game hours. Midnight shows leaks; noon shows dead corners. One good light beats five weak ones.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
    ],
    checklist: [
      "Dark base coat applied",
      "Daylight areas lifted gently",
      "One artificial light placed",
      "Checked at 00:00 in-game",
      "Checked at 12:00 in-game",
    ],
  },

  // ── Building shells ──────────────────────────────────────────────────
  {
    id: 13,
    classId: "building-shell",
    title: "The exterior shell",
    doneWhen: "A two-storey shell at real scale reads from 50 m away: clean silhouette, floors that line up, door and window openings cut.",
    intro:
      "A building is judged from across the road first. Silhouette and proportion do the heavy lifting; detail is a rounding error at this distance.",
    dont: "Do not start a second building, and do not add drainpipes, signage or trim. One shell, finished, beats two started.",
    steps: [
      "Block the silhouette from boxes at real scale: 3 m per storey is a safe rhythm.",
      "Cut door and window openings with clean quads — the door hole at 2.1 by 0.9 m.",
      "Add a flat roof with a short parapet; it hides the roofline sins every beginner makes.",
      "Apply transforms; origin at the base where the building meets the ground.",
      "Stand a ref_human at the door and photograph your shell from 50 m in the viewport.",
    ],
    clips: [
      { label: "Blocking a building silhouette", start: 240 },
      { label: "Cutting openings cleanly", start: 731 },
    ],
    videoId: "",
    videoNote: "Architecture videos work here even when they are not about games. Proportion transfers.",
    tips: [
      {
        text: "Copy a vanilla building's massing before inventing your own. Rockstar's proportions already pass the 50 m test — extract one with Cfx Part 2.",
        source: "Cfx Part 2",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
      },
      {
        text: "Keep the shell one object with clean geometry — you will cut LODs from it in two lessons and thank yourself.",
        source: "Cfx Part 6",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-6/",
      },
      {
        text: "Ground floors are taller than upper floors on most real high streets — 3.5 m ground, 3 m above reads instantly right.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
    ],
    checklist: [
      "Silhouette blocked at real scale",
      "Openings cut, door 2.1 x 0.9 m",
      "Parapet roof added",
      "Transforms applied, origin at base",
      "50 m viewport check done",
    ],
  },
  {
    id: 14,
    classId: "building-shell",
    title: "Doorway and interior link",
    doneWhen: "Street to room in one walk: through the shell's door hole, into your MLO, no gap, no z-fighting, no void.",
    intro:
      "The shell and the interior are separate assets that must agree to the millimetre at one doorway. Today they meet.",
    dont: "Do not merge the shell and the interior into one object to force alignment. They stay separate; the doorway is a contract, not a weld. Do not start an MRPD-scale replacement here — that is Make an MLO.",
    steps: [
      "Position the interior behind the shell's door opening; match the openings exactly.",
      "Pull shared surfaces apart by a few millimetres where they would overlap — z-fighting lives in coplanar faces.",
      "Give the shell its own collision so the outside is solid.",
      "The interior's entrance portal now links to the real outside through the shell's hole.",
      "Walk it in-game: street, threshold, room, and back. Slowly, looking at edges.",
    ],
    clips: [{ label: "Aligning shell and MLO", start: 318 }],
    videoId: "",
    videoNote: "Take measurements from lesson 5's notes with you — this is where they pay off.",
    tips: [
      {
        text: "An MLO is placed into the world by its {{.ymap}} entry with the {{.ytyp}} defining it — position once, correctly, rather than nudging both files forever.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        text: "Cut a hole in the world {{.ybn}} at the doorway or players walk into an invisible wall on the street.",
        source: "Sollumz collisions",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/collisions",
      },
      {
        text: "If the MLO shows in CodeWalker but not in-game, generate _manifest.ymf with the MLO, YMAP and YTYP in the project.",
        source: "Sollumz FAQ",
        url: "https://docs.sollumz.org/support/faq",
      },
    ],
    checklist: [
      "Openings match exactly",
      "No coplanar overlap anywhere",
      "Shell collision in place",
      "Portal links room to street",
      "Walked street-to-room and back",
    ],
  },
  {
    id: 15,
    classId: "building-shell",
    kind: "project",
    title: "LODs and distance",
    doneWhen: "The building holds up at 300 m as a simple LOD and swaps to full detail up close without an ugly pop.",
    intro:
      "The engine never renders your full building at distance — it renders a stand-in you also have to make. No LOD means your building simply vanishes from afar.",
    dont: "Do not skip LODs 'for now'. A building without them looks finished on your screen and broken from the hill above it.",
    steps: [
      "Duplicate the shell and simplify hard: openings become texture-deep, small geometry goes entirely.",
      "Aim for a small fraction of the original triangle count.",
      "Assign high and LOD levels on the drawable in Sollumz and set sensible LOD distances.",
      "Export and place; then drive away from the building watching the swap.",
      "Adjust distances until the pop happens where nobody is looking.",
    ],
    clips: [{ label: "LOD levels in Sollumz", start: 205 }],
    videoId: "",
    videoNote: "Official Cfx/ook_3D Part 6 is the video. Pause on every LOD field. Deeper SLODs are a later course.",
    tips: [
      {
        text: "Cfx Part 6 is the whole job: HD and LOD drawables, two ymaps, parent filename, ParentIndex 0, NumChildren 1, then Manifest Generator.",
        source: "Cfx Part 6",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-6/",
      },
      {
        text: "Judge LODs at speed, in a vehicle. Walking-pace checks pass things that flicker horribly at 120 km/h.",
        source: "Cfx Part 6",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-6/",
      },
      {
        text: "Bake the façade to a texture for the LOD rather than keeping geometry — distance hides everything except silhouette and colour.",
        source: "Cfx Part 6",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-6/",
      },
    ],
    checklist: [
      "LOD mesh duplicated and simplified",
      "Triangle count cut drastically",
      "LOD levels and distances set",
      "Swap watched from a vehicle",
      "Pop distance tuned",
    ],
  },

  // ── World edit basics ────────────────────────────────────────────────
  {
    id: 16,
    classId: "world-edit",
    title: "CodeWalker tour",
    doneWhen: "You can fly to your test area, select vanilla entities, read their details, and open a {{.ymap}} — all without saving anything.",
    intro:
      "CodeWalker shows you the city as data. Today is a museum visit: look at everything, touch nothing.",
    dont: "Do not save anything today. Not one file. The tour is the lesson.",
    steps: [
      "Point CodeWalker at your GTA V folder and let it load the world.",
      "Learn the camera; it is not Blender's. Fly to a district you know on foot.",
      "Turn on entity selection and click things: props, buildings, lights. Read the details panel each time.",
      "Find which {{.ymap}} owns a prop you clicked. Notice how the city is really thousands of small placement files.",
      "Open the Project window, look at what it offers, and close it again. That is tomorrow's tool.",
    ],
    clips: [
      { label: "CodeWalker interface tour", start: 118 },
      { label: "Selection and entity details", start: 402 },
    ],
    videoId: "",
    videoNote: "Fly around longer than feels productive. Map literacy is the actual skill here.",
    tips: [
      {
        text: "Work from the CodeWalker releases and readme on GitHub — forks and reuploads lag behind and miss fixes.",
        source: "CodeWalker (GitHub)",
        url: "https://github.com/dexyfex/CodeWalker",
      },
      {
        text: "Point CodeWalker at a clean copy of the game, not a modded folder — mods make the world lie to you. Cfx Part 1 covers nametables and Edit Mode.",
        source: "Cfx Part 1",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-1/",
      },
      {
        text: "The same viewer opens single models ({{.ydr}}, {{.ydd}}) — it is also your export-checking tool from the props class.",
        source: "CodeWalker (GitHub)",
        url: "https://github.com/dexyfex/CodeWalker",
      },
    ],
    checklist: [
      "World loads from a clean GTA folder",
      "Camera comfortable",
      "Ten entities selected and read",
      "Owning .ymap found for one prop",
      "Nothing saved",
    ],
  },
  {
    id: 17,
    classId: "world-edit",
    kind: "project",
    title: "Your first YMAP compound",
    doneWhen: "A fenced compound of vanilla props saved as a {{.ymap}}, streamed on your server, and walkable end to end.",
    intro:
      "Before custom assets go into the world, learn placement with Rockstar's own props. A fence, some crates, a generator: a first yard. Moving a vanilla gate or clearing a car park is the Areas class — not today.",
    dont: "Vanilla fences and dressing first. Your custom crate waits for the last lesson in this class.",
    steps: [
      "Create a new project and a new {{.ymap}} in CodeWalker.",
      "Place fence sections to enclose a small yard. Move with the gizmo; type coordinates for the fiddly ones.",
      "Dress the yard: crates, a generator, a light. A dozen entities is plenty.",
      "Save the {{.ymap}}, add it to a resource's stream folder, and restart your localhost server.",
      "Walk the compound in first person. Fix floating props and sunken bases — there will be some.",
    ],
    clips: [
      { label: "Projects and new ymaps", start: 87 },
      { label: "Placing and snapping entities", start: 356 },
    ],
    videoId: "",
    videoNote: "Fence pieces teach placement discipline faster than anything else — embrace the tedium.",
    tips: [
      {
        text: "this_is_a_map 'yes' plus a stream folder is the whole FiveM side for a plain {{.ymap}}. Calculate Extents and Flags, then Manifest Generator.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Hold Shift and drag the 3D gizmo to duplicate entities. Freehand fence angles read as mistakes at ground level.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Name ymaps by place, not by attempt: xn_docks_compound, not mymap_v3_new.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
    ],
    checklist: [
      "New project and ymap created",
      "Yard enclosed with fences",
      "Dressed with a dozen entities",
      "Streamed and loaded on localhost",
      "Walked and de-floated everything",
    ],
  },
  {
    id: 18,
    classId: "world-edit",
    title: "Project files and backups",
    doneWhen: "One tidy project tree — sources, exports, server resource — and you can rebuild the compound from it in fifteen minutes.",
    intro:
      "The unglamorous lesson that protects all the others. A project you cannot rebuild is a project you do not own.",
    dont: "Do not keep single copies of anything you spent an evening on. One copy is zero copies.",
    steps: [
      "Lay out one tree: sources/ for .blend and CodeWalker projects, exports/ for game files, resource/ for the server folder.",
      "Save the CodeWalker project file with your {{.ymap}} in sources — the ymap alone is the export, not the project.",
      "Write a short README in the tree: what this is, what makes it, in which order.",
      "Zip the whole tree and date the zip. Put it somewhere that is not this machine.",
      "Prove it: from the zip alone, rebuild the compound on a clean resource. Time yourself.",
    ],
    clips: [{ label: "A sane modding folder structure", start: 60 }],
    videoId: "",
    videoNote: "No video really teaches this. The fifteen-minute rebuild is the teacher.",
    tips: [
      {
        text: "Version the source files, not just exports — a {{.ydr}} cannot be edited back into a .blend when you spot a mistake. Cfx Part 1 is the workspace setup.",
        source: "Cfx Part 1",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-1/",
      },
      {
        text: "CodeWalker project files keep your edit session — reopening raw ymaps loses selection groups and view state.",
        source: "CodeWalker (GitHub)",
        url: "https://github.com/dexyfex/CodeWalker",
      },
      {
        text: "Every resource is an fxmanifest.lua plus files. Date-stamped zips beat clever version numbers for a solo workflow.",
        source: "Cfx resources intro",
        url: "https://docs.fivem.net/docs/scripting-manual/introduction/introduction-to-resources/",
      },
    ],
    checklist: [
      "Tree laid out: sources, exports, resource",
      "CodeWalker project saved to sources",
      "README written",
      "Dated zip stored off-machine",
      "Fifteen-minute rebuild proven",
    ],
  },

  // ── Make a crate (Blender project — the donut, for mapping) ──────────
  {
    id: 19,
    classId: "blender-make",
    kind: "project",
    title: "Block the crate",
    doneWhen: "A 1 m wooden crate blocked from a cube: bevelled edges, sitting on the grid, named xn_crate_wood, saved as a .blend.",
    intro:
      "This class is the donut. You are not collecting keys — you are making one object that uses them. Slow: Grant, pause, copy. Fast: the Guru donut for the same keys, then you still make a crate, not icing.",
    dont: "Do not start a second crate. Do not texture, UV, or open Sollumz. Shape only.",
    steps: [
      "New file. Units metric, scale 1.0. Add ref_human (0.45 × 0.3 × 1.8 m) and keep it in a collection called ref.",
      "Add a cube [[Shift+A]] Mesh → Cube. [[S]] type [[0.5]] [[Enter]] if the default is 2 m — you want 1 m on a side. Check the N panel.",
      "[[G]] [[Z]] until the bottom sits on the grid (z = 0.5 if origin is still the centre). Typed numbers, not eyeballs.",
      "[[Tab]] edit mode, [[A]] select all, [[Ctrl+B]] bevel a few millimetres. Scroll the wheel for one extra segment if it looks faceted, not round.",
      "[[F2]] rename the object xn_crate_wood. Save the file under sources/ as xn_crate_wood.blend. That save is the lesson.",
    ],
    clips: [
      { label: "Add, scale, [[G]]", start: 362 },
      { label: "Bevel (official)", start: 0, videoId: "JSvGts95S7A" },
    ],
    videoId: "",
    videoNote: "Pause after every key. The crate on disk is the gate, not the video.",
    tips: [
      {
        text: "Bevel exists so light can catch an edge. A perfectly sharp box looks CG even at 1 m.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/modeling/meshes/editing/edge/bevel.html",
      },
      {
        text: "Save early: the donut tutorial does this on purpose. File → Save, then keep saving.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/files/blend/save_load.html",
      },
    ],
    checklist: [
      "ref_human in the scene",
      "Crate is 1 m, checked in the N panel",
      "Sitting on the grid",
      "Edges bevelled, still boxy",
      "Saved as xn_crate_wood.blend",
    ],
  },
  {
    id: 20,
    classId: "blender-make",
    kind: "project",
    title: "Planks, lip and loop cuts",
    doneWhen: "The crate reads as boards: loop cuts for planks, an inset lip on the top, still under a few hundred triangles.",
    intro:
      "[[Ctrl+R]], [[I]], [[E]] — the same keys the donut uses on a mug. You spend them on a crate because that is what you will export.",
    dont: "Do not sculpt, subdivide, or add a Subdivision Surface. Mapping crates stay boxy. Do not watch the icing chapter and copy it onto this mesh.",
    steps: [
      "Open yesterday's .blend. [[Tab]] edit mode, face select [[3]].",
      "[[Ctrl+R]] on a side: one loop, left-click, then right-click to keep it centred. Repeat until you have two or three plank lines per side — not a dozen.",
      "Select the top face. [[I]] inset a rim about 4 cm. [[E]] [[Z]] type a small number for a lip, or [[E]] then [[S]] to pull the inner lid down.",
      "If a face goes red in Face Orientation, [[Shift+N]] with everything selected.",
      "Count triangles (Scene statistics overlay). If you are in the thousands, you over-looped. Undo and keep it dumb.",
    ],
    clips: [
      { label: "Loop cut and inset (donut mug — keys only)", start: 1363 },
      { label: "Grant: [[E]] and [[Ctrl+R]] on a cube", start: 0, videoId: "F_JK9eaYYTQ" },
    ],
    videoId: "",
    videoNote: "Steal the keys. The mug and the stag are not the homework.",
    tips: [
      {
        text: "Loop Cut: [[Ctrl+R]], hover, scroll for extra cuts, left-click to cut, left-click again to slide — or right-click to centre.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/modeling/meshes/tools/loop.html",
      },
      {
        text: "Inset Faces is [[I]]. The donut uses it on the mug; you use it on the crate lid.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/modeling/meshes/editing/face/inset_faces.html",
      },
    ],
    checklist: [
      "Loop cuts read as planks",
      "Top has an inset lip",
      "Face orientation all blue",
      "Still low-poly",
      "Saved over the same .blend",
    ],
  },
  {
    id: 21,
    classId: "blender-make",
    kind: "project",
    title: "Clean it, origin, collection",
    doneWhen: "Scale 1,1,1, origin at bottom centre, mesh and object named, crate in its own collection, file saved where you will find it next month.",
    intro:
      "The donut tutorial makes you save and name things. Game work punishes you harder if you skip this. Today is boring on purpose.",
    dont: "Do not export. Do not open Sollumz. A dirty .blend is not a prop yet.",
    steps: [
      "Object mode. [[Ctrl+A]] All Transforms. N panel scale must read 1,1,1.",
      "[[Tab]], [[A]], [[M]] Merge by Distance. Note the removed count in your notes.",
      "[[Shift+N]] recalculate outside. Face Orientation still blue.",
      "Origin: put the 3D cursor on the grid under the crate ([[Shift+S]] or cursor tool), Object → Set Origin → Origin to 3D Cursor, then Origin to Geometry on X and Y if it drifted. Bottom centre is the goal.",
      "Collection named xn_crate_wood. Move the crate in; leave ref_human out. Save.",
    ],
    clips: [
      { label: "3D cursor (Grant)", start: 341, videoId: "kVcY7K-JA1Y" },
      { label: "Donut Part 1: save the file", start: 1631, videoId: "-tbSCMbJA6o" },
    ],
    videoId: "",
    videoNote: "Apply, origin, save. Then stop.",
    tips: [
      {
        text: "Apply object transforms before any export later. Scale that is not 1,1,1 is a silent size bug in-game.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
      },
      {
        text: "Object origins — the orange dot. Bottom centre for props that sit on the ground.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/origin.html",
      },
    ],
    checklist: [
      "Scale 1,1,1",
      "Merge by Distance run",
      "Origin bottom centre",
      "Collection named, ref_human excluded",
      "Saved",
    ],
  },
  {
    id: 22,
    classId: "blender-make",
    kind: "project",
    title: "Make it again — video off",
    doneWhen: "A second object — a pallet, 1.2 by 1.0 by 0.14 m — built with no tutorial playing, sitting next to the crate in the same file.",
    intro:
      "The donut is finished when you can make a second pastry. Mapping is finished when you can make a second box. This is the gate for the whole Blender topic.",
    dont: "Do not replay the donut. Do not open the crate's edit mode to copy loops. If you are stuck, one 30-second peek, then close it.",
    steps: [
      "Mute or close the player. New cube in the same scene, beside the crate.",
      "Typed size: 1.2 m X, 1.0 m Y, 0.14 m Z. Sit it on the grid. Name it xn_pallet_wood.",
      "Three or four [[Ctrl+R]] planks on the top. Tiny [[Ctrl+B]] on the long edges. No subdivision.",
      "[[Ctrl+A]], merge, [[Shift+N]], origin bottom centre, own collection.",
      "Orbit both objects with ref_human. If the pallet looks like a door on the floor, the height is wrong — type 0.14 again.",
    ],
    clips: [],
    videoId: "",
    videoNote: "No video. The pallet is the teacher. Fast does not get the donut for this one either.",
    tips: [
      {
        text: "If you cannot remember a key, write it in notes after one peek. The goal is the object, not a perfect memory test.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/modeling/meshes/tools/loop.html",
      },
    ],
    checklist: [
      "Player was off while you modelled",
      "Pallet is 1.2 × 1.0 × 0.14 m",
      "On the grid, origin bottom centre",
      "Named and in its own collection",
      "Looks sane next to ref_human",
    ],
  },

  // ── Capstones in later classes (same pattern: make the thing) ────────
  {
    id: 23,
    classId: "props-first",
    kind: "project",
    title: "Second prop: the pallet in-game",
    doneWhen: "The pallet has a {{.ydr}}, a box bound, an archetype, and it spawns next to the crate on localhost.",
    intro:
      "The crate was follow-along. The pallet proves the pipeline stuck. Same export, same collision, same manifest — no new theory.",
    dont: "Do not start a third prop. Do not skip collision 'because it is flat'. A pallet without a bound is a ghost.",
    steps: [
      "Convert xn_pallet_wood to a Sollumz Drawable. One basic shader, embedded texture — even a flat brown is fine.",
      "Bound Composite, box bound hugging the slab, wood (or cardboard) collision material, flag preset.",
      "Export {{.ydr}} and {{.ytyp}} into the same resource as the crate. Unique archetype name.",
      "data_file for the ytyp if it is a new file; this_is_a_map still yes. Restart the resource.",
      "Spawn crate and pallet. Walk a circle. Stand on the pallet — if you fall through, the bound is wrong.",
    ],
    clips: [
      { label: "Convert / export (skip rooms)", start: 0, videoId: "NN-fjCbPO1Q" },
      { label: "Sollumz install if you need it", start: 0, videoId: "zv3NdateGqs" },
    ],
    videoId: "",
    videoNote: "You already watched these on the crate. Scrub only if a menu moved.",
    tips: [
      {
        text: "Creating static meshes — convert, embed, export. Same page as the crate.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
      },
      {
        text: "Creating static collisions — primitive box, not the render mesh.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-collisions",
      },
    ],
    checklist: [
      "Pallet .ydr opens in CodeWalker",
      "Box bound hugs the slab",
      "Spawns by name on localhost",
      "You can stand on it",
      "Sits next to the crate",
    ],
  },
  {
    id: 24,
    classId: "mlo-fundamentals",
    kind: "project",
    title: "Walk the room — video off",
    doneWhen: "You walk street-to-room-to-street with no flicker, at midnight and noon, and you have a screenshot of each in your notes.",
    intro:
      "Limbo, one room, one portal, vertex colour, one light. That is this class's drill, judged in-game with the tutorial shut. The next class is a full interior from scratch on a vanilla site — not this walk.",
    dont: "Do not add a second room. Do not start a new interior. Finish this one.",
    steps: [
      "Close the MLO video. Load the interior on localhost.",
      "Stand in the doorway. Look out, look in. Walk through both ways, slowly.",
      "Set the clock to 00:00. Walls must not glow. Then 12:00 — corners must not be dead black unless you meant it.",
      "If something fails, fix one thing: bounds, portal flip, or vertex green — not all three at once.",
      "Two screenshots into notes: midnight and noon, from inside looking at the door.",
    ],
    clips: [],
    videoId: "",
    videoNote: "No video. The doorway is the teacher. Official reading if you must look something up.",
    tips: [
      {
        text: "Room → Limbo, then Flip Direction if the arrow lies.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        text: "GREEN inside, low values. FAQ if walls glow.",
        source: "Sollumz FAQ",
        url: "https://docs.sollumz.org/support/faq",
      },
    ],
    checklist: [
      "Video was off",
      "Doorway test both ways",
      "Checked at 00:00",
      "Checked at 12:00",
      "Screenshots in notes",
    ],
  },
  {
    id: 25,
    classId: "building-shell",
    kind: "project",
    title: "A shed from boxes — video off",
    doneWhen: "A 4 by 3 m shed, one storey, door 2.1 by 0.9 m, parapet roof, origin at the base — built with no architecture video playing.",
    intro:
      "The two-storey shell was follow-along. A shed is the second pastry: same blocking, less to hide behind.",
    dont: "Do not add the interior. Do not add LODs today. One shed, honest, from boxes.",
    steps: [
      "New collection. Cubes only. 4 m by 3 m footprint, 3 m to the eaves.",
      "Door hole 2.1 by 0.9 m on the long side. One window hole, clean quads.",
      "Flat roof, short parapet. [[Ctrl+A]], origin at ground centre.",
      "ref_human at the door. Orbit from 30 m. If it looks like a fridge, the roof is too tall or the plan is too small.",
      "Save as xn_shed_01.blend. No tutorial in the headphones.",
    ],
    clips: [],
    videoId: "",
    videoNote: "No video. If you are lost, one peek at lesson 13's steps, then close them.",
    tips: [
      {
        text: "Block at real scale. Cfx Part 3 is the asset-in-Blender reminder, not a shed tutorial.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
    ],
    checklist: [
      "Video off",
      "4 × 3 m, one storey",
      "Door 2.1 × 0.9 m",
      "Origin at base, transforms applied",
      "Saved",
    ],
  },
  {
    id: 26,
    classId: "world-edit",
    kind: "project",
    title: "Your crate in the compound",
    doneWhen: "The fenced yard from lesson 17 contains your xn_crate_wood (and the pallet if it exists), streamed, walkable, nothing floating.",
    intro:
      "Vanilla fences taught placement. Today the compound contains work that is yours. That is this class's finished thing.",
    dont: "Do not rebuild the fences from scratch unless they are gone. Do not add a second ymap 'to test'.",
    steps: [
      "Open the CodeWalker project from lesson 17. New entities for xn_crate_wood and xn_pallet_wood if you spawned them.",
      "Sit them on the ground. Typed Z if they float. Duplicate one crate with Shift-drag if the yard looks empty.",
      "Calculate Extents and Flags. Manifest Generator. Save the {{.ymap}}.",
      "Resource stream folder already has the ydr/ytyp. Restart. Walk the yard in first person.",
      "If a custom prop is invisible, _manifest.ymf and the ytyp data_file — not a new fence.",
    ],
    clips: [{ label: "CodeWalker: place and save", start: 0, videoId: "QZtFRk6ANm0" }],
    videoId: "",
    videoNote: "Same CodeWalker video as the compound. This time the archetype name is yours.",
    tips: [
      {
        text: "Cfx Part 4 — extents, flags, manifest, this_is_a_map.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "MLO or ytyp in CodeWalker but not in-game: generate _manifest.ymf.",
        source: "Sollumz FAQ",
        url: "https://docs.sollumz.org/support/faq",
      },
    ],
    checklist: [
      "Custom crate entity in the ymap",
      "Sitting on the ground",
      "Extents and flags calculated",
      "Walked in-game",
      "Nothing floating",
    ],
  },

  // ── Make an MLO (from scratch, then replace a vanilla site) ──────────
  {
    id: 27,
    classId: "mlo-make",
    kind: "project",
    title: "Export a site — reference only",
    doneWhen: "A small unused vanilla building is exported ({{.ydr}}, {{.ybn}}, {{.ymap}}) and imported into Blender as a ghost you will not ship as the interior.",
    intro:
      "This class is the donut for interiors. You are not converting a GTA MLO. You steal a site: a kiosk, a shed, a motel door — never Mission Row PD. The vanilla mesh is a ruler. Your rooms are new geometry.",
    dont: "Do not open a vanilla {{.ytyp}} and inject entities. That is editing Rockstar's interior, not replacing a building. Do not pick MRPD, Pillbox, or the bank — too big, too many ymaps.",
    steps: [
      "In CodeWalker, Enable DLCs, fly to a tiny unused building. Copy the archetype name from the details panel.",
      "RPF Explorer: search that name, export the {{.ydr}} (and Save All Textures). Export the world {{.ybn}} that hugs the doorway — including hi@ if it exists.",
      "Note the owning {{.ymap}} name. Export that XML too — you need the coordinates, not the vanilla interior database.",
      "Blender: Sollumz import. [[V]] Find Missing Textures. The building should sit in world space once the ymap is imported.",
      "Write the archetype name, ymap name, and XYZ into notes. Hide the vanilla mesh ([[H]]) when you start modelling so you do not texture-fight it by accident.",
    ],
    clips: [
      { label: "Cfx Part 2: export and import", start: 0, videoId: "fCQ5JlbWcSE" },
      { label: "RoyalT: export XMLs from CodeWalker", start: 0, videoId: "K_Kk4n_-Z8s" },
    ],
    videoId: "",
    videoNote: "Official Cfx/ook_3D Part 2 is Slow. RoyalT is the same job on an MLO site. Pause after every export.",
    tips: [
      {
        text: "Sollumz interiors start by picking a building and importing from CodeWalker — as reference, not as the finished MLO.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/importing-from-codewalker",
      },
      {
        text: "Cfx Part 2 is export XML, Save All Textures, import, Find Missing Textures.",
        source: "Cfx Part 2",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
      },
    ],
    checklist: [
      "Tiny unused building, not MRPD",
      ".ydr and textures exported",
      "World .ybn exported",
      "Owning .ymap noted",
      "Imported into Blender, coordinates in notes",
    ],
  },
  {
    id: 28,
    classId: "mlo-make",
    kind: "project",
    title: "Your interior, from scratch",
    doneWhen: "Your own shell — floor, walls, ceiling, one door hole, one window hole — is a separate object from the vanilla building, origin at geometry, sitting on the doorway.",
    intro:
      "The long video models a room onto a motel wall. You do the same keys on your site. Every wall is new. If a face still belongs to Rockstar's mesh, you have not started yet.",
    dont: "Do not keep the vanilla interior faces and call them yours. Do not texture for an hour. Shape, then stop. Do not open Sollumz convert until the next lesson.",
    steps: [
      "[[Tab]] edit mode on the vanilla doorway. Delete only the fake door faces ([[X]] Faces) so you can see in. Hide the roof with [[H]] if you need a top view.",
      "Build your room from the door frame: [[E]] extrude, axis lock [[X]] [[Y]] [[Z]], [[F]] fill floor and ceiling. Typed heights — 2.8 m ceiling from lesson 5.",
      "One window hole with [[K]] knife or [[Ctrl+R]] loops — same size as the vanilla window if you are replacing that wall.",
      "Select only YOUR faces, [[P]] Separate Selection. [[Alt+P]] Clear Parent and Keep Transformation. Object → Set Origin → Origin to Geometry.",
      "Face Orientation: inside blue. [[A]] [[M]] Merge by Distance. Name it xn_mlo_shell. Save. Vanilla mesh stays in the file as a ghost, not as the export.",
    ],
    clips: [
      { label: "Desertos: custom MLO in Blender (the long one)", start: 0, videoId: "NN-fjCbPO1Q" },
      { label: "RoyalT: model, export, test interior", start: 0, videoId: "s91lzkS8rKY" },
      { label: "NugzZ part 1 (optional — vanilla shop, steal keys only)", start: 0, videoId: "_gNtiS_tECQ" },
    ],
    videoId: "",
    videoNote: "Slow: Desertos at 0.75×, pause after every key — he names them. Fast: RoyalT model/export. NugzZ is optional extra. Still YOUR room, not a converted GTA interior.",
    tips: [
      {
        text: "Detach the interior from the exterior. They are separate assets that agree at one doorway.",
        source: "Sollumz interiors",
        url: "https://docs.sollumz.org/tutorials/creating-interiors",
      },
      {
        text: "Cfx Part 3: Color 1, Face Corner, Byte Color — green inside when you paint later, not today.",
        source: "Cfx Part 3",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
      {
        text: "NugzZ beginner MLO part 1 is optional company. He starts from a vanilla shop. Steal keys, not the Rockstar mesh.",
        source: "NugzZ",
        url: "https://www.youtube.com/watch?v=_gNtiS_tECQ",
      },
    ],
    checklist: [
      "Shell is new geometry, not vanilla faces",
      "Door and window holes cut",
      "Separated from the imported building",
      "Origin on the shell, transforms recorded",
      "Saved as xn_mlo_shell",
    ],
  },
  {
    id: 29,
    classId: "mlo-make",
    kind: "project",
    title: "Collision, rooms, portals, stream",
    doneWhen: "Your MLO has a collision with room IDs, limbo plus one room, a door portal Room → Limbo, a streamed {{.ytyp}}, and you can stand in the doorway in CodeWalker.",
    intro:
      "Lessons 10–12 were the drills. Today they happen on the shell you just made. Convert, composite, Create Limbo Room, portal from four verts, shell as entity in limbo.",
    dont: "Do not skip collision 'to see it faster'. Do not size room bounds by eye — Set Bounds From Selection. Do not leave the portal flipped.",
    steps: [
      "[[Shift+D]] the shell, right-click to drop it in place. Convert the copy to a Bound Composite ([[V]]). Collision materials; floor room ID 1.",
      "Archetype Definition: + ytyp. Shell selected, type Base, Auto-Create From Selected. Collision selected, type MLO, Auto-Create From Selected.",
      "Create Limbo Room, then room 1. Set Bounds From Selection on the collision. Portals: four verts, bottom-right first, Room → Limbo, Flip Direction if the arrow lies. Window portal too or the street is a wall.",
      "Entities: add the shell as an entity in limbo. Export ytyp, ydr, ybn. Vertex colour later if walls glow — green, low, Color 1.",
      "New ymap, New Entity, archetype is the MLO name (the collision/MLO archetype, not only the drawable). Paste XYZ from notes. Calculate Extents and Flags. Manifest Generator. Stream on localhost.",
    ],
    clips: [
      { label: "Desertos: collision, ytyp, portals", start: 0, videoId: "NN-fjCbPO1Q" },
      { label: "RoyalT: model, export, test interior", start: 0, videoId: "s91lzkS8rKY" },
    ],
    videoId: "",
    videoNote: "Same Desertos video as yesterday — skip the modelling, stay on collision and ytyp. Official reading is create-ytyp. Fast may jump to RoyalT test-interior.",
    tips: [
      {
        text: "Create Limbo Room first. Portal from the room to Limbo. Flip Direction if the arrow lies.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        text: "If it shows in CodeWalker but not in-game: _manifest.ymf with the MLO, ymap and ytyp in the project.",
        source: "Sollumz FAQ",
        url: "https://docs.sollumz.org/support/faq",
      },
    ],
    checklist: [
      "Collision composite, room ID on the floor",
      "Limbo + room 1, bounds from selection",
      "Door portal Room → Limbo",
      "Shell entity in limbo",
      "Streamed, doorway visible in CodeWalker",
    ],
  },
  {
    id: 30,
    classId: "mlo-make",
    kind: "project",
    title: "Replace the vanilla building",
    doneWhen: "Players walk from the street into YOUR interior: vanilla door collision is gone, leftover props and occlusions are gone, nothing of Rockstar's room is fighting you.",
    intro:
      "This is the MRPD-replacement idea on a building you can finish: hide or cut the old shell, hole the world {{.ybn}}, delete occlusions, stream the edited vanilla files under their original names. You did not convert the police station. You parked your MLO on a small site.",
    dont: "Do not start Mission Row. Do not delete a whole district ymap. Do not leave the vanilla door collision — that is the invisible wall. Do not skip hi@ bullet collision if you opened a window.",
    steps: [
      "CodeWalker: Selection → Collision. Export the world {{.ybn}} at the doorway. Blender: cut a hole the size of your door (and window). Keep the rest of the vanilla bound. Export under the same filename.",
      "Entity mode: Add to Project the leftover door, plants, emissive windows that sit in your room. Delete Entity from the project window. Save the {{.ymap}} with its vanilla name.",
      "Occlusion mode: the red box inside the building will eat your props. Delete it (FiveM) or drag it under the map. Save that occlusion ymap too.",
      "Cfx Part 5 if the hole is wrong. RoyalT 'remove props / occlusions / YMF' is the picture of this lesson.",
      "Restart the resource. Walk street-to-room at 00:00 and 12:00. If you fall through, the bound hole is wrong. If you bounce off nothing, you missed a ybn. If the old wallpaper shows, you missed an entity.",
    ],
    clips: [
      { label: "Cfx Part 5: edit world collision", start: 0, videoId: "UN7iaK5ADpk" },
      { label: "RoyalT: fill ground and collision", start: 0, videoId: "na_62B-OxGs" },
      { label: "RoyalT: remove props, occlusions, YMF", start: 0, videoId: "gG_8NeiXKRE" },
    ],
    videoId: "",
    videoNote: "Official collision video first. Then RoyalT for the replacement chores. Same technique as a big PD replacement — smaller site, same files.",
    tips: [
      {
        text: "Cut a hole in the world {{.ybn}} at the doorway or players walk into an invisible wall on the street. hi@ is bullets; the other is the player.",
        source: "Sollumz collisions",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/collisions",
      },
      {
        text: "Cfx Part 5 — Selection → Collision, export XML, edit, export, keep filenames.",
        source: "Cfx Part 5",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-5/",
      },
      {
        text: "Stream edited vanilla ymaps under their original names so they replace, not duplicate.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
    ],
    checklist: [
      "Door-sized hole in the world .ybn",
      "Vanilla door / clutter entities removed",
      "Occlusion box gone or buried",
      "Walked street-to-room",
      "No vanilla interior fighting yours",
    ],
  },

  // ── Compounds & areas (outdoor, not a building) ──────────────────────
  {
    id: 31,
    classId: "area-edit",
    title: "Move a vanilla gate",
    doneWhen: "A vanilla outdoor gate or barrier sits in a new place in-game, streamed under the original {{.ymap}} name, and the old spot is empty.",
    intro:
      "The city already has gates. Today you move one. That is how a compound steals a driveway. You are not modelling a door and you are not writing a lock script.",
    dont: "Do not script the gate opening. Do not save the {{.ymap}} under a new name — vanilla stays and you will see two gates. Do not start an MLO. Pick a yard gate or car-park barrier, not a building door.",
    steps: [
      "Finish the CodeWalker tour (lesson 16) first. Enable DLCs. Fly to a quiet outdoor gate or barrier — a yard gate, a fence gate, a car-park arm. Not a shop door.",
      "Click the gate. Read the details panel. Write the archetype name and the owning {{.ymap}} filename in notes. That filename is sacred: it is how FiveM replaces the city's file.",
      "Right-click the entity → Add to Project (Project window). The vanilla {{.ymap}} appears in the project. You are editing the city's placement file, not making a new one.",
      "Open the toolbar with [[T]] if the gizmos are hidden. Move with [[W]], rotate with [[E]]. Nudge along the ground. Type numbers in the details panel if it floats. Do not bury it.",
      "On that ymap: Calculate Extents and Calculate All Flags. Save using the original {{.ymap}} name. Stream that file in a this_is_a_map resource (fxmanifest with this_is_a_map 'yes').",
      "Restart localhost. Walk to the old spot: empty. Walk to the new spot: the gate. If both exist, you saved under a new name — delete the extra file and save again as the vanilla filename.",
    ],
    clips: [
      { label: "Tobii: create and modify ymaps", start: 0, videoId: "VDoAjV3kv2g" },
      { label: "Cfx Part 4: stream a ymap (official)", start: 0, videoId: "dVBO3_ZGL_Q" },
    ],
    videoId: "",
    videoNote: "Tobii is Slow: he edits existing ymaps, not only new ones. Pause after Add to Project. Cfx Part 4 is the stream folder.",
    tips: [
      {
        text: "Cfx Part 4 is written for a new {{.ymap}}. Replacement is the same stream folder with the vanilla filename so FiveM overwrites the city's file.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Delete Entity from the Project window. Hiding something in the world view does not remove it from the ymap.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "A mesh that slides open is Cfx Part 8 (Sliding Door 8) — lesson 39, after the compound sits. Not a lock script.",
        source: "Cfx Part 8",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-8/",
      },
    ],
    checklist: [
      "Owning .ymap name written in notes",
      "Entity added to the project, not a new ymap",
      "Saved under the original filename",
      "Old spot empty in-game",
      "Gate sitting on the ground at the new spot",
    ],
  },
  {
    id: 32,
    classId: "area-edit",
    title: "Clear a lot — not a building",
    doneWhen: "A small outdoor patch (car park, skip yard, waste ground) is missing its bins, bollards, or plants in-game — and nothing else nearby vanished.",
    intro:
      "Compounds need empty ground. You do not delete a building. You delete the clutter on a lot.",
    dont: "Do not hole a {{.ybn}} to remove a building. Do not clear Mission Row. Do not delete entities from a ymap you did not add to the project. RoyalT's land-clear video is for an MLO site — steal only the outdoor deletions, then stop.",
    steps: [
      "Pick a tiny outdoor patch: six parking bays, a skip yard, a bit of waste ground. Write what you will remove (bins, bollards, weeds, a parked prop). Not a building you walk into.",
      "Click each entity. Same {{.ymap}} or several? List every owning filename in notes. Add each of those ymaps to the project before you delete anything.",
      "In the Project window, Delete Entity for each clutter item. Do not delete the tarmac drawable or a building. If you are unsure, skip that entity.",
      "Calculate Extents and Flags on every ymap you touched. Save each under its original name.",
      "Stream those files. Walk the lot. The clutter is gone. Neighbouring fences and buildings are still there. If a prop comes back, you missed a second ymap or a DLC override — find the other owner and repeat.",
      "Write the streamed filenames in notes. That list is how you undo this later.",
    ],
    clips: [
      { label: "RoyalT: remove props (outdoor clutter too)", start: 0, videoId: "gG_8NeiXKRE" },
      { label: "RoyalT: clearing land (stop before the interior)", start: 0, videoId: "uPHig3V-cqo" },
      { label: "Tobii: modifying ymaps", start: 0, videoId: "VDoAjV3kv2g" },
    ],
    videoId: "",
    videoNote: "RoyalT clearing-land is Slow for the deletions only — he is prepping an MLO site; you are not. Pause before he models rooms.",
    tips: [
      {
        text: "Stream edited vanilla ymaps under their original names so they replace, not duplicate.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Several ymaps can own props on the same patch of dirt. If one bin remains, you have another filename to find.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
    ],
    checklist: [
      "Outdoor lot, not a building interior",
      "Every owning .ymap added to the project",
      "Clutter gone in-game",
      "Neighbours still standing",
      "Filenames listed in notes",
    ],
  },
  {
    id: 33,
    classId: "area-edit",
    kind: "project",
    title: "A compound with a gate",
    doneWhen: "Open ground, not a building: fences enclose a yard, one gate or barrier on a drive-through, streamed — you can walk the fence and drive in.",
    intro:
      "Lesson 17 was a first yard of fences. This is the job you actually wanted: a compound on land that is not a building, with a gate you placed or moved.",
    dont: "Do not wrap an MLO. Do not convert a GTA interior. Do not script the gate. A mesh you can drive past is enough. Do not pick a shop you walk into.",
    steps: [
      "Pick waste ground or a car-park edge — not a shop. If clutter is in the way, finish lesson 32 first.",
      "New CodeWalker project. File → New → Ymap File. This {{.ymap}} may have a new name: you are adding fences, not replacing the city. Place fence sections. Hold [[Shift]] and drag the 3D gizmo to duplicate. Type rotation for corners.",
      "Place a gate or barrier on the opening. Twisle's video puts a gate on a house; you put one on a drive-through. Or use the gate you moved in lesson 31 as the opening.",
      "Leave a vehicle-width gap. A car is about 2 m wide; give it about 3.5 m. Sit every post on the ground. Typed Z if a piece floats.",
      "Select the ymap: Calculate Extents and Calculate All Flags. Tools → Manifest Generator → Generate, save {{_manifest.ymf}}. Save the {{.ymap}}. Stream with this_is_a_map 'yes'. Restart localhost.",
      "Drive in. Walk the fence in first person. Fix floaters. That is the compound.",
    ],
    clips: [
      { label: "Twisle: custom ymap — he places a gate", start: 0, videoId: "z3QwE87YtDk" },
      { label: "Cfx Part 4: new ymap and resource (official)", start: 0, videoId: "dVBO3_ZGL_Q" },
      { label: "RIB SOSAY: add a prop in CodeWalker", start: 0, videoId: "QZtFRk6ANm0" },
    ],
    videoId: "",
    videoNote: "Twisle is Slow because he actually places a gate. Pause and copy onto YOUR lot, not his house. Cfx Part 4 is extents, flags, manifest.",
    tips: [
      {
        text: "New YMAP, New Entity, archetype name, Shift-drag to duplicate, Calculate Extents and Flags, Manifest Generator, this_is_a_map.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Name the ymap by place: xn_docks_compound, not mymap_v3_new.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Replacement ymaps (lesson 31–32) keep vanilla names. This addon ymap is a new name so it stacks on top of the city.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
    ],
    checklist: [
      "Open ground, not a building",
      "Fence enclosure streamed",
      "Gate or barrier on a drive-through",
      "Extents, flags, _manifest.ymf",
      "Drove in and walked the fence",
    ],
  },
  {
    id: 34,
    classId: "area-edit",
    kind: "project",
    title: "Drive the compound — video off",
    doneWhen: "Same compound, no tutorial playing: drive in, park, walk the fence, nothing floating, notes list every {{.ymap}} you streamed.",
    intro:
      "Ugly in-game beats watching. The compound is finished when you can use it without a video.",
    dont: "Do not start a second compound. Do not open Twisle. One peek at lesson 33's steps if you are lost, then close them.",
    steps: [
      "Headphones: nothing. CodeWalker and the server only.",
      "Drive through the gate opening. Park inside. Get out. Walk the fence clockwise, then the other way.",
      "Fix anything that floats, sinks, or blocks the car. Typed Z. Save. Restart. Drive again.",
      "Write in notes: addon {{.ymap}} name, any replacement ymap names from lessons 31–32, resource folder.",
      "That walk is the gate. If you needed the video, the compound is not yours yet — close the video and walk it again.",
    ],
    clips: [],
    videoId: "",
    videoNote: "No video. The drive is the teacher. One peek at lesson 33's steps if you are stuck, then close them.",
    tips: [
      {
        text: "Cfx Part 4 if you forgot extents, flags, or this_is_a_map — not a second tutorial on gates.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
    ],
    checklist: [
      "Video off",
      "Drove in and parked",
      "Walked the fence both ways",
      "Nothing floating",
      "Ymap names in notes",
    ],
  },
  {
    id: 39,
    classId: "area-edit",
    kind: "project",
    title: "A sliding gate that moves",
    doneWhen:
      "The compound drive-through uses a sliding gate: origin at the bottom corner, Special Attribute Sliding Door (8), Dynamic and Enable Door Physics — it slides in-game. No lock script.",
    intro:
      "Lesson 33's gate sat there. Today the engine slides it. Official Cfx/ook_3D Part 8 is the door-and-gate video. Template {{prop_facgate_07b.ydr}}. Part 7 is extra if you wanted a looping mesh animation instead. You are not writing qb-doorlock.",
    dont: "Do not install a lock script. Do not use Normal Door (7) on a sliding gate — that makes it swing. Do not leave the origin at the mesh centre. Do not start a garage door today.",
    steps: [
      "Finish the compound (lessons 33–34) so you have a drive-through. You need a gate mesh: steal {{prop_facgate_07b.ydr}} as the template (Cfx Part 2 export if you do not have it), or align your own flat gate to that template. Part 8 is Slow — it starts at 0.75×. Pause after every origin click.",
      "Blender: import the template. Align YOUR gate mesh to it. Select the gate mesh, Mesh → Snap → Cursor to Selected. Object mode: Object → Set Origin → Origin to 3D Cursor. For a sliding gate the origin is the bottom corner, not a hinge. [[Ctrl+A]] Apply All Transforms.",
      "Convert your mesh to a Drawable. Delete the template door mesh, unparent yours, parent it to the template Armature/Drawable. Add a Copy Transforms constraint: Target = the Armature, Bone = the template door bone. If you scaled collision, make a new Bound Composite and parent the collision to it.",
      "New YTYP archetype. Special Attribute: Sliding Door (8) — not Normal Door (7). Archetype flags: Dynamic, and Enable Door Physics. Unique name xn_slidegate_01.",
      "Export {{.ydr}} and {{.ytyp}}. Stream them. CodeWalker: put that archetype on the compound opening (replace the sitting gate or add a new entity). Calculate Extents and Flags. Manifest Generator. Restart localhost.",
      "Walk up. The engine should slide it. If it swings, you used attribute 7. If it does nothing, the origin is wrong or the flags are missing. Write the archetype and template name in notes. Part 7 is only if you wanted a looping animation instead of door physics.",
    ],
    clips: [
      { label: "Cfx Part 8: doors and sliding gates (official)", start: 0, videoId: "ajqNHqB8mYw" },
      { label: "Cfx Part 7: map animation (extra — not door physics)", start: 0, videoId: "11EXhLYfJLs" },
    ],
    videoId: "",
    videoNote:
      "Cfx Part 8 is the sliding-gate video. Origin at the bottom corner. Sliding Door (8). Part 7 is extra looping animation, not the gate itself.",
    tips: [
      {
        text: "Sliding door / gate: template {{prop_facgate_07b.ydr}}, origin at the bottom corner, Special Attribute Sliding Door (8), flags Dynamic and Enable Door Physics.",
        source: "Cfx Part 8",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-8/",
      },
      {
        text: "Swinging doors use a different template and Normal Door (7) at the hinge. Garage doors are Garage Door (5) at the bottom centre — not today.",
        source: "Cfx Part 8",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-8/",
      },
      {
        text: "Part 7 is UV or armature clip dictionaries that loop. A compound gate that the engine slides is Part 8, not a lock resource.",
        source: "Cfx Part 7",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-7/",
      },
    ],
    checklist: [
      "Origin at the bottom corner",
      "Special Attribute Sliding Door (8)",
      "Dynamic + Enable Door Physics",
      "Template was prop_facgate_07b",
      "Gate slides in-game — no lock script",
    ],
  },

  // ── Two vanilla shells into one drawable ─────────────────────────────
  {
    id: 35,
    classId: "building-join",
    title: "Two neighbouring shells — export",
    doneWhen: "Two small adjacent vanilla buildings sit in one Blender file in world space — still two objects — with both archetype names and owning {{.ymap}} filenames in notes.",
    intro:
      "Yes, you can make two base buildings into one. Today you only steal both. The join is tomorrow. Neighbouring kiosks, garages, beach huts — not towers, not a PD.",
    dont: "Do not export interiors or {{.ytyp}} rooms. Do not Join yet. Do not Boolean. Do not pick buildings that do not touch or nearly touch. Do not pick MRPD, Pillbox, or two high-rises.",
    steps: [
      "CodeWalker, Enable DLCs. Fly to two small buildings that share a wall or a tiny alley. Click each. Write both archetype names and both owning {{.ymap}} filenames in notes.",
      "If the details show a {{.ydd}}, that is a dictionary — export that file. A lonely {{.ydr}} that is only a sign is the wrong steal.",
      "RPF Explorer: export both drawables, Save All Textures for each. Export both owning ymaps as XML so they land in world space. Export the world {{.ybn}} files that hug both footprints, including hi@ if they exist.",
      "Blender: Sollumz import both. [[V]] Find Missing Textures. They should sit next to each other as in the city. If one is at the origin and the other is miles away, you missed a ymap import.",
      "Two collections: vanilla_a and vanilla_b. Do not Join. Save as xn_joined_01.blend. The notes with both names are the lesson.",
    ],
    clips: [
      { label: "Cfx Part 2: export and import (official)", start: 0, videoId: "fCQ5JlbWcSE" },
      { label: "RoyalT: export XMLs from CodeWalker", start: 0, videoId: "K_Kk4n_-Z8s" },
    ],
    videoId: "",
    videoNote: "Official Cfx/ook_3D Part 2 is Slow — do the export twice, once per building. Pause after every file. RoyalT is the same job.",
    tips: [
      {
        text: "Sollumz interiors start by importing from CodeWalker as reference. Same import for shells you will join — still reference until you convert YOUR drawable.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/importing-from-codewalker",
      },
      {
        text: "Cfx Part 2 is export XML, Save All Textures, import, Find Missing Textures. Two buildings means two passes, one .blend.",
        source: "Cfx Part 2",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
      },
    ],
    checklist: [
      "Two neighbouring small buildings, not a PD",
      "Both drawables and textures exported",
      "Both owning .ymap names in notes",
      "Both sit side by side in Blender",
      "Not joined yet",
    ],
  },
  {
    id: 36,
    classId: "building-join",
    kind: "project",
    title: "One drawable from two shells",
    doneWhen: "One drawable named xn_joined_01 covers both footprints: a connecting piece in the gap, origin at the combined base, transforms applied — and it reads as one building from 50 m.",
    intro:
      "The engine wants one object with one origin. Sollumz Convert to Drawable on several meshes makes one parent and several models. That is one building. The connecting box is what stops it looking like two shops with a plank.",
    dont: "Do not Boolean (Union) two Rockstar meshes — dirty holes, a week of regret. Do not [[Ctrl+J]] the imported vanilla as a first move; Join dumps modifiers and can steal the origin. Do not glue two MLOs. Do not start a third building.",
    steps: [
      "Keep both ghosts. Collection vanilla_ref. [[H]] hide them while you block, unhide to measure.",
      "The gap: [[Shift+A]] Mesh → Cube. Scale it to fill the alley or the shared wall. Typed numbers. This piece is why two shops become one massing from across the road.",
      "Pick one method and stop. (A) Keep Rockstar's look: select both imported shells AND the connecting box, Sollumz Tools → Drawable → Convert to Drawable. Rename the parent xn_joined_01. (B) Safer if the import is a mess: hide vanilla, block a new combined shell from boxes that covers both footprints, convert that instead.",
      "Join is only for YOUR new boxes, never as the first trick on vanilla. Select the new pieces, click last the one that should keep the origin, [[Ctrl+J]] (Object → Join). Then Convert to Drawable.",
      "[[Ctrl+A]] Apply All Transforms. Origin at the ground centre of the combined footprint: [[Shift+S]] cursor to the midpoint, then Origin to 3D Cursor. Check the N panel: location is the combined base, scale 1,1,1.",
      "Orbit from 50 m with ref_human at a door. It must read as one building. Save xn_joined_01.blend.",
    ],
    clips: [
      { label: "Cfx Part 3: drawable in Blender (official)", start: 0, videoId: "FOBlazpGIhA" },
      { label: "Grant: blocking from a cube (the connecting piece)", start: 0, videoId: "F_JK9eaYYTQ" },
    ],
    videoId: "",
    videoNote: "Official Part 3 is Slow for Convert to Drawable. Grant is only for blocking the connecting box. Pause before you convert.",
    tips: [
      {
        text: "Select all the objects, Convert to Drawable. One empty parent named Drawable, children become Drawable models. Rename the parent. That is one {{.ydr}}.",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
      },
      {
        text: "Join ([[Ctrl+J]]) merges selected objects into the last selected (active) one. Same type only. Modifiers are not applied — Apply first if you Join.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/join.html",
      },
      {
        text: "Apply object transforms before export. Scale that is not 1,1,1 is a silent size bug in-game.",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
      },
    ],
    checklist: [
      "Connecting piece in the gap",
      "One drawable parent xn_joined_01",
      "Origin at combined base, scale 1,1,1",
      "Reads as one building from 50 m",
      "Vanilla interiors not converted",
    ],
  },
  {
    id: 37,
    classId: "building-join",
    kind: "project",
    title: "Both gone, one standing",
    doneWhen: "In-game both vanilla buildings are gone and xn_joined_01 stands on that plot, streamed, walked around the perimeter — nothing doubled, no leftover vanilla wall.",
    intro:
      "Two ymap entities out, one entity in. Same replacement trick as moving a gate: edited vanilla ymaps keep their original filenames.",
    dont: "Do not leave the vanilla shells in the ymap. Two old plus one new is three buildings. Do not script interiors today. A walkable inside that spans both footprints is a new MLO, later.",
    steps: [
      "Export the combined drawable (and a {{.ytyp}} if Sollumz offers Export with ytyp). Unique archetype name xn_joined_01.",
      "CodeWalker project. Add both owning vanilla ymaps. Delete Entity for both building shells you stole — not the pavement unless it fights your mesh.",
      "New entity: archetype xn_joined_01. Copy the location from one deleted building, then nudge so the combined origin sits on the plot. Typed numbers in the details panel.",
      "Calculate Extents and Flags. Manifest Generator. Stream the new {{.ydr}} / {{.ytyp}} plus the edited vanilla ymaps under their original names. this_is_a_map 'yes'. Restart localhost.",
      "Stand where the gap was. One building. Walk the perimeter. If a vanilla wall remains, you missed an entity or a second ymap.",
      "Invisible wall on the old footprints: the world {{.ybn}} is still there. Cfx Part 5 — hole or replace the collision for both footprints, keep filenames. Do not skip if you cannot walk the combined outline.",
    ],
    clips: [
      { label: "Cfx Part 4: place and stream (official)", start: 0, videoId: "dVBO3_ZGL_Q" },
      { label: "Cfx Part 5: world collision (official)", start: 0, videoId: "UN7iaK5ADpk" },
      { label: "Tobii: modifying ymaps", start: 0, videoId: "VDoAjV3kv2g" },
    ],
    videoId: "",
    videoNote: "Part 4 is Slow for the new entity. Tobii for deleting the two vanilla shells from the ymap. Part 5 only if an invisible wall remains.",
    tips: [
      {
        text: "Stream edited vanilla ymaps under their original names so they replace, not duplicate.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        text: "Cfx Part 5 — Selection → Collision, export XML, edit, export, keep filenames.",
        source: "Cfx Part 5",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-5/",
      },
      {
        text: "If it shows in CodeWalker but not in-game, generate _manifest.ymf.",
        source: "Sollumz FAQ",
        url: "https://docs.sollumz.org/support/faq",
      },
    ],
    checklist: [
      "Both vanilla shells deleted from their ymaps",
      "xn_joined_01 placed on the plot",
      "Original ymap filenames streamed",
      "Perimeter walked — one building",
      "No leftover vanilla wall",
    ],
  },
  {
    id: 38,
    classId: "building-join",
    kind: "project",
    title: "Walk the joined building — video off",
    doneWhen: "Same plot, no tutorial: walk the perimeter, stand in the old gap, notes list both old {{.ymap}} names and xn_joined_01.",
    intro:
      "Ugly in-game beats watching. Two buildings are one when you can walk them without a video.",
    dont: "Do not start a second pair. Do not open Part 3. One peek at lesson 36–37's steps if you are lost, then close them.",
    steps: [
      "Headphones: nothing. Walk where the alley was. Walk the four sides. Look up at the roofline.",
      "If you see two buildings, a seam like a plank, or a ghost of the old shops, fix that — then walk again.",
      "Write in notes: both old ymap names, new archetype, resource folder, whether you used method A (vanilla look) or B (new boxes).",
      "That walk is the gate. If you needed the video, it is not one building yet.",
    ],
    clips: [],
    videoId: "",
    videoNote: "No video. The walk is the teacher. One peek at lessons 36–37 if you are stuck, then close them.",
    tips: [
      {
        text: "Cfx Part 4 if you forgot extents, flags, or this_is_a_map — not a second join tutorial.",
        source: "Cfx Part 4",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
    ],
    checklist: [
      "Video off",
      "Walked the old gap",
      "Walked the perimeter",
      "Reads as one building",
      "Names in notes",
    ],
  },
];

export const LESSONS: Lesson[] = [...CORE_LESSONS, ...EXTRA_LESSONS];
export const getLesson = (id: number) => LESSONS.find((l) => l.id === id);
export const getClass = (id: string) => CLASSES.find((c) => c.id === id);
export const getTopic = (id: string) => TOPICS.find((t) => t.id === id);
export const topicPath = (topic: Topic) => topic.hub ?? `/topics/${topic.id}`;

const classKey = (lesson: Lesson) => lesson.sort ?? lesson.id * 10;

/** Catalogue order: CLASSES sequence, then sort/id inside a class. */
export const lessonsInPathOrder = () => {
  const classOrder = CLASSES.map((c) => c.id);
  return [...LESSONS].sort(
    (a, b) => classOrder.indexOf(a.classId) - classOrder.indexOf(b.classId) || classKey(a) - classKey(b),
  );
};

export const lessonsOfClass = (classId: string) =>
  LESSONS.filter((l) => l.classId === classId).sort((a, b) => classKey(a) - classKey(b));
export const classesOfTopic = (topic: TopicId) => CLASSES.filter((c) => c.topic === topic);
export const lessonsOfTopic = (topic: TopicId) =>
  lessonsInPathOrder().filter((l) => getClass(l.classId)?.topic === topic);
export const topicOfLesson = (lesson: Lesson) => getTopic(getClass(lesson.classId)!.topic)!;
