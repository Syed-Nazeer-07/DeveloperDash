"use client";

import { useStore } from '@/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  const { tasks, projects } = useStore();

  const hasData = tasks.length > 0 || projects.length > 0;

  const statusData = [
    { name: 'Todo', value: tasks.filter(t => t.status === 'Todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length },
  ];
  const COLORS = ['#94a3b8', '#3b82f6', '#22c55e'];

  const projectData = projects.map(p => ({
    name: p.name,
    progress: p.progress || 0
  }));

  const recentDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });
  
  const timelineData = recentDays.map(dateStr => {
    const completed = tasks.filter(t => {
      if (t.status !== 'Completed') return false;
      const tDate = (t as any).updatedAt || t.dueDate || new Date().toISOString();
      return tDate.startsWith(dateStr);
    }).length;
    return { name: dateStr.split('-').slice(1).join('/'), completed };
  });

  if (!hasData) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-8 max-w-7xl mx-auto h-[70vh] items-center justify-center text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <PieChart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">No Analytics Yet</h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            Create some projects and tasks to start seeing insights and productivity metrics here.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track your team's productivity and project progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Task Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Completion Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tasks Completed Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
