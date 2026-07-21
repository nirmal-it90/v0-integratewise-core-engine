# Supabase Integration Setup Guide

## Overview
IntegrateWise uses Supabase for persistent storage of operating calendar data, user preferences, and department configurations.

## Environment Variables

Add these to your `.env.local` (Vercel Project Settings):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (optional, for admin operations)
```

## Database Setup

### 1. Create Tables

Run the migration in your Supabase dashboard or via CLI:

```bash
supabase db push
```

Or manually run the SQL from `supabase/migrations/001_create_calendar_tables.sql` in the Supabase SQL editor.

### 2. Tables Created

- **departments** - Company departments (6 predefined)
- **calendar_events** - Operating calendar events (daily briefs, weekly cadence, content)
- **user_preferences** - User theme and notification preferences

### 3. Row Level Security (RLS)

Enable RLS on tables for security:

```sql
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read calendar data
CREATE POLICY "anyone_can_read_departments" ON departments
  FOR SELECT USING (true);

CREATE POLICY "anyone_can_read_events" ON calendar_events
  FOR SELECT USING (true);

CREATE POLICY "users_can_read_own_preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Usage Examples

### Fetch All Calendar Events

```typescript
import { getCalendarEvents } from '@/lib/supabase/queries'

const events = await getCalendarEvents()
```

### Fetch Department-Specific Events

```typescript
import { getEventsByDepartment } from '@/lib/supabase/queries'

const events = await getEventsByDepartment('engineering')
```

### Get All Departments

```typescript
import { getAllDepartments } from '@/lib/supabase/queries'

const departments = await getAllDepartments()
```

### Save User Preferences

```typescript
import { saveUserPreferences } from '@/lib/supabase/queries'

await saveUserPreferences(userId, {
  preferred_departments: ['engineering', 'product'],
  theme: 'dark',
  notifications_enabled: true,
})
```

## Real-Time Subscriptions

Listen for calendar event updates in real-time:

```typescript
import { useCalendarEventsSubscription } from '@/lib/supabase/queries'

export function useCalendarUpdates() {
  useEffect(() => {
    const subscription = useCalendarEventsSubscription((events) => {
      console.log('Calendar updated:', events)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
}
```

## Data Schema

### departments
- `id` (UUID) - Primary key
- `name` (TEXT) - Department name
- `slug` (TEXT) - URL-friendly slug
- `emoji` (TEXT) - Department emoji
- `color` (TEXT) - Brand color (hex)
- `description` (TEXT) - Department description
- `display_order` (INT) - Display order

### calendar_events
- `id` (UUID) - Primary key
- `department_id` (UUID) - References departments
- `title` (TEXT) - Event title
- `description` (TEXT) - Event details
- `event_type` (TEXT) - 'daily_brief', 'weekly_cadence', or 'content_publish'
- `event_time` (TIME) - Time of day (e.g., '08:00')
- `day_of_week` (INT) - 0-6 for weekly events (NULL for daily)
- `duration_minutes` (INT) - Event duration
- `priority` (TEXT) - 'high', 'medium', or 'low'
- `recurring` (BOOLEAN) - Whether event repeats

### user_preferences
- `id` (UUID) - Primary key
- `user_id` (UUID) - Auth user ID
- `preferred_departments` (TEXT[]) - Array of preferred department slugs
- `theme` (TEXT) - 'light' or 'dark'
- `notifications_enabled` (BOOLEAN) - Enable notifications

## Troubleshooting

### Missing Environment Variables
If you see warnings about missing Supabase variables:
1. Check Vercel project settings
2. Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
3. Restart dev server: `npm run dev`

### Connection Issues
1. Verify Supabase project is active
2. Check URL and key are correct
3. Ensure network access is allowed

### Query Errors
1. Check table names match exactly (lowercase, underscores)
2. Verify RLS policies allow read access
3. Check department slugs in queries
