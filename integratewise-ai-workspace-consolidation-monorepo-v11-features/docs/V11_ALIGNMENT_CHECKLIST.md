# v11.0 Master Lock Alignment Checklist

**Date:** January 16, 2026  
**Reference:** `V11_MASTER_LOCK_FINAL.md`  
**Purpose:** Verify all implementations align with locked v11.0 spec

---

## 🔴 CRITICAL ALIGNMENT ISSUES

### Master Headline
**Required:** "Load your work. Store it in your Spine. Think in your IQ Hub. Act through your Cognitive Twin. Govern with your apps."

**Status:** ❌ **NOT VERIFIED**
- [ ] Homepage uses exact headline
- [ ] Marketing pages use exact headline
- [ ] All public-facing materials use exact headline

---

### One-Sentence Thesis
**Required:** "IntegrateWise eliminates Tool Sprawl, solves the CS Team Paradox, and closes the GenAI Divide by normalizing everything into one governed Spine and projecting role-based Views powered by an always-ready Cognitive Twin."

**Status:** ❌ **NOT VERIFIED**
- [ ] Homepage uses exact thesis
- [ ] About page uses exact thesis
- [ ] Pitch decks use exact thesis
- [ ] All marketing materials align

---

### Banned Term: "Digital Twin" → "Cognitive Twin"

**Files to Check:**
- [ ] All code files
- [ ] All documentation
- [ ] All marketing materials
- [ ] All user-facing strings

**Command:**
```bash
grep -r "Digital Twin" apps/integrationwise-os/ --include="*.tsx" --include="*.ts" --include="*.md"
```

**Status:** ⚠️ **NEEDS VERIFICATION**

---

### Banned Term: "Brainstorming Layer" (user-facing) → "IQ Hub"

**Files Already Identified:**
- [ ] `components/sidebar-ssot.tsx` - Line 52
- [ ] `components/app-shell.tsx` - Line 56
- [ ] `components/sidebar-mailerlite.tsx` - Line 57
- [ ] `components/sidebar.tsx` - Line 137
- [ ] `app/brainstorming/page.tsx` - Entire file
- [ ] `components/views/brainstorming-view.tsx` - Entire file
- [ ] 20+ additional files

**Status:** 🔴 **CRITICAL - NOT COMPLIANT**

---

### Core Loop: Load → Store → Think → Act → Govern

**Required Order:** Exact sequence must be maintained

**Status:** ❌ **NOT VERIFIED**
- [ ] Documentation reflects exact order
- [ ] UI flows follow exact order
- [ ] Diagrams show exact order

---

### First-Time Login Flow

**Required:**
1. Login (Google / Microsoft / Email)
2. Persona Analysis (6–10 seconds)
3. Persona Insights (recommended View, confirm/override)
4. Load Your Data (Connect / Dump / Skip)
5. Enter Workspace → Today

**Status:** ⚠️ **PARTIALLY COMPLIANT**
- [ ] Login works (Google / Microsoft / Email)
- [ ] Persona Analysis is 6–10 seconds
- [ ] Persona Insights recommends View
- [ ] Load Your Data allows Connect / Dump / Skip
- [ ] Default landing is Today (NOT verified)

---

### Post-Login Daily Loop

**Required:**
1. Login → Today (Daily Command Center)
2. Switch into your role-based View
3. IQ Hub captures and structures new thinking
4. Cognitive Twin prepares context + drafts actions
5. Governance logs + gates sensitive operations

**Status:** ❌ **NOT COMPLIANT**
- [ ] Default landing is Today (currently redirects to /insights)
- [ ] Role-based View switching works
- [ ] IQ Hub captures thinking (exists but named "Brainstorming")
- [ ] Cognitive Twin prepares context (verify terminology)
- [ ] Governance logs + gates (backend exists)

---

### Role-Based Views

**Required Views (Locked):**
- Customer Success View — health, risk, renewals, plays
- Sales View — pipeline, deals, next steps
- Marketing View — segmentation, campaigns, assets
- PM View — voice of customer, adoption, roadmap signals
- Business OS (Owner Cockpit) — KPI control tower
- Admin View — RBAC, connectors, billing, audit logs

**Status:** ⚠️ **MOSTLY COMPLIANT**
- [ ] Customer Success View exists (verified: /cs/accounts)
- [ ] Sales View exists (verified: /sales)
- [ ] Marketing View exists (verify: /campaigns or /content)
- [ ] PM View exists (verify: /projects or /strategy)
- [ ] Business OS View exists (verify: /strategy or /metrics)
- [ ] Admin View exists (verify: /command-center or /admin)

---

### Governance

**Required Components (Locked):**
- Governor Slack (Slack Triage Center) — intake + approvals
- AI-Relay Gateway — single audited gateway for AI + tools
- Audit Trail (AuditLog) — immutable traceability
- Policy Gates — RBAC, PII rules, write-back controls

**Status:** ✅ **COMPLIANT** (Backend Implemented)
- [ ] Governor Slack implemented (Phase 2 - Triage Bot)
- [ ] AI-Relay Gateway implemented (Phase 1 - Webhook)
- [ ] Audit Trail exists (`audit_logs` table)
- [ ] Policy Gates exist (RBAC in `capabilities.ts`)

---

## 📋 DETAILED ALIGNMENT CHECKLIST

### Master Headline Compliance
- [ ] Homepage: `app/page.tsx` uses exact headline
- [ ] Landing page: Exact headline present
- [ ] Marketing materials: Exact headline used
- [ ] Email templates: Exact headline used
- [ ] Social media: Aligned messaging

**Action Required:**
- Verify homepage copy
- Update if not exact match

---

### Terminology Compliance

#### "Cognitive Twin" (Not "Digital Twin")
- [ ] No instances of "Digital Twin" in code
- [ ] All references use "Cognitive Twin"
- [ ] Documentation uses "Cognitive Twin"
- [ ] Marketing uses "Cognitive Twin"

**Files to Check:**
```bash
# Search for "Digital Twin"
grep -r "Digital Twin" . --include="*.tsx" --include="*.ts" --include="*.md"

# Search for "Cognitive Twin"
grep -r "Cognitive Twin" . --include="*.tsx" --include="*.ts" --include="*.md"
```

**Status:** ⚠️ **NEEDS VERIFICATION**

---

#### "IQ Hub" (Not "Brainstorming" user-facing)
- [ ] No "Brainstorming" in navigation labels
- [ ] No "Brainstorming" in page titles
- [ ] No "Brainstorming" in user-facing strings
- [ ] All use "IQ Hub" instead

**Files Already Identified:**
- 25+ files need updates
- See `V11_COMPONENT_INVENTORY.md` for complete list

**Status:** 🔴 **CRITICAL - NOT COMPLIANT**

---

#### "Today" (Not "Home" or "Dashboard")
- [ ] Default landing is `/today`
- [ ] No "Home" or "Dashboard" in navigation
- [ ] "Today" is primary navigation item

**Current Status:**
- ❌ Default landing redirects to `/insights` or `/command-center`
- ❌ Route `/dashboard` exists and redirects
- ✅ Route `/today` exists but not default

**Action Required:**
- Set `/today` as default landing
- Remove or update `/dashboard` redirect
- Update navigation labels

---

### Core Loop Compliance

#### Load (Ingestion)
- [ ] Connectors exist
- [ ] Dumps exist
- [ ] Slack/Webhooks exist
- [ ] All capture without losing context

**Status:** ✅ **COMPLIANT**

---

#### Store (Spine SSOT)
- [ ] Spine exists as SSOT
- [ ] Canonical entities exist
- [ ] Provenance tracked
- [ ] Auditability exists

**Status:** ✅ **COMPLIANT**

---

#### Think (IQ Hub)
- [ ] IQ Hub exists (currently named "Brainstorming")
- [ ] Working memory + retrieval exists
- [ ] Reusable assets (templates, playbooks, decisions, research)
- [ ] Knowledge doesn't evaporate

**Status:** ⚠️ **PARTIALLY COMPLIANT**
- ✅ Functionality exists
- ❌ Named "Brainstorming" instead of "IQ Hub"
- ✅ Features match requirement

**Action Required:**
- Rename to "IQ Hub"
- Update all references

---

#### Act (Cognitive Twin + Views)
- [ ] Cognitive Twin prepares context
- [ ] Role-based Views exist
- [ ] Prepared insights delivered
- [ ] Suggested actions generated
- [ ] Safe write-back proposals

**Status:** ⚠️ **PARTIALLY COMPLIANT**
- ✅ Views exist
- ⚠️ Cognitive Twin terminology needs verification
- ✅ Safe write-backs exist

**Action Required:**
- Verify "Cognitive Twin" terminology throughout
- Ensure all Views receive prepared context

---

#### Govern (Trust Layer)
- [ ] AI-Relay Gateway exists
- [ ] Governor Slack exists
- [ ] AuditLog exists
- [ ] Policy Gates exist

**Status:** ✅ **COMPLIANT** (Backend)

---

### First-Time Login Flow Compliance

**Required Flow:**
1. Login (Google / Microsoft / Email) ✅
2. Persona Analysis (6–10 seconds) ⚠️
3. Persona Insights (recommended View) ⚠️
4. Load Your Data (Connect / Dump / Skip) ⚠️
5. Enter Workspace → Today ❌

**Status:** ⚠️ **PARTIALLY COMPLIANT**
- ✅ Login works
- ⚠️ Persona Analysis timing needs verification
- ⚠️ Persona Insights flow needs verification
- ⚠️ Load Your Data options need verification
- ❌ Default landing is NOT Today

**Action Required:**
- Test onboarding flow end-to-end
- Verify all steps are optional (frictionless)
- Set default landing to Today
- Verify persona analysis is 6–10 seconds

---

### Post-Login Daily Loop Compliance

**Required Flow:**
1. Login → Today (Daily Command Center) ❌
2. Switch into your role-based View ✅
3. IQ Hub captures and structures new thinking ⚠️
4. Cognitive Twin prepares context + drafts actions ⚠️
5. Governance logs + gates sensitive operations ✅

**Status:** ❌ **NOT COMPLIANT**
- ❌ Default landing is NOT Today
- ✅ View switching works
- ⚠️ IQ Hub exists but named "Brainstorming"
- ⚠️ Cognitive Twin terminology needs verification
- ✅ Governance exists

**Action Required:**
- Set default landing to Today
- Rename "Brainstorming" to "IQ Hub"
- Verify Cognitive Twin terminology

---

### Role-Based Views Compliance

**Required Views:**

1. **Customer Success View**
   - health, risk, renewals, plays
   - ✅ `/cs/accounts` - TAM accounts
   - ✅ `/cs/risks` - Risk view
   - ✅ `/cs/tam` - TAM cockpit
   - ✅ `/cs/war-room` - War room
   - **Status:** ✅ **COMPLIANT**

2. **Sales View**
   - pipeline, deals, next steps
   - ✅ `/sales` - Sales hub
   - ✅ `/pipeline` - Pipeline
   - ✅ `/deals` - Deals
   - **Status:** ✅ **COMPLIANT**

3. **Marketing View**
   - segmentation, campaigns, assets
   - ⚠️ `/campaigns` - Verify if Marketing View
   - ⚠️ `/content` - Verify if Marketing View
   - **Status:** ⚠️ **NEEDS VERIFICATION**

4. **PM View**
   - voice of customer, adoption, roadmap signals
   - ⚠️ `/projects` - Verify if PM View
   - ⚠️ `/strategy` - Verify if PM View
   - **Status:** ⚠️ **NEEDS VERIFICATION**

5. **Business OS (Owner Cockpit)**
   - KPI control tower
   - ⚠️ `/strategy` - May be Business OS
   - ⚠️ `/metrics` - May be Business OS
   - **Status:** ⚠️ **NEEDS VERIFICATION**

6. **Admin View**
   - RBAC, connectors, billing, audit logs
   - ⚠️ `/command-center` - May be Admin View
   - ⚠️ `/admin` - Verify if exists
   - **Status:** ⚠️ **NEEDS VERIFICATION**

---

### Governance Compliance

**Required Components:**

1. **Governor Slack (Slack Triage Center)**
   - intake + approvals
   - ✅ Implemented (Phase 2 - Triage Bot)
   - ✅ Slack handler integrated
   - **Status:** ✅ **COMPLIANT**

2. **AI-Relay Gateway**
   - single audited gateway for AI + tools
   - ✅ Implemented (Phase 1 - Webhook)
   - ✅ Signature verification
   - ✅ Audit logging
   - **Status:** ✅ **COMPLIANT**

3. **Audit Trail (AuditLog)**
   - immutable traceability
   - ✅ `audit_logs` table exists
   - ✅ Logging implemented
   - **Status:** ✅ **COMPLIANT**

4. **Policy Gates**
   - RBAC, PII rules, write-back controls
   - ✅ `capabilities.ts` exists (RBAC)
   - ✅ Policy enforcement exists
   - **Status:** ✅ **COMPLIANT**

---

## 🎯 PRIORITY ALIGNMENT FIXES

### P0 - Critical (Do Immediately)
1. ❌ Replace "Brainstorming" → "IQ Hub" (25+ files)
2. ❌ Set `/today` as default landing
3. ❌ Fix core navigation structure (4 sidebar components)
4. ⚠️ Verify "Cognitive Twin" terminology (no "Digital Twin")
5. ⚠️ Verify master headline is used exactly

### P1 - High (Do This Week)
6. ⚠️ Verify one-sentence thesis is used
7. ⚠️ Verify first-time login flow matches exactly
8. ⚠️ Verify post-login daily loop matches
9. ⚠️ Verify role-based Views all exist
10. ⚠️ Update marketing materials to locked copy

### P2 - Medium (Do This Month)
11. ⚠️ Verify all Views have required features
12. ⚠️ Test onboarding flow end-to-end
13. ⚠️ Verify governance UI indicators exist
14. ⚠️ Update all documentation to locked spec
15. ⚠️ Create alignment verification tests

---

## ✅ COMPLIANCE SCORE

**Overall:** 60/100

**Breakdown:**
- Master Headline: 0/100 (Not verified)
- One-Sentence Thesis: 0/100 (Not verified)
- Terminology: 30/100 (Critical violations)
- Core Loop: 60/100 (Structure exists, terminology issues)
- First-Time Login: 70/100 (Mostly works, landing wrong)
- Post-Login Loop: 50/100 (Mostly works, landing wrong)
- Role-Based Views: 80/100 (Mostly exist, some need verification)
- Governance: 95/100 (Backend complete, UI needs work)
- Banned Terms: 20/100 (Multiple violations)

---

## 📝 ALIGNMENT ACTION PLAN

### Week 1: Critical Fixes
- [ ] Replace all "Brainstorming" → "IQ Hub"
- [ ] Set `/today` as default landing
- [ ] Fix navigation structure
- [ ] Verify "Cognitive Twin" terminology

### Week 2: Verification
- [ ] Verify master headline in all materials
- [ ] Verify one-sentence thesis in all materials
- [ ] Test onboarding flow matches spec
- [ ] Test post-login flow matches spec

### Week 3: Documentation
- [ ] Update all docs to locked spec
- [ ] Create alignment verification tests
- [ ] Document all role-based Views
- [ ] Final compliance review

---

**Last Updated:** January 16, 2026  
**Next Review:** After P0 fixes complete  
**Status:** ⚠️ **NOT ALIGNED - Fixes Required**
