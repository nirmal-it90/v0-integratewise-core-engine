"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DataScopeData,
  HydrationDepth,
  MemoryConfigData,
  GovernanceData,
  AIPolicyData,
} from "@/lib/types/onboarding";

// Data Scope Stage
interface DataScopeStageProps {
  data: Partial<DataScopeData>;
  onDataChange: (data: Partial<DataScopeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DataScopeStage({ data, onDataChange, onNext, onBack }: DataScopeStageProps) {
  const entities = [
    "Accounts",
    "Contacts",
    "Opportunities",
    "Tickets",
    "Conversations",
    "Documents",
    "Projects",
    "Tasks",
  ];

  const hydrationOptions: { value: HydrationDepth; label: string; description: string }[] = [
    { value: "now", label: "Start from now", description: "Sync new data only" },
    { value: "30_days", label: "Last 30 days", description: "Recent data" },
    { value: "90_days", label: "Last 90 days", description: "Quarterly data" },
    { value: "year", label: "Last year", description: "Full year history" },
    { value: "full_history", label: "Full available history", description: "All historical data" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configure Data Scope</CardTitle>
          <CardDescription>
            What data should IntegrateWise track and analyze?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Entity Selection */}
          <div className="space-y-4">
            <Label>Select entities to track</Label>
            <div className="grid grid-cols-2 gap-3">
              {entities.map((entity) => (
                <div key={entity} className="flex items-center space-x-2">
                  <Checkbox
                    id={entity}
                    checked={data.entities?.includes(entity) || false}
                    onCheckedChange={(checked) => {
                      const newEntities = checked
                        ? [...(data.entities || []), entity]
                        : (data.entities || []).filter((e) => e !== entity);
                      onDataChange({ ...data, entities: newEntities });
                    }}
                  />
                  <Label htmlFor={entity} className="cursor-pointer">
                    {entity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Hydration Depth */}
          <div className="space-y-4">
            <Label>How much historical data should we sync?</Label>
            <RadioGroup
              value={data.hydrationDepth || ""}
              onValueChange={(value) =>
                onDataChange({ ...data, hydrationDepth: value as HydrationDepth })
              }
            >
              <div className="space-y-2">
                {hydrationOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex flex-col cursor-pointer flex-1">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm text-muted-foreground">{option.description}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Retention Policy */}
          <div className="space-y-2">
            <Label htmlFor="retention">Data Retention Policy</Label>
            <Select
              value={data.retentionPolicy || ""}
              onValueChange={(value) =>
                onDataChange({
                  ...data,
                  retentionPolicy: value as "90_days" | "1_year" | "unlimited",
                })
              }
            >
              <SelectTrigger id="retention">
                <SelectValue placeholder="Select retention policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90_days">Keep for 90 days</SelectItem>
                <SelectItem value="1_year">Keep for 1 year</SelectItem>
                <SelectItem value="unlimited">Keep unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext} size="lg">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Memory & Hydration Stage
interface MemoryStageProps {
  data: Partial<MemoryConfigData>;
  onDataChange: (data: Partial<MemoryConfigData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function MemoryStage({ data, onDataChange, onNext, onBack }: MemoryStageProps) {
  const memoryEntities = [
    "Customer Interactions",
    "Deal History",
    "Support Tickets",
    "Product Usage",
    "Communication Logs",
    "Team Actions",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configure Operational Memory</CardTitle>
          <CardDescription>
            What context should the AI remember during conversations?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Memory Entities */}
          <div className="space-y-4">
            <Label>What should be available to AI agents?</Label>
            <div className="space-y-2">
              {memoryEntities.map((entity) => (
                <div key={entity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mem-${entity}`}
                    checked={data.operationalMemory?.includes(entity) || false}
                    onCheckedChange={(checked) => {
                      const newMemory = checked
                        ? [...(data.operationalMemory || []), entity]
                        : (data.operationalMemory || []).filter((e) => e !== entity);
                      onDataChange({ ...data, operationalMemory: newMemory });
                    }}
                  />
                  <Label htmlFor={`mem-${entity}`} className="cursor-pointer">
                    {entity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Memory */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="historical"
              checked={data.historicalMemory || false}
              onCheckedChange={(checked) =>
                onDataChange({ ...data, historicalMemory: checked === true })
              }
            />
            <Label htmlFor="historical" className="cursor-pointer flex-1">
              <span className="font-medium">Enable historical context</span>
              <p className="text-sm text-muted-foreground">
                AI will consider past interactions and patterns
              </p>
            </Label>
          </div>

          {/* Caching Strategy */}
          <div className="space-y-2">
            <Label htmlFor="caching">Memory Caching Strategy</Label>
            <Select
              value={data.cachingStrategy || ""}
              onValueChange={(value) =>
                onDataChange({
                  ...data,
                  cachingStrategy: value as "aggressive" | "balanced" | "minimal",
                })
              }
            >
              <SelectTrigger id="caching">
                <SelectValue placeholder="Select caching strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aggressive">
                  Aggressive (Fast, more memory usage)
                </SelectItem>
                <SelectItem value="balanced">
                  Balanced (Recommended)
                </SelectItem>
                <SelectItem value="minimal">
                  Minimal (Lightweight, slower)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext} size="lg">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Governance Stage
interface GovernanceStageProps {
  data: Partial<GovernanceData>;
  onDataChange: (data: Partial<GovernanceData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GovernanceStage({
  data,
  onDataChange,
  onNext,
  onBack,
}: GovernanceStageProps) {
  const actions = [
    { id: "summarize", label: "Summarize data" },
    { id: "detect_risk", label: "Detect risk indicators" },
    { id: "recommend", label: "Recommend actions" },
  ];

  const restrictedActions = [
    { id: "send_communication", label: "Send customer communication" },
    { id: "update_crm", label: "Update CRM records" },
    { id: "change_health", label: "Change account health status" },
  ];

  const neverAutonomous = [
    { id: "delete_records", label: "Delete canonical records" },
    { id: "modify_governance", label: "Modify governance policy" },
    { id: "change_billing", label: "Change billing/pricing" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configure Governance</CardTitle>
          <CardDescription>
            Define what AI agents can and cannot do
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* AI Permissions */}
          <div className="space-y-4">
            <Label className="text-base">AI may autonomously:</Label>
            <div className="space-y-2">
              {actions.map((action) => (
                <div key={action.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={action.id}
                    checked={
                      action.id === "summarize"
                        ? data.aiCanSummarize || false
                        : action.id === "detect_risk"
                          ? data.aiCanDetectRisk || false
                          : data.aiCanRecommend || false
                    }
                    onCheckedChange={(checked) => {
                      if (action.id === "summarize") {
                        onDataChange({ ...data, aiCanSummarize: checked === true });
                      } else if (action.id === "detect_risk") {
                        onDataChange({ ...data, aiCanDetectRisk: checked === true });
                      } else if (action.id === "recommend") {
                        onDataChange({ ...data, aiCanRecommend: checked === true });
                      }
                    }}
                  />
                  <Label htmlFor={action.id} className="cursor-pointer">
                    {action.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Required */}
          <div className="space-y-4">
            <Label className="text-base">Approval required for:</Label>
            <div className="space-y-2">
              {restrictedActions.map((action) => (
                <div key={action.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={action.id}
                    checked={data.requireApprovalFor?.includes(action.id) || false}
                    onCheckedChange={(checked) => {
                      const newActions = checked
                        ? [...(data.requireApprovalFor || []), action.id]
                        : (data.requireApprovalFor || []).filter((a) => a !== action.id);
                      onDataChange({ ...data, requireApprovalFor: newActions });
                    }}
                  />
                  <Label htmlFor={action.id} className="cursor-pointer">
                    {action.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Never Autonomous */}
          <div className="space-y-4">
            <Label className="text-base">Never autonomous:</Label>
            <div className="space-y-2">
              {neverAutonomous.map((action) => (
                <div key={action.id} className="flex items-center space-x-2">
                  <Checkbox id={action.id} checked disabled />
                  <Label htmlFor={action.id} className="cursor-pointer text-muted-foreground">
                    {action.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext} size="lg">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// AI Policy Stage
interface AIPolicyStageProps {
  data: Partial<AIPolicyData>;
  onDataChange: (data: Partial<AIPolicyData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AIPolicyStage({ data, onDataChange, onNext, onBack }: AIPolicyStageProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configure AI Policy</CardTitle>
          <CardDescription>
            Set preferences for AI model behavior and data handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Model Preference */}
          <div className="space-y-4">
            <Label>Preferred AI Model</Label>
            <RadioGroup
              value={data.modelPreference || ""}
              onValueChange={(value) =>
                onDataChange({ ...data, modelPreference: value as "gpt4" | "claude" | "gemini" })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt4" id="gpt4" />
                  <Label htmlFor="gpt4" className="cursor-pointer">
                    GPT-4 (Most capable, higher cost)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="claude" id="claude" />
                  <Label htmlFor="claude" className="cursor-pointer">
                    Claude (Balanced performance)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gemini" id="gemini" />
                  <Label htmlFor="gemini" className="cursor-pointer">
                    Gemini (Cost-effective)
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Autonomy Level */}
          <div className="space-y-4">
            <Label>Autonomy Level</Label>
            <RadioGroup
              value={data.autonomyLevel || ""}
              onValueChange={(value) =>
                onDataChange({
                  ...data,
                  autonomyLevel: value as "suggestions_only" | "recommended" | "autonomous",
                })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggestions_only" id="suggestions_only" />
                  <Label htmlFor="suggestions_only" className="cursor-pointer">
                    Suggestions Only (Conservative)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recommended" id="recommended" />
                  <Label htmlFor="recommended" className="cursor-pointer">
                    Recommended (Balanced)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="autonomous" id="autonomous" />
                  <Label htmlFor="autonomous" className="cursor-pointer">
                    Autonomous (Maximum automation)
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Data Privacy */}
          <div className="space-y-4">
            <Label>Data Privacy Level</Label>
            <RadioGroup
              value={data.dataPrivacy || ""}
              onValueChange={(value) =>
                onDataChange({ ...data, dataPrivacy: value as "strict" | "balanced" | "permissive" })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="strict" id="strict" />
                  <Label htmlFor="strict" className="cursor-pointer">
                    Strict (Data never shared)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced" className="cursor-pointer">
                    Balanced (Standard privacy)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="permissive" id="permissive" />
                  <Label htmlFor="permissive" className="cursor-pointer">
                    Permissive (Optimize for features)
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext} size="lg">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
