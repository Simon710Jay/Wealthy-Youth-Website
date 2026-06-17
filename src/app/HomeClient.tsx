"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import {
  Play, Users, Calendar, BookOpen, Heart, Award,
  TrendingUp, Target, Globe, ChevronLeft, ChevronRight, ArrowRight, MapPin
} from 'lucide-react';

export default function HomeClient({ events, media }: { events: any[], media: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Raising Kingdom Leaders for Global Impact',
      subtitle: 'Empowering the next generation through faith, leadership, innovation, and purpose.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&q=80',
    },
    {
      title: 'Experience Transformation Through Community',
      subtitle: 'Join thousands of young leaders discovering their divine purpose and destiny.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80',
    },
    {
      title: 'Building the Future, One Leader at a Time',
      subtitle: 'Equipping youth with biblical wisdom and practical skills for kingdom excellence.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80',
    },
  ];

  const pillars = [
    { icon: Target, title: 'Leadership', desc: 'Developing character and competence for global influence.' },
    { icon: Users, title: 'Community', desc: 'Authentic relationships that foster growth and accountability.' },
    { icon: TrendingUp, title: 'Growth', desc: 'Continuous spiritual, personal, and professional development.' },
    { icon: BookOpen, title: 'Purpose', desc: 'Discovering and fulfilling your divine assignment on earth.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden bg-black">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.05
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ pointerEvents: currentSlide === index ? 'auto' : 'none' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative h-full container mx-auto px-4 flex items-center z-20">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: currentSlide === index ? 0 : 30, opacity: currentSlide === index ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl text-white mt-12"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0, x: currentSlide === index ? 0 : -20 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block mb-6 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary tracking-widest text-xs font-bold uppercase"
                >
                  An Expression of Grace Nation International
                </motion.div>
                <motion.h1
                  className="mb-6 tracking-tight font-playfair font-bold text-left leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="mb-10 text-lg md:text-xl text-gray-200 font-light max-w-2xl text-left leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>
                <div className="flex flex-wrap gap-5">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-10 py-7 text-base font-bold rounded-full shadow-lg transition-all duration-300"
                  >
                    <Link href="/membership">Join Wealthy Youth</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border border-white/20 bg-white/10 hover:bg-primary hover:border-primary hover:text-white px-10 py-7 text-base font-semibold rounded-full transition-all duration-300"
                  >
                    <Link href="/sermons">
                      <Play className="mr-3 w-5 h-5 fill-white" />
                      Watch Teachings
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${currentSlide === index ? 'bg-primary w-12 shadow-md' : 'bg-white/40 w-4 hover:bg-white/70'
                }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center text-white transition-all duration-300 shadow-lg z-30 border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center text-white transition-all duration-300 shadow-lg z-30 border border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Refined About Section (Vision, Mission & Values) */}
      <section className="py-32 bg-[#FAFAFA] border-b border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 lg:sticky lg:top-36">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-6xl md:text-7xl font-playfair font-bold leading-none tracking-tight mb-8">
                  <span className="text-[#111111] block mb-2">Vision,</span>
                  <span className="text-primary block mb-2">Mission</span>
                  <span className="text-muted-foreground">&</span> <span className="text-[#D4A017]">Values</span>
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-md">
                  Empowering the youth with clear direction, active spiritual assignment, and a robust culture of character.
                </p>
                <Button asChild className="bg-white border border-border-gray hover:bg-primary hover:border-primary hover:text-white rounded-full px-8 py-6 font-bold tracking-widest uppercase text-xs transition-all shadow-sm hover:shadow-md text-black">
                  <Link href="/about" className="flex items-center gap-2">
                    Read Our Full Story <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Interactive Cards & Images */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                {/* Vision Card */}
                <motion.div
                  whileHover={{ y: -6, borderColor: "#111111" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[24px] p-8 border border-transparent shadow-sm hover:shadow-lg active:shadow-xl cursor-pointer flex gap-6 items-start transition-all"
                >
                  <div className="w-12 h-12 bg-[#111111]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-[#111111]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 block mb-1">OUR VISION</span>
                    <h4 className="font-playfair font-bold text-xl text-black mb-2">Direction & Destiny</h4>
                    <p className="text-muted-foreground font-light text-base leading-relaxed">
                      To see a generation of young people thoroughly equipped, empowered, and released to impact every sphere of society with kingdom principles.
                    </p>
                  </div>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                  whileHover={{ y: -6, borderColor: "#6B102E" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[24px] p-8 border border-transparent shadow-sm hover:shadow-lg active:shadow-xl cursor-pointer flex gap-6 items-start transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">OUR MISSION</span>
                    <h4 className="font-playfair font-bold text-xl text-black mb-2">Assignment & Impact</h4>
                    <p className="text-muted-foreground font-light text-base leading-relaxed">
                      We are committed to raising kingdom leaders through intentional discipleship, leadership development, and fostering a culture of excellence and divine purpose.
                    </p>
                  </div>
                </motion.div>

                {/* Values Card */}
                <motion.div
                  whileHover={{ y: -6, borderColor: "#D4A017" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[24px] p-8 border border-transparent shadow-sm hover:shadow-lg active:shadow-xl cursor-pointer flex gap-6 items-start transition-all"
                >
                  <div className="w-12 h-12 bg-[#D4A017]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#D4A017]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017]/60 block mb-1">OUR VALUES</span>
                    <h4 className="font-playfair font-bold text-xl text-black mb-4">Culture & Character</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {['Faith', 'Leadership', 'Excellence', 'Integrity', 'Purpose', 'Service'].map((val) => (
                        <span key={val} className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 bg-[#FAFAFA] text-[#D4A017] border border-[#D4A017]/20 rounded-full hover:border-[#D4A017]/40 transition-colors">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Center Preview */}
      <section id="media" className="py-32 bg-[#111111] text-white overflow-hidden relative border-b border-white/5">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-playfair font-bold mb-4">Media Center</h2>
              <p className="text-white/70 text-xl font-light">Relive the moments and catch up on latest teachings.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline" className="rounded-full border border-white/20 text-black hover:bg-primary hover:border-primary hover:text-white px-8 h-12 uppercase tracking-wider text-xs font-bold shadow-sm">
                <Link href="/media">Explore Media Center</Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Latest Photos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] rounded-3xl mb-6 relative overflow-hidden shadow-2xl">
                <img src={media?.photos?.[0]?.url || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"} alt="Photos" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-playfair text-3xl font-bold mb-4 text-white">Event Photos</h3>
                  <Button asChild className="w-full rounded-full bg-white text-black hover:bg-[#FAFAFA] font-bold tracking-widest uppercase text-xs h-12 shadow-sm transition-colors border-none">
                    <Link href="/media">View Photos</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Latest Sermon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] rounded-3xl mb-6 relative overflow-hidden shadow-2xl">
                <img src={media?.videos?.[0]?.thumbnail || "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80"} alt="Sermons" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-playfair text-3xl font-bold mb-4 text-white">Latest Sermon</h3>
                  <Button asChild className="w-full rounded-full bg-primary hover:bg-[#5a0c25] text-white font-bold tracking-widest uppercase text-xs h-12 shadow-sm transition-colors border-none">
                    <Link href="/media">Watch Sermon</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Livestream */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] rounded-3xl mb-6 relative overflow-hidden shadow-2xl">
                <img src={media?.livestreams?.[0]?.thumbnail || "https://images.unsplash.com/photo-1516280440502-385fbcebf0db?w=800&q=80"} alt="Livestream" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-6 right-6 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse shadow-md">
                  <span className="w-2 h-2 bg-white rounded-full"></span> Live Now
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-playfair text-3xl font-bold mb-4 text-white">Live Broadcast</h3>
                  <Button asChild className="w-full rounded-full bg-white text-black hover:bg-[#FAFAFA] font-bold tracking-widest uppercase text-xs h-12 shadow-sm transition-colors border-none">
                    <Link href="/media">Watch Live</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Wealthy Youth (Features) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-playfair font-bold mb-6 text-black">Why Wealthy Youth</h2>
            <p className="text-muted-foreground text-xl font-light max-w-2xl mx-auto">Pillars of our movement designed to elevate your life and calling.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-3xl overflow-hidden group">
                  <CardContent className="p-10 text-center relative z-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-playfair font-bold text-2xl mb-4 text-black">{item.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-32 bg-[#FAFAFA] border-t border-b border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-playfair font-bold mb-4 text-black">Upcoming Events</h2>
              <p className="text-muted-foreground text-xl font-light">Join us at our next gathering.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline" className="rounded-full border border-border-gray bg-white text-black hover:bg-primary hover:border-primary hover:text-white px-8 h-12 uppercase tracking-wider text-xs font-bold shadow-sm hover:shadow-md">
                <Link href="/events">View All Events</Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, i) => (
              <motion.div
                key={event._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-md rounded-3xl overflow-hidden group bg-white h-full flex flex-col hover:shadow-xl transition-all duration-300">
                  <div className="h-64 bg-secondary overflow-hidden relative">
                    <img src={event.banner || event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/95 text-primary font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                      Upcoming
                    </div>
                  </div>
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <h3 className="font-playfair font-bold text-2xl mb-4 text-black leading-snug">{event.title}</h3>

                    <div className="space-y-3 mb-8 flex-1">
                      <div className="flex items-center gap-3 text-muted-foreground font-light text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground font-light text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full rounded-full bg-primary hover:bg-[#111111] text-white h-12 font-bold tracking-wide shadow-md hover:-translate-y-1 transition-all">
                      <Link href={`/events/${event.slug}/register`}>Register For Event</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {events.length === 0 && (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                No upcoming events at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 text-black">
              Ready to Step Into Your Destiny?
            </h2>
            <p className="text-lg md:text-xl font-light text-muted-foreground mb-10 leading-relaxed">
              Join a community of passionate young leaders committed to making a global impact for the Kingdom.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 py-7 shadow-lg transition-all duration-300">
                <Link href="/membership">Get Started Today</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border border-border-gray hover:bg-primary hover:border-primary hover:text-white rounded-full px-12 py-7 text-black transition-all duration-300 bg-white">
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
