# Missed Files During Consolidation - Cherry Pick Report

**Date:** 2026-01-21  
**Comparison:** `integrationwise-os/` vs `apps/integrationwise-os/`

---

## ✅ Files to Cherry-Pick from `integrationwise-os/` to `apps/integrationwise-os/`

### 1. Upload Functionality (MISSING)
**Priority:** HIGH - Complete feature missing

- `lib/upload/index.ts` - Upload utilities export
- `lib/upload/security.ts` - File validation, security, quarantine
- `app/api/upload/route.ts` - Upload API endpoint (POST/GET)

**Status:** Not found in `apps/integrationwise-os/`

---

### 2. Triage Bot (PARTIALLY MISSING)
**Priority:** HIGH - Implementation missing, only migration exists

- `lib/triage/triage-bot.ts` - Complete triage bot implementation
  - Deduplication logic
  - Message classification
  - Entity extraction
  - Routing determination

**Status:** `apps/integrationwise-os/` has migration SQL but NOT the TypeScript implementation

---

### 3. Lens Library (PARTIALLY MISSING)
**Priority:** MEDIUM - Full library missing

- `lib/lens/index.ts` - Lens exports
- `lib/lens/lens-config.ts` - Lens configuration
- `lib/lens/lens-provider.tsx` - Lens provider component

**Status:** `apps/integrationwise-os/` has `lib/metrics/lens-kpis.ts` but not the full lens library

---

### 4. Admin Pages (DIFFERENT STRUCTURE)
**Priority:** MEDIUM - Different implementation

- `app/admin/*` - Complete admin section
  - `app/admin/page.tsx`
  - `app/admin/layout.tsx`
  - `app/admin/audit/page.tsx`
  - `app/admin/billing/page.tsx`
  - `app/admin/flags/page.tsx`
  - `app/admin/integrations/page.tsx`
  - `app/admin/releases/page.tsx`
  - `app/admin/tenants/page.tsx`

**Status:** `apps/integrationwise-os/` uses route groups, different structure

---

### 5. Onboarding Pages (DIFFERENT/ADDITIONAL)
**Priority:** MEDIUM

- `app/onboarding/analyzing/page.tsx`
- `app/onboarding/load/page.tsx`
- `app/onboarding/persona/page.tsx`
- `app/vedic-onboarding/*` - Vedic onboarding flow

**Status:** Different onboarding flow in `integrationwise-os/`

---

## 📊 Summary

### Critical (Must Pick):
1. ✅ Upload functionality (lib/upload/* + app/api/upload/route.ts)
2. ✅ Triage bot implementation (lib/triage/triage-bot.ts)

### Important (Should Pick):
3. ✅ Lens library (lib/lens/*)
4. ⚠️ Admin pages (review for differences)

### Review Needed:
5. ⚠️ Onboarding pages (may be different flows)

---

## 🔍 Next Steps

1. **Copy upload functionality** - Complete feature
2. **Copy triage bot** - Missing implementation
3. **Copy lens library** - Complete library
4. **Review admin pages** - Compare implementations
5. **Review onboarding** - Decide which version to use

