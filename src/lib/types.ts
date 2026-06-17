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
