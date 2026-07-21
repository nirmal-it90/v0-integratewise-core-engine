export interface CalendarEvent {
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

export interface DepartmentSchedule {
  department: string;
  color: string;
  icon: string;
  description: string;
  dailyEvents: CalendarEvent[];
  weeklyEvents: CalendarEvent[];
  contentEvents: CalendarEvent[];
}

// Daily briefs (all departments, 08:00-18:00 IST)
export const dailyBriefs: CalendarEvent[] = [
  {
    id: 'daily-1',
    name: 'Founder Daily Brief',
    time: '08:00',
    departments: ['Executive'],
    description: 'Priorities, KPIs, blockers, approvals',
    priority: 'high',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-2',
    name: 'Product & Engineering Priorities',
    time: '09:00',
    departments: ['Product', 'Engineering'],
    description: 'Sprint status, technical priorities, bug triage',
    priority: 'high',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-3',
    name: 'Sales Pipeline & Prospecting',
    time: '10:00',
    departments: ['Sales'],
    description: 'Pipeline status, hot leads, conversion risks',
    priority: 'high',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-4',
    name: 'Marketing Content Creation',
    time: '11:00',
    departments: ['Marketing'],
    description: 'Content pipeline, today\'s focus, performance signals',
    priority: 'high',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-5',
    name: 'Customer Success Review',
    time: '12:00',
    departments: ['Customer Success'],
    description: 'Customer health, onboarding status, support tickets',
    priority: 'high',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-6',
    name: 'Product Development Checkpoint',
    time: '14:00',
    departments: ['Product', 'Engineering'],
    description: 'Progress checkpoint, blockers, release status',
    priority: 'medium',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-7',
    name: 'Content Publishing',
    time: '15:00',
    departments: ['Marketing'],
    description: 'Publishing schedule, channel distribution',
    priority: 'medium',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-8',
    name: 'Partnerships & GTM Execution',
    time: '16:00',
    departments: ['Sales', 'Marketing'],
    description: 'Partnership updates, go-to-market initiatives',
    priority: 'medium',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-9',
    name: 'Documentation & Architecture',
    time: '17:00',
    departments: ['Engineering'],
    description: 'Tech documentation, architecture updates, knowledge base',
    priority: 'medium',
    type: 'daily',
    repeating: true,
  },
  {
    id: 'daily-10',
    name: 'End-of-Day Executive Summary',
    time: '18:00',
    departments: ['Executive', 'Product', 'Sales'],
    description: 'Day recap, next-day planning, blockers',
    priority: 'high',
    type: 'daily',
    repeating: true,
  },
];

// Weekly cadence (specific days with focused areas)
export const weeklyCadence: CalendarEvent[] = [
  {
    id: 'weekly-1',
    name: 'Strategy & Sprint Planning',
    time: '09:00',
    dayOfWeek: 1, // Monday
    departments: ['Executive', 'Product', 'Engineering'],
    description: 'Strategy, sprint planning, GTM priorities',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'weekly-2',
    name: 'Product & Architecture',
    time: '09:00',
    dayOfWeek: 2, // Tuesday
    departments: ['Product', 'Engineering'],
    description: 'Technical deep dive, architecture review',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'weekly-3',
    name: 'Customer Success & Interviews',
    time: '09:00',
    dayOfWeek: 3, // Wednesday
    departments: ['Customer Success', 'Product'],
    description: 'Customer feedback, success metrics, interviews',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'weekly-4',
    name: 'Marketing Campaigns & Content',
    time: '10:00',
    dayOfWeek: 4, // Thursday
    departments: ['Marketing', 'Sales'],
    description: 'Campaigns, blogs, videos, webinars',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'weekly-5',
    name: 'Sales, Demos & Releases',
    time: '10:00',
    dayOfWeek: 5, // Friday
    departments: ['Sales', 'Product', 'Engineering'],
    description: 'Sales demos, product releases, KPI review',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'weekly-6',
    name: 'Long-form Content & Research',
    time: '10:00',
    dayOfWeek: 6, // Saturday
    departments: ['Marketing'],
    description: 'Research, thought leadership, deep content',
    priority: 'medium',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'weekly-7',
    name: 'Quarterly Planning & Roadmap',
    time: '10:00',
    dayOfWeek: 0, // Sunday
    departments: ['Executive', 'Product', 'Engineering'],
    description: 'Planning, editorial calendar, roadmap refinement',
    priority: 'medium',
    type: 'weekly',
    repeating: true,
  },
];

// Content publishing rhythm
export const contentPublishing: CalendarEvent[] = [
  {
    id: 'content-1',
    name: 'Founder LinkedIn + Vision Article',
    time: '15:00',
    dayOfWeek: 1, // Monday
    departments: ['Marketing'],
    description: 'Weekly founder post and vision article',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'content-2',
    name: 'Educational Blog + Carousel',
    time: '15:00',
    dayOfWeek: 2, // Tuesday
    departments: ['Marketing'],
    description: 'Blog post and social carousel',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'content-3',
    name: 'Customer Story + Short Video',
    time: '15:00',
    dayOfWeek: 3, // Wednesday
    departments: ['Marketing', 'Customer Success'],
    description: 'Customer success story and video content',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'content-4',
    name: 'Technical Article + Architecture Post',
    time: '15:00',
    dayOfWeek: 4, // Thursday
    departments: ['Marketing', 'Engineering'],
    description: 'Technical deep dive and architecture content',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'content-5',
    name: 'Product Update + Demo Video',
    time: '15:00',
    dayOfWeek: 5, // Friday
    departments: ['Marketing', 'Product'],
    description: 'Product release announcement and demo',
    priority: 'high',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'content-6',
    name: 'Newsletter + Community Discussion',
    time: '15:00',
    dayOfWeek: 6, // Saturday
    departments: ['Marketing'],
    description: 'Weekly newsletter and community engagement',
    priority: 'medium',
    type: 'weekly',
    repeating: true,
  },
  {
    id: 'content-7',
    name: 'Weekly Recap + Content Schedule',
    time: '15:00',
    dayOfWeek: 0, // Sunday
    departments: ['Marketing', 'Executive'],
    description: 'Week recap and next week content schedule',
    priority: 'medium',
    type: 'weekly',
    repeating: true,
  },
];

export const departmentSchedules: Record<string, DepartmentSchedule> = {
  Executive: {
    department: 'Executive',
    color: 'bg-amber-500',
    icon: '👑',
    description: 'Leadership and strategic oversight',
    dailyEvents: dailyBriefs.filter(e => e.departments.includes('Executive')),
    weeklyEvents: weeklyCadence.filter(e => e.departments.includes('Executive')),
    contentEvents: contentPublishing.filter(e => e.departments.includes('Executive')),
  },
  Product: {
    department: 'Product',
    color: 'bg-blue-500',
    icon: '🎯',
    description: 'Product strategy and development',
    dailyEvents: dailyBriefs.filter(e => e.departments.includes('Product')),
    weeklyEvents: weeklyCadence.filter(e => e.departments.includes('Product')),
    contentEvents: contentPublishing.filter(e => e.departments.includes('Product')),
  },
  Engineering: {
    department: 'Engineering',
    color: 'bg-purple-500',
    icon: '⚙️',
    description: 'Technical development and infrastructure',
    dailyEvents: dailyBriefs.filter(e => e.departments.includes('Engineering')),
    weeklyEvents: weeklyCadence.filter(e => e.departments.includes('Engineering')),
    contentEvents: contentPublishing.filter(e => e.departments.includes('Engineering')),
  },
  Sales: {
    department: 'Sales',
    color: 'bg-green-500',
    icon: '📈',
    description: 'Sales pipeline and revenue growth',
    dailyEvents: dailyBriefs.filter(e => e.departments.includes('Sales')),
    weeklyEvents: weeklyCadence.filter(e => e.departments.includes('Sales')),
    contentEvents: contentPublishing.filter(e => e.departments.includes('Sales')),
  },
  Marketing: {
    department: 'Marketing',
    color: 'bg-pink-500',
    icon: '📢',
    description: 'Content and marketing strategy',
    dailyEvents: dailyBriefs.filter(e => e.departments.includes('Marketing')),
    weeklyEvents: weeklyCadence.filter(e => e.departments.includes('Marketing')),
    contentEvents: contentPublishing.filter(e => e.departments.includes('Marketing')),
  },
  'Customer Success': {
    department: 'Customer Success',
    color: 'bg-cyan-500',
    icon: '🤝',
    description: 'Customer satisfaction and retention',
    dailyEvents: dailyBriefs.filter(e => e.departments.includes('Customer Success')),
    weeklyEvents: weeklyCadence.filter(e => e.departments.includes('Customer Success')),
    contentEvents: contentPublishing.filter(e => e.departments.includes('Customer Success')),
  },
};

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const departments = Object.keys(departmentSchedules);
