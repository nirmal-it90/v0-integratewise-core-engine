"use client"

import { Card } from "@/components/ui/card"
import { Users, Shield, Brain } from "lucide-react"

export function WorkbenchesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            One Surface. Three Workbenches.
          </h2>
          <p className="text-lg text-muted-foreground">
            Separate contexts for separate needs, unified by the Adaptive Spine.
          </p>
        </div>

        {/* Workbenches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Users,
              title: "User Workbench",
              subtitle: "The operational surface for people",
              description:
                "Accounts, priorities, context, notifications and actions assembled around the work being done.",
              color: "from-blue-500/20 to-blue-600/20",
            },
            {
              icon: Shield,
              title: "Governance Workbench",
              subtitle: "The control surface for decisions",
              description:
                "Evidence, policies, approvals and execution authority remain visible and governed.",
              color: "from-purple-500/20 to-purple-600/20",
            },
            {
              icon: Brain,
              title: "AI Workbench",
              subtitle: "The intelligence surface",
              description:
                "Twin understands context. Hermes coordinates capabilities. Models remain replaceable.",
              color: "from-amber-500/20 to-amber-600/20",
            },
          ].map((wb, idx) => {
            const Icon = wb.icon
            return (
              <Card
                key={idx}
                className={`p-8 bg-gradient-to-br ${wb.color} border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group`}
              >
                <div className="mb-4 p-3 bg-background rounded-lg w-fit group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-1">{wb.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{wb.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{wb.description}</p>
              </Card>
            )
          })}
        </div>

        {/* Key Principle */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-lg text-muted-foreground mb-2">
            <span className="font-semibold text-foreground">Truth you own.</span>
            <br />
            <span className="font-semibold text-foreground">AI you rent.</span>
            <br />
            <span className="font-semibold text-foreground">Approval in between.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
