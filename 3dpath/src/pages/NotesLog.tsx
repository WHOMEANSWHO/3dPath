import { Link } from "react-router-dom";
import { getClass, LESSONS, topicOfLesson } from "../data/catalogue";
import { recordOf, useAppState } from "../lib/store";

export default function NotesLog() {
  const state = useAppState();
  const withNotes = LESSONS.filter((l) => recordOf(state, l.id).notes.trim().length > 0);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header>
        <h1 className="display text-3xl leading-tight font-bold desk:text-4xl">Notes</h1>
        <p className="mt-1.5 max-w-[60ch] text-[0.92rem] text-muted">
          Everything you wrote down, lesson by lesson. Start each session here.
        </p>
      </header>

      {withNotes.length === 0 ? (
        <div className="card p-6">
          <p className="text-[0.92rem] text-muted">
            Nothing yet. Notes you save inside a lesson collect here —{" "}
            <Link to="/lessons/1" className="text-amber hover:text-amber2">
              start with lesson one
            </Link>
            .
          </p>
        </div>
      ) : (
        withNotes.map((lesson) => {
          const rec = recordOf(state, lesson.id);
          const cls = getClass(lesson.classId)!;
          const topic = topicOfLesson(lesson);
          return (
            <article key={lesson.id} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link to={`/lessons/${lesson.id}`} className="display text-xl font-semibold hover:text-amber">
                  {lesson.title}
                </Link>
                <span className="font-mono text-[0.7rem] text-faint">
                  {topic.name} <span className="text-line2">/</span> {cls.name}
                  {rec.notesSavedAt
                    ? ` — saved ${new Date(rec.notesSavedAt).toLocaleDateString("en-GB")}`
                    : ""}
                </span>
              </div>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed whitespace-pre-wrap text-paper">{rec.notes}</p>
            </article>
          );
        })
      )}
    </div>
  );
}
