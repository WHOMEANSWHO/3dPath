import type { Lesson } from "../data/catalogue";
import { toggleCheck, type LessonRecord } from "../lib/store";

export default function CheckItems({ lesson, rec }: { lesson: Lesson; rec: LessonRecord }) {
  const done = lesson.checklist.filter((_, i) => rec.checks[i]).length;
  return (
    <section aria-label="Checklist" className="card p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="display text-xl font-semibold">Checklist</h2>
        <span className="font-mono text-[0.72rem] text-faint">
          {done}/{lesson.checklist.length}
        </span>
      </div>
      <ul className="mt-3 space-y-1">
        {lesson.checklist.map((item, i) => (
          <li key={i}>
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-[4px] px-2 py-2 hover:bg-panel2">
              <input
                type="checkbox"
                checked={!!rec.checks[i]}
                onChange={() => toggleCheck(lesson.id, i)}
                className="tick"
              />
              <span
                className={`text-[0.9rem] leading-relaxed ${
                  rec.checks[i] ? "text-faint line-through decoration-teal/50" : "text-paper"
                }`}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
