"use client";

import { useStore } from '@/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, CalendarIcon, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { TaskCard } from '@/components/tasks/TaskCard';

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { projects, tasks, updateProject, deleteProject, currentUser, addActivity } = useStore();

  if (!currentUser) return null;
  
  const projectId = params.id as string;
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold">Project Not Found</h2>
          <Button variant="link" onClick={() => router.push('/projects')}>Return to Projects</Button>
        </div>
      </DashboardLayout>
    );
  }

  const projectTasks = tasks.filter(t => t.projectId === project.id);

  const handleDelete = () => {
    deleteProject(project.id);
    addActivity({ userId: currentUser.id, action: 'deleted project', target: project.name });
    toast.success('Project deleted');
    router.push('/projects');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/projects')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                  {project.name}
                  <Badge variant="secondary">{project.status}</Badge>
                </h1>
                <p className="text-muted-foreground mt-2">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast.info('Edit functionality pending')}><Edit className="h-4 w-4 mr-2"/> Edit</Button>
                <Button variant="destructive" onClick={handleDelete}><Trash2 className="h-4 w-4 mr-2"/> Delete</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-card text-card-foreground rounded-xl border shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Project Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Completion</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-4">Related Tasks</h3>
              {projectTasks.length === 0 ? (
                <div className="text-center p-8 bg-muted/20 rounded-xl border border-dashed">
                  <p className="text-muted-foreground">No tasks associated with this project.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {projectTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-card text-card-foreground rounded-xl border shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="flex items-center font-medium"><CalendarIcon className="h-3 w-3 mr-1"/> {format(new Date(project.dueDate), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Tasks</span>
                  <span className="font-medium">{projectTasks.length}</span>
                </div>
              </div>
            </section>

            <section className="bg-card text-card-foreground rounded-xl border shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Team Members</h3>
              <div className="space-y-4">
                {project.teamMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{member.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
