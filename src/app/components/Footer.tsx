"use client";
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Video, MessageCircle, Send } from 'lucide-react';
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
    { name: 'Events', path: '/events' },
    { name: 'Sermons', path: '/sermons' },
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
    <footer className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">WY</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Wealthy Youth</h3>
                <p className="text-xs text-gray-300">Grace Nation International</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              Empowering the next generation through faith, leadership, innovation, and purpose.
              Raising kingdom leaders for global impact.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <Video className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-gray-300 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-sm text-gray-300 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>123 Kingdom Street, City, State 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@wealthyyouth.org" className="hover:text-accent transition-colors">info@wealthyyouth.org</a>
              </li>
            </ul>

            <div>
              <h4 className="font-medium mb-3">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-secondary flex-shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>&copy; 2026 Wealthy Youth - Grace Nation International. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
