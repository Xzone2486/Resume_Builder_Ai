"use client"

import { motion } from "framer-motion"
import { FileText, TrendingUp, Send, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function StatsRow() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
    >
      <StatCard 
        title="Total Resumes" 
        value={4} 
        icon={<FileText className="w-4 h-4 text-blue-500" />} 
        trend="+1 this week" 
        trendUp={true} 
      />
      <StatCard 
        title="Best ATS Score" 
        value={92} 
        icon={<TrendingUp className="w-4 h-4 text-green-500" />} 
        trend="+14% vs last month" 
        trendUp={true} 
      />
      <StatCard 
        title="Applications Sent" 
        value={23} 
        icon={<Send className="w-4 h-4 text-violet-500" />} 
        trend="Active" 
        trendUp={true} 
      />
      <StatCard 
        title="Interviews" 
        value={3} 
        icon={<CheckCircle className="w-4 h-4 text-orange-500" />} 
        trend="13% conversion" 
        trendUp={true} 
      />
    </motion.div>
  )
}

function StatCard({ title, value, icon, trend, trendUp }: any) {
  // Count up animation logic
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    const duration = 1500

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setDisplayValue(Math.floor(progress * value))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [value])

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-card border border-border/50 rounded-2xl p-5 hover:border-border hover:shadow-md transition-all group cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold tracking-tight mb-1">{displayValue}</div>
      <div className="text-xs font-medium text-green-600 dark:text-green-500 flex items-center gap-1">
        {trendUp ? <TrendingUp className="w-3 h-3" /> : null}
        {trend}
      </div>
    </motion.div>
  )
}
