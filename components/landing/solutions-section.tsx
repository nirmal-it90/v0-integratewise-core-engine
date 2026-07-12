"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Workflow, BarChart3 } from "lucide-react"

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Continuity applied to real operations.
          </h2>
          <p className="text-lg text-muted-foreground">
            See how different teams unlock context across their operational systems.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: "Account Success",
              description: "See customer health, commitments, risk and history across every customer system.",
              features: [
                "360° account context",
                "Unified health scoring",
                "Risk detection",
                "Activity continuity",
              ],
            },
            {
              icon: Workflow,
              title: "Business Operations",
              description: "Connect fragmented processes into a shared operational view.",
              features: [
                "Process continuity",
                "Decision visibility",
                "Workflow automation",
                "Approval orchestration",
              ],
            },
            {
              icon: BarChart3,
              title: "Business Intelligence",
              description: "Turn operational memory into contextual intelligence without separating analytics from execution.",
              features: [
                "Contextual metrics",
                "Real-time insights",
                "Operational analytics",
                "Decision intelligence",
              ],
            },
          ].map((solution, idx) => {
            const Icon = solution.icon
            return (
              <Card
                key={idx}
                className="p-8 border-border hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-xl mb-2">{solution.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
