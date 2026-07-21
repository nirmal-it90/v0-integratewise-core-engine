# IntegrateWise Operating Calendar

## Overview

The Operating Calendar is a **company-wide scheduling system** that synchronizes all departments around a unified rhythm. It ensures every team knows:
- When their focus meetings happen
- What they should be working on
- How their work aligns with other departments
- Content publishing and communication cadence

**Timezone**: Asia/Kolkata (IST, UTC+5:30)

---

## Architecture

The operating calendar is composed of three layers:

### 1. Daily Briefs (10 meetings, 08:00-18:00 IST)
Every day, all departments follow the same hourly rhythm of focused briefs.

| Time | Meeting | Focus | Departments |
|------|---------|-------|-------------|
| 08:00 | Founder Daily Brief | Priorities, KPIs, blockers, approvals | Executive |
| 09:00 | Product & Engineering Priorities | Sprint status, technical priorities, bug triage | Product, Engineering |
| 10:00 | Sales Pipeline & Prospecting | Pipeline status, hot leads, conversion risks | Sales |
| 11:00 | Marketing Content Creation | Content pipeline, today's focus, performance signals | Marketing |
| 12:00 | Customer Success Review | Customer health, onboarding status, support tickets | Customer Success |
| 14:00 | Product Development Checkpoint | Progress checkpoint, blockers, release status | Product, Engineering |
| 15:00 | Content Publishing | Publishing schedule, channel distribution | Marketing |
| 16:00 | Partnerships & GTM Execution | Partnership updates, go-to-market initiatives | Sales, Marketing |
| 17:00 | Documentation & Architecture | Tech documentation, architecture updates, knowledge base | Engineering |
| 18:00 | End-of-Day Executive Summary | Day recap, next-day planning, blockers | Executive, Product, Sales |

### 2. Weekly Cadence (7 focus days, Monday-Sunday)
Each day of the week has a specific strategic focus for cross-functional collaboration.

| Day | Focus | Time | Departments |
|-----|-------|------|-------------|
| **Monday** | Strategy & Sprint Planning | 09:00 | Executive, Product, Engineering |
| **Tuesday** | Product & Architecture | 09:00 | Product, Engineering |
| **Wednesday** | Customer Success & Interviews | 09:00 | Customer Success, Product |
| **Thursday** | Marketing Campaigns & Content | 10:00 | Marketing, Sales |
| **Friday** | Sales, Demos & Releases | 10:00 | Sales, Product, Engineering |
| **Saturday** | Long-form Content & Research | 10:00 | Marketing |
| **Sunday** | Quarterly Planning & Roadmap | 10:00 | Executive, Product, Engineering |

### 3. Content Publishing Rhythm (7 content drops weekly)
Consistent daily content cadence at 15:00 IST.

| Day | Content Type | Focus | Departments |
|-----|--------------|-------|-------------|
| **Monday** | Founder LinkedIn + Vision Article | Founder voice, thought leadership | Marketing |
| **Tuesday** | Educational Blog + Carousel | Knowledge sharing, social media | Marketing |
| **Wednesday** | Customer Story + Short Video | Success metrics, customer voice | Marketing, Customer Success |
| **Thursday** | Technical Article + Architecture Post | Engineering insights, tech deep dives | Marketing, Engineering |
| **Friday** | Product Update + Demo Video | New features, product announcements | Marketing, Product |
| **Saturday** | Newsletter + Community Discussion | Weekly summary, community engagement | Marketing |
| **Sunday** | Weekly Recap + Content Schedule | Week recap, next week planning | Marketing, Executive |

---

## Department Views

Each department has a customized view showing only their relevant schedule items.

### Executive
- **Daily Briefs**: 08:00, 18:00 (bookends)
- **Weekly**: Monday, Sunday (strategic planning)
- **Content**: Sunday (weekly recap)
- **Focus**: Strategic oversight, KPIs, approvals

### Product
- **Daily Briefs**: 09:00, 14:00, 18:00
- **Weekly**: Monday, Tuesday, Wednesday, Friday, Sunday
- **Content**: Friday (product updates)
- **Focus**: Product strategy, development, customer feedback

### Engineering
- **Daily Briefs**: 09:00, 14:00, 17:00
- **Weekly**: Monday, Tuesday, Sunday
- **Content**: Thursday (technical content)
- **Focus**: Development, technical excellence, architecture

### Sales
- **Daily Briefs**: 10:00, 16:00, 18:00
- **Weekly**: Thursday, Friday
- **Content**: Friday (product demos)
- **Focus**: Pipeline, revenue, GTM execution

### Marketing
- **Daily Briefs**: 11:00, 15:00
- **Weekly**: Thursday, Saturday, Sunday
- **Content**: All 7 days (full publishing rhythm)
- **Focus**: Content, campaigns, brand voice

### Customer Success
- **Daily Briefs**: 12:00
- **Weekly**: Wednesday
- **Content**: Wednesday (customer stories)
- **Focus**: Customer health, satisfaction, retention

---

## Implementation

### Data Structure
The calendar data is defined in `/lib/data/operating-calendar.ts`:

```typescript
interface CalendarEvent {
  id: string;
  name: string;
  time: string;
  departments: string[];
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'daily' | 'weekly' | 'monthly';
  dayOfWeek?: number; // 0-6 for weekly
  repeating: boolean;
}

interface DepartmentSchedule {
  department: string;
  color: string;
  icon: string;
  description: string;
  dailyEvents: CalendarEvent[];
  weeklyEvents: CalendarEvent[];
  contentEvents: CalendarEvent[];
}
```

### UI Components

1. **OperatingCalendarAllDepartments** (`/components/views/operating-calendar-all-departments.tsx`)
   - Shows complete company calendar
   - Department cards with color-coded schedules
   - Weekly cadence grid
   - Key metrics dashboard

2. **OperatingCalendarView** (`/components/views/operating-calendar-view.tsx`)
   - Individual department view with tab-based navigation
   - Daily, Weekly, and Content filtering
   - Color-coded by department
   - Interactive department selector

### Routes

- `/calendar` - Company-wide calendar (all departments)
- `/calendar/[department]` - Department-specific view

---

## Color Coding

Each department is assigned a distinct color for visual organization:

| Department | Color | Icon |
|------------|-------|------|
| Executive | Amber | 👑 |
| Product | Blue | 🎯 |
| Engineering | Purple | ⚙️ |
| Sales | Green | 📈 |
| Marketing | Pink | 📢 |
| Customer Success | Cyan | 🤝 |

---

## Usage & Integration

### Viewing Your Department Schedule
1. Navigate to `/calendar`
2. Click your department button at the top
3. Use tabs to switch between:
   - **Daily Briefs**: Your daily focus areas (08:00-18:00)
   - **Weekly Cadence**: Strategic focus days
   - **Content Publishing**: When your content goes live

### Adding New Events
To add new calendar events:

1. Edit `/lib/data/operating-calendar.ts`
2. Add event to appropriate array:
   - `dailyBriefs` for daily 08:00-18:00 events
   - `weeklyCadence` for weekly focus days
   - `contentPublishing` for content drops
3. Add departments to the `departments` array in the event
4. The UI automatically includes your event in all relevant views

### Syncing with External Systems
The calendar data can be synced to:
- Slack reminders (via cron jobs)
- Outlook/Google Calendar (via calendar integrations)
- Project management tools (Asana, Linear, etc.)
- Team communication platforms

---

## Key Principles

1. **Synchronized Rhythm**: Every department knows exactly when company-wide meetings happen
2. **Clear Focus**: Each meeting has a specific purpose and departments
3. **Cross-functional Alignment**: Weekly cadence brings departments together at strategic times
4. **Content Velocity**: Regular, predictable publishing keeps the brand visible
5. **Timezone Aware**: All times are in IST for consistency across the company

---

## Metrics

- **Total Departments**: 6
- **Daily Briefs**: 10 (every business day)
- **Weekly Strategic Meetings**: 7 (one per day)
- **Content Publishing**: 7 (daily drops)
- **Total Recurring Events**: 24
- **Timezone**: Asia/Kolkata (IST, UTC+5:30)

---

## Future Enhancements

- [ ] Sync with Google Calendar / Outlook
- [ ] Slack integration for automated reminders
- [ ] Custom department schedules
- [ ] Vacation / holidays handling
- [ ] Quarter-based view
- [ ] Historical attendance tracking
- [ ] Meeting notes integration
- [ ] Department performance against calendar adherence
