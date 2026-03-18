'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Home', icon: '⛳' },
  { href: '/schedule', label: 'Schedule', icon: '📅' },
  { href: '/players', label: 'Players', icon: '👥' },
  { href: '/scorecard', label: 'Scores', icon: '📝' },
  { href: '/leaderboard', label: 'Board', icon: '🏆' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
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
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-lg md:text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
