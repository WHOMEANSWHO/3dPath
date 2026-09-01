import { Link } from "react-router-dom";
import { getLesson } from "../data/catalogue";
import { MONTH_TRACK, SESSION_HOURS } from "../data/monthTrack";
import { formatShort, isPast, isToday } from "../lib/dates";
import { recordOf, type AppState } from "../lib/store";

export default function MonthStrip({ state }: { state: AppState }) {
  return (
    <section aria-label="Month track" className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="display text-xl font-semibold">September track</h2>
        <p className="font-mono text-[0.7rem] text-faint">
          Tue / Thu / Fri, {SESSION_HOURS} hours a session
        </p>
      </div>

      <ol className="mt-4 grid grid-cols-4 gap-1.5 desk:grid-cols-12">
        {MONTH_TRACK.map((slot) => {
          const lesson = getLesson(slot.lessonId)!;
          const rec = recordOf(state, slot.lessonId);
          const today = isToday(slot.date);
          const state_cls =
            rec.status === "complete"
              ? "border-teal/60 bg-tealdim text-teal2"
              : rec.status === "gate-failed"
                ? "border-rust/60 bg-rustdim text-rust2"
                : today
                  ? "border-amber bg-amberdim text-amber2"
                  : isPast(slot.date)
                    ? "border-line text-faint"
                    : "border-line text-muted";
          return (
            <li key={slot.date}>
              <Link
                to={`/lessons/${slot.lessonId}`}
                title={lesson.title}
                className={`flex min-h-11 flex-col justify-center rounded-[4px] border px-2 py-1.5 transition-colors hover:border-line2 ${state_cls}`}
              >
                <span className="font-mono text-[0.64rem] leading-tight">{formatShort(slot.date)}</span>
                <span className="truncate text-[0.7rem] leading-tight">{lesson.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-[0.8rem] text-faint">
        Mon, Wed, Sat and Sun are off. No extra "quick hour" — the rest days are part of the plan.
      </p>
    </section>
  );
}
