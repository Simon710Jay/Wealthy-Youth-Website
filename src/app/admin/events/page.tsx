import { getEvents, getRegistrations } from '@/lib/actions';
import AdminEventsClient from './AdminEventsClient';

export default async function AdminEventsPage() {
  const events = await getEvents(true); // pass true if you want to include unpublished events for admin
  const registrations = await getRegistrations();

  // Pre-compute counts
  const regCounts = events.reduce((acc: any, event: any) => {
    acc[event._id] = registrations.filter((r: any) => r.eventId?._id === event._id).length;
    return acc;
  }, {});

  return <AdminEventsClient initialEvents={events} regCounts={regCounts} />;
}
