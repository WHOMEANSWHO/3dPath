import ContinueHero from "../components/ContinueHero";
import TopicCard from "../components/TopicCard";
import { TOPICS } from "../data/catalogue";
import { continueLesson, totalProgress } from "../lib/progress";
import { useAppState } from "../lib/store";

export default function Home() {
  const state = useAppState();
  const lesson = continueLesson(state);
  const { done, total } = totalProgress(state);

  return (
    <div className="space-y-6">
      <ContinueHero lesson={lesson} state={state} />

      <section aria-label="Topics">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="display text-2xl font-semibold">The path</h2>
          <span className="font-mono text-[0.72rem] text-faint">
            {done}/{total} lessons complete
          </span>
        </div>
        <p className="mb-3 max-w-[60ch] text-[0.85rem] leading-relaxed text-muted">
          Open any lesson, any day. The list is an order, not a calendar.
        </p>
        <div className="grid grid-cols-1 gap-4 desk:grid-cols-3">
          {TOPICS.map((t) => (
            <TopicCard key={t.id} topic={t} state={state} />
          ))}
        </div>
      </section>
    </div>
  );
}
