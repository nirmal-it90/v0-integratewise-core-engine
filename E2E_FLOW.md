# IntegrateWise OS - End-to-End User Flow

## Complete User Journey (Frontend Only)

```
Landing Page
    ↓
    ├─→ "Get Started" → Sign Up Page
    │       ↓
    │   Create Account (Name, Company, Email)
    │       ↓
    │   Auto-Login (User Context)
    │
    └─→ "Sign In" → Login Page
            ↓
        Enter Details (Name, Email)
            ↓
        Auto-Login (User Context)

    BOTH PATHS CONVERGE:
            ↓
    Onboarding Profile Selector
            ↓
            ├─→ Basic (2-3 min)
            │   └─→ Identity Setup Only
            │       └─→ Dashboard
            │
            ├─→ Standard (5-7 min) ← DEFAULT
            │   ├─→ Identity Setup
            │   ├─→ Workspace Setup
            │   └─→ Workspace Activated
            │       └─→ Dashboard
            │
            └─→ Comprehensive (15-20 min)
                ├─→ Identity Setup
                ├─→ Workspace Setup
                ├─→ Integrations (required: ≥1 connector)
                ├─→ Data Scope Setup
                ├─→ Memory Configuration
                ├─→ Governance Rules
                ├─→ AI Policy Setup
                ├─→ Review & Confirm
                └─→ Workspace Fully Configured
                    └─→ Dashboard

    Dashboard → Main Hub
        ├─→ Integration Manager (/integrations/manager)
        │   ├─→ Browse 12 connectors
        │   ├─→ Select connector (OAuth/API key)
        │   ├─→ Connection status tracking
        │   └─→ Disconnect capability
        │
        ├─→ Configuration Manager (/configuration)
        │   ├─→ Hydration Policy
        │   ├─→ Retention Settings
        │   ├─→ Governance Rules
        │   ├─→ AI Model Selection
        │   └─→ Autonomy Levels
        │
        └─→ Logout → Landing Page
```

## File Structure & Components

### Authentication Flow
```
/app/auth/
├── login/page.tsx          → Sign in with name + email → useUser.login() → /onboarding/select
└── sign-up/page.tsx        → Sign up form → useUser.login() → /onboarding/select
```

### Onboarding Flow
```
/app/onboarding/
├── select/page.tsx         → Profile selector (Basic/Standard/Comprehensive)
└── page.tsx                → Main orchestrator with router params

/components/onboarding/
├── onboarding-profile-selector.tsx → Profile selection UI
├── onboarding-orchestrator.tsx     → Central state manager + routing
├── onboarding-progress.tsx         → Progress indicator
├── onboarding-completion-review.tsx → Final review screen
│
└── stages/
    ├── basic-stage.tsx             → Identity + Persona
    ├── standard-stage.tsx          → Workspace setup
    ├── integration-stage.tsx        → Connector selection (≥1 required)
    ├── comprehensive-stages.tsx    → Data scope, Memory, Governance, AI Policy
```

### Post-Onboarding Pages
```
/app/dashboard/page.tsx              → Main hub (redirect from orchestrator after completion)
/integrations/manager/page.tsx        → Integration Manager UI
/configuration/page.tsx              → Configuration Manager UI
/integrations/page.tsx               → Available integrations browser
```

### Context & State Management
```
/lib/contexts/user-context.tsx  → UserProvider + useUser hook
  ├─ Manages: id, email, fullName, status, onboardingProfile, workspaceId, apiKey
  ├─ Actions: login(), logout(), startOnboarding(), completeOnboarding()
  └─ Storage: localStorage persists user state across sessions
```

## State Flow Diagram

```
Initial: user.status = 'unauthenticated'
  ↓
Auth: user.status = 'authenticated' (after login/signup)
  ├─ email: "user@example.com"
  ├─ fullName: "John Doe"
  └─ onboardingCompleted: false
  ↓
Onboarding: user.status = 'onboarding'
  ├─ onboardingProfile: "standard" | "basic" | "comprehensive"
  └─ Navigate through stages
  ↓
Complete: user.status = 'completed'
  ├─ workspaceId: "ws_1234567890"
  ├─ apiKey: "sk_abc1234567"
  └─ onboardingCompleted: true
  ↓
Dashboard: Full access to workspace, integrations, configuration
```

## Navigation Sequences

### Happy Path (Standard Onboarding)
1. Landing → Get Started
2. Sign Up (new user) OR Login (existing user)
3. Redirect to `/onboarding/select`
4. Select "Standard" profile
5. Complete "User Profile" stage
6. Complete "Workspace Setup" stage → Workspace activated
7. Auto-redirect to `/integrations/manager`
8. From there: Can explore integrations, go to `/configuration`, or return to dashboard

### Alternative: Quick Start (Basic)
1. Landing → Get Started
2. Sign Up/Login
3. Select "Basic" profile
4. User info only
5. Redirect to Integration Manager
6. Can upgrade to full setup later

### Alternative: Full Setup (Comprehensive)
1. Landing → Get Started
2. Sign Up/Login
3. Select "Comprehensive" profile
4. All 8 stages (required: ≥1 integration)
5. Review screen
6. Fully configured workspace
7. Redirect to Dashboard

## Key Integration Points

### Landing Page
- Links to `/auth/sign-up` and `/auth/login`
- Links to `/onboarding/select` for returning users

### Auth Pages
- Call `useUser().login(email, fullName)`
- Redirect to `/onboarding/select` with router.push()

### Onboarding Orchestrator
- Reads `?profile=basic|standard|comprehensive` query param
- Manages all stage progression with localStorage persistence
- Calls `useUser().completeOnboarding()` on finish
- Auto-redirects to `/integrations/manager` (or `/dashboard` route)

### Dashboard
- Verifies `user.status === 'completed'`
- Shows workspace info (ID, API Key, status)
- Links to Integration Manager and Configuration Manager
- Logout button triggers `useUser().logout()` → redirect to landing

## Data Persistence

### localStorage Keys
```
user_state              → Full user context (id, email, status, etc.)
onboarding-basic       → Basic profile state (if resuming)
onboarding-standard    → Standard profile state (if resuming)
onboarding-comprehensive → Comprehensive profile state (if resuming)
api_key                → Generated API key
workspace_config       → Workspace settings (from onboarding)
```

### Session Management
- User state persists across browser sessions (localStorage)
- Logout clears `user_state` from localStorage
- All pages check `user.status` to enforce proper routing

## URL Map

| Route | Purpose | Auth Required | Status Check |
|-------|---------|---------------|--------------|
| / | Redirect to /landing | No | - |
| /landing | Landing page | No | - |
| /auth/login | Login form | No | - |
| /auth/sign-up | Signup form | No | - |
| /onboarding/select | Profile selector | Yes (authenticated) | authenticated |
| /onboarding | Orchestrator + stages | Yes | authenticated |
| /onboarding?profile=standard | Standard flow | Yes | authenticated |
| /dashboard | Main hub | Yes | completed |
| /integrations/manager | Integration Manager | Yes | completed |
| /configuration | Configuration Manager | Yes | completed |
| /integrations | Integrations browser | Yes | completed |

## Onboarding Profile Behaviors

### Basic Profile
- **Stages**: User Profile (1 stage)
- **Time**: 2-3 minutes
- **Output**: User identity only
- **Use Case**: Invited users, quick exploration
- **Next Step**: Direct to integrations/dashboard

### Standard Profile (DEFAULT)
- **Stages**: User Profile → Workspace Setup (2 stages)
- **Time**: 5-7 minutes
- **Output**: Activated workspace with type/persona matrix
- **Use Case**: Self-serve signup, SMB SaaS flow
- **Workspace Activation**: Happens immediately after stage 2
- **Next Step**: Integration Manager with progressive setup available

### Comprehensive Profile
- **Stages**: All 8 stages including integrations, data scope, memory, governance, AI policy
- **Time**: 15-20 minutes
- **Output**: Fully configured operational environment
- **Use Case**: Enterprise, Customer Zero, admin-driven setup
- **Integration Requirement**: ≥1 connector must be selected
- **Next Step**: Fully configured dashboard

## Flow Notes

- All flows are **frontend-only** with localStorage persistence
- No backend API calls (mocked/logged to console)
- User context provides single source of truth across all pages
- Progressive activation: users can interrupt and resume any onboarding
- All navigation uses Next.js useRouter for smooth transitions
- Suspense boundaries prevent hydration errors with useSearchParams
