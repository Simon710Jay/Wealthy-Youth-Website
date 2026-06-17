import { getMedia } from '@/lib/actions';
import SermonsClient from './SermonsClient';

export default async function Sermons() {
  const media = await getMedia();
  
  // getMedia() returns videos (sermons) and livestreams
  // We can pass them all as "sermons" or separate them
  const sermons = media.videos || [];
  
  // For podcasts, we can just pass an empty array or if they exist in DB, fetch them.
  // Right now, the DB doesn't have a podcast specifically fetched, we'll pass empty for now.
  const podcasts: any[] = [];

  return <SermonsClient sermons={sermons} podcasts={podcasts} />;
}
