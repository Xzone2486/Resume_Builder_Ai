"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, GripVertical, CheckCircle2, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const experienceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  startDate: z.string().min(1, "Required"),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string(),
})

const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  }),
  summary: z.string().min(10, "Summary should be at least 10 characters"),
  experience: z.array(experienceSchema),
})

export type ResumeValues = z.infer<typeof resumeSchema>

const defaultValues: ResumeValues = {
  personalInfo: {
    fullName: "Ryan Florence",
    email: "ryan@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/ryan",
    portfolio: "ryan.dev",
  },
  summary: "Senior Frontend Engineer with 5+ years of experience building scalable, accessible, and highly-performant web applications using React and Next.js.",
  experience: [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "Stripe",
      startDate: "Jan 2021",
      endDate: "Present",
      current: true,
      description: "• Spearheaded the development of the new merchant dashboard using React and TypeScript.\n• Improved core web vitals by 40% through code splitting and edge caching.",
    }
  ],
}

// Emitting data to window object for PreviewPanel to read in this simplified version
// In a real app, we'd use Zustand or React Context
function emitResumeUpdate(data: ResumeValues) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("resume-update", { detail: data })
    window.dispatchEvent(event)
  }
}

export function BuilderForm() {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("saved")
  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "education" | "skills">("personal")

  const form = useForm<ResumeValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control: form.control,
    name: "experience",
  })

  // Watch for changes and simulate auto-save
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      setSaveState("saving")
      
      // Emit update to preview
      if (value) {
         emitResumeUpdate(value as ResumeValues)
      }

      const timer = setTimeout(() => {
        setSaveState("saved")
      }, 1000)
      return () => clearTimeout(timer)
    })
    
    // Initial emit
    emitResumeUpdate(form.getValues())

    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm relative">
      {/* Auto-Save indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-medium z-10">
        <AnimatePresence mode="wait">
          {saveState === "saving" ? (
             <motion.span
                key="saving"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-1.5 text-muted-foreground"
             >
               <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> Saving...
             </motion.span>
          ) : (
            <motion.span
               key="saved"
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="flex items-center gap-1 text-green-600 dark:text-green-500"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border bg-zinc-50/50 dark:bg-zinc-900/50 pt-2 px-2 hide-scrollbar">
        {[
          { id: "personal", label: "Personal Info" },
          { id: "experience", label: "Experience" },
          { id: "education", label: "Education" },
          { id: "skills", label: "Skills" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? "border-teal-500 text-teal-600 dark:text-teal-400" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
        <form className="space-y-8 pb-20">
          
          <AnimatePresence mode="wait">
            {activeTab === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold mb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Full Name" error={form.formState.errors.personalInfo?.fullName?.message} {...form.register("personalInfo.fullName")} />
                    <InputField label="Email" type="email" error={form.formState.errors.personalInfo?.email?.message} {...form.register("personalInfo.email")} />
                    <InputField label="Phone" {...form.register("personalInfo.phone")} />
                    <InputField label="Location" {...form.register("personalInfo.location")} />
                    <InputField label="LinkedIn URL" {...form.register("personalInfo.linkedin")} />
                    <InputField label="Portfolio URL" {...form.register("personalInfo.portfolio")} />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">Professional Summary</h3>
                    <Button variant="outline" size="sm" type="button" className="text-xs h-7 border-teal-200 text-teal-600 hover:bg-teal-50 dark:border-teal-500/20 dark:text-teal-400 dark:hover:bg-teal-500/10">
                       <Sparkles className="w-3 h-3 mr-1" /> Use AI
                    </Button>
                  </div>
                  <textarea 
                    className="w-full h-32 resize-y rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    placeholder="Briefly describe your expertise..."
                    {...form.register("summary")}
                  />
                  {form.formState.errors.summary && <p className="text-xs text-rose-500 mt-1">{form.formState.errors.summary.message}</p>}
                </div>
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Work Experience</h3>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => appendExp({ title: "", company: "", startDate: "", endDate: "", current: false, description: "" })}
                    className="text-teal-600 dark:text-teal-400"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Role
                  </Button>
                </div>

                <div className="space-y-6">
                  {expFields.map((field, index) => (
                    <motion.div 
                      key={field.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border border-border bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl p-4 relative group"
                    >
                      <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground cursor-grab">
                           <GripVertical className="w-4 h-4" />
                         </Button>
                         <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onClick={() => removeExp(index)}>
                           <Trash2 className="w-4 h-4" />
                         </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-16 mb-4">
                        <InputField label="Job Title" {...form.register(`experience.${index}.title` as const)} />
                        <InputField label="Company" {...form.register(`experience.${index}.company` as const)} />
                        <InputField label="Start Date" placeholder="MM/YYYY" {...form.register(`experience.${index}.startDate` as const)} />
                        <div className="space-y-1">
                           <InputField label="End Date" placeholder="MM/YYYY or Present" disabled={form.watch(`experience.${index}.current`)} {...form.register(`experience.${index}.endDate` as const)} />
                           <label className="flex items-center gap-2 text-xs text-muted-foreground mt-1 cursor-pointer">
                             <input type="checkbox" className="rounded border-border text-teal-600 focus:ring-teal-500" {...form.register(`experience.${index}.current` as const)} />
                             I currently work here
                           </label>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                           <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
                           <Button variant="outline" size="sm" type="button" className="text-xs h-6 px-2 border-teal-200 text-teal-600 hover:bg-teal-50 dark:border-teal-500/20 dark:text-teal-400 dark:hover:bg-teal-500/10 rounded-full">
                             <Sparkles className="w-3 h-3 mr-1" /> Enhance With AI
                           </Button>
                        </div>
                        <textarea 
                          className="w-full h-32 resize-y rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                          placeholder="• Led a team of 5 engineers..."
                          {...form.register(`experience.${index}.description` as const)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === "education" || activeTab === "skills") && (
               <motion.div
                  key="other"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col items-center justify-center py-20 text-muted-foreground"
               >
                 <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 border border-border">
                   <Plus className="w-6 h-6" />
                 </div>
                 <p className="font-medium text-sm">This section is coming soon.</p>
               </motion.div>
            )}
            
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}

function InputField({ label, error, className = "", ...props }: any) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <input
        className={`px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-shadow ${
          error ? "border-rose-500 focus:ring-rose-500/50" : "border-border"
        }`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  )
}
