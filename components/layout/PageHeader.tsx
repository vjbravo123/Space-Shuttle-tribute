"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Rocket, Ghost, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  onFilterChange: (mission: string, search: string) => void;
}

export const PageHeader = ({ onFilterChange }: PageHeaderProps) => {
  const [activeMission, setActiveMission] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Notify parent whenever filters change (with debounce for search)
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(activeMission, searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeMission, searchQuery, onFilterChange]);

  const missions = [
    { id: 'all', label: 'All Archive', icon: Sparkles, color: 'sky' },
    { id: 'challenger', label: 'Challenger', icon: Rocket, color: 'sky' },
    { id: 'columbia', label: 'Columbia', icon: Ghost, color: 'purple' },
  ];

  return (
    <header className="relative pt-32 pb-12 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(56,189,248,0.15),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-mono">Live Archive Sync</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-[1.1]">
            The Public <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-500">Chronicles</span>
          </h1>
        </motion.div>

        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-3 md:p-4 shadow-2xl flex flex-col lg:flex-row items-center gap-4">
            
            {/* TABS */}
            <div className="flex p-1 bg-slate-950/60 rounded-[1.5rem] border border-white/5 w-full lg:w-auto">
              {missions.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMission(m.id)}
                  className={cn(
                    "relative flex items-center gap-3 px-6 py-4 rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-all duration-500 flex-1 lg:flex-none justify-center",
                    activeMission === m.id ? "text-white" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {activeMission === m.id && (
                    <motion.div 
                      layoutId="activeGlow" 
                      className={cn("absolute inset-0 rounded-2xl", m.color === 'sky' ? "bg-sky-500" : "bg-purple-600")} 
                    />
                  )}
                  <m.icon size={16} className="relative z-10" />
                  <span className="relative z-10">{m.label}</span>
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-white transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by commander, keyword, or title..."
                className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-5 pl-16 pr-14 text-white placeholder:text-slate-600 outline-none focus:border-white/10 transition-all duration-500"
              />
              <AnimatePresence>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-6 text-slate-500 hover:text-white">
                    <X size={18} />
                  </button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};