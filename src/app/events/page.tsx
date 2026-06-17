import Link from 'next/link';
import { getEvents } from '@/lib/actions';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-black tracking-tight mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-light">
            Join us at our upcoming gatherings as we equip and empower the next generation of kingdom leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => (
            <Card key={event._id} className="overflow-hidden bg-white border-transparent hover:shadow-xl transition-all duration-300 group rounded-[24px]">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.banner} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-playfair font-bold text-black mb-4 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="flex-1 rounded-full bg-primary hover:bg-[#111111] text-white">
                    <Link href={`/events/${event.slug}`}>
                      View Event
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-12 h-12 p-0 rounded-full border-border-gray text-black hover:bg-black hover:text-white transition-colors">
                    <Link href={`/events/${event.slug}/register`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
