# INTEGRATEWISE — COMPLETE ARCHITECTURE
## Organizational Intelligence Infrastructure for the AI Era

**Version:** 2.0
**Last Updated:** 2026-01-15
**Status:** Implementation Blueprint

---

## THE ONE-LINE THESIS

**IntegrateWise is organizational intelligence infrastructure that eliminates the CS Team Paradox and closes the GenAI Divide by unifying tool data and AI conversations into a single source of truth.**

---

## THE TWO ORGANIZATIONAL CRISES

### Crisis 1: The CS Team Paradox
**Problem:** Companies hire CS teams to do what software should do.

- **Root Cause:** Tool silos → Data fragmentation → Broken infrastructure
- **Symptom:** CS teams spend 70% time on data plumbing, 30% on customers
- **Economic Impact:** $1.05M/year wasted on manual work (15 CSMs @ $100K)

### Crisis 2: The GenAI Divide
**Problem:** Organizations fragmenting into AI-empowered and AI-excluded workers.

- **Root Cause:** No AI knowledge capture → Knowledge evaporation → Broken distribution
- **Symptom:** Only AI users benefit; others fall behind; organizational fragmentation
- **Economic Impact:** 80% of AI value lost to chat history; massive opportunity cost

---

## THE ARCHITECTURAL SOLUTION

```
┌─────────────────────────────────────────────────────────────────────┐
│                      INTEGRATEWISE ARCHITECTURE                      │
│               Organizational Intelligence Infrastructure              │
└─────────────────────────────────────────────────────────────────────┘

                           ┌──────────────┐
                           │   INPUTS     │
                           └──────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  ONE CLICK      │    │  SLACK APP       │    │  AI-RELAY       │
│  LOADER         │    │  (Triage Center) │    │  GATEWAY        │
│                 │    │                  │    │                 │
│ Tool Data       │    │ Human Convos     │    │ AI Chats        │
│ Normalization   │    │ + Commands       │    │ + Agents        │
└────────┬────────┘    └────────┬─────────┘    └────────┬────────┘
         │                      │                        │
         │              ┌───────┴────────┐              │
         │              ▼                │              │
         │     ┌────────────────┐        │              │
         │     │ SLACK TRIAGE   │        │              │
         │     │ BOT            │        │              │
         │     │                │        │              │
         │     │ • Detect       │        │              │
         │     │ • Classify     │        │              │
         │     │ • Route        │        │              │
         │     └────────┬───────┘        │              │
         │              │                │              │
         │              └────────────────┼──────────────┘
         │                               ▼
         │                     ┌──────────────────┐
         └────────────────────▶│  BRAINSTORM      │◀──────────────┐
                               │  LAYER           │               │
                               │                  │               │
                               │ Working Memory / │               │
                               │ IQ Hub           │               │
                               │                  │               │
                               │ • Capture        │               │
                               │ • Extract        │               │
                               │ • Link           │               │
                               │ • Serve          │               │
                               └────────┬─────────┘               │
                                        │                         │
                                        ▼                         │
                               ┌──────────────────┐               │
                               │  THE SPINE       │               │
                               │  (SSOT)          │               │
                               │                  │               │
                               │ • Canonical Data │               │
                               │ • Relationships  │               │
                               │ • Audit Log      │               │
                               │ • Permissions    │               │
                               └────────┬─────────┘               │
                                        │                         │
                ┌───────────────────────┴──────────────────┐      │
                ▼                                          ▼      │
    ┌──────────────────────┐                  ┌──────────────────────┐
    │  CSM ORCHESTRATOR    │                  │  BRAIN AGENTS        │
    │                      │                  │                      │
    │ • Health Scoring     │                  │ • Context Agent      │
    │ • Risk Detection     │                  │ • Template Agent     │
    │ • Workflows          │                  │ • Strategy Agent     │
    │ • Escalations        │                  │ • Learning Agent     │
    └──────────┬───────────┘                  └──────────┬───────────┘
               │                                         │
               ▼                                         ▼
    SOLVES CS PARADOX                          SOLVES GENAI DIVIDE
               │                                         │
               └─────────────────┬─────────────────────┘
                                 │
                                 ▼
                      ┌──────────────────┐
                      │  AUTO-LEARNING   │
                      │  AGENT           │
                      │                  │
                      │ Edge Conditions  │
                      │ Continuous       │──────────────────────┘
                      │ Improvement      │
                      └──────────────────┘
```

---

## LAYER 1: THE SPINE (SSOT)

### Purpose
Unified data foundation with multi-department architecture

### Components

**Database:** PostgreSQL (Supabase)

**Tables (57+):**
- **Core:** `clients`, `workspaces`, `users`, `organizations`
- **Content:** `documents`, `content_library`, `knowledge_base`
- **Workflow:** `tasks`, `activities`, `campaigns`, `deals`, `leads`
- **Memory:** `brainstorm_sessions`, `brainstorm_insights`, `brainstorm_vectors`
- **CS:** `tam_accounts`, `tam_environments`, `tam_apis`, `health_scores`, `escalations`
- **Data Sync:** `input_sources`, `creamy_extracts`, `extraction_jobs`, `webhooks`

**Status:** ✅ 90% Complete

**Missing:**
- Workflow automation tables
- Brain agents tables
- PGVector embeddings

---

## LAYER 2: INPUT SYSTEMS

### 2.1 ONE CLICK LOADER

**Purpose:** Normalize tool data into The Spine

**Features:**
- Stage 1: 60-second preview
- Stage 2: Full extraction
- Auto schema discovery
- BYOT rendering (planned)

**Status:** ✅ 80% Complete

**API Routes:**
- `/api/loader/stage1`
- `/api/loader/stage2`
- `/api/loader/generate-schema`

**Missing:** BYOT Template Engine

---

### 2.2 SLACK APP (Triage Center)

**Purpose:** Capture human conversations and provide organizational memory access via Slack

**Features:**
- Message capture (channels, DMs, threads)
- Slash commands
- Message shortcuts
- Memory pack delivery

**Components:**
- Slack Bot OAuth integration
- Event subscriptions
- Interactive components

**API Routes:**
- `/api/webhooks/slack` - Main webhook receiver
- `/api/slack/commands` - Slash command handler
- `/api/slack/actions` - Interactive message handler

**Status:** ✅ 70% Complete (webhook exists, needs triage logic)

**Missing:**
- Triage signal detection
- Intent classification
- Memory pack preparation
- Slash command handlers

---

### 2.3 AI-RELAY GATEWAY

**Purpose:** Single entry/exit for all AI agent messages and AI chat captures

**Features:**
- Standardize payload format across AI tools
- Auth verification and policy enforcement
- Rate limiting
- Immutable audit trail
- Forward to Brainstorming pipeline

**Supported AI Tools:**
- Claude (Anthropic)
- ChatGPT (OpenAI)
- Gemini (Google)
- Perplexity
- Slack AI
- Custom agents

**API Routes:**
- `/api/webhooks/ai-relay` - Main AI conversation receiver
- `/api/ai-relay/auth` - Auth verification
- `/api/ai-relay/audit` - Audit log retrieval

**Status:** ❌ 0% Complete

**Database Tables Needed:**
```sql
-- AI Relay Events
CREATE TABLE ai_relay_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  ai_provider TEXT NOT NULL, -- 'claude', 'chatgpt', 'gemini', etc.
  conversation_id TEXT,
  raw_payload JSONB NOT NULL,
  normalized_payload JSONB,
  processed BOOLEAN DEFAULT false,
  routed_to_slack BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## LAYER 3: SLACK TRIAGE BOT

### Purpose
Orchestrates triage, routing, and pre-conversation readiness

### Functions

**1. Triage Detection**
- Support escalations
- Renewal risks
- Deal blockers
- Product issues
- Strategic decisions

**2. Routing**
- CS workflows
- Sales workflows
- Engineering workflows
- Leadership workflows

**3. Pre-Conversation Memory**
- Before meetings: Prepare memory packs
- Before Slack replies: Surface context
- Before renewals: Assemble account intelligence

### Architecture

```typescript
// Triage decision tree
interface TriageDecision {
  signal: 'support' | 'risk' | 'escalation' | 'renewal' | 'product' | 'decision'
  confidence: number
  domain: 'cs' | 'sales' | 'ops' | 'personal'
  routing: {
    workflow: string
    assignee?: string
    priority: 'low' | 'medium' | 'high' | 'critical'
  }
}
```

**API Routes:**
- `/api/triage/detect` - Triage signal detection
- `/api/triage/route` - Workflow routing
- `/api/triage/memory-pack` - Pre-conversation memory preparation

**Status:** ❌ 0% Complete

**Database Tables Needed:**
```sql
-- Triage Events
CREATE TABLE triage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type TEXT NOT NULL, -- 'slack', 'ai_relay', 'manual'
  source_id TEXT NOT NULL,
  signal_type TEXT NOT NULL,
  confidence NUMERIC(5,4),
  domain TEXT,
  routing_decision JSONB,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Triage Log
CREATE TABLE slack_triage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES triage_events(id),
  duplicate_found BOOLEAN DEFAULT false,
  similarity_score NUMERIC(5,4),
  duplicate_of_session_id UUID REFERENCES brainstorm_sessions(id),
  classified_type TEXT,
  action_taken TEXT,
  processed_at TIMESTAMPTZ DEFAULT now()
);
```

---

## LAYER 4: BRAINSTORMING LAYER (Working Memory / IQ Hub)

### Purpose
Captures, structures, and serves short-to-mid term working memory

### Explicit Non-Replacement Note
**IQ Hub / Brainstorming Layer does NOT replace the Spine. It stages and operationalizes memory, then promotes verified outputs into the Spine (SSOT).**

### Functions

**1. Capture**
- Slack conversations
- AI chat exports
- Agent outputs
- Manual notes

**2. Extract**
- Decisions
- Tasks
- Risks
- Learnings
- Templates
- Frameworks

**3. Link**
- Entity resolution (client, deal, account, project)
- Relationship mapping
- Lineage tracking

**4. Serve**
- Queryable memory for humans
- Pre-conversation context
- Memory packs

**5. Promote**
- Validated knowledge → Spine
- Maintain lineage

### Database Tables

**Existing:**
- `brainstorm_sessions` - Raw conversation capture
- `brainstorm_insights` - Extracted actions

**Needed:**
- `brainstorm_vectors` - Embeddings for similarity search
- `brainstorm_links` - Entity relationships
- `memory_packs` - Pre-prepared context bundles

**API Routes:**
- ✅ `/api/brainstorm/analyze` - AI analysis
- ✅ `/api/brainstorm/execute` - Auto-execution
- ✅ `/api/brainstorm/daily-insights` - Cron job
- ❌ `/api/brainstorm/memory-pack` - Memory pack generation
- ❌ `/api/brainstorm/query` - Query working memory
- ❌ `/api/brainstorm/promote` - Promote to Spine

**Status:** ✅ 70% Complete

**Missing:**
- Vector embeddings (PGVector)
- Entity linking
- Memory pack generation
- Query-back API
- Promotion workflows

---

## LAYER 5: CSM ORCHESTRATOR (CS Paradox Solution)

### Purpose
Automate CS tasks; make CS intelligence universal

### Components

#### 5.1 Health Score Engine ✅
**Status:** Complete

**Features:**
- Technical score (architecture, performance)
- Adoption score (active users, features)
- Engagement score (NPS, support tickets)
- Risk detection (payment, usage drop, support spike)

**API:** `/api/cs/health-score`

#### 5.2 Automated Workflows ❌
**Status:** Missing

**Features:**
- Trigger detection (health score drops, renewals approaching)
- Action execution (create tasks, escalations, send emails)
- Workflow builder UI

**Database Tables Needed:**
```sql
CREATE TABLE csm_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  trigger_type TEXT,
  trigger_conditions JSONB,
  actions JSONB,
  enabled BOOLEAN DEFAULT true,
  execution_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 5.3 CS Intelligence Distribution ❌
**Status:** Missing

**Features:**
- Daily CS snapshots
- Universal alerts (visible to everyone, not just CS)
- Account health cards (embeddable)

**Database Tables Needed:**
```sql
CREATE TABLE cs_intelligence_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date DATE NOT NULL UNIQUE,
  total_accounts INTEGER,
  green_accounts INTEGER,
  amber_accounts INTEGER,
  red_accounts INTEGER,
  avg_health_score NUMERIC(5,2),
  top_insights JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cs_universal_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT,
  severity TEXT,
  title TEXT NOT NULL,
  description TEXT,
  workspace_id UUID,
  visible_to TEXT DEFAULT 'everyone',
  dismissed_by UUID[],
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 5.4 CSM Productivity Tools ❌
**Status:** Missing

**Features:**
- Template library (emails, meeting agendas, ATHR reports)
- Bulk operations
- Automated reporting

---

## LAYER 6: BRAIN AGENTS (GenAI Divide Solution)

### Purpose
Democratize AI intelligence; surface past thinking to everyone

### Agents

#### 6.1 Context Agent ❌
**Purpose:** Surface past AI thinking relevant to current question

**Input:** User query
**Output:** Top 5 most relevant past brainstorm sessions

**Algorithm:**
```typescript
1. Generate embedding for query (OpenAI ada-002)
2. Vector similarity search (pgvector)
3. Return past thinking with similarity scores
```

#### 6.2 Template Agent ❌
**Purpose:** Generate templates based on past brainstorm sessions

**Input:** User query
**Output:** AI-generated template

**Algorithm:**
```typescript
1. Find similar past sessions (via Context Agent)
2. Use GPT-4o to generate template from patterns
3. Store for reuse
```

#### 6.3 Strategy Agent ❌
**Purpose:** Share frameworks discovered in AI conversations

**Input:** User query
**Output:** Relevant frameworks and playbooks

**Algorithm:**
```typescript
1. Search for framework-type sessions
2. Vector similarity search
3. Return applicable frameworks
```

#### 6.4 Learning Agent ❌
**Purpose:** Identify patterns across brainstorm sessions

**Input:** All brainstorm sessions
**Output:** Identified patterns, edge conditions

**Algorithm:**
```typescript
1. Get all sessions for user/org
2. Use GPT-4o to identify:
   - Recurring themes
   - Common decision patterns
   - Edge conditions
   - Success patterns
3. Store learning patterns
4. Improve triage and extraction over time
```

### Database Tables Needed

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Brainstorm Vectors
CREATE TABLE brainstorm_vectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID REFERENCES brainstorm_sessions(id) ON DELETE CASCADE,
  embedding vector(1536), -- OpenAI ada-002
  content_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Vector similarity index
CREATE INDEX ON brainstorm_vectors USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Learning Patterns
CREATE TABLE learning_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_type TEXT NOT NULL,
  pattern_rule JSONB NOT NULL,
  confidence NUMERIC(5,4) DEFAULT 0.5000,
  usage_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'testing',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Brain Agent Contexts
CREATE TABLE brain_agent_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  query TEXT NOT NULL,
  context_agent_results JSONB,
  template_agent_results JSONB,
  strategy_agent_results JSONB,
  learning_agent_results JSONB,
  surfaced_at TIMESTAMPTZ DEFAULT now()
);
```

**API Routes:**
- `/api/brain/context` - Context Agent
- `/api/brain/templates` - Template Agent
- `/api/brain/strategy` - Strategy Agent
- `/api/brain/learning` - Learning Agent
- `/api/brain/query-back` - Combined query-back API

**Status:** ❌ 0% Complete

---

## LAYER 7: AUTO-LEARNING AGENT

### Purpose
Continuously improve extraction, routing, normalization, and triage quality

### Functions

**1. Edge Condition Detection**
- Schema drift in external tools
- Ambiguous entity matches
- Noisy conversation threads
- Failed extractions

**2. Learning from Feedback**
- User corrections
- Approval/denial patterns
- Confidence calibration

**3. Rule Updates**
- Deploy prompt patches
- Update triage heuristics
- Improve routing logic
- Generate regression tests

### Database Tables

```sql
CREATE TABLE auto_learning_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'correction', 'approval', 'failure', 'schema_drift'
  source_id UUID,
  source_type TEXT,
  feedback_data JSONB,
  applied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE rule_patches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component TEXT NOT NULL, -- 'triage', 'extraction', 'routing'
  patch_type TEXT NOT NULL, -- 'prompt', 'heuristic', 'validation'
  patch_content JSONB,
  test_results JSONB,
  deployed BOOLEAN DEFAULT false,
  deployed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**API Routes:**
- `/api/auto-learning/feedback` - Submit feedback
- `/api/auto-learning/patches` - View/deploy patches
- `/api/auto-learning/metrics` - Learning metrics

**Status:** ❌ 0% Complete

---

## OPERATIONAL FLOWS

### Flow 1: Slack → AI-Relay → Brainstorming (Capture)

```
1. Slack message posted → SLACK_APP captures
2. SLACK_TRIAGE_BOT detects triage signal
3. Classify intent + domain
4. Emit to AI_RELAY_GATEWAY (standardized payload)
5. AI_RELAY_GATEWAY normalizes + audits
6. BRAINSTORM_LAYER ingests as memory item
7. Extract decisions/tasks/risks
8. Link to Spine entities
```

**Example:**
```
Slack: "#support: Client XYZ is escalating - API errors in production"
↓
Triage: signal='support', domain='cs', priority='critical'
↓
AI-Relay: Normalized event with audit log
↓
Brainstorm: Memory item created
↓
Extract: Task="Fix API errors", Risk="Churn risk", Account="XYZ"
↓
Link: client_id=123, health_score=45 (red)
```

---

### Flow 2: Pre-Conversation Memory Pack

```
Trigger: Meeting scheduled OR Slack "/prep @account" command
↓
1. SLACK_TRIAGE_BOT receives prep request
2. Query BRAINSTORM_LAYER for account memory
3. Pull SPINE_SSOT for canonical facts
4. Combine: Account snapshot + Latest signals + Open risks + Decisions + Recommended actions
5. Deliver memory pack to Slack thread/DM
```

**Memory Pack Format:**
```json
{
  "account": {
    "name": "Acme Corp",
    "health_score": 45,
    "risk_level": "red",
    "arr": "$250K",
    "renewal_date": "2026-03-15"
  },
  "latest_signals": [
    "API errors in production (2 hours ago)",
    "Support ticket #4567 opened",
    "CTO escalation in #support"
  ],
  "open_risks": [
    "Technical score dropped 20 points",
    "Payment failed last week",
    "Renewal in 60 days"
  ],
  "decisions": [
    "Last ATHR: Committed to Q1 migration",
    "Approved additional support hours"
  ],
  "recommended_actions": [
    "1. Escalate to Engineering (P1)",
    "2. Schedule emergency call with CTO",
    "3. Prepare service credit offer"
  ]
}
```

---

### Flow 3: Brainstorming → Spine (Promotion)

```
Guardrails:
- Only promote verified/approved items
- Maintain lineage (source thread + agent + timestamp)
- Respect permissions

Steps:
1. BRAINSTORM_LAYER identifies promotion candidates
2. Request approval (if needed)
3. Validate against Spine schema
4. Write canonical entity + relationships
5. Log audit trail
```

**Example:**
```
Brainstorm: "Decision: Migrate to Enterprise plan by Q2"
↓
Promote: Deal stage → "Expansion", Amount → "$500K", Close date → "2026-06-30"
↓
Spine: Update canonical deal record
↓
Audit: Source=Slack thread, Agent=Triage Bot, Timestamp=2026-01-15
```

---

### Flow 4: AI Chat Capture → Insight Distribution

```
1. User exports Claude conversation → AI_RELAY_GATEWAY
2. Normalize payload
3. BRAINSTORM_LAYER ingests
4. Extract framework/template/decision
5. BRAIN_AGENTS analyze for patterns
6. Surface to Query-Back API
7. Non-AI users query → Receive AI-generated insights
```

**Example:**
```
Claude chat: "Pricing objection handling framework"
↓
AI-Relay: Captured + normalized
↓
Brainstorm: Framework extracted
↓
Learning Agent: Identifies pattern "pricing_objection"
↓
Query-Back: Sales rep asks "/context pricing objection"
↓
Result: Returns framework from AI chat + 3 similar past conversations
```

---

## IMPLEMENTATION PRIORITY

### Phase 1: Foundation (Weeks 1-4) ✅
- [x] The Spine (SSOT)
- [x] ONE CLICK LOADER (Stage 1 & 2)
- [x] Brainstorm capture + analysis
- [x] Health Score Engine

### Phase 2: Operational Loop (Weeks 5-12) ← **CURRENT PRIORITY**
- [ ] AI-Relay Gateway setup
- [ ] Slack Triage Bot logic
- [ ] PGVector embeddings
- [ ] Memory pack generation
- [ ] Query-back API (Slack commands)

### Phase 3: CSM Orchestrator (Weeks 13-18)
- [ ] Automated workflows
- [ ] CS intelligence distribution
- [ ] Template library
- [ ] Bulk operations

### Phase 4: Brain Agents (Weeks 19-26)
- [ ] Context Agent
- [ ] Template Agent
- [ ] Strategy Agent
- [ ] Learning Agent

### Phase 5: Auto-Learning (Weeks 27-30)
- [ ] Edge condition detection
- [ ] Rule patches
- [ ] Continuous improvement loop

---

## SUCCESS METRICS

### CS Team Paradox (Solved by CSM Orchestrator)
- 80% reduction in CS headcount
- 100% elimination of manual data entry
- Real-time health scoring (vs weekly manual)
- <1 hour escalation response (vs 24-48 hours)

### GenAI Divide (Solved by Brain Agents)
- 100% AI insight capture (vs 0%)
- 10x people benefiting from AI (10 vs 4)
- 80%+ pre-conversation context hit rate
- 10x AI ROI multiplication

---

## PRINCIPLES

1. **Normalize Once, Render Anywhere** - Data enters once, surfaces everywhere
2. **Keep Your Tools; IntegrateWise Connects Them** - Non-replacement philosophy
3. **Brainstorming Layer is Working Memory; Spine is SSOT** - Clear separation
4. **Slack is the Triage Center; Slack Bot is the Triage Head** - Central orchestration
5. **All AI agents speak through AI-Relay; one gateway, one audit trail** - Standardization

---

## NAMING CONVENTIONS

**Enterprise Branding:**
- Product: **IntegrateWise — Enterprise Integrations**
- Tagline: **"Your tools. Your AI. One truth."**
- Remove "LLP" from product naming

---

## DEPENDENCIES

**Technical:**
- Supabase (pgvector extension required)
- OpenAI API (GPT-4o + ada-002 embeddings)
- Slack API (Bot + Events + Commands)
- Vercel (deployment + cron jobs)
- Resend/SendGrid (email)

**Budget:**
- OpenAI: ~$500/month for 10K sessions
- Supabase: Pro plan ($25/month)
- Vercel: Pro plan ($20/month)

---

## REPOSITORY STRUCTURE

See: `/REPOSITORY_STRUCTURE_MAP.md`

---

**END OF ARCHITECTURE DOCUMENT**

**Next Steps:**
1. Review and approve architecture
2. Create repository structure map
3. Begin Phase 2: Operational Loop implementation
4. Set up n8n workflows (check n8n.integratewise.online)

---

*Built by Nirmal Prince J*
*12-year Integration Architect*
*Bringing enterprise-grade integration DNA to everyone*
