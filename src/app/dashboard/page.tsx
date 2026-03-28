import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner"
import { StatsRow } from "@/components/dashboard/StatsRow"
import { ResumeTable } from "@/components/dashboard/ResumeTable"
import { AtsScoreChart } from "@/components/dashboard/AtsScoreChart"
import { Button } from "@/components/ui/button"
import { UploadCloud, FileEdit } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <WelcomeBanner />
      <StatsRow />

      {/* Quick Actions & Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        
        {/* Actions (1/3 width) */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="glass-card rounded-2xl p-6 border-dashed border-2 hover:border-indigo-500/50 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer h-48">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="font-bold mb-1">Upload Resume</h3>
            <p className="text-xs text-muted-foreground">PDF, DOCX up to 5MB</p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-border/50 hover:border-violet-500/50 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer h-48 bg-gradient-to-br from-violet-500/5 to-transparent">
            <div className="w-12 h-12 rounded-full bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileEdit className="w-6 h-6 text-violet-500" />
            </div>
            <h3 className="font-bold mb-1">AI Builder</h3>
            <p className="text-xs text-muted-foreground">Start from scratch or LinkedIn</p>
          </div>
        </div>

        {/* ATS Chart (2/3 width) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-border/50 h-full min-h-[400px]">
          <h3 className="font-bold mb-6">ATS Score Trend</h3>
          <div className="w-full h-[300px] flex items-center justify-center text-muted-foreground text-sm border border-border rounded-xl bg-zinc-50 dark:bg-zinc-900/50 p-4">
            <AtsScoreChart />
          </div>
        </div>
        
      </div>

      {/* Recent Resumes */}
      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">Recent Resumes</h3>
        <div className="w-full text-muted-foreground text-sm border border-border rounded-2xl bg-card overflow-hidden shadow-sm">
           <ResumeTable />
        </div>
      </div>
      
    </div>
  )
}
