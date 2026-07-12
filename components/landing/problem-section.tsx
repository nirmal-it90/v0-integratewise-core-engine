"use client"

export function ProblemSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Your business already has the truth.
          </h2>
          <p className="text-xl text-muted-foreground">
            It is just scattered everywhere.
          </p>
        </div>

        {/* Problem Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: "Customer context",
              description: "Lives in CRM, fragmented across systems",
            },
            {
              title: "Decisions",
              description: "Disappear into Slack and chat history",
            },
            {
              title: "Execution",
              description: "Lives in project tools, disconnected from context",
            },
            {
              title: "Knowledge",
              description: "Becomes siloed documents and wiki pages",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* The Real Problem */}
        <div className="bg-gradient-to-r from-destructive/5 to-destructive/10 border border-destructive/20 rounded-lg p-8 text-center">
          <p className="text-lg font-semibold text-foreground mb-2">
            The problem isn&apos;t another tool.
          </p>
          <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            The problem is continuity between them.
          </p>
        </div>

        {/* AI Impact */}
        <div className="mt-12 p-8 bg-card rounded-lg border border-border">
          <p className="text-center text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">Every AI conversation</span> starts from partial context.
          </p>
          <p className="text-center text-muted-foreground">
            Your organization accumulates rich operational knowledge across systems, but AI models see only fragments, making every recommendation incomplete.
          </p>
        </div>
      </div>
    </section>
  )
}
