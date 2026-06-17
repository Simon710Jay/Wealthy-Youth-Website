"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Youtube, BookOpen, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Events', path: '/events' },
    { name: 'Media', path: '/media' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Community', path: '/community' },
    { name: 'Shop', path: '/shop' },
  ];

  const iconLinks = [
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/YOUR_PAGE' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/YOUR_PAGE' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@YOUR_CHANNEL' },
  ];

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 border-b backdrop-blur-md bg-white/25 ${
          isScrolled
            ? 'shadow-sm border-border/50'
            : 'border-transparent'
        }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-28">
            
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex flex-row items-center gap-2"
              >
                <span className="font-playfair font-black text-3xl md:text-4xl tracking-tighter text-black leading-none">
                  WEALTHY
                </span>
                <span className="font-playfair font-black text-3xl md:text-4xl tracking-tighter text-primary leading-none">
                  YOUTH
                </span>
              </motion.div>
            </Link>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="relative group py-2 text-sm tracking-widest font-semibold uppercase text-black"
                >
                  <span className="relative z-10 transition-colors group-hover:text-primary">
                    {link.name}
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              ))}
            </div>

            {/* Right: Actions / Socials */}
            <div className="hidden lg:flex items-center shrink-0">
              <div className="flex items-center gap-3">
                {iconLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    aria-label={link.name}
                    className="w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5" />
                  </Link>
                ))}
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Toggle & Tablet Socials */}
            <div className="flex items-center lg:hidden gap-4">
              <div className="hidden md:flex items-center gap-3 mr-2">
                {iconLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    aria-label={link.name}
                    className="w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5" />
                  </Link>
                ))}
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-white"
            >
              <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xl font-bold uppercase tracking-widest text-black hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 mt-6 border-t border-border/50">
                  <div className="flex md:hidden items-center gap-4 mb-4">
                    {iconLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label={link.name}
                        className="w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                      >
                        <link.icon className="w-5 h-5" />
                      </Link>
                    ))}
                  </div>
                  <div className="flex md:hidden items-center gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
