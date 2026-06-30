"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

// Lazily get Supabase client to avoid module-level initialization
function getSupabase() {
  return createClient()
}

// Generic fetcher for Supabase
async function fetcher<T>(
  table: string,
  options?: {
    select?: string
    order?: { column: string; ascending?: boolean }
    limit?: number
    filters?: { column: string; value: unknown }[]
  },
): Promise<T[]> {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/hooks/use-data.ts:12',message:'fetcher called',data:{table,hasOptions:!!options},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  const supabase = getSupabase()
  if (!supabase) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/hooks/use-data.ts:23',message:'fetcher returning empty array - no supabase client',data:{table},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    return []
  }

  let query = supabase.from(table).select(options?.select || "*")

  if (options?.filters) {
    options.filters.forEach((f) => {
      query = query.eq(f.column, f.value)
    })
  }

  if (options?.order) {
    query = query.order(options.order.column, {
      ascending: options.order.ascending ?? false,
    })
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/6bf7142f-9db0-4d3d-bcbd-0c9f4635420c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/hooks/use-data.ts:44',message:'Database query result',data:{table,hasError:!!error,errorMessage:error?.message||null,dataCount:data?.length||0,isRealData:!!data&&data.length>0},timestamp:Date.now(),sessionId:'debug-session',runId:'check-real-system',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  if (error) throw error
  return data as T[]
}

// Tasks hook
export function useTasks() {
  return useSWR("tasks", () =>
    fetcher("tasks", {
      order: { column: "due_date", ascending: true },
    }),
  )
}

// Calendar events hook
export function useCalendarEvents(date?: Date) {
  const dateKey = date?.toISOString().split("T")[0] || "today"
  return useSWR(`calendar_events_${dateKey}`, () =>
    fetcher("calendar_events", {
      order: { column: "start_time", ascending: true },
    }),
  )
}

// Emails hook
export function useEmails(folder = "inbox") {
  return useSWR(`emails_${folder}`, () =>
    fetcher("emails", {
      filters: [{ column: "folder", value: folder }],
      order: { column: "received_at", ascending: false },
      limit: 20,
    }),
  )
}

// Drive files hook
export function useDriveFiles() {
  return useSWR("drive_files", () =>
    fetcher("drive_files", {
      order: { column: "updated_at", ascending: false },
      limit: 20,
    }),
  )
}

// Activities hook
export function useActivities(limit = 10) {
  return useSWR(`activities_${limit}`, () =>
    fetcher("activities", {
      order: { column: "created_at", ascending: false },
      limit,
    }),
  )
}

// Documents hook
export function useDocuments(category?: string) {
  const key = category ? `documents_${category}` : "documents"
  return useSWR(key, () =>
    fetcher("documents", {
      ...(category && { filters: [{ column: "category", value: category }] }),
      order: { column: "updated_at", ascending: false },
    }),
  )
}

// Metrics hook
export function useMetrics() {
  return useSWR("metrics", () =>
    fetcher("metrics", {
      order: { column: "recorded_at", ascending: false },
    }),
  )
}

// Interactions hook
export function useInteractions(source?: string, limit = 50) {
  const key = source ? `interactions_${source}_${limit}` : `interactions_${limit}`
  return useSWR(key, () =>
    fetcher("interactions", {
      ...(source && { filters: [{ column: "source", value: source }] }),
      order: { column: "created_at", ascending: false },
      limit,
    }),
  )
}

// Search hook
export function useSearch(query: string) {
  return useSWR(
    query ? `/api/search?q=${encodeURIComponent(query)}` : null,
    async (url) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error("Search failed")
      return res.json()
    },
    { dedupingInterval: 500 },
  )
}
