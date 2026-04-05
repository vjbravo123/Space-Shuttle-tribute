"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Send } from 'lucide-react';
import { cn } from '@/lib/utils'; // Standard utility for merging classes

const navLinks = [
  { name: 'Challenger', href: '/challenger' },
  { name: 'Columbia', href: '/columbia' },
  { name: 'Stories', href: '/stories' },
  { name: 'About', href: '/about' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-12",
        scrolled 
          ? "py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50" 
          : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2 z-[110]">
          <div className="relative">
            <Sparkles className="text-sky-400 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full"
            />
          </div>
          <span className="font-serif text-xl tracking-tighter text-white uppercase italic">
            Eternal Mission
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-[0.2em] transition-colors hover:text-sky-400",
                pathname === link.href ? "text-sky-400 font-medium" : "text-slate-400"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden md:block">
          <Link href="/share-story">
            <button className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-slate-700 hover:border-slate-400 rounded-full transition-all duration-300">
              <span className="text-xs uppercase tracking-widest text-white">Share Story</span>
              <Send size={14} className="text-sky-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden text-white z-[110] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center gap-10 z-[100] md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-3xl font-serif text-white hover:text-sky-400 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/share-story" className="mt-4 px-8 py-4 bg-sky-500 text-white rounded-full font-medium">
                Share Your Story
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};