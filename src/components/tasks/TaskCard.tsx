import { Task } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, Clock, CheckCircle2, Circle, MoreVertical, Trash2, Check, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { toast } from 'sonner';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask, currentUser, addActivity } = useStore();

  const priorityColors: Record<Task['priority'], string> = {
    Low: 'bg-green-500/10 text-green-500',
    Medium: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
    High: 'bg-red-500/10 text-red-500',
  };

  const statusIcons: Record<Task['status'], React.ReactNode> = {
    Todo: <Circle className="h-5 w-5 text-muted-foreground" />,
    'In Progress': <Clock className="h-5 w-5 text-blue-500" />,
    Completed: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
    addActivity({ userId: currentUser.id, action: `moved task to ${newStatus}`, target: task.title });
    toast.success(`Task marked as ${newStatus}`);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    addActivity({ userId: currentUser.id, action: 'deleted task', target: task.title });
    toast.success('Task deleted');
  };

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-0.5">{statusIcons[task.status]}</div>
            <div className="space-y-1 flex-1">
              <h4 className={cn("font-medium leading-tight", task.status === 'Completed' && "line-through text-muted-foreground")}>
                {task.title}
              </h4>
              <div className="flex items-center text-xs text-muted-foreground pt-1 gap-2">
                <span className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-between h-full space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={`border-none ${priorityColors[task.priority]}`}>
                {task.priority}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                  <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {task.status !== 'Todo' && (
                    <DropdownMenuItem onClick={() => handleStatusChange('Todo')}>
                      <Circle className="mr-2 h-4 w-4" /> Mark as Todo
                    </DropdownMenuItem>
                  )}
                  {task.status !== 'In Progress' && (
                    <DropdownMenuItem onClick={() => handleStatusChange('In Progress')}>
                      <Clock className="mr-2 h-4 w-4 text-blue-500" /> Mark In Progress
                    </DropdownMenuItem>
                  )}
                  {task.status !== 'Completed' && (
                    <DropdownMenuItem onClick={() => handleStatusChange('Completed')}>
                      <Check className="mr-2 h-4 w-4 text-green-500" /> Mark Completed
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {task.assignee && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
                <AvatarFallback className="text-[10px]">{task.assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
