'use client';

type StatusBannerProps = {
  status: string;
};

export default function StatusBanner({ status }: StatusBannerProps) {
  if (!status) return null;

  return (
    <div className="bg-primary text-white text-center py-2 px-4 text-sm font-medium rounded-lg">
      Currently: {status}
    </div>
  );
}
