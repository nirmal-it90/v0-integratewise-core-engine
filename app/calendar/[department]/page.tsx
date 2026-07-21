import { OperatingCalendarView } from '@/components/views/operating-calendar-view';
import { departments } from '@/lib/data/operating-calendar';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Department Calendar | IntegrateWise',
  description: 'Department-specific operating calendar and scheduling',
};

export default function DepartmentCalendarPage({
  params,
}: {
  params: Promise<{ department: string }>;
}) {
  const resolvedParams = params;
  
  const department = resolvedParams.then(p => {
    const decoded = decodeURIComponent(p.department);
    // Validate department exists
    if (!departments.includes(decoded)) {
      redirect('/calendar');
    }
    return decoded;
  });

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      {/* Note: Dynamic selection requires client component, handled by the base view */}
      <OperatingCalendarView />
    </main>
  );
}
