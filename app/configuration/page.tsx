"use client";

import { ConfigurationManager } from "@/components/configuration-manager";

export default function ConfigurationPage() {
  // Mock workspace ID - in real app would come from session/auth
  const workspaceId = "ws_default";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <ConfigurationManager workspaceId={workspaceId} />
      </div>
    </div>
  );
}
