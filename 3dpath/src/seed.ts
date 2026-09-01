// Demo scenes for screenshots and quick previews, e.g. /lessons/6?scene=clip
// (or index.html#/lessons/6?scene=clip when opened as a local file).
// Writes localStorage before first render, then gets out of the way.

const routeFromLocation = () => {
  const hash = window.location.hash.replace(/^#/, "");
  if (window.location.protocol === "file:" && hash) {
    const q = hash.indexOf("?");
    return {
      path: q === -1 ? hash : hash.slice(0, q),
      search: q === -1 ? "" : hash.slice(q + 1),
    };
  }
  return { path: window.location.pathname, search: window.location.search.replace(/^\?/, "") };
};

const seedScene = () => {
  const { path, search } = routeFromLocation();
  const scene = new URLSearchParams(search).get("scene");
  if (!scene) return;
  const lessonMatch = path.match(/\/lessons\/(\d+)/);
  const currentId = lessonMatch ? Number(lessonMatch[1]) : 6;
  const rec = (extra: object) => ({
    status: "none",
    statusAt: null,
    checks: {},
    notes: "",
    notesSavedAt: null,
    videoId: "",
    videoOverride: { slow: "", fast: "" },
    lastClip: null,
    ...extra,
  });
  const doneAt = "2026-09-11T19:30:00.000Z";
  const base: Record<number, object> = {
    1: rec({ status: "complete", statusAt: "2026-09-01T18:40:00.000Z" }),
    2: rec({ status: "complete", statusAt: "2026-09-03T19:05:00.000Z" }),
    3: rec({ status: "complete", statusAt: "2026-09-04T18:55:00.000Z" }),
    5: rec({
      status: "complete",
      statusAt: "2026-09-10T19:20:00.000Z",
      notes: "Door was 1.9m — too short. Fixed to 2.1 and the room stopped feeling like a caravan.",
      notesSavedAt: "2026-09-10T19:25:00.000Z",
    }),
  };
  const scenes: Record<string, () => object> = {
    midway: () => ({ lessons: base, lastLessonId: 6, pace: "slow" }),
    clip: () => ({
      lessons: { ...base, [currentId]: rec({ lastClip: 1, checks: { 0: true, 1: true } }) },
      lastLessonId: currentId,
      pace: "slow",
    }),
    complete: () => ({
      lessons: { ...base, [currentId]: rec({ status: "complete", statusAt: doneAt, checks: { 0: true, 1: true, 2: true, 3: true, 4: true } }) },
      lastLessonId: currentId,
      pace: "slow",
    }),
    failed: () => ({
      lessons: { ...base, [currentId]: rec({ status: "gate-failed", statusAt: doneAt, checks: { 0: true, 1: true } }) },
      lastLessonId: currentId,
      pace: "slow",
    }),
  };
  const make = scenes[scene];
  if (make) localStorage.setItem("3dpath:v1", JSON.stringify(make()));
};
seedScene();
export {};
