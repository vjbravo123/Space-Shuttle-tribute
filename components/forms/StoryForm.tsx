"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ShieldCheck, Info, X, Camera, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryFormProps {
  activeMission: "challenger" | "columbia";
}

export const StoryForm = ({ activeMission }: StoryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const themeColor = activeMission === "challenger" ? "sky" : "purple";

  const inputBaseStyles = cn(
    "w-full bg-slate-950/40 border border-white/10 rounded-2xl px-6 py-5 text-slate-100",
    "placeholder:text-slate-500/60 outline-none transition-all duration-300",
    "focus:bg-slate-900/60 focus:ring-1",
    activeMission === "challenger" 
      ? "focus:border-sky-500/50 focus:ring-sky-500/20" 
      : "focus:border-purple-500/50 focus:ring-purple-500/20"
  );

  const labelStyles = "text-[10px] uppercase tracking-[0.4em] text-slate-400 ml-1 font-mono font-semibold block mb-3";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      // Manually add the mission and the file
      formData.append("mission", activeMission);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        formRef.current?.reset();
        setImagePreview(null);
        setSelectedFile(null);
      } else {
        alert(`Error: ${result.error || "Failed to submit story"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-20 px-6 text-center"
      >
        <div className={cn("inline-flex p-4 rounded-full mb-6", 
          activeMission === 'challenger' ? "bg-sky-500/10 text-sky-400" : "bg-purple-500/10 text-purple-400")}>
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-serif text-white mb-4">Transmission Received</h2>
        <p className="text-slate-400 leading-relaxed mb-8">
          Thank you for sharing your memory. Your story is being processed and will be added to the 
          {activeMission === 'challenger' ? ' Challenger ' : ' Columbia '} legacy archive shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-white underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all text-xs uppercase tracking-widest"
        >
          Share another story
        </button>
      </motion.div>
    );
  }

  return (
    <section className="pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-slate-900/30 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 relative"
          >
            <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/10" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/10" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className={labelStyles}>Observer Name</label>
                  <input name="name" required type="text" placeholder="Commander John Doe" className={inputBaseStyles} />
                </div>
                <div className="space-y-1">
                  <label className={labelStyles}>Contact (Optional)</label>
                  <input name="email" type="email" placeholder="john@horizon.com" className={inputBaseStyles} />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>Log Title</label>
                <input name="title" required type="text" placeholder="The moment the world stood still..." className={cn(inputBaseStyles, "font-serif text-xl")} />
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>The Narrative</label>
                <textarea name="narrative" required rows={8} placeholder="Describe your experience..." className={cn(inputBaseStyles, "leading-relaxed resize-none font-sans")} />
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>Visual Evidence (Optional)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                  />
                  <div className="border border-dashed border-white/10 group-hover:border-white/20 rounded-2xl p-10 transition-all flex flex-col items-center justify-center bg-white/[0.02]">
                    {imagePreview ? (
                      <div className="relative w-full max-w-sm h-48 rounded-xl overflow-hidden group/img">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover/img:opacity-100 transition-opacity z-30 hover:bg-red-500/80"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className={cn("mb-4 transition-transform group-hover:scale-110", 
                          activeMission === 'challenger' ? "text-sky-500/50" : "text-purple-500/50")} size={32} />
                        <p className="text-slate-400 text-sm font-light">Click to upload a related photograph</p>
                        <p className="text-slate-600 text-[10px] mt-2 font-mono tracking-widest">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full relative py-6 rounded-2xl font-bold uppercase tracking-[0.5em] text-[11px] transition-all overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed",
                  activeMission === "challenger" ? "bg-sky-500 text-slate-950" : "bg-purple-600 text-white"
                )}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                   {isSubmitting ? (
                     <>
                      <Loader2 size={16} className="animate-spin" />
                      Initiating Sync...
                     </>
                   ) : (
                     <>
                      Confirm Transmission
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </>
                   )}
                </div>
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-white/20 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                )}
              </button>
            </form>
          </motion.div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden shadow-2xl">
              <div className={cn("absolute top-0 right-0 p-4 opacity-10", activeMission === 'challenger' ? "text-sky-400" : "text-purple-400")}>
                <Info size={120} strokeWidth={1} />
              </div>
              
              <h3 className="text-white font-serif text-3xl mb-8 leading-tight relative z-10">Archive <br />Protocol</h3>
              
              <ul className="space-y-8 relative z-10">
                {[
                  { label: "Perspective", text: "Focus on human emotion rather than technical details." },
                  { label: "Dignity", text: "Maintain a respectful tone for the crew and their families." },
                  { label: "Clarity", text: "Be as vivid as possible with your specific location or feelings." }
                ].map((tip, i) => (
                  <li key={i} className="group/item">
                    <span className={cn("text-[9px] font-mono font-bold block mb-2 transition-colors", 
                      activeMission === 'challenger' ? "text-sky-500" : "text-purple-500")}>
                      0{i+1} // {tip.label}
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover/item:text-slate-200 transition-colors">{tip.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/20 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className={activeMission === 'challenger' ? "text-sky-500/50" : "text-purple-500/50"} size={20} />
                <span className="text-white text-[10px] font-mono uppercase tracking-[0.2em]">Privacy Shield</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Your data is handled with the same care as flight telemetry. 
                Emails are never shared and are only used for archive verification.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};