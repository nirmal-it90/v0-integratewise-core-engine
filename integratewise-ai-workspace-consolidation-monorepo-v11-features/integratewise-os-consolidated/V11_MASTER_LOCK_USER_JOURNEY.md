# INTEGRATEWISE v11.0 MASTER LOCK
## User Journey & Architecture Reference

**Version:** 11.0 Master Lock  
**Date:** January 16, 2026  
**Status:** CANONICAL - No Drift Allowed

---

## 🎯 NON-NEGOTIABLE PRODUCT POSITIONING

### Headline
> **"Load your work. Store it in your Spine. Think in your IQ Hub. Act through your Cognitive Twin."**

### Core Thesis
IntegrateWise is **organizational intelligence infrastructure** that solves:

| Problem | Solution |
|---------|----------|
| **Tool Sprawl** | Keep your tools, connect them — do not replace |
| **CS Team Paradox** | CS teams exist because infrastructure is broken; IntegrateWise makes CS intelligence universal |
| **GenAI Divide** | AI insights die in chat history; we capture + distribute them to everyone |
| **Governance** | Slack governs AI intake; AI-Relay is the single gateway; audit + UUID tagging |

### Guiding Principles (Visible in UI)
```
"Normalize Once, Render Anywhere"
"Keep your tools — IntegrateWise connects them"
```

---

## 🔒 ARCHITECTURE LOCKS

### Terminology Lock

| Term | Definition | Notes |
|------|------------|-------|
| **IQ Hub** | Brainstorming Layer | Same thing. Use "IQ Hub (Brainstorming Layer)" everywhere |
| **Cognitive Twin** | Chat UI + interaction layer | User-facing name for AI assistant |
| **Brain Agents** | Capabilities behind Cognitive Twin | Context retrieval, summarization, task extraction, drafting, linking |
| **Auto-correction Agents** | System agents (INTERNAL ONLY) | Minimal mention, internal docs only, not marketing |
| **The Spine** | Central PostgreSQL database | Single source of truth, canonical storage |
| **AI-Relay** | Webhook gateway for all AI conversations | Single entry/exit point, audit trail |
| **Triage Head** | Slack bot | Governs AI intake, routes to Brainstorming Layer |

### Data Flow Lock

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI GOVERNANCE & INTAKE                       │
│                                                                 │
│   ALL AI AGENTS              SLACK TRIAGE CENTER               │
│   ────────────               ──────────────────                │
│   • Claude                   • Receives via AI-Relay           │
│   • ChatGPT                  • Deduplicates (PGVector)         │
│   • Gemini                   • Classifies content              │
│   • Perplexity               • Extracts entities               │
│   • Custom Agents            • Routes to Brainstorming Layer   │
│           │                              │                      │
│           ▼                              ▼                      │
│   ┌───────────────┐              ┌───────────────┐             │
│   │  AI-RELAY     │──────────────│  SLACK BOT    │             │
│   │  WEBHOOK      │              │  (Triage Head)│             │
│   │  GATEWAY      │              └───────┬───────┘             │
│   └───────────────┘                      │                      │
│           │                              │                      │
│           └──────────────┬───────────────┘                      │
│                          ▼                                      │
│                  ┌───────────────┐                              │
│                  │  IQ HUB       │                              │
│                  │  (Brainstorm  │                              │
│                  │   Layer)      │                              │
│                  │  + PGVector   │                              │
│                  └───────┬───────┘                              │
│                          │                                      │
│                          ▼                                      │
│                  ┌───────────────┐                              │
│                  │  THE SPINE    │                              │
│                  │  (SSOT)       │                              │
│                  └───────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ CANONICAL USER JOURNEY (v11.0)

### STAGE 1: LANDING PAGE
**Route:** `/`

```
┌─────────────────────────────────────────────────────────────────┐
│  LANDING PAGE                                                   │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  Headline: "Load your work. Store it in your Spine.            │
│            Think in your IQ Hub. Act through your              │
│            Cognitive Twin."                                     │
│                                                                 │
│  Core Features:                                                 │
│  • One-Click Loader                                             │
│  • The Spine (Source of Truth)                                  │
│  • IQ Hub (Brainstorming Layer)                                 │
│  • Cognitive Twin (AI Assistant)                                │
│                                                                 │
│  Principle: "Keep your tools — IntegrateWise connects them"    │
│                                                                 │
│  CTA: [Get Started] [Watch Demo]                               │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 2: LOGIN PAGE
**Route:** `/auth/login`

```
┌─────────────────────────────────────────────────────────────────┐
│  LOGIN                                                          │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  [Continue with Google]                                         │
│  [Continue with Microsoft]                                      │
│  ─────── or ───────                                            │
│  [Email / Password]                                             │
│                                                                 │
│  Don't have an account? [Sign up]                              │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 3: ANALYZING PERSONA
**Route:** `/onboarding` (step 1)

```
┌─────────────────────────────────────────────────────────────────┐
│  ANALYZING YOUR PERSONA & WORKING STYLE                         │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  [Animated progress indicator]                                  │
│                                                                 │
│  "We're analyzing your working style to personalize            │
│   your experience..."                                           │
│                                                                 │
│  Questions being processed:                                     │
│  ✓ What's your primary role?                                   │
│  ✓ What industry are you in?                                   │
│  ✓ What's your team size?                                      │
│  ◯ What tools do you use daily?                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 4: PERSONA INSIGHTS
**Route:** `/onboarding` (step 2)

```
┌─────────────────────────────────────────────────────────────────┐
│  YOUR PERSONA INSIGHTS                                          │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  Based on your profile, you are:                               │
│                                                                 │
│  ┌─────────────────────────────────────┐                       │
│  │  🎯 THE STRATEGIC OPERATOR          │                       │
│  │                                      │                       │
│  │  You thrive on connecting dots,     │                       │
│  │  building systems, and driving      │                       │
│  │  outcomes across teams.             │                       │
│  └─────────────────────────────────────┘                       │
│                                                                 │
│  RECOMMENDED LENS: [Business Lens]                             │
│                                                                 │
│  Other options:                                                 │
│  ○ Personal OS    ○ Customer Success                           │
│                                                                 │
│  "You'll see value in the next 60 seconds"                     │
│                                                                 │
│  [Continue with Business Lens]                                  │
└─────────────────────────────────────────────────────────────────┘
```

**20 Persona Types:**
1. Strategic Operator
2. Revenue Driver
3. Customer Champion
4. Knowledge Curator
5. Process Architect
6. Growth Hacker
7. Product Visionary
8. Team Builder
9. Data Analyst
10. Creative Director
11. Operations Lead
12. Tech Innovator
13. Relationship Builder
14. Efficiency Expert
15. Risk Manager
16. Change Agent
17. Domain Expert
18. Generalist Leader
19. Specialist Contributor
20. Emerging Professional

---

### STAGE 5: LOAD YOUR DATA
**Route:** `/onboarding/setup` or `/setup`

```
┌─────────────────────────────────────────────────────────────────┐
│  LOAD YOUR DATA                                                 │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  Choose how to bring in your work:                             │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  🔗 CONNECT     │  │  📄 DUMP        │  │  ⏭️ SKIP        │ │
│  │                 │  │                 │  │                 │ │
│  │  Connect 1-2    │  │  Upload files:  │  │  Start with     │ │
│  │  tools:         │  │  • Scribbles    │  │  empty          │ │
│  │  • Slack        │  │  • Notes        │  │  workspace      │ │
│  │  • HubSpot      │  │  • Meeting      │  │                 │ │
│  │  • Notion       │  │    summaries    │  │  (You can       │ │
│  │  • Google       │  │  • AI chats     │  │   add later)    │ │
│  │  • Salesforce   │  │  • Markdown     │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  BROWSER MEMORY (Optional)                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Toggle] Enable Browser Memory                          │   │
│  │                                                          │   │
│  │  Allow IntegrateWise to learn from:                     │   │
│  │  • Recent browsing context                               │   │
│  │  • Bookmarks (filtered)                                  │   │
│  │  • Open tab context                                      │   │
│  │                                                          │   │
│  │  Your data stays private. You control what we see.      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Continue]                                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Security Guardrails (Active at this stage):**
- File validation: MIME + extension allowlist (pdf, docx, pptx, md, txt, png, jpg, webp)
- Max file size: 10MB per file, 50MB total batch
- Rate limiting: 10 uploads per minute
- No macro/script execution
- Sandbox parsing with quarantine on failure
- Timeout protection (30s max processing)

---

### STAGE 6: AI LOADER (Processing)
**Route:** `/normalize`

```
┌─────────────────────────────────────────────────────────────────┐
│  AI LOADER - PROCESSING YOUR DATA                               │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  [═══════════════════════════░░░░░░░░░░░] 67%                  │
│                                                                 │
│  Currently processing:                                          │
│  ✓ Reading source schema                                        │
│  ✓ Detecting entities (Contacts, Tasks, Notes)                 │
│  ◯ Normalizing to Spine format                                 │
│  ◯ Generating embeddings for IQ Hub                            │
│  ◯ Connecting relationships                                     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  "Normalize Once, Render Anywhere"                              │
│                                                                 │
│  Your data will be:                                             │
│  • Stored in The Spine (your source of truth)                  │
│  • Indexed in IQ Hub for AI retrieval                          │
│  • Available across all your lenses                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 7: AI GOVERNANCE & INTAKE
**System Stage** (First-class capability, not implicit)

```
┌─────────────────────────────────────────────────────────────────┐
│  AI GOVERNANCE & INTAKE LAYER                                   │
│  (System capability - always active after onboarding)           │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  COMPONENTS:                                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AI-RELAY GATEWAY                                        │   │
│  │  • Single webhook endpoint for all AI conversations      │   │
│  │  • UUID tagging for audit trail                          │   │
│  │  • Standardized payload format                           │   │
│  │  • Routes to Slack Triage                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SLACK TRIAGE (Triage Head)                              │   │
│  │  • Receives all AI agent conversations                   │   │
│  │  • Deduplicates via PGVector similarity                  │   │
│  │  • Classifies: Decision / Framework / Insight / Task     │   │
│  │  • Extracts: person_id, topic, subtopic, tags           │   │
│  │  • Routes to IQ Hub (Brainstorming Layer)               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  QUERY-BACK (Future: Slash Commands)                     │   │
│  │  • /iw-context - Retrieve relevant context               │   │
│  │  • /iw-recall - Search past conversations                │   │
│  │  • Pre-conversation context injection                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 8: CONTAINER (App Shell)
**Route:** `/dashboard` (entry point after onboarding)

User enters the main application container. Navigation adapts based on selected lens.

---

### STAGE 9-15: HUB LAYER (Lens-Based Views)

See **LENS LAYOUTS** section below for exact navigation structure per lens.

---

## 🎨 LENS LAYOUTS (LOCKED)

### OS LENS (Universal/Personal)

| # | Nav Item | Route | Description |
|---|----------|-------|-------------|
| 1 | Today | `/dashboard` | Calendar + Cards + AI Insights for today |
| 2 | Home | `/overview` | Score + Metrics + Goals overview |
| 3 | Goals & Metrics | `/metrics` | Goal tracking + KPI dashboard |
| 4 | IQ Hub | `/brainstorming` | Cognitive Twin + Tasks + Knowledge + Connected Apps |
| 5 | Integrations | `/integrations` | Webhooks + Connected apps |
| 6 | Settings | `/settings` | App configuration |
| 7 | Profile | `/settings` (tab) | User profile |

---

### BUSINESS LENS

| # | Nav Item | Route | Description |
|---|----------|-------|-------------|
| 1 | Home | `/overview` | Score + Revenue snapshot + priorities |
| 2 | Revenue Engine | `/pipeline` | Pipeline + Deals |
| 3 | Clients | `/clients` | Client management |
| 4 | Delivery | `/projects` | Projects + Sessions |
| 5 | Growth | `/campaigns` | Campaigns + Content + Website |
| 6 | IQ Hub | `/brainstorming` | Cognitive Twin + Tasks + Knowledge |
| 7 | Metrics | `/metrics` | Business metrics dashboard |
| 8 | Integrations | `/integrations` | Webhooks + Connected apps |
| 9 | Settings | `/settings` | App configuration |

---

### CS LENS (Customer Success)

| # | Nav Item | Route | Description |
|---|----------|-------|-------------|
| 1 | Command Center | `/dashboard` | Portfolio health + risks + renewals |
| 2 | Accounts 360 | `/clients` | Client deep dive |
| 3 | Health Factors | `/health` | Health scoring + factors |
| 4 | Risks & Plays | `/risks` | At-risk accounts + playbooks |
| 5 | Renewals / QBR | `/renewals` | Renewal pipeline + QBR prep |
| 6 | Sessions | `/sessions` | Engagement tracking |
| 7 | IQ Hub | `/brainstorming` | Cognitive Twin + Tasks + Knowledge |
| 8 | Metrics | `/metrics` | CS metrics (NRR, churn, health) |
| 9 | Integrations | `/integrations` | Webhooks + Connected apps |
| 10 | Settings | `/settings` | App configuration |

---

## 📱 CONTAINER MAIN NAV (Required Elements)

Every lens MUST include these core elements:

| Element | Description |
|---------|-------------|
| **Home** | Metrics + Goals + Score |
| **Today** | Calendar + Cards + AI Insights |
| **Goals & Metrics** | Accessible from nav or Home |
| **IQ Hub** | Tasks + Cognitive Twin + Knowledge Hub + Connected Apps |
| **Profile** | User profile (can be in Settings) |
| **Integrations & Webhooks** | Data connections |
| **Settings** | App configuration |

---

## 🖥️ REQUIRED UI ELEMENTS

### Sidebar Footer (All Lenses)
```
───────────────────────────────
"Normalize Once, Render Anywhere"
Keep your tools — IntegrateWise connects them.
───────────────────────────────
```

### IQ Hub Header
```
┌─────────────────────────────────────────────────────────────────┐
│  IQ Hub (Brainstorming Layer)                                   │
│  Your AI thinking space — capture, structure, connect           │
└─────────────────────────────────────────────────────────────────┘
```

### Cognitive Twin Chat (Inside IQ Hub)
```
┌─────────────────────────────────────────────────────────────────┐
│  💬 Cognitive Twin                                              │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  [Chat interface]                                               │
│                                                                 │
│  Powered by Brain Agents:                                       │
│  • Context retrieval                                            │
│  • Summarization                                                │
│  • Task extraction                                              │
│  • Content drafting                                             │
│  • Entity linking                                               │
└─────────────────────────────────────────────────────────────────┘
```

### Today Dashboard (Alive Dashboard)
```
┌─────────────────────────────────────────────────────────────────┐
│  TODAY                                          [Search 🔍]     │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  MEMORY FEED                                             │   │
│  │  Latest from IQ Hub                                      │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  • Pricing strategy framework (2h ago)                   │   │
│  │  • Meeting notes: Acme Corp (yesterday)                  │   │
│  │  • Task extracted: Follow up with Sarah                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ASK COGNITIVE TWIN                                      │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  [What would you like to explore?              ] [Ask]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │  📅 CALENDAR  │  │  ✅ TASKS     │  │  💡 INSIGHTS  │       │
│  │  3 meetings   │  │  5 due today  │  │  2 new        │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 SECURITY GUARDRAILS

### File Upload Validation

```typescript
const ALLOWED_MIMES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/markdown',
  'text/plain',
  'image/png',
  'image/jpeg',
  'image/webp',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.pptx', '.md', '.txt', '.png', '.jpg', '.jpeg', '.webp'];

const LIMITS = {
  maxFileSize: 10 * 1024 * 1024,      // 10MB per file
  maxBatchSize: 50 * 1024 * 1024,     // 50MB total
  maxFilesPerBatch: 20,
  uploadRateLimit: 10,                 // per minute
  processingTimeout: 30000,            // 30 seconds
};
```

### Ingestion Protection
- No macro/script execution
- Sandbox parsing environment
- Quarantine on extraction failure
- Error boundaries at every ingestion point
- Partial extraction recovery (don't fail entire batch)

---

## 🏛️ PLATFORM ADMIN STAGES (24-29)

**Status:** Separate Internal Admin App  
**Access:** IntegrateWise Staff Only  
**Routes:** `/admin/*` (separate deployment)

| Stage | Name | Access Level |
|-------|------|--------------|
| 24 | Platform Admin Panel | Super Admin, Engineering |
| 25 | Tenant Management | Platform Admin, Support |
| 26 | Support Tools | Support Agent, Platform Admin |
| 27 | Feature Flags | Super Admin, Engineering |
| 28 | System Monitoring | Super Admin, Engineering |
| 29 | Audit Logs | All Admin Levels |

These stages are NOT part of the main user-facing application. They exist in a separate admin portal with dedicated authentication and access controls.

---

## 📊 ROUTE-TO-STAGE MAPPING (v11.0)

| Route | Stage | Name |
|-------|-------|------|
| `/` | 1 | Landing Page |
| `/auth/login` | 2 | Login |
| `/auth/sign-up` | 2 | Sign Up |
| `/onboarding` | 3-4 | Analyzing + Persona Insights |
| `/onboarding/setup`, `/setup` | 5 | Load Your Data |
| `/normalize` | 6 | AI Loader Processing |
| (System) | 7 | AI Governance & Intake |
| `/dashboard` | 8+ | Container + Today View |
| `/overview` | 9 | Home / Overview |
| `/brainstorming` | 9 | IQ Hub (Brainstorming Layer) |
| `/metrics` | 9 | Goals & Metrics |
| `/clients` | 9 | Accounts / Clients |
| `/integrations` | 9 | Integrations & Webhooks |
| `/settings` | 9 | Settings |
| `/pipeline`, `/deals` | 9 | Revenue Engine (BS) |
| `/projects`, `/sessions` | 9 | Delivery / Sessions |
| `/campaigns`, `/content`, `/website` | 9 | Growth (BS) |

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Landing page reflects headline + principles
- [ ] Login supports Google/Microsoft/Email
- [ ] Onboarding has Analyzing + Persona Insights (20 types) + Lens recommendation
- [ ] Setup has Connect/Dump/Skip + Browser Memory toggle
- [ ] AI Loader shows processing with progress
- [ ] Security guardrails active on all upload endpoints
- [ ] LensSidebar wired with OS/BS/CS layouts
- [ ] Labels use "IQ Hub (Brainstorming Layer)" consistently
- [ ] Chat interface labeled "Cognitive Twin"
- [ ] Principle line in sidebar footer
- [ ] Today dashboard has Memory Feed + Search + Cognitive Twin entry
- [ ] Platform Admin stages clearly separated

---

*v11.0 Master Lock - Canonical Reference Document*
*No drift allowed without version increment*
