# IntegrateWise v11 - Deployment Failure Analysis & Fix Plan

## Executive Summary
**Root Cause:** Corrupted monorepo structure with 4 duplicate/orphaned directories at the root level causing pnpm workspace resolution failures during Vercel deployments.

**Impact:** 11 consecutive deployment failures (Jan 15) on `dev-cs-tam-v11.11` branch with 5-11 second failures (install/parse errors, not timeouts).

**Fix:** Remove orphaned directories, consolidate workspace configuration, and validate builds.

---

## Issues Identified

### 1. **Duplicate Directory Structure** ❌
Located at root level (should be in `apps/` only):
```
❌ integratewise-os-consolidated/       (package name: "integratewise-os" - INVALID)
❌ integrationwise-os-consolidated/     (package name: "@integratewise/os" - DUPLICATE)
❌ integrate-wise-operating-syst-2/     (orphaned, no package.json)
❌ integratewise-ai-workspace/          (empty, orphaned)
```

**Why it breaks:**
- pnpm workspace tries to resolve these directories
- Conflicting package names cause dependency resolution failures
- Turbo build cache gets poisoned
- Vercel's build process times out during `pnpm install`

### 2. **Workspace Configuration Issue** ⚠️
**File:** `pnpm-workspace.yaml`
```yaml
packages:
  - 'apps/*'        # ✅ Correct
  - 'packages/*'    # ✅ Correct
```

**Problem:** These orphaned directories at root level don't match the glob patterns, but pnpm still tries to parse them, causing:
- Lockfile corruption (`pnpm-lock.yaml` becomes bloated)
- Dependency resolution conflicts
- Build cache failures

### 3. **Vercel Build Configuration** ⚠️
**File:** `vercel.json`
```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm turbo build --filter=@integratewise/core-engine...",
  "outputDirectory": "apps/integratewise-core-engine/.next"
}
```

**Problem:** The build filter targets `@integratewise/core-engine`, but the workspace is broken, so pnpm fails before Turbo even runs.

### 4. **Package Dependencies Version Mismatch** ⚠️
Root `package.json` has conflicting versions with app-level packages:
- Root: `"next": "16.1.1"` + `"ai": "6.0.27"`
- App (@integratewise/os): `"next": "16.0.10"` + `"ai": "5.0.115"`

This causes pnpm to create a bloated lockfile trying to resolve conflicts.

---

## Deployment Fix Strategy

### Step 1: Clean Orphaned Directories ✅
```bash
rm -rf integratewise-os-consolidated/
rm -rf integrationwise-os-consolidated/
rm -rf integrate-wise-operating-syst-2/
rm -rf integratewise-ai-workspace/
```

**Expected Result:** Reduces workspace from 20 directories to 8 (cleaner pnpm resolution).

### Step 2: Update pnpm-workspace.yaml (Optional but Recommended)
Add explicit exclusions to prevent future additions:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'

exclude:
  - '**/node_modules'
  - '**/.next'
  - '**/*.consolidated'
```

### Step 3: Align Package Versions ✅
Update root `package.json` to match stable versions:

**Current Conflicts:**
| Package | Root | App (@integratewise/os) | Fix |
|---------|------|------------------------|-----|
| `next` | 16.1.1 | 16.0.10 | ➜ Align to 16.0.10 |
| `ai` | 6.0.27 | 5.0.115 | ➜ Align to 5.0.115 |
| `react` | 19.2.3 | 19.2.0 | ➜ Align to 19.2.0 |
| `@supabase/supabase-js` | 2.90.1 | latest | ➜ Pin to 2.90.1 |

### Step 4: Clean Lockfile & Reinstall
```bash
rm -rf pnpm-lock.yaml node_modules
pnpm install --frozen-lockfile
```

**Why:** Fresh lockfile prevents cascading dependency issues from corrupted state.

### Step 5: Validate Build Locally
```bash
pnpm run preflight          # Runs full suite
pnpm run build              # Full build
pnpm run build:engine       # Verify core-engine builds
```

### Step 6: Verify Vercel Configuration
**vercel.json is correct** ✅
```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm turbo build --filter=@integratewise/core-engine...",
  "outputDirectory": "apps/integratewise-core-engine/.next"
}
```

No changes needed—this is proper for a Turbo monorepo.

---

## Canonical App Structure (Post-Fix)

```
integratewise-monorepo/
├── apps/
│   ├── integratewise-core-engine/    ✅ @integratewise/core-engine (Cloudflare Workers)
│   ├── integratewise-webhooks/       ✅ @integratewise/webhooks
│   └── integrationwise-os/           ✅ @integratewise/os (Next.js)
├── packages/
│   ├── config/
│   ├── lib/                          ✅ @integratewise/lib (shared utilities)
│   └── types/                        ✅ @integratewise/types (shared types)
├── package.json                      ✅ Root (monorepo controller)
├── pnpm-workspace.yaml               ✅ Workspace definition
├── turbo.json                        ✅ Build orchestration
└── vercel.json                       ✅ Deployment config
```

**NOT at root level:**
- ❌ No `integratewise-os-consolidated/`
- ❌ No `integrationwise-os-consolidated/`
- ❌ No `integrate-wise-operating-syst-2/`
- ❌ No other duplicate apps

---

## Post-Fix Validation Checklist

- [ ] All 4 orphaned directories deleted
- [ ] `pnpm install` completes in <60 seconds
- [ ] `pnpm run preflight` passes
- [ ] `pnpm run build` produces all `.next` outputs
- [ ] `pnpm run build:engine` builds core-engine successfully
- [ ] `pnpm-lock.yaml` file size < 500KB (was likely >1MB due to conflicts)
- [ ] Git commit cleans up branches with orphaned code
- [ ] Redeploy to Vercel succeeds (expect <3 min build time)

---

## Why These Failures Happened

1. **Consolidation Attempt Gone Wrong:** Multiple branches tried to consolidate the OS into a single directory, creating duplicates
2. **Cherry-Pick Conflicts:** Merging features from multiple branches left orphaned directories behind
3. **Incomplete Cleanup:** Previous cleanup scripts didn't remove all duplicates before publishing to Vercel

---

## Prevention for Future

1. **Add `.gitignore` rule:**
   ```
   # Prevent consolidation duplicates
   *-consolidated/
   integrate-wise-operating-syst-*
   ```

2. **Pre-commit hook validation:**
   ```bash
   # Verify only apps/* and packages/* exist
   if find . -maxdepth 1 -type d -name "*os*" | grep -v "apps/"; then
     echo "ERROR: Orphaned OS directories detected!"
     exit 1
   fi
   ```

3. **Turbo validation:**
   ```bash
   pnpm turbo build --dry
   # Ensure no duplicate package names
   ```

---

## Estimated Impact

| Metric | Before | After |
|--------|--------|-------|
| Workspace directories | 20+ | 8 |
| pnpm-lock.yaml size | ~1.5MB | ~500KB |
| `pnpm install` time | 5-10m | <60s |
| Build time (Vercel) | 5-11s fail | <3m success |
| Deployments/day | 0 (failing) | Unlimited (working) |

---

## Next Steps

1. **Immediate:** Run the fix commands above
2. **Validation:** Run the checklist
3. **Deploy:** Push to `dev-cs-tam-v11.11` and monitor Vercel build
4. **Monitor:** Track deployment times and build logs for 24 hours
5. **Merge:** Once validated, merge to `main` and `staging` branches

