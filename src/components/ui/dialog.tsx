import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
const Dialog=DialogPrimitive.Root;
const DialogTrigger=DialogPrimitive.Trigger;
const DialogTitle=DialogPrimitive.Title;
const DialogDescription=DialogPrimitive.Description;
function DialogContent({className,children,...props}:React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>){return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-[oklch(0.10_0.025_235/0.72)] backdrop-blur-[5px] data-[state=open]:animate-[select-in_.16s_ease-out]"/><DialogPrimitive.Content className={cn('fixed left-1/2 top-1/2 z-[91] max-h-[min(85dvh,720px)] w-[calc(100vw-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-2xl focus-visible:outline-2 focus-visible:outline-ring sm:p-7',className)} {...props}>{children}<DialogPrimitive.Close aria-label="Cerrar cuadro de diálogo" className="absolute right-4 top-4 grid size-10 cursor-pointer place-items-center rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"><X className="size-4"/></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>;}
export {Dialog,DialogTrigger,DialogTitle,DialogDescription,DialogContent};
