import type { Lesson } from "../data/catalogue";
import Marked from "./Marked";

export default function TipsList({ lesson }: { lesson: Lesson }) {
  return (
    <section aria-label="From the community" className="card p-5">
      <h2 className="display text-xl font-semibold">From the community</h2>
      <ul className="mt-3 space-y-3">
        {lesson.tips.map((tip, i) => (
          <li key={i} className="border-l-2 border-line2 pl-3.5">
            <p className="text-[0.88rem] leading-relaxed text-paper">
              <Marked text={tip.text} />
            </p>
            <a
              href={tip.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block font-mono text-[0.7rem] text-faint underline-offset-4 hover:text-amber hover:underline"
            >
              {tip.source}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
