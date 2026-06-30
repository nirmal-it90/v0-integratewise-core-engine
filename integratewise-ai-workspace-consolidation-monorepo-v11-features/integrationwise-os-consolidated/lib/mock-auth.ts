// Mock authentication for development/demo purposes
// Controlled by NEXT_PUBLIC_DEMO_MODE environment variable

export const MOCK_USER = {
  id: "demo-user-001",
  email: "demo@integratewise.online",
  user_metadata: {
    full_name: "Demo User",
    avatar_url: null,
  },
  app_metadata: {},
  aud: "authenticated",
  created_at: "2024-01-01T00:00:00.000Z",
}

export const MOCK_SESSION = {
  access_token: "demo-access-token",
  refresh_token: "demo-refresh-token",
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "bearer",
  user: MOCK_USER,
}

export const DEMO_CREDENTIALS = {
  email: "demo@integratewise.online",
  password: "demo123",
}

export function isMockAuthEnabled() {
  // Demo mode only if explicitly enabled via env var
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true"
}

export function isDemoSession(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false
  return cookieHeader.includes("demo_session=true")
}

export function isDemoRouteAllowed(pathname: string): { allowed: boolean; viewOnly: boolean } {
  // Demo users can access all routes but some are view-only
  const viewOnlyRoutes = ["/settings", "/billing", "/integrations"]

  const blockedRoutes = ["/admin", "/api/admin"]

  const isBlocked = blockedRoutes.some((route) => pathname.startsWith(route))
  const isViewOnly = viewOnlyRoutes.some((route) => pathname.startsWith(route))

  return {
    allowed: !isBlocked,
    viewOnly: isViewOnly,
  }
}

export const OWNER_CREDENTIALS = {
  email: "nirmal@integratewise.online",
  password: "owner2024!",
}

export function isOwnerUser(email: string | null | undefined): boolean {
  return email === OWNER_CREDENTIALS.email
}
