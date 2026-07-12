"use client"

import { Card } from "@/components/ui/card"

export function SpineSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Your organization needs memory.
          </h2>
          <p className="text-lg text-muted-foreground">
            The Adaptive Spine converts fragmented activity into persistent operational context.
          </p>
        </div>

        {/* Memory Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "User Memory",
              description: "What the person knows, does and needs.",
            },
            {
              title: "Work Memory",
              description: "What is happening around an account, project, opportunity or process.",
            },
            {
              title: "Organization Memory",
              description: "The shared operational context accumulated across the company.",
            },
          ].map((item, idx) => (
            <Card key={idx} className="p-6 border-border bg-card hover:border-primary/30 transition-colors">
              <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Card>
          ))}
        </div>

        {/* Memory Architecture Diagram */}
        <div className="max-w-xl mx-auto mb-12 bg-card border border-border rounded-lg p-8">
          <div className="space-y-6">
            {/* User Memory */}
            <div className="flex items-center gap-3">
              <div className="w-24 px-4 py-2 bg-blue-500/20 rounded text-center font-semibold text-sm text-blue-700 dark:text-blue-300">
                User Memory
              </div>
              <div className="text-primary/60 text-xl">↘</div>
            </div>

            {/* Work Memory */}
            <div className="flex items-center gap-3 ml-8">
              <div className="w-24 px-4 py-2 bg-purple-500/20 rounded text-center font-semibold text-sm text-purple-700 dark:text-purple-300">
                Work Memory
              </div>
              <div className="text-primary/60 text-xl">↘</div>
            </div>

            {/* Central */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 h-px bg-border"></div>
              <div className="px-6 py-3 bg-primary/10 rounded border border-primary/30 font-semibold text-primary text-sm text-center whitespace-nowrap">
                Digital Memory
              </div>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Output */}
            <div className="flex items-center justify-center">
              <div className="px-6 py-3 bg-primary/20 rounded border border-primary/40 font-semibold text-primary text-sm">
                Continuity
              </div>
            </div>

            {/* Org Memory */}
            <div className="flex items-center gap-3 ml-8">
              <div className="text-primary/60 text-xl">↙</div>
              <div className="w-24 px-4 py-2 bg-amber-500/20 rounded text-center font-semibold text-sm text-amber-700 dark:text-amber-300">
                Org Memory
              </div>
            </div>
          </div>
        </div>

        {/* No Model Owns Truth */}
        <div className="bg-gradient-to-r from-accent to-accent/50 border border-primary/20 rounded-lg p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            No model owns canonical truth.
          </p>
          <p className="text-muted-foreground mt-2">
            Memory lives in your operational system. Models remain replaceable. You stay in control.
          </p>
        </div>
      </div>
    </section>
  )
}
