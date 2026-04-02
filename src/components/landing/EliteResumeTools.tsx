"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Play, Sparkles, Flame, Search } from "lucide-react"

// A helper for floating pill UI
const FloatingPill = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-zinc-100/50 ${className}`}>
    {children}
  </div>
)

export function EliteResumeTools() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
      
      {/* 1. ATS Resume Analyzer (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group col-span-1 md:col-span-2 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px] flex flex-col items-end"
      >
        <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 group-hover:text-white transition-colors duration-500 z-20 relative text-right">ATS Resume Analyzer</h3>
        
        {/* Mockup UI - Shifted to the Left */}
        <div className="absolute left-0 md:left-[-20px] bottom-[-20px] w-[320px] md:w-[420px] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-xl rounded-br-xl shadow-xl border border-violet-100 p-6 transform translate-x-[-16px] md:translate-x-0 z-10">
          
          <div className="flex gap-6 items-center mb-6">
            {/* Score Gauge */}
            <div className="relative w-24 h-24 flex-shrink-0 bg-violet-50 rounded-full flex items-center justify-center border-4 border-violet-100 shadow-inner">
               <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 80 80">
                 <circle cx="40" cy="40" r="34" stroke="#8b5cf6" strokeWidth="8" fill="none" strokeDasharray="213.6" strokeDashoffset="34" strokeLinecap="round" />
               </svg>
               <div className="flex flex-col items-center">
                 <span className="text-2xl font-extrabold text-violet-600">94</span>
                 <span className="text-[9px] font-bold text-violet-400 uppercase tracking-widest">Score</span>
               </div>
            </div>

            {/* Progress Bars */}
            <div className="flex-1 space-y-4">
               <div>
                 <div className="flex justify-between text-xs font-semibold text-zinc-600 mb-1">
                   <span>Keywords</span>
                   <span className="text-violet-600">90%</span>
                 </div>
                 <div className="h-2 bg-zinc-100 w-full rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full w-[90%]" /></div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-semibold text-zinc-600 mb-1">
                   <span>Formatting</span>
                   <span className="text-blue-500">100%</span>
                 </div>
                 <div className="h-2 bg-zinc-100 w-full rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full w-full" /></div>
               </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
             {["React JS", "Node JS", "Leadership", "Agile"].map(k => (
                <span key={k} className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">+ {k}</span>
             ))}
          </div>

          {/* Floating Indicator */}
          <FloatingPill className="absolute left-4 top-[-10px] z-20 shadow-lg hidden md:flex">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-bold text-zinc-800">ATS Passed</span>
          </FloatingPill>

        </div>
      </motion.div>

      {/* 2. Chrome Extension (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 }}
        className="group col-span-1 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Chrome<br/>Extension</h3>
        
        {/* Extension Popup Mockup */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[80%] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-xl shadow-2xl overflow-hidden min-h-[180px]">
           <div className="flex justify-between items-center p-3 border-b border-zinc-100">
              <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center p-1">
                 <div className="w-full h-full rounded-full border-2 border-red-400 rotate-45 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-green-400" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-yellow-400" />
                    <div className="absolute inset-1 rounded-full bg-blue-500" />
                 </div>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full" />
              </div>
           </div>
           <div className="p-4 space-y-3">
              <div className="h-6 bg-violet-50 rounded-md w-full border border-violet-100 flex items-center px-2 gap-2">
                 <Sparkles className="w-3 h-3 text-violet-500" />
                 <span className="text-[9px] font-bold text-violet-700">Auto-Apply Running</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <div className="text-[10px] font-bold text-zinc-600">Tailored to Job Post</div>
              </div>
              <div className="border border-zinc-100 rounded p-2 space-y-2 mt-4 bg-zinc-50">
                <div className="h-1.5 bg-zinc-200 rounded w-full" />
                <div className="h-1.5 bg-violet-200 rounded w-5/6" />
                <div className="h-1.5 bg-zinc-200 rounded w-4/6" />
              </div>
           </div>
        </div>
      </motion.div>

      {/* 3. Interview Preparation (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2 }}
        className="group col-span-1 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Interview<br/>Preparation</h3>
        
        {/* Video Question Mockup */}
        <div className="absolute right-[-10px] bottom-[-20px] w-[260px] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-xl shadow-xl border border-violet-50 p-5 transform translate-x-4 md:translate-x-0">
          <h4 className="text-sm font-bold text-zinc-800 mb-5 border-b border-zinc-100 pb-2">Behavioral Q's</h4>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-violet-500/30">
                <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="h-2 bg-zinc-200 rounded-full w-full" />
                <div className="h-2 bg-zinc-100 rounded-full w-4/5" />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-violet-500/30 text-white">
                <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="h-2 bg-zinc-200 rounded-full w-[90%]" />
                <div className="h-2 bg-zinc-100 rounded-full w-3/5" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. AI Cover Letter Generator (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="group col-span-1 md:col-span-2 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">AI Cover Letter Generator</h3>
        
        {/* Document Editor Mockup */}
        <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 bottom-[-20px] w-[90%] md:w-[380px] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-xl shadow-xl border border-zinc-100 pl-6 pr-6 pt-5 pb-8">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-7 h-7 rounded bg-violet-50 flex items-center justify-center border border-violet-100">
               <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
             </div>
             <span className="font-bold text-zinc-800 text-sm">Targeted Cover Letter</span>
           </div>
           
           <h4 className="font-bold text-zinc-800 text-sm mb-4">Dear Hiring Manager,</h4>
           
           <div className="space-y-3">
             <div className="h-2.5 bg-zinc-200 rounded-full w-full" />
             <div className="flex items-center gap-1">
               <div className="h-2.5 bg-zinc-200 rounded-full w-[15%]" />
               <div className="h-4 bg-emerald-200 rounded px-1.5 text-[9px] font-bold text-emerald-800 tracking-wide flex items-center -mt-0.5 shadow-sm">
                  engineered robust data pipelines
               </div>
               <div className="h-2.5 bg-zinc-200 rounded-full w-[20%]" />
             </div>
             <div className="h-2.5 bg-zinc-200 rounded-full w-4/5" />
           </div>

           {/* Magic Wand Badge */}
           <div className="absolute right-[-20px] top-[-20px] w-20 h-20 bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-full shadow-lg border-[6px] border-violet-50 flex items-center justify-center">
             <div className="text-violet-500 relative">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
             </div>
           </div>
        </div>
      </motion.div>

      {/* 5. Networking Tracker (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="group col-span-1 md:col-span-2 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative mb-4">Networking Tracker</h3>
        
        {/* CRM Table Mockup */}
        <div className="absolute left-6 md:left-12 bottom-[-10px] w-full md:w-[120%] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-tl-xl shadow-xl border-t border-l border-zinc-100/50 p-4 pl-6 pt-5">
           <div className="flex gap-4 mb-4">
             <div className="h-7 w-32 border border-zinc-200 rounded flex items-center px-2 shrink-0 bg-white">
               <Search className="w-3 h-3 text-zinc-400 mr-2" />
               <span className="text-[9px] font-medium text-zinc-400">Search Recruiters</span>
             </div>
             <div className="h-7 border border-zinc-200 rounded flex items-center px-2 shrink-0 bg-zinc-50">
               <span className="text-[9px] font-medium text-zinc-500">Group by: Stage</span>
             </div>
           </div>

           <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 text-[9px] font-bold text-zinc-400 border-b border-zinc-100 pb-2 mb-2 uppercase tracking-wide">
             <div>Full Name</div>
             <div>Title</div>
             <div>Company</div>
           </div>

           <div className="space-y-4 pt-1">
             <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 items-center">
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-violet-100 shrink-0 border border-violet-200 overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah" alt="" /></div>
                 <span className="text-[10px] font-bold text-zinc-700">Sarah Chen</span>
               </div>
               <span className="text-[10px] font-medium text-zinc-500">Technical Recruiter</span>
               <span className="text-[10px] font-bold text-zinc-800">Google</span>
             </div>
             <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 items-center">
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-amber-100 shrink-0 border border-amber-200 overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Michael" alt="" /></div>
                 <span className="text-[10px] font-bold text-zinc-700">Michael Davis</span>
               </div>
               <span className="text-[10px] font-medium text-zinc-500">VP of Engineering</span>
               <span className="text-[10px] font-bold text-zinc-800">Stripe</span>
             </div>
             <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 items-center">
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-emerald-100 shrink-0 border border-emerald-200 overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Emma" alt="" /></div>
                 <span className="text-[10px] font-bold text-zinc-700">Emma Wilson</span>
               </div>
               <span className="text-[10px] font-medium text-zinc-500">Hiring Manager</span>
               <span className="text-[10px] font-bold text-zinc-800">Netflix</span>
             </div>
           </div>
        </div>

        {/* Chat Bubbles */}
        <div className="absolute right-4 top-16 md:right-8 lg:-right-4 w-[200px] bg-white group-hover:bg-zinc-50 transition-colors duration-500 rounded-2xl shadow-xl shadow-violet-500/10 border border-violet-50 p-4 hidden md:block z-20">
          <div className="flex justify-end mb-3 relative">
            <div className="bg-zinc-100 rounded-full rounded-tr-sm px-3 py-2 text-[10px] font-bold text-zinc-800 border border-zinc-200">
               Hi Sarah, checking in!
            </div>
            <div className="absolute -top-4 -right-1 w-5 h-5 rounded-full bg-zinc-200 border-2 border-white overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="" /></div>
          </div>
          <div className="flex justify-start relative">
             <div className="absolute -bottom-4 -left-2 w-5 h-5 rounded-full bg-violet-100 border-2 border-white overflow-hidden z-20"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah" alt="" /></div>
             <div className="bg-violet-600 text-white rounded-2xl rounded-bl-sm px-3 py-2 text-[10px] font-bold max-w-[90%] shadow-sm">
               Let's set up a call!
             </div>
          </div>
        </div>

      </motion.div>

      {/* 6. Elevator Pitch (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="group col-span-1 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Elevator Pitch</h3>
        
        {/* Editor Mockup */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-[90%] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-xl shadow-xl border border-zinc-100 p-5">
           <h4 className="text-xs font-bold text-zinc-800 mb-4">AI Elevator Pitch</h4>
           <div className="border border-violet-100 bg-violet-50/50 rounded-lg p-3 min-h-[120px]">
              <p className="text-[11px] font-bold text-zinc-800 mb-2">As an experienced SWE,</p>
              <div className="space-y-1.5 opacity-40">
                <div className="h-1.5 bg-zinc-300 rounded w-full" />
                <div className="h-1.5 bg-zinc-300 rounded w-5/6" />
                <div className="h-1.5 bg-zinc-300 rounded w-full" />
                <div className="h-1.5 bg-zinc-300 rounded w-2/3" />
              </div>
           </div>
        </div>
      </motion.div>

      {/* 7. Skill gap analyzer (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="group col-span-1 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px] flex flex-col"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 mb-12">Skill gap analyzer</h3>
        
        <div className="flex-1 flex flex-col gap-4 items-center justify-center -mt-6">
           <div className="bg-white rounded-full shadow-lg shadow-violet-500/5 px-4 py-2.5 flex items-center gap-2 border border-violet-50 w-max transform -translate-x-4">
              <Flame className="w-4 h-4 text-orange-500" fill="currentColor" />
              <span className="text-sm font-bold text-zinc-700">Missing Skills</span>
              <span className="ml-2 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">AWS, Docker</span>
           </div>
           
           <div className="bg-white rounded-full shadow-lg shadow-emerald-500/5 px-4 py-2.5 flex items-center gap-2 border border-emerald-50 w-max transform translate-x-4 z-10">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-zinc-700">Strong Match</span>
              <span className="ml-2 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">React, Node</span>
           </div>
        </div>
      </motion.div>

      {/* 8. Resume Templates (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="group col-span-1 md:col-span-2 bg-violet-50 hover:bg-violet-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Resume Templates</h3>
        
        {/* Templates Mockup Container */}
        <div className="absolute right-0 bottom-[-40px] w-full md:w-[380px] h-[220px]">
           
           {/* Template 1 (Back) */}
           <div className="absolute right-24 bottom-6 w-[220px] h-[300px] bg-white group-hover:bg-zinc-200 transition-colors duration-500 rounded-t-sm shadow-xl border border-zinc-200 transform -rotate-6 scale-90 opacity-60">
             <div className="h-16 bg-violet-400 w-1/3 flex flex-col justify-center px-4">
               <div className="text-[14px] font-serif text-white font-bold">ATS Proof</div>
             </div>
           </div>

           {/* Template 2 (Middle) */}
           <div className="absolute right-6 bottom-0 w-[240px] h-[300px] bg-zinc-900 rounded-t-sm shadow-2xl border border-zinc-700 z-10 scale-95 origin-bottom translate-x-12 md:translate-x-0">
             <div className="p-4 border-b border-zinc-700 pb-3">
               <div className="text-[12px] font-serif text-white tracking-widest uppercase mb-1 opacity-90 font-bold">Alex Mercer</div>
               <div className="h-0.5 w-full bg-zinc-700" />
             </div>
           </div>

           {/* Template 3 (Front) */}
           <div className="absolute right-12 md:right-32 bottom-2 w-[230px] h-[300px] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-sm shadow-2xl border border-violet-100 z-20 flex flex-col">
             <div className="border-b border-zinc-100 p-4 pb-3 flex flex-col items-center text-center">
                <div className="text-[15px] font-serif text-violet-900 tracking-wide font-bold">Alex Mercer</div>
                <div className="text-[8px] text-violet-600 uppercase tracking-widest font-extrabold mt-1">Full-Stack Developer</div>
                <div className="text-[7px] text-zinc-500 mt-1 font-medium">alex@mercer.dev • linkedin.com/in/alex</div>
             </div>
             <div className="p-4 space-y-3">
               <div className="space-y-1.5">
                 <div className="h-1.5 bg-violet-200 rounded-full w-1/3" />
                 <div className="h-1 bg-zinc-200 rounded-full w-full" />
                 <div className="h-1 bg-zinc-200 rounded-full w-[95%]" />
               </div>
               <div className="space-y-1.5">
                 <div className="h-1.5 bg-violet-200 rounded-full w-1/4" />
                 <div className="h-1 bg-zinc-200 rounded-full w-full" />
                 <div className="h-1 bg-zinc-200 rounded-full w-[80%]" />
               </div>
             </div>
           </div>

        </div>
      </motion.div>

    </div>
  )
}

