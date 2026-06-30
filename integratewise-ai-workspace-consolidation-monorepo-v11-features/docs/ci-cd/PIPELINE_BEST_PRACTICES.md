# CI/CD Pipeline Best Practices

## Overview

This document describes the CI/CD pipeline architecture, best practices, and quality gates for the IntegrateWise monorepo.

## Pipeline Architecture

### Workflow Structure

```
┌─────────────────┐
│   PR Created     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CI Workflow     │
│  ┌───────────┐  │
│  │   Lint    │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │ Typecheck │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │   Build   │  │
│  └───────────┘  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Vercel Preview   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  All Checks ✅   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Auto-Merge?     │
│  (if labeled)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Merge to Main   │
└─────────────────┘
```

## Quality Gates

### Gate 1: Lint

- **Command:** `pnpm lint`
- **Purpose:** Enforce code style and catch common errors
- **Failure Action:** Block merge
- **Cache:** Enabled via Turbo

### Gate 2: Type Check

- **Command:** `pnpm typecheck`
- **Purpose:** Ensure TypeScript types are correct
- **Failure Action:** Block merge
- **Cache:** Enabled via Turbo

### Gate 3: Build

- **Command:** `pnpm build`
- **Purpose:** Verify production build succeeds
- **Failure Action:** Block merge
- **Cache:** Enabled via Turbo
- **Dependencies:** Runs after lint and typecheck pass

### Gate 4: Vercel Preview

- **Trigger:** Automatic on PR creation
- **Purpose:** Verify deployment works
- **Failure Action:** Block merge (if configured as required check)
- **Manual Override:** Can be bypassed for documentation-only PRs

## Caching Strategy

### pnpm Store Cache

- Cached between CI runs
- Key: `pnpm-store-${{ hashFiles('pnpm-lock.yaml') }}`
- Restore key: `pnpm-store-`

### Turbo Cache

- Cached build artifacts
- Key: Based on task inputs (files, env vars)
- Stored in `.turbo` directory

### Node Modules Cache

- Cached via `actions/setup-node@v4` with `cache: 'pnpm'`
- Automatically handles pnpm cache

## Deterministic Builds

### Frozen Lockfile

All CI installs use `--frozen-lockfile` to ensure:
- Exact dependency versions
- No lockfile drift
- Reproducible builds

### Version Consistency

- **Node:** Specified in `.nvmrc` (currently 20.18.0)
- **pnpm:** Specified in `package.json` (>=10.0.0)
- CI uses exact versions from these files

## Preflight Checks

Before pushing, run locally:

```bash
pnpm preflight
```

This runs:
1. Install with frozen lockfile
2. Lint
3. Typecheck
4. Build

## Auto-Merge Rules

### When Auto-Merge Triggers

1. PR has `auto-merge` label
2. All required checks pass
3. PR is not a draft
4. PR is mergeable (no conflicts)

### Auto-Merge Method

- Uses **squash merge** to keep history clean
- Commit message: PR title + PR number

### Disabling Auto-Merge

Remove the `auto-merge` label or close/reopen the PR.

## Required Environment Variables

### CI Build

- `NEXT_PUBLIC_SUPABASE_URL` (or placeholder)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or placeholder)
- `DATABASE_URL` (or placeholder)

### Vercel Preview

- Automatically pulls from Vercel project settings
- No manual configuration needed

## Best Practices

### 1. Always Run Preflight Locally

```bash
pnpm preflight
```

### 2. Fix Lint Errors Before Pushing

```bash
pnpm lint --fix
```

### 3. Keep Dependencies Updated

```bash
pnpm update
pnpm install  # Updates lockfile
```

### 4. Test Build Locally

```bash
pnpm build
```

### 5. Check Vercel Preview

- Always check Vercel Preview deployment before merging
- Verify UI works as expected
- Check for runtime errors in browser console

## Troubleshooting

### CI Failing Locally But Passing in CI

- Check Node version: `node --version` should match `.nvmrc`
- Check pnpm version: `pnpm --version` should be >=10.0.0
- Clear cache: `rm -rf node_modules .turbo && pnpm install`

### Build Failing in CI

- Check build logs for specific errors
- Verify environment variables are set
- Check for missing dependencies

### Vercel Preview Failing

- Check Vercel dashboard logs
- Verify `vercel.json` configuration
- Check for environment variable issues

## Monitoring

### CI Metrics

- Track CI run times
- Monitor failure rates
- Identify flaky tests

### Build Metrics

- Track build times
- Monitor bundle sizes
- Track cache hit rates

## Future Improvements

- [ ] Add integration tests to CI
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Add performance budgets
- [ ] Add bundle size monitoring
- [ ] Add security scanning (Snyk/Dependabot)
