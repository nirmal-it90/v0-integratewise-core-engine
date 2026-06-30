# IntegrateWise OS — Canonical SSOT + 5-Page Habitat + Owner Cockpit + Agent Layer (Master Spec)

## Document Control

* **Owner:** IntegrateWise (Nirmal)
* **Status:** Publishable SSOT
* **Version:** v1.1
* **Last Updated:** 2026-01-11
* **Audience:** Product, Engineering, GTM, CS, Partners
* **Scope:** One SSOT powering both the 5-page habitat and the owner cockpit, with agents layered on top.

---

## Workbook Index (How to use this document)

Use this as both a **knowledge book** (definitions + contracts) and a **workbook** (checklists + fill-in templates).

* **Part I — Platform Spec:** Sections 0–20 + Appendix A
* **Part II — AI Features Workbook:** Appendix B–E

---

## 0) Baseline (Non-Negotiable)

* We ship a **zero-friction, incremental 5-page habitat** for individual-led GTM and CS-led monetization.
* In parallel, the **full Business OS cockpit** remains **active, usable, and continuously developed** for the IntegrateWise owner (demo/owner mode).
* Both experiences run on the **same SSOT (Atlas Spine)**. No forked data models, no parallel systems.

---

## Terms and Terminologies (Locked Definitions)

### BYOM — Bring Your Own Model
* **Goal:** sovereignty + flexibility for advanced users.
* **Principle:** onboarding stays frictionless; BYOM is experienced only after initial value.
* **Availability:** plan-gated (Pro+). Default uses hosted models.

### BYOT — Bring Your Own Template
* **Goal:** render normalized data into a structured operating template.
* Users can:
  1. choose a template from the IntegrateWise template gallery, or
  2. bring their own template via URL (e.g., Notion/Coda template URL).
* **Monetization:**
  * **One-time payment** for "clean + render once" using AI Loader, or
  * **Membership** enables scheduled rendering/sync frequency based on plan.

### Authorized Destinations (Approved Tools Only)
* IntegrateWise renders data only to an **allowlisted set of destination tools** to prevent data leaks.
* **No arbitrary bring-your-own tool destinations** and **no custom endpoints** by default.
* Destination connectors are **vetted**, **logged**, and **policy-gated**.

### AI Loader (Two Stages)

**Stage 1 — 60-second Creamy Layer**
* Fast extraction from dump/tool with strict limits (file types, size thresholds, sampling rules).
* Produces: top entities + tasks + key threads + highlights + provenance links to sources.
* Avoids full deep extraction on first run.

**Stage 2 — Full Implementation (Template + Render Engine)**
* Deep extraction + identity mapping + governance + structured rendering into the selected BYOT template.
* Supports scheduled runs based on membership plan.

### Brainstorming
* **Path A:** Browser Memory + Connected Tools/Data Dump → Brainstorming
* **Path B:** AI Relay → ChatGPT/Claude/Gemini → Relay Webhook → Slack → Brainstorming
  * Optional reverse loop: Slack bot can query Brainstorming context / team knowledge base (policy-gated).
* Outputs: decisions → action items → optionally "execute" (only via governed, approved actions).

### AI Insights
* Insights derived from Brainstorming layer + Spine signals.

### Persona Revelation
* Based on the **Pythagorean method** (Name + DOB).
* Stored as a persona profile in SSOT and used to set safe defaults.

### Spine
* The **Atlas Spine** is the SSOT: normalized entities + provenance + governance fields powering all hubs/views.

### Hub / Lens
* OS / TEAM / CS / BUSINESS are **lenses over the same Spine**—filters + rollups, not separate systems.

### Cockpit
* The existing Business OS view for the owner (Nirmal's command center), continuously active on the same Spine.

---

## 1) Product Thesis (What we are)

**IntegrateWise is a Customer Operations OS built on a universal data spine.**
It starts with **instant value (Bliss)**, earns trust, then transforms **tool chaos into clarity through a unified SSOT**, and finally renders outcomes back into the tools people already use.

* **Core loop:** Normalize once. Render anywhere.
* **Adoption loop:** Individual → Team → CS leadership → Business owner.

---

## 2) Two Surfaces, One Platform

### Surface A — User Habitat (PLG, default)

**Top nav stays 5 items only:**
1. AI Loader
2. Tasks
3. Brainstorming
4. AI Insights
5. Settings (contains Profile + Integrations + Authorized Destinations)

**Goal:** zero overwhelm, fast habit formation, progressive disclosure.

### Surface B — Owner Cockpit (Business OS)

* Full "cockpit" modules for running IntegrateWise (Ops/Sales/CS/Marketing/Finance/etc).
* **Owner/demo workspace only** by default.
* Uses the same Spine, same orchestration gates, same security posture.
* Can be revealed to paying orgs later (Enterprise unlock), but never blocks PLG.

---

## 3) Canonical End-to-End Flow (User)

### A) Zero-friction onboarding (no API keys)
1. Marketing (integratewise.co) → Get Started
2. Auth (os.integratewise.online) → Google/email login
3. **Bliss moment** → Name + DOB → Nature of the User Revelation

### B) Trust → data (pull strategy)
4. Prompt user to do **one** action:
   * Connect 1 tool (OAuth) OR
   * Data dump (CSV/PDF/docs/URLs/screenshots) OR
   * Browser memory capture
5. AI Loader runs:
   * Ingest → normalize → dedupe → classify → provenance

### C) Landing Zone (5 pages)
User lands in the 5-page habitat; everything else stays hidden/locked.

### D) Brainstorming has 2 entry points
* Path A: Browser memory + tool connections + data dump → Brainstorming
* Path B: External LLM → AI Relay webhook → Slack → Brainstorming

### E) Paid gating
* Free: default hosted AI (no keys), limited runs/connectors
* Pro+: BYOM enabled; scheduled rendering; deeper automation/write-back (with approvals)

---

## 4) SSOT: Atlas Spine (Canonical Data Model)

### A) Spine Entities (hub-neutral)

Minimum canonical entities:
* identities/anchors: `workspace_id`, `user_id`, `account_id_anchor`, `subscription_id`, `ticket_id`, `artifact_id`
* operational objects: `accounts`, `conversations`, `messages`, `tasks`, `artifacts`, `integrations`
* eventing/audit: `inbound_events_raw`, `normalized_events`, `agent_runs`, `render_outputs`, `approvals`, `automation_runs`
* governance: `pii_flags`, `schema_version`, `source_system`, `source_ref`, `hash`, `access_scope`

### B) Hub tagging (SSOT → specialized views)

Each entity gets `entity_hub_tags` (array recommended):
* `OS`, `TEAM`, `CS`, `BUSINESS`

**Simple deterministic rules (baseline):**
* Linked to an `account_id_anchor` (CRM/support/customer object) → include `CS`
* Linked to revenue/subscription/deal objects → include `BUSINESS`
* Personal sources (browser memory, personal dumps) with no account link → include `OS`
* Team-shared scope/Slack workspace context → include `TEAM`

This enables: **Shared Spine, Specialized Views** without schema forks.

---

## 14) Routing + State Machine (Canonical)

### States
* AUTHENTICATED
* PERSONAL_INSIGHTS_DONE
* DATA_SELECTED
* LOADER_RUNNING
* LANDING_ZONE_READY
* TEAM_ENABLED (optional)
* EXPANDED_UNLOCKED (optional)
* DEMO_MODE (owner)

### Route gating rule
Until LANDING_ZONE_READY, user cannot browse "everything." They remain guided.

---

## 15) Navigation Visibility Contract (Non-overwhelm)

Top-level nav is always the same 5 items after landing zone readiness:
* AI Loader
* Tasks
* Brainstorming
* AI Insights
* Settings

Cockpit modules appear only when:
* `cockpit_mode_enabled = true` AND role is owner/admin.

---

## 16) Entitlements + Pricing (Free vs Pro vs Enterprise vs Owner)

### A) Plans (pricing)
* **Free/Trial:** ₹0
* **Pro:** ₹4,999/month (workspace)
* **Enterprise:** Custom (annual)

### B) Plan entitlements (feature flags)

**Free/Trial**
* Hosted AI defaults (no keys)
* Limited sources + limited runs
* AI Loader Stage 1 enabled; Stage 2 gated
* Limited templates and/or limited renders
* No L3 execution

**Pro (₹4,999/mo)**
* BYOM enabled
* More connectors (sources) and **authorized destinations**
* Scheduled rendering (rate based on plan)
* BYOT: template gallery access + template URL ingestion
* L2 renders allowed (approval policy configurable)
* Limited L3 execution (policy-based, approvals mandatory)

**Enterprise (Custom)**
* SSO/SAML + advanced RLS controls
* Audit/retention policies + export controls
* Higher limits + priority queues
* Full L3 execution with approvals + advanced rollback policies
* Custom connectors (subject to allowlist governance)

**Owner Cockpit (internal)**
* Internal agents enabled
* Demo data templates and simulated connectors
* Cockpit-only modules remain available regardless of commercial plans

---

## 20) Required Tables (Data schema starting set)

### A) SSOT Core
* `integrations`
* `inbound_events_raw`
* `normalized_events`
* `accounts`
* `conversations`
* `messages`
* `tasks`
* `artifacts`

### B) AI + Governance
* `agent_runs`
* `render_outputs`
* `approvals`
* `feedback_events`

### C) Identity + Access
* `identity_maps` (external IDs → anchors)
* `access_policies`
* `membership_roles`

### D) Commercialization
* `pricing_plans`
* `entitlements`
* `usage_counters`
* `subscriptions`
* `payments`

### E) Templates (BYOT)
* `templates`
* `template_versions`
* `template_runs`

---

## Appendix A — Authorized Destination Security Policy

### A1) Authorized Destinations Allowlist (v1)

* **Notion**
* **Coda**
* **Google Sheets**
* **ClickUp**
* **Jira**
* **Linear**

No custom destinations, arbitrary webhooks, or user-defined endpoints are permitted by default.

---

## Appendix B — AI Features Catalog

### B4) AI Features — What is "MVP" vs "Later"

**MVP (Launch-ready)**
* Bliss: Persona Revelation + default view setup
* AI Loader Stage 1 (cream layer) + provenance
* Brainstorming: two entry points + structured outputs
* Tasks: extraction + triage
* Insights: digest + risk list
* Agent orchestration gates + logging
* Authorized destinations: Notion/Coda/Sheets (minimum) with audit logs

**Later (Enterprise-grade)**
* Bi-directional sync (conflict policies)
* Custom models at org scale (BYOM + on-prem)
* Advanced health model training and tuning
* Full template marketplace (Template Forge UI + deploy)
