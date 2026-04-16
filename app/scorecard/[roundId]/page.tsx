import { DEFAULT_ROUNDS } from '@/lib/constants';
import RoundScorecardClient from './RoundScorecardClient';

export function generateStaticParams() {
  return DEFAULT_ROUNDS.map((round) => ({ roundId: round.id }));
}

export default function RoundScorecardPage() {
  return <RoundScorecardClient />;
}
