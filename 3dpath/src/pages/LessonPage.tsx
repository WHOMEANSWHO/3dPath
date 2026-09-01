import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ActionBar from "../components/ActionBar";
import CheckItems from "../components/CheckItems";
import ClipList from "../components/ClipList";
import Marked from "../components/Marked";
import NotesBox from "../components/NotesBox";
import Player from "../components/Player";
import StatusChip from "../components/StatusChip";
import DocsList from "../components/DocsList";
import TipsList from "../components/TipsList";
import PaceToggle from "../components/PaceToggle";
import { getClass, getLesson, topicOfLesson, topicPath } from "../data/catalogue";
import { packFor } from "../data/pace";
import { verdictOf } from "../lib/progress";
import { recordOf, saveNotes, setLastClip, touchLesson, useAppState } from "../lib/store";

export default function LessonPage() {
  const { id } = useParams();
  const lessonId = Number(id);
  const state = useAppState();
  const lesson = getLesson(lessonId);
  const rec = recordOf(state, lessonId);
  const [notesDraft, setNotesDraft] = useState(rec.notes);

  useEffect(() => {
    if (lesson) touchLesson(lesson.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  useEffect(() => {
    setNotesDraft(rec.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  useEffect(() => {
    if (!lesson) return;
    const next = packFor(lesson, state.pace);
    if (rec.lastClip !== null && rec.lastClip >= next.clips.length) {
      setLastClip(lesson.id, null);
    }
  }, [lesson, rec.lastClip, state.pace]);

  if (!lesson) {
    return (
      <p className="text-muted">
        No such lesson.{" "}
        <Link className="text-amber" to="/">
          Back home
        </Link>
        .
      </p>
    );
  }

  const cls = getClass(lesson.classId)!;
  const topic = topicOfLesson(lesson);
  const verdict = verdictOf(rec);
  const pack = packFor(lesson, state.pace);
  const override = rec.videoOverride[state.pace] || "";
  const activeClip =
    rec.lastClip !== null && rec.lastClip >= pack.clips.length ? null : rec.lastClip;

  return (
    <div className="desk:flex desk:h-[calc(100vh-7.5rem)] desk:flex-col">
      {/* Header: breadcrumb path, title, the gate */}
      <header className="shrink-0 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <p className="font-mono text-[0.74rem] text-faint">
              <Link to={topicPath(topic)} className="hover:text-amber">
                {topic.id}
              </Link>
              <span className="text-line2"> / </span>
              <Link to={`/classes/${cls.id}`} className="hover:text-amber">
                {cls.id}
              </Link>
              <span className="text-line2"> / </span>
              lesson {lesson.id}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-3">
              <h1 className="display text-3xl leading-tight font-bold desk:text-4xl">{lesson.title}</h1>
              {lesson.kind === "project" ? (
                <span className="stamp border-amber/50 bg-amberdim text-amber2">Project</span>
              ) : null}
              <StatusChip verdict={verdict} />
            </div>
            <p className="mt-2.5 max-w-[70ch] border-l-2 border-amber/70 pl-3 text-[0.9rem] leading-relaxed text-muted">
              <span className="text-amber">Done when:</span> {lesson.doneWhen}
            </p>
            <div className="mt-4 desk:hidden">
              <PaceToggle />
            </div>
          </div>

          {verdict === "complete" && (
            <div className="text-right">
              <span className="spray text-teal2">DONE</span>
              <p className="mt-1.5 font-mono text-[0.7rem] text-faint">
                Gate passed{rec.statusAt ? ` ${new Date(rec.statusAt).toLocaleDateString("en-GB")}` : ""}
              </p>
            </div>
          )}
          {verdict === "gate-failed" && (
            <div className="text-right">
              <span className="spray text-rust2">REPEAT</span>
              <p className="mt-1.5 max-w-[26ch] font-mono text-[0.7rem] text-rust2/80">
                Gate failed — run it again before moving on.
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Two scroll columns on desk; flattened single column on portrait */}
      <div className="desk:grid desk:min-h-0 desk:flex-1 desk:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] desk:gap-7 wide:gap-10">
        {/* Left: player + clips */}
        <div className="contents desk:block desk:h-full desk:min-h-0 desk:overflow-y-auto desk:pr-1 desk:pb-2">
          <Player
            lessonId={lesson.id}
            pack={pack}
            override={override}
            activeClip={activeClip}
            allowFloat
          />
          <div className="mt-4">
            {pack.clips.length > 0 ? (
              <ClipList clips={pack.clips} activeClip={activeClip} onSelect={(i) => setLastClip(lesson.id, i)} />
            ) : null}
            <p className="mt-2.5 font-mono text-[0.7rem] text-faint">{pack.videoNote}</p>
          </div>
        </div>

        {/* Right: guide, checklist, tips, notes, actions */}
        <div className="contents desk:flex desk:h-full desk:min-h-0 desk:flex-col desk:overflow-y-auto desk:pr-1">
          <div className="wide:grid wide:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] wide:gap-7">
            <section aria-label="Guide" className="card guide mt-5 p-5 desk:mt-0">
              <p className="text-[0.92rem] leading-relaxed text-paper">{lesson.intro}</p>
              <div className="mt-4 rounded-[4px] border border-rust/50 bg-rustdim/60 px-4 py-3">
                <p className="text-[0.87rem] leading-relaxed text-rust2">
                  <span className="font-semibold">Do not.</span> <Marked text={lesson.dont} />
                </p>
              </div>
              <h3>Steps</h3>
              <ol>
                {lesson.steps.map((s, i) => (
                  <li key={i} className="text-[0.9rem]">
                    <Marked text={s} />
                  </li>
                ))}
              </ol>
            </section>

            <div className="wide:flex wide:flex-col">
              <div className="mt-5 wide:mt-0">
                <CheckItems lesson={lesson} rec={rec} />
              </div>
              <div className="mt-5">
                <DocsList lessonId={lesson.id} />
              </div>
              <div className="mt-5">
                <TipsList lesson={lesson} />
              </div>
              <div className="mt-5">
                <NotesBox
                  value={notesDraft}
                  savedValue={rec.notes}
                  savedAt={rec.notesSavedAt}
                  onChange={setNotesDraft}
                  onSave={() => saveNotes(lesson.id, notesDraft)}
                />
              </div>
            </div>
          </div>

          <ActionBar lesson={lesson} rec={rec} variant="column" />
        </div>
      </div>

      {/* Portrait: pinned window footer; spacer clears it */}
      <div className="h-24 desk:hidden" aria-hidden />
      <ActionBar lesson={lesson} rec={rec} variant="fixed" />
    </div>
  );
}
