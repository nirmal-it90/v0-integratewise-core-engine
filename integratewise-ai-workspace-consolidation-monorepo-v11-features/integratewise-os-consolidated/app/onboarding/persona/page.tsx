"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Briefcase, User, CheckCircle2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// 20 Persona Types
const PERSONA_TYPES = [
  { id: 1, name: "Strategic Operator", strengths: ["Connecting dots", "Building systems", "Driving outcomes"], friction: "Too many disconnected tools" },
  { id: 2, name: "Revenue Driver", strengths: ["Pipeline management", "Deal forecasting", "Sales operations"], friction: "Data scattered across CRMs" },
  { id: 3, name: "Customer Champion", strengths: ["Health scoring", "Risk detection", "Renewal management"], friction: "CS intelligence not universal" },
  { id: 4, name: "Knowledge Curator", strengths: ["Organizing information", "Creating frameworks", "Sharing insights"], friction: "AI insights die in chat history" },
  { id: 5, name: "Process Architect", strengths: ["Workflow design", "Automation", "Efficiency optimization"], friction: "Manual data entry burden" },
  { id: 6, name: "Growth Hacker", strengths: ["Experimentation", "Metrics tracking", "Rapid iteration"], friction: "No unified data view" },
  { id: 7, name: "Product Visionary", strengths: ["Roadmap planning", "Feature prioritization", "User insights"], friction: "Feedback scattered across tools" },
  { id: 8, name: "Team Builder", strengths: ["Team coordination", "Project management", "Resource allocation"], friction: "Context lost in communication" },
  { id: 9, name: "Data Analyst", strengths: ["Pattern recognition", "Reporting", "Insights generation"], friction: "Data silos block analysis" },
  { id: 10, name: "Creative Director", strengths: ["Content creation", "Brand consistency", "Campaign management"], friction: "Assets spread across platforms" },
  { id: 11, name: "Operations Lead", strengths: ["Process optimization", "Vendor management", "Cost control"], friction: "Operational data fragmented" },
  { id: 12, name: "Tech Innovator", strengths: ["Technology adoption", "Integration design", "Automation"], friction: "Tools don't talk to each other" },
  { id: 13, name: "Relationship Builder", strengths: ["Network management", "Stakeholder engagement", "Partnerships"], friction: "Contacts scattered everywhere" },
  { id: 14, name: "Efficiency Expert", strengths: ["Time optimization", "Task automation", "Workflow streamlining"], friction: "Repeating manual work" },
  { id: 15, name: "Risk Manager", strengths: ["Risk assessment", "Compliance tracking", "Mitigation planning"], friction: "Risk signals buried in data" },
  { id: 16, name: "Change Agent", strengths: ["Transformation leadership", "Adoption management", "Impact measurement"], friction: "Change impact hard to track" },
  { id: 17, name: "Domain Expert", strengths: ["Deep specialization", "Best practices", "Knowledge sharing"], friction: "Expertise not captured systematically" },
  { id: 18, name: "Generalist Leader", strengths: ["Cross-functional work", "Big picture thinking", "Resource coordination"], friction: "Context switching overhead" },
  { id: 19, name: "Specialist Contributor", strengths: ["Deep execution", "Quality delivery", "Technical expertise"], friction: "Focus disrupted by tool hopping" },
  { id: 20, name: "Emerging Professional", strengths: ["Rapid learning", "Versatility", "Growth mindset"], friction: "Learning curve across many tools" },
]

const LENSES = [
  { id: 'os', name: 'OS View', icon: User, description: 'Personal productivity & AI thinking', color: 'violet' },
  { id: 'bs', name: 'Business View', icon: Briefcase, description: 'Revenue, clients & operations', color: 'blue' },
  { id: 'cs', name: 'CS View', icon: Target, description: 'Customer success & account health', color: 'emerald' },
] as const

export default function PersonaPage() {
  const router = useRouter()
  const [selectedLens, setSelectedLens] = useState<string | null>(null)
  const [confidence] = useState(87) // Simulated confidence score
  const [recommendedPersona] = useState(PERSONA_TYPES[0]) // Strategic Operator
  const [recommendedLens] = useState('bs') // Business View

  const confidenceThreshold = 75

  const handleContinue = () => {
    const lens = selectedLens || recommendedLens
    // Store lens preference
    localStorage.setItem('integratewise-lens', lens)
    localStorage.setItem('integratewise-persona', recommendedPersona.id.toString())
    router.push("/onboarding/load")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Your Persona Insights</h1>
          <p className="text-muted-foreground">
            Based on your profile, you are:
          </p>
        </div>

        {/* Persona Card */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{recommendedPersona.name}</CardTitle>
                <CardDescription className="mt-2">
                  You thrive on connecting dots, building systems, and driving outcomes across teams.
                </CardDescription>
              </div>
              <Badge variant="secondary">87% Match</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Your Strengths:</p>
              <div className="flex flex-wrap gap-2">
                {recommendedPersona.strengths.map((strength, index) => (
                  <Badge key={index} variant="outline">{strength}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">What Friction You Face:</p>
              <p className="text-sm text-muted-foreground">{recommendedPersona.friction}</p>
            </div>
          </CardContent>
        </Card>

        {/* Lens Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Suggested Starter View Mode</h2>
              <p className="text-sm text-muted-foreground">
                {confidence >= confidenceThreshold
                  ? "We've matched you with the best view. You can change it anytime."
                  : "Choose the view that matches how you work:"}
              </p>
            </div>
            {confidence >= confidenceThreshold && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedLens(null)}>
                Change view
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {LENSES.map((lens) => {
              const Icon = lens.icon
              const isRecommended = lens.id === recommendedLens
              const isSelected = selectedLens === lens.id || (!selectedLens && isRecommended)
              
              return (
                <Card
                  key={lens.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50",
                    isSelected && "border-primary ring-2 ring-primary/20"
                  )}
                  onClick={() => setSelectedLens(lens.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        lens.id === 'os' && "bg-violet-500/10",
                        lens.id === 'bs' && "bg-blue-500/10",
                        lens.id === 'cs' && "bg-emerald-500/10",
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          lens.id === 'os' && "text-violet-500",
                          lens.id === 'bs' && "text-blue-500",
                          lens.id === 'cs' && "text-emerald-500",
                        )} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{lens.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {lens.description}
                        </CardDescription>
                      </div>
                      {isRecommended && !selectedLens && (
                        <Badge variant="secondary" className="text-xs">Recommended</Badge>
                      )}
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Confidence Indicator */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Confidence Level</span>
                <span className="text-muted-foreground">{confidence}%</span>
              </div>
              <Progress value={confidence} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Based on your role, tools, and intent, we're {confidence >= confidenceThreshold ? 'highly' : 'moderately'} confident this is your ideal setup.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleContinue}
            className="px-8"
          >
            Continue – I'll get you value in the next 60 seconds
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
