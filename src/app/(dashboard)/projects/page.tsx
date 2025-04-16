import { DashboardHeader } from '@/components/layout/dashboard-header';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';

export default function ProjectsPage() {
  return (
    <main className='flex-1 p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <button className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'>
          New Project
        </button>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Project Cards */}
        {[
          {
            name: 'E-commerce Platform',
            description: 'A modern e-commerce platform with AI-powered recommendations',
            status: 'In Progress',
            progress: 65,
          },
          {
            name: 'Portfolio Website',
            description: 'Personal portfolio website with interactive elements',
            status: 'Completed',
            progress: 100,
          },
          {
            name: 'Task Management App',
            description: 'AI-assisted task management application',
            status: 'Planning',
            progress: 20,
          },
          {
            name: 'Social Media Dashboard',
            description: 'Analytics dashboard for social media platforms',
            status: 'In Progress',
            progress: 45,
          },
          {
            name: 'Weather Application',
            description: 'Real-time weather forecasting app',
            status: 'Testing',
            progress: 80,
          },
          {
            name: 'Recipe Finder',
            description: 'AI-powered recipe recommendation system',
            status: 'Planning',
            progress: 10,
          },
        ].map((project) => (
          <div
            key={project.name}
            className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950'>
            <h3 className='text-lg font-semibold'>{project.name}</h3>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-400'>{project.description}</p>
            <div className='mt-4'>
              <div className='mb-2 flex items-center justify-between text-sm'>
                <span className='text-slate-600 dark:text-slate-400'>{project.status}</span>
                <span className='font-medium'>{project.progress}%</span>
              </div>
              <div className='h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800'>
                <div className='h-full bg-blue-600 dark:bg-blue-500' style={{ width: `${project.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
