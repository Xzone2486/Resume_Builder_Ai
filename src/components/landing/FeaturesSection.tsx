"use client"

import { motion } from "framer-motion"
import { Sparkles, FileText, BarChart3, Edit3, AlignLeft, Briefcase } from "lucide-react"
import MagicBento from "./MagicBento"
import dynamic from "next/dynamic"

const PixelBlast = dynamic(() => import("./PixelBlast"), { ssr: false })

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
    <section id="features" className="py-24 relative overflow-hidden bg-white">
      {/* PixelBlast animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#8b5cf6"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          speed={0.5}
          edgeFade={0.3}
          transparent={true}
        />
      </div>
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Elite Resume Tools</h2>
          <p className="text-lg text-muted-foreground">Stop guessing what recruiters want. Our AI suite builds the perfect resume optimized for humans and machines.</p>
        </div>

        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={15}
          glowColor="139, 92, 246"
          disableAnimations={false}
        />
      </div>
    </section>
  )
}
