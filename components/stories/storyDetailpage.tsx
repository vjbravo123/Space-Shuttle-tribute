"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Clock, User, Share2, ArrowLeft, Calendar, Quote, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Footer } from '../home/Footer';

export default function StoryDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    fetch(`/api/stories/${id}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 1, 0.3] 
        }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-12 h-12 border border-sky-500/50 rounded-full flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-sky-500 rounded-full" />
      </motion.div>
      <span className="text-[10px] uppercase tracking-[0.4em] text-sky-500/50 animate-pulse">Establishing Uplink</span>
    </div>
  );

  const { data: story, related } = data;
  const isChallenger = story.mission === 'challenger';
  const themeColor = isChallenger ? "text-sky-400" : "text-purple-400";
  const themeBg = isChallenger ? "bg-sky-500" : "bg-purple-500";
  const themeBorder = isChallenger ? "border-sky-500/20" : "border-purple-500/20";

  return (
    <main className="bg-[#020617] min-h-screen selection:bg-sky-500/30">
      {/* Reading Progress */}
      <motion.div className={cn("fixed top-0 left-0 right-0 h-1 z-[100] origin-left", themeBg)} style={{ scaleX }} />

      {/* Atmospheric Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          {story.imageUrl ? (
            <>
              <img src={story.imageUrl} alt="" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 via-[#020617]/60 to-[#020617]" />
            </>
          ) : (
            <div className={cn("w-full h-full opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-[#020617] to-[#020617]")} />
          )}
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-col items-center text-center gap-8"
          >
            <Link href="/stories" className="group flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Archive Index</span>
            </Link>

            <div className="space-y-4">
               <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn("px-4 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.5em] font-bold inline-block", 
                isChallenger ? "border-sky-500/30 text-sky-400 bg-sky-500/5" : "border-purple-500/30 text-purple-400 bg-purple-500/5")}>
                Mission: {story.mission}
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-serif text-white leading-[1.1] italic max-w-4xl tracking-tight">
                {story.title}
              </h1>
            </div>

            <div className="flex items-center gap-12 pt-12">
               <div className="flex flex-col items-center gap-2">
                  <span className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-mono">Observer</span>
                  <span className="text-white font-light tracking-wide">{story.name}</span>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div className="flex flex-col items-center gap-2">
                  <span className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-mono">Timestamp</span>
                  <span className="text-white font-light tracking-wide">{new Date(story.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
               </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-500"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-mono">Scroll to Read</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* 2. STORY CONTENT */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12">
          
          {/* Side Info */}
          <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
            <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/20 backdrop-blur-sm">
              <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-mono">Transmission Metadata</h4>
              <div className="space-y-4">
                {[
                  { label: 'Origin', value: 'Terrestrial-Link' },
                  { label: 'Integrity', value: '99.8%' },
                  { label: 'Status', value: 'Archived' },
                  { label: 'ID', value: `#${id?.toString().slice(-6)}` },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-600 uppercase tracking-tighter">{item.label}</span>
                    <span className="text-[10px] text-slate-300 font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Narrative */}
          <div className="relative">
            <Quote className={cn("absolute -left-20 -top-8 opacity-10", themeColor)} size={120} />
            <div className="prose prose-invert prose-2xl max-w-none">
              <p className="text-slate-200 leading-[1.8] font-light text-2xl first-letter:text-7xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-white whitespace-pre-line drop-shadow-sm">
                {story.narrative}
              </p>
            </div>

            {/* Share Interface */}
            <div className="mt-32 p-1 border-t border-white/5">
              <div className="bg-gradient-to-b from-white/5 to-transparent rounded-[3rem] p-12 text-center border border-white/5 overflow-hidden relative group">
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700", themeBg)} />
                <Share2 className="text-slate-500 mx-auto mb-6" size={24} />
                <h4 className="text-white font-serif text-3xl mb-4 italic">Preserve the Legacy</h4>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 font-light leading-relaxed">
                  Every shared story ensures that these moments are never lost to the vacuum of time.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Twitter', 'Facebook', 'Copy Transmission'].map((platform) => (
                    <button key={platform} className="px-8 py-3 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-mono">
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Gutter - Decorative */}
          <aside className="hidden lg:flex flex-col items-center justify-start pt-2 sticky top-24 h-fit">
             <div className="flex flex-col gap-8 items-center">
                <div className="w-px h-32 bg-gradient-to-b from-sky-500/50 to-transparent" />
                <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[1em] text-slate-600 font-mono">Final Transmission</span>
             </div>
          </aside>
        </div>
      </section>

      {/* 3. RELATED STORIES */}
      {related.length > 0 && (
        <section className="py-32 px-6 border-t border-white/5 bg-[#01040a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-20 gap-4">
                <Zap size={20} className={themeColor} />
                <h2 className="text-4xl font-serif text-white italic text-center tracking-tight">Syncing Related Memories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item: any) => (
                <Link key={item._id} href={`/stories/${item._id}`} className="group relative">
                   <div className="h-full p-8 rounded-3xl bg-slate-900/40 border border-white/5 group-hover:border-white/20 group-hover:bg-slate-900/60 transition-all duration-500">
                      <div className={cn("w-12 h-[1px] mb-8 transition-all duration-500 group-hover:w-full", themeBg)} />
                      <h3 className="text-white font-serif text-2xl mb-4 leading-snug group-hover:text-sky-300 transition-colors">
                        "{item.title}"
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-3 font-light leading-relaxed mb-6">
                        {item.narrative}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors font-mono">
                        Read Entry <ChevronRight size={12} />
                      </div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}