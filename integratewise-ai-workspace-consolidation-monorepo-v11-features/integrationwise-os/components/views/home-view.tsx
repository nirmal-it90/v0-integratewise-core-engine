"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Search,
  Brain,
  Sparkles,
  MessageSquare,
  Clock,
  FileText,
  Users,
  Zap,
  Clock4
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTasks, useMetrics } from "@/lib/hooks/use-data"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { TERMINOLOGY } from "@/lib/lens/lens-config"
import { useLens } from "@/lib/lens/lens-provider"
import { CognitiveTwinIntro } from "@/components/cognitive-twin-intro"
import { useEffect, useMemo, useState } from "react"

// Demo memory feed items (shown when no DB connection)
const DEMO_MEMORY_FEED = [
  {
    id: 1,
    title: "Pricing strategy framework",
    type: "framework",
    source: "Claude conversation",
    time: "2 hours ago",
    preview: "3-tier value-based pricing model for Product X..."
  },
  {
    id: 2,
    title: "Meeting notes: Acme Corp",
    type: "note",
    source: "Slack capture",
    time: "Yesterday",
    preview: "Key outcomes: Renewal confirmed for Q2, expansion discussion..."
  },
  {
    id: 3,
    title: "Task extracted: Follow up with Sarah",
    type: "task",
    source: "AI extraction",
    time: "Yesterday",
    preview: "Discuss partnership proposal by Friday..."
  },
]

// Today timeline (events/tasks/meetings)
const TODAY_TIMELINE = [
  { time: "10:00 AM", type: "meeting", title: "Team standup", icon: Users },
  { time: "11:30 AM", type: "task", title: "Review Q1 roadmap", icon: CheckCircle2 },
  { time: "2:00 PM", type: "meeting", title: "Client call: Acme Corp", icon: Users },
  { time: "4:30 PM", type: "task", title: "Prepare strategy review", icon: FileText },
]

// Top 3 AI insights
const TOP_INSIGHTS = [
  {
    id: 1,
    icon: AlertTriangle,
    color: "text-amber-500 bg-amber-500/10",
    title: "3 overdue tasks need attention",
    description: "Consider rescheduling them to Friday to free up your week.",
    action: "View overdue tasks"
  },
  {
    id: 2,
    icon: Lightbulb,
    color: "text-yellow-500 bg-yellow-500/10",
    title: "Tuesday is your busiest day",
    description: "6 tasks due. Based on your calendar and deadlines.",
  },
  {
    id: 3,
    icon: Zap,
    color: "text-blue-500 bg-blue-500/10",
    title: "Focus time: 2pm - 4pm today",
    description: "Your calendar shows optimal deep work window.",
    action: "Block Calendar"
  },
]

// Prepared memory for next meeting
const NEXT_MEETING_MEMORY = {
  title: "Client call: Acme Corp",
  time: "2:00 PM",
  preparedContext: [
    "Renewal discussion from last month",
    "Q2 expansion opportunity mentioned",
    "Sarah (CSM) noted pricing questions"
  ]
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'framework': return Lightbulb
    case 'note': return FileText
    case 'task': return CheckCircle2
    case 'insight': return Sparkles
    default: return FileText
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'framework': return 'text-yellow-500 bg-yellow-500/10'
    case 'note': return 'text-blue-500 bg-blue-500/10'
    case 'task': return 'text-emerald-500 bg-emerald-500/10'
    case 'insight': return 'text-violet-500 bg-violet-500/10'
    default: return 'text-slate-500 bg-slate-500/10'
  }
}

export function HomeView() {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/views/home-view.tsx:129',message:'HomeView rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  const { data: tasks, isLoading: tasksLoading, mutate: mutateTasks } = useTasks()
  const { data: metrics } = useMetrics()
  const { config, lens } = useLens()
  const [searchQuery, setSearchQuery] = useState("")
  const [chatInput, setChatInput] = useState("")
  const [showCognitiveTwinIntro, setShowCognitiveTwinIntro] = useState(false)
  
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/views/home-view.tsx:136',message:'HomeView data loaded',data:{tasksCount:tasks?.length||0,hasTasks:!!tasks,isLoading:tasksLoading,hasMetrics:!!metrics,usingDemoData:tasks?.length===0},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'C'})}).catch(()=>{});
  }, [tasks, tasksLoading, metrics]);
  // #endregion

  const stats = useMemo(() => {
    if (!tasks) return { dueToday: 0, thisWeek: 0, overdue: 0, completed: 0 }
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const nextWeek = today + 7 * 24 * 60 * 60 * 1000

    let dueToday = 0
    let thisWeek = 0
    let overdue = 0
    let completed = 0

    tasks.forEach(task => {
      if (task.status === "done") {
        completed++
        return
      }
      if (!task.due_date) return
      const dueDate = new Date(task.due_date).getTime()
      if (dueDate < today) overdue++
      else if (dueDate === today) dueToday++
      if (dueDate >= today && dueDate <= nextWeek) thisWeek++
    })

    return { dueToday, thisWeek, overdue, completed }
  }, [tasks])

  useEffect(() => {
    // Show Cognitive Twin intro on first visit to dashboard
    if (typeof window !== 'undefined') {
      const hasSeenIntro = localStorage.getItem('cognitive-twin-intro-seen')
      if (!hasSeenIntro) {
        // Delay intro by 2 seconds for better UX
        setTimeout(() => setShowCognitiveTwinIntro(true), 2000)
      }
    }
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const userName = "Nirmal"

  const toggleTask = async (id: string, currentStatus: string) => {
    const supabase = createClient()
    if (!supabase) return
    const newStatus = currentStatus === "done" ? "todo" : "done"
    await supabase.from("tasks").update({ status: newStatus }).eq("id", id)
    mutateTasks()
  }

  const todaysTasks = tasks?.filter((t: any) => t.status !== "done" && t.status !== "cancelled").slice(0, 5) || []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {userName} 👋
        </h1>
        <p className="text-muted-foreground">
          This is your operating memory for today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today Timeline + Memory Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <CardTitle className="text-base">Today</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {TODAY_TIMELINE.length} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {TODAY_TIMELINE.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 w-16 text-xs text-muted-foreground font-mono">
                        {item.time}
                      </div>
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        item.type === 'meeting' && "bg-blue-500/10",
                        item.type === 'task' && "bg-amber-500/10"
                      )}>
                        <Icon className={cn(
                          "h-4 w-4",
                          item.type === 'meeting' && "text-blue-500",
                          item.type === 'task' && "text-amber-500"
                        )} />
                      </div>
                      <span className="flex-1 text-sm font-medium">{item.title}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Memory Feed */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-violet-500" />
                  <CardTitle className="text-base">Memory Feed</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link href="/brainstorming">
                    View all <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
              <CardDescription>Latest from your {TERMINOLOGY.IQ_HUB}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_MEMORY_FEED.map((item) => {
                const Icon = getTypeIcon(item.type)
                const colorClass = getTypeColor(item.type)
                
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0", colorClass)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{item.title}</span>
                        <Badge variant="outline" className="text-[10px] h-4 flex-shrink-0">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{item.preview}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                        <span>{item.source}</span>
                        <span>•</span>
                        <Clock className="h-2.5 w-2.5" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Prepared Memory for Next Meeting */}
          {NEXT_MEETING_MEMORY && (
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Clock4 className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">Prepared Memory</CardTitle>
                </div>
                <CardDescription>For: {NEXT_MEETING_MEMORY.title} at {NEXT_MEETING_MEMORY.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {NEXT_MEETING_MEMORY.preparedContext.map((context, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{context}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Top 3 AI Insights */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" />
              Here's what matters today
            </h2>
            
            <div className="space-y-4">
              {TOP_INSIGHTS.map((insight) => {
                const Icon = insight.icon
                return (
                  <Card key={insight.id} className="border-border hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0", insight.color)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium leading-snug">
                            {insight.title}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {insight.description}
                          </p>
                          {insight.action && (
                            <Button variant="link" className="p-0 h-auto text-xs mt-1" size="sm">
                              {insight.action}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Cognitive Twin Entry */}
          <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-purple-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 text-violet-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{TERMINOLOGY.COGNITIVE_TWIN}</span>
                    <Badge variant="secondary" className="text-[10px] h-5">
                      <Sparkles className="h-2.5 w-2.5 mr-1" />
                      Ready
                    </Badge>
                  </div>
                  <Input
                    placeholder="What would you like to explore?"
                    className="bg-background/50 text-sm h-9 mt-2"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cognitive Twin Intro Panel */}
      {showCognitiveTwinIntro && (
        <CognitiveTwinIntro
          onDismiss={() => setShowCognitiveTwinIntro(false)}
          onStart={() => {
            setShowCognitiveTwinIntro(false)
            // TODO: Open Cognitive Twin chat
          }}
        />
      )}
    </div>
  )
}
