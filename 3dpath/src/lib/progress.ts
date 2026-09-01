import { LESSONS, lessonsInPathOrder, lessonsOfClass, lessonsOfTopic, type Lesson, type TopicId } from "../data/catalogue";
import { recordOf, type AppState, type LessonRecord } from "./store";

export type Verdict = "none" | "started" | "complete" | "gate-failed";

export const verdictOf = (rec: LessonRecord): Verdict => {
  if (rec.status === "complete") return "complete";
  if (rec.status === "gate-failed") return "gate-failed";
  const touched =
    rec.notes.trim().length > 0 || rec.lastClip !== null || Object.values(rec.checks).some(Boolean);
  return touched ? "started" : "none";
};

export const classProgress = (s: AppState, classId: string) => {
  const lessons = lessonsOfClass(classId);
  const done = lessons.filter((l) => recordOf(s, l.id).status === "complete").length;
  return { done, total: lessons.length };
};

export const topicProgress = (s: AppState, topic: TopicId) => {
  const lessons = lessonsOfTopic(topic);
  const done = lessons.filter((l) => recordOf(s, l.id).status === "complete").length;
  return { done, total: lessons.length };
};

/** The lesson to continue: last visited, else the first lesson not yet complete. */
export const continueLesson = (s: AppState): Lesson => {
  if (s.lastLessonId) {
    const l = LESSONS.find((x) => x.id === s.lastLessonId);
    if (l) return l;
  }
  return lessonsInPathOrder().find((l) => recordOf(s, l.id).status !== "complete") ?? LESSONS[0];
};

/** Next lesson in catalogue order (classes are already ordered). */
export const nextLesson = (current: Lesson): Lesson | undefined => {
  const sorted = lessonsInPathOrder();
  const i = sorted.findIndex((l) => l.id === current.id);
  return sorted[i + 1];
};

export const totalProgress = (s: AppState) => {
  const done = LESSONS.filter((l) => recordOf(s, l.id).status === "complete").length;
  return { done, total: LESSONS.length };
};
