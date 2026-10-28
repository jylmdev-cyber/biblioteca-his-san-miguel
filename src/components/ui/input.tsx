import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type = 'text', ...props }, ref) {
    return (
      <input
        ref={ref}
        data-slot="input"
        type={type}
        className={cn(
          'flex h-12 w-full min-w-0 rounded-xl border border-input bg-card px-4 py-2.5',
          'text-[15px] text-foreground',
          'shadow-[0_1px_3px_0_var(--shadow-tint)]',
          'outline-none transition-all duration-200 ease-out',
          'placeholder:text-muted-foreground/80',
          'hover:border-primary/55 hover:shadow-[0_2px_8px_-3px_var(--shadow-tint)]',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
