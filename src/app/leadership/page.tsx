import { getPublicLeadership } from '@/lib/actions';
import LeadershipClient from './LeadershipClient';

export const dynamic = 'force-dynamic';

export default async function Leadership() {
  const leadershipMembers = await getPublicLeadership();

  return <LeadershipClient members={leadershipMembers} />;
}

