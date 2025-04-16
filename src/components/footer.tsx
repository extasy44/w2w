import { MapPin, Mail, Phone, Link, Github, Twitter, Linkedin } from 'lucide-react';
const footerLinks = {
  platform: [
    { label: 'Features', href: '/features' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Templates', href: '/templates' },
  ],
  solutions: [
    { label: 'Enterprise', href: '/enterprise' },
    { label: 'Startups', href: '/startups' },
    { label: 'Agencies', href: '/agencies' },
    { label: 'Developers', href: '/developers' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className='bg-white border-t border-slate-200'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-slate-900'>Web2Web</h3>
            <div className='space-y-3'>
              <p className='text-slate-600 flex items-center gap-2'>
                <MapPin className='w-4 h-4' /> Melbourne, Australia
              </p>
              <p className='text-slate-600 flex items-center gap-2'>
                <Mail className='w-4 h-4' /> contact@web2web.ai
              </p>
              <p className='text-slate-600 flex items-center gap-2'>
                <Phone className='w-4 h-4' /> (555) 123-4567
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-slate-900'>Platform</h3>
            <ul className='space-y-2'>
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className='text-slate-600 hover:text-slate-900'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-slate-900'>Solutions</h3>
            <ul className='space-y-2'>
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className='text-slate-600 hover:text-slate-900'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-lg font-semibold mb-4 text-slate-900'>Company</h3>
            <ul className='space-y-2'>
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className='text-slate-600 hover:text-slate-900'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-slate-200'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-slate-600'>© 2024 Web2Web. All rights reserved.</p>
            <div className='flex space-x-4'>
              <Link href='#' className='text-slate-600 hover:text-slate-900'>
                <Github className='w-5 h-5' />
              </Link>
              <Link href='#' className='text-slate-600 hover:text-slate-900'>
                <Twitter className='w-5 h-5' />
              </Link>
              <Link href='#' className='text-slate-600 hover:text-slate-900'>
                <Linkedin className='w-5 h-5' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
