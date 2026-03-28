"use client"

import { motion } from "framer-motion"
import { Target, Wand2, TrendingUp, ShieldCheck, Layers, Zap } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Precision Job Matching",
    description:
      "Our AI cross-references your experience with job descriptions to surface the exact keywords, skills, and achievements that recruiters search for.",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
    iconBg: "bg-blue-500",
  },
  {
    icon: Wand2,
    title: "One-Click AI Rewrite",
    description:
      "Transform vague bullet points into quantified, action-driven achievements. Just click and watch your resume evolve in real-time.",
    color: "from-violet-500 to-purple-500",
    bgGlow: "bg-violet-500/10",
    iconBg: "bg-violet-500",
  },
  {
    icon: TrendingUp,
    title: "ATS Score Maximizer",
    description:
      "Get a detailed breakdown of how ATS systems read your resume — including missing keywords, formatting issues, and readability scores.",
    color: "from-emerald-500 to-green-500",
    bgGlow: "bg-emerald-500/10",
    iconBg: "bg-emerald-500",
  },
  {
    icon: ShieldCheck,
    title: "Industry-Proven Templates",
    description:
      "Choose from 30+ templates designed by recruiters and tested across Fortune 500 ATS systems. Every template is optimized for maximum parse rate.",
    color: "from-orange-500 to-amber-500",
    bgGlow: "bg-orange-500/10",
    iconBg: "bg-orange-500",
  },
  {
    icon: Layers,
    title: "Multi-Version Management",
    description:
      "Create tailored resume versions for different roles and companies. Easily compare, duplicate, and fine-tune for each opportunity.",
    color: "from-rose-500 to-pink-500",
    bgGlow: "bg-rose-500/10",
    iconBg: "bg-rose-500",
  },
  {
    icon: Zap,
    title: "Real-Time Feedback Loop",
    description:
      "Instantly see how every edit impacts your ATS score, keyword density, and recruiter appeal without ever leaving the editor.",
    color: "from-indigo-500 to-blue-500",
    bgGlow: "bg-indigo-500/10",
    iconBg: "bg-indigo-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
}

export function HowWeHelp() {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container px-6 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 border border-indigo-500/20">
            <Zap className="w-4 h-4" />
            Supercharge Your Job Search
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            How ResumeBoost AI{" "}
            <span className="text-gradient">Powers Your Success</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every feature is built with one goal — to get your resume past the bots and into the hands of real hiring managers, faster.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-transparent transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
              />
              {/* Gradient border on hover */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} p-[1px]`}
              >
                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[calc(1.5rem-1px)]" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {feature.description}
                </p>

                {/* Animated underline */}
                <div className="mt-6 h-1 w-0 group-hover:w-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                >
                  <div className={`h-full rounded-full bg-gradient-to-r ${feature.color} w-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
