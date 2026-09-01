interface Props {
  value: string;
  savedValue: string;
  savedAt: string | null;
  onChange: (v: string) => void;
  onSave: () => void;
}

export default function NotesBox({ value, savedValue, savedAt, onChange, onSave }: Props) {
  const dirty = value !== savedValue;
  return (
    <section aria-label="Notes" className="card p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="display text-xl font-semibold">Notes</h2>
        <span className="font-mono text-[0.7rem] text-faint">
          {dirty ? "unsaved" : savedAt ? `saved ${new Date(savedAt).toLocaleDateString("en-GB")}` : ""}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="What broke, and what fixed it. Your next session starts by reading this."
        className="mt-3 w-full resize-y rounded-[4px] border border-line bg-well px-3.5 py-3 text-[0.9rem] leading-relaxed text-paper placeholder:text-faint focus:border-amber focus:outline-none"
      />
      <button
        type="button"
        onClick={onSave}
        disabled={!dirty}
        className="mt-3 h-11 rounded-[4px] border border-line px-4 text-[0.88rem] text-muted transition-colors hover:border-amber hover:text-amber disabled:opacity-40"
      >
        Save notes
      </button>
    </section>
  );
}
