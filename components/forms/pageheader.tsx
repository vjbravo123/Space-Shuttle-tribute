"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Rocket, X, Cpu } from 'lucide-react';

interface PageHeaderProps {
  onSearch: (query: string) => void;
}

export const PageHeader = ({ onSearch }: PageHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const lastSearchRef = useRef(''); // Track last search to prevent loops

  useEffect(() => {
    // Only trigger if the query is different from the last one sent
    if (searchQuery === lastSearchRef.current) return;

    const timer = setTimeout(() => {
      lastSearchRef.current = searchQuery;
      onSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <header className="relative pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(56,189,248,0.12),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-sky-500/10 bg-sky-500/[0.03] backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-sky-400/80 font-mono">Challenger Archive Connected</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-white mb-6 leading-[1.1]">
            The Public <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-sky-400/50">Chronicles</span>
          </h1>
        </motion.div>

        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-3xl rounded-[2rem] p-2 shadow-2xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-sky-500/50 group-focus-within:text-sky-400 transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </div>

              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Query mission logs..."
                className="w-full bg-slate-950/60 border border-white/5 rounded-[1.6rem] py-5 md:py-6 pl-14 pr-32 text-white placeholder:text-slate-600 outline-none focus:border-sky-500/20 transition-all duration-500 text-sm md:text-base"
              />

              <div className="absolute inset-y-0 right-4 flex items-center gap-3">
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => setSearchQuery('')} 
                      className="p-2 text-slate-500 hover:text-white"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-[9px] text-slate-400 uppercase">
                  <Rocket size={14} className="text-sky-500" /> STS-51-L
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};