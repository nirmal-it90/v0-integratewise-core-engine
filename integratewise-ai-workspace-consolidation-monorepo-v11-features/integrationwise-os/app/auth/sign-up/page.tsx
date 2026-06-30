"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { IntegrateWiseLogo } from "@/components/integratewise-logo"
import { ArrowLeft, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const nameParam = searchParams.get("name")
    if (nameParam && !fullName) {
      setFullName(nameParam)
    }
  }, [searchParams, fullName])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    if (!supabase) {
      setError("System Error: Neural Link Failed")
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/`,
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      router.push("/setup")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    "14-day free trial, no credit card required",
    "Connect unlimited integrations",
    "AI-powered insights and automation",
    "Cancel anytime, no questions asked",
  ]

  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      {/* Left Panel - Vedic Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2 group text-emerald-500 hover:text-emerald-400">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono tracking-wide">ABORT_SEQUENCE</span>
          </Link>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center">
                <IntegrateWiseLogo className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold font-mono tracking-tight text-white">IntegrateWise_OS</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Initialize Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-600"> Digital Persona</span>
            </h1>

            <div className="space-y-4 font-mono text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Access::Unlimited_Integrations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Intelligence::Vedic_AI_Enabled</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Security::Zero_Trust_Spine</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-emerald-900/60 uppercase tracking-widest">
            <span>Protocol::Alpha</span>
            <span>•</span>
            <span>Compliance::GDPR_Ready</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-black to-black pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <IntegrateWiseLogo className="w-8 h-8 text-emerald-400" />
            <span className="text-xl font-bold text-white">IntegrateWise</span>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tight text-white">New User Registration</h2>
              <p className="text-slate-500">Create identity to sync with Vedic insights.</p>
            </div>

            {/* Social Login Block */}
            <div className="grid gap-4">
              <Button variant="outline" className="h-12 w-full bg-zinc-900/50 border-white/10 text-white hover:bg-white/5" onClick={() => alert("Google Login Placeholder")}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Connect with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-slate-500">Or continue with manual entry</span>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-4">

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-slate-300">
                    Operative Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 pl-11 bg-zinc-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Communication Link (Email)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-11 bg-zinc-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-300">
                    Encryption Key (Password)
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Min. 6 chars"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-11 bg-zinc-900/50 border-white/10 text-white focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-300">
                    Confirm Key
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 pl-11 bg-zinc-900/50 border-white/10 text-white focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
                    />
                  </div>
                </div>

              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-950/30 border border-red-500/30">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-base shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Initialize Identity
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-slate-500">
                By acknowledging, you agree to our{" "}
                <Link href="#" className="text-emerald-500 hover:underline">
                  Protocols
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-emerald-500 hover:underline">
                  Data Directives
                </Link>
              </p>
            </form>

            <div className="text-center pt-4">
              <p className="text-slate-500 text-sm">
                Already Verified?{" "}
                <Link href="/auth/login" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                  Access Terminal
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
