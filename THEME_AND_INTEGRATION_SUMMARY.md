# IntegrateWise: Salesforce Blue & White Theme + Supabase Integration

## Overview

IntegrateWise OS has been updated with a professional **Salesforce Blue & White** design system and integrated with **Supabase** for persistent data storage and real-time calendar management.

---

## Design System: Salesforce Blue & White

### Color Palette

**Primary Brand Color:**
- Salesforce Blue: `#0050F8` / `oklch(0.45 0.16 260)`
- Used for buttons, links, and primary actions
- Professional, enterprise-ready appearance

**Light Mode (Default):**
- Background: `#FAFAFA` (off-white)
- Cards: `#FFFFFF` (pure white)
- Text: `#1A1A3E` (dark navy)
- Borders: `#E8E8E8` (light gray)

**Dark Mode:**
- Background: `#1E1E3E` (dark slate)
- Cards: `#2E2E4E` (slightly lighter)
- Text: `#F2F2F2` (light gray)
- Accents: `#A4CCFF` (light blue)

### Typography

- **Font Families**: Inter (body/headings), Geist Mono (code)
- **Line Height**: 1.5 for body text (leading-relaxed)
- **Heading Weights**: 600-700 (semibold to bold)
- **Accessible Contrast**: WCAG AA compliant (4.5:1 minimum)

### Component System

**Buttons:**
- Primary: Salesforce Blue with white text
- Secondary: Light blue with navy text
- Tertiary: Transparent with navy text

**Forms:**
- Clean input borders in light gray
- Blue focus ring for accessibility
- Error states in red, warnings in amber

**Cards:**
- White background (light) / dark gray (dark)
- Subtle shadow and border
- 8px border radius for modern look

**Navigation:**
- White sidebar (light) / dark gray sidebar (dark)
- Salesforce Blue active states
- Clear hover feedback

---

## Supabase Integration

### Database Schema

**3 Main Tables:**

#### 1. Departments
```sql
CREATE TABLE departments (
  id UUID PRIMARY KEY,
  name TEXT,              -- "Executive", "Product", etc.
  slug TEXT UNIQUE,       -- "executive", "product"
  emoji TEXT,             -- "👑", "🎯", etc.
  color TEXT,             -- Brand color (hex)
  description TEXT,
  display_order INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```
**Pre-populated:** 6 departments (Executive, Product, Engineering, Sales, Marketing, Customer Success)

#### 2. Calendar Events
```sql
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY,
  department_id UUID REFERENCES departments,
  title TEXT,             -- "Morning Brief", "Weekly Planning"
  description TEXT,
  event_type TEXT,        -- "daily_brief" | "weekly_cadence" | "content_publish"
  event_time TIME,        -- "08:00", "15:00"
  day_of_week INT,        -- 0-6 (null for daily events)
  duration_minutes INT,
  priority TEXT,          -- "high" | "medium" | "low"
  recurring BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```
**Pre-populated:** 24+ events across all departments

#### 3. User Preferences
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  user_id UUID,           -- Auth user ID
  preferred_departments TEXT[],  -- Array of slugs
  theme TEXT,             -- "light" | "dark"
  notifications_enabled BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Query Functions

**Server-side queries** (for SSR, API routes):
- `getCalendarEvents()` - Fetch all events
- `getEventsByDepartment(slug)` - Department-specific events
- `getEventsByType(type)` - Filter by event type
- `getAllDepartments()` - List all departments
- `getDepartmentBySlug(slug)` - Single department

**Client-side queries** (with real-time):
- `saveUserPreferences(userId, preferences)` - Persist user choices
- `getUserPreferences(userId)` - Fetch saved preferences
- `useCalendarEventsSubscription()` - Real-time updates

### Security

**Row Level Security (RLS):**
- Public read access to departments and events
- User-scoped write access to preferences
- Full SQL policies included in setup guide

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional)
```

---

## File Structure

```
/app
  /globals.css                    ← Theme colors (Salesforce Blue & White)
  /layout.tsx                     ← Updated with new theme classes

/lib/supabase
  /client.ts                      ← Browser client (existing)
  /server.ts                      ← Server client (existing)
  /queries.ts                     ← NEW: Query functions
  /types.ts                       ← NEW: TypeScript types

/supabase/migrations
  /001_create_calendar_tables.sql ← NEW: Database schema + 24 events

/docs
  /DESIGN_SYSTEM.md               ← NEW: Comprehensive design guide
  /SUPABASE_SETUP.md              ← NEW: Integration setup guide
  /OPERATING_CALENDAR.md          ← Existing: Calendar documentation

/.env.example                      ← NEW: Environment template
```

---

## Getting Started

### 1. Setup Supabase

1. Visit [supabase.com](https://supabase.com)
2. Create a new project
3. Copy URL and Anon Key to environment variables
4. Run SQL migration in Supabase dashboard

### 2. Configure Environment

```bash
# Copy template
cp .env.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Test Integration

```tsx
import { getAllDepartments, getCalendarEvents } from '@/lib/supabase/queries'

// In your component
const departments = await getAllDepartments()
const events = await getCalendarEvents()
```

### 4. Update Components

Replace hardcoded data with database queries:

```tsx
// Before
const departments = [{ id: '1', name: 'Executive' }, ...]

// After
const departments = await getAllDepartments()
```

---

## Key Features

### Design System
✅ Professional Salesforce Blue (#0050F8) theme
✅ Light and dark mode support
✅ WCAG AA accessibility (4.5:1 contrast)
✅ Enterprise typography (Inter + Geist Mono)
✅ Comprehensive component guidelines
✅ Responsive design (mobile-first)

### Database
✅ 6 departments with metadata
✅ 24+ pre-configured calendar events
✅ Daily briefs (08:00-18:00 IST)
✅ Weekly cadence (Monday-Sunday focus)
✅ Content publishing calendar (15:00 IST)
✅ User preferences storage
✅ Real-time subscription support

### Integration
✅ @supabase/ssr pattern for security
✅ Server and client separation
✅ Row Level Security (RLS) ready
✅ TypeScript types included
✅ Query optimization with indexes
✅ Error handling and logging

---

## Documentation

### User-Facing
- **docs/DESIGN_SYSTEM.md** - Complete design guidelines
- **docs/SUPABASE_SETUP.md** - Database and integration setup
- **docs/OPERATING_CALENDAR.md** - Calendar system documentation

### For Developers
- TypeScript interfaces in `lib/supabase/types.ts`
- Query functions with JSDoc comments
- Migration script with detailed schema
- .env.example with all required variables

---

## Next Steps

1. **Add Authentication**
   - Set up Supabase Auth (email/password, OAuth)
   - Create auth middleware
   - Link user_id to calendar_events for personalization

2. **Enhance Components**
   - Replace hardcoded calendar data with database queries
   - Add filters by department (using client-side store)
   - Implement real-time updates on calendar events

3. **Add Features**
   - User event creation and editing
   - Department-specific dashboards
   - Notification system (email/in-app)
   - Analytics for event attendance

4. **Performance**
   - Add caching strategies
   - Optimize queries with pagination
   - Implement incremental static regeneration (ISR)

---

## Support

For issues or questions:
1. Check `docs/DESIGN_SYSTEM.md` for design decisions
2. Review `docs/SUPABASE_SETUP.md` for integration help
3. See `lib/supabase/queries.ts` for query patterns
4. Check browser console for error messages

---

**Last Updated:** July 21, 2026
**Theme Version:** Salesforce Blue & White v1.0
**Database Version:** 1.0 (001_create_calendar_tables.sql)
