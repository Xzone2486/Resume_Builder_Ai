"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ResumeValues } from "@/components/resume-builder/BuilderForm"

export function PreviewPanel() {
  const [resumeData, setResumeData] = useState<ResumeValues | null>(null)

  useEffect(() => {
    // Listen for custom event emitted by the form
    const handleUpdate = (e: any) => {
      setResumeData(e.detail)
    }
    
    window.addEventListener("resume-update", handleUpdate)
    return () => window.removeEventListener("resume-update", handleUpdate)
  }, [])

  if (!resumeData) return (
    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
  )

  const { personalInfo, summary, experience } = resumeData

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full aspect-[1/1.414] bg-white text-black shrink-0 relative shadow-xl overflow-hidden pointer-events-none"
      style={{
        transformOrigin: "top left",
      }}
    >
      {/* Resume Document Layout (Standard ATS Optimised Template) */}
      <div className="p-[8%] h-full w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">{personalInfo?.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-gray-600">
            {personalInfo?.location && <span>{personalInfo.location}</span>}
            {personalInfo?.location && personalInfo?.phone && <span>•</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {personalInfo?.phone && personalInfo?.email && <span>•</span>}
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.linkedin && (
              <>
                <span>•</span>
                <span className="text-blue-600">{personalInfo.linkedin}</span>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-5">
            <h2 className="text-[13px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2 text-gray-900">Professional Summary</h2>
            <p className="text-[11px] leading-relaxed text-gray-800">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[13px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">Work Experience</h2>
            <div className="space-y-4">
              {experience.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[12px] font-bold">{exp.title}</h3>
                    <span className="text-[11px] font-medium text-gray-600">
                       {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-gray-700 italic mb-1.5">{exp.company}</div>
                  <div className="text-[11px] text-gray-800 space-y-1 leading-relaxed pl-3 whitespace-pre-line">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Frame overlay to simulate A4 paper shadow */}
      <div className="absolute inset-0 border border-black/5 pointer-events-none" />
    </motion.div>
  )
}
