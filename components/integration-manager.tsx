"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Connector, ConnectorConnection } from "@/lib/types/onboarding";
import { Search, Plus, Settings, Trash2, RefreshCw } from "lucide-react";

const mockConnectors: Connector[] = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    description: "Sync accounts, contacts, opportunities",
    logo: "SF",
    authType: "oauth",
    status: "available",
    capabilities: ["Accounts", "Contacts", "Opportunities"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    description: "Connect CRM and sales data",
    logo: "HS",
    authType: "oauth",
    status: "available",
    capabilities: ["Contacts", "Deals", "Companies"],
  },
  {
    id: "slack",
    name: "Slack",
    category: "communication",
    description: "Monitor conversations",
    logo: "SK",
    authType: "oauth",
    status: "available",
    capabilities: ["Messages", "Channels", "Users"],
  },
];

const mockConnections: ConnectorConnection[] = [
  {
    id: "conn_1",
    connectorId: "salesforce",
    workspaceId: "ws_1",
    status: "connected",
    connectedAt: new Date(),
    lastSyncAt: new Date(),
  },
  {
    id: "conn_2",
    connectorId: "slack",
    workspaceId: "ws_1",
    status: "connected",
    connectedAt: new Date(),
    lastSyncAt: new Date(),
  },
];

interface IntegrationManagerProps {
  workspaceId: string;
}

export function IntegrationManager({ workspaceId }: IntegrationManagerProps) {
  const [connections, setConnections] = useState<ConnectorConnection[]>(mockConnections);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("connected");

  const connectedIds = connections.map((c) => c.connectorId);
  const availableConnectors = mockConnectors.filter((c) => !connectedIds.includes(c.id));

  const handleConnect = (connector: Connector) => {
    setSelectedConnector(connector);
    setShowDialog(true);
  };

  const handleDisconnect = (connectionId: string) => {
    setConnections(connections.filter((c) => c.id !== connectionId));
  };

  const handleSync = (connectionId: string) => {
    setConnections(
      connections.map((c) =>
        c.id === connectionId
          ? { ...c, lastSyncAt: new Date() }
          : c
      )
    );
  };

  const filteredConnections = connections.filter((conn) => {
    const connector = mockConnectors.find((c) => c.id === conn.connectorId);
    return (
      connector?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector?.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredAvailable = availableConnectors.filter((conn) =>
    conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conn.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Integration Manager</h1>
        <p className="text-muted-foreground mt-1">
          Connect and manage your business systems
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="connected">
            Connected ({connections.length})
          </TabsTrigger>
          <TabsTrigger value="available">
            Available ({availableConnectors.length})
          </TabsTrigger>
        </TabsList>

        {/* Connected Tab */}
        <TabsContent value="connected" className="space-y-4 mt-4">
          {filteredConnections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredConnections.map((connection) => {
                const connector = mockConnectors.find(
                  (c) => c.id === connection.connectorId
                );
                if (!connector) return null;

                return (
                  <Card key={connection.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center text-xs font-semibold">
                            {connector.logo}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {connector.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {connector.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge>Connected</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Connected on{" "}
                          {connection.connectedAt?.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last sync:{" "}
                          {connection.lastSyncAt?.toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleSync(connection.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Sync
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDisconnect(connection.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No connected integrations
              </p>
            </div>
          )}
        </TabsContent>

        {/* Available Tab */}
        <TabsContent value="available" className="space-y-4 mt-4">
          {filteredAvailable.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAvailable.map((connector) => (
                <Card key={connector.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center text-xs font-semibold">
                          {connector.logo}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {connector.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {connector.description}
                          </CardDescription>
                        </div>
                      </div>
                      {connector.status === "beta" && (
                        <Badge variant="secondary">Beta</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {connector.capabilities.map((cap) => (
                        <Badge
                          key={cap}
                          variant="secondary"
                          className="text-xs"
                        >
                          {cap}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleConnect(connector)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No available integrations
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Connection Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {selectedConnector?.name}</DialogTitle>
            <DialogDescription>
              Authorize IntegrateWise to access your {selectedConnector?.name}{" "}
              account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">What we&apos;ll access:</p>
              <ul className="text-sm space-y-1">
                {selectedConnector?.capabilities.map((cap) => (
                  <li key={cap} className="text-muted-foreground">
                    • {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  if (selectedConnector) {
                    const newConnection: ConnectorConnection = {
                      id: `conn_${Date.now()}`,
                      connectorId: selectedConnector.id,
                      workspaceId,
                      status: "connected",
                      connectedAt: new Date(),
                      lastSyncAt: new Date(),
                    };
                    setConnections([...connections, newConnection]);
                    setShowDialog(false);
                  }
                }}
              >
                Authorize & Connect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
