# IntegrateWise OS - Directory Structure Map

**Last Updated:** 2025-01-16  
**Project:** `/Users/nirmal/Github/integrationwise-os`

---

## 📁 Complete Directory Structure

```
integrationwise-os/
│
├── 📱 app/                              # Next.js App Router
│   │
│   ├── 🔐 auth/                         # Authentication Pages
│   │   ├── page.tsx                     # Auth landing
│   │   ├── login/                       # Login page
│   │   ├── sign-up/                     # Sign up
│   │   ├── sign-up-success/            # Success confirmation
│   │   └── error/                       # Auth errors
│   │
│   ├── 🎯 onboarding/                  # User Onboarding Flow
│   │   ├── page.tsx                     # Main onboarding
│   │   ├── analyzing/                   # Persona analysis
│   │   ├── persona/                     # Persona insights
│   │   ├── load/                        # Data loading step
│   │   └── normalize/                   # Normalization step
│   │
│   ├── 🏠 Core Pages
│   │   ├── page.tsx                     # Landing page
│   │   ├── dashboard/                   # Main dashboard
│   │   ├── overview/                    # Overview page
│   │   ├── os/                          # OS view
│   │   └── setup/                       # Setup guide
│   │
│   ├── 🧠 Intelligence & Brainstorming
│   │   ├── brainstorming/               # IQ Hub (Brainstorming Layer)
│   │   ├── insights/                    # AI Insights
│   │   └── metrics/                     # Metrics Dashboard
│   │
│   ├── 📋 Task & Project Management
│   │   ├── tasks/                       # Task Management
│   │   ├── projects/                    # Project Management
│   │   ├── sessions/                     # Session/Meeting Tracking
│   │   └── strategy/                    # Strategic Hub
│   │
│   ├── 👥 CRM Suite
│   │   ├── leads/                       # Lead Management
│   │   ├── clients/                     # Client Management
│   │   │   └── [id]/                    # Client detail page
│   │   ├── deals/                       # Deal Tracking
│   │   ├── pipeline/                    # Sales Pipeline
│   │   ├── campaigns/                   # Campaign Management
│   │   └── sales/                       # Sales Hub
│   │
│   ├── 📦 Business Operations
│   │   ├── products/                    # Product Catalog
│   │   ├── services/                    # Services
│   │   └── content/                     # Content Library
│   │
│   ├── 🌐 Digital Presence
│   │   └── website/                     # Website Manager
│   │
│   ├── 📚 Knowledge & Data
│   │   ├── knowledge/                   # Knowledge Hub
│   │   │   └── [category]/             # Category pages
│   │   ├── data-sources/                # Data Sources
│   │   └── integrations/                # Integrations Hub
│   │
│   ├── ⚙️ Settings & Account
│   │   ├── settings/                    # App Settings
│   │   └── account/
│   │       └── billing/                 # Billing Management
│   │
│   ├── 🛠️ Admin (Platform Administration)
│   │   ├── admin/
│   │   │   ├── page.tsx                 # Admin dashboard
│   │   │   ├── tenants/                 # Tenant management
│   │   │   ├── billing/                 # Platform billing
│   │   │   ├── integrations/            # Integration health
│   │   │   ├── flags/                   # Feature flags
│   │   │   ├── releases/                # Release control
│   │   │   └── audit/                   # Audit logs
│   │
│   ├── 📄 Static/Marketing Pages
│   │   ├── pricing/                     # Pricing page
│   │   ├── docs/                        # Documentation
│   │   ├── solutions/                   # Solutions page
│   │   └── env/                         # Environment debug
│   │
│   ├── 🔧 Special
│   │   ├── normalize/                   # Data Normalization (Loader)
│   │   └── vedic-onboarding/            # Vedic Numerology Onboarding
│   │       └── normalize/
│   │
│   └── 🔌 api/                          # API Routes (33 endpoints)
│       │
│       ├── webhooks/                    # Webhook Handlers
│       │   ├── [provider]/              # Generic provider handler
│       │   ├── slack/                   # Slack webhooks (with triage bot)
│       │   ├── discord/                 # Discord webhooks
│       │   ├── hubspot/                 # HubSpot webhooks
│       │   ├── asana/                   # Asana webhooks
│       │   ├── brainstorm/              # Brainstorm webhooks
│       │   ├── ai-relay/                # AI-Relay Gateway
│       │   └── health/                  # Health check
│       │
│       ├── brainstorm/                  # Brainstorming APIs
│       │   ├── analyze/                 # AI Analysis
│       │   ├── execute/                 # Auto-execution
│       │   └── daily-insights/          # Daily insights generation
│       │
│       ├── billing/                     # Billing APIs (Stripe)
│       │   ├── plans/                   # Plan listing
│       │   ├── subscribe/               # Subscription creation
│       │   ├── cancel/                  # Cancellation
│       │   ├── change-plan/             # Plan changes
│       │   ├── invoices/                # Invoice history
│       │   ├── subscription/            # Current subscription
│       │   ├── entitlements/            # Feature entitlements
│       │   └── webhook/[provider]/      # Payment webhooks
│       │
│       ├── ai/
│       │   └── chat/                    # AI Chat endpoint
│       │
│       ├── cron/                         # Scheduled Jobs
│       │   ├── daily-insights/          # Daily insights job
│       │   └── hourly-insights/         # Hourly insights job
│       │
│       ├── search/                       # Universal search
│       ├── capture/                      # Data capture
│       ├── data-sync/                    # Data synchronization
│       ├── upload/                       # File upload (with security)
│       ├── ping/                         # Health check
│       ├── env/health/                   # Environment health
│       ├── hubspot/sync/                 # HubSpot sync
│       ├── stripe/webhook/               # Stripe webhook
│       ├── website/track/                # Website analytics
│       ├── webhook/                      # Generic webhook
│       └── webhook-scheduler/trigger/    # Webhook scheduler
│
├── 🧩 components/                        # React Components
│   │
│   ├── views/                           # View Components (23 views)
│   │   ├── home-view.tsx                # Dashboard/Home
│   │   ├── brainstorming-view.tsx       # IQ Hub
│   │   ├── tasks-view.tsx               # Tasks
│   │   ├── leads-view.tsx               # Leads
│   │   ├── clients-view.tsx             # Clients
│   │   ├── client-detail-view.tsx       # Client detail
│   │   ├── deals-view.tsx               # Deals
│   │   ├── pipeline-view.tsx            # Pipeline
│   │   ├── campaigns-view.tsx           # Campaigns
│   │   ├── projects-view.tsx            # Projects
│   │   ├── sessions-view.tsx            # Sessions
│   │   ├── products-view.tsx            # Products
│   │   ├── services-view.tsx            # Services
│   │   ├── sales-hub-view.tsx           # Sales Hub
│   │   ├── strategic-hub-view.tsx       # Strategic Hub
│   │   ├── knowledge-view.tsx           # Knowledge Hub
│   │   ├── content-library-view.tsx     # Content Library
│   │   ├── website-manager-view.tsx     # Website Manager
│   │   ├── data-sources-view.tsx        # Data Sources
│   │   ├── integrations-view.tsx        # Integrations
│   │   ├── metrics-view.tsx             # Metrics
│   │   ├── settings-view.tsx            # Settings
│   │   └── generic-view.tsx             # Generic wrapper
│   │
│   ├── ui/                              # Shadcn/UI Components (57 components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ... (50+ more)
│   │
│   ├── lens/                            # Lens System Components
│   │   └── lens-switcher.tsx            # CS/OS/BS switcher
│   │
│   ├── landing/                         # Landing Page Components
│   │   └── landing-page.tsx
│   │
│   ├── onboarding/                     # Onboarding Components
│   │   └── onboarding-wizard.tsx
│   │
│   ├── dialogs/                        # Dialog Components
│   │   └── ...
│   │
│   ├── integrations/                   # Integration Components
│   │   └── ...
│   │
│   ├── widgets/                        # Widget Components
│   │   └── ...
│   │
│   ├── app-shell.tsx                   # Main app shell
│   ├── lens-sidebar.tsx                # Lens-aware sidebar
│   ├── user-menu.tsx                   # User menu
│   ├── command-search.tsx              # Command palette
│   ├── ai-assistant.tsx                # AI Assistant
│   ├── cognitive-twin-intro.tsx       # Cognitive Twin intro
│   ├── demo-banner.tsx                 # Demo banner
│   ├── integratewise-logo.tsx          # Logo component
│   └── theme-provider.tsx              # Theme provider
│
├── 🛠️ lib/                              # Library/Utilities
│   │
│   ├── supabase/                        # Supabase Integration
│   │   ├── client.ts                    # Browser client
│   │   ├── server.ts                    # Server client
│   │   └── proxy.ts                     # Proxy handler
│   │
│   ├── hooks/                           # Custom Hooks
│   │   └── use-data.ts                 # Data fetching hooks
│   │
│   ├── lens/                            # Lens System
│   │   ├── lens-config.ts              # Lens configuration (CS/OS/BS)
│   │   ├── lens-provider.tsx           # Lens context provider
│   │   └── index.ts                    # Exports
│   │
│   ├── triage/                          # Triage Bot
│   │   └── triage-bot.ts               # Slack triage logic
│   │
│   ├── upload/                          # File Upload
│   │   ├── security.ts                  # Security guardrails
│   │   └── index.ts                     # Exports
│   │
│   ├── billing/                        # Billing Logic
│   │   └── ...
│   │
│   ├── feature/                        # Feature Flags
│   │   └── ...
│   │
│   ├── templates/                      # Industry Templates
│   │   └── industry-templates.ts
│   │
│   ├── env.ts                          # Environment validation
│   ├── utils.ts                        # Utility functions
│   └── mock-auth.ts                    # Mock authentication
│
├── 🎣 hooks/                            # Global Hooks
│   ├── use-mobile.ts                   # Mobile detection
│   └── use-toast.ts                    # Toast notifications
│
├── 📜 scripts/                          # SQL Migration Scripts (27+ scripts)
│   ├── 001_enable_vector_extension.sql
│   ├── 012_create_webhooks_table.sql
│   ├── 019_create_brainstorming_layer.sql
│   ├── 023_create_website_manager.sql
│   ├── 025_create_slack_discord_tables.sql
│   ├── 028_vector_indexes.sql
│   ├── 034_create_admin_dashboard_tables.sql
│   └── ... (20+ more)
│
├── 🎨 styles/                           # Styles
│   └── globals.css                      # Global styles
│
├── 📦 public/                           # Static Assets
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── ... (images, icons)
│
├── 📚 Documentation Files
│   ├── README.md                        # Main README
│   ├── ARCHITECTURE.md                  # Architecture docs
│   ├── APP_REVIEW_REAL_VS_MOCKED.md    # System review
│   ├── DIRECTORY_AND_JOURNEY_MAP.md    # Journey map
│   ├── ENTERPRISE_GRADE_AUDIT.md       # Audit report
│   ├── V11_MASTER_LOCK_USER_JOURNEY.md # v11.0 journey
│   └── ... (30+ more docs)
│
├── ⚙️ Configuration Files
│   ├── package.json                    # Dependencies
│   ├── pnpm-lock.yaml                  # Lock file
│   ├── tsconfig.json                    # TypeScript config
│   ├── next.config.mjs                  # Next.js config
│   ├── postcss.config.mjs               # PostCSS config
│   ├── eslint.config.mjs                # ESLint config
│   ├── components.json                  # Shadcn config
│   ├── vercel.json                      # Vercel config
│   ├── middleware.ts                    # Next.js middleware
│   └── .gitignore                       # Git ignore
│
└── 📦 Other Directories
    ├── apps/                            # Additional apps (if monorepo)
    ├── packages/                        # Shared packages
    └── tools/                           # Development tools
```

---

## 📊 Statistics

### **Pages/Routes:**
- **App Routes:** 50+ pages
- **API Routes:** 33 endpoints
- **View Components:** 23 views
- **UI Components:** 57+ Shadcn/UI components

### **Key Features:**
- ✅ **Lens System:** CS (Customer Success), OS (Operating System), BS (Business System)
- ✅ **Brainstorming Layer:** IQ Hub with vector search
- ✅ **Webhook System:** 8+ provider integrations
- ✅ **Billing System:** Full Stripe integration
- ✅ **Admin Dashboard:** Platform administration
- ✅ **Triage Bot:** Slack message processing
- ✅ **AI Integration:** Chat, analysis, insights

---

## 🔍 Quick Reference

### **Find a Component:**
- **Views:** `components/views/[name]-view.tsx`
- **UI Components:** `components/ui/[name].tsx`
- **API Routes:** `app/api/[path]/route.ts`
- **Pages:** `app/[path]/page.tsx`

### **Find a Feature:**
- **Lens System:** `lib/lens/`
- **Database:** `lib/supabase/`
- **Data Hooks:** `lib/hooks/use-data.ts`
- **Triage Bot:** `lib/triage/triage-bot.ts`
- **Upload Security:** `lib/upload/security.ts`

### **Find Documentation:**
- **Architecture:** `ARCHITECTURE.md`
- **User Journey:** `V11_MASTER_LOCK_USER_JOURNEY.md`
- **System Review:** `APP_REVIEW_REAL_VS_MOCKED.md`
- **Audit:** `ENTERPRISE_GRADE_AUDIT.md`

---

## 🎯 Navigation Guide

### **By Function:**
- **CRM:** `app/leads`, `app/clients`, `app/deals`, `app/pipeline`
- **Intelligence:** `app/brainstorming`, `app/insights`, `app/metrics`
- **Operations:** `app/tasks`, `app/projects`, `app/sessions`
- **Knowledge:** `app/knowledge`, `app/content`, `app/data-sources`
- **Settings:** `app/settings`, `app/account/billing`
- **Admin:** `app/admin/*`

### **By Component Type:**
- **Views:** `components/views/*`
- **UI:** `components/ui/*`
- **Lens:** `components/lens/*`, `lib/lens/*`
- **API:** `app/api/*`

---

**Last Updated:** 2025-01-16  
**Total Files:** 500+ files  
**Lines of Code:** ~50,000+ LOC
