"use server";

import connectMongo from './mongodb';
import { 
  EventModel, 
  Media, 
  Sermon, 
  EventRegistration,
  MembershipRegistration,
  User,
  Order,
  SupportInquiry
} from './models';

// ---------------------------
// DASHBOARD
// ---------------------------
export async function getDashboardStats() {
  await connectMongo();
  
  const [
    totalMembers,
    totalEvents,
    totalEventRegistrations,
    totalMedia,
    totalSermons,
    totalOrders
  ] = await Promise.all([
    User.countDocuments({ role: 'member' }),
    EventModel.countDocuments(),
    EventRegistration.countDocuments(),
    Media.countDocuments(),
    Sermon.countDocuments(),
    Order?.countDocuments() || 0
  ]);

  return {
    totalMembers,
    totalEvents,
    totalEventRegistrations,
    totalMedia,
    totalSermons,
    totalOrders
  };
}

// ---------------------------
// EVENTS
// ---------------------------
export async function getEvents(includeUnpublished = false) {
  await connectMongo();
  const query = includeUnpublished ? {} : { published: true };
  const events = await EventModel.find(query)
    .sort({ date: -1 })
    .lean();
  
  return JSON.parse(JSON.stringify(events));
}

export async function createEvent(data: any) {
  await connectMongo();
  const newEvent = await EventModel.create(data);
  return JSON.parse(JSON.stringify(newEvent));
}

export async function updateEvent(id: string, data: any) {
  await connectMongo();
  const updatedEvent = await EventModel.findByIdAndUpdate(id, data, { new: true });
  return JSON.parse(JSON.stringify(updatedEvent));
}

export async function deleteEvent(id: string) {
  await connectMongo();
  await EventModel.findByIdAndDelete(id);
  // Optional: Also delete associated Media or let them be unlinked
  await Media.updateMany({ eventId: id }, { $unset: { eventId: 1 } });
  return { success: true };
}

export async function getEventBySlug(slug: string) {
  await connectMongo();
  const decodedSlug = decodeURIComponent(slug);
  const event = await EventModel.findOne({ slug: decodedSlug, published: true }).lean();
  if (!event) return null;
  return JSON.parse(JSON.stringify(event));
}

export async function registerForEvent(registration: any) {
  await connectMongo();
  const newRegistration = await EventRegistration.create({
    eventId: registration.eventId,
    fullName: registration.fullName,
    email: registration.email,
    phone: registration.phone,
    city: registration.city,
    country: registration.country,
  });
  return JSON.parse(JSON.stringify(newRegistration));
}

export async function getRegistrations() {
  await connectMongo();
  const registrations = await EventRegistration.find()
    .populate('eventId', 'title slug')
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(registrations));
}

export async function deleteRegistration(id: string) {
  await connectMongo();
  await EventRegistration.findByIdAndDelete(id);
  return { success: true };
}

// ---------------------------
// MEMBERSHIPS
// ---------------------------
export async function getMembers() {
  await connectMongo();
  const members = await User.find({ role: 'member' })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(members));
}

export async function getMembershipRegistrations() {
  await connectMongo();
  const registrations = await MembershipRegistration.find()
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(registrations));
}

export async function deleteMembershipRegistration(id: string) {
  await connectMongo();
  await MembershipRegistration.findByIdAndDelete(id);
  return { success: true };
}

// ---------------------------
// MEDIA & SERMONS
// ---------------------------
export async function getMedia() {
  await connectMongo();
  
  // Fetch photos
  const photosData = await Media.find({ mediaType: 'image', published: true })
    .populate('eventId', 'title slug')
    .sort({ createdAt: -1 })
    .lean();

  // Fetch videos/sermons from Media Collection
  const videosData = await Media.find({ mediaType: 'video', published: true })
    .populate('eventId', 'title slug')
    .sort({ createdAt: -1 })
    .lean();

  // Map to format that the UI currently expects 
  const photos = photosData.map(p => ({
    id: p._id.toString(),
    url: p.cloudinaryUrl,
    title: p.title,
    category: p.description || 'Gallery',
    eventId: p.eventId,
  }));

  const videos = videosData.map(v => {
    // Generate thumbnail by replacing extension with .jpg if it's a Cloudinary video URL
    let thumb = v.thumbnail;
    if (!thumb && v.cloudinaryUrl && (v.cloudinaryUrl.endsWith('.mp4') || v.cloudinaryUrl.endsWith('.mov') || v.cloudinaryUrl.endsWith('.webm'))) {
      thumb = v.cloudinaryUrl.replace(/\.(mp4|mov|webm)$/i, '.jpg');
    }

    return {
      id: v._id.toString(),
      title: v.title,
      url: v.cloudinaryUrl,
      thumbnail: thumb || v.cloudinaryUrl,
      category: v.description || 'Video',
      eventId: v.eventId,
    };
  });

  const livestreams: any[] = [];

  return { photos, videos, livestreams };
}

export async function getAllMediaForAdmin() {
  await connectMongo();
  const media = await Media.find()
    .populate('eventId', 'title')
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(media));
}

export async function createMedia(data: any) {
  await connectMongo();
  const newMedia = await Media.create(data);
  return JSON.parse(JSON.stringify(newMedia));
}

export async function updateMedia(id: string, data: any) {
  await connectMongo();
  const updatedMedia = await Media.findByIdAndUpdate(id, data, { new: true });
  return JSON.parse(JSON.stringify(updatedMedia));
}

export async function deleteMedia(id: string) {
  await connectMongo();
  await Media.findByIdAndDelete(id);
  return { success: true };
}

export async function getMediaForEvent(eventId: string) {
  await connectMongo();
  const media = await Media.find({ eventId, published: true })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(media));
}

// ---------------------------
// SUPPORT INQUIRIES
// ---------------------------
export async function createSupportInquiry(data: any) {
  await connectMongo();
  const inquiry = await SupportInquiry.create(data);
  return JSON.parse(JSON.stringify(inquiry));
}

export async function getSupportInquiries() {
  await connectMongo();
  const inquiries = await SupportInquiry.find()
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(inquiries));
}

export async function markInquiryContacted(id: string, contacted: boolean) {
  await connectMongo();
  const updated = await SupportInquiry.findByIdAndUpdate(id, { contacted }, { new: true });
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteSupportInquiry(id: string) {
  await connectMongo();
  await SupportInquiry.findByIdAndDelete(id);
  return { success: true };
}
