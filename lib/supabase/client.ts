import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createSupabaseBrowserClient> | null = null

export function createClient() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.warn(
        "[v0] Supabase environment variables are not set. Please check your .env.local or Vercel project settings.",
      )
      throw new Error(
        "Supabase URL and Anon Key are required. Check your environment variables.",
      )
    }

    client = createSupabaseBrowserClient(url, key)
  }
  return client
}

// Named export for convenience
export function createBrowserClient() {
  return createClient()
}
