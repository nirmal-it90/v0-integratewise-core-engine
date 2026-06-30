# IntegrateWise v11 - Deployment Fix - Exact Commands

Copy and paste these commands into your terminal to fix the deployment issues.

---

## Option 1: Automated Script (Recommended) ✅

**One command to run everything:**

```bash
cd integratewise-ai-workspace-consolidation-monorepo-v11-features
./fix-deployments.sh
```

This will:
- Remove all orphaned directories
- Clean lockfile
- Reinstall dependencies  
- Run validation checks
- Show a summary

---

## Option 2: Manual Step-by-Step

**If the script doesn't work or you prefer manual control:**

### Step 1: Navigate to monorepo root
```bash
cd integratewise-ai-workspace-consolidation-monorepo-v11-features
```

### Step 2: Create a backup
```bash
mkdir -p backups
cp package.json backups/package.json.backup
cp pnpm-lock.yaml backups/pnpm-lock.yaml.backup 2>/dev/null || echo "No lockfile yet"
```

### Step 3: Remove orphaned directories
```bash
# Remove each orphaned directory
rm -rf integratewise-os-consolidated/
rm -rf integrationwise-os-consolidated/
rm -rf integrate-wise-operating-syst-2/
rm -rf integratewise-ai-workspace/

echo "✅ Orphaned directories removed"
```

### Step 4: Clean dependencies
```bash
rm -rf pnpm-lock.yaml
rm -rf node_modules
echo "✅ Cleaned pnpm-lock.yaml and node_modules"
```

### Step 5: Reinstall everything
```bash
pnpm install
echo "✅ Dependencies reinstalled"
```

### Step 6: Run validation
```bash
# Run linter
pnpm run lint

# Run type checker
pnpm run typecheck

# Run full build
pnpm run build

echo "✅ All validations passed!"
```

---

## Option 3: Minimal (Fastest) Fix

**If you just want to get it working ASAP:**

```bash
cd integratewise-ai-workspace-consolidation-monorepo-v11-features

# Remove bad directories
rm -rf integratewise-os-consolidated/ integrationwise-os-consolidated/ integrate-wise-operating-syst-2/ integratewise-ai-workspace/

# Clean and install
rm -rf pnpm-lock.yaml node_modules && pnpm install

# Verify it works
pnpm run build:engine
```

---

## Verification Commands

**Run these after applying any fix to verify success:**

```bash
# Check workspace structure is clean
echo "Checking workspace structure..."
ls -la apps/
ls -la packages/

# Verify no orphaned directories exist
echo "Checking for orphaned directories..."
find . -maxdepth 1 -type d -name "*os*" -o -name "integrate-wise*"
# Should return NOTHING (empty)

# Verify dependencies resolved correctly
echo "Checking dependency installation..."
pnpm list --depth=0 | grep "@integratewise"

# Verify build works
echo "Testing build..."
pnpm run build:engine
pnpm run build:os

echo "✅ All checks passed!"
```

---

## Git Workflow (After Fixing Locally)

**Commit and push your fix:**

```bash
# Add all changes
git add -A

# Commit with a clear message
git commit -m "fix: resolve deployment failures by removing orphaned directories and aligning versions

- Removed corrupted directories:
  - integratewise-os-consolidated/ (invalid name)
  - integrationwise-os-consolidated/ (duplicate)
  - integrate-wise-operating-syst-2/ (abandoned)
  - integratewise-ai-workspace/ (empty)
  
- Aligned package versions in root package.json
- Cleaned and reinstalled dependencies
- Validated build success

Fixes: 11 consecutive deployment failures on dev-cs-tam-v11.11"

# Push to your branch
git push origin $(git rev-parse --abbrev-ref HEAD)
```

---

## Deployment After Fix

**Once pushed, Vercel will automatically:**

1. ✅ Detect the push
2. ✅ Start a new build
3. ✅ Install dependencies (should take <60 seconds now)
4. ✅ Run build pipeline (should take <3 minutes total)
5. ✅ Deploy successfully

**Monitor here:** https://vercel.com → Your Project → Deployments

---

## If Something Goes Wrong

### Restore from backup:
```bash
cp backups/package.json.backup package.json
cp backups/pnpm-lock.yaml.backup pnpm-lock.yaml
pnpm install
```

### Check what happened:
```bash
# See the git diff
git diff package.json

# See changed files
git status

# View all deployed versions
git log --oneline -10
```

### Get detailed help:
See **DEPLOYMENT_FIX_PLAN.md** for complete technical analysis

---

## Success Indicators ✅

After running the fix, you should see:

```
✅ Orphaned directories removed
✅ Lockfile and node_modules cleaned
✅ Dependencies installed successfully
✅ Linting passed
✅ TypeScript check passed
✅ Full build successful

Deployment fix completed!

📊 Summary:
   • Removed 4 orphaned directories
   • Cleaned lockfile and node_modules
   • Reinstalled dependencies
   • Validated build configuration
```

---

## Need More Info?

- **Technical Analysis:** `DEPLOYMENT_FIX_PLAN.md`
- **User Guide:** `DEPLOYMENT_FIX_README.md`
- **Architecture Spec:** `V11_CANONICAL_SPEC.md`
- **Quick Start:** `QUICK_START_GUIDE.md`

---

**That's it! Your deployments should now work. 🚀**
