import { Link } from "react-router-dom";
import { classesOfTopic, topicPath, type Topic } from "../data/catalogue";
import { topicProgress } from "../lib/progress";
import type { AppState } from "../lib/store";
import Bar from "./Bar";
import FileTag from "./FileTag";

export default function TopicCard({ topic, state }: { topic: Topic; state: AppState }) {
  const { done, total } = topicProgress(state, topic.id);
  const classes = classesOfTopic(topic.id);
  return (
    <Link
      to={topicPath(topic)}
      className="card group flex flex-col p-5 transition-colors hover:border-line2"
    >
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden className="display text-4xl leading-none font-bold text-line2 transition-colors group-hover:text-amber/70">
          {String(topic.n).padStart(2, "0")}
        </span>
        <FileTag>{topic.stamp}</FileTag>
      </div>
      <h3 className="display mt-3 text-2xl leading-tight font-semibold">{topic.name}</h3>
      <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">{topic.blurb}</p>
      <p className="mt-2.5 text-[0.78rem] text-faint">
        {classes.map((c) => c.name).join("  /  ")}
      </p>
      <div className="mt-auto pt-4">
        <div className="mb-1.5 flex justify-between font-mono text-[0.7rem] text-faint">
          <span>
            {classes.length} {classes.length === 1 ? "class" : "classes"}
          </span>
          <span>
            {done}/{total} lessons
          </span>
        </div>
        <Bar done={done} total={total} />
      </div>
    </Link>
  );
}
