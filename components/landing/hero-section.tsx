"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Layers } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Background gradient accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left column - Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-600/40 mb-8">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Operational Continuity. Governed Intelligence.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            One click to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              total continuity.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
            Connect every tool, process, and team into a single operational system. The AI Continuity-Bridge unifies your ecosystem with zero friction.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-600/40 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <span className="text-sm text-muted-foreground">Your data stays yours</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-600/40 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <span className="text-sm text-muted-foreground">AI with approval in between</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-600/40 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <span className="text-sm text-muted-foreground">Enterprise-grade security</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/onboarding/select">
              <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                Activate Workspace <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#platform">
              <Button size="lg" variant="outline" className="border-purple-600/40 hover:bg-purple-600/10">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Right column - Product Mockup */}
        <div className="relative hidden lg:block">
          <div className="relative">
            {/* Product mockup card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-purple-600/30 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-800/50 border-b border-purple-600/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-foreground">IntegrateWise</span>
                </div>
                <div className="text-xs text-muted-foreground">Account Success</div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Welcome greeting */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Good morning, Alex</h3>
                  <p className="text-sm text-muted-foreground">Here's what's happening across your workspace</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Active", value: "24", change: "+2% last 7 days" },
                    { label: "Revenue", value: "$2.43M", change: "+12% last 7 days" },
                    { label: "Health", value: "78", change: "+3% in last 7 days" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-900/50 rounded-lg p-3 border border-purple-600/20">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-green-400 mt-1">{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Dashboard sections */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-purple-600/20">
                    <p className="text-xs font-medium text-foreground mb-2">Continuity Feed</p>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">• Amy has taken action...</div>
                      <div className="text-xs text-muted-foreground">• System communication</div>
                      <div className="text-xs text-muted-foreground">• Expansion opportunity</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-purple-600/20">
                    <p className="text-xs font-medium text-foreground mb-2">Memory Map</p>
                    <div className="flex flex-wrap gap-1">
                      {["CRM", "Support", "Eng", "AI", "Sec", "CS"].map((tag) => (
                        <span key={tag} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent rounded-2xl blur-xl -z-10 opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
