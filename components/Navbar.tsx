'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';
import { useAdmin } from '@/lib/AdminContext';

const tabs = [
  { href: '/', label: 'Home', icon: '⛳' },
  { href: '/schedule', label: 'Schedule', icon: '📅' },
  { href: '/players', label: 'Players', icon: '👥' },
  { href: '/scorecard', label: 'Scores', icon: '📝' },
  { href: '/leaderboard', label: 'Board', icon: '🏆' },
];

const tabClass = (isActive: boolean) =>
  `flex flex-1 min-h-[48px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-[11px] font-medium transition-colors touch-manipulation active:opacity-80 md:min-h-0 md:flex-none md:flex-row md:gap-2 md:px-3 md:py-3 md:text-sm ${
    isActive
      ? 'text-primary md:font-semibold'
      : 'text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-700 md:hover:text-gray-700 md:dark:hover:text-gray-200'
  }`;

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin } = useAdmin();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95 md:bottom-auto md:top-0 md:border-b md:border-t-0">
      <div
        className="mx-auto flex max-w-4xl items-stretch justify-between gap-0.5 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-2 md:justify-start md:gap-1 md:px-4 md:pb-0 md:pt-[max(0.5rem,env(safe-area-inset-top,0px))]"
        role="navigation"
        aria-label="Main"
      >
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href} className={tabClass(isActive)}>
              <span className="text-[1.35rem] leading-none md:text-base" aria-hidden>
                {tab.icon}
              </span>
              <span className="truncate leading-tight">{tab.label}</span>
            </Link>
          );
        })}
        {isAdmin ? (
          <Link
            href="/admin"
            className={tabClass(pathname.startsWith('/admin'))}
            title="Admin"
          >
            <span className="text-[1.35rem] leading-none md:text-base" aria-hidden>
              ⚙️
            </span>
            <span className="truncate leading-tight">Admin</span>
          </Link>
        ) : null}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex min-h-[48px] min-w-[48px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-gray-500 transition-colors touch-manipulation active:bg-gray-100 dark:text-gray-400 dark:active:bg-gray-700 md:min-h-0 md:min-w-0 md:flex-row md:gap-2 md:px-3 md:py-3 md:text-sm md:hover:text-gray-700 md:dark:hover:text-gray-200"
          aria-label="Toggle theme"
        >
          <span className="text-[1.35rem] leading-none md:text-base" aria-hidden>
            {theme === 'dark' ? '☀️' : '🌙'}
          </span>
          <span className="hidden leading-tight md:inline">Theme</span>
        </button>
      </div>
    </nav>
  );
}
