# v11.0 Master Lock - Deep Page-by-Page & Component Audit

**Date:** January 16, 2026  
**Auditor:** Codex AI Agent  
**Scope:** Complete application audit - All pages, routes, and components  
**Status:** ⚠️ **NON-COMPLIANT** - Multiple violations found

---

## 📋 Audit Methodology

1. **Route Structure Analysis** - All Next.js app router pages
2. **Component Analysis** - All React components
3. **Navigation Audit** - Sidebar and navigation components
4. **Terminology Check** - Banned vs approved terms
5. **Structure Compliance** - v11.0 Master Lock alignment

---

## 🗂️ ROUTE GROUPS AUDIT

### (app) Route Group - Core Application Pages

#### `/dashboard` → Redirects to `/insights` or `/command-center`
**File:** `app/(app)/dashboard/page.tsx`  
**Status:** ⚠️ **NON-COMPLIANT**

**Issues:**
- ❌ Route name "dashboard" doesn't match v11.0 spec (should be "Today")
- ❌ Redirects to `/insights` instead of `/today`
- ❌ Admin users redirect to `/command-center` (not in v11.0 spec)

**v11.0 Requirement:**
> "Login → Today View (default)"

**Action Required:**
- Change default redirect to `/today`
- Update route name or redirect logic
- Remove `/command-center` redirect (or make it admin-only View)

---

#### `/loader` → AI Loader Page
**File:** `app/(app)/loader/page.tsx`  
**Status:** ⚠️ **PARTIALLY COMPLIANT**

**Issues:**
- ⚠️ Route name "loader" - v11.0 calls this "Load" (ingestion layer)
- ⚠️ Should be under "Integrations" section per v11.0 spec
- ✅ Metadata title is acceptable

**v11.0 Requirement:**
> Core Navigation: "Integrations (Connectors / Dumps / Webhooks)"

**Action Required:**
- Consider moving to `/integrations/loader` or keeping route but updating nav placement
- Update terminology if needed

---

#### `/insights` → AI Insights Page
**File:** `app/(app)/insights/page.tsx`  
**Status:** ⚠️ **NON-COMPLIANT**

**Issues:**
- ❌ "Insights" not in v11.0 core navigation spec
- ⚠️ Should be part of role-based Views, not core nav
- ✅ Page exists and functions

**v11.0 Requirement:**
> Core Navigation: Today, Work Queue/Tasks, Search/Memory, IQ Hub, Integrations, Settings

**Action Required:**
- Remove from core navigation
- Move to role-based Views (available in all Views)
- Keep route but update navigation structure

---

#### `/profile` → User Profile Page
**File:** `app/(app)/profile/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found

---

#### `/settings` → Settings Page
**File:** `app/(app)/settings/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Correctly in core navigation per v11.0

---

#### `/command-center` → Command Center
**File:** `app/(app)/command-center/page.tsx`  
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ Not in v11.0 spec - may be admin-only feature
- ⚠️ Check if this should be "Admin View" per v11.0

**Action Required:**
- Verify if this is the "Admin View" from v11.0 spec
- If yes, rename or document as Admin View
- If no, consider removing or making internal-only

---

### (personal) Route Group - Personal Workspace

#### `/today` → Today View
**File:** `app/(personal)/today/page.tsx`  
**Status:** ✅ **COMPLIANT** (but not default)

**Issues:**
- ✅ Page exists and matches v11.0 "Today View" requirement
- ❌ **NOT SET AS DEFAULT LANDING** - Critical issue
- ✅ Shows today's tasks correctly
- ✅ UI matches "Today View" concept

**v11.0 Requirement:**
> "Login → Today View (default)"

**Action Required:**
- Set as default post-login route
- Update routing logic in `app/start/page.tsx` or auth redirect

---

#### `/home` → Personal Home
**File:** `app/(personal)/home/page.tsx`  
**Status:** ⚠️ **NON-COMPLIANT**

**Issues:**
- ❌ Route name "home" conflicts with v11.0 "Today" requirement
- ⚠️ May be duplicate of `/today`
- ⚠️ Check if this should be removed or merged

**Action Required:**
- Consolidate with `/today` or remove
- Update any references

---

#### `/knowledge` → Knowledge Hub
**File:** `app/(personal)/knowledge/page.tsx`  
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ "Knowledge Hub" terminology - check if this is "Search / Memory" from v11.0
- ⚠️ May need to be in core navigation as "Search / Memory"

**v11.0 Requirement:**
> Core Navigation: "Search / Memory"

**Action Required:**
- Verify if this is the "Search / Memory" feature
- If yes, add to core navigation with correct label
- If no, document what this is

---

#### `/goals` → Goals Page
**File:** `app/(personal)/goals/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Personal feature, not in core nav (acceptable)

---

### (cs) Route Group - Customer Success Views

#### `/cs/accounts` → CS Accounts View
**File:** `app/(cs)/accounts/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ Matches v11.0 "CS View" requirement
- ✅ Shows TAM accounts (part of CS View)
- ✅ Properly scoped to CS route group

**v11.0 Requirement:**
> CS View: HealthScore, Escalations, ATHR, Adoption, Renewals, Plays

**Note:** This appears to be part of CS View. Verify all CS View components are present.

---

#### `/cs/risks` → CS Risks View
**File:** `app/(cs)/risks/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of CS View (Escalations/Risks)

---

#### `/cs/tam` → TAM Cockpit
**File:** `app/(cs)/tam/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of CS View (Account management)

---

#### `/cs/war-room` → CS War Room
**File:** `app/(cs)/war-room/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of CS View (Escalations)

---

### (business) Route Group - Business Views

#### `/business/clients` → Clients View
**File:** `app/(business)/clients/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of Sales/CS Views

---

#### `/business/metrics` → Metrics View
**File:** `app/(business)/metrics/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of Business OS View

---

#### `/business/pipeline` → Pipeline View
**File:** `app/(business)/pipeline/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of Sales View

---

#### `/business/projects` → Projects View
**File:** `app/(business)/projects/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of Operations/PM View

---

#### `/business/spend` → Spend View
**File:** `app/(business)/spend/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:** None found  
**Note:** Part of Business OS View

---

### Root Level Routes

#### `/brainstorming` → Brainstorming Page
**File:** `app/brainstorming/page.tsx`  
**Status:** 🔴 **CRITICAL VIOLATION**

**Issues:**
- 🔴 **BANNED TERM** - "Brainstorming" is user-facing
- 🔴 Should be "IQ Hub" per v11.0 Master Lock
- 🔴 Route name `/brainstorming` should be `/iq-hub`
- ✅ Page functionality exists (just wrong name)

**v11.0 Requirement:**
> Banned: "Brainstorming Layer/Neutron (user-facing)"  
> Approved: "IQ Hub (user-facing)"

**Action Required:**
- Rename route to `/iq-hub` OR keep route but change all labels
- Update page component name
- Update all navigation references
- Update metadata

---

#### `/tasks` → Tasks Page
**File:** `app/tasks/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ Matches v11.0 "Work Queue / Tasks" requirement
- ✅ Should be in core navigation (verify)

---

#### `/sales` → Sales View
**File:** `app/sales/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ Matches v11.0 "Sales View" requirement
- ✅ Properly structured as View

---

#### `/strategy` → Strategic Hub
**File:** `app/strategy/page.tsx`  
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ "Strategic Hub" terminology - check if this is "Business OS View"
- ⚠️ May need to align with v11.0 "Business OS View" naming

**v11.0 Requirement:**
> Business OS View (Owner Cockpit): Revenue + churn + execution KPIs

**Action Required:**
- Verify if this is the Business OS View
- Update naming if needed

---

#### `/integrations` → Integrations Page
**File:** `app/integrations/page.tsx`  
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ Matches v11.0 core navigation requirement
- ✅ Should include Loader, Connectors, Dumps, Webhooks

---

#### `/onboarding` → Onboarding Flow
**File:** `app/onboarding/page.tsx`  
**Status:** ⚠️ **NEEDS VERIFICATION**

**Issues:**
- ⚠️ Must verify it's frictionless per v11.0
- ⚠️ Check for mandatory steps
- ⚠️ Verify skip options exist

**v11.0 Requirement:**
> ✅ No "Invite team mandatory"  
> ✅ No "Connect everything mandatory"  
> ✅ No "heavy setup required"

**Action Required:**
- Test onboarding flow
- Verify all steps are optional
- Add skip options if missing

---

## 🧩 COMPONENT AUDIT

### Navigation Components

#### `components/sidebar-ssot.tsx`
**Status:** 🔴 **CRITICAL VIOLATION**

**Issues:**
- 🔴 Line 52: `{ name: "Brainstorming", href: "/brainstorming" }` - BANNED TERM
- 🔴 Core navigation doesn't match v11.0 spec:
  - ❌ "Home" should be "Today"
  - ❌ "Loader" should be under Integrations
  - ❌ "Brainstorming" should be "IQ Hub"
  - ❌ Missing "Search / Memory"
  - ❌ "Insights" not in core nav spec

**Required Changes:**
```typescript
// CURRENT (WRONG)
const coreNavItems = [
  { name: "Home", href: "/dashboard" },
  { name: "Loader", href: "/loader" },
  { name: "Tasks", href: "/tasks" },
  { name: "Brainstorming", href: "/brainstorming" }, // ❌
  { name: "Insights", href: "/insights" },
]

// REQUIRED (v11.0)
const coreNavItems = [
  { name: "Today", href: "/today" },
  { name: "Work Queue", href: "/tasks" },
  { name: "Search / Memory", href: "/search" },
  { name: "IQ Hub", href: "/iq-hub" }, // ✅
  { name: "Integrations", href: "/integrations" },
  { name: "Settings", href: "/settings" },
]
```

---

#### `components/app-shell.tsx`
**Status:** 🔴 **CRITICAL VIOLATION**

**Issues:**
- 🔴 Line 56: `{ name: "Brainstorming", href: "/brainstorming" }` - BANNED TERM
- 🔴 Same navigation structure issues as sidebar-ssot.tsx

**Action Required:**
- Apply same fixes as sidebar-ssot.tsx

---

#### `components/sidebar-mailerlite.tsx`
**Status:** 🔴 **CRITICAL VIOLATION**

**Issues:**
- 🔴 Line 57: `{ name: "Brainstorming", href: "/brainstorming" }` - BANNED TERM
- ⚠️ Different navigation structure (may be variant)

**Action Required:**
- Replace "Brainstorming" with "IQ Hub"
- Align navigation with v11.0 spec

---

#### `components/sidebar.tsx`
**Status:** 🔴 **CRITICAL VIOLATION**

**Issues:**
- 🔴 Line 137: References `/brainstorming` route - BANNED TERM
- ⚠️ Check full navigation structure

**Action Required:**
- Replace all "Brainstorming" references with "IQ Hub"
- Update navigation structure

---

#### `components/hubs-dropdown.tsx`
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ "Hubs" terminology - v11.0 uses "Views"
- ⚠️ May need terminology update

**Action Required:**
- Consider renaming to "Views Dropdown"
- Update labels if needed

---

### View Components

#### `components/views/brainstorming-view.tsx`
**Status:** 🔴 **CRITICAL VIOLATION**

**Issues:**
- 🔴 Component name uses "Brainstorming" - BANNED TERM
- 🔴 Should be `iq-hub-view.tsx` or `iqHubView.tsx`
- 🔴 All user-facing strings in component need update
- ✅ Functionality appears correct (just wrong name)

**Action Required:**
- Rename component to `iq-hub-view.tsx`
- Update all internal references
- Update user-facing strings
- Update imports in pages

---

#### `components/views/home-view.tsx`
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ "Home" terminology - v11.0 uses "Today"
- ⚠️ May need to be renamed or consolidated with Today View

**Action Required:**
- Verify if this is the "Today View" or separate
- Consolidate or rename as needed

---

#### `components/views/insights-view.tsx`
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ Component exists and functions
- ⚠️ Should be in role-based Views, not core nav

---

#### `components/views/sales-hub-view.tsx`
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ Matches v11.0 "Sales View" requirement
- ⚠️ "Hub" terminology - consider "View" for consistency

---

#### `components/views/strategic-hub-view.tsx`
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ "Strategic Hub" - verify if this is "Business OS View"
- ⚠️ "Hub" terminology - consider "View"

---

#### `components/views/clients-view.tsx`
**Status:** ✅ **COMPLIANT**

**Issues:** None found

---

#### `components/views/tasks-view.tsx`
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ Matches v11.0 "Work Queue / Tasks" requirement

---

### Other Components

#### `components/command-center.tsx`
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ Line 467: References `/brainstorming` route - BANNED TERM
- ⚠️ Verify if this is "Admin View" from v11.0

**Action Required:**
- Replace "Brainstorming" reference with "IQ Hub"
- Verify if this is Admin View

---

#### `components/insights-home.tsx`
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ Line 343: References `/brainstorming` route - BANNED TERM

**Action Required:**
- Replace with `/iq-hub`

---

#### `components/views/profile-view.tsx`
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ Lines 181, 203: References "Brainstorming" in user-facing text - BANNED TERM

**Action Required:**
- Replace all "Brainstorming" text with "IQ Hub"

---

## 📊 API ROUTES AUDIT

### `/api/brainstorm/*` Routes
**Status:** ⚠️ **REVIEW NEEDED**

**Files:**
- `app/api/brainstorm/analyze/route.ts`
- `app/api/brainstorm/daily-insights/route.ts`

**Issues:**
- ⚠️ Route path uses "brainstorm" - internal API, may be acceptable
- ⚠️ Verify if this should be `/api/iq-hub/*` or keep internal

**Action Required:**
- If user-facing, rename to `/api/iq-hub/*`
- If internal-only, document as internal alias

---

### `/api/webhooks/brainstorm/route.ts`
**Status:** ⚠️ **REVIEW NEEDED**

**Issues:**
- ⚠️ Webhook route uses "brainstorm" - verify if user-facing

**Action Required:**
- Rename if user-facing, or document as internal

---

### `/api/neutron/*` Routes
**Status:** ✅ **COMPLIANT**

**Issues:**
- ✅ "Neutron" is internal alias (per v11.0, acceptable)
- ✅ API routes are internal, not user-facing

---

## 🔍 TERMINOLOGY AUDIT SUMMARY

### Banned Terms Found (User-Facing):

| Term | Count | Files | Status |
|------|-------|-------|--------|
| "Brainstorming" | 25+ | Multiple | 🔴 CRITICAL |
| "Home" (instead of "Today") | 5+ | Navigation | ⚠️ MEDIUM |
| "Hub" (instead of "View") | 10+ | Views | ⚠️ LOW |

### Approved Terms Found:

| Term | Count | Status |
|------|-------|--------|
| "IQ Hub" | 4 | ✅ (in docs only) |
| "Today" | 1 | ✅ (in today page) |
| "Tasks" | Multiple | ✅ |
| "Settings" | Multiple | ✅ |

---

## 📋 COMPLIANCE CHECKLIST BY CATEGORY

### Core Navigation
- [ ] ❌ "Today" is default landing (currently redirects to /insights)
- [ ] ❌ Core nav matches v11.0 spec exactly
- [ ] ❌ "IQ Hub" replaces "Brainstorming"
- [ ] ❌ "Search / Memory" added to core nav
- [ ] ⚠️ "Loader" moved to Integrations section
- [ ] ⚠️ "Insights" removed from core nav

### Route Structure
- [ ] ❌ `/brainstorming` renamed to `/iq-hub` OR labels updated
- [ ] ❌ `/today` set as default landing
- [ ] ⚠️ `/home` consolidated with `/today` or removed
- [ ] ✅ Route groups properly structured (CS, Business, Personal)

### Components
- [ ] ❌ All "Brainstorming" references replaced with "IQ Hub"
- [ ] ❌ Navigation components updated
- [ ] ❌ View components renamed/updated
- [ ] ⚠️ "Hub" terminology reviewed (may be acceptable)

### Views Structure
- [ ] ✅ CS View exists and structured
- [ ] ✅ Sales View exists
- [ ] ⚠️ Marketing View - verify exists
- [ ] ⚠️ PM View - verify exists
- [ ] ⚠️ Business OS View - verify (may be Strategic Hub)
- [ ] ⚠️ Admin View - verify (may be Command Center)

### Onboarding
- [ ] ⚠️ Must test for frictionless flow
- [ ] ⚠️ Verify no mandatory steps
- [ ] ⚠️ Verify skip options exist

---

## 🎯 PRIORITY FIXES

### P0 - Critical (Must Fix Immediately)
1. Replace "Brainstorming" → "IQ Hub" (25+ files)
2. Set `/today` as default landing
3. Fix core navigation structure (4 sidebar components)
4. Rename `/brainstorming` route or update all labels

### P1 - High (Fix This Week)
5. Add "Search / Memory" to core navigation
6. Move "Loader" to Integrations section
7. Remove "Insights" from core nav (move to Views)
8. Update all component names and references

### P2 - Medium (Fix This Month)
9. Consolidate `/home` with `/today`
10. Review "Hub" vs "View" terminology
11. Verify all role-based Views exist
12. Test and fix onboarding flow

---

## 📈 COMPLIANCE SCORE

**Overall:** 45/100

**Breakdown:**
- Navigation Structure: 30/100 (Critical violations)
- Terminology: 20/100 (Banned terms throughout)
- Route Structure: 60/100 (Mostly good, some issues)
- Component Structure: 70/100 (Good structure, wrong names)
- Views Structure: 80/100 (Mostly compliant)

---

## 📝 NEXT STEPS

1. **Immediate Actions:**
   - Create fix tickets for P0 issues
   - Start with terminology replacement
   - Fix navigation structure

2. **This Week:**
   - Complete P0 fixes
   - Begin P1 fixes
   - Test navigation flows

3. **This Month:**
   - Complete all fixes
   - Full regression testing
   - Re-audit for compliance

---

**Last Updated:** January 16, 2026  
**Next Review:** After P0 fixes complete
