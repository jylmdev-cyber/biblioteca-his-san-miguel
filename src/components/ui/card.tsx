import * as React from 'react';
import { cn } from '@/lib/utils';
function Card({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div data-slot="card" className={cn(
  'theme-surface rounded-2xl border border-border bg-card text-card-foreground',
  'shadow-[0_4px_20px_-14px_var(--shadow-tint)]',
  className
)} {...props}/>;}
function CardHeader({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('flex flex-col gap-1 p-6',className)} {...props}/>;}
function CardTitle({className,...props}:React.HTMLAttributes<HTMLHeadingElement>){return <h3 className={cn('text-lg font-bold tracking-tight',className)} {...props}/>;}
function CardDescription({className,...props}:React.HTMLAttributes<HTMLParagraphElement>){return <p className={cn('text-sm leading-7 text-muted-foreground',className)} {...props}/>;}
function CardContent({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('p-6 pt-0',className)} {...props}/>;}
export {Card,CardHeader,CardTitle,CardDescription,CardContent};
