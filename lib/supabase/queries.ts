import { createServerClient } from './server'
import { createBrowserClient } from './client'

/**
 * Calendar Events - Server-side queries
 */
export async function getCalendarEvents() {
  const client = await createServerClient()
  
  const { data, error } = await client
    .from('calendar_events')
    .select(`
      *,
      department:departments(*)
    `)
    .order('event_time', { ascending: true })

  if (error) {
    console.error('[Supabase] Error fetching calendar events:', error)
    return []
  }

  return data || []
}

export async function getEventsByDepartment(departmentSlug: string) {
  const client = await createServerClient()
  
  const { data, error } = await client
    .from('calendar_events')
    .select(`
      *,
      department:departments(*)
    `)
    .eq('department.slug', departmentSlug)
    .order('event_time', { ascending: true })

  if (error) {
    console.error('[Supabase] Error fetching department events:', error)
    return []
  }

  return data || []
}

export async function getEventsByType(eventType: 'daily_brief' | 'weekly_cadence' | 'content_publish') {
  const client = await createServerClient()
  
  const { data, error } = await client
    .from('calendar_events')
    .select(`
      *,
      department:departments(*)
    `)
    .eq('event_type', eventType)
    .order('event_time', { ascending: true })

  if (error) {
    console.error('[Supabase] Error fetching events by type:', error)
    return []
  }

  return data || []
}

/**
 * Department Data - Server-side queries
 */
export async function getAllDepartments() {
  const client = await createServerClient()
  
  const { data, error } = await client
    .from('departments')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('[Supabase] Error fetching departments:', error)
    return []
  }

  return data || []
}

export async function getDepartmentBySlug(slug: string) {
  const client = await createServerClient()
  
  const { data, error } = await client
    .from('departments')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('[Supabase] Error fetching department:', error)
    return null
  }

  return data
}

export async function getDepartmentById(departmentId: string) {
  const client = await createServerClient()
  
  const { data, error } = await client
    .from('departments')
    .select('*')
    .eq('id', departmentId)
    .single()

  if (error) {
    console.error('[Supabase] Error fetching department:', error)
    return null
  }

  return data
}

/**
 * Client-side queries for real-time updates
 */
export function useCalendarEventsSubscription(
  onUpdate: (events: any[]) => void
) {
  const client = createBrowserClient()

  const subscription = client
    .channel('calendar_events_channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'calendar_events',
      },
      (payload) => {
        console.log('[Supabase] Calendar event updated:', payload)
        // Re-fetch events on change
      }
    )
    .subscribe()

  return subscription
}

/**
 * User Preferences
 */
export async function saveUserPreferences(
  userId: string,
  preferences: {
    preferred_departments?: string[]
    theme?: 'light' | 'dark'
    notifications_enabled?: boolean
  }
) {
  const client = createBrowserClient()
  
  const { error } = await client
    .from('user_preferences')
    .upsert(
      {
        user_id: userId,
        preferred_departments: preferences.preferred_departments,
        theme: preferences.theme,
        notifications_enabled: preferences.notifications_enabled,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )

  if (error) {
    console.error('[Supabase] Error saving preferences:', error)
    return false
  }

  return true
}

export async function getUserPreferences(userId: string) {
  const client = createBrowserClient()
  
  const { data, error } = await client
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('[Supabase] Error fetching preferences:', error)
    return null
  }

  return data
}
