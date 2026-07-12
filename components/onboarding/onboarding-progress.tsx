"use client";

import { OnboardingProfile } from "@/lib/types/onboarding";

interface OnboardingProgressProps {
  currentStage: number;
  totalStages: number;
  stageName: string;
  profile: OnboardingProfile;
}

export function OnboardingProgress({
  currentStage,
  totalStages,
  stageName,
  profile,
}: OnboardingProgressProps) {
  const progress = ((currentStage + 1) / totalStages) * 100;

  const getStageLabel = (name: string): string => {
    const labels: Record<string, string> = {
      "user-profile": "Your Profile",
      "workspace-setup": "Workspace Setup",
      integrations: "Integrations",
      "data-scope": "Data Scope",
      memory: "Memory Config",
      governance: "Governance",
      "ai-policy": "AI Policy",
      review: "Review & Activate",
    };
    return labels[name] || name;
  };

  const getProfileLabel = (profile: OnboardingProfile): string => {
    const labels: Record<OnboardingProfile, string> = {
      basic: "Quick Setup",
      standard: "Standard Setup",
      comprehensive: "Complete Setup",
    };
    return labels[profile];
  };

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">
              {getProfileLabel(profile)}
            </h2>
            <p className="text-sm text-muted-foreground">
              Step {currentStage + 1} of {totalStages}: {getStageLabel(stageName)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
