"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Webhook,
  Flag,
  Shield,
  Calendar,
} from "lucide-react"

const ADMIN_TABS = [
  { id: "overview", href: "/admin", label: "Overview", icon: LayoutDashboard },
  { id: "tenants", href: "/admin/tenants", label: "Tenants", icon: Users },
  { id: "billing", href: "/admin/billing", label: "Usage & Billing", icon: DollarSign },
  { id: "integrations", href: "/admin/integrations", label: "Integrations & Webhooks", icon: Webhook },
  { id: "flags", href: "/admin/flags", label: "Feature Flags & Rollouts", icon: Flag },
  { id: "releases", href: "/admin/releases", label: "Release Control Board", icon: Calendar },
  { id: "audit", href: "/admin/audit", label: "Audit & Security", icon: Shield },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-white">IntegrateWise Admin</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Platform Control Center</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {ADMIN_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname === tab.href || (tab.href !== "/admin" && pathname.startsWith(tab.href))

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/50">
          <p className="font-semibold">Internal Use Only</p>
          <p className="mt-1">IntegrateWise Staff Access</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
