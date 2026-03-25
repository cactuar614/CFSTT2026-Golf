'use client';

type StatusBannerProps = {
  status: string;
};

export default function StatusBanner({ status }: StatusBannerProps) {
  if (!status) return null;

  return (
    <div className="rounded-lg bg-primary px-4 py-3 text-center text-base font-medium text-white md:text-sm">
      Currently: {status}
    </div>
  );
}
