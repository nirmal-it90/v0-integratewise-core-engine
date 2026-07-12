"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { OnboardingOrchestrator } from "@/components/onboarding/onboarding-orchestrator";
import { OnboardingProfile, OnboardingState } from "@/lib/types/onboarding";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const profileParam = searchParams.get("profile") as OnboardingProfile | null;
  const profile = profileParam || "standard";

  const handleComplete = (state: OnboardingState) => {
    console.log("[v0] Onboarding complete:", state);
    // Save API key and redirect to dashboard
    localStorage.setItem("api_key", state.apiKey || "");
    localStorage.setItem("workspace_config", JSON.stringify(state));
    router.push("/dashboard");
  };

  return (
    <OnboardingOrchestrator
      profile={profile}
      onComplete={handleComplete}
    />
  );
}
