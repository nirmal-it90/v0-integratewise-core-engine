"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OnboardingState } from "@/lib/types/onboarding";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface OnboardingCompletionReviewProps {
  state: OnboardingState;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function OnboardingCompletionReview({
  state,
  onNext,
  onBack,
  isLoading = false,
}: OnboardingCompletionReviewProps) {
  const sections = [
    {
      title: "User Profile",
      items: [
        { label: "Name", value: `${state.userProfile?.firstName} ${state.userProfile?.lastName}` },
        { label: "Email", value: state.userProfile?.email },
        { label: "Role", value: state.userProfile?.persona },
        { label: "Timezone", value: state.userProfile?.timezone },
      ],
    },
    {
      title: "Workspace",
      items: [
        { label: "Workspace", value: state.workspaceSetup?.workspaceName },
        { label: "Company", value: state.workspaceSetup?.companyName },
        { label: "Type", value: state.workspaceSetup?.workspaceType },
        { label: "Use Case", value: state.workspaceSetup?.primaryUseCase },
      ],
    },
    {
      title: "Data Configuration",
      items: [
        { label: "Entities", value: state.dataScope?.entities?.join(", ") || "Not set" },
        { label: "History", value: state.dataScope?.hydrationDepth || "Not set" },
        {
          label: "Retention",
          value: state.dataScope?.retentionPolicy || "Not set",
        },
      ],
    },
    {
      title: "Memory & AI",
      items: [
        {
          label: "Operational Memory",
          value: `${state.memory?.operationalMemory?.length || 0} items`,
        },
        {
          label: "Historical Context",
          value: state.memory?.historicalMemory ? "Enabled" : "Disabled",
        },
        { label: "Caching", value: state.memory?.cachingStrategy || "Not set" },
        { label: "Model", value: state.aiPolicy?.modelPreference || "Not set" },
      ],
    },
    {
      title: "Governance",
      items: [
        {
          label: "Autonomous Actions",
          value: `${[
            state.governance?.aiCanSummarize ? "Summarize" : null,
            state.governance?.aiCanDetectRisk ? "Detect Risk" : null,
            state.governance?.aiCanRecommend ? "Recommend" : null,
          ]
            .filter(Boolean)
            .join(", ") || "None"}`,
        },
        {
          label: "Approvals Required",
          value: state.governance?.requireApprovalFor?.length || 0,
        },
      ],
    },
    {
      title: "Integrations",
      items: [
        {
          label: "Connected Systems",
          value: state.connectedIntegrations?.length || 0,
        },
        {
          label: "Systems",
          value: state.connectedIntegrations?.join(", ") || "None yet",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Review Your Configuration</CardTitle>
              <CardDescription>
                Verify all settings before activating your workspace
              </CardDescription>
            </div>
            <Badge variant="default" className="ml-2">
              Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Workspace Ready</p>
              <p className="text-2xl font-bold">
                {state.workspaceSetup?.workspaceName || "Your Workspace"}
              </p>
            </div>
            <div className="bg-accent/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Connected Systems</p>
              <p className="text-2xl font-bold">{state.connectedIntegrations?.length || 0}</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">API Key</p>
              <p className="text-2xl font-bold">Generated</p>
            </div>
          </div>

          {/* Configuration Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 bg-card border rounded-lg"
                    >
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                  Ready to activate
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  Your workspace is configured and ready to connect to your systems. You can modify these settings anytime from the Configuration Manager.
                </p>
              </div>
            </div>
          </div>

          {/* API Key Info */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">
                  Your API Key
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                  A unique API key has been generated for your workspace. Store it securely as you&apos;ll need it for API calls.
                </p>
                <div className="mt-2 bg-white dark:bg-slate-950 p-2 rounded font-mono text-xs break-all">
                  {state.apiKey || "key_xxxxxxxxxxxx"}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              {isLoading ? "Activating workspace..." : "Activate Workspace"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
