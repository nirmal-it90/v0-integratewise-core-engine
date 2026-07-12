# IntegrateWise Frontend Onboarding & Integration System

## Overview

This build implements a complete frontend-only onboarding system with three progressive activation profiles and post-onboarding management UIs for integrations and configuration.

## Architecture

### 1. Core Types & Schemas (`lib/types/onboarding.ts`)
- **OnboardingProfile**: "basic" | "standard" | "comprehensive"
- **OnboardingState**: Complete state container with user profile, workspace setup, integrations, data scope, memory, governance, and AI policy
- **Configuration Manager Types**: WorkspaceConfiguration for persisting workspace settings
- **Integration Manager Types**: Connector and ConnectorConnection for managing system integrations

### 2. Three Progressive Onboarding Flows

#### Basic Onboarding (2-3 minutes)
- **Route**: `/onboarding?profile=basic`
- **Stage**: User Profile Collection
- **Components**: `BasicStage`
- **Collects**: First name, last name, email, job title, persona, timezone
- **Output**: UserProfileData → Identity Contract

#### Standard Onboarding (5-7 minutes) - **DEFAULT**
- **Route**: `/onboarding?profile=standard`
- **Stages**: 
  1. User Profile (same as Basic)
  2. Workspace Setup
- **Components**: `BasicStage`, `StandardStage`
- **Collects**: User profile + workspace name, company name, company size, workspace type, primary use case
- **Output**: UserProfileData + WorkspaceSetupData → Configuration Manager
- **Result**: Workspace immediately activated, ready for use

#### Comprehensive Onboarding (15-20 minutes) - **Admin Wizard**
- **Route**: `/onboarding?profile=comprehensive`
- **Stages**:
  1. User Profile
  2. Workspace Setup
  3. Integrations
  4. Data Scope
  5. Memory Configuration
  6. Governance
  7. AI Policy
  8. Review & Activate
- **Components**: `BasicStage`, `StandardStage`, `IntegrationStage`, `DataScopeStage`, `MemoryStage`, `GovernanceStage`, `AIPolicyStage`, `OnboardingCompletionReview`
- **Collects**: Full operational configuration
- **Output**: Complete workspace configuration with integrations, data hydration policy, memory settings, governance rules, and AI autonomy levels

### 3. Onboarding Components

#### `OnboardingOrchestrator` (`components/onboarding/onboarding-orchestrator.tsx`)
- Central state management for all onboarding flows
- Routes stages based on selected profile
- Persists progress to localStorage
- Manages state transitions and stage progression
- Auto-generates API key on completion
- Calls onComplete callback with final OnboardingState

#### `OnboardingProgress` (`components/onboarding/onboarding-progress.tsx`)
- Progress indicator showing current stage and completion percentage
- Displays stage name and profile type
- Visual feedback with progress bar

#### `OnboardingProfileSelector` (`components/onboarding/onboarding-profile-selector.tsx`)
- Entry point for onboarding at `/onboarding/select`
- Three profile cards with features, duration, and CTA buttons
- Recommends Standard profile as default
- Routes to `/onboarding?profile={profile}` on selection

#### `OnboardingCompletionReview` (`components/onboarding/onboarding-completion-review.tsx`)
- Final review page in Comprehensive flow
- Shows all configured settings organized by section
- Displays generated API key
- Option to edit settings before activation

### 4. Stage Components

#### Basic Stage
- Collects identity information
- Persona selection (Customer Success, Sales, Operations, Leadership, Engineering, Other)
- Timezone selection (16 major timezones)

#### Standard Stage
- Workspace name, company name, company size
- Workspace type selection with descriptions
- Primary use case input
- Optional industry field

#### Integration Stage
- Browse available connectors (8 mock connectors: Salesforce, HubSpot, Slack, GitHub, Zendesk, Notion, Google Sheets, Snowflake)
- Filter by category (CRM, Communication, Support, Data, Workflow)
- Search functionality
- Multi-select with at-least-one-required validation
- Status badges (Available, Beta, Coming Soon)
- Capability tags for each connector

#### Data Scope Stage
- Entity selection (Accounts, Contacts, Opportunities, Tickets, Conversations, Documents, Projects, Tasks)
- Hydration depth selection (Now, 30 days, 90 days, 1 year, Full history)
- Retention policy (90 days, 1 year, Unlimited)

#### Memory Stage
- Operational memory entity selection (Customer Interactions, Deal History, Support Tickets, Product Usage, Communication Logs, Team Actions)
- Historical context toggle
- Caching strategy (Aggressive, Balanced, Minimal)

#### Governance Stage
- AI autonomous capabilities toggles (Summarize, Detect Risk, Recommend)
- Approval-required actions selection (Send communication, Update CRM, Change account health)
- Never-autonomous actions (Delete records, Modify governance, Change billing)

#### AI Policy Stage
- Model preference (GPT-4, Claude, Gemini)
- Autonomy level (Suggestions only, Recommended, Autonomous)
- Data privacy level (Strict, Balanced, Permissive)

### 5. Post-Onboarding Management UIs

#### Integration Manager (`components/integration-manager.tsx`)
- **Route**: `/integrations/manager`
- **Features**:
  - View connected integrations
  - Browse available connectors
  - Search and filter integrations
  - Connect new integrations with OAuth/API key flow
  - Sync connected systems
  - Disconnect integrations
  - Settings and configuration per connector
  - Connection status display
  - Last sync timestamp

#### Configuration Manager (`components/configuration-manager.tsx`)
- **Route**: `/configuration`
- **Tabs**:
  1. **Data & Hydration**: Configure hydration depth and retention policies
  2. **Governance**: Manage AI autonomous capabilities
  3. **AI Policy**: Update model preferences and autonomy levels
  4. **Team Personas**: View configured personas
- **Status Cards**: Workspace status, workspace type, autonomy level
- **Change Tracking**: Dirty state tracking and save button
- **Real-time Updates**: Mock save functionality with localStorage persistence

### 6. Pages & Routes

```
/onboarding/select          - Profile selector entry point
/onboarding                 - Main onboarding flow (with ?profile=param)
/integrations/manager       - Integration Manager
/configuration              - Configuration Manager
```

### 7. UI Components Used

- Button, Input, Label, Select, Card, CardContent, CardDescription, CardHeader, CardTitle
- Checkbox, RadioGroup, RadioGroupItem, Badge, Tabs, TabsContent, TabsList, TabsTrigger
- Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle
- Switch
- Lucide Icons (Search, Plus, Settings, Trash2, RefreshCw, CheckCircle2, AlertCircle)

### 8. State Management

**Storage**: LocalStorage (`onboarding-{profile}` key)
- Persists at each stage progression
- Allows resuming interrupted onboarding
- Survives browser refresh

**Provided Capabilities**:
- Auto-generated API key on completion (mock: `key_${random}`)
- Complete configuration object for backend persistence
- Ready for integration with workspace provisioning system

### 9. Data Flow

```
User Selection
  ↓
Onboarding Profile Selected
  ↓
Stage-by-Stage Configuration
  ↓
State Persisted to localStorage
  ↓
Completion with API Key Generation
  ↓
OnboardingState passed to onComplete callback
  ↓
Progressive Setup Available: Integrations Manager, Configuration Manager
```

## No Backend Implementation

This build is **frontend-only**:
- Uses localStorage for state persistence
- Mock connectors and connections
- Mock API key generation
- Console.log for debugging
- No actual OAuth flows or API calls
- No database operations
- Ready for backend integration

## Styling

All components use the existing shadcn/ui component library with the current color theme (indigo primary with light/dark mode support).

## Next Steps for Full Integration

1. **Authentication**: Connect to Supabase Auth or Clerk
2. **Database**: Persist OnboardingState and WorkspaceConfiguration to database
3. **Integration Manager Backend**: Implement OAuth flows and credential encryption
4. **API Key Management**: Generate and hash API keys server-side
5. **Middleware**: Protect authenticated routes
6. **Webhook Handlers**: Process OAuth callbacks
7. **Configuration Sync**: Load/save workspace configuration from database
8. **Progressive Setup UI**: Enable post-onboarding setup flows
