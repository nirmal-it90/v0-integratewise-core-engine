-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  emoji TEXT,
  color TEXT,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create calendar_events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('daily_brief', 'weekly_cadence', 'content_publish')),
  event_time TIME NOT NULL,
  day_of_week INT CHECK (day_of_week >= 0 AND day_of_week <= 6),
  duration_minutes INT DEFAULT 30,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  recurring BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  preferred_departments TEXT[] DEFAULT ARRAY[]::TEXT[],
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_calendar_events_department ON calendar_events(department_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_type ON calendar_events(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_events_day ON calendar_events(day_of_week);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user ON user_preferences(user_id);

-- Insert departments
INSERT INTO departments (name, slug, emoji, color, description, display_order) VALUES
  ('Executive', 'executive', '👑', '#0050F8', 'Leadership and strategic direction', 1),
  ('Product', 'product', '🎯', '#0050F8', 'Product strategy and roadmap', 2),
  ('Engineering', 'engineering', '⚙️', '#0050F8', 'Technical implementation and architecture', 3),
  ('Sales', 'sales', '📈', '#0050F8', 'Revenue generation and client relationships', 4),
  ('Marketing', 'marketing', '📢', '#0050F8', 'Brand and content marketing', 5),
  ('Customer Success', 'customer-success', '🤝', '#0050F8', 'Customer satisfaction and retention', 6)
ON CONFLICT DO NOTHING;

-- Insert daily briefs (08:00 - 18:00 IST, recurring daily)
INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority) 
SELECT id, 'Morning Brief', 'Daily standup and priorities', 'daily_brief', '08:00', 30, 'high'
FROM departments WHERE slug IN ('executive', 'product', 'sales', 'marketing', 'customer-success', 'engineering');

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'Afternoon Sync', 'Mid-day updates and blockers', 'daily_brief', '14:00', 30, 'medium'
FROM departments WHERE slug IN ('executive', 'product', 'sales', 'marketing', 'customer-success', 'engineering');

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'EOD Summary', 'End of day reflection', 'daily_brief', '17:30', 20, 'low'
FROM departments WHERE slug IN ('executive', 'product', 'sales', 'marketing', 'customer-success');

-- Insert weekly cadence (Monday-Sunday strategic focus)
INSERT INTO calendar_events (department_id, title, description, event_type, day_of_week, event_time, duration_minutes, priority)
SELECT id, 'Planning & Alignment', 'Weekly planning session', 'weekly_cadence', 0, '09:00', 60, 'high'
FROM departments WHERE slug IN ('executive', 'product', 'engineering', 'sales', 'marketing');

INSERT INTO calendar_events (department_id, title, description, event_type, day_of_week, event_time, duration_minutes, priority)
SELECT id, 'Technical Review', 'Architecture and design review', 'weekly_cadence', 1, '10:00', 60, 'high'
FROM departments WHERE slug = 'engineering';

INSERT INTO calendar_events (department_id, title, description, event_type, day_of_week, event_time, duration_minutes, priority)
SELECT id, 'Customer Insights', 'Customer feedback and trends', 'weekly_cadence', 2, '11:00', 45, 'high'
FROM departments WHERE slug IN ('product', 'customer-success', 'marketing');

INSERT INTO calendar_events (department_id, title, description, event_type, day_of_week, event_time, duration_minutes, priority)
SELECT id, 'Sales Pipeline Review', 'Deal review and forecast', 'weekly_cadence', 3, '10:00', 60, 'high'
FROM departments WHERE slug IN ('sales', 'executive');

INSERT INTO calendar_events (department_id, title, description, event_type, day_of_week, event_time, duration_minutes, priority)
SELECT id, 'Marketing Campaign Review', 'Campaign performance and strategy', 'weekly_cadence', 4, '14:00', 45, 'high'
FROM departments WHERE slug IN ('marketing', 'product', 'sales');

INSERT INTO calendar_events (department_id, title, description, event_type, day_of_week, event_time, duration_minutes, priority)
SELECT id, 'Executive Report', 'Weekly company report', 'weekly_cadence', 5, '09:00', 60, 'high'
FROM departments WHERE slug = 'executive';

INSERT INTO calendar_events (department_id, title, description, event_type, day_of_week, event_time, duration_minutes, priority)
SELECT id, 'Community & Culture', 'Team building and company updates', 'weekly_cadence', 5, '16:00', 60, 'medium'
FROM departments WHERE slug IN ('executive', 'marketing', 'customer-success');

-- Insert content publishing calendar (Daily at 15:00 IST)
INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'LinkedIn Post', 'Daily LinkedIn content drop', 'content_publish', '15:00', 15, 'high'
FROM departments WHERE slug IN ('marketing', 'executive');

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'Blog Article', 'Weekly blog post (Wed/Fri)', 'content_publish', '15:00', 15, 'high'
FROM departments WHERE slug IN ('product', 'engineering', 'marketing');

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'Case Study', 'Customer success story', 'content_publish', '15:00', 15, 'high'
FROM departments WHERE slug IN ('customer-success', 'marketing');

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'Technical Deep Dive', 'Engineering tutorial or update', 'content_publish', '15:00', 15, 'high'
FROM departments WHERE slug = 'engineering';

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'Product Update', 'New feature announcement', 'content_publish', '15:00', 15, 'high'
FROM departments WHERE slug = 'product';

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'Weekly Newsletter', 'Curated company updates', 'content_publish', '15:00', 15, 'high'
FROM departments WHERE slug = 'marketing';

INSERT INTO calendar_events (department_id, title, description, event_type, event_time, duration_minutes, priority)
SELECT id, 'Weekly Recap', 'Week highlights and retrospective', 'content_publish', '15:00', 15, 'high'
FROM departments WHERE slug = 'executive';
