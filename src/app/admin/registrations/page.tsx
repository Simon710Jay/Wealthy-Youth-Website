import { getRegistrations } from '@/lib/actions';
import RegistrationsClient from './RegistrationsClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function RegistrationsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const role = session.user?.role as string;
  const allowedRoles = ['super_admin', 'events_admin'];

  if (!allowedRoles.includes(role)) {
    return (
      <div className="flex items-center justify-center h-64 text-center">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You do not have permission to view event registrations.</p>
        </div>
      </div>
    );
  }

  const registrations = await getRegistrations();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-black mb-2">Event Registrations</h1>
        <p className="text-muted-foreground">Manage and export event registrations.</p>
      </div>

      <RegistrationsClient initialRegistrations={registrations} userRole={role} />
    </div>
  );
}
