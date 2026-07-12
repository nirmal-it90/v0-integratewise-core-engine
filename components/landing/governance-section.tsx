"use client"

export function GovernanceSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            AI can think.
          </h2>
          <p className="text-xl text-muted-foreground">
            Your organization still decides.
          </p>
        </div>

        {/* Governance Flow */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-3">
            {[
              { step: "1", label: "Think", color: "bg-blue-500" },
              { step: "2", label: "Propose", color: "bg-purple-500" },
              { step: "3", label: "Evidence", color: "bg-cyan-500" },
              { step: "4", label: "Policy", color: "bg-indigo-500" },
              { step: "5", label: "Approval", color: "bg-violet-500" },
              { step: "6", label: "Act", color: "bg-pink-500" },
              { step: "7", label: "Memory", color: "bg-primary" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold text-sm flex-shrink-0 ${item.color}`}>
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                  </div>
                </div>
                {idx === 6 ? (
                  <div className="flex justify-center py-2 text-primary">↺ Continuous Loop</div>
                ) : (
                  <div className="flex justify-center py-1 text-primary/40">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "🧠",
              title: "Twin proposes",
              description: "AI analyzes context and generates recommendations based on organizational knowledge.",
            },
            {
              icon: "⚖️",
              title: "Governance evaluates",
              description: "Policies automatically route decisions to appropriate approval workflows.",
            },
            {
              icon: "✅",
              title: "Humans approve",
              description: "Where required, decisions reach the right people with full context.",
            },
            {
              icon: "🚀",
              title: "Capabilities execute",
              description: "Approved actions run through the right systems with proper authorization.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
