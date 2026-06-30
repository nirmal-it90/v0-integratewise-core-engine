# INTEGRATEWISE REPOSITORY STRUCTURE MAP
## Complete File & Folder Organization

**Version:** 1.0
**Last Updated:** 2026-01-15
**Repository:** integratewise-ai-workspace (PRIMARY) + integrationwise-os (LEGACY)

---

## DECISION: PRIMARY REPOSITORY

**Use:** `/Users/nirmal/Github/13.1/integratewise-ai-workspace` as primary codebase

**Reason:**
- 47% more complete (92 pages vs 43 pages)
- All foundation infrastructure exists
- Brainstorming layer implemented
- TAM schema complete
- AI Loader implemented

**Action:** Migrate any custom changes from integrationwise-os → integratewise-ai-workspace

---

## ROOT STRUCTURE

```
integratewise-ai-workspace/
├── apps/
│   ├── integrationwise-os/          # Main OS application (Next.js)
│   ├── hub-frontend-app/             # Hub documentation site
│   ├── integratewise-core-engine/    # Core engine (placeholder)
│   └── integratewise-webhooks/       # Cloudflare Workers webhooks
├── packages/                         # Shared packages (monorepo)
├── scripts/                          # SQL migrations
├── docs/                             # Documentation
├── config/                           # Configuration files
├── .github/                          # GitHub Actions
├── package.json                      # Turborepo config
├── pnpm-workspace.yaml               # pnpm workspaces
├── turbo.json                        # Turbo build config
└── README.md                         # Main readme
```

---

## APPS/INTEGRATIONWISE-OS (Main Application)

### 🟢 EXISTING - Foundation Layer

```
apps/integrationwise-os/
├── app/                              # Next.js App Router
│   ├── (app)/                        # Main app layout group
│   │   ├── dashboard/page.tsx        ✅ Dashboard
│   │   ├── insights/page.tsx         ✅ AI Insights
│   │   ├── command-center/page.tsx   ✅ Command Center
│   │   └── loader/page.tsx           ✅ AI Loader
│   │
│   ├── (personal)/                   # Personal OS Lens
│   │   ├── home/page.tsx             ✅ Personal Home
│   │   ├── goals/page.tsx            ✅ Goals Tracking
│   │   ├── today/page.tsx            ✅ Daily View
│   │   └── knowledge/page.tsx        ✅ Personal Knowledge
│   │
│   ├── (business)/                   # Business OS Lens
│   │   ├── metrics/page.tsx          ✅ Business Metrics
│   │   ├── clients/page.tsx          ✅ Client List
│   │   └── projects/page.tsx         ✅ Projects
│   │
│   ├── (cs)/                         # Customer Success Lens
│   │   ├── tam/page.tsx              ✅ TAM Dashboard
│   │   ├── accounts/page.tsx         ✅ Account Health
│   │   ├── risks/page.tsx            ✅ Risk Detection
│   │   └── war-room/page.tsx         ✅ Red Account War Room
│   │
│   ├── brainstorming/page.tsx        ✅ Brainstorming Hub
│   ├── leads/page.tsx                ✅ Leads Management
│   ├── tasks/page.tsx                ✅ Task Management
│   ├── content/page.tsx              ✅ Content Library
│   ├── website/page.tsx              ✅ Website Manager
│   ├── integrations/page.tsx         ✅ Integrations
│   ├── data-sources/page.tsx         ✅ Data Sources
│   └── settings/page.tsx             ✅ Settings
│
├── api/                              # API Routes
│   ├── brainstorm/
│   │   ├── analyze/route.ts          ✅ AI Analysis
│   │   ├── execute/route.ts          ✅ Auto-execution
│   │   └── daily-insights/route.ts   ✅ Daily insights cron
│   │
│   ├── loader/
│   │   ├── stage1/route.ts           ✅ 60-second preview
│   │   ├── stage2/route.ts           ✅ Full extraction
│   │   └── generate-schema/route.ts  ✅ Schema discovery
│   │
│   ├── neutron/
│   │   ├── ingest/route.ts           ✅ Browser activity capture
│   │   └── promote/route.ts          ✅ Promote to knowledge
│   │
│   ├── cs/
│   │   └── health-score/route.ts     ✅ Health scoring
│   │
│   ├── webhooks/
│   │   ├── slack/route.ts            ✅ Slack webhook
│   │   ├── discord/route.ts          ✅ Discord webhook
│   │   ├── hubspot/route.ts          ✅ HubSpot webhook
│   │   ├── asana/route.ts            ✅ Asana webhook
│   │   ├── brainstorm/route.ts       ✅ Brainstorm webhook
│   │   └── [provider]/route.ts       ✅ Generic webhook handler
│   │
│   └── cron/
│       ├── hourly-insights/route.ts  ✅ Hourly insights
│       └── daily-insights/route.ts   ✅ Daily insights
│
├── components/
│   ├── views/                        # View Components
│   │   ├── brainstorming-view.tsx    ✅ Brainstorming UI
│   │   ├── loader-view.tsx           ✅ AI Loader UI
│   │   ├── insights-view.tsx         ✅ Insights dashboard
│   │   ├── website-manager-view.tsx  ✅ Website manager
│   │   ├── leads-view.tsx            ✅ Leads
│   │   ├── content-library-view.tsx  ✅ Content
│   │   ├── clients-view.tsx          ✅ Clients
│   │   ├── tasks-view.tsx            ✅ Tasks
│   │   └── [22 more views]           ✅
│   │
│   ├── loader/                       # Loader Components
│   │   ├── creamy-preview.tsx        ✅ Stage 1 preview
│   │   └── template-byot.tsx         ✅ BYOT templates
│   │
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx                ✅
│   │   ├── card.tsx                  ✅
│   │   ├── dialog.tsx                ✅
│   │   └── [40+ UI components]       ✅
│   │
│   ├── sidebar.tsx                   ✅ Main sidebar
│   ├── command-center.tsx            ✅ Command palette
│   └── tam-command-center.tsx        ✅ TAM command center
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 ✅ Client-side Supabase
│   │   ├── server.ts                 ✅ Server-side Supabase
│   │   └── middleware.ts             ✅ Auth middleware
│   │
│   ├── cs/
│   │   └── health-score.ts           ✅ Health scoring logic
│   │
│   ├── ai-loader/
│   │   ├── stage1-creamy.ts          ✅ Stage 1 processor
│   │   └── stage2-extraction.ts      ✅ Stage 2 processor
│   │
│   ├── types/
│   │   ├── ssot.ts                   ✅ SSOT types
│   │   └── task.ts                   ✅ Task types
│   │
│   ├── hooks/
│   │   ├── use-brainstorm.ts         ✅ Brainstorm hooks
│   │   └── use-insights.ts           ✅ Insights hooks
│   │
│   └── utils.ts                      ✅ Utility functions
│
├── supabase/
│   └── migrations/                   # Database migrations
│       ├── 20260106_spine.sql        ✅ Spine tables
│       ├── 20260110_byot_tables.sql  ✅ BYOT tables
│       ├── 20260112_ai_loader_schema.sql ✅ Loader tables
│       ├── 20260113_phase3_tables.sql ✅ Phase 3 tables
│       └── 20260113_support_requests.sql ✅ Support tables
│
└── scripts/                          # Additional SQL scripts
    ├── create-tam-schema-v1.sql      ✅ TAM schema
    ├── create-technical-success-schema.sql ✅ Tech success
    └── seed-tam-demo-data-v1.sql     ✅ Demo data
```

---

### 🔴 MISSING - Operational Loop (Phase 2)

```
apps/integrationwise-os/
├── app/api/
│   ├── ai-relay/                     ❌ AI-Relay Gateway
│   │   ├── webhook/route.ts          ❌ Main webhook receiver
│   │   ├── auth/route.ts             ❌ Auth verification
│   │   └── audit/route.ts            ❌ Audit log
│   │
│   ├── triage/                       ❌ Slack Triage Bot
│   │   ├── detect/route.ts           ❌ Triage detection
│   │   ├── route/route.ts            ❌ Workflow routing
│   │   └── memory-pack/route.ts      ❌ Memory pack prep
│   │
│   ├── brainstorm/
│   │   ├── memory-pack/route.ts      ❌ Memory pack generation
│   │   ├── query/route.ts            ❌ Query working memory
│   │   └── promote/route.ts          ❌ Promote to Spine
│   │
│   ├── slack/                        ❌ Slack Commands
│   │   ├── commands/route.ts         ❌ Slash command handler
│   │   └── actions/route.ts          ❌ Interactive actions
│   │
│   └── vectors/                      ❌ PGVector APIs
│       ├── embed/route.ts            ❌ Generate embeddings
│       ├── search/route.ts           ❌ Similarity search
│       └── deduplicate/route.ts      ❌ Find duplicates
│
├── lib/
│   ├── triage/                       ❌ Triage Logic
│   │   ├── detector.ts               ❌ Signal detection
│   │   ├── classifier.ts             ❌ Intent classification
│   │   └── router.ts                 ❌ Workflow routing
│   │
│   ├── ai-relay/                     ❌ AI-Relay Logic
│   │   ├── normalizer.ts             ❌ Payload normalization
│   │   ├── audit.ts                  ❌ Audit trail
│   │   └── policy.ts                 ❌ Policy enforcement
│   │
│   └── vectors/                      ❌ Vector Operations
│       ├── embeddings.ts             ❌ OpenAI embeddings
│       └── similarity.ts             ❌ Similarity search
│
└── components/
    ├── triage/                       ❌ Triage UI Components
    │   ├── triage-dashboard.tsx      ❌
    │   └── routing-config.tsx        ❌
    │
    └── memory/                       ❌ Memory Pack Components
        ├── memory-pack-card.tsx      ❌
        └── context-panel.tsx         ❌
```

---

### 🔴 MISSING - CSM Orchestrator (Phase 3)

```
apps/integrationwise-os/
├── app/api/
│   ├── cs/
│   │   ├── workflows/                ❌ Workflow Automation
│   │   │   ├── route.ts              ❌ CRUD workflows
│   │   │   ├── [id]/execute/route.ts ❌ Manual trigger
│   │   │   └── [id]/toggle/route.ts  ❌ Enable/disable
│   │   │
│   │   ├── intelligence/             ❌ CS Intelligence
│   │   │   ├── snapshot/route.ts     ❌ Daily snapshot
│   │   │   ├── alerts/route.ts       ❌ Universal alerts
│   │   │   └── account/[id]/route.ts ❌ Account intelligence
│   │   │
│   │   ├── templates/                ❌ Template System
│   │   │   ├── route.ts              ❌ CRUD templates
│   │   │   └── render/route.ts       ❌ Render with variables
│   │   │
│   │   └── bulk/                     ❌ Bulk Operations
│   │       ├── operations/route.ts   ❌ Initiate bulk op
│   │       └── status/[id]/route.ts  ❌ Check status
│   │
├── lib/
│   ├── cs/
│   │   ├── workflows.ts              ❌ Workflow engine
│   │   ├── templates.ts              ❌ Template renderer
│   │   └── bulk-ops.ts               ❌ Bulk operations
│   │
└── components/
    └── cs/                           ❌ CS Components
        ├── workflow-builder.tsx      ❌ Workflow builder
        ├── cs-intelligence-widget.tsx ❌ Intelligence widget
        ├── universal-alerts-feed.tsx ❌ Alerts feed
        ├── account-health-card.tsx   ❌ Health card
        └── template-library.tsx      ❌ Template library
```

---

### 🔴 MISSING - Brain Agents (Phase 4)

```
apps/integrationwise-os/
├── app/api/
│   └── brain/                        ❌ Brain Agents
│       ├── context/route.ts          ❌ Context Agent
│       ├── templates/route.ts        ❌ Template Agent
│       ├── strategy/route.ts         ❌ Strategy Agent
│       ├── learning/route.ts         ❌ Learning Agent
│       └── query-back/route.ts       ❌ Combined query API
│
├── lib/
│   └── brain/                        ❌ Brain Agent Logic
│       ├── context-agent.ts          ❌
│       ├── template-agent.ts         ❌
│       ├── strategy-agent.ts         ❌
│       └── learning-agent.ts         ❌
│
└── components/
    └── brain/                        ❌ Brain Agent UI
        ├── agent-dashboard.tsx       ❌
        ├── context-panel.tsx         ❌
        └── learning-metrics.tsx      ❌
```

---

### 🔴 MISSING - Auto-Learning (Phase 5)

```
apps/integrationwise-os/
├── app/api/
│   └── auto-learning/                ❌ Auto-Learning
│       ├── feedback/route.ts         ❌ Submit feedback
│       ├── patches/route.ts          ❌ View/deploy patches
│       └── metrics/route.ts          ❌ Learning metrics
│
├── lib/
│   └── auto-learning/                ❌ Auto-Learning Logic
│       ├── edge-detector.ts          ❌
│       ├── rule-patcher.ts           ❌
│       └── test-generator.ts         ❌
│
└── components/
    └── auto-learning/                ❌ Auto-Learning UI
        └── learning-dashboard.tsx    ❌
```

---

## SCRIPTS/ (SQL Migrations)

### 🟢 EXISTING

```
scripts/
├── 005-neon-neutron-tam-tables.sql   ✅ Neutron + TAM tables
├── 006-spend-insights-tables.sql     ✅ Spend insights
├── 007-byom-byot-tables.sql          ✅ BYOM/BYOT
├── 007-complete-rls-policies.sql     ✅ RLS policies
└── 008-ha-dr-tables.sql              ✅ HA/DR tables
```

### 🔴 MISSING

```
scripts/
├── 009-ai-relay-tables.sql           ❌ AI-Relay infrastructure
├── 010-triage-tables.sql             ❌ Triage + routing
├── 011-pgvector-setup.sql            ❌ PGVector extension
├── 012-brain-agents-tables.sql       ❌ Brain agents
├── 013-csm-orchestrator-tables.sql   ❌ CSM workflows
├── 014-auto-learning-tables.sql      ❌ Auto-learning
└── 015-memory-pack-tables.sql        ❌ Memory packs
```

---

## DOCS/ (Documentation)

### 🟢 EXISTING

```
docs/
├── runbooks/
│   └── incidents.md                  ✅ Incident runbook
├── ACTIVE_WEBHOOK_SYSTEM.md          ✅ Webhook docs
├── BRAINSTORMING_LAYER_ARCHITECTURE.md ✅ Brainstorm docs
├── AI_INSIGHTS_AND_LOADER_STATUS.md  ✅ AI Loader docs
├── MULTI_AGENT_EXECUTION_COMPLETE.md ✅ Multi-agent docs
└── THREE_LENS_IMPLEMENTATION_PLAN.md ✅ Three lens docs
```

### 🔴 MISSING

```
docs/
├── AI_RELAY_SETUP.md                 ❌ AI-Relay setup guide
├── SLACK_TRIAGE_BOT_GUIDE.md         ❌ Triage bot guide
├── MEMORY_PACK_FORMAT.md             ❌ Memory pack spec
├── BRAIN_AGENTS_GUIDE.md             ❌ Brain agents guide
└── CSM_ORCHESTRATOR_PLAYBOOK.md      ❌ CSM playbook
```

---

## CONFIG/ (Configuration)

### 🟢 EXISTING

```
config/
└── landing.json                      ✅ Landing page config
```

### 🔴 MISSING

```
config/
├── triage-rules.json                 ❌ Triage classification rules
├── workflow-templates.json           ❌ Workflow templates
├── cs-templates.json                 ❌ CS email/meeting templates
└── ai-relay-providers.json           ❌ AI provider configs
```

---

## COMPLETION SUMMARY

### Overall Completion: 47%

**By Layer:**
- ✅ Foundation (Spine): 90% Complete
- ✅ ONE CLICK LOADER: 80% Complete
- ✅ Brainstorming Layer: 70% Complete
- ✅ Health Score Engine: 100% Complete
- ❌ AI-Relay Gateway: 0% Complete
- ❌ Slack Triage Bot: 0% Complete
- ❌ PGVector: 0% Complete
- ❌ CSM Orchestrator Workflows: 0% Complete
- ❌ CS Intelligence Distribution: 0% Complete
- ❌ Brain Agents: 0% Complete
- ❌ Auto-Learning: 0% Complete

### Pages Implemented: 92/180 (51%)

**Existing:** 92 pages across Personal/Business/CS lenses
**Missing:** 88 pages for new features (triage, brain agents, workflows)

### API Routes: 30/75 (40%)

**Existing:** 30 routes (brainstorm, loader, webhooks, health score)
**Missing:** 45 routes (ai-relay, triage, brain, cs orchestrator)

### Database Tables: 57/85 (67%)

**Existing:** 57 tables (spine, TAM, loader, brainstorm)
**Missing:** 28 tables (ai-relay, triage, vectors, workflows, brain agents)

---

## MIGRATION STRATEGY

### Step 1: Consolidate Repositories ✅
- **Primary:** `/Users/nirmal/Github/13.1/integratewise-ai-workspace`
- **Legacy:** `/Users/nirmal/Github/integrationwise-os`
- **Action:** Copy custom changes from legacy → primary

### Step 2: Add Missing Infrastructure (Phase 2) ← **CURRENT**
- AI-Relay Gateway
- Slack Triage Bot
- PGVector setup
- Memory pack generation

### Step 3: Complete CSM Orchestrator (Phase 3)
- Workflow automation
- CS intelligence distribution
- Template library

### Step 4: Build Brain Agents (Phase 4)
- Context/Template/Strategy/Learning agents
- Query-back API

### Step 5: Auto-Learning (Phase 5)
- Edge condition detection
- Rule patches

---

## FILE NAMING CONVENTIONS

**Components:**
- Views: `*-view.tsx` (e.g., `brainstorming-view.tsx`)
- UI: `*.tsx` (e.g., `button.tsx`)
- Specialized: `*-command-center.tsx`, `*-dashboard.tsx`

**API Routes:**
- Next.js convention: `route.ts` in folder structure
- Example: `app/api/brain/context/route.ts`

**Database:**
- Migrations: `YYYYMMDD_description.sql`
- Scripts: `NNN-description.sql` (numbered)

**Documentation:**
- Guides: `*_GUIDE.md`
- Architecture: `*_ARCHITECTURE.md`
- Status: `*_STATUS.md`

---

## ENVIRONMENT VARIABLES

### 🟢 EXISTING (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_URL=
```

### 🔴 MISSING

```bash
# OpenAI (for embeddings + brain agents)
OPENAI_API_KEY=

# Slack
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
SLACK_APP_ID=

# n8n Integration
N8N_API_URL=https://n8n.integratewise.online
N8N_API_KEY=

# AI-Relay
AI_RELAY_SIGNING_SECRET=
```

---

## EXTERNAL INTEGRATIONS

### 🟢 ACTIVE

- **Supabase:** Database + Auth + Storage
- **Stripe:** Billing + Subscriptions
- **Vercel:** Hosting + Cron jobs
- **Webhook Providers:** Slack, Discord, HubSpot, Asana

### 🔴 NEEDED

- **OpenAI API:** GPT-4o + ada-002 embeddings
- **Slack API:** Bot + Events + Commands
- **n8n:** Workflow automation (n8n.integratewise.online)

---

## NEXT STEPS

1. ✅ Architecture defined
2. ✅ Repository structure mapped
3. ⏳ **Create SQL migration scripts (009-015)**
4. ⏳ **Set up n8n workflows for AI-Relay**
5. ⏳ **Implement Slack Triage Bot**
6. ⏳ **Enable PGVector in Supabase**
7. ⏳ **Build Brain Agents**

---

**END OF REPOSITORY STRUCTURE MAP**

**Primary Repository:**
`/Users/nirmal/Github/13.1/integratewise-ai-workspace`

**Legacy Repository:**
`/Users/nirmal/Github/integrationwise-os`

**n8n Instance:**
`https://n8n.integratewise.online` (Active, requires API key)
