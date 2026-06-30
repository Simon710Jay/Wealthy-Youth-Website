"use client";
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Video, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/#events' },
    { name: 'Sermons', path: '/#media' },
    { name: 'Shop', path: '/shop' },
  ];

  const resources = [
    { name: 'E-Books', path: '/resources' },
    { name: 'Study Materials', path: '/resources' },
    { name: 'Leadership Manuals', path: '/resources' },
    { name: 'Prayer Requests', path: '/community' },
    { name: 'Testimonies', path: '/community' },
  ];

  return (
    <footer className="bg-neutral-900 text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* About */}
          <div className="space-y-8">
            <div>
              <h3 className="font-playfair font-bold text-2xl tracking-tight leading-none mb-1">
                WEALTHY YOUTH
              </h3>
              <p className="text-xs font-playfair italic text-white/70">An Expression of Grace Nation</p>
            </div>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              Empowering the next generation through faith, leadership, innovation, and purpose.
              Raising kingdom leaders for global impact.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-primary text-white hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a href="#" className="w-12 h-12 bg-primary text-white hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-primary text-white hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-sm">
                <Video className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-8 uppercase tracking-widest text-white">Explore</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-8 uppercase tracking-widest text-white">Resources</h3>
            <ul className="space-y-4">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-8 uppercase tracking-widest text-white">Connect</h3>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-4 text-sm text-white/80 font-medium">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Kingdom Street, City, State 12345</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-white/80 font-medium">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-4 text-sm text-white/80 font-medium">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@wealthyyouth.org" className="hover:text-white transition-colors">info@wealthyyouth.org</a>
              </li>
            </ul>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-4 font-bold text-white">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 rounded-full text-white placeholder:text-white/60 focus-visible:ring-1 focus-visible:ring-white h-12 px-6"
                />
                <Button type="submit" className="rounded-full bg-primary hover:bg-primary/90 text-white h-12 w-12 p-0 shrink-0 shadow-sm">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60 font-medium uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Wealthy Youth. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
