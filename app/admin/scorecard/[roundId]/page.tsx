import { DEFAULT_ROUNDS } from '@/lib/constants';
import AdminRoundEditor from './AdminRoundEditor';

export function generateStaticParams() {
  return DEFAULT_ROUNDS.map((round) => ({ roundId: round.id }));
}

export default function AdminRoundPage() {
  return <AdminRoundEditor />;
}
