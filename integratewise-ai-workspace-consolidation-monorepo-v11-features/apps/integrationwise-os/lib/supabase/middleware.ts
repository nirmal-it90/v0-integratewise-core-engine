import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

// Routes that require Pro or higher tier
const PRO_ROUTES = ["/api/byom", "/api/byot", "/api/render/schedule"]

// Routes that require Enterprise tier
const ENTERPRISE_ROUTES = ["/api/render/realtime"]

// Routes that require authentication
const PROTECTED_ROUTES = [
  "/dashboard",
  "/home",
  "/today",
  "/goals",
  "/knowledge",
  "/loader",
  "/tasks",
  "/brainstorming",
  "/insights",
  "/settings",
  "/clients",
  "/deals",
  "/leads",
  "/pipeline",
  "/sales",
  "/campaigns",
  "/content",
  "/projects",
  "/sessions",
  "/products",
  "/services",
  "/strategy",
  "/metrics",
  "/website",
  "/spend",
  "/tam",
  "/accounts",
  "/war-room",
  "/risks",
  "/browser-read",
]

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/auth", "/api/health", "/api/webhooks", "/pricing", "/integrations", "/os", "/cs", "/support", "/onboarding"]

export type UserTier = "free" | "pro" | "enterprise"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // Check if demo mode is enabled via cookie
  const isDemoMode = request.cookies.get("demo_mode")?.value === "true"

  // Check if public route - handle "/" as exact match
  const isPublicRoute = pathname === "/" || PUBLIC_ROUTES.slice(1).some((route) => pathname.startsWith(route))
  if (isPublicRoute) {
    return supabaseResponse
  }

  // Check protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  if (isProtectedRoute && !user && !isDemoMode) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Get user tier from subscriptions table
  let userTier: UserTier = "free"
  if (user) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan_name, status")
      .eq("client_id", user.id)
      .eq("status", "active")
      .single()

    if (subscription) {
      const planName = subscription.plan_name?.toLowerCase() || ""
      if (planName.includes("enterprise")) {
        userTier = "enterprise"
      } else if (planName.includes("pro") || planName.includes("premium")) {
        userTier = "pro"
      }
    }
  }

  // Check Pro-tier routes
  const isProRoute = PRO_ROUTES.some((route) => pathname.startsWith(route))
  if (isProRoute && userTier === "free") {
    return NextResponse.json(
      { error: "Upgrade to Pro to access this feature", upgradeUrl: "/pricing" },
      { status: 403 },
    )
  }

  // Check Enterprise-tier routes
  const isEnterpriseRoute = ENTERPRISE_ROUTES.some((route) => pathname.startsWith(route))
  if (isEnterpriseRoute && userTier !== "enterprise") {
    return NextResponse.json(
      { error: "Enterprise plan required", upgradeUrl: "/pricing?plan=enterprise" },
      { status: 403 },
    )
  }

  // Add tier to response headers for client-side access
  supabaseResponse.headers.set("x-user-tier", userTier)

  return supabaseResponse
}
