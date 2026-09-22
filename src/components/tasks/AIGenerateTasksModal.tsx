'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/store';
import { toast } from 'sonner';
import { Sparkles, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export function AIGenerateTasksModal() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const { projects, addTask, addActivity } = useStore();
  const { user } = useAuthStore();

  const handleGenerate = async () => {
    if (!selectedProjectId) {
      toast.error('Please select a project first');
      return;
    }

    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) return;

    setIsGenerating(true);
    try {
      const generatedTasks = await api.generateTasks(project.name, project.description);
      
      let createdCount = 0;
      for (const t of generatedTasks) {
        const newTaskData = {
          title: t.title,
          description: t.description,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          projectId: selectedProjectId,
          priority: t.priority || 'Medium',
          status: 'Todo' as const,
          assignee: user?.id || undefined,
        };
        const createdTask = await api.createTask(newTaskData);
        addTask(createdTask);
        createdCount++;
      }
      
      if (user) {
        addActivity({ userId: user.id, action: 'used AI to generate tasks for', target: project.name });
      }
      
      toast.success(`Successfully generated and added ${createdCount} tasks!`);
      setOpen(false);
      setSelectedProjectId('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate tasks');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 hover:text-indigo-300 border-indigo-500/20">
        <Sparkles className="mr-2 h-4 w-4" /> AI Generate Tasks
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Tasks with AI</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Project</label>
            <Select onValueChange={(val) => setSelectedProjectId(val || '')} value={selectedProjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project for AI to analyze" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-indigo-950/30 p-4 rounded-lg border border-indigo-500/20 text-sm text-indigo-200">
            AI will analyze the selected project's title and description to automatically generate a comprehensive list of actionable tasks, complete with priority suggestions.
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleGenerate} disabled={isGenerating || !selectedProjectId} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Tasks
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
