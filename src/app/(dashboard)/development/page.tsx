import { DashboardHeader } from '@/components/layout/dashboard-header';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';

export default function DevelopmentPage() {
  return (
    <main className='flex-1 p-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Development</h1>
        <p className='mt-2 text-slate-600 dark:text-slate-400'>Manage your development tasks and track progress</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Development Tasks */}
        {[
          {
            title: 'Implement User Authentication',
            description: 'Set up Supabase auth with email/password and social providers',
            status: 'In Progress',
            priority: 'High',
            assignee: 'John Doe',
          },
          {
            title: 'Create Dashboard Layout',
            description: 'Design and implement the main dashboard layout',
            status: 'Completed',
            priority: 'Medium',
            assignee: 'Jane Smith',
          },
          {
            title: 'API Integration',
            description: 'Integrate with external APIs for data fetching',
            status: 'To Do',
            priority: 'High',
            assignee: 'Mike Johnson',
          },
          {
            title: 'Database Schema',
            description: 'Design and implement the database schema',
            status: 'In Progress',
            priority: 'High',
            assignee: 'Sarah Wilson',
          },
          {
            title: 'UI Components',
            description: 'Create reusable UI components library',
            status: 'In Progress',
            priority: 'Medium',
            assignee: 'Alex Brown',
          },
          {
            title: 'Testing Setup',
            description: 'Set up testing environment and write initial tests',
            status: 'To Do',
            priority: 'Low',
            assignee: 'Emily Davis',
          },
        ].map((task) => (
          <div
            key={task.title}
            className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950'>
            <div className='flex items-start justify-between'>
              <div>
                <h3 className='text-lg font-semibold'>{task.title}</h3>
                <p className='mt-2 text-sm text-slate-600 dark:text-slate-400'>{task.description}</p>
              </div>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  task.status === 'Completed'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : task.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                }`}>
                {task.status}
              </span>
            </div>
            <div className='mt-4 flex items-center justify-between text-sm'>
              <div>
                <span className='text-slate-600 dark:text-slate-400'>Priority:</span>
                <span
                  className={`ml-2 font-medium ${
                    task.priority === 'High'
                      ? 'text-red-600 dark:text-red-400'
                      : task.priority === 'Medium'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                  {task.priority}
                </span>
              </div>
              <div className='text-slate-600 dark:text-slate-400'>Assignee: {task.assignee}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
