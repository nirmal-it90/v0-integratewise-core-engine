"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function LandingPage() {
  const router = useRouter()

  const handleStart = () => {
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="w-full border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            IntegrateWise
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/auth">Log in</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Load your work. Store it in your Spine. Think in your IQ Hub. Act through your Cognitive Twin. and Govern with your apps
          </h1>

          {/* Sub */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I connect your tools, capture your AI thinking, and turn everything into one governed workspace.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={handleStart}
            >
              Start in 60 seconds
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 space-y-6">
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Set up in 60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Keep your tools</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
