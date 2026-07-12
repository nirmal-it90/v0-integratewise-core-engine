"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProfile, OnboardingState, UserProfileData, WorkspaceSetupData } from "@/lib/types/onboarding";
import { BasicStage } from "./stages/basic-stage";
import { StandardStage } from "./stages/standard-stage";
import { IntegrationStage } from "./stages/integration-stage";
import {
  DataScopeStage,
  MemoryStage,
  GovernanceStage,
  AIPolicyStage,
} from "./stages/comprehensive-stages";
import { OnboardingProgress } from "./onboarding-progress";
import { OnboardingCompletionReview } from "./onboarding-completion-review";
import { useUser } from "@/lib/contexts/user-context";

interface OnboardingOrchestratorProps {
  profile: OnboardingProfile;
  onComplete: (state: OnboardingState) => void;
  initialData?: OnboardingState;
}

export function OnboardingOrchestrator({
  profile,
  onComplete,
  initialData,
}: OnboardingOrchestratorProps) {
  const router = useRouter();
  const { completeOnboarding } = useUser();

  // Define stages based on profile
  const getStages = (profile: OnboardingProfile): string[] => {
    switch (profile) {
      case "basic":
        return ["user-profile"];
      case "standard":
        return ["user-profile", "workspace-setup"];
      case "comprehensive":
        return [
          "user-profile",
          "workspace-setup",
          "integrations",
          "data-scope",
          "memory",
          "governance",
          "ai-policy",
          "review",
        ];
    }
  };

  const stages = getStages(profile);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(
    initialData || {
      profile,
      currentStage: 0,
    }
  );

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`onboarding-${profile}`);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setOnboardingState(data);
        setCurrentStageIndex(data.currentStage || 0);
      } catch (e) {
        console.log("[v0] Failed to load onboarding state from localStorage");
      }
    }
  }, [profile]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(
      `onboarding-${profile}`,
      JSON.stringify({
        ...onboardingState,
        currentStage: currentStageIndex,
      })
    );
  }, [onboardingState, currentStageIndex, profile]);

  const currentStage = stages[currentStageIndex];

  const handleNext = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
      setOnboardingState({
        ...onboardingState,
        currentStage: currentStageIndex + 1,
      });
    } else {
      // Onboarding complete
      setIsLoading(false);
      const finalState = {
        ...onboardingState,
        completedAt: new Date(),
        apiKey: `key_${Math.random().toString(36).substr(2, 9)}`, // Mock API key
      };
      setOnboardingState(finalState);
      onComplete(finalState);
      
      // Update user context and redirect
      completeOnboarding();
      setTimeout(() => {
        router.push("/integrations/manager");
        router.refresh();
      }, 1000);
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
      setOnboardingState({
        ...onboardingState,
        currentStage: currentStageIndex - 1,
      });
    }
  };

  const handleUserProfileChange = (data: Partial<UserProfileData>) => {
    setOnboardingState({
      ...onboardingState,
      userProfile: { ...onboardingState.userProfile, ...data } as UserProfileData,
    });
  };

  const handleWorkspaceSetupChange = (data: Partial<WorkspaceSetupData>) => {
    setOnboardingState({
      ...onboardingState,
      workspaceSetup: { ...onboardingState.workspaceSetup, ...data } as WorkspaceSetupData,
    });
  };

  const handleSelectConnector = (connectorId: string, selected: boolean) => {
    const current = onboardingState.connectedIntegrations || [];
    const updated = selected
      ? [...current, connectorId]
      : current.filter((id) => id !== connectorId);
    setOnboardingState({
      ...onboardingState,
      connectedIntegrations: updated,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Indicator */}
      <OnboardingProgress
        currentStage={currentStageIndex}
        totalStages={stages.length}
        stageName={currentStage}
        profile={profile}
      />

      {/* Main Content */}
      <div className="container mx-auto py-12">
        {/* User Profile Stage */}
        {currentStage === "user-profile" && (
          <BasicStage
            data={onboardingState.userProfile || {}}
            onDataChange={handleUserProfileChange}
            onNext={handleNext}
            isLoading={isLoading}
          />
        )}

        {/* Workspace Setup Stage */}
        {currentStage === "workspace-setup" && (
          <StandardStage
            data={onboardingState.workspaceSetup || {}}
            onDataChange={handleWorkspaceSetupChange}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {/* Integration Stage (Standard & Comprehensive) */}
        {currentStage === "integrations" && (
          <IntegrationStage
            selectedConnectors={onboardingState.connectedIntegrations || []}
            onSelectConnector={handleSelectConnector}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {/* Data Scope Stage */}
        {currentStage === "data-scope" && (
          <DataScopeStage
            data={onboardingState.dataScope || {}}
            onDataChange={(data) =>
              setOnboardingState({ ...onboardingState, dataScope: data })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Memory Stage */}
        {currentStage === "memory" && (
          <MemoryStage
            data={onboardingState.memory || {}}
            onDataChange={(data) =>
              setOnboardingState({ ...onboardingState, memory: data })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Governance Stage */}
        {currentStage === "governance" && (
          <GovernanceStage
            data={onboardingState.governance || {}}
            onDataChange={(data) =>
              setOnboardingState({ ...onboardingState, governance: data })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* AI Policy Stage */}
        {currentStage === "ai-policy" && (
          <AIPolicyStage
            data={onboardingState.aiPolicy || {}}
            onDataChange={(data) =>
              setOnboardingState({ ...onboardingState, aiPolicy: data })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Review Stage (Comprehensive only) */}
        {currentStage === "review" && (
          <OnboardingCompletionReview
            state={onboardingState}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
