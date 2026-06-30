# IntegrateWise Monorepo

Customer Success data spine + AI agents for unified CRM, support, and billing operations.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run preflight checks (lint, typecheck, build)
pnpm preflight

# Build for production
pnpm build
```

## 📋 Multi-Agent Execution Status

**All phases complete!** See [`MULTI_AGENT_EXECUTION_COMPLETE.md`](./MULTI_AGENT_EXECUTION_COMPLETE.md) for full details.

### ✅ Completed Phases

- **Phase 0**: Build Pipeline Hardening
- **Phase 1**: Pipeline Best Practices  
- **Phase 2**: Payments/Subscriptions/Paywall Foundation
- **Phase 3**: Core Features (All 9 features)

### 🎯 Key Features

- **SUPPORT-026**: Support Tools with context snapshot
- **BROWSER-006**: Optional Browser Memory (privacy-first)
- **LOADER-007**: Schema Mapping UI (BYOT)
- **IQHUB-008**: Webhook Ingestion with idempotency
- **CS-019**: Health Score Engine + Risk Detection
- **IQCLONE-010**: Proactive Shadow Mode
- **INSIGHTS-013**: Pattern Detection Engine
- **GOALS-015**: Progress Calculation
- **METRICS-016**: Lens-Specific KPIs

## 🏗️ Architecture

### Frontend Location

The primary Customer Success landing page is deployed from the **monorepo root** (`.`), using **Next.js App Router** (`app/` directory).

| Path | Description |
|------|-------------|
| `app/` | Next.js App Router pages |
| `components/` | React components for landing page |
| `config/landing.json` | JSON-driven landing page content |
| `styles/theme.css` | WCAG AA design tokens |

### Monorepo Structure

```
integratewise-monorepo/
├── apps/
│   ├── integrationwise-os/     # Main OS application
│   ├── hub-frontend-app/        # Hub frontend
│   ├── integratewise-core-engine/  # Core engine
│   └── integratewise-webhooks/     # Webhook workers
├── packages/
│   ├── types/                   # Shared TypeScript types
│   ├── ui/                      # Shared UI components
│   └── lib/                     # Shared utilities
├── .github/workflows/           # CI/CD workflows
└── docs/                        # Documentation
```

## 🔧 Development

### Build Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm test` | Run tests |
| `pnpm preflight` | Run all checks (install, lint, typecheck, build) |

### Workspace Commands

```bash
# Build specific app
pnpm build:os
pnpm build:hub
pnpm build:engine

# Dev specific app
pnpm dev:os
pnpm dev:hub
pnpm dev:engine
```

## 🚢 Deployment

### Vercel Deployment

**Project Settings:**

| Setting | Value |
|---------|-------|
| Root Directory | `.` (monorepo root) |
| Framework Preset | Next.js |
| Install Command | `pnpm install` |
| Build Command | `pnpm build` |
| Output Directory | `.next` |
| Node.js Version | 20.x |

### Configuration Files

- `vercel.json` - Vercel build configuration
- `.nvmrc` - Node.js version specification (20.18.0)
- `next.config.mjs` - Next.js configuration

## ✅ Quality Gates

### Required Checks

- **Build**: `pnpm build` must pass
- **Types**: TypeScript compilation (via `next build`)
- **Lint**: ESLint (via `next lint`)

### CI/CD Pipeline

- Lint job (enforced, blocks merge)
- Typecheck job (enforced, blocks merge)
- Build job (enforced, blocks merge)
- Auto-merge workflow (when all checks pass)

See [`docs/ci-cd/PIPELINE_BEST_PRACTICES.md`](./docs/ci-cd/PIPELINE_BEST_PRACTICES.md) for details.

## 📚 Documentation

- [`MULTI_AGENT_EXECUTION_COMPLETE.md`](./MULTI_AGENT_EXECUTION_COMPLETE.md) - Complete implementation guide
- [`docs/ci-cd/BRANCH_PROTECTION.md`](./docs/ci-cd/BRANCH_PROTECTION.md) - Branch protection setup
- [`docs/ci-cd/PIPELINE_BEST_PRACTICES.md`](./docs/ci-cd/PIPELINE_BEST_PRACTICES.md) - Pipeline best practices

## 🔐 Security

- Webhook signature verification
- Replay protection (5-minute window)
- Idempotency enforced
- Audit trail comprehensive
- No secrets in logs
- Least privilege access

## 📊 Features

### Payments & Subscriptions
- Paywall components (PaywallGate, UpgradePrompt, EntitlementBanner)
- Webhook idempotency
- Admin override utilities (dev/staging only)
- Comprehensive audit trail

### Support Tools
- Contact Support form with context snapshot
- Email-based workflow
- Request tracking

### Browser Memory
- Optional browser memory (disabled by default)
- Privacy-first design
- Clear consent flow
- View/delete controls

### Health Score Engine
- Overall health score (0-100)
- Technical, adoption, engagement scores
- Risk detection
- Recommendations generation

### Pattern Detection
- Batch and incremental processing
- Trend, anomaly, cycle detection
- Confidence scoring

### Goals & Progress
- Goal completion tracking
- Milestone tracking
- Weighted progress

### Lens-Specific KPIs
- Personal Lens: Task completion, productivity
- Business Lens: Revenue, deals, pipeline
- CS Lens: Health score, adoption, NPS

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific test suite
pnpm test webhook-idempotency
pnpm test entitlement-enforcement
```

## 📦 Database Migrations

Apply migrations in order:

```bash
# 1. Billing audit enhancements
psql $DATABASE_URL -f apps/integrationwise-os/supabase/migrations/20260113_billing_audit_enhancements.sql

# 2. Support requests
psql $DATABASE_URL -f apps/integrationwise-os/supabase/migrations/20260113_support_requests.sql

# 3. Phase 3 tables
psql $DATABASE_URL -f apps/integrationwise-os/supabase/migrations/20260113_phase3_tables.sql

# 4. Shadow jobs
psql $DATABASE_URL -f apps/integrationwise-os/supabase/migrations/20260113_shadow_jobs.sql
```

## 🤝 Contributing

1. Run preflight: `pnpm preflight`
2. Create feature branch
3. Make changes
4. Ensure CI passes
5. Create PR with `auto-merge` label (if all checks pass)

## 📄 License

MIT

---

**Status:** ✅ All phases complete - Production ready
