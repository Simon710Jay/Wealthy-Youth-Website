import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

export type Event = {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  speakers: string[];
  banner: string;
  gallery: string[];
};

export type Photo = {
  id: string;
  url: string;
  title: string;
  category: string;
};

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  category: string;
};

export type Livestream = {
  id: string;
  title: string;
  status: 'upcoming' | 'live' | 'ended';
  date: string;
  url: string;
  thumbnail: string;
};

export type Registration = {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  country: string;
  registeredAt: string;
};

export type Database = {
  events: Event[];
  photos: Photo[];
  videos: Video[];
  livestreams: Livestream[];
  registrations: Registration[];
};

export async function getDb(): Promise<Database> {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

export async function saveDb(db: Database): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
}

export async function getEvents() {
  const db = await getDb();
  return db.events;
}

export async function getEventBySlug(slug: string) {
  const db = await getDb();
  return db.events.find(e => e.slug === slug);
}

export async function getMedia() {
  const db = await getDb();
  return {
    photos: db.photos,
    videos: db.videos,
    livestreams: db.livestreams
  };
}

export async function registerForEvent(registration: Omit<Registration, 'id' | 'registeredAt'>) {
  const db = await getDb();
  const newRegistration: Registration = {
    ...registration,
    id: Math.random().toString(36).substring(2, 9),
    registeredAt: new Date().toISOString()
  };
  db.registrations.push(newRegistration);
  await saveDb(db);
  return newRegistration;
}
