# IntegrateWise v11.0 Master Lock Compliance Audit

**Date:** January 16, 2026  
**Auditor:** Codex AI Agent  
**Reference:** `docs/V11_MASTER_LOCK_COMPLIANT.md`  
**Status:** ⚠️ **NON-COMPLIANT** - Critical Issues Found

---

## Executive Summary

The application has **5 critical violations** and **8 medium-priority issues** that prevent v11.0 Master Lock compliance. The primary issue is the use of banned terminology ("Brainstorming" instead of "IQ Hub") throughout the codebase.

**Compliance Score:** 45/100  
**Required Actions:** 13 fixes needed before v11.0 compliance

---

## 🔴 CRITICAL VIOLATIONS (Must Fix)

### 1. Banned Term: "Brainstorming" Used as User-Facing Label

**Severity:** 🔴 CRITICAL  
**Impact:** Violates Master Lock Glossary - Banned Terms  
**Files Affected:** 20+ files

**Issue:**
The term "Brainstorming" is used as a user-facing navigation label in multiple sidebar components, violating the v11.0 Master Lock requirement that "Brainstorming Layer/Neutron" should only be an internal alias, not user-facing.

**Required Change:**
- ❌ `{ name: "Brainstorming", href: "/brainstorming", icon: Lightbulb }`
- ✅ `{ name: "IQ Hub", href: "/iq-hub", icon: Lightbulb }`

**Affected Files:**
1. `apps/integrationwise-os/components/sidebar-ssot.tsx` (Line 52)
2. `apps/integrationwise-os/components/app-shell.tsx` (Line 56)
3. `apps/integrationwise-os/components/sidebar-mailerlite.tsx` (Line 57)
4. `apps/integrationwise-os/components/sidebar.tsx` (Line 137)
5. `integrate-wise-operating-syst-2/components/sidebar.tsx` (Line 148)
6. Multiple view components referencing `/brainstorming` route

**Action Required:**
- Replace all user-facing instances of "Brainstorming" with "IQ Hub"
- Update route from `/brainstorming` to `/iq-hub` (or keep route but change label)
- Update all navigation menus
- Update page titles and metadata

---

### 2. Core Navigation Doesn't Match v11.0 Spec

**Severity:** 🔴 CRITICAL  
**Impact:** Navigation structure violates Master Lock requirements

**Current Implementation:**
```typescript
const coreNavItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Loader", href: "/loader", icon: Loader2 },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Brainstorming", href: "/brainstorming", icon: Lightbulb }, // ❌
  { name: "Insights", href: "/insights", icon: LineChart },
]
```

**v11.0 Required:**
```
Universal Core Navigation:
- Today
- Work Queue / Tasks
- Search / Memory
- IQ Hub
- Integrations (Connectors / Dumps / Webhooks)
- Settings
```

**Issues:**
1. ❌ "Home" should be "Today"
2. ❌ "Loader" should be under "Integrations" or renamed
3. ❌ "Brainstorming" should be "IQ Hub"
4. ❌ Missing "Search / Memory" as primary nav item
5. ❌ "Insights" not in spec (should be in Views, not core nav)

**Action Required:**
- Restructure core navigation to match v11.0 spec exactly
- Move "Loader" to Integrations section
- Add "Search / Memory" as primary nav
- Rename "Home" to "Today"
- Move "Insights" to role-based Views

---

### 3. Missing "Today" as Default Landing View

**Severity:** 🔴 CRITICAL  
**Impact:** User flow violation

**v11.0 Requirement:**
> "Login → Today View (default)"

**Current State:**
- Default landing appears to be `/dashboard` or `/home`
- "Today View" exists at `/today` but is not the default

**Action Required:**
- Set `/today` as default post-login route
- Ensure "Today View" is the primary landing experience
- Update routing logic

---

### 4. Role-Based Views Not Clearly Structured

**Severity:** 🔴 CRITICAL  
**Impact:** Architecture violation

**v11.0 Requirement:**
> "One Platform + One Spine (SSOT) + Multiple Role-Based Views"  
> "These Views are projections, not separate products."

**Current State:**
- Views exist but structure is unclear
- "Hubs" terminology used instead of "Views"
- No clear separation between Core Navigation and Role-Based Views

**Required Views (per v11.0):**
- CS View (HealthScore, Escalations, ATHR, Adoption, Renewals, Plays)
- Sales View (Pipeline, Deals, Contacts, Sessions, next actions)
- Marketing View (Campaign intelligence, segmentation, messaging assets)
- PM View (Voice of customer, adoption signals, roadmap intelligence)
- Business OS View (Revenue + churn + execution KPIs)
- Admin View (RBAC, billing, connectors, audit logs, policy configuration)

**Action Required:**
- Document clear View structure
- Ensure Views are projections of Spine data
- Remove "Hub" terminology from user-facing labels (keep internal if needed)
- Implement View switching mechanism

---

### 5. Onboarding May Not Be Frictionless

**Severity:** 🔴 CRITICAL  
**Impact:** User experience violation

**v11.0 Requirement:**
> "Onboarding must be frictionless and cannot force heavy setup."  
> ✅ No "Invite team mandatory"  
> ✅ No "Connect everything mandatory"  
> ✅ No "heavy setup required"

**Current State:**
- Onboarding state exists (`onboarding_state` table)
- Personality scanner exists
- Need to verify no mandatory steps

**Action Required:**
- Audit onboarding flow for mandatory steps
- Ensure "Skip" options are available
- Verify demo data option exists
- Test that users can start with minimal setup

---

## 🟡 MEDIUM PRIORITY ISSUES

### 6. Inconsistent Navigation Across Sidebars

**Files:**
- `sidebar-ssot.tsx`
- `sidebar-mailerlite.tsx`
- `app-shell.tsx`
- `sidebar.tsx`

**Issue:** Multiple sidebar implementations with different navigation structures

**Action:** Consolidate to single sidebar component or ensure all follow v11.0 spec

---

### 7. "Loader" Terminology

**Issue:** "Loader" or "AI Loader" used in navigation, but v11.0 spec calls this "Load" (the ingestion layer)

**Action:** Consider renaming to "Load" or moving to Integrations section

---

### 8. Missing "Search / Memory" in Core Nav

**Issue:** v11.0 requires "Search / Memory" as primary navigation item, but it's not consistently present

**Action:** Add to all core navigation menus

---

### 9. "Insights" Placement

**Issue:** "Insights" appears in core nav, but v11.0 suggests it should be in Views or renamed

**Action:** Review placement - may belong in role-based Views

---

### 10. HTML Wireframes Not Aligned

**Files:**
- `Account Success HUbs/HUB-01-accounts-overview.html`
- `file.html` (wireframes)

**Issue:** Static HTML files may not reflect v11.0 terminology and structure

**Action:** Review and update wireframes to match v11.0 spec

---

### 11. Route Naming Inconsistencies

**Issue:** Routes use various naming conventions (`/brainstorming`, `/dashboard`, `/home`, `/today`)

**Action:** Standardize route names to match v11.0 navigation structure

---

### 12. Missing Governance Indicators

**Issue:** No clear UI indicators for:
- Governor Slack integration
- AI-Relay Gateway usage
- Audit trail visibility

**Action:** Add governance indicators where appropriate (may be backend-only, verify)

---

### 13. Documentation References

**Issue:** Some documentation files may reference old terminology

**Action:** Audit all `.md` files for banned terms and update

---

## ✅ COMPLIANT AREAS

### 1. Spine Architecture
- ✅ Spine SSOT concept appears implemented
- ✅ Normalization pipeline exists
- ✅ Canonical entities structure present

### 2. Governance Backend
- ✅ AI-Relay Gateway implemented (Phase 1 complete)
- ✅ Audit logs exist (`audit_logs` table)
- ✅ RBAC system implemented (`capabilities.ts`)

### 3. Integration Layer
- ✅ Connectors system exists
- ✅ Webhooks implemented
- ✅ Dump intake capability

### 4. IQ Hub Concept
- ✅ Referenced in some documentation
- ✅ Concept exists, but implementation uses "Brainstorming" label

---

## 📋 Remediation Plan

### Phase 1: Critical Fixes (Week 1)

1. **Replace "Brainstorming" with "IQ Hub"**
   - [ ] Update all sidebar components
   - [ ] Update route labels (keep `/brainstorming` route or migrate to `/iq-hub`)
   - [ ] Update page titles and metadata
   - [ ] Update all user-facing strings
   - [ ] Test all navigation flows

2. **Restructure Core Navigation**
   - [ ] Implement v11.0 core nav structure
   - [ ] Move "Loader" to Integrations
   - [ ] Add "Search / Memory"
   - [ ] Rename "Home" to "Today"
   - [ ] Set "Today" as default landing

3. **Document Role-Based Views**
   - [ ] Create View structure documentation
   - [ ] Map existing pages to Views
   - [ ] Implement View switching UI

### Phase 2: Medium Priority (Week 2)

4. **Consolidate Navigation**
   - [ ] Standardize sidebar implementations
   - [ ] Ensure consistency across all components

5. **Update Wireframes**
   - [ ] Review HTML wireframes
   - [ ] Update to match v11.0 terminology

6. **Onboarding Audit**
   - [ ] Test onboarding flow
   - [ ] Ensure all steps are optional
   - [ ] Add skip options where missing

### Phase 3: Documentation & Polish (Week 3)

7. **Documentation Update**
   - [ ] Review all `.md` files
   - [ ] Update terminology
   - [ ] Create View architecture diagram

8. **Testing**
   - [ ] End-to-end navigation test
   - [ ] User flow validation
   - [ ] Terminology consistency check

---

## 🔍 Detailed File Audit

### Files Requiring Immediate Changes

#### Navigation Components
1. `apps/integrationwise-os/components/sidebar-ssot.tsx`
   - Line 52: Change "Brainstorming" → "IQ Hub"
   - Lines 48-54: Restructure coreNavItems to match v11.0

2. `apps/integrationwise-os/components/app-shell.tsx`
   - Line 56: Change "Brainstorming" → "IQ Hub"
   - Restructure navigation

3. `apps/integrationwise-os/components/sidebar-mailerlite.tsx`
   - Line 57: Change "Brainstorming" → "IQ Hub"

4. `apps/integrationwise-os/components/sidebar.tsx`
   - Line 137: Change "Brainstorming" → "IQ Hub"

#### Route Files
5. `apps/integrationwise-os/app/brainstorming/page.tsx`
   - Consider renaming to `/iq-hub` or update metadata

6. `apps/integrationwise-os/app/(personal)/today/page.tsx`
   - Verify this is set as default landing

#### View Components
7. `apps/integrationwise-os/components/views/brainstorming-view.tsx`
   - Rename to `iq-hub-view.tsx` or update internal references

#### Documentation
8. All `.md` files referencing "Brainstorming" as user-facing term

---

## 📊 Compliance Checklist

### Terminology
- [ ] ❌ "Brainstorming" removed from user-facing labels
- [ ] ❌ "IQ Hub" used consistently
- [ ] ❌ "Today" used instead of "Home" or "Dashboard"
- [ ] ❌ "Load" terminology clarified
- [ ] ✅ No "Day 0 activation" found
- [ ] ✅ No "Activation Journey" found

### Navigation Structure
- [ ] ❌ Core navigation matches v11.0 spec
- [ ] ❌ "Today" is default landing
- [ ] ❌ "Search / Memory" in core nav
- [ ] ❌ Role-based Views clearly structured
- [ ] ❌ Integrations section properly organized

### User Flow
- [ ] ❌ Onboarding is frictionless
- [ ] ❌ No mandatory setup steps
- [ ] ❌ Skip options available
- [ ] ✅ Login flow exists

### Architecture
- [ ] ✅ Spine SSOT implemented
- [ ] ✅ Governance backend exists
- [ ] ❌ Views are clearly projections
- [ ] ✅ Integration layer exists

---

## 🎯 Success Criteria

**v11.0 Master Lock Compliance Achieved When:**

1. ✅ Zero instances of "Brainstorming" as user-facing label
2. ✅ Core navigation matches v11.0 spec exactly
3. ✅ "Today" is default landing view
4. ✅ Role-based Views clearly documented and implemented
5. ✅ Onboarding verified as frictionless
6. ✅ All navigation components consistent
7. ✅ Documentation updated
8. ✅ Wireframes aligned

---

## 📝 Notes

- **Route Migration:** Consider keeping `/brainstorming` route for backward compatibility but updating all labels to "IQ Hub"
- **Gradual Rollout:** Can implement changes incrementally, but all critical issues must be resolved before v11.0 release
- **Testing:** After fixes, conduct full user flow testing to ensure no broken navigation

---

**Next Steps:**
1. Review this audit with product team
2. Prioritize critical fixes
3. Create implementation tickets
4. Schedule remediation sprints

---

**Audit Status:** ⚠️ **NON-COMPLIANT**  
**Last Updated:** January 16, 2026  
**Next Review:** After Phase 1 fixes complete
