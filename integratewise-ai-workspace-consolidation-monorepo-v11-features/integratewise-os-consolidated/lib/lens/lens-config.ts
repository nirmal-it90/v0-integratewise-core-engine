/**
 * LENS CONFIGURATION v11.0 MASTER LOCK
 * Defines how the same components render differently per lens
 * 
 * LOCKED TERMINOLOGY:
 * - IQ Hub = Brainstorming Layer (same thing)
 * - Cognitive Twin = Chat UI + interaction layer
 * - Brain Agents = Capabilities behind Cognitive Twin
 */

import {
  Home,
  Calendar,
  Target,
  Brain,
  Plug,
  Settings,
  User,
  TrendingUp,
  Users,
  FolderKanban,
  Megaphone,
  BarChart3,
  Heart,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';

export type Lens = 'cs' | 'bs' | 'os';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface LensConfig {
  id: Lens;
  name: string;
  tagline: string;
  primaryColor: string;
  // Navigation items for this lens (in order)
  navItems: NavItem[];
  // Field visibility per entity
  fields: {
    accounts: string[];
    tasks: string[];
    projects: string[];
  };
  // Key metrics to show
  metrics: string[];
  // Labels for common entities
  labels: {
    accounts: string;
    dashboard: string;
    projects: string;
    knowledge: string;
    home: string;
  };
}

// ═══════════════════════════════════════════════════════════════
// OS LENS (Universal/Personal) - 7 Items
// ═══════════════════════════════════════════════════════════════
const OS_NAV_ITEMS: NavItem[] = [
  {
    id: 'today',
    label: 'Today',
    href: '/dashboard',
    icon: Calendar,
    description: 'Calendar + Cards + AI Insights for today',
  },
  {
    id: 'home',
    label: 'Home',
    href: '/overview',
    icon: Home,
    description: 'Score + Metrics + Goals overview',
  },
  {
    id: 'goals-metrics',
    label: 'Goals & Metrics',
    href: '/metrics',
    icon: Target,
    description: 'Goal tracking + KPI dashboard',
  },
  {
    id: 'iq-hub',
    label: 'IQ Hub',
    href: '/brainstorming',
    icon: Brain,
    description: 'Cognitive Twin + Tasks + Knowledge + Connected Apps',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    href: '/integrations',
    icon: Plug,
    description: 'Webhooks + Connected apps',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'App configuration',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/settings?tab=profile',
    icon: User,
    description: 'User profile',
  },
];

// ═══════════════════════════════════════════════════════════════
// BUSINESS LENS - 9 Items
// ═══════════════════════════════════════════════════════════════
const BS_NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/overview',
    icon: Home,
    description: 'Score + Revenue snapshot + priorities',
  },
  {
    id: 'revenue-engine',
    label: 'Revenue Engine',
    href: '/pipeline',
    icon: TrendingUp,
    description: 'Pipeline + Deals',
  },
  {
    id: 'clients',
    label: 'Clients',
    href: '/clients',
    icon: Users,
    description: 'Client management',
  },
  {
    id: 'delivery',
    label: 'Delivery',
    href: '/projects',
    icon: FolderKanban,
    description: 'Projects + Sessions',
  },
  {
    id: 'growth',
    label: 'Growth',
    href: '/campaigns',
    icon: Megaphone,
    description: 'Campaigns + Content + Website',
  },
  {
    id: 'iq-hub',
    label: 'IQ Hub',
    href: '/brainstorming',
    icon: Brain,
    description: 'Cognitive Twin + Tasks + Knowledge',
  },
  {
    id: 'metrics',
    label: 'Metrics',
    href: '/metrics',
    icon: BarChart3,
    description: 'Business metrics dashboard',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    href: '/integrations',
    icon: Plug,
    description: 'Webhooks + Connected apps',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'App configuration',
  },
];

// ═══════════════════════════════════════════════════════════════
// CS LENS (Customer Success) - 10 Items
// ═══════════════════════════════════════════════════════════════
const CS_NAV_ITEMS: NavItem[] = [
  {
    id: 'command-center',
    label: 'Command Center',
    href: '/dashboard',
    icon: Home,
    description: 'Portfolio health + risks + renewals',
  },
  {
    id: 'accounts-360',
    label: 'Accounts 360',
    href: '/clients',
    icon: Users,
    description: 'Client deep dive',
  },
  {
    id: 'health-factors',
    label: 'Health Factors',
    href: '/health',
    icon: Heart,
    description: 'Health scoring + factors',
  },
  {
    id: 'risks-plays',
    label: 'Risks & Plays',
    href: '/risks',
    icon: AlertTriangle,
    description: 'At-risk accounts + playbooks',
  },
  {
    id: 'renewals-qbr',
    label: 'Renewals / QBR',
    href: '/renewals',
    icon: RefreshCw,
    description: 'Renewal pipeline + QBR prep',
  },
  {
    id: 'sessions',
    label: 'Sessions',
    href: '/sessions',
    icon: MessageSquare,
    description: 'Engagement tracking',
  },
  {
    id: 'iq-hub',
    label: 'IQ Hub',
    href: '/brainstorming',
    icon: Brain,
    description: 'Cognitive Twin + Tasks + Knowledge',
  },
  {
    id: 'metrics',
    label: 'Metrics',
    href: '/metrics',
    icon: BarChart3,
    description: 'CS metrics (NRR, churn, health)',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    href: '/integrations',
    icon: Plug,
    description: 'Webhooks + Connected apps',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'App configuration',
  },
];

// ═══════════════════════════════════════════════════════════════
// LENS CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════

export const LENS_CONFIGS: Record<Lens, LensConfig> = {
  // OS LENS (Universal/Personal)
  os: {
    id: 'os',
    name: 'Personal OS',
    tagline: 'Your productivity command center',
    primaryColor: 'violet',
    navItems: OS_NAV_ITEMS,
    fields: {
      accounts: [
        'relationship_type',
        'last_interaction',
        'notes',
        'network_strength',
        'tags',
      ],
      tasks: [
        'goal',
        'context',
        'priority',
        'due_date',
        'energy_level',
      ],
      projects: [
        'goal',
        'progress',
        'milestones',
        'notes',
      ],
    },
    metrics: [
      'tasks_completed',
      'goals_progress',
      'focus_time',
      'streaks',
      'knowledge_items',
      'insights_generated',
    ],
    labels: {
      accounts: 'Contacts',
      dashboard: 'Today',
      projects: 'Projects',
      knowledge: 'Knowledge Hub',
      home: 'Home',
    },
  },

  // BUSINESS LENS
  bs: {
    id: 'bs',
    name: 'Business',
    tagline: 'Revenue and operations',
    primaryColor: 'blue',
    navItems: BS_NAV_ITEMS,
    fields: {
      accounts: [
        'arr',
        'mrr',
        'deal_stage',
        'pipeline_value',
        'sales_owner',
        'last_contact',
        'expansion_pipeline',
        'competitors',
      ],
      tasks: [
        'client',
        'project',
        'priority',
        'due_date',
        'assigned_to',
      ],
      projects: [
        'client',
        'budget',
        'timeline',
        'status',
        'team',
      ],
    },
    metrics: [
      'revenue',
      'pipeline_value',
      'deals_won',
      'conversion_rate',
      'leads_generated',
      'cac',
      'ltv',
    ],
    labels: {
      accounts: 'Clients',
      dashboard: 'Dashboard',
      projects: 'Projects',
      knowledge: 'Knowledge Base',
      home: 'Home',
    },
  },

  // CS LENS (Customer Success)
  cs: {
    id: 'cs',
    name: 'Customer Success',
    tagline: 'Proactive customer management',
    primaryColor: 'emerald',
    navItems: CS_NAV_ITEMS,
    fields: {
      accounts: [
        'health_score',
        'nps_score',
        'adoption_rate',
        'renewal_date',
        'csm_owner',
        'risk_level',
        'last_qbr_date',
        'success_plan_status',
        'engagement_score',
      ],
      tasks: [
        'account',
        'priority',
        'due_date',
        'risk_related',
        'renewal_related',
      ],
      projects: [
        'success_plan',
        'onboarding_status',
        'milestones',
        'health_impact',
      ],
    },
    metrics: [
      'health_score_avg',
      'nrr',
      'churn_rate',
      'at_risk_accounts',
      'renewals_due',
      'csat',
      'adoption_rate_avg',
    ],
    labels: {
      accounts: 'Accounts',
      dashboard: 'Command Center',
      projects: 'Success Plans',
      knowledge: 'Playbooks',
      home: 'Command Center',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export function getLensConfig(lens: Lens): LensConfig {
  return LENS_CONFIGS[lens];
}

export function getNavItems(lens: Lens): NavItem[] {
  return LENS_CONFIGS[lens].navItems;
}

export function getVisibleFields(
  lens: Lens,
  entity: keyof LensConfig['fields']
): string[] {
  return LENS_CONFIGS[lens].fields[entity];
}

export function getEntityLabel(
  lens: Lens,
  entity: keyof LensConfig['labels']
): string {
  return LENS_CONFIGS[lens].labels[entity];
}

// ═══════════════════════════════════════════════════════════════
// PRODUCT CONSTANTS (v11.0 LOCKED)
// ═══════════════════════════════════════════════════════════════

export const PRODUCT_HEADLINE = 
  "Load your work. Store it in your Spine. Think in your IQ Hub. Act through your Cognitive Twin.";

export const PRODUCT_PRINCIPLES = [
  "Normalize Once, Render Anywhere",
  "Keep your tools — IntegrateWise connects them",
];

export const PRODUCT_TAGLINE = 
  "Normalize Once, Render Anywhere. Keep your tools — IntegrateWise connects them.";

// Terminology lock
export const TERMINOLOGY = {
  IQ_HUB: "IQ Hub (Brainstorming Layer)",
  COGNITIVE_TWIN: "Cognitive Twin",
  BRAIN_AGENTS: "Brain Agents",
  THE_SPINE: "The Spine",
  AI_RELAY: "AI-Relay Gateway",
  TRIAGE_HEAD: "Slack Triage",
} as const;
