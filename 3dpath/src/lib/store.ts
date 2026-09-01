import { useSyncExternalStore } from "react";
import type { Pace } from "../data/pace";

export type LessonStatus = "none" | "complete" | "gate-failed";

export interface LessonRecord {
  status: LessonStatus;
  statusAt: string | null;
  checks: Record<number, boolean>;
  notes: string;
  notesSavedAt: string | null;
  /** @deprecated migrated into videoOverride */
  videoId: string;
  videoOverride: { slow: string; fast: string };
  lastClip: number | null;
}

export interface AppState {
  lessons: Record<number, LessonRecord>;
  lastLessonId: number | null;
  pace: Pace;
}

export const EMPTY_RECORD: LessonRecord = {
  status: "none",
  statusAt: null,
  checks: {},
  notes: "",
  notesSavedAt: null,
  videoId: "",
  videoOverride: { slow: "", fast: "" },
  lastClip: null,
};

const STORAGE_KEY = "3dpath:v1";

const migrateRecord = (raw: Partial<LessonRecord> | undefined): LessonRecord => {
  const rec = { ...EMPTY_RECORD, ...raw };
  const legacy = rec.videoId || "";
  rec.videoOverride = {
    slow: rec.videoOverride?.slow || legacy,
    fast: rec.videoOverride?.fast || "",
  };
  return rec;
};

const load = (): AppState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed && typeof parsed === "object" && parsed.lessons) {
        const lessons: Record<number, LessonRecord> = {};
        for (const [k, v] of Object.entries(parsed.lessons)) {
          lessons[Number(k)] = migrateRecord(v);
        }
        return {
          lessons,
          lastLessonId: parsed.lastLessonId ?? null,
          pace: parsed.pace === "fast" ? "fast" : "slow",
        };
      }
    }
  } catch {
    /* fall through to empty */
  }
  return { lessons: {}, lastLessonId: null, pace: "slow" };
};

let state: AppState = load();
const listeners = new Set<() => void>();

const commit = (next: AppState) => {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — keep going in memory */
  }
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useAppState = () => useSyncExternalStore(subscribe, () => state);

export const recordOf = (s: AppState, id: number): LessonRecord => s.lessons[id] ?? EMPTY_RECORD;

const patch = (id: number, part: Partial<LessonRecord>) =>
  commit({
    ...state,
    lessons: { ...state.lessons, [id]: { ...recordOf(state, id), ...part } },
  });

export const toggleCheck = (id: number, index: number) => {
  const rec = recordOf(state, id);
  patch(id, { checks: { ...rec.checks, [index]: !rec.checks[index] } });
};

export const saveNotes = (id: number, notes: string) =>
  patch(id, { notes, notesSavedAt: new Date().toISOString() });

export const setStatus = (id: number, status: LessonStatus) =>
  patch(id, { status, statusAt: new Date().toISOString() });

export const setVideoId = (id: number, videoId: string) => {
  const rec = recordOf(state, id);
  patch(id, {
    videoId,
    videoOverride: { ...rec.videoOverride, [state.pace]: videoId },
  });
};

export const setLastClip = (id: number, clip: number | null) => patch(id, { lastClip: clip });

export const setPace = (pace: Pace) => {
  if (state.pace === pace) return;
  commit({ ...state, pace, lessons: { ...state.lessons } });
};

export const touchLesson = (id: number) => {
  if (state.lastLessonId !== id) commit({ ...state, lastLessonId: id });
};
