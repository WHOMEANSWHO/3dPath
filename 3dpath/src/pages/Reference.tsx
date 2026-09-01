import FileTag from "../components/FileTag";
import { FIELD_NOTES, FORMATS, OFFICIAL_SHELF } from "../data/reference";

export default function Reference() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="display text-3xl leading-tight font-bold desk:text-4xl">Reference</h1>
        <p className="mt-1.5 max-w-[60ch] text-[0.92rem] text-muted">
          The shelf above the workbench. Formats, official pages, then the notes worth re-reading.
        </p>
      </header>

      <section aria-label="File formats" className="grid grid-cols-1 gap-4 desk:grid-cols-2">
        {FORMATS.map((f) => (
          <div key={f.ext} className="card flex items-start gap-4 p-5">
            <FileTag>{f.ext}</FileTag>
            <div className="min-w-0">
              <h2 className="display text-lg leading-tight font-semibold">{f.name}</h2>
              <p className="mt-1 text-[0.86rem] leading-relaxed text-muted">{f.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section aria-label="Official documentation" className="space-y-4">
        {OFFICIAL_SHELF.map((group) => (
          <div key={group.heading} className="card p-5">
            <h2 className="display text-xl font-semibold">{group.heading}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((doc) => (
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
          </div>
        ))}
      </section>

      <section aria-label="Field notes" className="grid grid-cols-1 gap-4 desk:grid-cols-2">
        {FIELD_NOTES.map((n) => (
          <article key={n.id} className="card border-l-2 border-l-amber/70 p-5">
            <h2 className="display text-xl font-semibold">{n.title}</h2>
            {n.paragraphs.map((p, i) => (
              <p key={i} className="mt-2 text-[0.88rem] leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </article>
        ))}
      </section>
    </div>
  );
}
