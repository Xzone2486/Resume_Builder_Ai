"use client"

import { motion } from "framer-motion"
import { Sparkles, FileText, BarChart3, Edit3, AlignLeft, Briefcase } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    }
  },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-white/50 dark:bg-zinc-950/50">
      {/* Rich background fills */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-[-10%] w-[400px] h-[400px] bg-violet-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-indigo-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Elite Resume Tools</h2>
          <p className="text-lg text-muted-foreground">Stop guessing what recruiters want. Our AI suite builds the perfect resume optimized for humans and machines.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]"
        >
          {/* Main Card (2 Cols) */}
          <motion.div variants={cardVariants} className="md:col-span-2 lg:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
            <BarChart3 className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform origin-left" />
            <h3 className="text-2xl font-bold mb-3">ATS Score Analyzer</h3>
            <p className="text-muted-foreground w-2/3">Get a precise score of how well your resume matches ATS algorithms. Real-time feedback and instant fix suggestions.</p>
            
            {/* Mini Dashboard inside card */}
            <div className="absolute right-[-20px] bottom-[-20px] w-64 h-48 bg-white dark:bg-zinc-900 rounded-tl-2xl border border-white/20 shadow-2xl p-4 transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500">
              <div className="flex gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-200 dark:text-zinc-800" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="250" strokeDashoffset="40" className="text-green-500" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">94</div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <div className="h-2 w-16 bg-green-500/20 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[90%]" /></div>
                  <div className="h-2 w-20 bg-yellow-500/20 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[60%]" /></div>
                  <div className="h-2 w-12 bg-red-500/20 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[30%]" /></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medium Card */}
          <motion.div variants={cardVariants} className="md:col-span-1 lg:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-violet-500/50 transition-colors">
            <Sparkles className="w-10 h-10 text-violet-500 mb-6 group-hover:scale-110 transition-transform origin-left" />
            <h3 className="text-xl font-bold mb-3">AI Enhancement</h3>
            <p className="text-muted-foreground">Transform weak bullet points into impactful, quantified achievements with a single click.</p>
            
            {/* Typing animation demo */}
            <div className="mt-6 border border-white/10 rounded-lg p-3 bg-white/50 dark:bg-black/50 overflow-hidden relative">
              <span className="text-xs text-red-400 line-through">Helped doing data tasks...</span><br/>
              <span className="text-xs font-mono text-green-500 mt-1 inline-block border-r-2 border-green-500 animate-pulse w-max">Analyzed 10TB of data saving $40k</span>
            </div>
          </motion.div>

          {/* Small Card */}
          <motion.div variants={cardVariants} className="md:col-span-1 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <Edit3 className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform origin-left" />
            <h3 className="text-lg font-bold mb-2">Bullet Rewriter</h3>
            <p className="text-sm text-muted-foreground">Instant strong action verbs formatting.</p>
          </motion.div>

          {/* Small Card */}
          <motion.div variants={cardVariants} className="md:col-span-1 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
            <AlignLeft className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform origin-left" />
            <h3 className="text-lg font-bold mb-2">Formatting Fixer</h3>
            <p className="text-sm text-muted-foreground">Auto-align dates, bullets, and margins.</p>
          </motion.div>

          {/* Core Feature (Full Width) */}
          <motion.div variants={cardVariants} className="md:col-span-3 lg:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-rose-500/50 transition-colors">
            <div className="absolute top-4 right-6 px-3 py-1 bg-rose-500/10 text-rose-500 text-xs font-bold rounded-full">CORE FEATURE</div>
            <Briefcase className="w-10 h-10 text-rose-500 mb-6 group-hover:scale-110 transition-transform origin-left" />
            <h3 className="text-2xl font-bold mb-3">Job Description Tailoring</h3>
            <p className="text-muted-foreground w-[80%]">Paste any job description and let AI instantly rewrite your resume to highlight the exact skills and keywords required by the employer.</p>
            
            <div className="absolute right-[-40px] bottom-[-40px] opacity-20 group-hover:opacity-40 transition-opacity">
              <FileText className="w-48 h-48 text-rose-500 animate-blob" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
