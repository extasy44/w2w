import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Toaster } from '@/components/ui/toast';
import { Footer } from '@/components/footer';
import { AutoSuggestProvider } from '@/contexts/auto-suggest-context';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Central Business Agency - AI-Powered Project Planning',
  description: 'Transform your business ideas into reality with our AI-powered project planning and development platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <AutoSuggestProvider>
            <Theme accentColor='amber' grayColor='sand' radius='medium' scaling='95%'>
              {children}
              <Footer />
              <Toaster />
            </Theme>
          </AutoSuggestProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
