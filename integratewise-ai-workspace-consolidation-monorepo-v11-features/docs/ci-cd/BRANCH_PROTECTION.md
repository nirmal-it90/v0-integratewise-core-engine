# Branch Protection Rules

## Overview

This document describes the branch protection rules and required status checks for the `main` branch.

## Required Status Checks

The following checks must pass before a PR can be merged into `main`:

1. **Lint** - ESLint checks (`pnpm lint`)
2. **Type Check** - TypeScript type checking (`pnpm typecheck`)
3. **Build** - Production build (`pnpm build`)
4. **Vercel Preview** - Vercel Preview deployment (if applicable)

## Branch Protection Settings

### Required Settings

- ✅ Require a pull request before merging
- ✅ Require approvals: 1 (or 0 for auto-merge)
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings

### Required Status Checks

Add the following checks to the "Required status checks" list:

```
lint
typecheck
build
```

### Optional: Auto-Merge

To enable auto-merge for PRs with the `auto-merge` label:

1. Ensure the `.github/workflows/auto-merge.yml` workflow is enabled
2. Add the `auto-merge` label to PRs that should auto-merge when all checks pass
3. Auto-merge will use squash merge method

## Setting Up Branch Protection

### Via GitHub UI

1. Go to Settings → Branches
2. Click "Add rule" or edit existing rule for `main`
3. Configure as described above
4. Save changes

### Via GitHub API

```bash
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["lint","typecheck","build"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

## Preflight Checks

Before creating a PR, run the preflight script locally:

```bash
pnpm preflight
```

This runs:
- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

## Troubleshooting

### Check Failing Locally

If a check fails locally but passes in CI:
- Ensure you're using the correct Node version (`nvm use` or check `.nvmrc`)
- Ensure you're using pnpm 10 (`pnpm --version`)
- Clear cache: `pnpm store prune` and `rm -rf node_modules .turbo`

### Check Failing in CI

- Check the GitHub Actions logs for the specific error
- Ensure all required environment variables are set in repository secrets
- Verify the workflow file syntax is correct

### Vercel Preview Failing

- Check Vercel dashboard for build logs
- Verify `vercel.json` configuration is correct
- Ensure build command matches local build command
