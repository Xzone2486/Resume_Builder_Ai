import { Header } from "@/components/ui/header-1"
import { Footer } from "@/components/layout/Footer"
import { JDSection } from "@/components/resume-builder/JDSection"
import { BuilderForm } from "@/components/resume-builder/BuilderForm"
import { PreviewPanel } from "@/components/resume-builder/PreviewPanel"
import { Download, Minimize2, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResumeBuilderPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Header />
      
      <div className="h-6" /> {/* Spacer */}

      <div className="flex-1 container px-4 lg:px-6 mx-auto py-6 flex flex-col h-full">
        {/* JD Parser Section */}
        <JDSection />

        {/* Builder Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[800px]">
          
          {/* Builder Form Left Panel */}
          <div className="h-full">
             <BuilderForm />
          </div>

          {/* Real-time Preview Right Panel (Sticky/Scrollable area) */}
          <div className="relative h-full hidden lg:block bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-border p-8 overflow-hidden items-center justify-center hide-scrollbar">
            
            {/* Toolbar */}
            <div className="absolute top-4 left-0 right-0 z-10 flex justify-center pointer-events-none">
              <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-2 py-1.5 flex gap-1 pointer-events-auto shadow-sm">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ZoomOut className="w-4 h-4" /></Button>
                <div className="flex items-center justify-center px-2 text-xs font-semibold">100%</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ZoomIn className="w-4 h-4" /></Button>
                <div className="w-[1px] h-4 bg-border mx-1 self-center" />
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Minimize2 className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="absolute bottom-6 right-8 z-10">
              <Button variant="gradient" className="gap-2 shadow-xl shadow-teal-500/20">
                <Download className="w-4 h-4" /> Download Resume
              </Button>
            </div>

            {/* A4 Paper Container with scaling logic (css only scaling for simplicity here) */}
            <div className="w-full h-full flex items-start justify-center overflow-y-auto custom-scrollbar pt-12 pb-24">
               {/* 
                 For exact A4 math: width 210mm, height 297mm (1:1.414)
                 Since container width is responsive, we let the inner aspect ratio div handle it.
               */}
               <div className="w-[85%] max-w-[800px]">
                 <PreviewPanel />
               </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
