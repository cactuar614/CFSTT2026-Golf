'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';
import { FlagIcon, CalendarIcon, ScorecardIcon, TrophyIcon, SunIcon, MoonIcon } from './icons';

const tabs = [
  { href: '/', label: 'Home', Icon: FlagIcon },
  { href: '/schedule', label: 'Schedule', Icon: CalendarIcon },
  { href: '/scorecard', label: 'Scores', Icon: ScorecardIcon },
  { href: '/leaderboard', label: 'Board', Icon: TrophyIcon },
];

const tabClass = (isActive: boolean) =>
  `relative flex flex-1 min-h-[48px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-[11px] font-semibold transition-colors touch-manipulation active:opacity-80 md:min-h-0 md:flex-none md:flex-row md:gap-2 md:px-3 md:py-3 md:text-sm ${
    isActive
      ? 'text-primary dark:text-accent'
      : 'text-ink-soft dark:text-chalk/60 active:bg-parchment dark:active:bg-char-700 md:hover:text-ink md:dark:hover:text-chalk'
  }`;

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-linen bg-cream/95 backdrop-blur-sm dark:border-char-700 dark:bg-char-900/95 md:bottom-auto md:top-0 md:border-b md:border-t-0">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/70 to-transparent md:hidden" aria-hidden />
      <div
        className="mx-auto flex max-w-4xl items-stretch justify-between gap-0.5 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-1.5 md:justify-start md:gap-1 md:px-4 md:pb-0 md:pt-[max(0.5rem,env(safe-area-inset-top,0px))]"
        role="navigation"
        aria-label="Main"
      >
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href} className={tabClass(isActive)}>
              <tab.Icon className="h-[1.35rem] w-[1.35rem] md:h-4 md:w-4" />
              <span className="truncate leading-tight">{tab.label}</span>
              {isActive ? (
                <span
                  className="absolute -bottom-0.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-accent md:bottom-0"
                  aria-hidden
                />
              ) : null}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex min-h-[48px] min-w-[48px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors touch-manipulation active:bg-parchment dark:text-chalk/60 dark:active:bg-char-700 md:min-h-0 md:min-w-0 md:flex-row md:gap-2 md:px-3 md:py-3 md:text-sm md:hover:text-ink md:dark:hover:text-chalk"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-[1.35rem] w-[1.35rem] md:h-4 md:w-4" />
          ) : (
            <MoonIcon className="h-[1.35rem] w-[1.35rem] md:h-4 md:w-4" />
          )}
          <span className="hidden leading-tight md:inline">Theme</span>
        </button>
      </div>
    </nav>
  );
}
