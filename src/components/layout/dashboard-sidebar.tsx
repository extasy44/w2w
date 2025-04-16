'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Rocket, Code2, Boxes, TestTube2, Settings, Server, Shield, HelpCircle } from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: Rocket,
  },
  {
    name: 'Development',
    href: '/development',
    icon: Code2,
  },
  {
    name: 'Components',
    href: '/components',
    icon: Boxes,
  },
  {
    name: 'Testing',
    href: '/testing',
    icon: TestTube2,
  },
  {
    name: 'Deployment',
    href: '/deployment',
    icon: Server,
  },
];

const bottomNavigation = [
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    name: 'Security',
    href: '/security',
    icon: Shield,
  },
  {
    name: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className='flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'>
      <div className='flex-1 overflow-y-auto p-4'>
        <nav className='flex flex-1 flex-col gap-1'>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
                )}>
                <item.icon className='h-5 w-5' />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className='border-t border-slate-200 p-4 dark:border-slate-800'>
        <nav className='flex flex-col gap-1'>
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
                )}>
                <item.icon className='h-5 w-5' />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
