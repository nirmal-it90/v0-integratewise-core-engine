"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WorkspaceConfiguration } from "@/lib/types/onboarding";
import { CheckCircle2, AlertCircle, Settings } from "lucide-react";

interface ConfigurationManagerProps {
  workspaceId: string;
  config?: WorkspaceConfiguration;
}

export function ConfigurationManager({
  workspaceId,
  config,
}: ConfigurationManagerProps) {
  const [configuration, setConfiguration] = useState<WorkspaceConfiguration>(
    config || {
      workspaceId,
      workspaceName: "My Workspace",
      workspaceType: "account_success",
      personaMatrix: ["customer_success"],
      defaultWorkbench: "account-success",
      hydrationPolicy: "90_days",
      dataScope: {
        entities: ["Accounts", "Contacts"],
        hydrationDepth: "90_days",
        retentionPolicy: "1_year",
      },
      governance: {
        aiCanSummarize: true,
        aiCanDetectRisk: true,
        aiCanRecommend: true,
        requireApprovalFor: ["send_communication"],
        neverAutonomous: ["delete_records"],
      },
      aiPolicy: {
        modelPreference: "gpt4",
        autonomyLevel: "recommended",
        dataPrivacy: "balanced",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );

  const [hasChanges, setHasChanges] = useState(false);

  const handleConfigChange = (updates: Partial<WorkspaceConfiguration>) => {
    setConfiguration({ ...configuration, ...updates });
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log("[v0] Saving configuration:", configuration);
    setHasChanges(false);
    // Mock save
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configuration Manager</h1>
        <p className="text-muted-foreground mt-1">
          Manage your workspace settings and behavior
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Workspace Active</p>
                <p className="text-xs text-muted-foreground">
                  {configuration.workspaceName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-xs text-muted-foreground">
                  {configuration.workspaceType.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Autonomy Level</p>
                <p className="text-xs text-muted-foreground">
                  {configuration.aiPolicy.autonomyLevel.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="hydration">
        <TabsList>
          <TabsTrigger value="hydration">Data & Hydration</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="ai-policy">AI Policy</TabsTrigger>
          <TabsTrigger value="personas">Team Personas</TabsTrigger>
        </TabsList>

        {/* Data & Hydration Tab */}
        <TabsContent value="hydration" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Hydration</CardTitle>
              <CardDescription>
                Configure what data is synced and how much history to maintain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hydration Policy */}
              <div className="space-y-3">
                <Label className="text-base">Historical Data Sync Depth</Label>
                <RadioGroup
                  value={configuration.hydrationPolicy}
                  onValueChange={(value: any) =>
                    handleConfigChange({
                      hydrationPolicy: value,
                      dataScope: {
                        ...configuration.dataScope,
                        hydrationDepth: value,
                      },
                    })
                  }
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="now" id="hydration-now" />
                      <Label
                        htmlFor="hydration-now"
                        className="cursor-pointer flex-1"
                      >
                        <span className="font-medium">Now only</span>
                        <p className="text-sm text-muted-foreground">
                          Start fresh with new data
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30_days" id="hydration-30" />
                      <Label
                        htmlFor="hydration-30"
                        className="cursor-pointer flex-1"
                      >
                        <span className="font-medium">Last 30 days</span>
                        <p className="text-sm text-muted-foreground">
                          Recent data and interactions
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="90_days" id="hydration-90" />
                      <Label
                        htmlFor="hydration-90"
                        className="cursor-pointer flex-1"
                      >
                        <span className="font-medium">Last 90 days (default)</span>
                        <p className="text-sm text-muted-foreground">
                          Quarterly context and patterns
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="year" id="hydration-year" />
                      <Label
                        htmlFor="hydration-year"
                        className="cursor-pointer flex-1"
                      >
                        <span className="font-medium">Last year</span>
                        <p className="text-sm text-muted-foreground">
                          Full annual history
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full_history" id="hydration-full" />
                      <Label
                        htmlFor="hydration-full"
                        className="cursor-pointer flex-1"
                      >
                        <span className="font-medium">Full history</span>
                        <p className="text-sm text-muted-foreground">
                          All available data (may be slower)
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Retention Policy */}
              <div className="space-y-3">
                <Label className="text-base">Data Retention</Label>
                <RadioGroup
                  value={configuration.dataScope.retentionPolicy}
                  onValueChange={(value: any) =>
                    handleConfigChange({
                      dataScope: {
                        ...configuration.dataScope,
                        retentionPolicy: value,
                      },
                    })
                  }
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="90_days" id="retention-90" />
                      <Label
                        htmlFor="retention-90"
                        className="cursor-pointer flex-1"
                      >
                        Keep for 90 days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1_year" id="retention-1y" />
                      <Label
                        htmlFor="retention-1y"
                        className="cursor-pointer flex-1"
                      >
                        Keep for 1 year (default)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unlimited" id="retention-unlimited" />
                      <Label
                        htmlFor="retention-unlimited"
                        className="cursor-pointer flex-1"
                      >
                        Unlimited retention
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Save */}
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="w-full"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Governance Rules</CardTitle>
              <CardDescription>
                Define what AI agents can and cannot do
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Capabilities */}
              <div className="space-y-4">
                <Label className="text-base">AI Autonomous Capabilities</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      className="cursor-pointer flex-1"
                      htmlFor="ai-summarize"
                    >
                      <span className="font-medium">Summarize data</span>
                      <p className="text-sm text-muted-foreground">
                        AI can create summaries
                      </p>
                    </Label>
                    <Switch
                      id="ai-summarize"
                      checked={configuration.governance.aiCanSummarize}
                      onCheckedChange={(checked) =>
                        handleConfigChange({
                          governance: {
                            ...configuration.governance,
                            aiCanSummarize: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label
                      className="cursor-pointer flex-1"
                      htmlFor="ai-risk"
                    >
                      <span className="font-medium">Detect risks</span>
                      <p className="text-sm text-muted-foreground">
                        AI can identify risk indicators
                      </p>
                    </Label>
                    <Switch
                      id="ai-risk"
                      checked={configuration.governance.aiCanDetectRisk}
                      onCheckedChange={(checked) =>
                        handleConfigChange({
                          governance: {
                            ...configuration.governance,
                            aiCanDetectRisk: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label
                      className="cursor-pointer flex-1"
                      htmlFor="ai-recommend"
                    >
                      <span className="font-medium">Recommend actions</span>
                      <p className="text-sm text-muted-foreground">
                        AI can suggest next steps
                      </p>
                    </Label>
                    <Switch
                      id="ai-recommend"
                      checked={configuration.governance.aiCanRecommend}
                      onCheckedChange={(checked) =>
                        handleConfigChange({
                          governance: {
                            ...configuration.governance,
                            aiCanRecommend: checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Save */}
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="w-full"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Policy Tab */}
        <TabsContent value="ai-policy" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model & Behavior</CardTitle>
              <CardDescription>
                Configure AI model preferences and autonomy levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Model Preference */}
              <div className="space-y-3">
                <Label className="text-base">Preferred AI Model</Label>
                <RadioGroup
                  value={configuration.aiPolicy.modelPreference}
                  onValueChange={(value: any) =>
                    handleConfigChange({
                      aiPolicy: {
                        ...configuration.aiPolicy,
                        modelPreference: value,
                      },
                    })
                  }
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gpt4" id="model-gpt4" />
                      <Label htmlFor="model-gpt4" className="cursor-pointer flex-1">
                        <span className="font-medium">GPT-4</span>
                        <p className="text-sm text-muted-foreground">
                          Most capable, higher cost
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="claude" id="model-claude" />
                      <Label htmlFor="model-claude" className="cursor-pointer flex-1">
                        <span className="font-medium">Claude</span>
                        <p className="text-sm text-muted-foreground">
                          Balanced performance
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gemini" id="model-gemini" />
                      <Label htmlFor="model-gemini" className="cursor-pointer flex-1">
                        <span className="font-medium">Gemini</span>
                        <p className="text-sm text-muted-foreground">
                          Cost-effective
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Autonomy Level */}
              <div className="space-y-3">
                <Label className="text-base">Autonomy Level</Label>
                <RadioGroup
                  value={configuration.aiPolicy.autonomyLevel}
                  onValueChange={(value: any) =>
                    handleConfigChange({
                      aiPolicy: {
                        ...configuration.aiPolicy,
                        autonomyLevel: value,
                      },
                    })
                  }
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="suggestions_only" id="autonomy-suggestions" />
                      <Label htmlFor="autonomy-suggestions" className="cursor-pointer flex-1">
                        <span className="font-medium">Suggestions only</span>
                        <p className="text-sm text-muted-foreground">
                          Conservative approach
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recommended" id="autonomy-recommended" />
                      <Label htmlFor="autonomy-recommended" className="cursor-pointer flex-1">
                        <span className="font-medium">Recommended (default)</span>
                        <p className="text-sm text-muted-foreground">
                          Balanced automation
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="autonomous" id="autonomy-autonomous" />
                      <Label htmlFor="autonomy-autonomous" className="cursor-pointer flex-1">
                        <span className="font-medium">Autonomous</span>
                        <p className="text-sm text-muted-foreground">
                          Maximum automation
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Save */}
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="w-full"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personas Tab */}
        <TabsContent value="personas" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Personas</CardTitle>
              <CardDescription>
                Define the roles and functions in your team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {configuration.personaMatrix.map((persona) => (
                  <Badge key={persona} variant="secondary">
                    {persona}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Personas help tailor the experience for each team member
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
