"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bot, ChevronDown, ChevronRight, Target, Briefcase, User } from "lucide-react"
import { useState } from "react"
import { IntegrateWiseLogo } from "@/components/integratewise-logo"
import { LensSwitcher } from "@/components/lens/lens-switcher"
import { useLens } from "@/lib/lens/lens-provider"
import { PRODUCT_TAGLINE } from "@/lib/lens/lens-config"

interface LensSidebarProps {
  onSearchClick?: () => void
  onAIClick?: () => void
}

const LENS_COLORS = {
  cs: 'text-emerald-500',
  bs: 'text-blue-500',
  os: 'text-violet-500',
} as const;

const LENS_ICONS = {
  cs: Target,
  bs: Briefcase,
  os: User,
} as const;

export function LensSidebar({ onAIClick }: LensSidebarProps) {
  const pathname = usePathname()
  const { lens, config } = useLens()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    if (href === "/overview") return pathname === "/overview"
    // Handle query params
    const basePath = href.split('?')[0]
    return pathname === basePath || pathname.startsWith(basePath + "/")
  }

  const LensIcon = LENS_ICONS[lens]

  return (
    <aside className="w-64 bg-sidebar flex flex-col h-full border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-5 pb-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <IntegrateWiseLogo className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-sidebar-foreground">IntegrateWise</h1>
          </div>
        </Link>
      </div>

      {/* Lens Switcher */}
      <div className="px-3 pb-4">
        <LensSwitcher className="w-full justify-start" />
      </div>

      {/* Navigation - Dynamic per Lens */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {config.navItems.map((item) => {
          const Icon = item.icon
          const isItemActive = isActive(item.href)

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isItemActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-sidebar-foreground",
              )}
              title={item.description}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.id === 'iq-hub' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sidebar-muted text-sidebar-foreground/60">
                  AI
                </span>
              )}
            </Link>
          )
        })}

        {/* AI Assistant Button (always visible) */}
        {onAIClick && (
          <button
            onClick={onAIClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-sidebar-foreground transition-colors w-full text-left"
          >
            <Bot className="h-5 w-5" />
            Cognitive Twin
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">
              ⌘K
            </span>
          </button>
        )}
      </nav>

      {/* Principle Line Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-foreground/40 leading-relaxed text-center">
          {PRODUCT_TAGLINE}
        </p>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <Link href="/settings?tab=profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            lens === 'cs' && "bg-emerald-500/20",
            lens === 'bs' && "bg-blue-500/20",
            lens === 'os' && "bg-violet-500/20",
          )}>
            <LensIcon className={cn("h-5 w-5", LENS_COLORS[lens])} />
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">Demo User</p>
            <p className="text-xs text-sidebar-foreground/60">{config.name} Lens</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
