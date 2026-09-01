import type { Clip } from "../data/catalogue";
import { formatStart } from "../lib/youtube";
import Marked from "./Marked";

interface Props {
  clips: Clip[];
  activeClip: number | null;
  onSelect: (index: number) => void;
}

export default function ClipList({ clips, activeClip, onSelect }: Props) {
  return (
    <ol aria-label="Clips" className="card divide-y divide-line overflow-hidden">
      {clips.map((clip, i) => {
        const active = i === activeClip;
        return (
          <li key={`${clip.videoId ?? ""}-${clip.start}-${i}`}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={active ? "true" : undefined}
              className={`flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                active ? "border-l-2 border-l-amber bg-panel2" : "border-l-2 border-l-transparent hover:bg-panel2"
              }`}
            >
              <span
                className={`stamp shrink-0 ${active ? "border-amber/70 bg-amberdim text-amber2" : "border-line2 bg-well text-muted"}`}
              >
                {formatStart(clip.start)}
              </span>
              <span className={`text-[0.9rem] ${active ? "text-paper" : "text-muted"}`}>
                <Marked text={clip.label} />
              </span>
              {active && <span className="ml-auto font-mono text-[0.66rem] text-amber">playing</span>}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
