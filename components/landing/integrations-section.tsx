"use client"

import { Card } from "@/components/ui/card"

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Keep your tools.
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Connect the memory between them.
          </p>
          <p className="text-muted-foreground">
            Your operational architecture remains yours.
          </p>
        </div>

        {/* Integration Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {[
            { name: "Salesforce", icon: "☁️" },
            { name: "Slack", icon: "💬" },
            { name: "HubSpot", icon: "🔄" },
            { name: "GitHub", icon: "🐙" },
            { name: "Linear", icon: "▭" },
            { name: "Notion", icon: "📝" },
            { name: "Coda", icon: "📊" },
            { name: "Google Workspace", icon: "📧" },
            { name: "Zendesk", icon: "🎫" },
            { name: "Attio", icon: "⚙️" },
            { name: "Apollo", icon: "🚀" },
            { name: "Snowflake", icon: "❄️" },
          ].map((integration, idx) => (
            <Card
              key={idx}
              className="p-6 flex flex-col items-center justify-center gap-3 border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {integration.icon}
              </span>
              <p className="text-sm font-medium text-foreground text-center">{integration.name}</p>
            </Card>
          ))}
        </div>

        {/* Integration Methods */}
        <Card className="p-8 border-border bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Integrate through multiple methods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "OAuth & API",
                description: "Connect through native provider authentication for real-time sync.",
              },
              {
                title: "Provider Adapters",
                description: "Use pre-built connectors for popular platforms with optimized schemas.",
              },
              {
                title: "Capability Contracts",
                description: "Define custom integrations through standardized capability interfaces.",
              },
            ].map((method, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-background border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">{method.title}</h4>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
