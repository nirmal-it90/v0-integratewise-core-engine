"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface OnboardingProfile {
  id: "basic" | "standard" | "comprehensive";
  title: string;
  description: string;
  duration: string;
  features: string[];
  recommended?: boolean;
}

const profiles: OnboardingProfile[] = [
  {
    id: "basic",
    title: "Quick Setup",
    description: "Get started fast with just the essentials",
    duration: "2-3 minutes",
    features: ["Profile information", "Team role", "Timezone"],
  },
  {
    id: "standard",
    title: "Standard Setup",
    description: "Complete workspace activation for most teams",
    duration: "5-7 minutes",
    features: [
      "Your profile",
      "Workspace setup",
      "Team details",
      "Primary use case",
    ],
    recommended: true,
  },
  {
    id: "comprehensive",
    title: "Complete Setup",
    description: "Full configuration for enterprises and power users",
    duration: "15-20 minutes",
    features: [
      "Full workspace configuration",
      "Integration management",
      "Data hydration policy",
      "Memory settings",
      "Governance rules",
      "AI policy configuration",
    ],
  },
];

export function OnboardingProfileSelector() {
  const router = useRouter();

  const handleSelectProfile = (profileId: "basic" | "standard" | "comprehensive") => {
    router.push(`/onboarding?profile=${profileId}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to IntegrateWise</h1>
          <p className="text-xl text-muted-foreground">
            Choose your onboarding path to activate your workspace
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              className={`relative transition-all ${
                profile.recommended ? "ring-2 ring-primary" : ""
              }`}
            >
              {profile.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Recommended
                  </div>
                </div>
              )}

              <CardHeader>
                <CardTitle>{profile.title}</CardTitle>
                <CardDescription className="text-sm">
                  {profile.description}
                </CardDescription>
                <div className="text-xs text-muted-foreground mt-2">
                  Takes about {profile.duration}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  {profile.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Button
                  onClick={() => handleSelectProfile(profile.id)}
                  className="w-full mt-6"
                  variant={profile.recommended ? "default" : "outline"}
                  size="lg"
                >
                  Choose {profile.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>
            You can always update these settings later from the Configuration Manager
          </p>
        </div>
      </div>
    </div>
  );
}
