'use client';

import { Button } from '@radix-ui/themes';
import { ComponentProps } from 'react';

interface InteractiveButtonProps extends ComponentProps<typeof Button> {
  className?: string;
}

export function InteractiveButton({ children, className = '', ...props }: InteractiveButtonProps) {
  return (
    <Button {...props} className={`transition-all duration-200 hover:scale-102 active:scale-98 ${className}`}>
      {children}
    </Button>
  );
}
