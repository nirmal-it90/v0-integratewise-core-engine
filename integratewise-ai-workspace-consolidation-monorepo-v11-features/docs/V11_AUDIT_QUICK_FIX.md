# v11.0 Master Lock - Quick Fix Guide

**Priority:** 🔴 CRITICAL  
**Time Estimate:** 2-3 days  
**Files to Change:** 20+ files

---

## 🚨 Top 5 Critical Fixes

### 1. Replace "Brainstorming" → "IQ Hub" (20 files)

**Find & Replace:**
```bash
# Search for all instances
grep -r "Brainstorming" apps/integrationwise-os/components/

# Replace in navigation
"Brainstorming" → "IQ Hub"
"/brainstorming" → "/iq-hub" (or keep route, change label only)
```

**Key Files:**
- `components/sidebar-ssot.tsx` (Line 52)
- `components/app-shell.tsx` (Line 56)
- `components/sidebar-mailerlite.tsx` (Line 57)
- `components/sidebar.tsx` (Line 137)

---

### 2. Fix Core Navigation Structure

**Current (WRONG):**
```typescript
const coreNavItems = [
  { name: "Home", href: "/dashboard" },      // ❌
  { name: "Loader", href: "/loader" },      // ❌
  { name: "Tasks", href: "/tasks" },        // ✅
  { name: "Brainstorming", href: "/brainstorming" }, // ❌
  { name: "Insights", href: "/insights" },   // ❌
]
```

**Required (v11.0):**
```typescript
const coreNavItems = [
  { name: "Today", href: "/today" },                    // ✅
  { name: "Work Queue", href: "/tasks" },                // ✅
  { name: "Search / Memory", href: "/search" },           // ✅ NEW
  { name: "IQ Hub", href: "/iq-hub" },                  // ✅
  { name: "Integrations", href: "/integrations" },      // ✅
  { name: "Settings", href: "/settings" },              // ✅
]
```

**Move to Integrations:**
- "Loader" → Under Integrations section

**Move to Role-Based Views:**
- "Insights" → Part of Views, not core nav

---

### 3. Set "Today" as Default Landing

**File:** `apps/integrationwise-os/app/layout.tsx` or routing config

**Change:**
```typescript
// Default redirect after login
redirect("/today")  // Instead of /dashboard or /home
```

---

### 4. Add "Search / Memory" to Navigation

**New Component Needed:**
- Create `/search` route
- Add to all sidebar components
- Implement search functionality

**Quick Implementation:**
- Can use existing search component if available
- Add to core navigation array

---

### 5. Document Role-Based Views

**Create:** `docs/ROLE_BASED_VIEWS.md`

**Structure:**
```
CS View → /cs
  - HealthScore
  - Escalations
  - ATHR
  - Adoption
  - Renewals
  - Plays

Sales View → /sales
  - Pipeline
  - Deals
  - Contacts
  - Sessions
  - Next actions

Marketing View → /marketing
  - Campaign intelligence
  - Segmentation
  - Messaging assets

PM View → /pm
  - Voice of customer
  - Adoption signals
  - Roadmap intelligence

Business OS View → /business-os
  - Revenue + churn + execution KPIs

Admin View → /admin
  - RBAC
  - Billing
  - Connectors
  - Audit logs
  - Policy configuration
```

---

## ⚡ Quick Wins (1 hour each)

### Fix 1: Update Sidebar Labels
```typescript
// In sidebar-ssot.tsx
{ name: "IQ Hub", href: "/iq-hub", icon: Lightbulb }
```

### Fix 2: Update Route Metadata
```typescript
// In page.tsx files
export const metadata = {
  title: "IQ Hub - IntegrateWise",
  // Not "Brainstorming"
}
```

### Fix 3: Update Navigation Arrays
- Copy-paste corrected `coreNavItems` array
- Test navigation still works

---

## 🔍 Verification Checklist

After fixes, verify:

- [ ] No "Brainstorming" in user-facing UI
- [ ] "IQ Hub" appears in navigation
- [ ] Core nav matches v11.0 spec
- [ ] "Today" is default landing
- [ ] "Search / Memory" in nav
- [ ] Navigation works end-to-end
- [ ] No broken links

---

## 📝 Testing Commands

```bash
# Find all "Brainstorming" instances
grep -r "Brainstorming" apps/integrationwise-os/ --include="*.tsx" --include="*.ts"

# Find navigation arrays
grep -r "coreNavItems\|mainNavItems" apps/integrationwise-os/components/

# Find route definitions
grep -r "/brainstorming" apps/integrationwise-os/
```

---

**Status:** Ready to implement  
**Blockers:** None  
**Dependencies:** None
