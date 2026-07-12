"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Connector } from "@/lib/types/onboarding";
import { Search } from "lucide-react";

const mockConnectors: Connector[] = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    description: "Sync accounts, contacts, opportunities, and interactions",
    logo: "SF",
    authType: "oauth",
    status: "available",
    capabilities: ["Accounts", "Contacts", "Opportunities", "Activities"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    description: "Connect CRM, marketing automation, and sales data",
    logo: "HS",
    authType: "oauth",
    status: "available",
    capabilities: ["Contacts", "Deals", "Companies", "Pipelines"],
  },
  {
    id: "slack",
    name: "Slack",
    category: "communication",
    description: "Monitor conversations and send notifications",
    logo: "SK",
    authType: "oauth",
    status: "available",
    capabilities: ["Messages", "Channels", "Users", "Files"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "workflow",
    description: "Track repositories, issues, and pull requests",
    logo: "GH",
    authType: "oauth",
    status: "available",
    capabilities: ["Repos", "Issues", "PRs", "Commits"],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "support",
    description: "Manage tickets and customer support interactions",
    logo: "ZD",
    authType: "oauth",
    status: "available",
    capabilities: ["Tickets", "Users", "Interactions", "Surveys"],
  },
  {
    id: "notion",
    name: "Notion",
    category: "data",
    description: "Sync databases and documentation",
    logo: "NO",
    authType: "api_key",
    status: "available",
    capabilities: ["Databases", "Pages", "Templates"],
  },
  {
    id: "google_sheets",
    name: "Google Sheets",
    category: "data",
    description: "Connect spreadsheets and data sources",
    logo: "GS",
    authType: "oauth",
    status: "available",
    capabilities: ["Sheets", "Data", "Automation"],
  },
  {
    id: "snowflake",
    name: "Snowflake",
    category: "data",
    description: "Query data warehouse and analytics",
    logo: "SF",
    authType: "api_key",
    status: "coming_soon",
    capabilities: ["Warehouses", "Queries", "Data"],
  },
];

interface IntegrationStageProps {
  selectedConnectors: string[];
  onSelectConnector: (connectorId: string, selected: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function IntegrationStage({
  selectedConnectors,
  onSelectConnector,
  onNext,
  onBack,
  isLoading = false,
}: IntegrationStageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["crm", "communication", "support", "data", "workflow"];

  const filteredConnectors = mockConnectors.filter((connector) => {
    const matchesSearch =
      connector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || connector.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hasAtLeastOneSelected = selectedConnectors.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Connect your systems</CardTitle>
          <CardDescription>
            Select at least one connector to enable data flow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>

          {/* Connectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConnectors.map((connector) => (
              <div
                key={connector.id}
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  selectedConnectors.includes(connector.id)
                    ? "border-primary bg-accent"
                    : "hover:border-primary/50"
                }`}
                onClick={() =>
                  onSelectConnector(
                    connector.id,
                    !selectedConnectors.includes(connector.id)
                  )
                }
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={connector.id}
                    checked={selectedConnectors.includes(connector.id)}
                    disabled={connector.status === "coming_soon"}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center text-xs font-semibold">
                        {connector.logo}
                      </div>
                      <Label htmlFor={connector.id} className="font-semibold cursor-pointer">
                        {connector.name}
                      </Label>
                      {connector.status === "coming_soon" && (
                        <Badge variant="outline" className="text-xs">
                          Coming soon
                        </Badge>
                      )}
                      {connector.status === "beta" && (
                        <Badge variant="secondary" className="text-xs">
                          Beta
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {connector.description}
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {connector.capabilities.map((cap) => (
                        <Badge key={cap} variant="secondary" className="text-xs">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredConnectors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No connectors found matching your search
              </p>
            </div>
          )}

          {/* Selection Count */}
          <div className="bg-accent/50 p-3 rounded-lg">
            <p className="text-sm">
              <strong>{selectedConnectors.length}</strong> connector
              {selectedConnectors.length !== 1 ? "s" : ""} selected
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
              disabled={!hasAtLeastOneSelected || isLoading}
              size="lg"
            >
              {isLoading ? "Connecting..." : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
