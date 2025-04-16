'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, Text } from '@radix-ui/themes';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <Card className={`p-4 bg-muted/50 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Text size='6' weight='bold' className='mb-4'>
              {children}
            </Text>
          ),
          h2: ({ children }) => (
            <Text size='5' weight='bold' className='mb-3 mt-6'>
              {children}
            </Text>
          ),
          h3: ({ children }) => (
            <Text size='4' weight='bold' className='mb-2 mt-4'>
              {children}
            </Text>
          ),
          p: ({ children }) => (
            <Text size='2' className='mb-3'>
              {children}
            </Text>
          ),
          ul: ({ children }) => <ul className='list-disc pl-6 mb-4 space-y-1'>{children}</ul>,
          ol: ({ children }) => <ol className='list-decimal pl-6 mb-4 space-y-1'>{children}</ol>,
          li: ({ children }) => (
            <li>
              <Text size='2'>{children}</Text>
            </li>
          ),
          code: ({ children }) => <code className='bg-muted px-1.5 py-0.5 rounded text-sm font-mono'>{children}</code>,
          pre: ({ children }) => <pre className='bg-muted p-3 rounded-lg overflow-x-auto mb-4'>{children}</pre>,
          blockquote: ({ children }) => <blockquote className='border-l-4 border-primary pl-4 italic my-4'>{children}</blockquote>,
        }}>
        {content}
      </ReactMarkdown>
    </Card>
  );
}
