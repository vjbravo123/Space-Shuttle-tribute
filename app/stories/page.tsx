"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StoriesGrid } from '@/components/stories/StoriesGrid';
import { Pagination } from '@/components/stories/Pagination';
import { Loader2, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/home/Footer';
import { Navbar } from '@/components/layout/Navbar';

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // This function is passed to the PageHeader
  const handleFilterChange = useCallback(async (mission: string, search: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (mission !== 'all') params.append('mission', mission);
      if (search) params.append('search', search);
      
      // If your API supports pagination, add: params.append('page', currentPage.toString());

      const response = await fetch(`/api/stories?${params.toString()}`);
      const result = await response.json();
      
      if (result.success) {
        setStories(result.data);
        // setTotalPages(result.totalPages || 1); // Uncomment if API supports pagination
      }
    } catch (error) {
      console.error("Archive sync failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] flex flex-col">
        <Navbar/>
      {/* 1. Header handles UI input and triggers the Page's fetch function */}
      <PageHeader onFilterChange={handleFilterChange} />

      <section className="flex-grow max-w-7xl mx-auto px-6 w-full py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <Loader2 className="animate-spin mb-4 opacity-20" size={48} />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Synchronizing Archive...</span>
          </div>
        ) : stories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <StoriesGrid stories={stories} />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(page) => setCurrentPage(page)} 
            />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/5 rounded-[3rem]">
            <Inbox className="text-slate-800 mb-4" size={48} />
            <h3 className="text-white font-serif text-xl">No transmissions found in this sector</h3>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default StoriesPage;