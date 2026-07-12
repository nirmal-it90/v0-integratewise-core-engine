"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function CtaFooterSection() {
  return (
    <>
      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Your organization already creates the context.
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            Start remembering it.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            Connect your ecosystem and activate your operational continuity layer.
          </p>

          <Link href="/onboarding/select">
            <Button size="lg" className="gap-2 mb-8">
              Activate Workspace <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <p className="text-lg font-semibold text-foreground">
            One memory. One spine. Every tool. Every AI.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IW</span>
                </div>
                <span className="font-semibold text-foreground">IntegrateWise</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Operational continuity for distributed teams.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                {["Platform", "Workbenches", "Integrations", "Pricing"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
              <ul className="space-y-2">
                {[
                  "Account Success",
                  "Operations",
                  "Intelligence",
                  "Enterprise",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                {["Blog", "Careers", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 IntegrateWise. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
