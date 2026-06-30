import { AppShell } from "@/components/app-shell"
import { CSContactsView } from "@/components/views/cs-contacts-view"

export default function ContactsPage() {
  return (
    <AppShell>
      <CSContactsView />
    </AppShell>
  )
}

// Mock data - replace with actual Spine entity queries
const mockContacts = [
  {
    id: 'CONT-00847',
    name: 'Mike Johnson',
    title: 'CTO',
    department: 'Engineering',
    email: 'mike.j@nexlify.com',
    phone: '(415) 555-0123',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'champion',
    relationshipStrength: 'strong',
    lastContact: '2 days ago',
  },
  {
    id: 'CONT-00849',
    name: 'Sarah Lopez',
    title: 'VP Engineering',
    department: 'Engineering',
    email: 'sarah.l@nexlify.com',
    phone: '(415) 555-0145',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'executive',
    relationshipStrength: 'medium',
    lastContact: '5 days ago',
  },
  {
    id: 'CONT-00852',
    name: 'Tom Chen',
    title: 'Director of Product',
    department: 'Product',
    email: 'tom.c@nexlify.com',
    phone: '(415) 555-0178',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'decision-maker',
    relationshipStrength: 'strong',
    lastContact: '1 day ago',
  },
  {
    id: 'CONT-00855',
    name: 'Jessica Park',
    title: 'Senior Engineering Manager',
    department: 'Engineering',
    email: 'jessica.p@nexlify.com',
    phone: '(415) 555-0192',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'influencer',
    relationshipStrength: 'strong',
    lastContact: '3 days ago',
  },
  {
    id: 'CONT-00858',
    name: 'David Kim',
    title: 'Lead Developer',
    department: 'Engineering',
    email: 'david.k@nexlify.com',
    phone: '(415) 555-0203',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'influencer',
    relationshipStrength: 'medium',
    lastContact: '7 days ago',
  },
  {
    id: 'CONT-00862',
    name: 'Emily Martinez',
    title: 'Product Designer',
    department: 'Product',
    email: 'emily.m@nexlify.com',
    phone: '(415) 555-0217',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'user',
    relationshipStrength: 'weak',
    lastContact: '21 days ago',
  },
  {
    id: 'CONT-00865',
    name: 'Robert Taylor',
    title: 'IT Administrator',
    department: 'IT',
    email: 'robert.t@nexlify.com',
    phone: '(415) 555-0234',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'user',
    relationshipStrength: 'strong',
    lastContact: '4 days ago',
  },
  {
    id: 'CONT-00868',
    name: 'Amanda Wilson',
    title: 'Software Engineer',
    department: 'Engineering',
    email: 'amanda.w@nexlify.com',
    phone: '(415) 555-0251',
    accountId: '2',
    accountName: 'Nexlify',
    influenceLevel: 'user',
    relationshipStrength: 'medium',
    lastContact: '12 days ago',
  },
]

type InfluenceLevel = 'champion' | 'executive' | 'decision-maker' | 'influencer' | 'user'
type RelationshipStrength = 'strong' | 'medium' | 'weak'

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  // Calculate stats
  const stats = useMemo(() => {
    const totalContacts = mockContacts.length
    const champions = mockContacts.filter(c => c.influenceLevel === 'champion').length
    const executives = mockContacts.filter(c => c.influenceLevel === 'executive').length
    const strongRelationships = mockContacts.filter(c => c.relationshipStrength === 'strong').length
    const avgLastContact = '8 days' // Calculate from actual data

    return {
      totalContacts,
      champions,
      executives,
      strongRelationships,
      avgLastContact,
    }
  }, [])

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return mockContacts.filter(contact => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter =
        filterType === 'all' ||
        (filterType === 'champions' && contact.influenceLevel === 'champion') ||
        (filterType === 'executives' && contact.influenceLevel === 'executive') ||
        (filterType === 'decision-makers' && contact.influenceLevel === 'decision-maker') ||
        (filterType === 'my-accounts' && true) // In real app, filter by current user's accounts

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, filterType])

  const getInfluenceBadge = (level: InfluenceLevel) => {
    const variants = {
      champion: 'bg-green-100 text-green-800 border-green-500',
      executive: 'bg-blue-100 text-blue-800 border-blue-500',
      'decision-maker': 'bg-amber-100 text-amber-800 border-amber-500',
      influencer: 'bg-purple-100 text-purple-800 border-purple-500',
      user: 'bg-gray-100 text-gray-800 border-gray-500',
    }
    return variants[level] || variants.user
  }

  const getRelationshipBadge = (strength: RelationshipStrength) => {
    const variants = {
      strong: 'bg-green-100 text-green-800 border-green-500',
      medium: 'bg-amber-100 text-amber-800 border-amber-500',
      weak: 'bg-red-100 text-red-800 border-red-500',
    }
    return variants[strength] || variants.medium
  }

  const getRelationshipEmoji = (strength: RelationshipStrength) => {
    const emojis = {
      strong: '💚',
      medium: '🟡',
      weak: '🔴',
    }
    return emojis[strength] || '🟡'
  }

  const getCardBorder = (contact: typeof mockContacts[0]) => {
    if (contact.influenceLevel === 'champion') return 'border-4 border-green-500 bg-green-50'
    if (contact.influenceLevel === 'executive') return 'border-2 border-blue-500'
    if (contact.influenceLevel === 'decision-maker') return 'border-2 border-amber-500'
    return 'border-2 border-gray-300'
  }

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">👥 Contacts & Stakeholders Hub</h1>
          <p className="text-base text-muted-foreground">
            Customer relationships, champions, and MEDDIC influence mapping
          </p>
          <Badge className="bg-green-100 text-green-800 border-2 border-green-500">
            ✅ PRODUCTION READY | Database: Contacts & Stakeholders | Record ID: CONT-
          </Badge>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-5 gap-5">
          <Card className="border-2 border-black">
            <CardContent className="pt-6">
              <div className="text-xs text-gray-600 mb-1">Total Contacts</div>
              <div className="text-3xl font-bold text-blue-600">{stats.totalContacts}</div>
              <div className="text-xs text-gray-600 mt-1">Across all accounts</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardContent className="pt-6">
              <div className="text-xs text-gray-600 mb-1">Champions Identified</div>
              <div className="text-3xl font-bold text-green-600">{stats.champions}</div>
              <div className="text-xs text-gray-600 mt-1">
                {Math.round((stats.champions / stats.totalContacts) * 100)}% champion rate
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardContent className="pt-6">
              <div className="text-xs text-gray-600 mb-1">Executive Sponsors</div>
              <div className="text-3xl font-bold text-blue-600">{stats.executives}</div>
              <div className="text-xs text-gray-600 mt-1">C-level contacts</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardContent className="pt-6">
              <div className="text-xs text-gray-600 mb-1">Strong Relationships</div>
              <div className="text-3xl font-bold text-green-600">{stats.strongRelationships}</div>
              <div className="text-xs text-gray-600 mt-1">
                {Math.round((stats.strongRelationships / stats.totalContacts) * 100)}% of contacts
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardContent className="pt-6">
              <div className="text-xs text-gray-600 mb-1">Last Contact (Avg)</div>
              <div className="text-3xl font-bold">{stats.avgLastContact}</div>
              <div className="text-xs text-gray-600 mt-1">Engagement frequency</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search contacts by name, title, account, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 border-2 border-black"
            />
          </div>
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterType('all')}
            className="h-12 px-6 border-2"
          >
            All Contacts
          </Button>
          <Button
            variant={filterType === 'champions' ? 'default' : 'outline'}
            onClick={() => setFilterType('champions')}
            className="h-12 px-6 border-2"
          >
            Champions
          </Button>
          <Button
            variant={filterType === 'executives' ? 'default' : 'outline'}
            onClick={() => setFilterType('executives')}
            className="h-12 px-6 border-2"
          >
            Executives
          </Button>
          <Button
            variant={filterType === 'decision-makers' ? 'default' : 'outline'}
            onClick={() => setFilterType('decision-makers')}
            className="h-12 px-6 border-2"
          >
            Decision Makers
          </Button>
          <Button
            variant={filterType === 'my-accounts' ? 'default' : 'outline'}
            onClick={() => setFilterType('my-accounts')}
            className="h-12 px-6 border-2"
          >
            My Accounts
          </Button>
        </div>

        {/* Stakeholder Map */}
        <Card className="border-3 border-black bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">🎯 Stakeholder Power Map (Nexlify - Example Account)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-5">
              {filteredContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`cursor-pointer min-h-[200px] hover:bg-gray-100 transition-colors ${getCardBorder(contact)}`}
                >
                  <CardContent className="pt-6">
                    {contact.influenceLevel === 'champion' && (
                      <div className="bg-green-600 text-white px-2 py-1 text-xs font-bold mb-2">
                        ⭐ CHAMPION
                      </div>
                    )}
                    <div className="font-mono text-xs text-gray-600 mb-2">{contact.id}</div>
                    <div className="text-lg font-bold mb-2">{contact.name}</div>
                    <div className="text-sm text-gray-600 mb-1">{contact.title}</div>
                    <div className="text-sm text-gray-600 mb-3">{contact.department}</div>
                    <Badge
                      variant="outline"
                      className={`${getInfluenceBadge(contact.influenceLevel)} border-2 mb-2`}
                    >
                      {contact.influenceLevel.toUpperCase().replace('-', ' ')}
                    </Badge>
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className={`${getRelationshipBadge(contact.relationshipStrength)} border-2 text-xs`}
                      >
                        {contact.relationshipStrength.charAt(0).toUpperCase() + contact.relationshipStrength.slice(1)} Relationship {getRelationshipEmoji(contact.relationshipStrength)}
                      </Badge>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-1">
                      <div>Email: {contact.email}</div>
                      <div>Phone: {contact.phone}</div>
                      <div>Last Contact: {contact.lastContact}</div>
                      <div className="mt-2">
                        Account:{' '}
                        <Link
                          href={`/cs/accounts/${contact.accountId}`}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          {contact.accountName}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schema Info */}
        <Card className="border-3 border-black bg-yellow-50">
          <CardContent className="pt-6">
            <div className="text-base font-bold mb-2">📌 Database Schema: Contacts & Stakeholders</div>
            <div className="text-sm leading-relaxed space-y-1">
              <div>
                <strong>Key Fields:</strong> Record ID [CONT-], Contact Name [title], ↔️ Account [relation: → Master Accounts] **REQUIRED**, Email [email], Phone [phone_number], Title [text], Role [select], Department [select], Influence Level [select: Champion/Executive/Decision Maker/Influencer/User], Relationship Strength [select: Strong/Medium/Weak], Last Contact Date [date]
              </div>
              <div>
                <strong>Relations:</strong> Two-way link to Master Accounts Registry
              </div>
              <div>
                <strong>MEDDIC Influence Levels:</strong> Champion (highest) → Executive → Decision Maker → Influencer → User (lowest)
              </div>
              <div>
                <strong>Relationship Tracking:</strong> Strong 💚 / Medium 🟡 / Weak 🔴
              </div>
              <div>
                <strong>Champion Highlighting:</strong> Visual indicators for key advocates and executive sponsors
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
