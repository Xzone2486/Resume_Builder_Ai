import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ResumeCarousel } from "@/components/landing/ResumeCarousel";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { HowWeHelp } from "@/components/landing/HowWeHelp";
import { WithYouEveryStep } from "@/components/landing/WithYouEveryStep";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-indigo-500/30 relative bg-mesh-gradient">
      {/* Full-page background layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dot grid pattern */}
        <div className="absolute inset-0 bg-dot-pattern-lg" />
        
        {/* Animated gradient wash */}
        <div className="absolute inset-0 bg-animated-gradient" />
        
        {/* Large ambient blobs on left side */}
        <div className="absolute top-[5%] -left-32 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[35%] -left-20 w-[400px] h-[400px] bg-indigo-500/[0.02] rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute top-[65%] -left-40 w-[450px] h-[450px] bg-purple-500/[0.02] rounded-full blur-[130px] animate-blob animation-delay-2000" />
        
        {/* Large ambient blobs on right side */}
        <div className="absolute top-[10%] -right-32 w-[450px] h-[450px] bg-indigo-500/[0.03] rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[45%] -right-20 w-[500px] h-[500px] bg-violet-500/[0.02] rounded-full blur-[100px] animate-blob animation-delay-6000" />
        <div className="absolute top-[75%] -right-40 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[130px] animate-blob" />

        {/* Center ambient light */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/[0.015] rounded-full blur-[150px]" />

        {/* Decorative vertical side lines */}
        <div className="absolute top-0 left-[3%] w-px h-full bg-gradient-to-b from-transparent via-indigo-500/[0.1] to-transparent hidden xl:block" />
        <div className="absolute top-0 left-[5%] w-px h-full bg-gradient-to-b from-transparent via-violet-500/[0.05] to-transparent hidden xl:block" />
        <div className="absolute top-0 right-[3%] w-px h-full bg-gradient-to-b from-transparent via-violet-500/[0.1] to-transparent hidden xl:block" />
        <div className="absolute top-0 right-[5%] w-px h-full bg-gradient-to-b from-transparent via-indigo-500/[0.05] to-transparent hidden xl:block" />

        {/* Side shimmer strips */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-b from-violet-500/[0.03] via-transparent to-indigo-500/[0.03] hidden lg:block" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-b from-indigo-500/[0.03] via-transparent to-violet-500/[0.03] hidden lg:block" />

        {/* Corner decorative dot grids */}
        <div className="absolute top-28 left-6 hidden lg:grid grid-cols-4 gap-2.5 opacity-[0.07]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={`lt-${i}`} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          ))}
        </div>
        <div className="absolute top-28 right-6 hidden lg:grid grid-cols-4 gap-2.5 opacity-[0.07]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={`rt-${i}`} className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          ))}
        </div>
        <div className="absolute top-[40%] left-6 hidden lg:grid grid-cols-3 gap-3 opacity-[0.05]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`ml-${i}`} className="w-1 h-1 rounded-full bg-indigo-400" />
          ))}
        </div>
        <div className="absolute top-[40%] right-6 hidden lg:grid grid-cols-3 gap-3 opacity-[0.05]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`mr-${i}`} className="w-1 h-1 rounded-full bg-violet-400" />
          ))}
        </div>
        <div className="absolute top-[70%] left-8 hidden lg:grid grid-cols-4 gap-2.5 opacity-[0.06]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={`bl-${i}`} className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          ))}
        </div>
        <div className="absolute top-[70%] right-8 hidden lg:grid grid-cols-4 gap-2.5 opacity-[0.06]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={`br-${i}`} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          ))}
        </div>

        {/* Floating geometric decorations */}
        <div className="absolute top-[20%] left-[2%] w-6 h-6 border border-indigo-400/10 rounded-md rotate-45 animate-float-slow hidden xl:block" />
        <div className="absolute top-[50%] left-[1%] w-4 h-4 bg-violet-400/[0.06] rounded-sm rotate-12 animate-float hidden xl:block" />
        <div className="absolute top-[80%] left-[3%] w-5 h-5 border border-purple-400/10 rounded-lg -rotate-12 animate-float-slow animation-delay-4000 hidden xl:block" />
        <div className="absolute top-[25%] right-[2%] w-5 h-5 border border-violet-400/10 rounded-md -rotate-45 animate-float animation-delay-2000 hidden xl:block" />
        <div className="absolute top-[55%] right-[1%] w-4 h-4 bg-indigo-400/[0.06] rounded-sm rotate-12 animate-float-slow animation-delay-6000 hidden xl:block" />
        <div className="absolute top-[85%] right-[3%] w-6 h-6 border border-indigo-400/10 rounded-lg rotate-12 animate-float hidden xl:block" />

        {/* Floating Text Highlights */}
        <div className="absolute top-[28%] left-[7%] hidden 2xl:block opacity-60 z-10 pointer-events-auto">
          <div className="glass px-4 py-3 rounded-2xl animate-float-slow text-sm font-medium flex gap-3 items-center shadow-lg hover:opacity-100 transition-opacity cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <span className="bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500 bg-clip-text text-transparent font-bold">96% Avg. ATS Score</span>
          </div>
        </div>
        
        <div className="absolute top-[65%] left-[4%] hidden xl:block opacity-50 z-10 pointer-events-auto">
          <div className="glass px-4 py-3 rounded-2xl animate-float animation-delay-4000 text-sm font-medium flex items-center gap-2 hover:opacity-100 transition-opacity cursor-default">
            <span className="text-xl">🚀</span>
            <span className="text-muted-foreground">Join 50k+ Pros</span>
          </div>
        </div>

        <div className="absolute top-[32%] right-[5%] hidden xl:block opacity-60 z-10 pointer-events-auto">
          <div className="glass px-4 py-3 rounded-2xl animate-float animation-delay-2000 text-sm font-medium flex gap-2 items-center hover:opacity-100 transition-opacity cursor-default">
            <span className="text-rose-500 animate-pulse-slow">❤️</span>
            <span className="text-muted-foreground">Loved by HR Leaders</span>
          </div>
        </div>

        <div className="absolute top-[72%] right-[8%] hidden 2xl:block opacity-50 z-10 pointer-events-auto">
          <div className="glass px-4 py-3 rounded-2xl animate-float-slow animation-delay-6000 text-sm font-medium flex items-center gap-2 hover:opacity-100 transition-opacity cursor-default">
            <span className="text-indigo-500">⚡</span>
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent font-bold">3x Faster Interviews</span>
          </div>
        </div>
      </div>

      <Navbar />
      
      <div className="flex-1 flex flex-col relative z-10">
        <Hero />
        <FeaturesSection />
        <ResumeCarousel />
        <Testimonials />
        <HowWeHelp />
        <WithYouEveryStep />
        <HowItWorks />
      </div>

      {/* Pre-footer CTA */}
      <section className="py-24 relative overflow-hidden border-t border-border z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.08] to-indigo-600/[0.12] dark:from-violet-900/20 dark:to-indigo-900/20" />
        <div className="absolute inset-0 bg-dot-pattern" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        <div className="container px-6 mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 50,000+ professionals who have supercharged their career with ResumeBoost AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/resume-builder"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.03] transition-all duration-300 relative overflow-hidden group h-14 rounded-xl px-10 text-base font-semibold inline-flex items-center justify-center whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out" />
              <span className="relative flex items-center justify-center gap-2">Build with AI</span>
            </Link>
            <Link
              href="/ats-analysis"
              className="glass text-foreground hover:bg-white/80 dark:hover:bg-black/80 hover:scale-105 h-14 rounded-xl px-10 text-base font-semibold transition-all inline-flex items-center justify-center whitespace-nowrap"
            >
              Analyze My Resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
