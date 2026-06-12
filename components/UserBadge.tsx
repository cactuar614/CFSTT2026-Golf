'use client';

import { useSession } from 'next-auth/react';

/**
 * Signed-in user's name, upper right. Renders nothing while auth is
 * disabled or the visitor is signed out (session loads client-side so
 * pages stay static).
 */
export default function UserBadge({ className = '' }: { className?: string }) {
  const { data: session } = useSession();
  const name = session?.user?.name;
  if (!name) return null;

  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-display text-[10px] font-bold text-cream dark:bg-accent dark:text-char-900">
        {initials}
      </span>
      <span className="max-w-[9rem] truncate text-xs font-semibold text-ink-soft dark:text-chalk/70">
        {name}
      </span>
    </span>
  );
}

/** Mobile-only row above the page content; collapses entirely when signed out. */
export function MobileUserBar() {
  const { data: session } = useSession();
  if (!session?.user?.name) return null;

  return (
    <div className="-mt-1 mb-2 flex justify-end md:hidden">
      <UserBadge />
    </div>
  );
}
