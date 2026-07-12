"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-600/20 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IW</span>
            </div>
            <span className="font-semibold text-foreground">IntegrateWise</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#product" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
              Platform
            </Link>
            <Link href="#capabilities" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
              Capabilities
            </Link>
            <Link href="#solutions" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
              Solutions
            </Link>
            <Link href="#integrations" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
              Connector Marketplace
            </Link>
            <Link href="#resources" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
              Resources
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
              Pricing
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
                Log In
              </Button>
            </Link>
            <Link href="/onboarding/select">
              <Button size="sm" className="text-sm bg-purple-600 hover:bg-purple-700 text-white">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
