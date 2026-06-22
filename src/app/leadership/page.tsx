import { getPublicLeadership } from '@/lib/actions';
import LeadershipClient from './LeadershipClient';

export default async function Leadership() {
  const leadershipMembers = await getPublicLeadership();

  return <LeadershipClient members={leadershipMembers} />;
}

