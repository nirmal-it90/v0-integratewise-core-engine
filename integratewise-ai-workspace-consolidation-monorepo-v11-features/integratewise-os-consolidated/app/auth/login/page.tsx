"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Mail, Lock, ArrowRight } from "lucide-react"
import { IntegrateWiseLogo } from "@/components/integratewise-logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    if (!supabase) {
      setError("System Error: Neural Link Failed")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/setup")
      router.refresh()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      if (errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("credentials")) {
        setError("Invalid email or password. Please try again.")
      } else {
        setError("Unable to sign in. Please check your connection and try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      {/* Left Panel - Vedic Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2 group text-cyan-500 hover:text-cyan-400">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono tracking-wide">RETURN_TO_BASE</span>
          </Link>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
                <IntegrateWiseLogo className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-2xl font-bold font-mono tracking-tight text-white">IntegrateWise_OS</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Access The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"> Neural Network</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-md font-light">
              Authenticate to synchronize your agents and access the global spine.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-cyan-900/60 uppercase tracking-widest">
            <span>Encrypted::AES-256</span>
            <span>•</span>
            <span>Secure_Link::Active</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <IntegrateWiseLogo className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">IntegrateWise</span>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tight text-white">Identity Verification</h2>
              <p className="text-slate-500">Enter credentials to establish connection.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="operative@domain.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-11 bg-zinc-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-300">
                      Passcode
                    </Label>
                    <Link href="#" className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors font-mono uppercase">
                      Reset_Credentials?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-11 bg-zinc-900/50 border-white/10 text-white focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-950/30 border border-red-500/30">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-base shadow-[0_0_20px_-5px_rgba(8,145,178,0.5)] transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Connect
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

              </div>
            </form>

            <div className="pt-4 border-t border-white/5">
              <p className="text-center text-xs text-slate-600">
                Don't have an account?{" "}
                <Link href="/auth/sign-up" className="text-cyan-500 hover:text-cyan-400">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
