// September 2026 playlist: Tue / Thu / Fri, twelve dates.
// Follows catalogue path order — crate class sits after habits, before props.

export interface TrackSlot {
  date: string; // ISO
  lessonId: number;
}

export const MONTH_TRACK: TrackSlot[] = [
  { date: "2026-09-01", lessonId: 1 },
  { date: "2026-09-03", lessonId: 2 },
  { date: "2026-09-04", lessonId: 3 },
  { date: "2026-09-08", lessonId: 4 },
  { date: "2026-09-10", lessonId: 5 },
  { date: "2026-09-11", lessonId: 19 },
  { date: "2026-09-15", lessonId: 20 },
  { date: "2026-09-17", lessonId: 21 },
  { date: "2026-09-18", lessonId: 22 },
  { date: "2026-09-22", lessonId: 6 },
  { date: "2026-09-24", lessonId: 7 },
  { date: "2026-09-25", lessonId: 8 },
];

export const SESSION_HOURS = 5;
