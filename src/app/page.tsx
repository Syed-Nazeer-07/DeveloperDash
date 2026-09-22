import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCards } from '@/components/dashboard/StatCards';
import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { TaskOverview } from '@/components/dashboard/TaskOverview';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's an overview of your projects and tasks.
          </p>
        </div>
        
        <StatCards />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <RecentProjects />
            <TaskOverview />
          </div>
          <div className="space-y-8">
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
