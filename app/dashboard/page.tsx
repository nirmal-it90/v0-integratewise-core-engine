'use client'

import { useUser } from '@/lib/contexts/user-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Layers, Settings, Zap, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { user, logout } = useUser()
  const router = useRouter()

  if (user.status !== 'completed') {
    router.push('/landing')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/landing')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Layers className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">IntegrateWise</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.fullName || 'User'}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.fullName}!</h1>
          <p className="text-muted-foreground">
            Your workspace is ready. Start configuring your integrations and settings.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Workspace ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{user.workspaceId}</p>
              <p className="text-xs text-muted-foreground mt-1">Your workspace identifier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">API Key</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold font-mono">{user.apiKey?.slice(0, 12)}...</p>
              <p className="text-xs text-muted-foreground mt-1">Use for API calls</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-green-600">Active</p>
              <p className="text-xs text-muted-foreground mt-1">Ready to use</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Journey</CardTitle>
                <CardDescription>What you can do next</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <Zap className="h-5 w-5 mt-0.5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Connect Integrations</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Link your business tools to create seamless data flows
                    </p>
                    <Link href="/integrations/manager">
                      <Button size="sm" variant="outline">
                        Manage Integrations
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <Settings className="h-5 w-5 mt-0.5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Configure Settings</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Set up governance, data policies, and AI autonomy levels
                    </p>
                    <Link href="/configuration">
                      <Button size="sm" variant="outline">
                        Go to Configuration
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Layers className="h-5 w-5 mt-0.5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Explore the Platform</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Navigate through workbenches and start building continuity
                    </p>
                    <Link href="/integrations">
                      <Button size="sm" variant="outline">
                        Explore
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Connected Integrations</CardTitle>
                <CardDescription>Manage your external connections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No integrations connected yet</p>
                  <Link href="/integrations/manager">
                    <Button>Add Integration</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Manage your workspace settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Visit Configuration Manager to set up policies</p>
                  <Link href="/configuration">
                    <Button>Open Configuration</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
