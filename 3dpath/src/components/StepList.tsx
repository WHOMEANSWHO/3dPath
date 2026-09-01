import type { Clip } from "../data/catalogue";
import { formatStart } from "../lib/youtube";
import Marked from "./Marked";

interface Props {
  steps: string[];
  clips: Clip[];
  clipForStep: (stepIndex: number) => number | null;
  activeClip: number | null;
  onSelect: (clipIndex: number) => void;
}

export default function StepList({ steps, clips, clipForStep, activeClip, onSelect }: Props) {
  return (
    <ol>
      {steps.map((step, i) => {
        const clipIndex = clipForStep(i);
        const clip = clipIndex !== null ? clips[clipIndex] : undefined;
        const active = clipIndex !== null && clipIndex === activeClip;
        const seekable = clip !== undefined;
        const inner = (
          <>
            <span className="min-w-0">
              <Marked text={step} />
            </span>
            {seekable ? (
              <span
                className={`stamp ml-auto shrink-0 ${
                  active ? "border-amber/70 bg-amberdim text-amber2" : "border-line2 bg-well text-muted"
                }`}
              >
                {formatStart(clip.start)}
              </span>
            ) : null}
          </>
        );
        return (
          <li key={i} className={active ? "is-playing" : undefined}>
            {seekable && clipIndex !== null ? (
              <button
                type="button"
                onClick={() => onSelect(clipIndex)}
                aria-current={active ? "true" : undefined}
                className={`flex min-h-11 w-full items-start gap-3 rounded-[4px] py-0.5 pr-1 text-left transition-colors hover:text-amber ${
                  active ? "text-paper" : ""
                }`}
              >
                {inner}
              </button>
            ) : (
              <div className="flex items-start gap-3 pr-1">{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
