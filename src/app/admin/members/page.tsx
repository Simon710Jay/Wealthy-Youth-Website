import { getMembers } from '@/lib/actions';
import MembersClient from './MembersClient';

export default async function AdminMembersPage() {
  const members = await getMembers();

  return <MembersClient members={members} />;
}
