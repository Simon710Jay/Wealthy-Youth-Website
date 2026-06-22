import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getSupportInquiries } from '@/lib/actions';
import SupportInquiriesClient from './SupportInquiriesClient';

export default async function SupportInquiriesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'super_admin') {
    redirect('/admin');
  }

  const inquiries = await getSupportInquiries();

  return <SupportInquiriesClient initialInquiries={inquiries} />;
}
