import { Link, Navigate, useParams } from "react-router-dom";
import Bar from "../components/Bar";
import FileTag from "../components/FileTag";
import LessonRow from "../components/LessonRow";
import { classesOfTopic, getTopic, lessonsOfClass, topicPath, type TopicId } from "../data/catalogue";
import { classProgress } from "../lib/progress";
import { recordOf, useAppState } from "../lib/store";

export default function TopicPage() {
  const { topic: topicId } = useParams();
  const state = useAppState();
  const topic = getTopic(topicId ?? "");

  if (!topic) {
    return <p className="text-muted">No such topic. <Link className="text-amber" to="/">Back home</Link>.</p>;
  }

  if (topic.hub) {
    return <Navigate to={topicPath(topic)} replace />;
  }

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

      {classesOfTopic(topic.id as TopicId).map((cls) => {
        const prog = classProgress(state, cls.id);
        return (
          <section key={cls.id} aria-label={cls.name} className="card p-5">
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
        );
      })}
    </div>
  );
}
