# Bitbucket Repository Setup Guide

**Date:** 2026-01-21  
**Purpose:** Move consolidated IntegrateWise OS to Bitbucket

---

## 📋 STEPS TO CREATE AND PUSH TO BITBUCKET

### 1. Create Repository on Bitbucket

1. Go to: https://bitbucket.org/integratewise/workspace/repositories/create
2. Repository name: `integratewise-os-consolidated`
3. Access level: Private (recommended)
4. Click "Create repository"

### 2. Push Consolidated Application

Once the repository is created, run:

```bash
cd /Users/nirmal/Github/13.1/integratewise-os-consolidated

# Add Bitbucket remote (if not already added)
git remote add bitbucket git@bitbucket.org:integratewise/integratewise-os-consolidated.git

# Push main branch
git push -u bitbucket dev-consolidated-app:main --no-verify

# Or push to master if preferred
# git push -u bitbucket dev-consolidated-app:master --no-verify
```

---

## ✅ REPOSITORY DETAILS

### Repository Information:
- **Name:** `integratewise-os-consolidated`
- **Workspace:** `integratewise`
- **Full URL:** `git@bitbucket.org:integratewise/integratewise-os-consolidated.git`
- **Branch:** `main` (pushed from `dev-consolidated-app`)

### What Will Be Pushed:
- ✅ Complete consolidated application (598 files)
- ✅ All API routes (66 routes)
- ✅ All services (83 files)
- ✅ All components (124 files)
- ✅ All views (39 views)
- ✅ All pages (123 pages)
- ✅ Single app structure (non-monorepo)

---

## 🔧 ALTERNATIVE: USE EXISTING BITBUCKET REMOTE

If you already have a Bitbucket workspace set up, you can use the existing remote:

```bash
# Check existing remotes
git remote -v

# Use existing bitbucket remote
git push bitbucket dev-consolidated-app:main --no-verify
```

---

## 📝 NOTES

- SSH key is already configured (`~/.ssh/id_ed25519_bitbucket`)
- The consolidated application is ready to push
- All files are committed in branch `dev-consolidated-app`
- Single app structure (no monorepo dependencies)

---

**Status:** Ready to push once Bitbucket repository is created.
