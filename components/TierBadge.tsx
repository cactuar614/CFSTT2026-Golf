import { Tier } from '@/lib/types';
import { TIER_BADGES, TIER_STROKES } from '@/lib/constants';

const tierStyles: Record<Tier, string> = {
  A: 'border-primary/40 text-primary dark:border-accent/40 dark:text-accent',
  B: 'border-copper/50 text-copper dark:border-accent-light/40 dark:text-accent-light',
  M: 'border-accent/70 bg-accent/15 text-copper dark:bg-accent/10 dark:text-accent',
};

export default function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border px-1.5 py-px text-[10px] font-bold leading-tight ${tierStyles[tier]}`}
    >
      {TIER_BADGES[tier]}
    </span>
  );
}

/** Legend framing tiers as stroke allowances (never as strokes added). */
export function TierLegend() {
  return (
    <p className="text-xs text-ink-soft/80 dark:text-chalk/40">
      Stroke allowances: A = scratch · B = {TIER_STROKES.B} strokes · Hippy Mike ={' '}
      {TIER_STROKES.M} strokes · Net = Gross − strokes
    </p>
  );
}
