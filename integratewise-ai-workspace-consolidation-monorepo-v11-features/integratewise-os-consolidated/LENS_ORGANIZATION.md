# INTEGRATEWISE - 3 LENS ORGANIZATION
## Generic Components + Lens-Based Views

**Principle:** Same components, different views per lens
**Last Updated:** 2026-01-15

---

## CORE PRINCIPLE

```
ONE COMPONENT → RENDERS BASED ON LENS CONTEXT

Example:
<AccountsView lens="cs" />  → Shows health scores, risks, renewals
<AccountsView lens="bs" />  → Shows revenue, deals, pipeline
<AccountsView lens="os" />  → Shows personal contacts, network
```

---

## GENERIC COMPONENT STRUCTURE

### 1. ACCOUNTS/CLIENTS (Generic)
**Component:** `accounts-view.tsx`

| Lens | Fields Shown | Metrics |
|------|--------------|---------|
| CS | health_score, nps, adoption, renewal_date | Health, Risk, Engagement |
| BS | arr, deals, pipeline_value, last_contact | Revenue, Pipeline, Conversion |
| OS | relationship, last_interaction, notes | Network strength |

### 2. DASHBOARD (Generic)
**Component:** `dashboard-view.tsx`

| Lens | Widgets |
|------|---------|
| CS | Portfolio health, At-risk accounts, Renewals due, NRR |
| BS | Revenue, Pipeline, Deals won, Leads |
| OS | Today's focus, Tasks due, Goals progress, Insights |

### 3. TASKS (Generic)
**Component:** `tasks-view.tsx`

| Lens | Grouping | Filters |
|------|----------|---------|
| CS | By account, By risk level | Account, Priority, Due |
| BS | By project, By client | Project, Client, Status |
| OS | By goal, By context | Personal, Work, Goal |

### 4. METRICS (Generic)
**Component:** `metrics-view.tsx`

| Lens | KPIs |
|------|------|
| CS | Health avg, NRR, Churn, CSAT |
| BS | Revenue, Pipeline, Conversion, CAC |
| OS | Tasks completed, Goals progress, Focus time |

### 5. PIPELINE/DEALS (Generic)
**Component:** `pipeline-view.tsx`

| Lens | Stages | Values |
|------|--------|--------|
| CS | Onboarding → Adoption → Expansion → Renewal | Health score |
| BS | Lead → Qualified → Proposal → Negotiation → Won | Deal value |
| OS | Idea → Planning → In Progress → Done | Personal projects |

---

## IMPLEMENTATION PATTERN

```typescript
// components/views/accounts-view.tsx

interface AccountsViewProps {
  lens: 'cs' | 'bs' | 'os';
}

export function AccountsView({ lens }: AccountsViewProps) {
  // Get lens-specific config
  const config = LENS_CONFIGS[lens];
  
  // Fetch data with lens-specific fields
  const { data } = useAccounts({ 
    fields: config.visibleFields,
    metrics: config.keyMetrics 
  });
  
  return (
    <div>
      <Header title={config.title} />
      <DataTable 
        columns={config.columns}
        data={data}
      />
      {lens === 'cs' && <HealthScoreWidget />}
      {lens === 'bs' && <RevenueWidget />}
      {lens === 'os' && <RelationshipWidget />}
    </div>
  );
}

// Lens configurations
const LENS_CONFIGS = {
  cs: {
    title: 'Accounts',
    visibleFields: ['health_score', 'nps', 'renewal_date', 'csm'],
    keyMetrics: ['health', 'adoption', 'engagement'],
    columns: [...CS_COLUMNS]
  },
  bs: {
    title: 'Clients', 
    visibleFields: ['arr', 'deals', 'pipeline', 'owner'],
    keyMetrics: ['revenue', 'pipeline', 'conversion'],
    columns: [...BS_COLUMNS]
  },
  os: {
    title: 'Contacts',
    visibleFields: ['relationship', 'last_contact', 'notes'],
    keyMetrics: ['network', 'engagement'],
    columns: [...OS_COLUMNS]
  }
};
```

---

## LENS CONTEXT PROVIDER

```typescript
// lib/lens-context.tsx

type Lens = 'cs' | 'bs' | 'os';

const LensContext = createContext<{
  lens: Lens;
  setLens: (lens: Lens) => void;
}>({ lens: 'os', setLens: () => {} });

export function LensProvider({ children }) {
  const [lens, setLens] = useState<Lens>('os');
  
  return (
    <LensContext.Provider value={{ lens, setLens }}>
      {children}
    </LensContext.Provider>
  );
}

export function useLens() {
  return useContext(LensContext);
}
```

---

## COMPONENT MAPPING (22 Existing → 3 Lenses)

| Generic Component | CS View | BS View | OS View |
|-------------------|---------|---------|---------|
| `accounts-view` | Accounts (health focus) | Clients (revenue focus) | Contacts (relationship) |
| `dashboard-view` | Command Center | Business Dashboard | Today |
| `tasks-view` | Account tasks | Project tasks | Personal tasks |
| `pipeline-view` | Customer journey | Sales pipeline | Personal projects |
| `deals-view` | Expansions/Renewals | Deals | - |
| `metrics-view` | CS Metrics | Business Metrics | Personal Metrics |
| `projects-view` | Success plans | Projects | Personal goals |
| `content-view` | Playbooks/Templates | Marketing content | Notes/Knowledge |
| `sessions-view` | Engagements | Meetings | Calendar |
| `knowledge-view` | CS Playbooks | Business KB | Personal KB |
| `brainstorming-view` | - | - | IQ Hub |
| `strategy-view` | - | Strategy | Strategy |
| `settings-view` | Settings | Settings | Settings |
| `integrations-view` | Integrations | Integrations | Integrations |

---

## SIDEBAR STRUCTURE (Same for all, filtered by lens)

```typescript
const SIDEBAR_ITEMS = [
  // Core - Always visible
  { id: 'dashboard', icon: Home, label: { cs: 'Command Center', bs: 'Dashboard', os: 'Today' }},
  { id: 'accounts', icon: Users, label: { cs: 'Accounts', bs: 'Clients', os: 'Contacts' }},
  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
  
  // Lens-specific visibility
  { id: 'pipeline', icon: TrendingUp, visible: ['cs', 'bs'] },
  { id: 'deals', icon: DollarSign, visible: ['cs', 'bs'] },
  { id: 'leads', icon: UserPlus, visible: ['bs'] },
  { id: 'campaigns', icon: Megaphone, visible: ['bs'] },
  { id: 'goals', icon: Target, visible: ['os'] },
  { id: 'iq-hub', icon: Brain, visible: ['os'] },
  { id: 'knowledge', icon: Book, label: { cs: 'Playbooks', bs: 'Knowledge', os: 'Knowledge Hub' }},
  
  // Shared - Always visible
  { id: 'metrics', icon: BarChart },
  { id: 'integrations', icon: Plug },
  { id: 'settings', icon: Settings },
];
```

---

## FOLDER STRUCTURE (Simplified)

```
app/
├── (app)/                     # Main app (lens-aware)
│   ├── layout.tsx             # Has LensProvider
│   ├── dashboard/page.tsx     # Uses <DashboardView lens={currentLens} />
│   ├── accounts/page.tsx      # Uses <AccountsView lens={currentLens} />
│   ├── tasks/page.tsx
│   ├── pipeline/page.tsx
│   ├── deals/page.tsx
│   ├── projects/page.tsx
│   ├── knowledge/page.tsx
│   ├── metrics/page.tsx
│   ├── settings/page.tsx
│   └── integrations/page.tsx
│
components/
├── views/
│   ├── accounts-view.tsx      # Generic, lens-aware
│   ├── dashboard-view.tsx     # Generic, lens-aware
│   ├── tasks-view.tsx         # Generic, lens-aware
│   ├── pipeline-view.tsx      # Generic, lens-aware
│   └── ...
├── lens/
│   ├── lens-provider.tsx      # Context provider
│   ├── lens-switcher.tsx      # UI to switch lenses
│   └── lens-config.ts         # Lens configurations
└── sidebar/
    └── sidebar.tsx            # Lens-aware navigation
```

---

## LENS SWITCHER COMPONENT

```typescript
// components/lens/lens-switcher.tsx

export function LensSwitcher() {
  const { lens, setLens } = useLens();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          {lens === 'cs' && <Target className="mr-2" />}
          {lens === 'bs' && <Briefcase className="mr-2" />}
          {lens === 'os' && <User className="mr-2" />}
          {LENS_LABELS[lens]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLens('os')}>
          <User className="mr-2" /> Personal OS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLens('bs')}>
          <Briefcase className="mr-2" /> Business
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLens('cs')}>
          <Target className="mr-2" /> Customer Success
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## SUMMARY

**Approach:** 
- ✅ Generic components (not duplicated)
- ✅ Lens context determines what's shown
- ✅ Same data, different views
- ✅ One sidebar, filtered by lens
- ✅ Field visibility per lens (from Section Y spec)

**Result:**
- 22 components → Same 22 components
- 3 lenses → 1 LensProvider + config
- Less code, more flexibility

---

## AWAITING YOUR LAYOUTS

Please share layouts for:
1. **CS Lens** - Which sections visible, what order
2. **BS Lens** - Which sections visible, what order
3. **OS Lens** - Which sections visible, what order

I'll configure the lens-specific visibility and field mappings accordingly!
