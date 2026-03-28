"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false, loading: () => <div className="w-full h-[500px] lg:h-[700px] animate-pulse rounded-2xl bg-indigo-500/10" /> })

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-hero-gradient">
      {/* Dot grid background fill */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none" />
      
      {/* Large animated blobs for visual richness */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-500/[0.03] blur-[100px] rounded-full animate-blob pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/[0.02] blur-[100px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-500/[0.02] blur-[120px] rounded-full animate-blob animation-delay-4000 pointer-events-none" />
      <div className="absolute top-[60%] right-[10%] w-[300px] h-[300px] bg-blue-500/[0.02] blur-[80px] rounded-full animate-float-slow pointer-events-none" />

      {/* Decorative floating badges on sides */}
      <div className="absolute top-[20%] left-[2%] xl:left-[6%] px-4 py-2 border border-indigo-500/10 bg-background/50 backdrop-blur-sm rounded-2xl -rotate-6 animate-float-slow hidden lg:flex items-center gap-2 pointer-events-none shadow-sm z-0">
        <span className="text-xl">✨</span>
        <span className="text-sm font-medium text-muted-foreground/80">AI-Powered</span>
      </div>

      <div className="absolute bottom-[25%] left-[5%] xl:left-[10%] px-4 py-2 border border-violet-500/10 bg-background/50 backdrop-blur-sm rounded-2xl rotate-12 animate-float animation-delay-2000 hidden lg:flex items-center gap-2 pointer-events-none shadow-sm z-0">
        <span className="text-xl">🎯</span>
        <span className="text-sm font-medium text-muted-foreground/80">ATS-Optimized</span>
      </div>

      <div className="absolute top-[25%] right-[5%] xl:right-[10%] px-4 py-2 border border-indigo-500/10 bg-background/50 backdrop-blur-sm rounded-2xl rotate-6 animate-float hidden lg:flex items-center gap-2 pointer-events-none shadow-sm z-0">
        <span className="text-xl">🚀</span>
        <span className="text-sm font-medium text-muted-foreground/80">3x Interviews</span>
      </div>

      <div className="absolute bottom-[20%] right-[2%] xl:right-[6%] px-4 py-2 border border-purple-500/10 bg-background/50 backdrop-blur-sm rounded-2xl -rotate-12 animate-float-slow animation-delay-4000 hidden lg:flex items-center gap-2 pointer-events-none shadow-sm z-0">
        <span className="text-xl">💼</span>
        <span className="text-sm font-medium text-muted-foreground/80">Expert Templates</span>
      </div>

      {/* Floating accent circles */}
      <div className="absolute top-[15%] left-[5%] w-3 h-3 bg-indigo-400/[0.08] rounded-full animate-float hidden lg:block" />
      <div className="absolute top-[25%] left-[3%] w-2 h-2 bg-violet-400/[0.1] rounded-full animate-float animation-delay-2000 hidden lg:block" />
      <div className="absolute top-[45%] left-[2%] w-4 h-4 bg-purple-400/[0.06] rounded-full animate-float-slow hidden lg:block" />
      <div className="absolute top-[20%] right-[3%] w-3 h-3 bg-indigo-400/[0.08] rounded-full animate-float animation-delay-4000 hidden lg:block" />
      <div className="absolute top-[60%] right-[5%] w-2 h-2 bg-violet-400/[0.1] rounded-full animate-float-slow animation-delay-2000 hidden lg:block" />

      {/* Side gradient glows */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-violet-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-indigo-500/[0.02] to-transparent pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 backdrop-blur-sm border border-indigo-500/20">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              Build Your Resume with AI Now!
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
            >
              Your Resume, <br />
              <span className="text-gradient">Optimized by AI</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-xl"
            >
              Upload your resume or generate a new one with AI that passes ATS systems and increases your interview chances by 3x.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
              <Button variant="gradient" size="xl" asChild>
                <Link href="/ats-analysis">Analyze My Resume</Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link href="/resume-builder">Build with AI</Link>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden z-[${5-i}]`}>
                     <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p>Join <strong className="text-foreground">50,000+</strong> professionals hired at top tech companies.</p>
            </motion.div>
          </motion.div> 

          {/* Right Side 3D Canvas */}
          <div className="w-full h-[500px] lg:h-[700px] relative">
            <HeroCanvas />
          </div>

        </div>
      </div>
    </section>
  )
}
