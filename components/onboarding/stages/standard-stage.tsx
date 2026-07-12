"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WorkspaceType, WorkspaceSetupData } from "@/lib/types/onboarding";

const workspaceTypes: { value: WorkspaceType; label: string; description: string }[] = [
  { value: "account_success", label: "Account Success", description: "Focus on customer retention and health" },
  { value: "revenue_operations", label: "Revenue Operations", description: "Optimize sales and revenue flow" },
  { value: "business_operations", label: "Business Operations", description: "General business process management" },
  { value: "business_intelligence", label: "Business Intelligence", description: "Data analytics and reporting" },
  { value: "cross_functional", label: "Cross-Functional", description: "Multi-team collaboration" },
];

const companySizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

interface StandardStageProps {
  data: Partial<WorkspaceSetupData>;
  onDataChange: (data: Partial<WorkspaceSetupData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function StandardStage({
  data,
  onDataChange,
  onNext,
  onBack,
  isLoading = false,
}: StandardStageProps) {
  const isComplete =
    data.workspaceName &&
    data.companyName &&
    data.companySize &&
    data.workspaceType &&
    data.primaryUseCase;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Set up your workspace</CardTitle>
          <CardDescription>
            This helps us customize IntegrateWise for your team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Workspace and Company Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workspaceName">Workspace Name</Label>
              <Input
                id="workspaceName"
                placeholder="My Team Workspace"
                value={data.workspaceName || ""}
                onChange={(e) => onDataChange({ ...data, workspaceName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your Company"
                value={data.companyName || ""}
                onChange={(e) => onDataChange({ ...data, companyName: e.target.value })}
              />
            </div>
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select value={data.companySize || ""} onValueChange={(value) => onDataChange({ ...data, companySize: value })}>
              <SelectTrigger id="companySize">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size} employees
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Workspace Type Selection */}
          <div className="space-y-4">
            <Label>What are you setting up IntegrateWise for?</Label>
            <RadioGroup value={data.workspaceType || ""} onValueChange={(value) => onDataChange({ ...data, workspaceType: value as WorkspaceType })}>
              <div className="space-y-3">
                {workspaceTypes.map((type) => (
                  <div key={type.value} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition">
                    <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                    <Label htmlFor={type.value} className="flex flex-col cursor-pointer flex-1">
                      <span className="font-semibold">{type.label}</span>
                      <span className="text-sm text-muted-foreground">{type.description}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Primary Use Case */}
          <div className="space-y-2">
            <Label htmlFor="primaryUseCase">Primary Use Case</Label>
            <Input
              id="primaryUseCase"
              placeholder="e.g., Monitor customer health and prevent churn"
              value={data.primaryUseCase || ""}
              onChange={(e) => onDataChange({ ...data, primaryUseCase: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              What&apos;s your main goal for using IntegrateWise?
            </p>
          </div>

          {/* Industry (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry (Optional)</Label>
            <Input
              id="industry"
              placeholder="e.g., SaaS, Financial Services"
              value={data.industry || ""}
              onChange={(e) => onDataChange({ ...data, industry: e.target.value })}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext} disabled={!isComplete || isLoading} size="lg">
              {isLoading ? "Setting up..." : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
