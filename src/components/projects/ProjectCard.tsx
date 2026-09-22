import { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors: Record<Project['status'], string> = {
    Active: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
    Completed: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    'On Hold': 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
  };

  const { deleteProject, currentUser, addActivity } = useStore();
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    deleteProject(project.id);
    addActivity({ userId: currentUser.id, action: 'deleted project', target: project.name });
    toast.success('Project deleted');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info('Edit functionality via modal (Implementation pending)');
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer relative group" onClick={() => router.push(`/projects/${project.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg pr-8">{project.name}</CardTitle>
          <Badge variant="secondary" className={`border-none ${statusColors[project.status]}`}>
            {project.status}
          </Badge>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />} onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardDescription className="line-clamp-2 text-sm mt-1 h-10">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 border-t">
        <div className="flex -space-x-2">
          {project.teamMembers.map((member) => (
            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarIcon className="mr-1 h-3 w-3" />
          {format(new Date(project.dueDate), 'MMM d, yyyy')}
        </div>
      </CardFooter>
    </Card>
  );
}
