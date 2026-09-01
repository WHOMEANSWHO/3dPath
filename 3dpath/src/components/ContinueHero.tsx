import { Link } from "react-router-dom";
import { getClass, topicOfLesson, type Lesson } from "../data/catalogue";
import { classProgress, verdictOf } from "../lib/progress";
import { recordOf, type AppState } from "../lib/store";
import Bar from "./Bar";
import StatusChip from "./StatusChip";

export default function ContinueHero({ lesson, state }: { lesson: Lesson; state: AppState }) {
  const cls = getClass(lesson.classId)!;
  const topic = topicOfLesson(lesson);
  const prog = classProgress(state, cls.id);
  const rec = recordOf(state, lesson.id);
  return (
    <section aria-label="Continue" className="card overflow-hidden border-l-2 border-l-amber">
      <div className="flex flex-col gap-6 p-6 desk:flex-row desk:items-center desk:p-8">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.74rem] text-faint">
            {topic.name} <span className="text-line2">/</span> {cls.name}
          </p>
          <h2 className="display mt-2 text-3xl leading-tight font-bold desk:text-4xl">{lesson.title}</h2>
          {lesson.kind === "project" ? (
            <span className="stamp mt-2 inline-flex border-amber/50 bg-amberdim text-amber2">Project</span>
          ) : null}
          <p className="mt-2 max-w-[52ch] text-[0.9rem] leading-relaxed text-muted">
            Done when: {lesson.doneWhen}
          </p>
          <div className="mt-3">
            <StatusChip verdict={verdictOf(rec)} />
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-4 desk:w-72">
          <div>
            <div className="mb-1.5 flex justify-between font-mono text-[0.7rem] text-faint">
              <span>{cls.name}</span>
              <span>
                {prog.done}/{prog.total}
              </span>
            </div>
            <Bar done={prog.done} total={prog.total} />
          </div>
          <Link
            to={`/lessons/${lesson.id}`}
            className="flex h-12 items-center justify-center rounded-[4px] bg-amber px-6 text-[0.95rem] font-semibold text-night transition-colors hover:bg-amber2"
          >
            Continue lesson
          </Link>
        </div>
      </div>
    </section>
  );
}
