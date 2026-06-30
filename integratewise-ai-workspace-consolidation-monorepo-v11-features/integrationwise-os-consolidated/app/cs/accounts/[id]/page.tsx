import { AppShell } from "@/components/app-shell"
import { CSAccountDetailView } from "@/components/views/cs-account-detail-view"
import { use } from "react"

// Mock data - replace with actual Spine entity queries
const mockAccount = {
  id: '2',
  name: 'Nexlify',
  segment: 'Mid-Market',
  industry: 'SaaS',
  arr: 240000,
  health: 8.2,
  renewalDate: '2026-01-15',
  daysUntilRenewal: 75,
  csm: 'Sarah Kim',
}

const mockInsights = {
  healthScore: {
    value: 8.2,
    trend: '+0.5',
    analysis: 'Account is healthy and stable. Champion Mike Johnson is highly engaged, product usage is strong (82%), and support tickets are minimal. However, feature adoption lags at 5/8 features - this represents untapped value and potential churn risk if competitors offer simpler alternatives.',
    actions: [
      {
        text: 'Schedule advanced feature training for unused Analytics & Automation modules',
        owner: 'Sarah Kim (CSM)',
        due: 'This Week',
        impact: 'High',
      },
      {
        text: 'Create custom ROI report showing potential savings with full feature adoption',
        owner: 'Tom Chen',
        due: 'Before QBR',
        impact: 'Medium',
      },
      {
        text: 'Share case study of similar customer achieving 40% efficiency gain',
        owner: 'Sarah Kim',
        due: 'This Week',
        impact: 'Medium',
      },
    ],
  },
  productUsage: {
    value: 82,
    trend: '+12%',
    analysis: 'Excellent adoption! 24 of 28 users actively log in daily. Power users Sarah Chen and Mike Johnson drive 60% of usage. Risk: Over-reliance on 2 users. If either leaves, usage could drop significantly. 4 inactive users are in Finance department - they may not see value yet.',
    actions: [
      {
        text: 'Expand champion network: Identify and train 2 additional power users in different departments',
        owner: 'Ana Ruiz',
        due: 'Next 2 weeks',
        impact: 'Critical',
      },
      {
        text: 'Schedule Finance team demo - show budget tracking & forecasting features',
        owner: 'Sarah Kim',
        due: 'This Week',
        impact: 'Medium',
      },
      {
        text: "Create internal success story highlighting Sarah & Mike's wins",
        owner: 'Marketing',
        due: 'Before QBR',
        impact: 'Medium',
      },
    ],
  },
  risks: [
    {
      title: 'Feature Adoption Gap',
      priority: 'High Priority',
      description: 'Only 5 of 8 features adopted. Missing features: Advanced Analytics, Workflow Automation, API Integration. These are key differentiators vs competitors and represent $40K of their $240K contract value. Low adoption makes renewal vulnerable to competitive pressure on price.',
      mitigation: [
        'Week 1: Schedule technical workshop with David Park (IT Admin) on API integration - show 10hr/week time savings',
        'Week 2: Product training for Sarah Chen\'s team on Advanced Analytics - demonstrate custom reporting they\'ve been requesting',
        'Week 3: Automation demo for Mike Johnson - map 3 manual processes to automated workflows',
        'Week 4: QBR presentation showing ROI increase from 62% to 100% feature utilization',
      ],
    },
  ],
  opportunities: [
    {
      value: 60000,
      confidence: 85,
      description: 'Mike Johnson mentioned in last call: "We\'re hiring 15 more operations analysts and will need additional seats." + Finance team (4 inactive users) needs budget module. Total expansion: 15 seats ($36K) + Premium Analytics ($24K) = $60K ARR. Timing is perfect - annual budget planning happening now.',
      actions: [
        {
          phase: 'This Week',
          text: 'Send Mike pricing proposal for 15 additional seats with Q4 discount (10% off = easy win)',
          owner: 'Sarah Kim',
          approval: 'Needed from Sales',
          expectedClose: 'Nov 20',
        },
        {
          phase: 'Next Week',
          text: 'Schedule Finance team demo focused on budget features - convert 4 inactive to active users',
          owner: 'Tom Chen + Product Team',
          prep: 'ROI calculator',
          expectedClose: 'Dec 1',
        },
        {
          phase: 'QBR',
          text: 'Present total package ($300K renewal + $60K expansion = $360K) with full ROI analysis',
          owner: 'Sarah Kim + Sales Director',
          prep: 'Business case deck',
          target: 'Lock by Q4',
        },
      ],
    },
  ],
  stakeholders: [
    {
      name: 'Mike Johnson',
      title: 'VP Operations',
      role: 'Champion',
      lastTouch: '2 days ago',
      power: 'Budget authority, renewal decision maker',
      engagement: 'Very High (logs in daily, promotes internally)',
      needs: 'Wants automation & more seats',
      action: 'Send expansion proposal by EOW',
      status: 'champion',
    },
    {
      name: 'Sarah Chen',
      title: 'Director Analytics',
      role: 'Power User',
      lastTouch: '5 days ago',
      power: 'Influences team adoption',
      engagement: 'High (trains others, requests features)',
      needs: 'Advanced analytics module',
      action: 'Demo premium analytics this week',
      status: 'power-user',
    },
    {
      name: 'Jennifer Lee',
      title: 'Finance Manager',
      role: 'At Risk',
      lastTouch: '2 weeks ago',
      power: 'Can block renewal on ROI concerns',
      engagement: 'Low (not logging in)',
      risk: "Doesn't see value, team not using",
      action: 'URGENT - Schedule finance demo ASAP',
      status: 'at-risk',
    },
  ],
  priorities: [
    {
      title: 'Schedule Q4 QBR (OVERDUE)',
      due: 'Today',
      impact: 'Critical',
      owner: 'Sarah',
      priority: 'high',
    },
    {
      title: 'Finance Team Demo',
      due: 'Nov 7',
      impact: 'High',
      owner: 'Tom',
      priority: 'medium',
    },
    {
      title: 'Send Expansion Proposal',
      due: 'Nov 8',
      impact: '$60K ARR',
      owner: 'Sarah',
      priority: 'medium',
    },
    {
      title: 'Feature Training Session',
      due: 'Nov 10',
      impact: 'High',
      owner: 'Ana',
      priority: 'low',
    },
  ],
}

export default function AccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  return (
    <AppShell>
      <CSAccountDetailView accountId={id} />
    </AppShell>
  )
}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-10 text-white">
          <Link
            href="/cs/accounts"
            className="text-sm mb-4 inline-flex items-center gap-2 opacity-90 hover:opacity-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Accounts Hub
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold mb-3">{account.name}</h1>
              <div className="text-lg opacity-90">
                {account.segment} · {formatCurrency(account.arr)} ARR · Renewal: {new Date(account.renewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ({account.daysUntilRenewal} days)
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule QBR
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 flex justify-between items-center">
          <div className="flex-1">
            <div className="text-lg font-bold text-amber-900 mb-2">
              ⚠️ Action Required: Q4 QBR Overdue
            </div>
            <div className="text-sm text-amber-800 leading-relaxed">
              Last QBR was 28 days ago. With renewal in {account.daysUntilRenewal} days, schedule immediately to discuss expansion opportunities and address feature adoption gaps.
            </div>
          </div>
          <Button className="bg-amber-500 text-white hover:bg-amber-600">
            Schedule Now
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Health Score Insight */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs uppercase font-semibold text-gray-600 mb-1">
                      Overall Health Score
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-1">
                      {mockInsights.healthScore.value} / 10
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      ↑ {mockInsights.healthScore.trend} from last month
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-sm font-bold text-gray-700 mb-2">📊 What This Means:</div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {mockInsights.healthScore.analysis}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                    🎯 Recommended Actions:
                  </div>
                  {mockInsights.healthScore.actions.map((action, idx) => (
                    <div key={idx} className="text-sm text-blue-900 mb-3 pl-6 relative">
                      <span className="absolute left-0 font-bold">→</span>
                      {action.text}
                      <div className="text-xs text-gray-600 mt-1 italic">
                        Owner: {action.owner} • Due: {action.due} • Impact: {action.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Usage Insight */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs uppercase font-semibold text-gray-600 mb-1">
                      Product Usage Rate
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {mockInsights.productUsage.value}%
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      ↑ {mockInsights.productUsage.trend} from onboarding
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-sm font-bold text-gray-700 mb-2">📊 Deep Dive:</div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {mockInsights.productUsage.analysis}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                    🎯 Recommended Actions:
                  </div>
                  {mockInsights.productUsage.actions.map((action, idx) => (
                    <div key={idx} className="text-sm text-blue-900 mb-3 pl-6 relative">
                      <span className="absolute left-0 font-bold">→</span>
                      {action.text}
                      <div className="text-xs text-gray-600 mt-1 italic">
                        Owner: {action.owner} • Due: {action.due} • Impact: {action.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Critical Risk */}
            {mockInsights.risks.map((risk, idx) => (
              <Card key={idx} className="bg-red-50 border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-lg font-bold text-red-900">🚨 Critical Risk: {risk.title}</div>
                    <Badge className="bg-red-900 text-white">{risk.priority}</Badge>
                  </div>
                  <div className="text-sm text-red-800 mb-4 leading-relaxed">
                    {risk.description}
                  </div>
                  <div className="bg-white p-3 rounded-md">
                    <div className="text-sm font-bold text-red-900 mb-2">
                      Mitigation Plan (Execute by Nov 15):
                    </div>
                    {risk.mitigation.map((step, stepIdx) => (
                      <div key={stepIdx} className="text-sm text-gray-700 mb-2 pl-6 relative">
                        <span className="absolute left-0 text-green-600 font-bold">✓</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Expansion Opportunity */}
            {mockInsights.opportunities.map((opp, idx) => (
              <Card key={idx} className="bg-green-50 border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs uppercase font-semibold text-green-700 mb-1">
                        💰 Expansion Opportunity Identified
                      </div>
                      <div className="text-4xl font-bold text-green-700 mb-1">
                        +{formatCurrency(opp.value)} ARR Potential
                      </div>
                      <div className="text-sm font-semibold text-green-700">
                        {opp.confidence}% Confidence
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">💡 The Opportunity:</div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {opp.description}
                    </div>
                  </div>

                  <div className="bg-green-100 p-4 rounded-lg">
                    <div className="text-sm font-bold text-green-900 mb-3">🚀 Expansion Game Plan:</div>
                    {opp.actions.map((action, actionIdx) => (
                      <div key={actionIdx} className="text-sm text-green-900 mb-3 pl-6 relative">
                        <span className="absolute left-0 font-bold">→</span>
                        <strong>{action.phase}:</strong> {action.text}
                        <div className="text-xs text-gray-600 mt-1 italic">
                          Owner: {action.owner} • {action.approval && `Approval: ${action.approval} • `}
                          Expected Close: {action.expectedClose || action.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Renewal Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">📅 Renewal Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-xs uppercase font-semibold text-gray-600 mb-1">
                    Days Until Renewal
                  </div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {account.daysUntilRenewal} Days
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Renewal date: <strong>{new Date(account.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>. Based on health score ({account.health}) and engagement, renewal is <strong>85% likely</strong>. Main risk: Feature adoption gap could trigger price negotiation.
                  </div>
                  <div className="text-xs text-blue-600 font-semibold mt-2">
                    → Critical: Schedule QBR before Nov 10
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-xs font-semibold text-green-900 mb-2">🎯 Renewal Strategy:</div>
                  <div className="text-xs text-green-900 leading-relaxed space-y-1">
                    <div>1. Increase feature adoption to 100%</div>
                    <div>2. Document $120K in time savings</div>
                    <div>3. Present {formatCurrency(mockInsights.opportunities[0].value)} expansion opportunity</div>
                    <div>4. Lock renewal by December 15</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stakeholder Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">👥 Stakeholder Map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockInsights.stakeholders.map((stakeholder, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-l-4 ${
                      stakeholder.status === 'champion'
                        ? 'bg-amber-50 border-amber-500'
                        : stakeholder.status === 'power-user'
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="text-sm font-bold mb-1">
                      {stakeholder.status === 'champion' && '⭐ '}
                      {stakeholder.status === 'at-risk' && '⚠️ '}
                      {stakeholder.name} - {stakeholder.role}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {stakeholder.title} • Last Touch: {stakeholder.lastTouch}
                    </div>
                    <div className="text-xs text-gray-700 leading-relaxed space-y-1">
                      <div><strong>Power:</strong> {stakeholder.power}</div>
                      <div><strong>Engagement:</strong> {stakeholder.engagement}</div>
                      {stakeholder.needs && <div><strong>Needs:</strong> {stakeholder.needs}</div>}
                      {stakeholder.risk && <div><strong>Risk:</strong> {stakeholder.risk}</div>}
                      <div><strong>Action:</strong> {stakeholder.action}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* This Week's Priorities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">🎯 This Week's Priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockInsights.priorities.map((priority, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border-l-4 ${
                      priority.priority === 'high'
                        ? 'bg-red-50 border-red-500'
                        : priority.priority === 'medium'
                        ? 'bg-amber-50 border-amber-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="text-sm font-bold mb-1">
                      {idx + 1}. {priority.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      Due: {priority.due} • Impact: {priority.impact} • Owner: {priority.owner}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
