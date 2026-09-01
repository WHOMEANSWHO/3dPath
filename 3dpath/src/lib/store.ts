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

export const STORAGE_KEY = "3dpath:v1";

declare global {
  interface Window {
    pywebview?: {
      api?: {
        save_progress: (payload: string) => Promise<string>;
        load_progress: () => Promise<string>;
      };
    };
  }
}

const migrateRecord = (raw: Partial<LessonRecord> | undefined): LessonRecord => {
  const rec = { ...EMPTY_RECORD, ...raw };
  const legacy = rec.videoId || "";
  rec.videoOverride = {
    slow: rec.videoOverride?.slow || legacy,
    fast: rec.videoOverride?.fast || "",
  };
  return rec;
};

const hydrate = (raw: string | null): AppState | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || typeof parsed !== "object" || !parsed.lessons) return null;
    const lessons: Record<number, LessonRecord> = {};
    for (const [k, v] of Object.entries(parsed.lessons)) {
      lessons[Number(k)] = migrateRecord(v);
    }
    return {
      lessons,
      lastLessonId: parsed.lastLessonId ?? null,
      pace: parsed.pace === "fast" ? "fast" : "slow",
    };
  } catch {
    return null;
  }
};

const emptyState = (): AppState => ({ lessons: {}, lastLessonId: null, pace: "slow" });

const load = (): AppState => hydrate(localStorage.getItem(STORAGE_KEY)) ?? emptyState();

let state: AppState = load();
const listeners = new Set<() => void>();

const diskSave = () => {
  const api = window.pywebview?.api;
  if (!api?.save_progress) return;
  void api.save_progress(JSON.stringify(state));
};

const commit = (next: AppState) => {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — keep going in memory */
  }
  diskSave();
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

export const exportProgressJson = () => JSON.stringify(state, null, 2);

export const importProgressJson = (raw: string) => {
  const next = hydrate(raw);
  if (!next) throw new Error("That file is not a 3dPath backup.");
  commit(next);
};

/** Copy ticks and notes to %APPDATA%\\3dPath when running inside the exe. */
export const attachDiskBackup = () => {
  const boot = async () => {
    const api = window.pywebview?.api;
    if (!api?.load_progress) return;
    try {
      const disk = await api.load_progress();
      const local = localStorage.getItem(STORAGE_KEY);
      if (!local && disk) {
        const next = hydrate(disk);
        if (next) {
          commit(next);
          return;
        }
      }
      diskSave();
    } catch {
      /* keep browser storage */
    }
  };
  window.addEventListener("pywebviewready", () => void boot());
  if (window.pywebview?.api) void boot();
};
