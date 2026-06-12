"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Mail, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Community', path: '/community' },
    { name: 'Shop', path: '/shop' },
    { name: 'Media', path: '/media' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#1A1A1A] text-white py-2 hidden lg:block border-b border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6 text-gray-300">
            <a href="mailto:info@wealthyyouth.org" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              info@wealthyyouth.org
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              +1 (234) 567-890
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 mr-4 border-r border-white/20 pr-6">
              <span className="text-gray-400 italic text-xs">An Expression of</span>
              <a href="https://gracenation.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors font-medium text-sm tracking-wide">
                Grace Nation International
              </a>
            </div>
            <div className="flex gap-4 text-gray-300 text-xs tracking-wider uppercase">
              <a href="#" className="hover:text-accent transition-colors">Facebook</a>
              <a href="#" className="hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">YouTube</a>
              <a href="#" className="hover:text-accent transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl shadow-lg border-black/5 dark:border-white/10'
            : 'bg-white/40 dark:bg-black/40 backdrop-blur-md border-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(122,23,55,0.3)] group-hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition-all duration-300">
                <span className="text-white font-bold text-xl tracking-tighter">WY</span>
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-xl text-foreground tracking-tight uppercase">Wealthy Youth</h1>
                <p className="text-xs text-accent font-medium tracking-widest uppercase mt-0.5">Raising Kingdom Leaders</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-lg transition-all relative group overflow-hidden ${
                    pathname === link.path
                      ? 'text-accent font-medium'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  <span className="relative z-10 text-sm tracking-wide uppercase font-semibold">{link.name}</span>
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  {pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-foreground" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>

              <Button
                asChild
                className="hidden md:inline-flex bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <Link href="/membership">Join Us</Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      pathname === link.path
                        ? 'bg-primary text-white'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/membership"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-center font-medium"
                >
                  Join Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
