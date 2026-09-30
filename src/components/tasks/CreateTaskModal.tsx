"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useStore } from '@/store';
import { toast } from 'sonner';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  projectId: z.string().min(1, 'Project is required'),
  priority: z.enum(['Low', 'Medium', 'High']),
});

export function CreateTaskModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTask, projects, currentUser, addActivity, addNotification } = useStore();
  
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      projectId: '',
      priority: 'Medium',
    },
  });

  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    if (!currentUser) return;
    setIsSubmitting(true);
    try {
      const newTaskData = {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        projectId: values.projectId,
        priority: values.priority,
        status: 'Todo' as const,
        assignee: currentUser ? (currentUser.id || (currentUser as any)._id) : undefined,
      };
      
      console.log('Final request payload:', newTaskData);
      const createdTask = await api.createTask(newTaskData);
      
      addTask(createdTask);
      
      const userId = currentUser.id || (currentUser as any)._id;
      addActivity({ userId, action: 'created task', target: createdTask.title });
      
      addNotification({
        title: 'New Task Created',
        message: `You created task "${createdTask.title}"`,
        read: false,
        link: `/tasks/${createdTask.id || (createdTask as any)._id}`,
      });
      
      toast.success('Task created successfully');
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="mr-2 h-4 w-4" /> New Task
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map(p => (
                        <SelectItem key={(p as any)._id || p.id} value={(p as any)._id || p.id} label={p.name}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="dueDate" render={({ field }) => ( <FormItem className="flex flex-col mt-2"> <FormLabel>Due Date</FormLabel> <Popover> <FormControl> <PopoverTrigger render={ <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors h-10", !field.value && "text-muted-foreground")} /> } > {field.value ? ( format(new Date(field.value), "PPP") ) : ( <span>Pick a date</span> )} <CalendarIcon className="ml-auto h-5 w-5 opacity-70" /> </PopoverTrigger> </FormControl> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")} /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}



