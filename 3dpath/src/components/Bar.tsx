export default function Bar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={done}
      aria-valuemin={0}
      aria-valuemax={total}
      className="h-1.5 w-full overflow-hidden rounded-full bg-well"
    >
      <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}
