import { getAllMediaForAdmin, getEvents } from '@/lib/actions';
import MediaClient from './MediaClient';

export default async function AdminMediaPage() {
  const media = await getAllMediaForAdmin();
  const events = await getEvents(true); // pass true to get all events, not just published

  return <MediaClient initialMedia={media} events={events} />;
}
