import { Link } from "react-router-dom";
import Bar from "../components/Bar";
import FileTag from "../components/FileTag";
import LessonRow from "../components/LessonRow";
import { getClass, getLesson, getTopic, lessonsOfClass } from "../data/catalogue";
import { classProgress } from "../lib/progress";
import { recordOf, useAppState } from "../lib/store";

const CLASS_ID = "area-edit";

const JOBS = [
  {
    n: "01",
    lessonId: 31,
    label: "Move a gate",
    text: "Steal a driveway. Add the city's ymap to the project, nudge an outdoor gate, stream it under the original name.",
  },
  {
    n: "02",
    lessonId: 32,
    label: "Clear a lot",
    text: "Bins, bollards, plants — gone. Neighbouring buildings stay. This is not deleting a shop.",
  },
  {
    n: "03",
    lessonId: 33,
    label: "Fence a compound",
    text: "Open ground, a fence, a gate on a drive-through. Walk it. Drive in.",
  },
  {
    n: "04",
    lessonId: 34,
    label: "Drive it — video off",
    text: "Same compound, no tutorial. If you needed the video, it is not yours yet.",
  },
  {
    n: "05",
    lessonId: 39,
    label: "Sliding gate",
    text: "The engine slides it. Origin at the bottom corner, Sliding Door (8). Not a lock script.",
  },
] as const;

export default function Areas() {
  const state = useAppState();
  const topic = getTopic("areas")!;
  const cls = getClass(CLASS_ID)!;
  const prog = classProgress(state, CLASS_ID);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex items-start gap-5">
        <span aria-hidden className="display text-6xl leading-none font-bold text-line2">
          {String(topic.n).padStart(2, "0")}
        </span>
        <div>
          <h1 className="display text-3xl leading-tight font-bold desk:text-4xl">{topic.name}</h1>
          <p className="mt-1.5 max-w-[60ch] text-[0.92rem] leading-relaxed text-muted">{topic.blurb}</p>
          <div className="mt-2.5">
            <FileTag>{topic.stamp}</FileTag>
          </div>
        </div>
      </header>

      <aside className="card border-l-2 border-l-amber/70 p-5">
        <p className="display text-lg font-semibold">Not a building</p>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
          This page is yards, car parks, waste ground, gates and fences. Interiors are{" "}
          <Link to="/topics/interiors" className="text-amber hover:underline">
            MLOs
          </Link>
          . Shells you read from the road are{" "}
          <Link to="/topics/buildings" className="text-amber hover:underline">
            full buildings
          </Link>
          . Do the{" "}
          <Link to="/lessons/16" className="text-amber hover:underline">
            CodeWalker tour
          </Link>{" "}
          first. A first new ymap (lesson 17) helps. A mesh that sits is lessons 31–34. A sliding gate the engine
          opens is lesson 39. Lock scripts are not this school.
        </p>
      </aside>

      <section aria-label="Jobs" className="grid grid-cols-1 gap-4 desk:grid-cols-2">
        {JOBS.map((job) => {
          const lesson = getLesson(job.lessonId)!;
          return (
            <Link
              key={job.n}
              to={`/lessons/${job.lessonId}`}
              className="card group flex flex-col p-5 transition-colors hover:border-line2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="display text-3xl leading-none font-bold text-line2 transition-colors group-hover:text-amber/70">
                  {job.n}
                </span>
                {lesson.kind === "project" ? (
                  <span className="stamp border-amber/50 bg-amberdim text-amber2">Project</span>
                ) : null}
              </div>
              <h2 className="display mt-3 text-xl leading-tight font-semibold">{job.label}</h2>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">{job.text}</p>
              <p className="mt-3 font-mono text-[0.7rem] text-faint">Lesson {job.lessonId}</p>
            </Link>
          );
        })}
      </section>

      <section aria-label={cls.name} className="card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Link to={`/classes/${cls.id}`} className="display text-xl font-semibold hover:text-amber">
            {cls.name}
          </Link>
          <span className="font-mono text-[0.7rem] text-faint">
            {prog.done}/{prog.total} complete
          </span>
        </div>
        <p className="mt-1 text-[0.85rem] text-muted">{cls.blurb}</p>
        <div className="mt-3">
          <Bar done={prog.done} total={prog.total} />
        </div>
        <div className="mt-3 space-y-0.5">
          {lessonsOfClass(cls.id).map((l) => (
            <LessonRow key={l.id} lesson={l} rec={recordOf(state, l.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}
