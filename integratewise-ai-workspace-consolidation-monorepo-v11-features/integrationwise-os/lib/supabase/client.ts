import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"
import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Creates a Supabase client for browser-side use with cookie-based auth.
 * Use this in Client Components.
 * Returns null if Supabase environment variables are not configured.
 */
export function createClient() {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/client.ts:9',message:'createClient called',data:{hasUrl:!!process.env.NEXT_PUBLIC_SUPABASE_URL,hasKey:!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,url:process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0,30)||'missing'},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/client.ts:14',message:'Supabase client returning null - missing env vars',data:{url:url||'MISSING',anonKey:anonKey?'SET':'MISSING'},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return null
  }

  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/client.ts:18',message:'Supabase client created successfully',data:{url:url.substring(0,30)},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  return createSupabaseBrowserClient(url, anonKey)
}

// Named export for convenience
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return null
  }

  return createSupabaseBrowserClient(url, anonKey)
}

/**
 * Lazy-initialized singleton browser client for use in client components.
 * Uses anon key only (safe for browser).
 */
let _supabaseBrowser: SupabaseClient | null = null

export function getSupabaseBrowser(): SupabaseClient | null {
  if (_supabaseBrowser) return _supabaseBrowser
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    console.warn("[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
    return null
  }
  
  _supabaseBrowser = createSupabaseClient(url, key, {
    auth: { persistSession: true },
    db: { schema: "public" },
  })
  
  return _supabaseBrowser
}

// For backwards compatibility - returns null if not configured
export const supabaseBrowser = typeof window !== "undefined" ? getSupabaseBrowser() : null
