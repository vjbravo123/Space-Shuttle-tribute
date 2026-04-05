"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Rocket, Milestone, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryPageHeaderProps {
  activeMission: 'challenger' | 'columbia';
  onMissionChange: (mission: 'challenger' | 'columbia') => void;
}

export const StoryPageHeader = ({ activeMission, onMissionChange }: StoryPageHeaderProps) => {
  return (
    <section className="pt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 mb-10 relative group"
        >
          <PenLine className={cn(
            "w-8 h-8 transition-colors duration-700",
            activeMission === 'challenger' ? "text-sky-400" : "text-purple-400"
          )} />
          <div className={cn(
            "absolute inset-0 blur-2xl rounded-full opacity-20 transition-colors duration-700",
            activeMission === 'challenger' ? "bg-sky-400" : "bg-purple-400"
          )} />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight"
        >
          Share Your <span className="italic font-light">Perspective</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Your memories ensure their legacy stays in orbit. Choose a mission to begin your tribute.
        </motion.p>

        {/* PREMIUM TABS */}
        <div className="relative inline-flex p-1.5 bg-slate-900/60 border border-white/10 backdrop-blur-2xl rounded-2xl w-full max-w-md">
          <motion.div
            layoutId="tabBg"
            className={cn(
              "absolute inset-y-1.5 rounded-xl z-0",
              activeMission === 'challenger' ? "bg-sky-500" : "bg-purple-600"
            )}
            animate={{ x: activeMission === 'challenger' ? 0 : '100%', width: '50%' }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          />

          <button
            onClick={() => onMissionChange('challenger')}
            className={cn(
              "relative z-10 flex-1 py-4 flex items-center justify-center gap-3 transition-colors duration-500 text-xs uppercase tracking-[0.2em]",
              activeMission === 'challenger' ? "text-slate-950 font-bold" : "text-slate-500 hover:text-white"
            )}
          >
            <Rocket size={16} /> Challenger
          </button>

          <button
            onClick={() => onMissionChange('columbia')}
            className={cn(
              "relative z-10 flex-1 py-4 flex items-center justify-center gap-3 transition-colors duration-500 text-xs uppercase tracking-[0.2em]",
              activeMission === 'columbia' ? "text-white font-bold" : "text-slate-500 hover:text-white"
            )}
          >
            <Milestone size={16} /> Columbia
          </button>
        </div>

        <div className="mt-8 h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMission}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] font-medium"
            >
              <Sparkles size={12} className={activeMission === 'challenger' ? "text-sky-400" : "text-purple-400"} />
              <span className={activeMission === 'challenger' ? "text-sky-400/80" : "text-purple-400/80"}>
                Writing for {activeMission} Legacy
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};