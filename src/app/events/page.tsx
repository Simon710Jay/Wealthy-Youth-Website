"use client";
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Leadership Summit 2026',
      date: new Date('2026-07-15T09:00:00'),
      location: 'Grace Arena, Main Campus',
      category: 'Conference',
      attendees: 1200,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      description: 'Three days of transformative teaching, networking, and spiritual empowerment for emerging leaders.',
      featured: true,
    },
    {
      id: 2,
      title: 'Worship Night',
      date: new Date('2026-06-20T18:00:00'),
      location: 'Main Sanctuary',
      category: 'Worship',
      attendees: 500,
      image: 'https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=800&q=80',
      description: 'An evening of powerful worship, prayer, and encounter with the presence of God.',
      featured: false,
    },
    {
      id: 3,
      title: 'Career Excellence Workshop',
      date: new Date('2026-06-25T14:00:00'),
      location: 'Learning Center',
      category: 'Workshop',
      attendees: 150,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      description: 'Practical sessions on career development, entrepreneurship, and marketplace excellence.',
      featured: false,
    },
    {
      id: 4,
      title: 'Youth Outreach',
      date: new Date('2026-07-01T10:00:00'),
      location: 'City Center',
      category: 'Outreach',
      attendees: 300,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
      description: 'Taking the love of Christ to the streets through evangelism and community service.',
      featured: false,
    },
  ];

  const [timeLeftArray, setTimeLeftArray] = useState<TimeLeft[]>([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      return upcomingEvents.map(event => {
        const difference = event.date.getTime() - new Date().getTime();
        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    };

    setTimeLeftArray(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeftArray(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Conference: 'bg-primary text-white',
      Worship: 'bg-accent text-secondary',
      Workshop: 'bg-secondary text-white',
      Outreach: 'bg-primary/80 text-white',
    };
    return colors[category] || 'bg-muted text-foreground';
  };

  const featuredEvent = upcomingEvents.find(e => e.featured);
  const regularEvents = upcomingEvents.filter(e => !e.featured);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Upcoming Events</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Join us for life-changing experiences and powerful encounters.
          </p>
        </motion.div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 text-lg px-4 py-2 bg-accent text-secondary">Featured Event</Badge>
              <Card className="overflow-hidden border-2 border-primary shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  <div
                    className="h-96 md:h-auto bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredEvent.image})` }}
                  />
                  <CardContent className="p-10 flex flex-col justify-center">
                    <Badge className={`mb-4 w-fit ${getCategoryColor(featuredEvent.category)}`}>
                      {featuredEvent.category}
                    </Badge>
                    <h2 className="text-4xl font-bold mb-4">{featuredEvent.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{featuredEvent.description}</p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>{featuredEvent.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{featuredEvent.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>{featuredEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="w-5 h-5 text-primary" />
                        <span>{featuredEvent.attendees} Expected Attendees</span>
                      </div>
                    </div>

                    {/* Countdown Timer */}
                    {timeLeftArray[0] && (
                      <div className="grid grid-cols-4 gap-4 mb-8">
                        {[
                          { label: 'Days', value: timeLeftArray[0].days },
                          { label: 'Hours', value: timeLeftArray[0].hours },
                          { label: 'Minutes', value: timeLeftArray[0].minutes },
                          { label: 'Seconds', value: timeLeftArray[0].seconds },
                        ].map((item, index) => (
                          <div key={index} className="text-center">
                            <div className="bg-gradient-to-br from-primary to-accent text-white rounded-lg p-4 mb-2">
                              <div className="text-3xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-secondary">
                      Register Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">More Events</h2>
            <p className="text-xl text-muted-foreground">
              Don't miss these incredible opportunities to grow and connect.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <CardHeader>
                    <Badge className={`mb-2 w-fit ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </Badge>
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{event.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Mini Countdown */}
                    {timeLeftArray[index + 1] && (
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        {[
                          { label: 'D', value: timeLeftArray[index + 1].days },
                          { label: 'H', value: timeLeftArray[index + 1].hours },
                          { label: 'M', value: timeLeftArray[index + 1].minutes },
                          { label: 'S', value: timeLeftArray[index + 1].seconds },
                        ].map((item, i) => (
                          <div key={i} className="text-center">
                            <div className="bg-primary text-white rounded p-2 text-sm font-bold">
                              {item.value.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
