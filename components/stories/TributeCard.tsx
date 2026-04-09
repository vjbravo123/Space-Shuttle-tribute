import React from 'react';
import Image from 'next/image';
import { Quote, Calendar } from 'lucide-react';

export const TributeCard = ({ story }: any) => {
  return (
    <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#0f172a] border border-white/10 transition-all duration-700 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {story.imageUrl ? (
          <Image 
            src={story.imageUrl} 
            alt={story.title}
            fill
            className="object-cover opacity-50 group-hover:opacity-20 transition-all duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#020617] flex items-center justify-center">
            <Quote size={60} className="text-white/5 -rotate-12" />
          </div>
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 uppercase tracking-widest bg-sky-500/10 px-2 py-1 rounded">
              <Calendar size={10} />
              {new Date(story.createdAt).getFullYear()}
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 leading-tight group-hover:text-sky-300 transition-colors">
            {story.title}
          </h3>
          
          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
            <p className="text-slate-300 text-sm font-light leading-relaxed line-clamp-4 mb-6">
              {story.content}
            </p>
          </div>
        </div>

        {/* Author Footer */}
        <div className="mt-4 pt-6 border-t border-white/10 flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
              {story.name?.charAt(0) || 'A'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0f172a] rounded-full" title="Verified Story" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-200">{story.name || 'Anonymous'}</span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Archive Witness</span>
          </div>
        </div>
      </div>
    </div>
  );
};