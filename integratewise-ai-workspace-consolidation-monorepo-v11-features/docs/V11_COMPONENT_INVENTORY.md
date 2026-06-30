# v11.0 Component Inventory & Fix List

**Date:** January 16, 2026  
**Purpose:** Complete inventory of all components with fix requirements

---

## 🔴 CRITICAL FIXES REQUIRED

### Files with "Brainstorming" (Banned Term)

#### Navigation Components (4 files)
1. **`components/sidebar-ssot.tsx`**
   - Line 52: `{ name: "Brainstorming", href: "/brainstorming" }`
   - Fix: Change to `{ name: "IQ Hub", href: "/iq-hub" }`
   - Also fix: Core navigation structure (Lines 48-54)

2. **`components/app-shell.tsx`**
   - Line 56: `{ name: "Brainstorming", href: "/brainstorming" }`
   - Fix: Change to `{ name: "IQ Hub", href: "/iq-hub" }`
   - Also fix: Core navigation structure

3. **`components/sidebar-mailerlite.tsx`**
   - Line 57: `{ name: "Brainstorming", href: "/brainstorming" }`
   - Fix: Change to `{ name: "IQ Hub", href: "/iq-hub" }`

4. **`components/sidebar.tsx`**
   - Line 137: References `/brainstorming` route
   - Fix: Replace with `/iq-hub`

#### View Components (1 file)
5. **`components/views/brainstorming-view.tsx`**
   - Entire file: Component name and all references
   - Fix: Rename to `iq-hub-view.tsx`
   - Fix: Update component name `BrainstormingView` → `IQHubView`
   - Fix: Update all user-facing strings

#### Page Components (1 file)
6. **`app/brainstorming/page.tsx`**
   - Line 2: Import `BrainstormingView`
   - Line 4: Function name `BrainstormingPage`
   - Fix: Rename route to `/iq-hub` OR keep route, change labels
   - Fix: Update imports and function names

#### Other Components (3 files)
7. **`components/command-center.tsx`**
   - Line 467: Reference to `/brainstorming`
   - Fix: Change to `/iq-hub`

8. **`components/insights-home.tsx`**
   - Line 343: Link to `/brainstorming`
   - Fix: Change to `/iq-hub`

9. **`components/views/profile-view.tsx`**
   - Lines 181, 203: User-facing text mentions "Brainstorming"
   - Fix: Replace with "IQ Hub"

#### API Routes (3 files)
10. **`app/api/brainstorm/analyze/route.ts`**
    - Route path: `/api/brainstorm/analyze`
    - Fix: Rename to `/api/iq-hub/analyze` OR keep as internal

11. **`app/api/brainstorm/daily-insights/route.ts`**
    - Route path: `/api/brainstorm/daily-insights`
    - Fix: Rename to `/api/iq-hub/daily-insights` OR keep as internal

12. **`app/api/webhooks/brainstorm/route.ts`**
    - Route path: `/api/webhooks/brainstorm`
    - Fix: Rename to `/api/webhooks/iq-hub` OR keep as internal

#### Documentation/Config (10+ files)
13. **`lib/supabase/middleware.ts`** - Check for references
14. **`lib/types/task.ts`** - Check for references
15. **`lib/hooks/use-visibility-rules.ts`** - Check for references
16. **`lib/cms/data-loaders.ts`** - Check for references
17. **`app/page.tsx`** - Check for references
18. **`app/product/page.tsx`** - Check for references
19. **`app/platform/page.tsx`** - Check for references
20. **`app/os/page.tsx`** - Check for references
21. **`app/onboarding/personal-insights/page.tsx`** - Check for references
22. **Various markdown files** - Check for user-facing references

---

## ⚠️ NAVIGATION STRUCTURE FIXES

### Core Navigation Updates Required

**Files to Update:**
1. `components/sidebar-ssot.tsx` (Lines 48-54)
2. `components/app-shell.tsx` (Lines 53-59)
3. `components/sidebar-mailerlite.tsx` (Lines 53-58)
4. `components/sidebar.tsx` (Check navigation array)

**Current Structure (WRONG):**
```typescript
const coreNavItems = [
  { name: "Home", href: "/dashboard" },      // ❌
  { name: "Loader", href: "/loader" },      // ❌
  { name: "Tasks", href: "/tasks" },        // ✅
  { name: "Brainstorming", href: "/brainstorming" }, // ❌
  { name: "Insights", href: "/insights" },   // ❌
]
```

**Required Structure (v11.0):**
```typescript
const coreNavItems = [
  { name: "Today", href: "/today" },                    // ✅
  { name: "Work Queue", href: "/tasks" },                // ✅
  { name: "Search / Memory", href: "/search" },         // ✅ NEW
  { name: "IQ Hub", href: "/iq-hub" },                  // ✅
  { name: "Integrations", href: "/integrations" },      // ✅
  { name: "Settings", href: "/settings" },              // ✅
]

// Move to Integrations section:
const integrationItems = [
  { name: "Loader", href: "/loader" },
  { name: "Connectors", href: "/integrations" },
  { name: "Dumps", href: "/integrations?tab=dumps" },
  { name: "Webhooks", href: "/integrations?tab=webhooks" },
]

// Move to Role-Based Views:
// "Insights" should be available in all Views, not core nav
```

---

## 🔄 ROUTE FIXES

### Default Landing Route

**File:** `app/start/page.tsx` or auth redirect logic

**Current:** Redirects to `/dashboard` → `/insights` or `/command-center`

**Required:** Redirect to `/today`

**Fix:**
```typescript
// In app/start/page.tsx or auth callback
redirect("/today")  // Instead of "/dashboard" or "/insights"
```

---

### Route Renames

1. **`/brainstorming` → `/iq-hub`**
   - File: `app/brainstorming/page.tsx`
   - Option A: Rename directory and route
   - Option B: Keep route, update all labels to "IQ Hub"

2. **`/dashboard` → `/today` (or redirect)**
   - File: `app/(app)/dashboard/page.tsx`
   - Fix: Update redirect or rename route

3. **`/home` → Consolidate with `/today`**
   - File: `app/(personal)/home/page.tsx`
   - Fix: Remove or merge with `/today`

---

## 📁 COMPONENT RENAME CHECKLIST

### View Components

- [ ] `brainstorming-view.tsx` → `iq-hub-view.tsx`
- [ ] Update component export: `BrainstormingView` → `IQHubView`
- [ ] Update all imports in pages
- [ ] Update user-facing strings in component

### Page Components

- [ ] `app/brainstorming/page.tsx` → `app/iq-hub/page.tsx` (if renaming route)
- [ ] Update function name: `BrainstormingPage` → `IQHubPage`
- [ ] Update imports
- [ ] Update metadata

---

## 🗂️ COMPLETE FILE INVENTORY

### Pages (app/ directory)

#### Core App Pages
- ✅ `(app)/dashboard/page.tsx` - Needs redirect fix
- ✅ `(app)/loader/page.tsx` - OK, may move to integrations
- ⚠️ `(app)/insights/page.tsx` - OK, but remove from core nav
- ✅ `(app)/profile/page.tsx` - OK
- ✅ `(app)/settings/page.tsx` - OK
- ⚠️ `(app)/command-center/page.tsx` - Review if Admin View

#### Personal Pages
- ✅ `(personal)/today/page.tsx` - OK, needs to be default
- ⚠️ `(personal)/home/page.tsx` - Consolidate with /today
- ⚠️ `(personal)/knowledge/page.tsx` - May be "Search / Memory"
- ✅ `(personal)/goals/page.tsx` - OK

#### CS Pages
- ✅ `(cs)/accounts/page.tsx` - OK
- ✅ `(cs)/risks/page.tsx` - OK
- ✅ `(cs)/tam/page.tsx` - OK
- ✅ `(cs)/war-room/page.tsx` - OK

#### Business Pages
- ✅ `(business)/clients/page.tsx` - OK
- ✅ `(business)/metrics/page.tsx` - OK
- ✅ `(business)/pipeline/page.tsx` - OK
- ✅ `(business)/projects/page.tsx` - OK
- ✅ `(business)/spend/page.tsx` - OK

#### Root Pages
- 🔴 `brainstorming/page.tsx` - CRITICAL: Rename or update
- ✅ `tasks/page.tsx` - OK
- ✅ `sales/page.tsx` - OK
- ⚠️ `strategy/page.tsx` - Review naming
- ✅ `integrations/page.tsx` - OK
- ⚠️ `onboarding/page.tsx` - Needs verification

### Components (components/ directory)

#### Navigation (4 files - ALL NEED FIXES)
- 🔴 `sidebar-ssot.tsx` - CRITICAL
- 🔴 `app-shell.tsx` - CRITICAL
- 🔴 `sidebar-mailerlite.tsx` - CRITICAL
- 🔴 `sidebar.tsx` - CRITICAL
- ⚠️ `hubs-dropdown.tsx` - Review terminology

#### Views (25+ files)
- 🔴 `views/brainstorming-view.tsx` - CRITICAL: Rename
- ⚠️ `views/home-view.tsx` - Review if Today View
- ✅ `views/insights-view.tsx` - OK
- ⚠️ `views/sales-hub-view.tsx` - Review "Hub" terminology
- ⚠️ `views/strategic-hub-view.tsx` - Review naming
- ✅ `views/clients-view.tsx` - OK
- ✅ `views/tasks-view.tsx` - OK
- ✅ `views/loader-view.tsx` - OK
- ✅ All other views - Review individually

#### Other Components
- ⚠️ `command-center.tsx` - Has "Brainstorming" reference
- ⚠️ `insights-home.tsx` - Has "Brainstorming" reference
- ⚠️ `views/profile-view.tsx` - Has "Brainstorming" text

---

## 🎯 FIX PRIORITY MATRIX

### P0 - Critical (Do First)
1. Replace "Brainstorming" → "IQ Hub" in navigation (4 files)
2. Fix core navigation structure (4 files)
3. Set `/today` as default landing
4. Rename `brainstorming-view.tsx` → `iq-hub-view.tsx`

### P1 - High (Do This Week)
5. Update all page imports and references
6. Add "Search / Memory" to navigation
7. Move "Loader" to Integrations section
8. Remove "Insights" from core nav

### P2 - Medium (Do This Month)
9. Consolidate `/home` with `/today`
10. Review "Hub" vs "View" terminology
11. Update API route names (if user-facing)
12. Test onboarding flow

---

## 📝 QUICK FIX COMMANDS

### Find All "Brainstorming" References
```bash
grep -r "Brainstorming" apps/integrationwise-os/ --include="*.tsx" --include="*.ts"
```

### Find All Navigation Arrays
```bash
grep -r "coreNavItems\|mainNavItems" apps/integrationwise-os/components/
```

### Find All Route References
```bash
grep -r "/brainstorming" apps/integrationwise-os/
```

---

**Total Files Requiring Changes:** 30+  
**Critical Files:** 12  
**High Priority:** 8  
**Medium Priority:** 10+

---

**Last Updated:** January 16, 2026
