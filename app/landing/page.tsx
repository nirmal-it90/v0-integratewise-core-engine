import { LandingNav } from "@/components/landing/landing-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { ContinuitySection } from "@/components/landing/continuity-section"
import { WorkbenchesSection } from "@/components/landing/workbenches-section"
import { SpineSection } from "@/components/landing/spine-section"
import { GovernanceSection } from "@/components/landing/governance-section"
import { SolutionsSection } from "@/components/landing/solutions-section"
import { IntegrationsSection } from "@/components/landing/integrations-section"
import { CtaFooterSection } from "@/components/landing/cta-footer-section"

export const metadata = {
  title: "IntegrateWise - Operational Continuity for Distributed Teams",
  description:
    "Connect every tool, process, and team into one continuous operational system. One memory. One spine. Every tool. Every AI.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      <main className="pt-16">
        <HeroSection />
        <ProblemSection />
        <ContinuitySection />
        <WorkbenchesSection />
        <SpineSection />
        <GovernanceSection />
        <SolutionsSection />
        <IntegrationsSection />
        <CtaFooterSection />
      </main>
    </div>
  )
}
