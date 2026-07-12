"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-full border border-accent mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Continuity Layer for Operations</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
          One click to{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            total continuity.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
          Connect every tool, process, and team into one continuous operational system.
        </p>
        <p className="text-lg font-semibold text-foreground mb-8 max-w-2xl mx-auto">
          One memory. One spine. Every tool. Every AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/onboarding/select">
            <Button size="lg" className="gap-2">
              Activate Workspace <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#platform">
            <Button size="lg" variant="outline">
              Explore Platform
            </Button>
          </Link>
        </div>

        {/* Visual Concept */}
        <div className="relative max-w-2xl mx-auto bg-gradient-to-b from-card to-card/50 rounded-xl border border-border p-8 backdrop-blur-sm">
          <div className="space-y-4">
            {/* Input systems */}
            <div className="flex items-center justify-between px-4 py-3 bg-background rounded-lg border border-border/50">
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                <span className="text-sm text-muted-foreground">Salesforce • Slack • HubSpot • GitHub • Linear • Notion</span>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center text-primary/40">↓</div>

            {/* Bridge */}
            <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-primary">Continuity Bridge</p>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center text-primary/40">↓</div>

            {/* Spine */}
            <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-primary">Adaptive Spine</p>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center text-primary/40">↓</div>

            {/* Output workbenches */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: "User Workbench", icon: "👤" },
                { name: "Governance", icon: "⚖️" },
                { name: "AI Workbench", icon: "🤖" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="px-3 py-2 bg-background rounded-lg border border-border/50 flex flex-col items-center gap-1"
                >
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-xs text-muted-foreground">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
