import { getEvents, getMedia } from '@/lib/actions';
import HomeClient from './HomeClient';

export default async function Home() {
  const events = await getEvents();
  const media = await getMedia();

  return <HomeClient events={events} media={media} />;
}
