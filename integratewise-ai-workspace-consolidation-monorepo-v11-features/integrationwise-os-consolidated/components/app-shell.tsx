"use client"

import type { ReactNode } from "react"
import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { Input } from "@/components/ui/input"
import {
  Search,
  Loader2,
  CheckSquare,
  Lightbulb,
  Sparkles,
  Settings,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Target,
  Megaphone,
  FolderKanban,
  Compass,
  Globe,
  BookOpen,
  Building2,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { DemoBanner } from "@/components/demo-banner"
import { IntegrateWiseLogo } from "@/components/integratewise-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import type { UserRole } from "@/lib/types/ssot"

const CommandSearch = dynamic(
  () => import("@/components/command-search").then((mod) => ({ default: mod.CommandSearch })),
  {
    ssr: false,
  },
)
const AIAssistant = dynamic(() => import("@/components/ai-assistant").then((mod) => ({ default: mod.AIAssistant })), {
  ssr: false,
})

const coreNavItems = [
  { name: "AI Loader", href: "/loader", icon: Loader2 },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Brainstorming", href: "/brainstorming", icon: Lightbulb },
  { name: "AI Insights", href: "/insights", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
]

const hubItems = [
  { name: "Strategic Hub", href: "/strategy", icon: Compass },
  { name: "Metrics Dashboard", href: "/metrics", icon: BarChart3 },
  { name: "Sales Hub", href: "/sales", icon: Target },
  { name: "Marketing Hub", href: "/campaigns", icon: Megaphone },
  { name: "Operations Hub", href: "/projects", icon: FolderKanban },
  { name: "Clients", href: "/clients", icon: Building2 },
  { name: "Website Manager", href: "/website", icon: Globe },
  { name: "Knowledge Hub", href: "/knowledge", icon: BookOpen },
]

const viewModes = [
  { id: "personal", label: "Personal", description: "My tasks and notes" },
  { id: "work", label: "Work / Freelance", description: "Projects and clients" },
  { id: "team", label: "Team", description: "Shared boards and handoffs" },
  { id: "business", label: "Business", description: "Cross-team rollups" },
] as const

const MARKETING_SITE_URL = "https://www.integratewise.online"

interface AppShellProps {
  children: ReactNode
  user?: {
    name: string
    email: string
    role?: UserRole
  }
}

export function AppShell({ children, user }: AppShellProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [currentView, setCurrentView] = useState<(typeof viewModes)[number]["id"]>("work")
  const [hubsExpanded, setHubsExpanded] = useState(false)

  const userRole = user?.role || "owner_admin" // Default to owner_admin for demo
  const canAccessHubs = userRole === "owner_admin" || userRole === "manager"

  const isActive = useMemo(() => {
    return (href: string) => {
      if (href === "/loader") return pathname === "/loader" || pathname.startsWith("/loader/")
      if (href === "/settings") return pathname === "/settings" || pathname.startsWith("/settings")
      return pathname === href || pathname.startsWith(href + "/")
    }
  }, [pathname])

  const isHubActive = useMemo(() => hubItems.some((item) => isActive(item.href)), [isActive])

  return (
    <div className="flex flex-col h-screen bg-background">
      <DemoBanner />

      <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 mr-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <IntegrateWiseLogo className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm hidden sm:inline">IntegrateWise</span>
        </Link>

        {/* Core 5 Navigation */}
        <nav className="flex items-center gap-1">
          {coreNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            )
          })}

          {canAccessHubs && (
            <DropdownMenu open={hubsExpanded} onOpenChange={setHubsExpanded}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("gap-1 ml-2", isHubActive && "bg-primary/10 text-primary")}
                >
                  <span className="hidden md:inline">Hubs</span>
                  {hubsExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Business Hubs (Owner/Admin)
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hubItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn("flex items-center gap-2 cursor-pointer", isActive(item.href) && "bg-muted")}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        <div className="flex-1" />

        {/* View Mode Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <span className="text-xs text-muted-foreground">View:</span>
              <span className="capitalize">{viewModes.find((v) => v.id === currentView)?.label}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {viewModes.map((view) => (
              <DropdownMenuItem
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={cn(currentView === view.id && "bg-muted")}
              >
                <div>
                  <div className="font-medium">{view.label}</div>
                  <div className="text-xs text-muted-foreground">{view.description}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <div className="w-48 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 h-8 bg-muted/50 border-0 focus-visible:ring-1"
              onClick={() => setSearchOpen(true)}
              readOnly
            />
          </div>
        </div>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium"
        >
          ⌘K
        </button>

        <UserMenu />
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>

      <footer className="h-10 border-t border-border bg-card flex items-center justify-center px-4">
        <a
          href={MARKETING_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          Back to Site
        </a>
      </footer>

      {searchOpen && <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />}
      {aiOpen && <AIAssistant open={aiOpen} onOpenChange={setAiOpen} />}
    </div>
  )
}
