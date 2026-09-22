"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Bell, Moon, Sun, Menu, Check } from 'lucide-react';
import { useStore } from '@/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { navigation } from './Sidebar';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

export function TopNav() {
  const { searchQuery, setSearchQuery, isDarkMode, toggleDarkMode, notifications, markNotificationRead, markAllNotificationsRead } = useStore();
  const { user: currentUser, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (!pathname.includes('/projects') && !pathname.includes('/tasks')) {
         router.push('/projects');
      }
    }
  };

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center px-6 border-b">
            <span className="text-lg font-bold text-primary">DeveloperDash</span>
          </div>
          <nav className="space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1 items-center" onSubmit={handleSearchSubmit}>
          <Search className="pointer-events-none absolute left-0 h-5 w-5 text-muted-foreground ml-3" aria-hidden="true" />
          <Input
            id="search-field"
            className="block h-10 w-full md:w-96 border-0 py-0 pl-10 pr-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 sm:text-sm shadow-none bg-accent/50 rounded-md"
            placeholder="Search projects or tasks..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {mounted && (isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
          </Button>
          
          <Popover>
            <PopoverTrigger render={<Button variant="ghost" size="icon" className="relative" />}>
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" aria-hidden="true" />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <p className="text-sm font-semibold">Notifications</p>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllNotificationsRead} className="h-auto p-0 text-xs text-primary">
                    Mark all read
                  </Button>
                )}
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((n) => (
                      <div key={n.id} className={cn("p-4 flex gap-3 transition-colors hover:bg-muted/50", !n.read && "bg-muted/30")}>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {n.link ? <Link href={n.link} onClick={() => markNotificationRead(n.id)} className="hover:underline">{n.title}</Link> : n.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {!n.read && (
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => markNotificationRead(n.id)}>
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>
          
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-8 w-8 rounded-full" />}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name || 'User'} />
                <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser?.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser?.email || ''}</p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')}>Profile & Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                logout();
                router.push('/login');
              }}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
