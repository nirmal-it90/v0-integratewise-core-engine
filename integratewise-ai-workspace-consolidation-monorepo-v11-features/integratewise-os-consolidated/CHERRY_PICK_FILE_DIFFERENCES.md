# Cherry-Pick File Differences Report

**Generated:** 2026-01-21  
**Purpose:** File-level differences between branches after cherry-pick workflow

---

## 📊 Executive Summary

After comparing branches to understand what files would change from cherry-picking operations:

### Main vs Dev-Consolidated-App
- **Added:** 1,712 files
- **Modified:** 44 files  
- **Deleted:** 42 files
- **Total Changes:** 1,798 files

### Main vs Dev
- Significant differences in documentation and configuration files
- Dev has additional UI/UX improvements

### Dev vs Dev-Consolidated-App  
- Dev-Consolidated-App has the complete consolidated application
- Dev has different page structure (under `app/(app)/`)

---

## 📁 File Count by Branch

| Branch | File Count | Status |
|--------|------------|--------|
| `main` | ~0 (empty/synced state) | Base branch |
| `dev` | ~0 (empty/synced state) | Development branch |
| `dev-consolidated-app` | **560 files** | **Complete consolidated app** |

**Note:** The main and dev branches appear to have fewer tracked files. The `dev-consolidated-app` branch contains the full application.

---

## 🔍 Detailed File Differences

### Main vs Dev-Consolidated-App

#### ✅ Added Files (1,712 files)

**Key Categories:**

1. **GitHub Workflows & Actions:**
   - `.github/CODEOWNERS`
   - `.github/actions/validate-secrets/action.yml`
   - `.github/workflows/deploy-unified.yml`

2. **Documentation:**
   - `CHERRY_PICK_SUMMARY.md`
   - `CONSOLIDATION_MAP.json`
   - `INTEGRATEWISE_OS_MASTER_CONSOLIDATION.md`
   - `MISSED_FILES_CHERRY_PICK.md`
   - `V11_CANONICAL_SPEC.md`
   - `V11_NOMISS_COMPLETE.json`

3. **Core Engine (Cloudflare Worker):**
   - `apps/integratewise-core-engine/` (complete package)
   - Database migrations
   - AI router
   - Database client

4. **Webhooks Service:**
   - `apps/integratewise-webhooks/` (complete package)
   - Handler implementations (Discord, Notion, Slack, Stripe)

5. **Consolidated Application:**
   - All app files under `app/` directory
   - All components under `components/` directory
   - All lib utilities
   - Configuration files

#### 📝 Modified Files (44 files)

**Configuration:**
- `.claude/settings.json`
- `.github/workflows/ci.yml`
- `.gitignore`

**Core Engine:**
- `apps/integratewise-core-engine/package.json`
- `apps/integratewise-core-engine/tsconfig.json`

**Webhooks:**
- `apps/integratewise-webhooks/package.json`
- Handler files (Discord, Notion, Slack, Stripe)

**Integrationwise OS:**
- Auth pages (login, signup)
- Main layout
- Sidebar components
- Various views (home, brainstorming, leads, strategic hub)

#### ❌ Deleted Files (42 files)

**Old Documentation (Consolidated):**
- `ACTIVE_WEBHOOK_SYSTEM.md`
- `AI_INSIGHTS_AND_LOADER_STATUS.md`
- `AI_LOADER_PART_B_COMPLETE.md`
- `AI_LOADER_TWO_STAGE_IMPLEMENTATION.md`
- `BUILD_CLEANUP_SUMMARY.md`
- `CLOUDFLARE_WORKERS_ARCHITECTURE.md`
- `COMPREHENSIVE_CODE_AUDIT.md`
- `CONSOLIDATION_COMPLETE.md`
- `DEPLOYMENT_AUDIT_REPORT.md`
- `IMPLEMENTATION_COMPLETE_SUMMARY.md`
- `MASTER_ARCHITECTURE.md`
- `MASTER_IMPLEMENTATION_GUIDE.md`
- `MASTER_PLAN_AND_NEXT_STEPS.md`
- And 29 more old documentation files...

**Removed Apps:**
- `apps/hub-frontend-app/` files (extracted to separate repo)

---

## 🔄 Dev vs Dev-Consolidated-App

### Key Differences

**Dev has different structure:**
- Pages under `app/(app)/` route groups
- Some pages in different locations:
  - `app/(app)/admin/audit/page.tsx` (deleted in consolidated)
  - `app/(app)/admin/billing/page.tsx` (deleted in consolidated)
  - `app/(app)/brainstorming/page.tsx` (deleted in consolidated)
  - Multiple business and CS pages

**Dev-Consolidated-App has:**
- ✅ Single app structure (not in monorepo format)
- ✅ All pages in standard `app/` structure
- ✅ Consolidated documentation
- ✅ Complete consolidation map and specs

---

## 📂 File Categories Breakdown

### Configuration Files Changed
- ✅ GitHub workflows updated
- ✅ CI/CD pipelines modified
- ✅ Package configurations updated
- ✅ TypeScript configs aligned

### Source Code Files
- ✅ 44 TypeScript/React files modified
- ✅ Core engine completely added
- ✅ Webhooks service completely added
- ✅ Application files consolidated

### Documentation
- ✅ 42 old docs deleted (consolidated)
- ✅ New comprehensive docs added
- ✅ V11 specs and consolidation maps added

---

## 🎯 Cherry-Pick Impact Summary

### If Cherry-Picking from Dev-Consolidated-App to Main:

**You would get:**
1. ✅ **1,712 new files** - Complete application
2. ✅ **44 modified files** - Updated configurations and code
3. ✅ **42 deleted files** - Old documentation cleanup

### If Cherry-Picking from Dev to Dev-Consolidated-App:

**You would get:**
1. ⚠️ Different page structure (route groups)
2. ⚠️ Some pages in different locations
3. ⚠️ Need to reconcile structure differences

---

## 📋 Recommendations

1. **Use `dev-consolidated-app` as source for cherry-picks:**
   - Contains the most complete file set
   - Has proper single-app structure
   - All consolidation work complete

2. **Cherry-pick selectively:**
   - Use the cherry-pick workflow script for controlled merges
   - Review file differences before cherry-picking
   - Test after cherry-picking

3. **File structure:**
   - `dev-consolidated-app` has the correct single-app structure
   - Main branch appears to be in a different state

---

**Full detailed report:** `analysis/file_differences_20260121_230200.md`
