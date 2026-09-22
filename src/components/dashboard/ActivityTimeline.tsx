"use client";

import { useStore } from '@/store';
import { mockUsers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

export function ActivityTimeline() {
  const { activities, currentUser } = useStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.slice(0, 10).map((activity, index) => {
            const user = activity.userId === currentUser.id ? currentUser : mockUsers.find(u => u.id === activity.userId);
            
            return (
              <div key={activity.id} className="relative flex gap-4">
                {index !== activities.slice(0, 10).length - 1 && (
                  <span
                    className="absolute left-4 top-10 -ml-px h-full w-0.5 bg-border"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex h-8 w-8 items-center justify-center bg-background rounded-full border z-10">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col min-w-0 pt-1.5">
                  <p className="text-sm text-foreground">
                    <span className="font-medium mr-1">{user?.name || 'Unknown User'}</span>
                    <span className="text-muted-foreground">{activity.action}</span>
                    <span className="font-medium ml-1">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
