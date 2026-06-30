"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, Brain, AlertTriangle, TrendingUp, Database } from "lucide-react"

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalTenants: 0,
    activeTenants: 0,
    totalUsers: 0,
    aiEventsToday: 0,
    brainEventsToday: 0,
    errorRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      async function fetchStats() {
        const supabase = createClient()
        if (!supabase) {
          setLoading(false)
          return
        }

      try {
        // Get latest platform stats
        const { data: latestStats } = await supabase
          .from("platform_stats")
          .select("*")
          .order("date", { ascending: false })
          .limit(1)
          .single()

        if (latestStats) {
          setStats({
            totalTenants: latestStats.tenant_count || 0,
            activeTenants: latestStats.active_tenant_count || 0,
            totalUsers: latestStats.active_user_count || 0,
            aiEventsToday: latestStats.ai_event_count || 0,
            brainEventsToday: latestStats.brain_event_count || 0,
            errorRate: latestStats.error_rate || 0,
          })
        }
      } catch (error) {
        console.error("Failed to fetch admin stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Platform Overview</h1>
        <p className="text-slate-400">How is IntegrateWise doing overall?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-300">Total Tenants</CardTitle>
            <Users className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalTenants}</div>
            <p className="text-xs text-slate-500 mt-1">Workspaces created</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-300">Active Tenants</CardTitle>
            <Activity className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.activeTenants}</div>
            <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-300">Active Users</CardTitle>
            <Users className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-slate-500 mt-1">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-300">AI Events (Today)</CardTitle>
            <Brain className="h-5 w-5 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.aiEventsToday.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">AI-Relay intake</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-300">Brain Events (Today)</CardTitle>
            <Database className="h-5 w-5 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.brainEventsToday.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">IQ Hub stored</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-300">Error Rate</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{(stats.errorRate * 100).toFixed(2)}%</div>
            <p className="text-xs text-slate-500 mt-1">Webhooks/Relay/API</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="bg-zinc-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Platform Alerts</CardTitle>
          <CardDescription>Active issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.errorRate > 0.05 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div>
                  <p className="text-sm font-medium text-red-400">High Error Rate</p>
                  <p className="text-xs text-slate-400">Error rate is above 5% threshold</p>
                </div>
              </div>
            )}
            {stats.activeTenants < stats.totalTenants * 0.5 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm font-medium text-yellow-400">Low Activation Rate</p>
                  <p className="text-xs text-slate-400">Less than 50% of tenants are active</p>
                </div>
              </div>
            )}
            {stats.errorRate <= 0.05 && stats.activeTenants >= stats.totalTenants * 0.5 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <Activity className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-green-400">All Systems Operational</p>
                  <p className="text-xs text-slate-400">No critical issues detected</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
