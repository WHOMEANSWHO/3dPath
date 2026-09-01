// Official pages to read beside each lesson. Attributed, no Discord dumps.

export interface DocLink {
  title: string;
  source: string;
  url: string;
}

export const readingFor = (lessonId: number): DocLink[] => READING[lessonId] ?? [];

const READING: Record<number, DocLink[]> = {
  1: [
    {
      title: "Navigate the 3D Viewport",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/editors/3dview/navigate/navigation.html",
    },
    {
      title: "Input preferences (emulate 3-button mouse)",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/editors/preferences/input.html",
    },
  ],
  2: [
    {
      title: "Transform basics — grab, rotate, scale",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/transform/basics.html",
    },
  ],
  3: [
    {
      title: "Edit Mode",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/introduction.html",
    },
    {
      title: "Loop Cut",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/tools/loop.html",
    },
    {
      title: "Face orientation overlay",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/editors/3dview/display/overlays.html",
    },
  ],
  4: [
    {
      title: "Apply object transforms",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
    },
    {
      title: "Object origins",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/origin.html",
    },
    {
      title: "Creating GTAV assets in Blender",
      source: "Cfx Part 3",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
    },
  ],
  5: [
    {
      title: "Scene units",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/scene/properties.html",
    },
    {
      title: "Creating GTAV assets (vertex colour / scale habits)",
      source: "Cfx Part 3",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
    },
  ],
  6: [
    {
      title: "Apply object transforms",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
    },
    {
      title: "Object origins",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/origin.html",
    },
    {
      title: "Creating static meshes (what Sollumz wants next)",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
    },
  ],
  7: [
    {
      title: "Tooling & workspace setup (Blender, Sollumz, CodeWalker)",
      source: "Cfx Part 1",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-1/",
    },
    {
      title: "Creating GTAV assets in Blender",
      source: "Cfx Part 3",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
    },
    {
      title: "Creating static meshes — convert, embed, export",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
    },
  ],
  8: [
    {
      title: "Collision editing and creation",
      source: "Cfx Part 5",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-5/",
    },
    {
      title: "Creating static collisions",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-collisions",
    },
    {
      title: "Collision flags / missing bounds (FAQ)",
      source: "Sollumz FAQ",
      url: "https://docs.sollumz.org/support/faq",
    },
  ],
  9: [
    {
      title: "Placing assets & a FiveM map resource",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
    {
      title: "Resource manifest — this_is_a_map and data_file",
      source: "Cfx docs",
      url: "https://docs.fivem.net/docs/scripting-reference/resource-manifest/",
    },
    {
      title: "Introduction to resources",
      source: "Cfx docs",
      url: "https://docs.fivem.net/docs/scripting-manual/introduction/introduction-to-resources/",
    },
    {
      title: "Getting files ready to stream",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
    },
  ],
  10: [
    {
      title: "Creating interiors — the nine steps",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors",
    },
    {
      title: "Creating ytyp — limbo, rooms, bounds from selection",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
    },
  ],
  11: [
    {
      title: "Portals — Room → Limbo, flip direction",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
    },
  ],
  12: [
    {
      title: "Texturing and vertex colour (Color 1, green ~0.2)",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/texturing",
    },
    {
      title: "Why props glow at night — green inside, red outside",
      source: "Sollumz FAQ",
      url: "https://docs.sollumz.org/support/faq",
    },
  ],
  13: [
    {
      title: "Creating GTAV assets in Blender",
      source: "Cfx Part 3",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
    },
    {
      title: "Creating interiors — pick a building",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors",
    },
  ],
  14: [
    {
      title: "Creating ytyp — shell as entity, Room → Limbo",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
    },
    {
      title: "Interior collisions (hole in the world ybn)",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/collisions",
    },
    {
      title: "Placing the interior in a ymap",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
  ],
  15: [
    {
      title: "LODs — HD/LOD ymaps, parent index, manifest",
      source: "Cfx Part 6",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-6/",
    },
  ],
  16: [
    {
      title: "CodeWalker readme — WASD, what a ymap is",
      source: "CodeWalker (GitHub)",
      url: "https://github.com/dexyfex/CodeWalker",
    },
    {
      title: "Exploring & exporting GTAV assets",
      source: "Cfx Part 2",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
    },
    {
      title: "Tooling & workspace setup",
      source: "Cfx Part 1",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-1/",
    },
  ],
  17: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
    {
      title: "Resource manifest — this_is_a_map",
      source: "Cfx docs",
      url: "https://docs.fivem.net/docs/scripting-reference/resource-manifest/",
    },
    {
      title: "MLO in CodeWalker but not in-game (_manifest.ymf)",
      source: "Sollumz FAQ",
      url: "https://docs.sollumz.org/support/faq",
    },
  ],
  18: [
    {
      title: "Introduction to resources",
      source: "Cfx docs",
      url: "https://docs.fivem.net/docs/scripting-manual/introduction/introduction-to-resources/",
    },
    {
      title: "CodeWalker project files",
      source: "CodeWalker (GitHub)",
      url: "https://github.com/dexyfex/CodeWalker",
    },
  ],
  19: [
    {
      title: "Add mesh primitives",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/primitives.html",
    },
    {
      title: "Bevel",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/editing/edge/bevel.html",
    },
    {
      title: "Save and load",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/files/blend/save_load.html",
    },
  ],
  20: [
    {
      title: "Loop Cut",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/tools/loop.html",
    },
    {
      title: "Inset Faces",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/editing/face/inset_faces.html",
    },
    {
      title: "Extrude",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/editing/mesh/extrude.html",
    },
  ],
  21: [
    {
      title: "Apply object transforms",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
    },
    {
      title: "Object origins",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/origin.html",
    },
    {
      title: "Merge by Distance",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/editing/mesh/merge.html",
    },
  ],
  22: [
    {
      title: "Loop Cut (if you must peek a key)",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/modeling/meshes/tools/loop.html",
    },
    {
      title: "Transform basics",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/transform/basics.html",
    },
  ],
  23: [
    {
      title: "Creating static meshes — convert, embed, export",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
    },
    {
      title: "Creating static collisions",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-collisions",
    },
    {
      title: "Placing assets & a FiveM map resource",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
  ],
  24: [
    {
      title: "Portals — Room → Limbo, flip direction",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
    },
    {
      title: "Why props glow at night — green inside, red outside",
      source: "Sollumz FAQ",
      url: "https://docs.sollumz.org/support/faq",
    },
  ],
  25: [
    {
      title: "Creating GTAV assets in Blender",
      source: "Cfx Part 3",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
    },
  ],
  26: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
    {
      title: "MLO in CodeWalker but not in-game (_manifest.ymf)",
      source: "Sollumz FAQ",
      url: "https://docs.sollumz.org/support/faq",
    },
  ],
  27: [
    {
      title: "Exploring & exporting GTAV assets",
      source: "Cfx Part 2",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
    },
    {
      title: "Importing from CodeWalker (reference, not the finished MLO)",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/importing-from-codewalker",
    },
    {
      title: "Creating interiors — pick a building",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors",
    },
  ],
  28: [
    {
      title: "Creating GTAV assets in Blender",
      source: "Cfx Part 3",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
    },
    {
      title: "Creating interiors — modelling",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors",
    },
  ],
  29: [
    {
      title: "Creating ytyp — limbo, rooms, portals",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
    },
    {
      title: "Interior collisions",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/collisions",
    },
    {
      title: "Placing the interior in a ymap",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
  ],
  30: [
    {
      title: "Collision editing — hole in the world ybn",
      source: "Cfx Part 5",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-5/",
    },
    {
      title: "Interior collisions (doorway hole)",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/collisions",
    },
    {
      title: "MLO in CodeWalker but not in-game (_manifest.ymf)",
      source: "Sollumz FAQ",
      url: "https://docs.sollumz.org/support/faq",
    },
  ],
  31: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
    {
      title: "Door creation (sliding gates — later, lesson 39)",
      source: "Cfx Part 8",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-8/",
    },
    {
      title: "CodeWalker releases & readme",
      source: "GitHub",
      url: "https://github.com/dexyfex/CodeWalker",
    },
  ],
  32: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
    {
      title: "CodeWalker releases & readme",
      source: "GitHub",
      url: "https://github.com/dexyfex/CodeWalker",
    },
  ],
  33: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
    {
      title: "Resource manifest (this_is_a_map)",
      source: "Cfx docs",
      url: "https://docs.fivem.net/docs/scripting-reference/resource-manifest/",
    },
  ],
  34: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
  ],
  35: [
    {
      title: "Exploring & exporting GTAV assets",
      source: "Cfx Part 2",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
    },
    {
      title: "Importing from CodeWalker",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-interiors/importing-from-codewalker",
    },
  ],
  36: [
    {
      title: "Creating static meshes — convert to drawable",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
    },
    {
      title: "Join (Ctrl+J) — last selected keeps the origin",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/join.html",
    },
    {
      title: "Apply object transforms",
      source: "Blender manual",
      url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
    },
    {
      title: "Creating GTAV assets in Blender",
      source: "Cfx Part 3",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
    },
  ],
  37: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
    {
      title: "Collision editing",
      source: "Cfx Part 5",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-5/",
    },
    {
      title: "Creating static collisions",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-collisions",
    },
  ],
  38: [
    {
      title: "Placing assets & creating simple map mods",
      source: "Cfx Part 4",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
    },
  ],
  39: [
    {
      title: "Part 8 — Door creation (sliding gates)",
      source: "Cfx Part 8",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-8/",
    },
    {
      title: "Part 7 — Map animation (extra looping clips)",
      source: "Cfx Part 7",
      url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-7/",
    },
    {
      title: "Creating static meshes",
      source: "Sollumz docs",
      url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
    },
  ],
};

export const OFFICIAL_SHELF: { heading: string; links: DocLink[] }[] = [
  {
    heading: "Cfx beginner series",
    links: [
      {
        title: "Part 1 — Tooling & workspace",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-1/",
      },
      {
        title: "Part 2 — Exploring & exporting assets",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-2/",
      },
      {
        title: "Part 3 — Creating assets in Blender",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-3/",
      },
      {
        title: "Part 4 — Placing assets & map mods",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-4/",
      },
      {
        title: "Part 5 — Collision",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-5/",
      },
      {
        title: "Part 6 — LODs",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-6/",
      },
      {
        title: "Part 7 — Map animation",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-7/",
      },
      {
        title: "Part 8 — Door creation",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/assets-manual/beginner-series/part-8/",
      },
      {
        title: "Resource manifest",
        source: "Cfx docs",
        url: "https://docs.fivem.net/docs/scripting-reference/resource-manifest/",
      },
    ],
  },
  {
    heading: "Sollumz",
    links: [
      {
        title: "Creating static meshes",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-meshes",
      },
      {
        title: "Creating static collisions",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-static-collisions",
      },
      {
        title: "Creating interiors",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors",
      },
      {
        title: "Creating ytyp (rooms & portals)",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/create-ytyp",
      },
      {
        title: "Texturing & vertex colour",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/tutorials/creating-interiors/texturing",
      },
      {
        title: "FAQ (glow at night, missing collision, manifest)",
        source: "Sollumz docs",
        url: "https://docs.sollumz.org/support/faq",
      },
    ],
  },
  {
    heading: "CodeWalker & Blender",
    links: [
      {
        title: "CodeWalker releases & readme",
        source: "GitHub",
        url: "https://github.com/dexyfex/CodeWalker",
      },
      {
        title: "Blender 3D Viewport navigation",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/editors/3dview/navigate/navigation.html",
      },
      {
        title: "Join (Ctrl+J)",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/join.html",
      },
      {
        title: "Apply transforms",
        source: "Blender manual",
        url: "https://docs.blender.org/manual/en/latest/scene_layout/object/editing/apply.html",
      },
    ],
  },
];
