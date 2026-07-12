// Onboarding Profile Types
export type OnboardingProfile = "basic" | "standard" | "comprehensive";

export type UserPersona =
  | "customer_success"
  | "sales"
  | "operations"
  | "leadership"
  | "engineering"
  | "other";

export type WorkspaceType =
  | "account_success"
  | "revenue_operations"
  | "business_operations"
  | "business_intelligence"
  | "cross_functional";

export type HydrationDepth =
  | "now"
  | "30_days"
  | "90_days"
  | "year"
  | "full_history";

// Onboarding Data Types
export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  persona: UserPersona;
  timezone: string;
  profileImage?: string;
}

export interface WorkspaceSetupData {
  workspaceName: string;
  companyName: string;
  companySize: string;
  workspaceType: WorkspaceType;
  primaryUseCase: string;
  industry?: string;
}

export interface DataScopeData {
  entities: string[];
  hydrationDepth: HydrationDepth;
  retentionPolicy: "90_days" | "1_year" | "unlimited";
}

export interface MemoryConfigData {
  operationalMemory: string[];
  historicalMemory: boolean;
  cachingStrategy: "aggressive" | "balanced" | "minimal";
}

export interface GovernanceData {
  aiCanSummarize: boolean;
  aiCanDetectRisk: boolean;
  aiCanRecommend: boolean;
  requireApprovalFor: string[];
  neverAutonomous: string[];
}

export interface AIPolicyData {
  modelPreference: "gpt4" | "claude" | "gemini";
  autonomyLevel: "suggestions_only" | "recommended" | "autonomous";
  dataPrivacy: "strict" | "balanced" | "permissive";
}

export interface OnboardingState {
  profile: OnboardingProfile;
  currentStage: number;
  userId?: string;
  userProfile?: UserProfileData;
  workspaceSetup?: WorkspaceSetupData;
  dataScope?: DataScopeData;
  memory?: MemoryConfigData;
  governance?: GovernanceData;
  aiPolicy?: AIPolicyData;
  connectedIntegrations?: string[];
  apiKey?: string;
  completedAt?: Date;
}

// Configuration Manager types
export interface WorkspaceConfiguration {
  workspaceId: string;
  workspaceName: string;
  workspaceType: WorkspaceType;
  personaMatrix: UserPersona[];
  defaultWorkbench: string;
  hydrationPolicy: HydrationDepth;
  dataScope: DataScopeData;
  governance: GovernanceData;
  aiPolicy: AIPolicyData;
  createdAt: Date;
  updatedAt: Date;
}

// Integration Manager types
export interface Connector {
  id: string;
  name: string;
  category: "crm" | "support" | "communication" | "data" | "workflow" | "other";
  description: string;
  logo: string;
  authType: "oauth" | "api_key" | "mcp";
  status: "available" | "beta" | "coming_soon";
  capabilities: string[];
}

export interface ConnectorConnection {
  id: string;
  connectorId: string;
  workspaceId: string;
  status: "pending" | "connected" | "error" | "disconnected";
  connectedAt?: Date;
  lastSyncAt?: Date;
  credential?: {
    type: "oauth" | "api_key" | "mcp";
    expiresAt?: Date;
  };
}
