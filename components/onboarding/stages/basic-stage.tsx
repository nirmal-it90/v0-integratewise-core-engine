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
import { UserPersona, UserProfileData } from "@/lib/types/onboarding";

const personas: { value: UserPersona; label: string }[] = [
  { value: "customer_success", label: "Customer Success" },
  { value: "sales", label: "Sales / Revenue Operations" },
  { value: "operations", label: "Operations" },
  { value: "leadership", label: "Leadership" },
  { value: "engineering", label: "Engineering" },
  { value: "other", label: "Other" },
];

const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Australia/Sydney",
];

interface BasicStageProps {
  data: Partial<UserProfileData>;
  onDataChange: (data: Partial<UserProfileData>) => void;
  onNext: () => void;
  isLoading?: boolean;
}

export function BasicStage({ data, onDataChange, onNext, isLoading = false }: BasicStageProps) {
  const isComplete =
    data.firstName &&
    data.lastName &&
    data.email &&
    data.jobTitle &&
    data.persona &&
    data.timezone;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to IntegrateWise</CardTitle>
          <CardDescription>
            Let&apos;s start with your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={data.firstName || ""}
                onChange={(e) => onDataChange({ ...data, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={data.lastName || ""}
                onChange={(e) => onDataChange({ ...data, lastName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={data.email || ""}
              onChange={(e) => onDataChange({ ...data, email: e.target.value })}
            />
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g., Customer Success Manager"
              value={data.jobTitle || ""}
              onChange={(e) => onDataChange({ ...data, jobTitle: e.target.value })}
            />
          </div>

          {/* Persona */}
          <div className="space-y-2">
            <Label htmlFor="persona">Your Role / Function</Label>
            <Select value={data.persona || ""} onValueChange={(value) => onDataChange({ ...data, persona: value as UserPersona })}>
              <SelectTrigger id="persona">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {personas.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={data.timezone || ""} onValueChange={(value) => onDataChange({ ...data, timezone: value })}>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Next Button */}
          <Button
            onClick={onNext}
            disabled={!isComplete || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Creating account..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
