"use client"

import { Card } from "@/components/ui/card"

export function ContinuitySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Normalize once.
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Render anywhere.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            IntegrateWise connects your operational ecosystem to a shared contextual layer.
          </p>
        </div>

        {/* Process Flow */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="space-y-3">
            {[
              { step: "1", label: "Connect", desc: "All your tools" },
              { step: "2", label: "Normalize", desc: "Unified schema" },
              { step: "3", label: "Build Spine", desc: "Operational memory" },
              { step: "4", label: "Create Continuity", desc: "Context preserved" },
              { step: "5", label: "Render on Workbench", desc: "Use everywhere" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                {idx < 4 && (
                  <div className="flex justify-center py-1 text-primary/40">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-card to-card/50">
            <h3 className="font-semibold text-foreground mb-3">Every system keeps its identity</h3>
            <p className="text-muted-foreground">
              Your tools continue doing what they do best. Salesforce stays your CRM. Slack remains your chat. No replacement, no migration.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-card/50">
            <h3 className="font-semibold text-foreground mb-3">IntegrateWise maintains the memory</h3>
            <p className="text-muted-foreground">
              The Adaptive Spine becomes the connective tissue. It preserves context, relationships, and continuity across every tool transition.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
