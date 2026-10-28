import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
const Accordion = AccordionPrimitive.Root;
function AccordionItem({className,...props}:React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>){return <AccordionPrimitive.Item className={cn('border-b border-border/85 last:border-b-0',className)} {...props}/>;}
function AccordionTrigger({className,children,...props}:React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>){return <AccordionPrimitive.Header className="flex"><AccordionPrimitive.Trigger className={cn('group flex min-h-14 flex-1 cursor-pointer items-center justify-between gap-3 rounded-lg py-4 text-left text-sm font-semibold leading-6 text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:text-primary',className)} {...props}>{children}<ChevronDown className="size-[18px] shrink-0 text-muted-foreground transition-transform duration-200" aria-hidden="true"/></AccordionPrimitive.Trigger></AccordionPrimitive.Header>;}
function AccordionContent({className,children,...props}:React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>){return <AccordionPrimitive.Content data-slot="accordion-content" className="overflow-hidden" {...props}><div className={cn('pb-5',className)}>{children}</div></AccordionPrimitive.Content>;}
export {Accordion,AccordionItem,AccordionTrigger,AccordionContent};
