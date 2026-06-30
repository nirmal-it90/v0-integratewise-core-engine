"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Sparkles, 
  Database, 
  Brain, 
  CheckCircle2, 
  Loader2,
  ArrowRight,
  Users,
  FolderKanban,
  Building2,
  Lightbulb,
  FileCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

const PROCESSING_STAGES = [
  { id: 1, name: "Read", description: "Reading source schema and data", icon: FileText },
  { id: 2, name: "Clean", description: "Removing duplicates and invalid entries", icon: Sparkles },
  { id: 3, name: "Normalize", description: "Transforming to Spine format", icon: Database },
  { id: 4, name: "Classify", description: "Categorizing: Tasks, Notes, People, Projects, Clients, Decisions", icon: FileCheck },
  { id: 5, name: "Store", description: "Storing into Spine & IQ Hub", icon: Brain },
]

const CLASSIFICATION_CATEGORIES = [
  { name: "Tasks", icon: CheckCircle2, count: 12, color: "text-blue-500" },
  { name: "Notes", icon: FileText, count: 8, color: "text-slate-500" },
  { name: "People", icon: Users, count: 15, color: "text-emerald-500" },
  { name: "Projects", icon: FolderKanban, count: 5, color: "text-amber-500" },
  { name: "Clients", icon: Building2, count: 3, color: "text-violet-500" },
  { name: "Decisions", icon: Lightbulb, count: 4, color: "text-yellow-500" },
]

export default function NormalizePage() {
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate processing pipeline
    const stageDuration = 2000 // 2 seconds per stage
    const totalDuration = PROCESSING_STAGES.length * stageDuration
    let elapsed = 0

    const interval = setInterval(() => {
      elapsed += 200
      const stage = Math.floor((elapsed / stageDuration))
      const stageProgress = ((elapsed % stageDuration) / stageDuration) * 100

      if (stage < PROCESSING_STAGES.length) {
        setCurrentStage(stage)
        setProgress(stageProgress)
      } else {
        setCurrentStage(PROCESSING_STAGES.length - 1)
        setProgress(100)
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const handleCreateWorkspace = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">AI Loader</h1>
          <p className="text-muted-foreground text-lg">
            Turn chaos → structure
          </p>
        </div>

        {/* Processing Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Your Data</CardTitle>
            <CardDescription>
              Stages (shown as pipeline):
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pipeline Stages */}
            <div className="space-y-4">
              {PROCESSING_STAGES.map((stage, index) => {
                const Icon = stage.icon
                const isActive = index === currentStage
                const isComplete = index < currentStage
                const isPending = index > currentStage

                return (
                  <div
                    key={stage.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all",
                      isActive && "border-primary bg-primary/5 ring-2 ring-primary/20",
                      isComplete && "border-emerald-500/50 bg-emerald-500/5",
                      isPending && "border-border opacity-50"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      isActive && "bg-primary/20",
                      isComplete && "bg-emerald-500/20",
                      isPending && "bg-muted"
                    )}>
                      {isComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : isActive ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "font-medium",
                          isActive && "text-primary",
                          isComplete && "text-emerald-500",
                          isPending && "text-muted-foreground"
                        )}>
                          {stage.id}. {stage.name}
                        </span>
                        {isActive && (
                          <Badge variant="secondary" className="text-xs">
                            In progress
                          </Badge>
                        )}
                        {isComplete && (
                          <Badge variant="outline" className="text-xs border-emerald-500/50 text-emerald-500">
                            Complete
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                      {isActive && (
                        <Progress value={progress} className="h-1.5 mt-2" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Overall Progress */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-muted-foreground">
                  {Math.round(((currentStage + progress / 100) / PROCESSING_STAGES.length) * 100)}%
                </span>
              </div>
              <Progress value={((currentStage + progress / 100) / PROCESSING_STAGES.length) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Classification Preview */}
        {currentStage >= 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Classification Results</CardTitle>
              <CardDescription>
                Categorizing: Tasks, Notes, People, Projects, Clients, Decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {CLASSIFICATION_CATEGORIES.map((category) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.name}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50"
                    >
                      <Icon className={cn("h-5 w-5", category.color)} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.count} items</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Storage Destinations */}
        {currentStage >= 4 && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">The Spine</CardTitle>
                </div>
                <CardDescription>Structured entities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Entities stored</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Relationships linked</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-violet-500" />
                  <CardTitle className="text-base">IQ Hub</CardTitle>
                </div>
                <CardDescription>Raw + summarized memory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Raw content stored</span>
                    <span className="font-medium">12 items</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Summaries generated</span>
                    <span className="font-medium">12 summaries</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Embeddings created</span>
                    <span className="font-medium">47 vectors</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA */}
        {isComplete && (
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={handleCreateWorkspace}
              className="px-8"
            >
              Create my workspace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
