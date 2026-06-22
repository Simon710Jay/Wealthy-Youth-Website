import { getLeadershipMembers } from '@/lib/actions';
import LeadershipClient from './LeadershipClient';

export default async function AdminLeadershipPage() {
  const leadershipMembers = await getLeadershipMembers();

  return <LeadershipClient initialMembers={leadershipMembers} />;
}
