const POINTS_KEY = [
  { label: 'Dbl Eagle', points: 9 },
  { label: 'Eagle', points: 6 },
  { label: 'Birdie', points: 4 },
  { label: 'Par', points: 2 },
  { label: 'Bogey', points: 1 },
  { label: 'Dbl Bogey+', points: 0 },
];

/** Compact Stableford points key shown atop Stableford views. */
export default function StablefordKey() {
  return (
    <div className="card flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-3 py-2.5">
      <span className="eyebrow">Points</span>
      {POINTS_KEY.map(({ label, points }) => (
        <span key={label} className="flex items-baseline gap-1 text-sm">
          <span className="text-ink-soft dark:text-chalk/60">{label}</span>
          <span className="font-display text-base font-bold text-copper dark:text-accent">
            {points}
          </span>
        </span>
      ))}
      <span className="w-full text-center text-[11px] text-ink-soft/80 dark:text-chalk/40 sm:w-auto">
        Most points wins · Net vs gross TBD
      </span>
    </div>
  );
}
