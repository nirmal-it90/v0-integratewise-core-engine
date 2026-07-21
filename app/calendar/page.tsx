import { OperatingCalendarAllDepartments } from '@/components/views/operating-calendar-all-departments';

export const metadata = {
  title: 'Operating Calendar | IntegrateWise',
  description: 'Company-wide operating calendar and scheduling rhythm for all departments',
};

export default function CalendarPage() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <OperatingCalendarAllDepartments />
    </main>
  );
}
