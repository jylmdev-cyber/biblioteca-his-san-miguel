import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-[-.01em] transition-[background-color,color,box-shadow,border-color,transform] duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-45', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground shadow-[0_2px_9px_-4px_var(--shadow-tint)] hover:brightness-105 hover:shadow-md',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-surface-hover',
      outline: 'border border-border bg-card text-foreground hover:border-primary/40 hover:bg-surface-hover',
      ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: { default: 'min-h-11 px-4 py-2.5', sm: 'min-h-10 px-3', lg: 'min-h-12 px-6', icon: 'size-11' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
function Button({ className, variant, size, type='button', ...props }: ButtonProps) {return <button type={type} data-slot="button" className={cn(buttonVariants({variant,size}),className)} {...props}/>;}
export { Button, buttonVariants };
