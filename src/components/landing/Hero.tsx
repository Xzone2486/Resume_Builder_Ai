"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import dynamic from 'next/dynamic'
import SoftAurora from "./SoftAurora"

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
    <section className="relative min-h-[85vh] flex items-center pt-16 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#8b5cf6"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>
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
