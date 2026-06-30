"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Plus, AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Release {
  id: string
  name: string
  type: string
  env: string
  status: string
  risk_level: string
  start_at: string | null
  created_at: string
}

export default function ReleaseControlBoardPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      async function fetchReleases() {
        const supabase = createClient()
        if (!supabase) {
          setLoading(false)
          return
        }

      try {
        const { data, error } = await supabase
          .from("release_batches")
          .select("*")
          .order("start_at", { ascending: false })
          .limit(50)

        if (error) throw error
        setReleases(data || [])
      } catch (error) {
        console.error("Failed to fetch releases:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReleases()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Calendar className="h-4 w-4 text-yellow-400" />
    }
  }

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: "bg-green-500/20 text-green-300 border-green-500/30",
      medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      high: "bg-red-500/20 text-red-300 border-red-500/30",
    }
    return variants[risk as keyof typeof variants] || variants.low
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Release Control Board</h1>
          <p className="text-slate-400">What's shipping, where it's going, and what could break</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Release
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">
              {releases.filter((r) => r.status === "planned").length}
            </div>
            <p className="text-xs text-slate-400 mt-1">Planned</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">
              {releases.filter((r) => r.status === "in_progress").length}
            </div>
            <p className="text-xs text-slate-400 mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">
              {releases.filter((r) => r.status === "completed").length}
            </div>
            <p className="text-xs text-slate-400 mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">
              {releases.filter((r) => r.risk_level === "high").length}
            </div>
            <p className="text-xs text-slate-400 mt-1">High Risk</p>
          </CardContent>
        </Card>
      </div>

      {/* Releases Table */}
      <Card className="bg-zinc-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Releases</CardTitle>
          <CardDescription>All release batches and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading releases...</div>
          ) : releases.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No releases found</p>
              <Button className="mt-4" variant="outline" asChild>
                <Link href="/admin/releases/new">Create your first release</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-slate-300">Release</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Env</TableHead>
                  <TableHead className="text-slate-300">Start</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Risk</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.map((release) => (
                  <TableRow key={release.id} className="border-white/5">
                    <TableCell className="font-medium text-white">{release.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-zinc-800 text-slate-300">
                        {release.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          release.env === "prod" && "bg-red-500/20 text-red-300 border-red-500/30",
                          release.env === "staging" && "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
                          release.env === "dev" && "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        )}
                      >
                        {release.env}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">
                      {release.start_at
                        ? new Date(release.start_at).toLocaleDateString()
                        : "Not scheduled"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(release.status)}
                        <span className="text-slate-300 capitalize">{release.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("border", getRiskBadge(release.risk_level))}>
                        {release.risk_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/releases/${release.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
