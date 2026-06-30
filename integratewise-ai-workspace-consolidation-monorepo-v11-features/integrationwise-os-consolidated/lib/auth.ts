// lib/auth.ts
// Server-side authentication utilities

import { cookies } from "next/headers"
import { createServerClient } from "@/lib/supabase/server"
import { isMockAuthEnabled, MOCK_SESSION, isDemoSession } from "@/lib/mock-auth"

export interface Session {
  user: {
    id: string
    email: string
    user_metadata?: {
      full_name?: string
      avatar_url?: string
    }
  }
  access_token: string
}

/**
 * Get the current session from Supabase or mock auth
 * Returns null if not authenticated
 */
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    // Check for demo session first
    if (isDemoSession(cookieHeader) || isMockAuthEnabled()) {
      return {
        user: {
          id: MOCK_SESSION.user.id,
          email: MOCK_SESSION.user.email,
          user_metadata: MOCK_SESSION.user.user_metadata,
        },
        access_token: MOCK_SESSION.access_token,
      }
    }

    // Real Supabase auth
    const supabase = await createServerClient()
    if (!supabase) {
      return null
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()

    return {
      user: {
        id: user.id,
        email: user.email || "",
        user_metadata: user.user_metadata as Session["user"]["user_metadata"],
      },
      access_token: session?.access_token || "",
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (!errorMessage.includes("Dynamic server usage") && !errorMessage.includes("cookies")) {
      console.error("[auth] Error getting session:", error)
    }
    return null
  }
}

/**
 * Check if user is Nirmal (admin)
 */
export function isAdminUser(email: string | undefined): boolean {
  if (!email) return false
  const adminEmails = ["nirmal@integratewise.com", "admin@integratewise.com", "demo@integratewise.online"]
  return adminEmails.includes(email.toLowerCase())
}

/**
 * Compute the next target URL based on user's onboarding state
 */
export async function computeNextTarget(userId: string, email?: string): Promise<string> {
  try {
    if (isAdminUser(email)) {
      return "/tam"
    }

    const supabase = await createServerClient()
    if (!supabase) {
      return "/onboarding"
    }

    // Check onboarding state - demo users also go through onboarding
    const { data: onboarding } = await supabase
      .from("onboarding_state")
      .select("completed, step")
      .eq("user_id", userId)
      .single()

    if (!onboarding || !onboarding.completed) {
      return "/onboarding"
    }

    return "/insights"
  } catch (error) {
    console.error("[auth] Error computing next target:", error)
    return "/insights"
  }
}
