import type { Verdict } from "../lib/progress";

const LOOK: Record<Verdict, { label: string; cls: string }> = {
  none: { label: "Not started", cls: "border-line text-faint" },
  started: { label: "In progress", cls: "border-amber/60 text-amber" },
  complete: { label: "Complete", cls: "border-teal/70 text-teal2" },
  "gate-failed": { label: "Repeat", cls: "border-rust/70 text-rust2" },
};

export default function StatusChip({ verdict }: { verdict: Verdict }) {
  const look = LOOK[verdict];
  return <span className={`stamp ${look.cls}`}>{look.label}</span>;
}
