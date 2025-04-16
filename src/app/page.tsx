import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';
import { Code2, Zap, Sparkles, Phone, Mail, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import { Header } from '@/components/header';

const features = [
  {
    title: 'AI-Powered Development',
    description: 'Transform your ideas into production-ready web applications with our advanced AI development pipeline.',
    icon: <Code2 className='w-8 h-8' />,
  },
  {
    title: 'Rapid Deployment',
    description: 'Launch your web applications faster with automated code generation and intelligent architecture decisions.',
    icon: <Zap className='w-8 h-8' />,
  },
  {
    title: 'Enterprise Quality',
    description: 'Generate production-grade code that follows industry best practices and modern development standards.',
    icon: <Sparkles className='w-8 h-8' />,
  },
];

const stats = [
  { value: '80%', label: 'Development Time Saved' },
  { value: '99%', label: 'Code Quality Score' },
  { value: '1000+', label: 'Apps Generated' },
  { value: '24/7', label: 'AI Support' },
];

const blogPosts = [
  {
    title: 'The Future of Web Development with AI',
    description: 'Discover how Web2Web is revolutionizing web application development through AI-powered automation.',
    image: '/blog/experience.jpg',
  },
  {
    title: 'From Concept to Production in Hours',
    description: 'Learn how businesses are launching web applications faster than ever with AI assistance.',
    image: '/blog/help.jpg',
  },
  {
    title: 'Enterprise-Grade Applications, Automated',
    description: 'See how our AI ensures your web applications meet the highest standards of quality and performance.',
    image: '/blog/work.jpg',
  },
];

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
      {/* Hero Section */}
      <section className='bg-gradient-to-b from-slate-50 to-white pt-24'>
        <div className='container mx-auto px-4 py-24'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700'>
              Build Web Apps Faster with AI
            </h1>
            <p className='text-xl mb-8 text-slate-600 max-w-2xl mx-auto'>
              Web2Web transforms your ideas into production-ready web applications using advanced AI technology. Build enterprise-grade
              applications in a fraction of the time.
            </p>
            <div className='flex gap-4 justify-center'>
              <Link href='/project-wizard'>
                <Button size='4' className='bg-slate-900 text-white hover:bg-slate-800'>
                  Start Building
                </Button>
              </Link>
              <Link href='/docs'>
                <Button size='4' variant='outline' className='hover:bg-slate-50'>
                  View Documentation
                </Button>
              </Link>
            </div>
            {/* Hero Image */}
            <div className='mt-16 relative h-[480px] rounded-xl overflow-hidden shadow-2xl'>
              <Image src='/hero-dashboard.svg' alt='Web2Web Dashboard' fill className='object-contain' priority />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className='bg-white py-24'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4 text-slate-900'>Accelerate Your Development</h2>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              Our AI-powered platform streamlines web application development, enabling teams to build faster while maintaining enterprise
              standards.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div key={feature.title} className='p-8 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors'>
                <div className='mb-4 text-slate-900'>{feature.icon}</div>
                <h3 className='text-xl font-semibold mb-3 text-slate-900'>{feature.title}</h3>
                <p className='text-slate-600 mb-6'>{feature.description}</p>
                <div className='relative h-48 rounded-lg overflow-hidden'>
                  <Image src={`/feature-${index + 1}.svg`} alt={feature.title} fill className='object-contain' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-24 bg-slate-900 text-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-4xl font-bold mb-2'>{stat.value}</div>
                <div className='text-slate-300'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className='bg-slate-50 py-24'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4 text-slate-900'>Latest Insights</h2>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              Discover how AI is transforming web development and learn about the latest features and best practices.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {blogPosts.map((post) => (
              <div key={post.title} className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <div className='relative h-48'>
                  <Image src={post.image} alt={post.title} fill className='object-cover' />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-3 text-slate-900'>{post.title}</h3>
                  <p className='text-slate-600 mb-4'>{post.description}</p>
                  <Button variant='ghost' size='2' className='text-slate-900 hover:text-slate-700'>
                    Read Article
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-slate-900 text-white py-24'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-6'>Ready to Transform Your Development Process?</h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto text-slate-300'>
            Join thousands of developers who are building better web applications faster with Web2Web.
          </p>
          <Link href='/project-wizard'>
            <Button size='4' className='bg-white text-slate-900 hover:bg-slate-100'>
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
