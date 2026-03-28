"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const resumes = [
  { role: "Software Engineer", score: 96, company: "Google", color: "from-blue-500/20 to-blue-600/5", badge: "bg-blue-500" },
  { role: "Product Manager", score: 92, company: "Spotify", color: "from-green-500/20 to-green-600/5", badge: "bg-green-500" },
  { role: "Data Scientist", score: 98, company: "OpenAI", color: "from-rose-500/20 to-rose-600/5", badge: "bg-rose-500" },
  { role: "UX Designer", score: 94, company: "Figma", color: "from-purple-500/20 to-purple-600/5", badge: "bg-purple-500" },
  { role: "AI Engineer", score: 99, company: "Anthropic", color: "from-orange-500/20 to-orange-600/5", badge: "bg-orange-500" },
  { role: "Frontend Dev", score: 95, company: "Vercel", color: "from-cyan-500/20 to-cyan-600/5", badge: "bg-cyan-500" },
]

const allResumes = [...resumes, ...resumes, ...resumes]

export function ResumeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const speed = 0.6

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed
        const totalWidth = track.scrollWidth / 3
        if (posRef.current >= totalWidth) posRef.current -= totalWidth
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  return (
    <section id="examples" className="py-24 bg-zinc-50/80 dark:bg-zinc-950/50 relative overflow-hidden">
      {/* Rich background fills */}
      <div className="absolute inset-0 bg-dot-pattern-lg pointer-events-none" />
      <div className="absolute top-0 left-[-5%] w-[350px] h-[350px] bg-violet-500/[0.05] rounded-full blur-[80px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-indigo-500/[0.05] rounded-full blur-[80px] animate-float-slow animation-delay-4000 pointer-events-none" />
      <div className="container px-6 mx-auto mb-12 relative z-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Proven Templates</h2>
          <p className="text-muted-foreground text-lg">See the resumes that got our users hired at top tier companies.</p>
        </div>
      </div>

      {/* Extra top padding so the -top-4 badge is never clipped */}
      <div className="w-full overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none z-10" />

        <div
          ref={trackRef}
          /* pt-8 gives breathing room for the badge that overflows -top-4 */
          className="flex gap-6 px-6 pb-12 pt-8"
          style={{ width: "max-content" }}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {allResumes.map((resume, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[320px] h-[460px] rounded-2xl bg-white shadow-xl border border-border/50 relative flex-shrink-0"
              style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease", overflow: "visible" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = "scale(1.06) translateY(-8px)"
                el.style.boxShadow = "0 32px 64px -16px rgba(99,102,241,0.25)"
                el.style.zIndex = "20"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = ""
                el.style.boxShadow = ""
                el.style.zIndex = "1"
              }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${resume.color} pointer-events-none rounded-2xl`} />

              {/* Score Badge — outside the overflow wrapper so it never clips */}
              <div className="absolute -top-4 -right-4 z-20 bg-white shadow-xl border border-border rounded-2xl p-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${resume.badge} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {resume.score}
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ATS MATCH</p>
                  <p className="text-sm font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Excellent</p>
                </div>
              </div>

              <div className="p-6 h-full flex flex-col relative z-10 rounded-2xl">
                <div className="h-6 w-32 bg-zinc-200 rounded-sm mb-2 mt-6" />
                <div className="h-3 w-48 bg-zinc-200 rounded-sm mb-6" />
                <div className="w-full h-px bg-zinc-100 my-2" />

                {Array.from({ length: 13 }).map((_, j) => (
                  <div key={j} className="h-2.5 bg-zinc-100 rounded-sm mb-3" style={{ width: `${55 + (j * 17 % 40)}%`, opacity: 1 - j * 0.05 }} />
                ))}

                <div className="mt-auto pt-6 border-t border-border/50 flex flex-col gap-1">
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Hired At</span>
                  <span className="text-lg font-bold">{resume.company}</span>
                  <span className="text-sm text-muted-foreground">{resume.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
