"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import {
  Play, Users, Calendar, BookOpen, Heart, Award,
  TrendingUp, Target, Globe, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Home() {
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

  const stats = [
    { number: '5,000+', label: 'Active Members', icon: Users },
    { number: '200+', label: 'Events Annually', icon: Calendar },
    { number: '50+', label: 'Countries Reached', icon: Globe },
    { number: '1,000+', label: 'Lives Transformed', icon: Heart },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Powerful Teaching',
      description: 'Dynamic sermons and Bible studies that transform lives and build strong foundations.',
    },
    {
      icon: Users,
      title: 'Vibrant Community',
      description: 'Connect with like-minded youth passionate about faith, purpose, and excellence.',
    },
    {
      icon: Target,
      title: 'Leadership Development',
      description: 'Comprehensive programs designed to develop world-class kingdom leaders.',
    },
    {
      icon: Award,
      title: 'Excellence Culture',
      description: 'Pursuing excellence in all areas: spiritual, academic, career, and personal growth.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 1.5 + 0.5
              }}
              animate={{
                y: [null, Math.random() * -300 - 100],
                x: [null, Math.random() * 100 - 50],
                opacity: [null, Math.random() * 0.8 + 0.2, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-secondary/70 to-black/50" />
            </div>

            <div className="relative h-full container mx-auto px-4 flex items-center z-20">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: currentSlide === index ? 0 : 30, opacity: currentSlide === index ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl text-white"
              >
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0, x: currentSlide === index ? 0 : -20 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md text-accent tracking-widest text-sm font-semibold uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  Grace Nation International
                </motion.div>
                <motion.h1
                  className="mb-6 tracking-tight drop-shadow-2xl"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, lineHeight: 1.1 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="mb-10 text-xl md:text-2xl text-gray-200/90 font-light max-w-2xl"
                  style={{ lineHeight: 1.6 }}
                >
                  {slide.subtitle}
                </motion.p>
                <div className="flex flex-wrap gap-5">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-accent to-[#E5C76B] hover:opacity-90 text-foreground px-10 py-7 text-lg font-bold rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.6)] transition-all duration-300"
                  >
                    <Link href="/membership">Join Wealthy Youth</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-foreground px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                      <Play className="mr-3 w-5 h-5" />
                      Watch Live
                    </a>
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
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === index ? 'bg-accent w-16 shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'bg-white/40 w-4 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-accent hover:border-accent hover:text-foreground flex items-center justify-center text-white transition-all duration-300 shadow-lg z-30 group"
        >
          <ChevronLeft className="w-7 h-7 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-accent hover:border-accent hover:text-foreground flex items-center justify-center text-white transition-all duration-300 shadow-lg z-30 group"
        >
          <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Wealthy Youth?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience transformative growth in an environment designed for excellence and spiritual development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-2 hover:border-primary">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-secondary via-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Step Into Your Destiny?
            </h2>
            <p className="text-xl mb-10 text-gray-200">
              Join a community of passionate young leaders committed to making a global impact for the Kingdom.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-secondary px-10 py-6 text-lg font-semibold"
              >
                <Link href="/membership">Get Started Today</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary px-10 py-6 text-lg font-semibold"
              >
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
