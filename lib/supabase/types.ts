export interface CalendarEvent {
  id: string
  department_id: string
  title: string
  description: string
  event_type: 'daily_brief' | 'weekly_cadence' | 'content_publish'
  event_time: string
  duration_minutes: number
  priority: 'high' | 'medium' | 'low'
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
  slug: string
  emoji: string
  color: string
  description: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  user_id: string
  preferred_departments: string[]
  theme: 'light' | 'dark'
  notifications_enabled: boolean
  updated_at: string
}

export interface CalendarEventWithDepartment extends CalendarEvent {
  department: Department
}
