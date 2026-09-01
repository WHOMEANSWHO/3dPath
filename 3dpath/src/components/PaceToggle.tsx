import { setPace, useAppState } from "../lib/store";
import type { Pace } from "../data/pace";

const OPTIONS: { id: Pace; label: string; hint: string }[] = [
  { id: "slow", label: "Slow", hint: "0.75× · pause and copy" },
  { id: "fast", label: "Fast", hint: "1× · shorter videos" },
];

export default function PaceToggle({ compact = false }: { compact?: boolean }) {
  const { pace } = useAppState();

  return (
    <div
      role="group"
      aria-label="Lesson pace"
      className={`flex rounded-[4px] border border-line bg-well p-0.5 ${compact ? "" : "w-full max-w-xs"}`}
    >
      {OPTIONS.map((opt) => {
        const on = pace === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={on}
            title={opt.hint}
            onClick={() => setPace(opt.id)}
            className={`${compact ? "min-h-9 px-2.5 py-1" : "min-h-11 px-3"} flex-1 rounded-[3px] text-[0.82rem] font-medium transition-colors ${
              on ? "bg-amberdim text-amber2" : "text-muted hover:text-paper"
            }`}
          >
            {opt.label}
            {!compact && <span className="mt-0.5 block font-mono text-[0.62rem] font-normal text-faint">{opt.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}
