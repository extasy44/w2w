'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
}

interface NavigationGroups {
  product: NavigationItem[];
  solutions: NavigationItem[];
  resources: NavigationItem[];
}

const navigation: NavigationGroups = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Templates', href: '/templates' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Pricing', href: '/pricing' },
  ],
  solutions: [
    { name: 'Startups', href: '/solutions/startups' },
    { name: 'Enterprise', href: '/solutions/enterprise' },
    { name: 'Agencies', href: '/solutions/agencies' },
    { name: 'E-commerce', href: '/solutions/ecommerce' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Guides', href: '/guides' },
    { name: 'Blog', href: '/blog' },
  ],
};

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200'>
      <nav className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/'>
            <div className='flex items-center gap-2'>
              <Image src='/logo.svg' alt='Web2Web Logo' width={32} height={32} className='w-8 h-8' />
              <span className='text-xl font-semibold text-slate-900'>Web2Web</span>
            </div>
          </Link>

          {/* Center Navigation */}
          <div className='hidden lg:flex items-center justify-center flex-1 gap-8'>
            {/* Product Dropdown */}
            <div className='relative group'>
              <button className='flex items-center gap-1 text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium'>
                Product
                <ChevronDown className='w-4 h-4' />
              </button>
              <div className='absolute top-full left-0 w-48 p-2 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                {navigation.product.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md'>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className='relative group'>
              <button className='flex items-center gap-1 text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium'>
                Solutions
                <ChevronDown className='w-4 h-4' />
              </button>
              <div className='absolute top-full left-0 w-48 p-2 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md'>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className='relative group'>
              <button className='flex items-center gap-1 text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium'>
                Resources
                <ChevronDown className='w-4 h-4' />
              </button>
              <div className='absolute top-full left-0 w-48 p-2 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                {navigation.resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md'>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href='/pricing' className='text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium'>
              Pricing
            </Link>
          </div>

          {/* Right Buttons */}
          <div className='flex items-center gap-4'>
            <Link href='/login'>
              <Button variant='ghost' size='2' className='text-slate-600 hover:text-slate-900'>
                Log in
              </Button>
            </Link>
            <Link href='/project-wizard'>
              <Button size='2' className='bg-slate-900 text-white hover:bg-slate-800'>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
