"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Rocket, Users, Globe, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="bg-[#020617] min-h-screen pt-24 pb-12 overflow-hidden">
      {/* 1. Page Header */}
      <section className="relative px-4 py-20 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            Preserving the <span className="italic text-sky-400">Legacy</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            This tribute is dedicated to the 14 souls of STS-51-L and STS-107, 
            and to the millions of people whose lives were changed by their journey.
          </p>
        </motion.div>
      </section>

      {/* 2. Tribute Purpose Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center">
              <Heart className="text-sky-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif text-white">Why This Site Exists</h2>
            <p className="text-slate-400 leading-relaxed">
              History is often recorded in dates and technical reports, but the true impact of the Space Shuttle 
              programs lives in the hearts of those who watched, learned, and dreamt alongside the crew.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We built this platform to move beyond the tragedy and focus on the <strong>inspiration</strong>. 
              By sharing personal stories, we ensure that the names Scobee, Smith, McNair, Onizuka, Resnik, 
              Jarvis, McAuliffe, Husband, McCool, Anderson, Brown, Chawla, Clark, and Ramon are never forgotten.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative aspect-square rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 flex items-center justify-center p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
            <div className="text-center">
                <Globe className="w-24 h-24 text-slate-700 mx-auto mb-6" />
                <div className="text-5xl font-serif text-sky-500/20 uppercase tracking-[0.2em]">Memorial</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Historical Context (The Missions) */}
      <section className="py-24 bg-slate-900/20 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-serif text-white mb-16">The Missions That Defined an Era</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MissionContextCard 
              title="Challenger (1986)" 
              description="STS-51-L was set to be the first time a civilian, a teacher, entered space. It became a moment that unified the world in grief and sparked a new era of safety and resilience in space exploration."
              icon={<Rocket className="w-5 h-5" />}
            />
            <MissionContextCard 
              title="Columbia (2003)" 
              description="STS-107 was a marathon of science. For 16 days, the crew lived their dream of expanding human knowledge. Their loss taught us the heavy price of discovery and the necessity of vigilance."
              icon={<ShieldCheck className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* 4. Credits Section */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
            <Users className="w-8 h-8 text-sky-400 mx-auto mb-6" />
            <h3 className="text-xl font-serif text-white mb-4">A Community Project</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
                This website is a non-profit tribute project created to honor the history of NASA's Space Shuttle program. 
                All historical images are courtesy of NASA. All stories are submitted by users and remain the property of their respective authors.
            </p>
            <div className="flex justify-center gap-4">
                <div className="h-px w-12 bg-slate-800 self-center" />
                <span className="text-xs text-slate-600 uppercase tracking-widest font-bold">Per Aspera Ad Astra</span>
                <div className="h-px w-12 bg-slate-800 self-center" />
            </div>
        </motion.div>
      </section>
    </main>
  );
};

/* Internal UI Component for Mission Cards */
const MissionContextCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
  <div className="p-8 rounded-3xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition-colors group">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-white">{title}</h3>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed font-light">
      {description}
    </p>
  </div>
);

export default AboutPage;