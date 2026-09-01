import { Link } from "react-router-dom";
import type { Lesson } from "../data/catalogue";
import { verdictOf } from "../lib/progress";
import type { LessonRecord } from "../lib/store";
import StatusChip from "./StatusChip";

const DOT: Record<string, string> = {
  none: "bg-line2",
  started: "bg-amber",
  complete: "bg-teal",
  "gate-failed": "bg-rust",
};

export default function LessonRow({ lesson, rec }: { lesson: Lesson; rec: LessonRecord }) {
  const verdict = verdictOf(rec);
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="flex min-h-11 items-center gap-3 rounded-[4px] px-3 py-2.5 transition-colors hover:bg-panel2"
    >
      <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${DOT[verdict]}`} />
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-2">
          <span className="min-w-0 truncate text-[0.92rem] text-paper">{lesson.title}</span>
          {lesson.kind === "project" ? (
            <span className="stamp shrink-0 border-amber/50 bg-amberdim text-amber2">Project</span>
          ) : null}
        </span>
        <span className="block truncate text-[0.76rem] text-faint">{lesson.doneWhen}</span>
      </span>
      <span className="ml-auto shrink-0">
        <StatusChip verdict={verdict} />
      </span>
    </Link>
  );
}
