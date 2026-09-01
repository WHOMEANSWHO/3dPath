import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getClass, LESSONS, topicOfLesson } from "../data/catalogue";
import { exportProgressJson, importProgressJson, recordOf, useAppState } from "../lib/store";

export default function NotesLog() {
  const state = useAppState();
  const withNotes = LESSONS.filter((l) => recordOf(state, l.id).notes.trim().length > 0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [backupMsg, setBackupMsg] = useState<string | null>(null);
  const [backupErr, setBackupErr] = useState<string | null>(null);

  const downloadBackup = () => {
    const blob = new Blob([exportProgressJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const day = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `3dpath-progress-${day}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupErr(null);
    setBackupMsg("Backup downloaded. Keep that file off this browser.");
  };

  const restoreBackup = (file: File) => {
    if (!window.confirm("Restore replaces ticks and notes in this window. Continue?")) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? "");
        importProgressJson(text);
        setBackupErr(null);
        setBackupMsg("Restored ticks and notes from that file.");
      } catch {
        setBackupMsg(null);
        setBackupErr("That file is not a 3dPath backup.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <header>
        <h1 className="display text-3xl leading-tight font-bold desk:text-4xl">Notes</h1>
        <p className="mt-1.5 max-w-[60ch] text-[0.92rem] text-muted">
          Everything you wrote down, lesson by lesson. Start each session here.
        </p>
      </header>

      <section className="card p-5" aria-label="Backup">
        <p className="display text-lg font-semibold">Backup</p>
        <p className="mt-1.5 max-w-[62ch] text-[0.88rem] leading-relaxed text-muted">
          Ticks and notes live in this window. Download a copy so a browser wipe does not eat a month of work. The
          exe also writes the same file to AppData on this PC. Restoring replaces what is here.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadBackup}
            className="inline-flex h-11 items-center rounded-[4px] bg-amber px-4 text-[0.88rem] font-semibold text-night hover:bg-amber2"
          >
            Download backup
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex h-11 items-center rounded-[4px] border border-line px-4 text-[0.88rem] font-medium text-paper hover:border-line2"
          >
            Restore from file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) restoreBackup(file);
            }}
          />
        </div>
        {backupMsg ? <p className="mt-3 font-mono text-[0.72rem] text-teal2">{backupMsg}</p> : null}
        {backupErr ? <p className="mt-3 font-mono text-[0.72rem] text-rust2">{backupErr}</p> : null}
      </section>

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
