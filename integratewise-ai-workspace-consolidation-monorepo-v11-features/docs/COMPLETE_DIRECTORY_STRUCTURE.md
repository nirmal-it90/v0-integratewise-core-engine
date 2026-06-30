# IntegrateWise v11.0 - Complete Directory Structure

**Date:** January 16, 2026  
**Workspace:** `/Users/nirmal/Github/13.1/integratewise-ai-workspace/`  
**Total Files:** 1,395+ files (396 TypeScript/TSX files in main app)

---

## 📁 ROOT DIRECTORY STRUCTURE

```
/Users/nirmal/Github/13.1/
├── integratewise-ai-workspace/          ✅ PRIMARY WORKSPACE (Main Application)
│   ├── apps/                             ✅ Applications
│   ├── packages/                         ✅ Shared Packages
│   ├── components/                       ✅ Shared Components
│   ├── docs/                             ✅ Documentation
│   ├── scripts/                          ✅ SQL Scripts
│   └── [config files]                    ✅ Config Files
│
├── integrate-wise-operating-syst-2/      ⚠️ LEGACY IMPLEMENTATION
│   ├── app/                              ⚠️ Legacy routes
│   ├── components/                       ⚠️ Legacy components
│   └── lib/                              ⚠️ Legacy lib
│
├── Account Success HUbs/                 ⚠️ HTML WIREFRAMES (23 files)
│   └── HUB-*.html                        ⚠️ Static prototypes
│
└── file.html                             ⚠️ CORE WIREFRAMES (1600 lines)
```

---

## 📁 PRIMARY WORKSPACE DETAILED STRUCTURE

```
integratewise-ai-workspace/
├── apps/
│   ├── integrationwise-os/               ✅ MAIN APPLICATION (396 TS/TSX files)
│   │   ├── app/                          ✅ Next.js App Router (78 page.tsx files)
│   │   │   ├── (app)/                    ✅ Core App Routes (7 pages)
│   │   │   │   ├── browser-read/
│   │   │   │   ├── command-center/
│   │   │   │   ├── dashboard/            ⚠️ Should redirect to /today
│   │   │   │   ├── insights/             ⚠️ Remove from core nav
│   │   │   │   ├── loader/               ⚠️ Move to Integrations
│   │   │   │   ├── profile/
│   │   │   │   └── settings/
│   │   │   │
│   │   │   ├── (personal)/               ✅ Personal Workspace (5 pages)
│   │   │   │   ├── goals/
│   │   │   │   ├── home/                 ⚠️ Consolidate with /today
│   │   │   │   ├── knowledge/            ⚠️ May be "Search / Memory"
│   │   │   │   └── today/                ✅ TODAY VIEW (v11.0 required)
│   │   │   │
│   │   │   ├── (cs)/                     ✅ Customer Success Views (4 pages)
│   │   │   │   ├── accounts/
│   │   │   │   ├── risks/
│   │   │   │   ├── tam/
│   │   │   │   └── war-room/
│   │   │   │
│   │   │   ├── (business)/               ✅ Business Views (5 pages)
│   │   │   │   ├── clients/
│   │   │   │   ├── metrics/
│   │   │   │   ├── pipeline/
│   │   │   │   ├── projects/
│   │   │   │   └── spend/
│   │   │   │
│   │   │   ├── (auth)/                   ✅ Authentication (3 pages)
│   │   │   │   ├── login/
│   │   │   │   ├── signup/
│   │   │   │   └── signup-success/
│   │   │   │
│   │   │   ├── api/                      ✅ API Routes (90+ routes)
│   │   │   │   ├── ai/chat/
│   │   │   │   ├── billing/              ✅ Billing API (11 routes)
│   │   │   │   ├── brainstorm/           ⚠️ Should be /api/iq-hub
│   │   │   │   ├── byom/
│   │   │   │   ├── byot/
│   │   │   │   ├── capture/
│   │   │   │   ├── cron/                 ✅ Scheduled Jobs (6 routes)
│   │   │   │   ├── cs/health-score/
│   │   │   │   ├── data-sync/
│   │   │   │   ├── env/health/
│   │   │   │   ├── goals/progress/
│   │   │   │   ├── health/
│   │   │   │   ├── hubspot/sync/
│   │   │   │   ├── insights/patterns/
│   │   │   │   ├── liveness/
│   │   │   │   ├── loader/               ✅ AI Loader API (9 routes)
│   │   │   │   ├── metrics/kpis/
│   │   │   │   ├── neutron/              ✅ Internal API (3 routes)
│   │   │   │   ├── ping/
│   │   │   │   ├── readiness/
│   │   │   │   ├── search/
│   │   │   │   ├── session/
│   │   │   │   ├── spend/                ✅ Spend API (2 routes)
│   │   │   │   ├── stripe/webhook/
│   │   │   │   ├── support/contact/
│   │   │   │   ├── sync/schedule/
│   │   │   │   ├── templates/download/
│   │   │   │   ├── webhook/
│   │   │   │   ├── webhook-scheduler/trigger/
│   │   │   │   ├── webhooks/             ✅ Webhooks API (9 routes)
│   │   │   │   │   ├── [provider]/
│   │   │   │   │   ├── ai-relay/         ✅ AI-Relay (Phase 1)
│   │   │   │   │   ├── asana/
│   │   │   │   │   ├── brainstorm/       ⚠️ Should be /iq-hub
│   │   │   │   │   ├── discord/
│   │   │   │   │   ├── health/
│   │   │   │   │   ├── hubspot/
│   │   │   │   │   └── slack/            ✅ With Triage Bot (Phase 2)
│   │   │   │   ├── website/track/
│   │   │   │   └── workspace/bootstrap/
│   │   │   │
│   │   │   ├── account/billing/
│   │   │   ├── ai-loader/
│   │   │   ├── auth/                     ✅ Auth Routes (5 pages)
│   │   │   ├── blog/                     ✅ Marketing Pages
│   │   │   ├── brainstorming/            🔴 CRITICAL: Rename to /iq-hub
│   │   │   ├── campaigns/
│   │   │   ├── case-studies/
│   │   │   ├── clients/
│   │   │   ├── company/                  ✅ Company Pages (3 pages)
│   │   │   ├── components/               ⚠️ In-app components
│   │   │   ├── content/
│   │   │   ├── cs/
│   │   │   ├── data-sources/
│   │   │   ├── deals/
│   │   │   ├── docs/
│   │   │   ├── env/
│   │   │   ├── integrations/
│   │   │   ├── knowledge/
│   │   │   ├── leads/
│   │   │   ├── normalize/
│   │   │   ├── onboarding/               ⚠️ Onboarding Flow (3 pages)
│   │   │   ├── os/
│   │   │   ├── overview/
│   │   │   ├── platform/
│   │   │   ├── pricing/
│   │   │   ├── product/
│   │   │   ├── products/
│   │   │   ├── resources/                ✅ Resource Pages (7 pages)
│   │   │   ├── sales/
│   │   │   ├── security/                 ✅ Security Pages (4 pages)
│   │   │   ├── services/
│   │   │   ├── sessions/
│   │   │   ├── settings/
│   │   │   ├── solutions/
│   │   │   ├── start/                    ✅ Entry Point (3 pages)
│   │   │   ├── strategy/
│   │   │   ├── support/contact/
│   │   │   ├── tasks/
│   │   │   └── templates/
│   │   │
│   │   ├── components/                   ✅ React Components (100+ files)
│   │   │   ├── views/                    ✅ View Components (31 files)
│   │   │   │   ├── today-view.tsx        ✅ NEW (v11.0 Today View)
│   │   │   │   ├── iq-hub-view.tsx       ✅ NEW (replaces brainstorming-view)
│   │   │   │   ├── governance-view.tsx   ✅ NEW (Governance UI)
│   │   │   │   ├── brainstorming-view.tsx 🔴 OLD (to be removed)
│   │   │   │   ├── campaigns-view.tsx
│   │   │   │   ├── client-detail-view.tsx
│   │   │   │   ├── clients-view.tsx
│   │   │   │   ├── content-library-view.tsx
│   │   │   │   ├── data-sources-view.tsx
│   │   │   │   ├── deals-view.tsx
│   │   │   │   ├── home-view.tsx
│   │   │   │   ├── insights-view.tsx
│   │   │   │   ├── integrations-view.tsx
│   │   │   │   ├── knowledge-view.tsx
│   │   │   │   ├── leads-view.tsx
│   │   │   │   ├── loader-view.tsx
│   │   │   │   ├── metrics-view.tsx
│   │   │   │   ├── pipeline-view.tsx
│   │   │   │   ├── products-view.tsx
│   │   │   │   ├── profile-view.tsx
│   │   │   │   ├── projects-view.tsx
│   │   │   │   ├── sales-hub-view.tsx
│   │   │   │   ├── services-view.tsx
│   │   │   │   ├── sessions-view.tsx
│   │   │   │   ├── settings-view.tsx
│   │   │   │   ├── spend-insights-view.tsx
│   │   │   │   ├── strategic-hub-view.tsx
│   │   │   │   ├── tasks-view.tsx
│   │   │   │   └── website-manager-view.tsx
│   │   │   │
│   │   │   ├── sidebars/                 ✅ Sidebar Components (3 files)
│   │   │   │   ├── business-sidebar.tsx
│   │   │   │   ├── cs-sidebar.tsx
│   │   │   │   └── personal-sidebar.tsx
│   │   │   │
│   │   │   ├── onboarding/               ✅ Onboarding Components (3 files)
│   │   │   ├── loader/                   ✅ Loader Components (3 files)
│   │   │   ├── dialogs/                  ✅ Dialog Components (3 files)
│   │   │   ├── widgets/                  ✅ Widget Components (2 files)
│   │   │   ├── integrations/             ✅ Integration Components (2 files)
│   │   │   ├── paywall/                  ✅ Paywall Components (3 files)
│   │   │   ├── brand/                    ✅ Brand Components (1 file)
│   │   │   ├── media/                    ✅ Media Components (1 file)
│   │   │   ├── ui/                       ✅ UI Components (23 files)
│   │   │   ├── sidebar-ssot.tsx          🔴 CRITICAL: Fix navigation
│   │   │   ├── sidebar-mailerlite.tsx    🔴 CRITICAL: Fix navigation
│   │   │   ├── sidebar.tsx               🔴 CRITICAL: Fix navigation
│   │   │   ├── app-shell.tsx             🔴 CRITICAL: Fix navigation
│   │   │   ├── command-center.tsx        ⚠️ Update references
│   │   │   ├── insights-home.tsx         ⚠️ Update references
│   │   │   ├── hubs-dropdown.tsx         ⚠️ Review terminology
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── user-menu.tsx
│   │   │   └── [other components]
│   │   │
│   │   ├── lib/                          ✅ Library & Services (90+ files)
│   │   │   ├── embeddings/               ✅ PGVector Service (Phase 1)
│   │   │   │   └── service.ts
│   │   │   ├── triage/                   ✅ Triage Bot (Phase 2)
│   │   │   │   └── service.ts
│   │   │   ├── supabase/                 ✅ Supabase Clients (4 files)
│   │   │   ├── ai-loader/                ✅ AI Loader (4 files)
│   │   │   ├── billing/                  ✅ Billing System (7 files)
│   │   │   ├── loaders/                  ✅ Data Loaders (5 files)
│   │   │   ├── hooks/                    ✅ Custom Hooks (6 files)
│   │   │   ├── templates/                ✅ Templates (3 files)
│   │   │   ├── types/                    ✅ Type Definitions (3 files)
│   │   │   ├── cms/                      ✅ CMS Adapters (4 files)
│   │   │   ├── media/cloudinary.ts
│   │   │   ├── sync/scheduler.ts
│   │   │   └── [other services]
│   │   │
│   │   ├── supabase/
│   │   │   └── migrations/               ✅ Database Migrations (7 files)
│   │   │       ├── 20260106_spine.sql
│   │   │       ├── 20260110_byot_tables.sql
│   │   │       ├── 20260112_ai_loader_schema.sql
│   │   │       ├── 20260113_billing_audit_enhancements.sql
│   │   │       ├── 20260113_phase3_tables.sql
│   │   │       ├── 20260113_shadow_jobs.sql
│   │   │       ├── 20260113_support_requests.sql
│   │   │       ├── 20260116_enable_pgvector.sql          ✅ NEW (Phase 1)
│   │   │       └── 20260116_triage_bot.sql               ✅ NEW (Phase 2)
│   │   │
│   │   └── [config files]                ✅ Config Files
│   │
│   ├── integratewise-webhooks/           ✅ Cloudflare Workers (Phase 1)
│   │   ├── src/
│   │   │   ├── handlers/                 ✅ Webhook Handlers (5 files)
│   │   │   │   ├── slack.ts              ✅ With Triage Bot
│   │   │   │   ├── ai-relay.ts           ✅ NEW (Phase 1)
│   │   │   │   ├── stripe.ts
│   │   │   │   ├── hubspot.ts
│   │   │   │   ├── discord.ts
│   │   │   │   └── notion.ts
│   │   │   ├── lib/                      ✅ Libraries (3 files)
│   │   │   │   ├── idempotency.ts
│   │   │   │   ├── logging.ts
│   │   │   │   └── signature.ts
│   │   │   └── index.ts                  ✅ Main Router
│   │   └── wrangler.toml
│   │
│   ├── integratewise-core-engine/        ⚠️ Core Engine
│   │   └── src/
│   │
│   └── hub-frontend-app/                 ⚠️ Hub Frontend
│       └── src/
│
├── packages/                              ✅ Shared Packages
│   ├── types/                            ✅ Type Definitions (5 files)
│   │   └── src/
│   │       ├── spine.ts                  ⚠️ Updated (added ai-relay)
│   │       ├── webhooks.ts               ✅ Updated (added AIRelayWebhookSchema)
│   │       ├── spine_contracts.ts
│   │       └── common.ts
│   │
│   ├── lib/                               ✅ Shared Libraries (5 files)
│   │   └── src/
│   │       ├── normalizers.ts            ✅ Updated (added normalizeAIRelayEvent)
│   │       ├── utils.ts
│   │       ├── neon.ts
│   │       └── index.ts
│   │
│   ├── ui/                                ✅ UI Components
│   ├── config/                            ✅ Config Files
│   └── [other packages]
│
├── docs/                                  ✅ Documentation (20+ files)
│   ├── V11_MASTER_LOCK_FINAL.md          ✅ NEW (Locked Reference)
│   ├── V11_COMPLETE_AUDIT_REPORT.md      ✅ NEW (Complete Audit)
│   ├── V11_DEEP_AUDIT_PAGE_BY_PAGE.md    ✅ NEW (Page-by-Page Audit)
│   ├── V11_COMPONENT_INVENTORY.md         ✅ NEW (Component Inventory)
│   ├── V11_ALIGNMENT_CHECKLIST.md         ✅ NEW (Alignment Checklist)
│   ├── V11_FINAL_SUMMARY.md              ✅ NEW (Executive Summary)
│   ├── PHASE_1_2_IMPLEMENTATION.md       ✅ NEW (Phase 1 & 2 Guide)
│   ├── ENV_VARIABLES_PHASE1-2.md         ✅ NEW (Environment Setup)
│   ├── COMPLETE_DIRECTORY_STRUCTURE.md    ✅ NEW (This file)
│   ├── SSOT_CANONICAL_SPEC_V1.1.md
│   ├── ci-cd/
│   └── runbooks/
│
├── components/                            ✅ Shared Components
├── scripts/                               ✅ SQL Scripts (5 files)
├── public/                                ✅ Static Assets
├── .github/workflows/                     ✅ CI/CD
└── [root config files]                      ✅ Package.json, tsconfig, etc.
```

---

## 📊 FILE COUNTS BY CATEGORY

### Main Application (`apps/integrationwise-os/`)
- **Total Files:** 1,395+ files
- **TypeScript/TSX:** 396 files
- **Pages (page.tsx):** 78 files
- **API Routes (route.ts):** 90+ routes
- **Components:** 100+ files
  - **Views:** 31 files
  - **UI Components:** 23 files
  - **Sidebars:** 3 files
  - **Other:** 40+ files
- **Library Files (lib/):** 90+ files
- **Migrations (SQL):** 9 files
- **Documentation (MD):** 131 files

---

## ✅ VIEWS INVENTORY (31 Views)

### ✅ Core Views (v11.0 Required)
1. ✅ `today-view.tsx` - **NEW** (Copied from legacy, v11.0 compliant)
2. ✅ `iq-hub-view.tsx` - **NEW** (Copied from legacy, uses correct terminology)
3. ✅ `tasks-view.tsx` - Work Queue / Tasks
4. ✅ `home-view.tsx` - ⚠️ May consolidate with today-view

### ✅ Role-Based Views
5. ✅ `clients-view.tsx` - CS/Sales View
6. ✅ `sales-hub-view.tsx` - Sales View
7. ✅ `campaigns-view.tsx` - Marketing View
8. ✅ `strategic-hub-view.tsx` - Business OS View (may need verification)
9. ✅ `governance-view.tsx` - **NEW** (Copied from legacy)
10. ⚠️ `admin-view.tsx` - **MISSING** (Should copy from legacy)

### ✅ Feature Views
11. ✅ `loader-view.tsx` - AI Loader
12. ✅ `insights-view.tsx` - AI Insights
13. ✅ `knowledge-view.tsx` - Knowledge Hub (may be "Search / Memory")
14. ✅ `integrations-view.tsx` - Integrations
15. ✅ `settings-view.tsx` - Settings
16. ✅ `profile-view.tsx` - User Profile

### ✅ Data Views
17. ✅ `deals-view.tsx` - Deals
18. ✅ `pipeline-view.tsx` - Pipeline
19. ✅ `leads-view.tsx` - Leads
20. ✅ `projects-view.tsx` - Projects
21. ✅ `sessions-view.tsx` - Sessions
22. ✅ `metrics-view.tsx` - Metrics
23. ✅ `data-sources-view.tsx` - Data Sources
24. ✅ `spend-insights-view.tsx` - Spend Insights

### ✅ Content Views
25. ✅ `campaigns-view.tsx` - Campaigns
26. ✅ `content-library-view.tsx` - Content Library
27. ✅ `products-view.tsx` - Products
28. ✅ `services-view.tsx` - Services
29. ✅ `website-manager-view.tsx` - Website Manager
30. ✅ `client-detail-view.tsx` - Client Detail

### 🔴 OLD (To Remove/Replace)
31. 🔴 `brainstorming-view.tsx` - **REPLACED** by `iq-hub-view.tsx`

---

## 📝 MISSING VIEWS (Copied from Legacy)

### ✅ Copied & Added
1. ✅ `today-view.tsx` - **ADDED** (v11.0 Today View - Daily Command Center)
2. ✅ `iq-hub-view.tsx` - **ADDED** (Replaces brainstorming-view.tsx)
3. ✅ `governance-view.tsx` - **ADDED** (Governance UI)

### ⚠️ Still Missing (Available in Legacy)
4. ⚠️ `cockpit-view.tsx` - Business OS Cockpit (550 lines)
5. ⚠️ `admin-view.tsx` - Admin View (380 lines)
6. ⚠️ `data-flow-view.tsx` - Data Flow Visualization
7. ⚠️ `release-control-view.tsx` - Release Management (internal)

---

## 🔧 CRITICAL UPDATES MADE

### ✅ Files Created/Copied
1. ✅ `components/views/today-view.tsx` - Today View component (v11.0 compliant)
2. ✅ `components/views/iq-hub-view.tsx` - IQ Hub component (correct terminology)
3. ✅ `components/views/governance-view.tsx` - Governance UI component
4. ✅ `app/(personal)/today/page.tsx` - Updated to use TodayView component

### ⚠️ Files Still Need Updates
1. 🔴 `components/sidebar-ssot.tsx` - Fix navigation (Brainstorming → IQ Hub)
2. 🔴 `components/app-shell.tsx` - Fix navigation
3. 🔴 `components/sidebar-mailerlite.tsx` - Fix navigation
4. 🔴 `components/sidebar.tsx` - Fix navigation
5. 🔴 `app/brainstorming/page.tsx` - Update to use IQHubView
6. ⚠️ `app/start/page.tsx` - Set default to `/today`
7. ⚠️ `app/(app)/dashboard/page.tsx` - Update redirect

---

## 📈 STATISTICS

### Main Application (`apps/integrationwise-os/`)
- **Total Files:** 1,395
- **TypeScript Files:** 396
- **Pages:** 78
- **API Routes:** 90+
- **Components:** 100+
- **Views:** 31 (3 new, 1 old to remove)
- **Library Files:** 90+
- **Migrations:** 9

### Directory Breakdown
- **app/:** 78 page files + 90+ API routes = **168 routes**
- **components/:** 100+ component files
- **lib/:** 90+ service/utility files
- **supabase/migrations/:** 9 SQL migration files

---

## ✅ WORK COMPLETED

### Phase 1 Implementation ✅
1. ✅ AI-Relay Gateway webhook handler (Cloudflare Workers)
2. ✅ AI-Relay Gateway webhook handler (Next.js API)
3. ✅ PGVector extension migration
4. ✅ Embeddings service layer
5. ✅ Documentation created

### Phase 2 Implementation ✅
1. ✅ Triage bot service
2. ✅ Triage bot database schema
3. ✅ Triage bot Slack integration
4. ✅ Documentation created

### Views Migration ✅
1. ✅ Today View copied (v11.0 compliant)
2. ✅ IQ Hub View copied (uses correct terminology)
3. ✅ Governance View copied
4. ✅ Today page updated to use TodayView

### Audit & Documentation ✅
1. ✅ Complete audit report
2. ✅ Page-by-page audit
3. ✅ Component inventory
4. ✅ Alignment checklist
5. ✅ Directory structure document

---

## ⚠️ REMAINING WORK

### Critical Fixes (P0)
1. ⚠️ Replace "Brainstorming" → "IQ Hub" in 4 navigation components
2. ⚠️ Update `/brainstorming` page to use IQHubView
3. ⚠️ Set `/today` as default landing
4. ⚠️ Fix core navigation structure

### Optional (P1-P2)
5. ⚠️ Copy remaining views (cockpit-view, admin-view) if needed
6. ⚠️ Verify all hooks exist (useTasks, useCalendarEvents, etc.)
7. ⚠️ Test all views after migration

---

## 📋 QUICK REFERENCE

### Views Status
- **Total Views:** 31
- **v11.0 Compliant:** 3 (today-view, iq-hub-view, governance-view)
- **Needs Updates:** 4 (navigation components)
- **To Remove:** 1 (brainstorming-view.tsx)

### Routes Status
- **Total Pages:** 78
- **Default Landing:** ⚠️ NOT `/today` (currently `/insights`)
- **Core Routes:** 7 in (app) group
- **Personal Routes:** 5 in (personal) group
- **CS Routes:** 4 in (cs) group
- **Business Routes:** 5 in (business) group

### Components Status
- **Navigation:** 4 files need fixes
- **Views:** 31 files (3 new, 1 old)
- **UI:** 23 files (compliant)
- **Other:** 40+ files (mostly compliant)

---

**Last Updated:** January 16, 2026  
**Status:** ✅ Views Copied, ⚠️ Navigation Fixes Remaining  
**Next:** Fix navigation components
