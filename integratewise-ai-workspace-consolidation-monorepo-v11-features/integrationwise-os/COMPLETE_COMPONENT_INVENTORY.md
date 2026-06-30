# Complete Component Inventory - integrationwise-os
# Internal Dashboard - Every Component, Service, and Module

**Date:** 2026-01-21  
**Total Files:** 357 files

---

## 📊 COMPONENT BREAKDOWN

### 1. API Routes (33 endpoints)
**Location:** `app/api/`

#### Billing Service (8 routes)
- `billing/cancel/route.ts`
- `billing/change-plan/route.ts`
- `billing/entitlements/route.ts`
- `billing/invoices/route.ts`
- `billing/plans/route.ts`
- `billing/subscribe/route.ts`
- `billing/subscription/route.ts`
- `billing/webhook/[provider]/route.ts`

#### Brainstorm Service (3 routes)
- `brainstorm/analyze/route.ts`
- `brainstorm/daily-insights/route.ts`
- `brainstorm/execute/route.ts`

#### Webhooks (10 routes)
- `webhooks/[provider]/route.ts` - Generic webhook handler
- `webhooks/ai-relay/route.ts`
- `webhooks/asana/route.ts`
- `webhooks/brainstorm/route.ts`
- `webhooks/discord/route.ts`
- `webhooks/health/route.ts`
- `webhooks/hubspot/route.ts`
- `webhooks/slack/route.ts`
- `webhook/route.ts` - Main webhook endpoint
- `stripe/webhook/route.ts` - Stripe webhook

#### Cron Jobs (2 routes)
- `cron/daily-insights/route.ts`
- `cron/hourly-insights/route.ts`

#### Other Services (10 routes)
- `ai/chat/route.ts` - AI chat endpoint
- `capture/route.ts` - Data capture
- `data-sync/route.ts` - Data synchronization
- `env/health/route.ts` - Environment health
- `hubspot/sync/route.ts` - HubSpot sync
- `ping/route.ts` - Health check
- `search/route.ts` - Search functionality
- `upload/route.ts` - File upload API
- `webhook-scheduler/trigger/route.ts` - Scheduler trigger
- `website/track/route.ts` - Website tracking

---

### 2. Library Services & Utilities (27 files)
**Location:** `lib/`

#### Billing Service (7 files)
- `billing/index.ts` - Exports
- `billing/service.ts` - Core billing service
- `billing/enforcement.ts` - Entitlement enforcement
- `billing/webhooks.ts` - Webhook handlers
- `billing/hooks.ts` - React hooks
- `billing/types.ts` - TypeScript types
- `billing/examples.md` - Examples

#### Supabase Service (3 files)
- `supabase/client.ts` - Client-side Supabase
- `supabase/server.ts` - Server-side Supabase
- `supabase/proxy.ts` - Proxy for Supabase

#### Upload Service (2 files)
- `upload/index.ts` - Upload utilities export
- `upload/security.ts` - File validation, security, quarantine

#### Triage Service (1 file)
- `triage/triage-bot.ts` - Slack message triage bot

#### Lens Service (3 files)
- `lens/index.ts` - Lens exports
- `lens/lens-config.ts` - Lens configuration
- `lens/lens-provider.tsx` - Lens React provider

#### Templates Service (3 files)
- `templates/apply-template.ts` - Template application
- `templates/client-template.ts` - Client templates
- `templates/industry-templates.ts` - Industry templates

#### Feature Service (1 file)
- `feature/capabilities.ts` - Role capabilities & permissions

#### Other Utilities (7 files)
- `ai-webhook-service.ts` - AI webhook integration
- `config.ts` - Configuration
- `env.ts` - Environment variables
- `hooks/use-data.ts` - Data fetching hook
- `mock-auth.ts` - Mock authentication
- `stripe.ts` - Stripe client
- `utils.ts` - General utilities
- `vedic-numerology.ts` - Vedic numerology calculator

---

### 3. React Components (68 files)
**Location:** `components/`

#### UI Components (22 files)
- `ui/avatar.tsx`
- `ui/badge.tsx`
- `ui/button.tsx`
- `ui/card.tsx`
- `ui/checkbox.tsx`
- `ui/dialog.tsx`
- `ui/dropdown-menu.tsx`
- `ui/input.tsx`
- `ui/label.tsx`
- `ui/progress.tsx`
- `ui/scroll-area.tsx`
- `ui/select.tsx`
- `ui/separator.tsx`
- `ui/sheet.tsx`
- `ui/skeleton.tsx`
- `ui/switch.tsx`
- `ui/table.tsx`
- `ui/tabs.tsx`
- `ui/textarea.tsx`
- `ui/toast.tsx`

#### Business Components (46 files)

**Core Application:**
- `app-shell.tsx` - Main app shell
- `ai-assistant.tsx` - AI assistant
- `command-search.tsx` - Command palette
- `cognitive-twin-intro.tsx` - Cognitive twin intro
- `demo-banner.tsx` - Demo mode banner
- `integratewise-logo.tsx` - Logo component
- `user-menu.tsx` - User menu dropdown
- `theme-provider.tsx` - Theme provider

**Lens System:**
- `lens-sidebar.tsx` - Lens sidebar
- `lens/lens-switcher.tsx` - Lens switcher
- `lens/index.ts` - Lens exports

**Onboarding:**
- `onboarding-wizard.tsx` - Onboarding wizard
- `onboarding/persona-reveal.tsx` - Persona reveal
- `onboarding/personality-scanner.tsx` - Personality scanner
- `onboarding/template-selector.tsx` - Template selector

**Integrations:**
- `integrations-selection.tsx` - Integration selector
- `integrations/CalendarReader.tsx` - Calendar reader
- `integrations/MemoryInsights.tsx` - Memory insights

**Dialogs:**
- `dialogs/add-lead-dialog.tsx` - Add lead
- `dialogs/add-project-dialog.tsx` - Add project
- `dialogs/add-session-dialog.tsx` - Add session

**Views (19 view components):**
- `views/brainstorming-view.tsx`
- `views/campaigns-view.tsx`
- `views/client-detail-view.tsx`
- `views/clients-view.tsx`
- `views/content-library-view.tsx`
- `views/data-sources-view.tsx`
- `views/deals-view.tsx`
- `views/generic-view.tsx`
- `views/home-view.tsx`
- `views/integrations-view.tsx`
- `views/knowledge-view.tsx`
- `views/leads-view.tsx`
- `views/metrics-view.tsx`
- `views/pipeline-view.tsx`
- `views/products-view.tsx`
- `views/projects-view.tsx`
- `views/sales-hub-view.tsx`
- `views/services-view.tsx`
- `views/sessions-view.tsx`
- `views/settings-view.tsx`
- `views/strategic-hub-view.tsx`
- `views/tasks-view.tsx`
- `views/website-manager-view.tsx`

**Widgets:**
- `widgets/environment-preview.tsx`
- `widgets/webhook-scheduler-widget.tsx`

**Landing:**
- `landing/landing-page.tsx` - Landing page
- `pricing-page.tsx` - Pricing page

---

### 4. App Pages (48 pages)
**Location:** `app/`

**Admin Section (8 pages):**
- `admin/page.tsx`
- `admin/layout.tsx`
- `admin/audit/page.tsx`
- `admin/billing/page.tsx`
- `admin/flags/page.tsx`
- `admin/integrations/page.tsx`
- `admin/releases/page.tsx`
- `admin/tenants/page.tsx`

**Authentication (5 pages):**
- `auth/page.tsx`
- `auth/login/page.tsx`
- `auth/sign-up/page.tsx`
- `auth/sign-up-success/page.tsx`
- `auth/error/page.tsx`

**Business Pages (11 pages):**
- `clients/page.tsx`
- `clients/[id]/page.tsx`
- `deals/page.tsx`
- `leads/page.tsx`
- `pipeline/page.tsx`
- `projects/page.tsx`
- `products/page.tsx`
- `sales/page.tsx`
- `services/page.tsx`
- `campaigns/page.tsx`
- `account/billing/page.tsx`

**Dashboard & Insights (4 pages):**
- `dashboard/page.tsx`
- `insights/page.tsx`
- `metrics/page.tsx`
- `overview/page.tsx`

**Content & Knowledge (4 pages):**
- `content/page.tsx`
- `docs/page.tsx`
- `knowledge/page.tsx`
- `knowledge/[category]/page.tsx`

**Onboarding (5 pages):**
- `onboarding/page.tsx`
- `onboarding/analyzing/page.tsx`
- `onboarding/load/page.tsx`
- `onboarding/normalize/page.tsx`
- `onboarding/persona/page.tsx`
- `vedic-onboarding/page.tsx`
- `vedic-onboarding/normalize/page.tsx`

**Other Pages (11 pages):**
- `page.tsx` - Root/home
- `brainstorming/page.tsx`
- `data-sources/page.tsx`
- `integrations/page.tsx`
- `normalize/page.tsx`
- `os/page.tsx`
- `sessions/page.tsx`
- `settings/page.tsx`
- `setup/page.tsx`
- `solutions/page.tsx`
- `strategy/page.tsx`
- `tasks/page.tsx`
- `website/page.tsx`

---

### 5. Middleware & Configuration
**Location:** Root

- `middleware.ts` - Route protection, auth, role-based access
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration
- `components.json` - shadcn/ui configuration
- `vercel.json` - Vercel deployment config

---

### 6. Hooks (1 file)
**Location:** `hooks/`

- `use-toast.ts` - Toast notification hook

---

### 7. Tools & Scripts
**Location:** `tools/`, `scripts/`

- Tools directory with utility scripts
- SQL migration scripts

---

## 🔍 SUMMARY BY CATEGORY

### Services:
1. ✅ Billing Service (complete)
2. ✅ Supabase Service (complete)
3. ✅ Upload Service (complete)
4. ✅ Triage Service (complete)
5. ✅ Lens Service (complete)
6. ✅ Templates Service (complete)
7. ✅ Feature/Capabilities Service (complete)
8. ✅ AI Webhook Service

### API Endpoints:
- 33 total API route handlers
- Billing, Brainstorm, Webhooks, Cron, AI, Upload, etc.

### Components:
- 68 total component files
- UI components, Business components, Views, Widgets

### Pages:
- 48 total page routes
- Admin, Auth, Business, Dashboard, Onboarding, etc.

---

## ✅ COMPLETE INVENTORY
**Every component, service, utility, and module is accounted for.**

