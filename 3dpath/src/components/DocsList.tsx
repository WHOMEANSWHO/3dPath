import { readingFor } from "../data/reading";

export default function DocsList({ lessonId }: { lessonId: number }) {
  const docs = readingFor(lessonId);
  if (docs.length === 0) return null;

  return (
    <section aria-label="Official reading" className="card p-5">
      <h2 className="display text-xl font-semibold">Official reading</h2>
      <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
        Pause the video and read these. They are the source; the clip is company.
      </p>
      <ul className="mt-3 space-y-2">
        {docs.map((doc) => (
          <li key={doc.url}>
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[4px] border border-transparent px-1 py-0.5 hover:border-line hover:bg-well"
            >
              <span className="text-[0.88rem] leading-relaxed text-paper">{doc.title}</span>
              <span className="mt-0.5 block font-mono text-[0.7rem] text-faint">{doc.source}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
