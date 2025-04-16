'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AutoSuggestButton } from '@/components/ui/auto-suggest-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  onAutoSuggest?: () => void;
  isGenerating?: boolean;
}

export function DashboardHeader({ onAutoSuggest, isGenerating }: DashboardHeaderProps) {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'>
      <div className='flex h-16 items-center px-4'>
        <div className='flex flex-1 items-center justify-between'>
          <Link href='/dashboard' className='text-xl font-bold'>
            Web2Web
          </Link>
          <div className='flex items-center gap-4'>
            <AutoSuggestButton onClick={onAutoSuggest} />
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='h-8 w-8 cursor-pointer'>
                  <AvatarImage src='/avatars/01.png' alt='User' />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
