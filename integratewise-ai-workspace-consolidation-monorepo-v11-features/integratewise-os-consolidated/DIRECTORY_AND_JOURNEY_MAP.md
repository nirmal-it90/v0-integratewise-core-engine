# INTEGRATEWISE OS - DIRECTORY & USER JOURNEY MAP

---

## 📁 DIRECTORY STRUCTURE

```
integrationwise-os/
│
├── 📱 app/                          # Next.js App Router (Pages)
│   │
│   ├── 🔐 auth/                     # Authentication
│   │   ├── login/                   # Login page
│   │   ├── sign-up/                 # Sign up page
│   │   ├── sign-up-success/         # Success confirmation
│   │   └── error/                   # Auth error page
│   │
│   ├── 🎯 onboarding/               # User Onboarding
│   │   ├── page.tsx                 # Main onboarding
│   │   └── normalize/               # Data normalization step
│   │
│   ├── 🏠 dashboard/                # Main Dashboard (Today view)
│   ├── 📊 overview/                 # Overview page
│   ├── 🧠 brainstorming/            # IQ Hub / Brainstorming
│   ├── 📈 metrics/                  # Metrics Dashboard
│   ├── 💡 insights/                 # AI Insights
│   ├── 🗂️ tasks/                    # Task Management
│   ├── 🎯 strategy/                 # Strategic Hub
│   │
│   ├── 👥 CRM Suite
│   │   ├── leads/                   # Lead Management
│   │   ├── pipeline/                # Sales Pipeline
│   │   ├── deals/                   # Deal Tracking
│   │   ├── campaigns/               # Campaign Management
│   │   └── clients/                 # Client Management
│   │       └── [id]/                # Individual client view
│   │
│   ├── 📦 Business Operations
│   │   ├── products/                # Product Catalog
│   │   ├── services/                # Services
│   │   ├── sales/                   # Sales Hub
│   │   ├── projects/                # Project Management
│   │   └── sessions/                # Session/Meeting Tracking
│   │
│   ├── 🌐 Digital Presence
│   │   ├── website/                 # Website Manager
│   │   └── content/                 # Content Library
│   │
│   ├── 📚 Knowledge & Data
│   │   ├── knowledge/               # Knowledge Hub
│   │   │   └── [category]/          # Category pages (20 categories)
│   │   ├── data-sources/            # Data Sources
│   │   ├── normalize/               # Data Normalization (Loader)
│   │   └── integrations/            # Integrations Hub
│   │
│   ├── ⚙️ Settings & Account
│   │   ├── settings/                # App Settings
│   │   └── account/
│   │       └── billing/             # Billing Management
│   │
│   ├── 📄 Static Pages
│   │   ├── pricing/                 # Pricing Page
│   │   ├── docs/                    # Documentation
│   │   ├── solutions/               # Solutions Page
│   │   └── setup/                   # Setup Guide
│   │
│   ├── 🔧 Special
│   │   ├── os/                      # OS View
│   │   ├── env/                     # Environment Debug
│   │   └── vedic-onboarding/        # Vedic Numerology Onboarding
│   │
│   └── 🔌 api/                      # API Routes
│       │
│       ├── webhooks/                # Webhook Handlers
│       │   ├── [provider]/          # Generic provider handler
│       │   ├── slack/               # Slack webhooks
│       │   ├── discord/             # Discord webhooks
│       │   ├── hubspot/             # HubSpot webhooks
│       │   ├── asana/               # Asana webhooks
│       │   ├── brainstorm/          # Brainstorm webhooks
│       │   └── health/              # Health check
│       │
│       ├── brainstorm/              # Brainstorming APIs
│       │   ├── analyze/             # AI Analysis
│       │   ├── execute/             # Auto-execution
│       │   └── daily-insights/      # Daily insights generation
│       │
│       ├── billing/                 # Billing APIs
│       │   ├── plans/               # Plan listing
│       │   ├── subscribe/           # Subscription creation
│       │   ├── cancel/              # Cancellation
│       │   ├── change-plan/         # Plan changes
│       │   ├── invoices/            # Invoice history
│       │   ├── subscription/        # Current subscription
│       │   ├── entitlements/        # Feature entitlements
│       │   └── webhook/[provider]/  # Payment webhooks
│       │
│       ├── ai/chat/                 # AI Chat endpoint
│       ├── search/                  # Universal search
│       ├── capture/                 # Data capture
│       ├── data-sync/               # Data synchronization
│       ├── hubspot/sync/            # HubSpot sync
│       ├── website/track/           # Website analytics tracking
│       ├── webhook-scheduler/       # Webhook scheduling
│       ├── stripe/webhook/          # Stripe webhooks
│       ├── env/health/              # Environment health
│       ├── ping/                    # Health ping
│       └── cron/                    # Scheduled jobs
│           ├── daily-insights/
│           └── hourly-insights/
│
├── 🧩 components/                   # React Components
│   ├── ui/                          # Shadcn UI primitives
│   ├── views/                       # Page view components (22 views)
│   ├── lens/                        # Lens system components
│   ├── dialogs/                     # Modal dialogs
│   ├── widgets/                     # Dashboard widgets
│   ├── integrations/                # Integration components
│   ├── onboarding/                  # Onboarding components
│   └── landing/                     # Landing page components
│
├── 📚 lib/                          # Shared Libraries
│   ├── lens/                        # Lens configuration & provider
│   ├── supabase/                    # Supabase client/server
│   ├── feature/                     # Feature flags & capabilities
│   ├── billing/                     # Billing logic
│   ├── templates/                   # Industry templates
│   └── *.ts                         # Utility modules
│
├── 🎨 styles/                       # Global Styles
│   └── globals.css                  # Tailwind + custom styles
│
├── 🔧 tools/                        # Development Tools
│   └── vault_sync.ts                # Vault synchronization
│
├── 📜 scripts/                      # SQL Migration Scripts
│   └── *.sql                        # 33 migration files
│
└── 📄 Config Files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.ts
    ├── middleware.ts
    └── postcss.config.mjs
```

---

## 🗺️ USER JOURNEY MAP (29 Stages)

### STAGE 1-6: ENTRY & ONBOARDING

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1: ENTRY                                                 │
│  Route: /                                                       │
│  ────────────────────────────────────────────────────────────  │
│  • Landing page with tagline                                    │
│  • 3 Lens preview (Personal, Business, CS)                      │
│  • 4 Hero features (Loader, Spine, IQ Hub, Shadow)              │
│  • CTA: "Load in One Click"                                     │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 2: SIGNUP                                                │
│  Route: /auth/sign-up                                           │
│  ────────────────────────────────────────────────────────────  │
│  • Google OAuth                                                 │
│  • Microsoft OAuth                                              │
│  • Email/Password                                               │
│  • Workspace creation                                           │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 3: PERSONA REVEAL                                        │
│  Route: /onboarding                                             │
│  ────────────────────────────────────────────────────────────  │
│  • Role questions                                               │
│  • Industry selection                                           │
│  • Team size                                                    │
│  • AI-powered lens suggestion                                   │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 4: LENS SELECTION                                        │
│  Route: /onboarding (step 2)                                    │
│  ────────────────────────────────────────────────────────────  │
│  • Personal Lens card                                           │
│  • Business Lens card                                           │
│  • Customer Success Lens card                                   │
│  • Preview of each lens                                         │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 5: DAY 0 SETUP                                           │
│  Route: /setup                                                  │
│  ────────────────────────────────────────────────────────────  │
│  Path A: Connect Apps → OAuth flow                              │
│  Path B: Data Dump → File upload                                │
│  Path C: Skip → Empty dashboard                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 6: BROWSER MEMORY (Optional)                             │
│  Route: /settings (consent modal)                               │
│  ────────────────────────────────────────────────────────────  │
│  • History import consent                                       │
│  • Bookmarks import                                             │
│  • Privacy controls                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 7-10: CORE DATA FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 7: ONE-CLICK LOADER                                      │
│  Route: /normalize, /data-sources                               │
│  ────────────────────────────────────────────────────────────  │
│  1. Source Selection (Apps, Files, Paste, Webhook)              │
│  2. OAuth & Schema Discovery (auto-read schema)                 │
│  3. Mapping Proposal (confidence indicators)                    │
│  4. Normalize & Load (transform to Spine)                       │
│  5. BYOT Render (customer's preferred format)                   │
│                                                                 │
│  Supported: Notion, Sheets, Airtable, HubSpot, Salesforce...   │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 8: IQ HUB (Brainstorming Layer)                          │
│  Route: /brainstorming                                          │
│  ────────────────────────────────────────────────────────────  │
│  • AI Chat imports (Claude, ChatGPT, Gemini, Perplexity)        │
│  • Slack AI thread capture                                      │
│  • Browser memory context                                       │
│  • Conversation-to-Structure converter                          │
│  • Extract: Decisions, Tasks, Frameworks, Q&A, Drafts          │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 9: THE SPINE (Source of Truth)                           │
│  Route: /overview (data layer)                                  │
│  ────────────────────────────────────────────────────────────  │
│  Canonical Entities:                                            │
│  • Clients/Accounts                                             │
│  • Contacts                                                     │
│  • Projects                                                     │
│  • Tasks                                                        │
│  • Notes                                                        │
│  • Decisions                                                    │
│  • Knowledge                                                    │
│                                                                 │
│  Features: Audit trail, Provenance, Universal search            │
└───────────────────────────┬─────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 10: IQ CLONE / SHADOW (Brain Agent)                      │
│  Route: /insights, /dashboard (AI cards)                        │
│  ────────────────────────────────────────────────────────────  │
│  Capabilities:                                                  │
│  • Summarize (distill conversations)                            │
│  • Extract Tasks (action items from content)                    │
│  • Draft Content (first drafts based on context)                │
│  • Surface Next Steps (predict needs)                           │
│  • Connect Dots (find relationships)                            │
│  • Prepare (meeting briefs, call prep)                          │
│  • Write-Back (save to IQ Hub + Spine)                          │
│                                                                 │
│  Proactive Triggers:                                            │
│  • Calendar event in 1 hour → Meeting brief                     │
│  • Task due tomorrow → Relevant context                         │
│  • New data loaded → Connection identification                  │
│  • Pattern detected → Trend/risk alert                          │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 11-17: DAILY USAGE

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 11: TODAY VIEW                                           │
│  Route: /dashboard                                              │
│  ────────────────────────────────────────────────────────────  │
│  • Calendar integration                                         │
│  • Daily focus section                                          │
│  • AI Insight cards (from Shadow)                               │
│  • Priority tasks                                               │
│  • Meeting prep                                                 │
│  • Quick actions                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 12: TASKS                                                │
│  Route: /tasks                                                  │
│  ────────────────────────────────────────────────────────────  │
│  Views: List | Board | Calendar | By Client | By Project        │
│  Features: Auto-extraction from IQ Hub, Linked context          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 13: AI INSIGHTS                                          │
│  Route: /insights                                               │
│  ────────────────────────────────────────────────────────────  │
│  Types: Patterns | Alerts | Recommendations | Summaries | Trends│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 14: KNOWLEDGE HUB                                        │
│  Route: /knowledge, /knowledge/[category]                       │
│  ────────────────────────────────────────────────────────────  │
│  20 Categories: Branding, Compliance, Finance, Marketing...     │
│  Types: Notes | Frameworks | Templates | References | Decisions │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 15: GOALS & MILESTONES                                   │
│  Route: /strategy                                               │
│  ────────────────────────────────────────────────────────────  │
│  • Target setting                                               │
│  • Progress tracking                                            │
│  • Milestone timeline                                           │
│  • Goal-task linking                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 16: METRICS DASHBOARD                                    │
│  Route: /metrics                                                │
│  ────────────────────────────────────────────────────────────  │
│  Per Lens:                                                      │
│  • Personal: Tasks, Goals, Knowledge growth                     │
│  • Business: Revenue, Pipeline, Clients                         │
│  • CS: Health avg, At-risk, NRR, Renewals                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 17: INTEGRATIONS                                         │
│  Route: /integrations                                           │
│  ────────────────────────────────────────────────────────────  │
│  Connectors: Notion, Sheets, HubSpot, Slack, Gmail, Drive...   │
│  Features: OAuth flow, Webhook builder, Sync logs               │
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 18-19: LENS-SPECIFIC HUBS

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 18: BUSINESS HUB (Business Lens)                         │
│  Routes: /clients, /leads, /pipeline, /deals, /campaigns,       │
│          /products, /services, /sales, /website, /content       │
│  ────────────────────────────────────────────────────────────  │
│  Sections:                                                      │
│  • Clients (revenue view)                                       │
│  • Pipeline (deal stages)                                       │
│  • Projects (delivery)                                          │
│  • Sales (metrics)                                              │
│  • Marketing (campaigns)                                        │
│  • Finance (invoicing)                                          │
│  • Website (manager)                                            │
│                                                                 │
│  Department Views: Sales dept | Finance dept                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 19: CUSTOMER SUCCESS HUB (CS Lens)                       │
│  Routes: /clients (CS view), /sessions, /projects               │
│  ────────────────────────────────────────────────────────────  │
│  Sections:                                                      │
│  • Command Center (portfolio health)                            │
│  • Accounts 360 (deep dive)                                     │
│  • Health (scoring & factors)                                   │
│  • Risks (at-risk accounts)                                     │
│  • Renewals (upcoming)                                          │
│  • Engagement (activity tracking)                               │
│  • QBR (quarterly review prep)                                  │
│                                                                 │
│  CS-specific fields: health_score, nps, adoption_rate, csm_owner│
└─────────────────────────────────────────────────────────────────┘
```

---

### STAGE 20-29: ADMIN & PLATFORM

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 20: SETTINGS                                             │
│  Route: /settings                                               │
│  ────────────────────────────────────────────────────────────  │
│  • Profile management                                           │
│  • Workspace settings                                           │
│  • Permissions/RBAC                                             │
│  • Memory controls (Shadow learning)                            │
│  • Integrations control                                         │
│  • Data export/delete                                           │
│  • Notifications                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 21-23: TENANT ADMIN                                      │
│  Routes: /settings (admin tabs)                                 │
│  ────────────────────────────────────────────────────────────  │
│  21. User Management: Invite, roles, permissions                │
│  22. RBAC: Role definitions, permission matrix                  │
│  23. Billing: Plans, seats, invoices, payment                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STAGE 24-29: PLATFORM ADMIN (IntegrateWise Staff Only)         │
│  Routes: Internal admin panel                                   │
│  ────────────────────────────────────────────────────────────  │
│  24. Platform Admin: Tenants, users, metrics, health            │
│  25. Tenant Management: Search, detail, usage, actions          │
│  26. Support Tools: Tickets, lookup, impersonation              │
│  27. Feature Flags: Toggles, rollout %, targeting               │
│  28. Monitoring: Services, errors, performance                  │
│  29. Audit Logs: Actions, users, timestamps, changes            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 COMPLETE USER FLOW DIAGRAM

```
                          ┌─────────┐
                          │  ENTRY  │
                          │   (/)   │
                          └────┬────┘
                               │
                          ┌────▼────┐
                          │ SIGNUP  │
                          │(/auth)  │
                          └────┬────┘
                               │
                          ┌────▼────┐
                          │ONBOARD  │
                          │(/onboard)│
                          └────┬────┘
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
      ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐
      │  OS LENS  │     │  BS LENS  │     │  CS LENS  │
      │ Personal  │     │ Business  │     │ Customer  │
      │           │     │           │     │ Success   │
      └─────┬─────┘     └─────┬─────┘     └─────┬─────┘
            │                 │                 │
            └────────────┬────┴────────────────┘
                         │
                    ┌────▼────┐
                    │  SPINE  │
                    │ (SSOT)  │
                    └────┬────┘
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
  ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
  │  LOADER │      │ IQ HUB  │      │ SHADOW  │
  │(normalize)│    │(brainstorm)│   │(insights)│
  └─────────┘      └──────────┘     └──────────┘
```

---

## 📊 ROUTE-TO-STAGE MAPPING

| Route | Stage | Purpose |
|-------|-------|---------|
| `/` | 1 | Entry/Landing |
| `/auth/sign-up` | 2 | Signup |
| `/onboarding` | 3-4 | Persona + Lens |
| `/setup` | 5 | Day 0 Setup |
| `/normalize` | 7 | One-Click Loader |
| `/data-sources` | 7 | Data Sources |
| `/brainstorming` | 8 | IQ Hub |
| `/overview` | 9 | Spine Overview |
| `/insights` | 10, 13 | Shadow/AI Insights |
| `/dashboard` | 11 | Today View |
| `/tasks` | 12 | Tasks |
| `/knowledge` | 14 | Knowledge Hub |
| `/strategy` | 15 | Goals/Strategy |
| `/metrics` | 16 | Metrics Dashboard |
| `/integrations` | 17 | Integrations |
| `/clients`, `/leads`, `/pipeline`, `/deals` | 18 | Business Hub |
| `/sessions`, `/projects` | 19 | CS Hub |
| `/settings` | 20-23 | Settings/Admin |
| `/account/billing` | 23 | Billing |

---

*Generated: January 16, 2026*
