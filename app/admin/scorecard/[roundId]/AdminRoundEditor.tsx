'use client';

import Link from 'next/link';
import { useAdmin } from '@/lib/AdminContext';
import RoundScorecardClient from '../../../scorecard/[roundId]/RoundScorecardClient';

export default function AdminRoundEditor() {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return (
      <div className="space-y-4 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">Sign in on the Admin page to edit scorecards.</p>
        <Link href="/admin" className="inline-block text-primary underline">
          Go to Admin
        </Link>
      </div>
    );
  }

  return <RoundScorecardClient readOnly={false} />;
}
