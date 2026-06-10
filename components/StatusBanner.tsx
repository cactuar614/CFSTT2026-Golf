'use client';

type StatusBannerProps = {
  status: string;
};

export default function StatusBanner({ status }: StatusBannerProps) {
  if (!status) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-accent/60 bg-accent/15 px-4 py-3 text-base font-medium dark:bg-accent/10 md:text-sm">
      <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-char-900">
        Now
      </span>
      <span>{status}</span>
    </div>
  );
}
