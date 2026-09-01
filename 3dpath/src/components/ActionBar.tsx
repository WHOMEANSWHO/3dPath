import { useNavigate } from "react-router-dom";
import type { Lesson } from "../data/catalogue";
import { nextLesson } from "../lib/progress";
import { setStatus, type LessonRecord } from "../lib/store";

interface Props {
  lesson: Lesson;
  rec: LessonRecord;
  /** fixed = pinned to the window (portrait); column = sticky at the bottom of the right column. */
  variant: "fixed" | "column";
}

export default function ActionBar({ lesson, rec, variant }: Props) {
  const navigate = useNavigate();
  const next = nextLesson(lesson);
  const complete = rec.status === "complete";

  const buttons = (
    <>
      <button
        type="button"
        onClick={() => setStatus(lesson.id, "complete")}
        disabled={complete}
        className="h-11 flex-1 rounded-[4px] bg-teal px-4 text-[0.92rem] font-semibold text-night transition-colors hover:bg-teal2 disabled:opacity-60 desk:flex-none"
      >
        {complete ? "Completed" : "Complete"}
      </button>
      <button
        type="button"
        onClick={() => setStatus(lesson.id, "gate-failed")}
        className="h-11 flex-1 rounded-[4px] border border-rust/70 px-4 text-[0.92rem] font-medium text-rust2 transition-colors hover:bg-rustdim desk:flex-none"
      >
        Repeat gate
      </button>
      <button
        type="button"
        onClick={() => next && navigate(`/lessons/${next.id}`)}
        disabled={!next}
        className={`h-11 flex-1 rounded-[4px] px-4 text-[0.92rem] transition-colors disabled:opacity-40 desk:flex-none ${
          complete
            ? "bg-amber font-semibold text-night hover:bg-amber2"
            : "border border-line text-muted hover:border-line2 hover:text-paper"
        }`}
      >
        Next lesson
      </button>
    </>
  );

  if (variant === "fixed") {
    return (
      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-night/95 backdrop-blur-sm desk:hidden">
        <div className="mx-auto flex max-w-[1080px] items-center gap-2.5 px-5 py-3">{buttons}</div>
      </footer>
    );
  }
  return (
    <footer className="sticky bottom-0 z-10 -mx-1 mt-5 hidden border-t border-line bg-night/95 px-1 pt-3 pb-1 backdrop-blur-sm desk:mt-auto desk:block">
      <div className="flex items-center gap-2.5">{buttons}</div>
    </footer>
  );
}
