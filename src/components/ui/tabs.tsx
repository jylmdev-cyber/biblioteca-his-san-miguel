import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
const Tabs = TabsPrimitive.Root;
function TabsList({className,...props}:React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>){return <TabsPrimitive.List className={cn('flex min-h-12 w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-secondary/70 p-1.5',className)} {...props}/>;}
function TabsTrigger({className,...props}:React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>){return <TabsPrimitive.Trigger className={cn('inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground outline-none transition-[background-color,color,box-shadow] duration-150 hover:bg-accent/70 hover:text-foreground data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 sm:text-sm',className)} {...props}/>;}
function TabsContent({className,...props}:React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>){return <TabsPrimitive.Content className={cn('focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',className)} {...props}/>;}
export {Tabs,TabsList,TabsTrigger,TabsContent};
