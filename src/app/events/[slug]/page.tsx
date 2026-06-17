import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEventBySlug, getMediaForEvent } from '@/lib/actions';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const mediaList = await getMediaForEvent(event._id);
  const images = mediaList.filter((m: any) => m.mediaType === 'image');
  const videos = mediaList.filter((m: any) => m.mediaType === 'video');

  return (
    <div className="min-h-screen bg-white">
      {/* Event Banner */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-black">
        <img 
          src={event.banner} 
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-full inline-block mb-6">
              Official Event
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white/60" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/60" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white/60" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-playfair font-bold mb-6 text-black">About The Event</h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                {event.description}
              </p>
            </section>

            {event.speakers && event.speakers.length > 0 && (
              <section>
                <h2 className="text-3xl font-playfair font-bold mb-8 text-black">Speakers & Guests</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-[#FAFAFA] p-4 rounded-2xl border border-border-gray/50">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-black">{speaker}</h4>
                        <p className="text-sm text-muted-foreground">Guest Speaker</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {mediaList.length > 0 && (
              <section>
                <h2 className="text-3xl font-playfair font-bold mb-8 text-black">Event Gallery</h2>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {images.map((img: any) => (
                      <div key={img._id} className="aspect-[4/3] rounded-2xl overflow-hidden group">
                        <img src={img.cloudinaryUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                )}
                {videos.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((vid: any) => (
                      <div key={vid._id} className="aspect-video rounded-2xl overflow-hidden bg-black/5">
                         <video src={vid.cloudinaryUrl} controls className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-[#FAFAFA] p-8 rounded-[32px] border border-border-gray shadow-sm">
              <h3 className="text-2xl font-playfair font-bold mb-2 text-black">Secure Your Seat</h3>
              <p className="text-muted-foreground text-sm mb-8">Registration is free but mandatory for seating arrangement.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-border-gray">
                  <span className="text-muted-foreground text-sm">Date</span>
                  <span className="font-medium text-black text-sm">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border-gray">
                  <span className="text-muted-foreground text-sm">Time</span>
                  <span className="font-medium text-black text-sm">{event.time}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border-gray">
                  <span className="text-muted-foreground text-sm">Location</span>
                  <span className="font-medium text-black text-sm">{event.location}</span>
                </div>
              </div>

              <Button asChild className="w-full h-14 rounded-full bg-primary hover:bg-[#111111] text-white font-bold tracking-widest uppercase text-xs">
                <Link href={`/events/${event.slug}/register`}>
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
