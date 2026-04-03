"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { Copy, Plus, Loader2, Sparkles, CheckCircle2, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockData = [
  { subject: 'React', JD: 100, Resume: 80 },
  { subject: 'TypeScript', JD: 100, Resume: 90 },
  { subject: 'Next.js', JD: 80, Resume: 20 },
  { subject: 'Tailwind', JD: 70, Resume: 100 },
  { subject: 'Node.js', JD: 60, Resume: 60 },
  { subject: 'AWS', JD: 90, Resume: 10 },
]

export function JDSection() {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (tag: string) => {
    navigator.clipboard.writeText(tag)
    setCopied(tag)
    setTimeout(() => setCopied(null), 2000)
  }

  const simulateAnalysis = () => {
    if (!text.trim()) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasAnalyzed(true)
    }, 1200)
  }

  return (
    <div className="w-full relative isolate mb-8">
      {/* Background highlight */}
      <div className="absolute inset-0 bg-teal-50 dark:bg-teal-500/5 -mx-8 sm:-mx-12 lg:-mx-16 px-8 sm:px-12 lg:px-16 py-8 rounded-3xl -z-10 border border-teal-100 dark:border-teal-500/10" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Target Job Description <Sparkles className="w-5 h-5 text-teal-500" />
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Paste the JD here. We'll extract keywords and tailor your resume automatically.
          </p>
        </div>
        <span className="hidden sm:inline-block bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 mt-1">
          Core Feature
        </span>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Left: Textarea + Button */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the Job Description here. E.g. We are looking for a Senior React Developer with 5+ years of experience..."
              className={`w-full h-52 resize-none rounded-2xl border bg-card p-5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all ${
                isAnalyzing
                  ? "border-teal-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] pointer-events-none opacity-80"
                  : "border-border"
              }`}
            />

            {/* Char count */}
            <span className="absolute bottom-3 right-4 text-[11px] text-muted-foreground select-none">
              {text.length} chars
            </span>

            {/* Scanning overlay */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-teal-500/10 rounded-2xl overflow-hidden pointer-events-none"
                >
                  <motion.div
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Analyze button */}
          <div className="flex justify-end">
            <Button
              variant={hasAnalyzed ? "outline" : "gradient"}
              onClick={simulateAnalysis}
              disabled={isAnalyzing || !text.trim()}
              className="min-w-[140px]"
            >
              {isAnalyzing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : hasAnalyzed ? (
                <><RotateCcw className="w-4 h-4 mr-2" /> Re-analyze</>
              ) : (
                "Analyze JD"
              )}
            </Button>
          </div>
        </div>

        {/* Right: Results panel */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden" style={{ minHeight: "240px" }}>
          <AnimatePresence mode="wait">
            {!hasAnalyzed ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center p-8 h-full"
                style={{ minHeight: "240px" }}
              >
                <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-teal-300 dark:text-teal-500" />
                </div>
                <p className="text-sm font-medium text-muted-foreground max-w-[200px]">
                  Paste a job description to see your match score and missing keywords.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Match Score</span>
                  <span className="text-3xl font-black text-teal-600 dark:text-teal-400">65%</span>
                </div>
                <div className="flex-1 w-full" style={{ height: "180px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockData}>
                      <PolarGrid stroke="currentColor" className="opacity-10" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#71717a", fontSize: 10 }} />
                      <Radar name="JD Req" dataKey="JD" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} />
                      <Radar name="Resume" dataKey="Resume" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="pt-3 border-t border-border flex gap-4 text-xs mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-teal-500/20 border border-teal-500 rounded-sm" />
                    <span>Required</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-green-500/30 border border-green-500 rounded-sm" />
                    <span>Your Resume</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Extracted Keywords */}
      <AnimatePresence>
        {hasAnalyzed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-8 border-t border-teal-100 dark:border-teal-500/20 pt-6"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Extracted Keywords</h3>
            <div className="flex flex-wrap gap-2">
              <Tag text="React" status="present" onCopy={handleCopy} copied={copied === "React"} />
              <Tag text="TypeScript" status="present" onCopy={handleCopy} copied={copied === "TypeScript"} />
              <Tag text="Next.js" status="missing" onCopy={handleCopy} copied={copied === "Next.js"} />
              <Tag text="AWS" status="missing" onCopy={handleCopy} copied={copied === "AWS"} />
              <Tag text="GraphQL" status="missing" onCopy={handleCopy} copied={copied === "GraphQL"} />
              <Tag text="Tailwind" status="present" onCopy={handleCopy} copied={copied === "Tailwind"} />
              <Tag text="Redux" status="partial" onCopy={handleCopy} copied={copied === "Redux"} />
            </div>

            <div className="mt-6">
              <Button variant="gradient" className="w-full text-base h-11">
                <Sparkles className="w-4 h-4 mr-2" /> Auto-Tailor Resume to JD
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Tag({ text, status, onCopy, copied }: any) {
  let color = "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 hover:bg-green-200"
  if (status === "missing") color = "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 hover:bg-rose-200"
  if (status === "partial") color = "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20 hover:bg-yellow-200"

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex items-center gap-1 border px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${color}`}
      onClick={() => onCopy(text)}
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
      {text}
      <button className="opacity-0 group-hover:opacity-100 ml-1 transition-opacity">
        {status === "missing" ? <Plus className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {status === "missing" ? "Missing – click to add" : status === "present" ? "Found in resume" : "Partial match"}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 rotate-45 block" />
      </span>
    </motion.div>
  )
}

function RotateCcw(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  )
}
