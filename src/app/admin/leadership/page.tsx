import { getLeadershipMembers } from '@/lib/actions';
import LeadershipClient from './LeadershipClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadershipPage() {
  const leadershipMembers = await getLeadershipMembers();

  return <LeadershipClient initialMembers={leadershipMembers} />;
}
