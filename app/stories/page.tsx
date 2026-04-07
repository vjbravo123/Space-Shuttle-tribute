"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/forms/pageheader';
import { StoriesGrid } from '@/components/stories/StoriesGrid';
import { Pagination } from '@/components/stories/Pagination';
import { Loader2, Search, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/home/Footer';
import { Navbar } from '@/components/layout/Navbar';

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Single fetch function
  const fetchStories = useCallback(async (query: string, page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('mission', 'challenger');
      if (query) params.append('search', query);
      params.append('page', page.toString());

      const response = await fetch(`/api/stories?${params.toString()}`);
      const result = await response.json();
      
      if (result.success) {
        setStories(result.data);
        setTotalPages(result.totalPages || 1);
      }
    } catch (error) {
      console.error("Archive synchronization failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // EFFECT: Fetch data whenever query or page changes
  useEffect(() => {
    fetchStories(searchQuery, currentPage);
  }, [searchQuery, currentPage, fetchStories]);

  // MEMOIZED: This prevents PageHeader from re-triggering its effect unnecessarily
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-sky-500/5 blur-[120px] pointer-events-none" />
      <Navbar/>

      <PageHeader onSearch={handleSearch} />

      <section className="flex-grow max-w-7xl mx-auto px-6 w-full py-12 relative z-10">
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
               <Database size={12} className="text-sky-400" />
               <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                 Sector: Challenger Archive
               </span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            System Status: <span className="text-emerald-500">Nominal</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin text-sky-500 mb-4" size={40} />
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-sky-400/60">Synchronizing...</span>
            </motion.div>
          ) : stories.length > 0 ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <StoriesGrid stories={stories} />
              <div className="mt-20">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-[3rem]">
              <Search className="text-slate-700 mb-4" size={40} />
              <h3 className="text-white font-serif text-2xl">The Archive is Silent</h3>
              <button onClick={() => handleSearch("")} className="mt-8 text-sky-400 text-[10px] tracking-widest uppercase">Reset Search</button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </main>
  );
};

export default StoriesPage;