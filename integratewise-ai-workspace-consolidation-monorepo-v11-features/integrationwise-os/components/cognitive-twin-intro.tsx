"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Brain, MessageSquare, Sparkles, X, CheckCircle2, FileText, Lightbulb, ArrowRight } from "lucide-react"
import { TERMINOLOGY } from "@/lib/lens/lens-config"
import { cn } from "@/lib/utils"

interface CognitiveTwinIntroProps {
  onDismiss?: () => void
  onStart?: () => void
}

export function CognitiveTwinIntro({ onDismiss, onStart }: CognitiveTwinIntroProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if intro was already seen
    const hasSeenIntro = typeof window !== 'undefined' && localStorage.getItem('cognitive-twin-intro-seen') === 'true'
    if (!hasSeenIntro) {
      // Delay showing intro by 1 second for better UX
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const capabilities = [
    {
      icon: CheckCircle2,
      name: "Extract Tasks",
      description: "Identifies action items from any content"
    },
    {
      icon: FileText,
      name: "Summarize",
      description: "Distills long conversations and threads"
    },
    {
      icon: Lightbulb,
      name: "Find Connections",
      description: "Discovers relationships you might miss"
    },
    {
      icon: Sparkles,
      name: "Draft Content",
      description: "Creates first drafts based on context"
    }
  ]

  const handleClose = () => {
    setIsOpen(false)
    onDismiss?.()
    localStorage.setItem('cognitive-twin-intro-seen', 'true')
  }

  const handleStart = () => {
    setIsOpen(false)
    onStart?.()
    localStorage.setItem('cognitive-twin-intro-seen', 'true')
  }

  if (!isOpen) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Brain className="h-6 w-6 text-violet-500" />
            </div>
            <div>
              <SheetTitle className="text-xl">{TERMINOLOGY.COGNITIVE_TWIN}</SheetTitle>
              <SheetDescription>
                Your AI assistant powered by {TERMINOLOGY.BRAIN_AGENTS}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Intro Message */}
          <Card className="border-violet-500/20 bg-violet-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="font-medium">I already know your context.</p>
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about your work. I've been learning from your {TERMINOLOGY.IQ_HUB} and can help you:
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Capabilities */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">What I Can Do</h3>
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((capability) => {
                const Icon = capability.icon
                return (
                  <Card key={capability.name} className="border-border hover:border-primary/50 transition-colors">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-violet-500" />
                          <span className="text-sm font-medium">{capability.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {capability.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Examples */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Try asking me:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "What did we discuss about pricing last week?",
                "Summarize my meeting notes from yesterday",
                "What tasks do I have related to Project X?",
                "Find connections between Client A and our strategy discussion"
              ].map((example, index) => (
                <div key={index} className="p-2 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                  "{example}"
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleStart}
              className="flex-1 bg-violet-600 hover:bg-violet-700"
            >
              Start chatting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            You can access me anytime from the sidebar or using ⌘K
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
