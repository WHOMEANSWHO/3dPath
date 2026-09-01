// Reference shelf: file formats, official docs, and two short field notes.

export { OFFICIAL_SHELF } from "./reading";

export interface FormatEntry {
  ext: string;
  name: string;
  text: string;
}

export const FORMATS: FormatEntry[] = [
  { ext: ".ydr", name: "Drawable", text: "One renderable model: mesh, shaders, embedded textures, optionally its bounds. Your crate is one of these." },
  { ext: ".ydd", name: "Drawable dictionary", text: "Several drawables in one file. Buildings often ship as dictionaries — shell and details together. Two neighbouring shops may each be a model inside a .ydd; export the dictionary, then pick the shells." },
  { ext: ".ytd", name: "Texture dictionary", text: "A bundle of textures other files refer to by name. Shared textures live here instead of being embedded everywhere." },
  { ext: ".ybn", name: "Static collision", text: "Collision bounds for the world. Props usually embed bounds; map collision ships in these." },
  { ext: ".ytyp", name: "Archetype definitions", text: "What things are: names, models, flags, and MLO interiors with their rooms and portals." },
  { ext: ".ymap", name: "Placements", text: "Where things go: entities positioned in the world. The city is thousands of these. A new filename adds stuff; the vanilla filename replaces the city's file." },
];

export interface FieldNote {
  id: string;
  title: string;
  paragraphs: string[];
}

export const FIELD_NOTES: FieldNote[] = [
  {
    id: "scale",
    title: "Scale sanity",
    paragraphs: [
      "The engine's human is about 1.8 m. Doors 2.1 by 0.9 m. Ceilings 2.6 to 3 m. Stair risers about 0.17 m. Counters 0.9 m.",
      "Keep a ref_human block in every scene and measure against it, not against your eyes. When something feels wrong in-game, it is nearly always scale before it is anything else.",
    ],
  },
  {
    id: "vertex-colour",
    title: "Vertex colour, briefly",
    paragraphs: [
      "GTA interiors are lit by paint: vertex colour tells the engine how much ambient light each part of a mesh receives. GREEN inside MLOs, RED outdoors — mostly low values, never a flat 255. Sollumz FAQ is the short version.",
      "Judge the result in-game at midnight and at noon. The Blender viewport has opinions about lighting; the engine has the facts.",
    ],
  },
  {
    id: "outdoor-ymap",
    title: "Outdoors is a ymap",
    paragraphs: [
      "Props you see in a street, a car park, or a yard live in a .ymap. Props inside an MLO live in the interior's .ytyp. Mixing those up is how a crate appears in the void or a bin refuses to leave a lot.",
      "To add fences on empty ground, save a new ymap name. To move or delete the city's own gate, stream the vanilla ymap under its original name. A new name plus a moved vanilla entity is how you get two gates.",
    ],
  },
  {
    id: "two-into-one",
    title: "Two buildings, one drawable",
    paragraphs: [
      "Yes: two neighbouring vanilla shells can become one .ydr. Sollumz Convert to Drawable on several meshes makes one parent and several models — that is one building to the engine. Fill the gap with a new box so it reads as one massing from across the road.",
      "No: do not Boolean two Rockstar meshes together, and do not glue two MLOs. A walkable interior that spans both footprints is one new interior you model, not two vanilla ytyps joined.",
    ],
  },
];
