import { Link, useParams } from "react-router-dom";
import Bar from "../components/Bar";
import LessonRow from "../components/LessonRow";
import { getClass, getTopic, lessonsOfClass, topicPath } from "../data/catalogue";
import { classProgress } from "../lib/progress";
import { recordOf, useAppState } from "../lib/store";

export default function ClassPage() {
  const { id } = useParams();
  const state = useAppState();
  const cls = getClass(id ?? "");

  if (!cls) {
    return <p className="text-muted">No such class. <Link className="text-amber" to="/">Back home</Link>.</p>;
  }

  const topic = getTopic(cls.topic)!;
  const prog = classProgress(state, cls.id);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header>
        <p className="font-mono text-[0.74rem] text-faint">
          <Link to={topicPath(topic)} className="hover:text-amber">
            {topic.name}
          </Link>{" "}
          <span className="text-line2">/</span> {cls.name}
        </p>
        <h1 className="display mt-2 text-3xl leading-tight font-bold desk:text-4xl">{cls.name}</h1>
        <p className="mt-1.5 max-w-[60ch] text-[0.92rem] text-muted">{cls.blurb}</p>
      </header>

      <div className="card p-5">
        <div className="mb-1.5 flex justify-between font-mono text-[0.7rem] text-faint">
          <span>Progress</span>
          <span>
            {prog.done}/{prog.total}
          </span>
        </div>
        <Bar done={prog.done} total={prog.total} />
        <div className="mt-4 space-y-0.5">
          {lessonsOfClass(cls.id).map((l) => (
            <LessonRow key={l.id} lesson={l} rec={recordOf(state, l.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
