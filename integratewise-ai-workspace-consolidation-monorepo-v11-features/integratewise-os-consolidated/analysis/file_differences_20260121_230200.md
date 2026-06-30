# File Differences Analysis - Cherry-Pick Workflow Impact

**Generated:** Wed Jan 21 23:02:00 IST 2026
**Purpose:** Identify file-level differences between branches after cherry-pick operations

---

## Summary

This report analyzes file differences between branches to understand what files would be affected by cherry-picking operations.

---

## File Count Comparison

| Branch | File Count |
|--------|------------|
| `main` | 0 |
| `dev` | 0 |
| `dev-consolidated-app` | 560 |

---

## Main vs Dev Branch File Differences

### Statistics
- **Added:** 128 files
- **Modified:** 24 files
- **Deleted:** 568 files
- **Total Changes:** 720 files

### Added Files (A)
```
BRAINSTORMING_SETUP.md
BUG_REPORT.md
ENV_VARIABLES.md
GOOGLE_SHEETS_SETUP.md
LAYOUT_AUDIT_REPORT.md
MEASUREMENT.md
SECURITY.md
SLACK_DISCORD_SETUP.md
STEP_BY_STEP_FIX.md
SYSTEM_OVERVIEW.md
WEBHOOK_SCHEDULER_SETUP.md
app/(app)/admin/audit/page.tsx
app/(app)/admin/billing/page.tsx
app/(app)/admin/users/page.tsx
app/(app)/brainstorming/page.tsx
app/(app)/business/clients/page.tsx
app/(app)/business/crm/leads/page.tsx
app/(app)/business/crm/pipeline/page.tsx
app/(app)/business/marketing/content/page.tsx
app/(app)/business/products/page.tsx
app/(app)/business/services/page.tsx
app/(app)/business/website/page.tsx
app/(app)/cs/health/page.tsx
app/(app)/goals/page.tsx
app/(app)/insights/page.tsx
app/(app)/integrations/page.tsx
app/(app)/iq-hub/page.tsx
app/(app)/knowledge/page.tsx
app/(app)/layout.tsx
app/(app)/loader/page.tsx
```

### Modified Files (M)
```
.github/workflows/ci.yml
.github/workflows/deploy-core-engine.yml
.github/workflows/deploy-hub.yml
.github/workflows/deploy-os.yml
.github/workflows/deploy-webhooks.yml
.gitignore
DEPLOYMENT_CHECKLIST.md
README.md
app/globals.css
app/layout.tsx
app/page.tsx
components/theme-provider.tsx
components/ui/badge.tsx
components/ui/button.tsx
components/ui/card.tsx
components/ui/input.tsx
next.config.mjs
package.json
pnpm-lock.yaml
postcss.config.mjs
styles/globals.css
tailwind.config.ts
tsconfig.json
vercel.json
```

### Deleted Files (D)
```
.claude/settings.json
.editorconfig
.github/workflows/auto-merge.yml
.npmrc
.nvmrc
.prettierignore
.prettierrc
ACTIVE_WEBHOOK_SYSTEM.md
AI_INSIGHTS_AND_LOADER_STATUS.md
AI_LOADER_PART_B_COMPLETE.md
AI_LOADER_TWO_STAGE_IMPLEMENTATION.md
BRAINSTORMING_LAYER_ARCHITECTURE.md
BUILD_CLEANUP_SUMMARY.md
CLOUDFLARE_WORKERS_ARCHITECTURE.md
COMPREHENSIVE_CODE_AUDIT.md
CONSOLIDATION_COMPLETE.md
DEPLOYMENT.md
DEPLOYMENT_AUDIT_REPORT.md
DEPLOYMENT_CONFIG.md
IMPLEMENTATION_COMPLETE_SUMMARY.md
IMPLEMENTATION_STATUS.md
INTEGRATION_COMPLETE.md
MASTER_ARCHITECTURE.md
MASTER_IMPLEMENTATION_GUIDE.md
MASTER_PLAN_AND_NEXT_STEPS.md
MERGE_AND_MARKETING_REMOVAL_PLAN.md
MULTI_AGENT_EXECUTION_COMPLETE.md
PROJECT_ANALYSIS_SUMMARY.md
QUICK_START_GUIDE.md
README_IMPLEMENTATION.md
```

---

## Main vs Dev-Consolidated-App File Differences

### Statistics
- **Added:** 1712 files
- **Modified:** 44 files
- **Deleted:** 42 files
- **Total Changes:** 1798 files

### Added Files (A)
```
.github/CODEOWNERS
.github/actions/validate-secrets/action.yml
.github/workflows/deploy-unified.yml
CHERRY_PICK_SUMMARY.md
CONSOLIDATION_MAP.json
Gemini_Generated_Image_ifuq9jifuq9jifuq.png
INTEGRATEWISE_OS_MASTER_CONSOLIDATION.md
MISSED_FILES_CHERRY_PICK.md
V11_CANONICAL_SPEC.md
V11_NOMISS_COMPLETE.json
ai-loader-format-preserve.js
ai-loader-notion-updater.js
ai-loader-schema-exact.js
apps/integratewise-core-engine/.gitignore
apps/integratewise-core-engine/.npmrc
apps/integratewise-core-engine/DEPLOYMENT.md
apps/integratewise-core-engine/PACKAGE_CONTENTS.md
apps/integratewise-core-engine/README.md
apps/integratewise-core-engine/migrations/001_create_spine_events.sql
apps/integratewise-core-engine/migrations/002_create_ai_tasks.sql
apps/integratewise-core-engine/migrations/README.md
apps/integratewise-core-engine/src/index.ts
apps/integratewise-core-engine/src/lib/ai-router.ts
apps/integratewise-core-engine/src/lib/database.ts
apps/integratewise-core-engine/src/types/env.ts
apps/integratewise-core-engine/src/types/spine-event.ts
apps/integratewise-core-engine/wrangler.toml
apps/integratewise-webhooks/README.md
apps/integratewise-webhooks/WEBFLOW_INTEGRATION.md
apps/integratewise-webhooks/WEBFLOW_SITE_ENHANCEMENT.md
apps/integratewise-webhooks/WEBFORM_ENDPOINT.md
apps/integratewise-webhooks/WEBHOOK_SYSTEM.md
apps/integratewise-webhooks/scripts/webflow-content-generator.ts
apps/integratewise-webhooks/scripts/webflow-enhance-site.ts
apps/integratewise-webhooks/scripts/webflow-quick-start.sh
apps/integratewise-webhooks/scripts/webflow-site-audit.ts
apps/integratewise-webhooks/src/handlers/ai-relay.ts
apps/integratewise-webhooks/src/handlers/api.ts
apps/integratewise-webhooks/src/handlers/cron.ts
apps/integratewise-webhooks/src/handlers/integrations.ts
apps/integratewise-webhooks/src/handlers/loaders.ts
apps/integratewise-webhooks/src/handlers/tools.ts
apps/integratewise-webhooks/src/handlers/webflow.ts
apps/integratewise-webhooks/src/handlers/webform.ts
apps/integratewise-webhooks/src/lib/generic-handler.ts
apps/integratewise-webhooks/src/lib/tool-registry.ts
apps/integratewise-webhooks/src/lib/webflow-client.ts
apps/integrationwise-os/DIRECTORY_CONTENTS.md
apps/integrationwise-os/STRUCTURE_COMPARISON.md
apps/integrationwise-os/app/api/webhooks/ai-relay/route.ts
```

### Modified Files (M)
```
.claude/settings.json
.github/workflows/changelog-check.yml
.github/workflows/ci.yml
.gitignore
apps/integratewise-core-engine/package.json
apps/integratewise-core-engine/tsconfig.json
apps/integratewise-webhooks/package.json
apps/integratewise-webhooks/src/handlers/discord.ts
apps/integratewise-webhooks/src/handlers/notion.ts
apps/integratewise-webhooks/src/handlers/slack.ts
apps/integratewise-webhooks/src/handlers/stripe.ts
apps/integratewise-webhooks/src/index.ts
apps/integratewise-webhooks/src/lib/idempotency.ts
apps/integratewise-webhooks/wrangler.toml
apps/integrationwise-os/.gitignore
apps/integrationwise-os/app/(auth)/login/page.tsx
apps/integrationwise-os/app/(auth)/signup/page.tsx
apps/integrationwise-os/app/(personal)/today/page.tsx
apps/integrationwise-os/app/api/webhooks/slack/route.ts
apps/integrationwise-os/app/auth/callback/route.ts
apps/integrationwise-os/app/brainstorming/page.tsx
apps/integrationwise-os/app/layout.tsx
apps/integrationwise-os/components/command-search.tsx
apps/integrationwise-os/components/demo-banner.tsx
apps/integrationwise-os/components/integratewise-logo.tsx
apps/integrationwise-os/components/sidebar.tsx
apps/integrationwise-os/components/views/brainstorming-view.tsx
apps/integrationwise-os/components/views/home-view.tsx
apps/integrationwise-os/components/views/leads-view.tsx
apps/integrationwise-os/components/views/strategic-hub-view.tsx
apps/integrationwise-os/lib/auth.ts
apps/integrationwise-os/lib/cms/adapters/notion.ts
apps/integrationwise-os/lib/cms/types.ts
apps/integrationwise-os/lib/hooks/use-data.ts
apps/integrationwise-os/lib/supabase/middleware.ts
apps/integrationwise-os/next-env.d.ts
apps/integrationwise-os/public/icon.svg
apps/integrationwise-os/public/logo-icon.svg
apps/integrationwise-os/public/logo.svg
apps/integrationwise-os/public/logomark.svg
apps/integrationwise-os/tsconfig.json
pnpm-lock.yaml
public/icon.svg
vercel.json
```

### Deleted Files (D)
```
ACTIVE_WEBHOOK_SYSTEM.md
AI_INSIGHTS_AND_LOADER_STATUS.md
AI_LOADER_PART_B_COMPLETE.md
AI_LOADER_TWO_STAGE_IMPLEMENTATION.md
BUILD_CLEANUP_SUMMARY.md
CLOUDFLARE_WORKERS_ARCHITECTURE.md
COMPREHENSIVE_CODE_AUDIT.md
CONSOLIDATION_COMPLETE.md
DEPLOYMENT_AUDIT_REPORT.md
DEPLOYMENT_CONFIG.md
IMPLEMENTATION_COMPLETE_SUMMARY.md
IMPLEMENTATION_STATUS.md
INTEGRATION_COMPLETE.md
MASTER_ARCHITECTURE.md
MASTER_IMPLEMENTATION_GUIDE.md
MASTER_PLAN_AND_NEXT_STEPS.md
MERGE_AND_MARKETING_REMOVAL_PLAN.md
MULTI_AGENT_EXECUTION_COMPLETE.md
PROJECT_ANALYSIS_SUMMARY.md
README_IMPLEMENTATION.md
READY_TO_RUN.md
REVISED_MASTER_PLAN.md
RUNBOOKS.md
SLO_SLI.md
SSOT_COMPLIANCE.md
STAGE_2_IMPLEMENTATION_COMPLETE.md
SYSTEM_ARCHITECTURES_SCAN_REPORT.md
THREE_LENS_IMPLEMENTATION_PLAN.md
VERSION_COMPARISON.md
apps/hub-frontend-app/next.config.ts
apps/hub-frontend-app/package.json
apps/hub-frontend-app/postcss.config.js
apps/hub-frontend-app/src/app/globals.css
apps/hub-frontend-app/src/app/layout.tsx
apps/hub-frontend-app/src/app/page.tsx
apps/hub-frontend-app/tailwind.config.ts
apps/hub-frontend-app/tsconfig.json
apps/integratewise-core-engine/src/server.ts
apps/integratewise-core-engine/vercel.json
integratewise-multi-department.md
integration_hardening_spec.md
schema-discovery.md
```

---

## Dev vs Dev-Consolidated-App File Differences

### Statistics
- **Added:** 2184 files
- **Modified:** 22 files
- **Deleted:** 74 files
- **Total Changes:** 2280 files

### Added Files (A)
```
.claude/settings.json
.editorconfig
.github/CODEOWNERS
.github/actions/validate-secrets/action.yml
.github/workflows/auto-merge.yml
.github/workflows/deploy-unified.yml
.npmrc
.nvmrc
.prettierignore
.prettierrc
BRAINSTORMING_LAYER_ARCHITECTURE.md
CHERRY_PICK_SUMMARY.md
CONSOLIDATION_MAP.json
DEPLOYMENT.md
Gemini_Generated_Image_ifuq9jifuq9jifuq.png
INTEGRATEWISE_OS_MASTER_CONSOLIDATION.md
MISSED_FILES_CHERRY_PICK.md
QUICK_START_GUIDE.md
Updated_nomiss.json
V11_CANONICAL_SPEC.md
V11_NOMISS_COMPLETE.json
ai-loader-format-preserve.js
ai-loader-notion-updater.js
ai-loader-schema-exact.js
apps/integratewise-core-engine/.npmrc
apps/integratewise-core-engine/DEPLOYMENT.md
apps/integratewise-core-engine/PACKAGE_CONTENTS.md
apps/integratewise-core-engine/README.md
apps/integratewise-core-engine/eslint.config.js
apps/integratewise-core-engine/migrations/001_create_spine_events.sql
apps/integratewise-core-engine/migrations/002_create_ai_tasks.sql
apps/integratewise-core-engine/migrations/README.md
apps/integratewise-core-engine/package.json
apps/integratewise-core-engine/src/index.ts
apps/integratewise-core-engine/src/lib/ai-router.ts
apps/integratewise-core-engine/src/lib/database.ts
apps/integratewise-core-engine/src/types/env.ts
apps/integratewise-core-engine/src/types/spine-event.ts
apps/integratewise-core-engine/tsconfig.json
apps/integratewise-core-engine/wrangler.toml
apps/integratewise-webhooks/README.md
apps/integratewise-webhooks/WEBFLOW_INTEGRATION.md
apps/integratewise-webhooks/WEBFLOW_SITE_ENHANCEMENT.md
apps/integratewise-webhooks/WEBFORM_ENDPOINT.md
apps/integratewise-webhooks/WEBHOOK_SYSTEM.md
apps/integratewise-webhooks/eslint.config.js
apps/integratewise-webhooks/package.json
apps/integratewise-webhooks/scripts/webflow-content-generator.ts
apps/integratewise-webhooks/scripts/webflow-enhance-site.ts
apps/integratewise-webhooks/scripts/webflow-quick-start.sh
```

### Modified Files (M)
```
.github/workflows/changelog-check.yml
.github/workflows/ci.yml
.gitignore
DEPLOYMENT_CHECKLIST.md
README.md
app/globals.css
app/layout.tsx
app/page.tsx
components/theme-provider.tsx
components/ui/badge.tsx
components/ui/button.tsx
components/ui/card.tsx
components/ui/input.tsx
next.config.mjs
package.json
pnpm-lock.yaml
postcss.config.mjs
public/icon.svg
styles/globals.css
tailwind.config.ts
tsconfig.json
vercel.json
```

### Deleted Files (D)
```
GOOGLE_SHEETS_SETUP.md
LAYOUT_AUDIT_REPORT.md
MEASUREMENT.md
SECURITY.md
STEP_BY_STEP_FIX.md
app/(app)/admin/audit/page.tsx
app/(app)/admin/billing/page.tsx
app/(app)/admin/users/page.tsx
app/(app)/brainstorming/page.tsx
app/(app)/business/clients/page.tsx
app/(app)/business/crm/leads/page.tsx
app/(app)/business/crm/pipeline/page.tsx
app/(app)/business/marketing/content/page.tsx
app/(app)/business/products/page.tsx
app/(app)/business/services/page.tsx
app/(app)/business/website/page.tsx
app/(app)/cs/health/page.tsx
app/(app)/goals/page.tsx
app/(app)/insights/page.tsx
app/(app)/integrations/page.tsx
app/(app)/iq-hub/page.tsx
app/(app)/knowledge/page.tsx
app/(app)/layout.tsx
app/(app)/loader/page.tsx
app/(app)/metrics/page.tsx
app/(app)/settings/page.tsx
app/(app)/shadow/page.tsx
app/(app)/spine/page.tsx
app/(app)/tasks/page.tsx
app/(app)/today/page.tsx
app/admin/page.tsx
app/api/connectors/[provider]/callback/route.ts
app/api/connectors/[provider]/connect/route.ts
app/api/connectors/[provider]/disconnect/route.ts
app/api/connectors/route.ts
app/api/cron/spend-insights/route.ts
app/insights/preview/page.tsx
app/login/page.tsx
app/signup-success/page.tsx
app/signup/page.tsx
components/app-shell.tsx
components/integratewise-logo.tsx
components/layouts/app-shell.tsx
components/layouts/page-layouts.tsx
components/sidebar.tsx
components/spine/empty-state.tsx
components/spine/metric-card.tsx
components/spine/page-header.tsx
components/views/admin-dashboard-view.tsx
components/views/integrations-view.tsx
```

---

## Key File Categories

### Configuration Files
### Modified Configuration Files
```
.claude/settings.json
.github/workflows/changelog-check.yml
.github/workflows/ci.yml
apps/integratewise-core-engine/package.json
apps/integratewise-core-engine/tsconfig.json
apps/integratewise-webhooks/package.json
apps/integrationwise-os/next-env.d.ts
apps/integrationwise-os/tsconfig.json
pnpm-lock.yaml
vercel.json
```

### Source Code Files
### Modified Source Files
```
apps/integratewise-webhooks/src/handlers/discord.ts
apps/integratewise-webhooks/src/handlers/notion.ts
apps/integratewise-webhooks/src/handlers/slack.ts
apps/integratewise-webhooks/src/handlers/stripe.ts
apps/integratewise-webhooks/src/index.ts
apps/integratewise-webhooks/src/lib/idempotency.ts
apps/integrationwise-os/app/(auth)/login/page.tsx
apps/integrationwise-os/app/(auth)/signup/page.tsx
apps/integrationwise-os/app/(personal)/today/page.tsx
apps/integrationwise-os/app/api/webhooks/slack/route.ts
apps/integrationwise-os/app/auth/callback/route.ts
apps/integrationwise-os/app/brainstorming/page.tsx
apps/integrationwise-os/app/layout.tsx
apps/integrationwise-os/components/command-search.tsx
apps/integrationwise-os/components/demo-banner.tsx
apps/integrationwise-os/components/integratewise-logo.tsx
apps/integrationwise-os/components/sidebar.tsx
apps/integrationwise-os/components/views/brainstorming-view.tsx
apps/integrationwise-os/components/views/home-view.tsx
apps/integrationwise-os/components/views/leads-view.tsx
apps/integrationwise-os/components/views/strategic-hub-view.tsx
apps/integrationwise-os/lib/auth.ts
apps/integrationwise-os/lib/cms/adapters/notion.ts
apps/integrationwise-os/lib/cms/types.ts
apps/integrationwise-os/lib/hooks/use-data.ts
apps/integrationwise-os/lib/supabase/middleware.ts
apps/integrationwise-os/next-env.d.ts
```

### Documentation Files
### Modified Documentation
```
ACTIVE_WEBHOOK_SYSTEM.md
AI_INSIGHTS_AND_LOADER_STATUS.md
AI_LOADER_PART_B_COMPLETE.md
AI_LOADER_TWO_STAGE_IMPLEMENTATION.md
BUILD_CLEANUP_SUMMARY.md
CHERRY_PICK_SUMMARY.md
CLOUDFLARE_WORKERS_ARCHITECTURE.md
COMPREHENSIVE_CODE_AUDIT.md
CONSOLIDATION_COMPLETE.md
DEPLOYMENT_AUDIT_REPORT.md
DEPLOYMENT_CONFIG.md
IMPLEMENTATION_COMPLETE_SUMMARY.md
IMPLEMENTATION_STATUS.md
INTEGRATEWISE_OS_MASTER_CONSOLIDATION.md
INTEGRATION_COMPLETE.md
MASTER_ARCHITECTURE.md
MASTER_IMPLEMENTATION_GUIDE.md
MASTER_PLAN_AND_NEXT_STEPS.md
MERGE_AND_MARKETING_REMOVAL_PLAN.md
MISSED_FILES_CHERRY_PICK.md
MULTI_AGENT_EXECUTION_COMPLETE.md
PROJECT_ANALYSIS_SUMMARY.md
README_IMPLEMENTATION.md
READY_TO_RUN.md
REVISED_MASTER_PLAN.md
RUNBOOKS.md
SLO_SLI.md
SSOT_COMPLIANCE.md
STAGE_2_IMPLEMENTATION_COMPLETE.md
SYSTEM_ARCHITECTURES_SCAN_REPORT.md
```

---

**Report Generated:** Wed Jan 21 23:02:03 IST 2026
