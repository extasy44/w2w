'use client';

import { Card } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

export function CardContainer({ children, className = '' }: CardContainerProps) {
  return (
    <Card className={`p-6 transition-all duration-200 hover:shadow-lg bg-card border border-border/40 hover:border-border/80 ${className}`}>
      {children}
    </Card>
  );
}
