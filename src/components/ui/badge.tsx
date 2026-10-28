import * as React from 'react';
import { cn } from '@/lib/utils';
function Badge({className,...props}:React.HTMLAttributes<HTMLSpanElement>){return <span data-slot="badge" className={cn(
  'inline-flex min-h-6 items-center rounded-full border border-border bg-secondary/70',
  'px-2.5 py-0.5 text-[11px] font-semibold tracking-[.015em] text-secondary-foreground',
  'transition-colors duration-150',
  className
)} {...props}/>;}
export {Badge};
