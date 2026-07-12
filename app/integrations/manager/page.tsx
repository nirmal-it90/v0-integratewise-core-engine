"use client";

import { IntegrationManager } from "@/components/integration-manager";

export default function IntegrationManagerPage() {
  // Mock workspace ID - in real app would come from session/auth
  const workspaceId = "ws_default";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <IntegrationManager workspaceId={workspaceId} />
      </div>
    </div>
  );
}
