"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Sparkles } from "lucide-react"

export default function AnalyzingPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after 8 seconds (6-10 second range)
    const timer = setTimeout(() => {
      router.push("/onboarding/persona")
    }, 8000)

    return () => clearTimeout(timer)
  }, [router])

  const steps = [
    "Reading signals",
    "Matching patterns",
    "Preparing your workspace"
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-6">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 space-y-8 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-violet-500/20 flex items-center justify-center animate-pulse">
                <Brain className="h-10 w-10 text-violet-500" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-bounce" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              I'm learning how you work…
            </h1>

            <div className="space-y-3 pt-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center justify-center gap-3 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
                  <span className="text-lg">{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Progress value={0} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
