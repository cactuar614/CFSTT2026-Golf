'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';
import { useAuth } from '@/lib/AuthContext';

const tabs = [
  { href: '/', label: 'Home', icon: '⛳' },
  { href: '/schedule', label: 'Schedule', icon: '📅' },
  { href: '/players', label: 'Players', icon: '👥' },
  { href: '/scorecard', label: 'Scores', icon: '📝' },
  { href: '/leaderboard', label: 'Board', icon: '🏆' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-4xl mx-auto flex justify-around md:justify-start md:gap-1 md:px-4">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center py-2 px-3 text-xs md:flex-row md:gap-2 md:text-sm md:py-3 transition-colors ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <span className="text-lg md:text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center py-2 px-3 text-xs md:flex-row md:gap-2 md:text-sm md:py-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          aria-label="Toggle theme"
        >
          <span className="text-lg md:text-base">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="hidden md:inline">Theme</span>
        </button>

        {/* Auth button */}
        {user ? (
          <button
            onClick={signOut}
            className="flex flex-col items-center py-2 px-3 text-xs md:flex-row md:gap-2 md:text-sm md:py-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            title={`Signed in as ${user.displayName || user.email}`}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-5 h-5 rounded-full md:w-6 md:h-6"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
                {(user.displayName || user.email || '?')[0].toUpperCase()}
              </span>
            )}
            <span className="hidden md:inline">Sign Out</span>
          </button>
        ) : (
          <Link
            href="/signin"
            className={`flex flex-col items-center py-2 px-3 text-xs md:flex-row md:gap-2 md:text-sm md:py-3 transition-colors ${
              pathname === '/signin'
                ? 'text-primary font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <span className="text-lg md:text-base">👤</span>
            <span className="hidden md:inline">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
