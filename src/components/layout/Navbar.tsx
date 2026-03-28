"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, FileText, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SignInModal } from "@/components/auth/SignInModal"

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "ATS Checker", href: "/ats-analysis" },
  { name: "Resume Builder", href: "/resume-builder" },
  { name: "Examples", href: "/#examples" },
  { name: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)
  const pathname = usePathname()
  const { user, signOut, openModal } = useAuth()
  const profileRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <>
      <SignInModal />

      <header className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? "pt-2" : "pt-4"}`}>
        <div className={`flex items-center justify-between w-full max-w-6xl mx-auto px-6 transition-all duration-300 ${
          isScrolled ? "py-3 glass rounded-2xl mx-4" : "py-4 bg-transparent rounded-none mx-0"
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm tracking-tight">RB</span>
            </div>
            <span className="font-semibold text-lg tracking-tight hidden sm:block">ResumeBoost<span className="text-indigo-600">AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group px-1 py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border hover:border-indigo-300 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <img src={user.avatar} className="w-7 h-7 rounded-full bg-zinc-100" alt={user.name} />
                  <span className="text-sm font-medium hidden sm:block max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-200/60 py-2 z-50"
                    >
                      <div className="px-4 py-2.5 border-b border-zinc-100 mb-1">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      {[
                        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
                        { icon: FileText, label: "My Resumes", href: "/profile" },
                        { icon: BarChart2, label: "ATS Analysis", href: "/ats-analysis" },
                      ].map(({ icon: Icon, label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-zinc-50 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-muted-foreground" /> {label}
                        </Link>
                      ))}
                      <div className="border-t border-zinc-100 mt-1 pt-1">
                        <button
                          onClick={() => { signOut(); setProfileOpen(false) }}
                          className="flex items-center gap-3 px-4 py-2 w-full text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" onClick={openModal} className="hidden lg:inline-flex">Sign In</Button>
                <Button variant="gradient" onClick={openModal}>Get Started Free</Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? "auto" : "none" }}
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden pt-24 pb-6 px-6 flex flex-col"
      >
        <nav className="flex flex-col gap-6 mt-8 text-center flex-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: mobileMenuOpen ? i * 0.07 : 0 }}
            >
              <Link href={link.href} className="text-2xl font-semibold hover:text-indigo-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex flex-col gap-4 mt-auto">
          <Button variant="outline" className="w-full text-lg h-12" onClick={() => { setMobileMenuOpen(false); openModal() }}>Sign In</Button>
          <Button variant="gradient" className="w-full text-lg h-12" onClick={() => { setMobileMenuOpen(false); openModal() }}>Get Started Free</Button>
        </div>
      </motion.div>
    </>
  )
}
