# IntegrateWise v11.0 Canonical Specification

**Date:** 2026-01-20
**Version:** 11.0
**Status:** FINAL
**Branch:** `consolidation/monorepo-v11-features`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Module Definitions](#2-module-definitions)
3. [Responsibilities Matrix](#3-responsibilities-matrix)
4. [Data Flow Contracts](#4-data-flow-contracts)
5. [RBAC + Governance Hooks](#5-rbac--governance-hooks)
6. [Screen Mapping (5-Page Habitat)](#6-screen-mapping)
7. [Implementation Contracts](#7-implementation-contracts)

---

## 1. Executive Summary

### Core Operating Loop

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│    LOAD ──► NORMALIZE ──► THINK ──► ACT ──► LEARN ──► (repeat)         │
│      │          │           │        │        │                         │
│   Intake     SPINE       IQ Hub   Execute   Improve                    │
│   Triage     SSOT       Working   Workflow  Inputs                     │
│   Route      Schema     Memory    Output    Feedback                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### v11.0 Non-Negotiables

| Principle | Implementation |
|-----------|----------------|
| **Zero-friction onboarding** | OAuth connectors + file upload (no webhook config) |
| **Loader is control plane** | All intake, triage, routing through Loader module |
| **Slack is optional UI** | Never the intelligence center |
| **SPINE is SSOT** | Neon Postgres, never vector-only |
| **Proactive default** | Suggest → Draft → Confirm (autonomous optional) |
| **One Spine, Many Views** | Normalize once, render per role |

---

## 2. Module Definitions

### 2.1 LOADER MODULE

```
┌─────────────────────────────────────────────────────────────────────────┐
│  MODULE: LOADER                                                          │
│  Package: @integratewise/loader                                         │
│  Location: apps/integrationwise-os/lib/ai-loader/                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PURPOSE:                                                                │
│  First-class intake + triage + routing control plane                    │
│                                                                          │
│  BOUNDARIES:                                                             │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  ACCEPTS:                           OUTPUTS:                  │       │
│  │  ├── File uploads (any format)      ├── Tool-shaped JSON     │       │
│  │  ├── OAuth connector data           ├── Structured payloads  │       │
│  │  ├── Copy-paste tables              ├── Validation results   │       │
│  │  ├── Email forwards                 ├── Routing decisions    │       │
│  │  ├── Webhook events (advanced)      └── Normalize queue      │       │
│  │  └── AI Relay chat (controlled)                               │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                          │
│  SUBMODULES:                                                             │
│  ├── stage1-creamy.ts      # 60-second preview extraction               │
│  ├── stage2-full.ts        # Full background processing                 │
│  ├── identity-mapper.ts    # Deduplication + fuzzy matching             │
│  ├── file-parsers/         # PDF, DOCX, CSV, JSON, Email parsers        │
│  ├── connectors/           # OAuth + API connectors                     │
│  └── governance-engine.ts  # Permission + context enforcement           │
│                                                                          │
│  DOES NOT:                                                               │
│  ✗ Store data permanently (passes to Normalize)                         │
│  ✗ Execute workflows (passes to Act)                                    │
│  ✗ Make decisions (passes to Think)                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 NORMALIZE MODULE

```
┌─────────────────────────────────────────────────────────────────────────┐
│  MODULE: NORMALIZE (SPINE)                                               │
│  Package: @integratewise/spine                                          │
│  Location: packages/types/src/spine.ts + apps/*/lib/spine/              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PURPOSE:                                                                │
│  Convert tool-shaped JSON into ONE canonical internal schema            │
│                                                                          │
│  MOTTO:                                                                  │
│  "Normalize Once. Render Anywhere."                                     │
│                                                                          │
│  BOUNDARIES:                                                             │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  ACCEPTS:                           OUTPUTS:                  │       │
│  │  ├── hubspot_contact.json           ├── spine_contacts       │       │
│  │  ├── slack_message.json             ├── spine_conversations  │       │
│  │  ├── stripe_invoice.json            ├── spine_invoices       │       │
│  │  ├── gmail_thread.json              ├── spine_notes          │       │
│  │  └── (any tool-shaped JSON)         └── (canonical schemas)  │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                          │
│  CANONICAL SCHEMAS (10):                                                 │
│  ├── spine_accounts     # Companies/Organizations                       │
│  ├── spine_contacts     # People                                        │
│  ├── spine_deals        # Opportunities/Revenue                         │
│  ├── spine_tasks        # Action items                                  │
│  ├── spine_notes        # Freeform content                              │
│  ├── spine_conversations # Threads/Discussions                          │
│  ├── spine_events       # Calendar/Audit events                         │
│  ├── spine_plans        # OKRs/Initiatives                              │
│  ├── spine_invoices     # Payments/Billing                              │
│  └── spine_documents    # Files/Attachments                             │
│                                                                          │
│  EXECUTION:                                                              │
│  ├── n8n workflows (37 normalizers)                                     │
│  ├── Python transformers (complex mappings)                             │
│  └── Deterministic rules (versioned)                                    │
│                                                                          │
│  STORAGE:                                                                │
│  ✓ Neon Postgres = SPINE SSOT (primary)                                 │
│  ✓ pgvector = embeddings for recall (secondary, never SSOT)             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.3 THINK MODULE (IQ Hub)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  MODULE: THINK (IQ Hub)                                                  │
│  Package: @integratewise/iq-hub                                         │
│  Location: apps/integrationwise-os/lib/iq-hub/                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PURPOSE:                                                                │
│  Governed working memory + intelligence composition layer               │
│                                                                          │
│  BOUNDARIES:                                                             │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  ACCEPTS:                           OUTPUTS:                  │       │
│  │  ├── Loader inputs (structured)     ├── Insights             │       │
│  │  ├── AI Relay chat (controlled)     ├── Recommendations      │       │
│  │  ├── Connector events (streams)     ├── Summaries            │       │
│  │  └── SPINE references               ├── Decision support     │       │
│  │                                      └── Action suggestions   │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                          │
│  SUBMODULES:                                                             │
│  ├── memory/                                                             │
│  │   ├── session-memory.ts    # Transient (React + Redis)               │
│  │   ├── working-memory.ts    # 24h TTL (Redis)                         │
│  │   └── long-term-memory.ts  # Persistent (pgvector)                   │
│  ├── analysis/                                                           │
│  │   ├── pattern-detector.ts  # Find patterns in SPINE                  │
│  │   ├── insight-generator.ts # LLM-powered insights                    │
│  │   └── context-builder.ts   # Build context for AI                    │
│  └── ai-relay/                                                           │
│      ├── chat-handler.ts      # Controlled chat capture                 │
│      └── governance.ts        # Schema + permission enforcement         │
│                                                                          │
│  GOVERNANCE:                                                             │
│  ├── All writes governed by schema rules                                │
│  ├── Write permissions enforced per role                                │
│  ├── Trace links to origin records required                             │
│  └── IQ Hub composes; SPINE remains SSOT                                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.4 ACT MODULE (Brain Agent)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  MODULE: ACT (Brain Agent)                                               │
│  Package: @integratewise/brain-agent                                    │
│  Location: apps/integrationwise-os/lib/brain-agent/                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PURPOSE:                                                                │
│  Execute workflows with safety, governance, and audit                   │
│                                                                          │
│  TWO MODES:                                                              │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  MODE A: PROACTIVE (Default)                                     │    │
│  │  ─────────────────────────────                                   │    │
│  │  Flow: Suggest → Draft → Confirm → Execute                       │    │
│  │                                                                   │    │
│  │  Examples:                                                        │    │
│  │  ├── "Acme Corp inactive 45 days, renewal in 30. Schedule QBR?" │    │
│  │  ├── "Deal stuck 14 days in Proposal. Send follow-up email?"    │    │
│  │  └── "5 tasks overdue. Reprioritize based on impact?"           │    │
│  │                                                                   │    │
│  │  User Action: Click to approve or dismiss                        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  MODE B: AUTONOMOUS (Optional, explicit opt-in)                  │    │
│  │  ─────────────────────────────────────────────                   │    │
│  │  Flow: Event → Rule Match → Auto-Execute                         │    │
│  │                                                                   │    │
│  │  Requirements:                                                    │    │
│  │  ├── Explicitly enabled by user/org admin                        │    │
│  │  ├── Safe + reversible actions only                              │    │
│  │  ├── Defined scope and guardrails                                │    │
│  │  ├── Full audit log captured                                     │    │
│  │  └── Rate limits enforced                                        │    │
│  │                                                                   │    │
│  │  Examples:                                                        │    │
│  │  ├── Auto-create task when deal stage changes                    │    │
│  │  ├── Auto-send Slack notification on risk signal                 │    │
│  │  └── Auto-archive conversations older than 90 days               │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  POLICY GATE (Required for all actions):                                │
│  ├── Which tools are allowed?                                           │
│  ├── Which records can be edited?                                       │
│  ├── What execution type is permitted?                                  │
│  ├── Time windows and rate limits                                       │
│  └── Role-based permissions                                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.5 GOVERN MODULE

```
┌─────────────────────────────────────────────────────────────────────────┐
│  MODULE: GOVERN                                                          │
│  Package: @integratewise/governance                                     │
│  Location: apps/integrationwise-os/lib/governance/                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PURPOSE:                                                                │
│  Rules, permissions, audit trails, compliance                           │
│                                                                          │
│  SUBMODULES:                                                             │
│  ├── rbac/                                                               │
│  │   ├── roles.ts         # Role definitions                            │
│  │   ├── permissions.ts   # Permission matrix                           │
│  │   └── guards.ts        # Permission guards                           │
│  ├── audit/                                                              │
│  │   ├── logger.ts        # Audit event logging                         │
│  │   └── reporter.ts      # Compliance reports                          │
│  ├── policies/                                                           │
│  │   ├── data-policies.ts # Data retention, access                      │
│  │   └── action-policies.ts # Workflow constraints                      │
│  └── compliance/                                                         │
│      ├── soc2.ts          # SOC2 controls                               │
│      └── gdpr.ts          # GDPR compliance                             │
│                                                                          │
│  ENFORCEMENT POINTS:                                                     │
│  ├── Loader: Permission-aware context ownership                         │
│  ├── Normalize: Schema validation + audit                               │
│  ├── Think: Write permissions + trace links                             │
│  ├── Act: Policy gate before execution                                  │
│  └── Repeat: Retention policies                                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.6 CONNECTOR MODULE

```
┌─────────────────────────────────────────────────────────────────────────┐
│  MODULE: CONNECTORS                                                      │
│  Package: @integratewise/connectors                                     │
│  Location: apps/integrationwise-os/lib/connectors/                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PURPOSE:                                                                │
│  Zero-friction tool connections (connector-first UX)                    │
│                                                                          │
│  THREE TIERS:                                                            │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  TIER 1: OAuth Connector (Primary Default)                       │    │
│  │  ─────────────────────────────────────────                       │    │
│  │  UX: "Connect HubSpot" → OAuth flow → Done                       │    │
│  │                                                                   │    │
│  │  Tools:                                                           │    │
│  │  ├── Google (Gmail, Drive, Calendar, Sheets)                     │    │
│  │  ├── HubSpot / Salesforce / Pipedrive                            │    │
│  │  ├── Slack / Discord / Teams                                     │    │
│  │  ├── Notion / Linear / Jira / Asana                              │    │
│  │  ├── Stripe / QuickBooks / Xero                                  │    │
│  │  └── GitHub / GitLab                                             │    │
│  │                                                                   │    │
│  │  Implementation:                                                  │    │
│  │  └── OAuth2 + API polling for initial + incremental sync         │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  TIER 2: Import / Forwarding (First Session Value)               │    │
│  │  ─────────────────────────────────────────────                   │    │
│  │  UX: Upload file, paste table, forward email                     │    │
│  │                                                                   │    │
│  │  Methods:                                                         │    │
│  │  ├── File upload (CSV, Excel, JSON, PDF, ZIP)                    │    │
│  │  ├── Copy-paste tables                                           │    │
│  │  ├── Email forwarding to intake@{workspace}.integratewise.com    │    │
│  │  └── Drag-and-drop exports                                       │    │
│  │                                                                   │    │
│  │  Value: Works without integration setup                          │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  TIER 3: Webhook / API Key (Advanced)                            │    │
│  │  ─────────────────────────────────                               │    │
│  │  UX: Guided webhook wizard for power users                       │    │
│  │                                                                   │    │
│  │  Methods:                                                         │    │
│  │  ├── Custom JSON posting                                         │    │
│  │  ├── API key configuration                                       │    │
│  │  └── Bring-your-own-webhook                                      │    │
│  │                                                                   │    │
│  │  IMPORTANT: Never the default onboarding path                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Responsibilities Matrix

### Module → Action Mapping

| Action | LOADER | NORMALIZE | THINK | ACT | GOVERN |
|--------|--------|-----------|-------|-----|--------|
| Accept file upload | ✓ Primary | | | | |
| Accept OAuth data | ✓ Primary | | | | |
| Validate input | ✓ Primary | | | | |
| Route to processor | ✓ Primary | | | | |
| Transform schema | | ✓ Primary | | | |
| Deduplicate records | | ✓ Primary | | | |
| Write to SPINE | | ✓ Primary | | | |
| Generate embeddings | | ✓ Primary | | | |
| Build context | | | ✓ Primary | | |
| Generate insights | | | ✓ Primary | | |
| Compose recommendations | | | ✓ Primary | | |
| Execute workflows | | | | ✓ Primary | |
| Send notifications | | | | ✓ Primary | |
| Create records (action) | | | | ✓ Primary | |
| Enforce permissions | | | | | ✓ Primary |
| Audit logging | | | | | ✓ Primary |
| Policy enforcement | | | | | ✓ Primary |

### Hat → Module Mapping

| Hat | Primary Modules | Views |
|-----|-----------------|-------|
| **Visionary** | THINK, GOVERN | `/cockpit`, `/strategy`, `/iq-hub` |
| **Missionary** | LOADER, NORMALIZE, GOVERN | `/governance`, `/architecture`, `/data-flow`, `/integrations` |
| **Practitioner** | ACT (primarily) | `/today`, `/tasks`, `/[domain]/*` |
| **Passenger** | (view only) | `/metrics`, `/reports`, `/dashboards` |

---

## 4. Data Flow Contracts

### 4.1 Loader → Normalize Contract

```typescript
// Contract: LoaderToNormalizePayload
interface LoaderToNormalizePayload {
  // Routing
  workspaceId: string
  userId: string
  jobId: string  // Tracking ID

  // Source
  source: {
    type: 'file_upload' | 'oauth_connector' | 'webhook' | 'paste' | 'email_forward'
    tool: string  // 'hubspot', 'gmail', 'csv_upload', etc.
    toolAccountId?: string
  }

  // Payload (tool-shaped JSON)
  payload: {
    type: string  // 'contacts', 'deals', 'messages', etc.
    records: Array<{
      toolId: string  // ID in source tool
      data: Record<string, any>  // Tool-specific fields
      metadata: {
        createdAt?: string
        updatedAt?: string
        [key: string]: any
      }
    }>
  }

  // Governance
  governance: {
    extractedBy: string  // 'stage1' | 'stage2' | 'realtime'
    confidence: number  // 0-1
    requiresReview: boolean
  }
}
```

### 4.2 Normalize → SPINE Contract

```typescript
// Contract: SpineRecord (canonical)
interface SpineRecord {
  // Identity
  id: string  // UUID
  spineId: string  // SPN-{uuid}
  workspaceId: string

  // Type
  spineType: 'Account' | 'Contact' | 'Deal' | 'Task' | 'Note' | 'Conversation' | 'Event' | 'Plan'

  // Core data (type-specific)
  data: SpineAccountData | SpineContactData | SpineDealData | /* ... */

  // Source tracking
  source: {
    tool: string
    toolId: string
    syncedAt: string
  }

  // Identity mapping
  identity: {
    signature: string  // Hash for deduplication
    matchedFrom?: string  // If merged
    confidence: number
  }

  // Timestamps
  createdAt: string
  updatedAt: string
}
```

### 4.3 Think → Act Contract

```typescript
// Contract: ActionSuggestion
interface ActionSuggestion {
  id: string
  workspaceId: string
  userId: string

  // Suggestion
  type: 'opportunity' | 'risk' | 'action' | 'insight'
  title: string
  detail: string

  // Actions (user choices)
  actions: Array<{
    label: string  // "Schedule QBR"
    actionType: 'create_task' | 'send_notification' | 'update_record' | 'trigger_workflow'
    config: Record<string, any>  // Action-specific config
  }>

  // Context
  context: {
    relatedEntities: Array<{ type: string; id: string; name: string }>
    patternDetected: string
    dataPoints: Record<string, any>
  }

  // Scoring
  confidence: number  // 0-1
  priority: 'low' | 'medium' | 'high' | 'critical'

  // Lifecycle
  status: 'pending' | 'accepted' | 'dismissed' | 'expired'
  expiresAt: string
}
```

### 4.4 Act → Govern Contract

```typescript
// Contract: ActionExecution
interface ActionExecution {
  id: string
  workspaceId: string

  // Source
  triggeredBy: {
    type: 'suggestion' | 'rule' | 'user_action'
    sourceId: string  // suggestion_id or rule_id or user_id
  }

  // Action
  action: {
    type: string
    config: Record<string, any>
    targetEntities: Array<{ type: string; id: string }>
  }

  // Policy check (pre-execution)
  policyCheck: {
    passed: boolean
    checkedPolicies: string[]
    violations?: Array<{ policy: string; reason: string }>
  }

  // Result
  result: {
    status: 'success' | 'failed' | 'skipped' | 'pending_approval'
    outcome?: Record<string, any>
    error?: string
  }

  // Audit
  audit: {
    executedAt: string
    executedBy?: string  // User ID if manual
    autonomous: boolean
    auditLogId: string
  }
}
```

---

## 5. RBAC + Governance Hooks

### 5.1 Role Definitions

```typescript
// lib/rbac/roles.ts

export const ROLES = {
  owner: {
    name: 'Owner',
    hat: 'visionary',
    level: 100,
    description: 'Full control over workspace',
  },
  admin: {
    name: 'Admin',
    hat: 'missionary',
    level: 80,
    description: 'Manage settings, users, integrations',
  },
  manager: {
    name: 'Manager',
    hat: 'missionary',
    level: 60,
    description: 'Manage team and department resources',
  },
  member: {
    name: 'Member',
    hat: 'practitioner',
    level: 40,
    description: 'Full access to assigned department',
  },
  viewer: {
    name: 'Viewer',
    hat: 'passenger',
    level: 20,
    description: 'Read-only access',
  },
  guest: {
    name: 'Guest',
    hat: 'passenger',
    level: 10,
    description: 'Limited read-only access',
  },
} as const
```

### 5.2 Permission Matrix

```typescript
// lib/rbac/permissions.ts

export const PERMISSIONS = {
  // SPINE Operations
  'spine:read': ['owner', 'admin', 'manager', 'member', 'viewer'],
  'spine:create': ['owner', 'admin', 'manager', 'member'],
  'spine:update': ['owner', 'admin', 'manager', 'member'],
  'spine:delete': ['owner', 'admin'],

  // Loader Operations
  'loader:upload': ['owner', 'admin', 'manager', 'member'],
  'loader:connect': ['owner', 'admin'],
  'loader:disconnect': ['owner', 'admin'],

  // IQ Hub Operations
  'iq-hub:read': ['owner', 'admin', 'manager', 'member', 'viewer'],
  'iq-hub:create_insight': ['owner', 'admin', 'manager', 'member'],
  'iq-hub:chat': ['owner', 'admin', 'manager', 'member'],

  // Brain Agent Operations
  'brain-agent:view_suggestions': ['owner', 'admin', 'manager', 'member'],
  'brain-agent:execute_suggestion': ['owner', 'admin', 'manager', 'member'],
  'brain-agent:configure_rules': ['owner', 'admin'],
  'brain-agent:enable_autonomous': ['owner'],

  // Governance Operations
  'governance:view_audit': ['owner', 'admin'],
  'governance:manage_policies': ['owner', 'admin'],
  'governance:manage_roles': ['owner'],

  // Integration Operations
  'integrations:view': ['owner', 'admin', 'manager', 'member'],
  'integrations:manage': ['owner', 'admin'],

  // Settings
  'settings:view': ['owner', 'admin', 'manager', 'member'],
  'settings:manage': ['owner', 'admin'],
  'settings:billing': ['owner'],
} as const
```

### 5.3 Governance Hooks

```typescript
// lib/governance/hooks.ts

/**
 * Hook: Pre-Action Validation
 * Called before any action execution
 */
export async function preActionHook(
  action: ActionExecution,
  context: ExecutionContext
): Promise<{ allowed: boolean; reason?: string }> {
  // 1. Check role permissions
  const hasPermission = checkPermission(context.user, action.action.type)
  if (!hasPermission) {
    return { allowed: false, reason: 'Insufficient permissions' }
  }

  // 2. Check rate limits
  const withinLimits = await checkRateLimits(context.user, action.action.type)
  if (!withinLimits) {
    return { allowed: false, reason: 'Rate limit exceeded' }
  }

  // 3. Check target entity access
  const canAccess = await checkEntityAccess(
    context.user,
    action.action.targetEntities
  )
  if (!canAccess) {
    return { allowed: false, reason: 'Cannot access target entities' }
  }

  // 4. Check action-specific policies
  const passesPolicy = await checkActionPolicy(action)
  if (!passesPolicy.passed) {
    return { allowed: false, reason: passesPolicy.reason }
  }

  return { allowed: true }
}

/**
 * Hook: Post-Action Audit
 * Called after every action execution
 */
export async function postActionHook(
  action: ActionExecution,
  result: ActionResult,
  context: ExecutionContext
): Promise<void> {
  // 1. Log to audit trail
  await createAuditLog({
    workspaceId: action.workspaceId,
    userId: context.user.id,
    action: action.action.type,
    targetEntities: action.action.targetEntities,
    result: result.status,
    details: result.outcome,
    timestamp: new Date().toISOString(),
  })

  // 2. Emit governance event
  await emitGovernanceEvent({
    type: 'action.completed',
    action: action,
    result: result,
  })

  // 3. Check for compliance alerts
  await checkComplianceAlerts(action, result)
}

/**
 * Hook: Data Access Logging
 * Called on every SPINE read
 */
export async function dataAccessHook(
  query: SpineQuery,
  context: ExecutionContext
): Promise<void> {
  // Log sensitive data access
  if (query.includesSensitive) {
    await createAuditLog({
      workspaceId: context.workspaceId,
      userId: context.user.id,
      action: 'spine:read:sensitive',
      targetEntities: query.entities,
      timestamp: new Date().toISOString(),
    })
  }
}
```

---

## 6. Screen Mapping

### 6.1 Five-Page Habitat (Core Navigation)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    5-PAGE HABITAT (Always Available)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  1. TODAY (/today)                                               │    │
│  │     ─────────────────                                            │    │
│  │     Hat: ALL (personalized per role)                             │    │
│  │     Purpose: Daily command center                                │    │
│  │                                                                   │    │
│  │     Contents:                                                     │    │
│  │     ├── Brain Agent suggestion cards                             │    │
│  │     ├── Today's tasks (priority sorted)                          │    │
│  │     ├── Upcoming meetings                                        │    │
│  │     ├── Key metrics snapshot                                     │    │
│  │     └── Quick actions                                            │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  2. IQ HUB (/iq-hub)                                             │    │
│  │     ─────────────────                                            │    │
│  │     Hat: Visionary, Missionary, Practitioner                     │    │
│  │     Purpose: Governed working memory + AI                        │    │
│  │                                                                   │    │
│  │     Contents:                                                     │    │
│  │     ├── AI chat interface                                        │    │
│  │     ├── Recent insights                                          │    │
│  │     ├── Saved context                                            │    │
│  │     └── Knowledge search                                         │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  3. TASKS (/tasks)                                               │    │
│  │     ─────────────────                                            │    │
│  │     Hat: ALL                                                     │    │
│  │     Purpose: Work queue management                               │    │
│  │                                                                   │    │
│  │     Contents:                                                     │    │
│  │     ├── Task list (filterable by status, priority, domain)       │    │
│  │     ├── Quick add task                                           │    │
│  │     ├── Task detail panel                                        │    │
│  │     └── Bulk actions                                             │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  4. LOADER (/loader)                                             │    │
│  │     ─────────────────                                            │    │
│  │     Hat: Missionary, Practitioner                                │    │
│  │     Purpose: Data intake control                                 │    │
│  │                                                                   │    │
│  │     Contents:                                                     │    │
│  │     ├── File upload zone                                         │    │
│  │     ├── Connected integrations                                   │    │
│  │     ├── Processing queue                                         │    │
│  │     ├── Recent imports                                           │    │
│  │     └── Quick connect buttons                                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  5. SETTINGS (/settings)                                         │    │
│  │     ─────────────────                                            │    │
│  │     Hat: ALL (scoped by role)                                    │    │
│  │     Purpose: Configuration                                       │    │
│  │                                                                   │    │
│  │     Contents:                                                     │    │
│  │     ├── Profile settings                                         │    │
│  │     ├── Notification preferences                                 │    │
│  │     ├── Integration management (admin+)                          │    │
│  │     ├── Team management (manager+)                               │    │
│  │     └── Billing (owner only)                                     │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Owner Cockpit (Always Present)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    COCKPIT (Owner Always-Visible)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Route: /cockpit                                                        │
│  Hat: Visionary (Owner only)                                            │
│  Position: Always in sidebar (pinned at top)                            │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  LAYOUT:                                                         │    │
│  │                                                                   │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐  │    │
│  │  │   Revenue   │ │   Pipeline  │ │    Team     │ │   Health  │  │    │
│  │  │   $XXX,XXX  │ │   $X.XXM    │ │    XX/XX    │ │    XX%    │  │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘  │    │
│  │                                                                   │    │
│  │  ┌─────────────────────────────────────────────────────────────┐│    │
│  │  │  GOAL PROGRESS                                               ││    │
│  │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░ 65% to Q1 target     ││    │
│  │  └─────────────────────────────────────────────────────────────┘│    │
│  │                                                                   │    │
│  │  ┌─────────────────────────┐ ┌─────────────────────────────────┐│    │
│  │  │  BRAIN AGENT ALERTS     │ │  KEY DECISIONS PENDING          ││    │
│  │  │  • 3 high-risk accounts │ │  • Approve Q2 hiring plan       ││    │
│  │  │  • 5 deals need action  │ │  • Review pricing change        ││    │
│  │  │  • Revenue target at    │ │  • Sign off on roadmap          ││    │
│  │  │    risk if no action    │ │                                 ││    │
│  │  └─────────────────────────┘ └─────────────────────────────────┘│    │
│  │                                                                   │    │
│  │  ┌─────────────────────────────────────────────────────────────┐│    │
│  │  │  DEPARTMENT HEALTH                                           ││    │
│  │  │  Sales: ██████████ 95%  |  CS: ████████░░ 78%               ││    │
│  │  │  Eng:   █████████░ 89%  |  Mkt: ███████░░░ 72%              ││    │
│  │  └─────────────────────────────────────────────────────────────┘│    │
│  │                                                                   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  QUICK ACTIONS:                                                         │
│  ├── "Ask IQ Hub" → Opens AI chat with business context                 │
│  ├── "View All Risks" → Jumps to risk register                          │
│  └── "Schedule Review" → Creates meeting with leadership                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 CS-First Unlock (Initial Domain)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CS-FIRST UNLOCK STRATEGY                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  RATIONALE:                                                              │
│  Customer Success is the first complete domain because:                 │
│  ├── Clear data model (Accounts, Contacts, Health Scores)               │
│  ├── Immediate value (risk detection, renewal tracking)                 │
│  ├── Template for other domains (pattern reuse)                         │
│  └── Revenue protection focus (aligns with business goals)              │
│                                                                          │
│  CS ROUTES:                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  /cs                        # CS Dashboard                       │    │
│  │  /cs/accounts               # Account portfolio                  │    │
│  │  /cs/accounts/[id]          # Account detail                     │    │
│  │  /cs/contacts               # Stakeholder management             │    │
│  │  /cs/meetings               # QBR calendar                       │    │
│  │  /cs/risks                  # Risk register                      │    │
│  │  /cs/renewals               # Renewal pipeline                   │    │
│  │  /cs/health                 # Health dashboard                   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  CS COMPONENTS (from Account Success Hub):                              │
│  ├── ExecutiveSummary.tsx      # Portfolio overview                     │
│  ├── HealthGauge.tsx           # Health score visualization             │
│  ├── ProgressRing.tsx          # Metric rings                           │
│  ├── KanbanBoard.tsx           # Account stages                         │
│  ├── RenewalTimeline.tsx       # Upcoming renewals                      │
│  ├── RiskRadar.tsx             # Risk visualization                     │
│  └── AccountTeam.tsx           # Team assignments                       │
│                                                                          │
│  REUSABILITY MAP:                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Component      │ CS View   │ Sales   │ Marketing │ PM View     │    │
│  │  ─────────────────────────────────────────────────────────────  │    │
│  │  ProgressRing   │ Health    │ Deal %  │ Campaign  │ Adoption    │    │
│  │  HealthGauge    │ Account   │ Pipeline│ ROI       │ Feature     │    │
│  │  KanbanBoard    │ Tasks     │ Stages  │ Status    │ Roadmap     │    │
│  │  Timeline       │ Renewals  │ Cycle   │ Launch    │ Release     │    │
│  │  RiskRadar      │ Accounts  │ Deals   │ Campaigns │ Features    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Complete Route Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE ROUTE MAP (v11.0)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ALWAYS VISIBLE (All Roles):                                            │
│  ├── /today                    # Daily command center                   │
│  ├── /iq-hub                   # Working memory + AI                    │
│  ├── /tasks                    # Work queue                             │
│  ├── /loader                   # Data intake                            │
│  └── /settings                 # Configuration                          │
│                                                                          │
│  VISIONARY ROUTES (owner):                                              │
│  ├── /cockpit                  # Business OS dashboard (PINNED)         │
│  ├── /strategy                 # OKRs, goals, roadmap                   │
│  └── /metrics                  # Company-wide metrics                   │
│                                                                          │
│  MISSIONARY ROUTES (admin, manager):                                    │
│  ├── /governance               # Rules, permissions, compliance         │
│  ├── /architecture             # System design                          │
│  ├── /data-flow                # Data pipelines                         │
│  ├── /release-control          # Deployments                            │
│  ├── /integrations             # Tool connections                       │
│  └── /admin/*                  # User/team management                   │
│                                                                          │
│  PRACTITIONER ROUTES (member):                                          │
│  ├── /cs/*                     # Customer Success (CS-FIRST)            │
│  ├── /sales/*                  # Sales (NEXT)                           │
│  ├── /marketing/*              # Marketing                              │
│  ├── /projects/*               # Project Management                     │
│  ├── /finance/*                # Finance                                │
│  └── /practitioners/[domain]   # 13 domain views                        │
│                                                                          │
│  PASSENGER ROUTES (viewer, guest):                                      │
│  ├── /dashboards               # Read-only dashboards                   │
│  └── /reports                  # Generated reports                      │
│                                                                          │
│  ONBOARDING ROUTES:                                                      │
│  ├── /onboarding               # Entry point                            │
│  ├── /onboarding/persona-analysis  # Hat detection                      │
│  ├── /onboarding/load-data     # Loader introduction                    │
│  └── /onboarding/processing    # Processing view                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Contracts

### 7.1 First Session Value Contract

```typescript
/**
 * First Session Value: User sees meaningful data within 60 seconds
 *
 * Flow:
 * 1. User signs up
 * 2. Persona analysis (30 seconds) → Determine Hat
 * 3. Load Data prompt → File upload OR Gmail connect
 * 4. Stage 1 Creamy processing (60 seconds)
 * 5. Redirect to /today with preview data
 */

interface FirstSessionContract {
  // Must complete within
  maxTimeToValue: 60_000  // 60 seconds

  // Entry paths (in order of preference)
  entryPaths: [
    'oauth_connect',    // Best: Google/Gmail one-click
    'file_upload',      // Good: CSV, Excel, JSON
    'copy_paste',       // Fallback: Paste table
  ]

  // Minimum data to show
  minimumOutput: {
    entities: 5,        // At least 5 entities extracted
    confidence: 0.7,    // At least 70% confidence
    preview: true,      // Show in Today view
  }

  // Success metrics
  metrics: {
    timeToFirstEntity: 'measure',
    entitiesExtracted: 'count',
    userEngagement: 'track',
  }
}
```

### 7.2 SPINE Immutability Contract

```typescript
/**
 * SPINE SSOT Contract: SPINE is the single source of truth
 *
 * Rules:
 * 1. All canonical data lives in spine_* tables
 * 2. Embeddings are secondary (for search/recall only)
 * 3. All updates go through Normalize module
 * 4. All reads reference SPINE (not cache)
 */

interface SpineContract {
  // Primary storage
  storage: 'neon_postgres'

  // Tables
  tables: [
    'spine_accounts',
    'spine_contacts',
    'spine_deals',
    'spine_tasks',
    'spine_notes',
    'spine_conversations',
    'spine_events',
    'spine_plans',
    'spine_invoices',
    'spine_documents',
  ]

  // Secondary (never SSOT)
  secondary: {
    embeddings: 'pgvector',     // For search only
    cache: 'redis',             // For performance only
  }

  // Write rules
  writeRules: {
    allWritesThrough: 'normalize_module',
    noDirectWrites: true,
    auditRequired: true,
  }
}
```

### 7.3 Governance Contract

```typescript
/**
 * Governance Contract: All actions are audited and permissioned
 */

interface GovernanceContract {
  // Every action must pass
  preExecutionChecks: [
    'permission_check',
    'rate_limit_check',
    'entity_access_check',
    'policy_compliance_check',
  ]

  // Every action must log
  postExecutionAudit: {
    required: true,
    fields: [
      'action_type',
      'actor_id',
      'target_entities',
      'result',
      'timestamp',
    ]
  }

  // Retention
  auditRetention: '7_years'

  // Compliance
  compliance: ['SOC2', 'GDPR']
}
```

---

## Summary

### v11.0 Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         IntegrateWise v11.0                             │
│                                                                          │
│  ┌─────────┐   ┌───────────┐   ┌───────┐   ┌─────┐   ┌────────┐        │
│  │  LOAD   │──▶│ NORMALIZE │──▶│ THINK │──▶│ ACT │──▶│ GOVERN │        │
│  │         │   │  (SPINE)  │   │(IQ Hub│   │     │   │        │        │
│  │ Loader  │   │           │   │       │   │Brain│   │        │        │
│  │ Module  │   │ 10 Tables │   │Memory │   │Agent│   │ RBAC   │        │
│  └─────────┘   └───────────┘   └───────┘   └─────┘   └────────┘        │
│       │             │              │           │          │             │
│       └─────────────┴──────────────┴───────────┴──────────┘             │
│                                │                                         │
│                         ┌──────▼──────┐                                 │
│                         │    SPINE    │                                 │
│                         │    SSOT     │                                 │
│                         │ (Neon PG)   │                                 │
│                         └─────────────┘                                 │
│                                                                          │
│  Connectors: OAuth (primary) → Import (fallback) → Webhook (advanced)  │
│  Default: Proactive (suggest → confirm)                                 │
│  Optional: Autonomous (event → auto-execute)                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Deliverables

| Deliverable | Location | Status |
|-------------|----------|--------|
| Module Definitions | Section 2 | Complete |
| Responsibilities Matrix | Section 3 | Complete |
| Data Flow Contracts | Section 4 | Complete |
| RBAC + Governance | Section 5 | Complete |
| Screen Mapping | Section 6 | Complete |
| Implementation Contracts | Section 7 | Complete |

---

*Generated: 2026-01-20*
*Version: 11.0 FINAL*
*Ready for Notion paste*
