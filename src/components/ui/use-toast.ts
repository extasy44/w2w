'use client';

import * as React from 'react';
import { useToast as useToastPrimitive } from './use-toast-primitive';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const { toast: toastPrimitive, toasts } = useToastPrimitive();

  return {
    toast: (props: { title?: string; description?: string; variant?: 'default' | 'destructive' }) => {
      toastPrimitive({
        title: props.title,
        description: props.description,
        variant: props.variant,
      });
    },
    toasts,
  };
}
