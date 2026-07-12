"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OnboardingOrchestrator } from "@/components/onboarding/onboarding-orchestrator";
import { OnboardingProfile, OnboardingState } from "@/lib/types/onboarding";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const profileParam = searchParams.get("profile") as OnboardingProfile | null;
  const profile = profileParam || "standard";

  const handleComplete = (state: OnboardingState) => {
    console.log("[v0] Onboarding complete:", state);
    // Save API key and redirect to dashboard
    localStorage.setItem("api_key", state.apiKey || "");
    localStorage.setItem("workspace_config", JSON.stringify(state));
  };

  return (
    <OnboardingOrchestrator
      profile={profile}
      onComplete={handleComplete}
    />
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading onboarding...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
