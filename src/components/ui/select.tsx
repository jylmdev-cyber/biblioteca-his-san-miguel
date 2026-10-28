import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/* Select accesible estilo shadcn/ui, adaptado a Tailwind 4 y tokens OKLCH.
   Radix proporciona teclado, typeahead, focus management, escape y portal.
   v2 – Mejoras de contraste en modo oscuro, micro-interacciones y UX móvil. */
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
function SelectValue({className,...props}:React.ComponentPropsWithRef<typeof SelectPrimitive.Value>){
  return <SelectPrimitive.Value data-slot="select-value" className={cn('min-w-0 flex-1 truncate',className)} {...props}/>;
}

function SelectTrigger({className, children, ...props}: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>) {
  return <SelectPrimitive.Trigger
    data-slot="select-trigger"
    className={cn(
      'group flex h-12 min-w-0 w-full cursor-pointer items-center justify-between gap-3',
      'rounded-xl border border-input bg-card px-4 py-2.5 text-left text-[14px] font-medium',
      'text-foreground outline-none',
      /* Sombra sutil + transición suave */
      'shadow-[0_1px_3px_0_var(--shadow-tint)]',
      'transition-all duration-200 ease-out',
      /* Hover: borde más visible + fondo elevado */
      'hover:border-primary/55 hover:bg-surface-hover hover:shadow-[0_2px_8px_-3px_var(--shadow-tint)]',
      /* Focus: anillo prominente */
      'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30',
      /* Disabled */
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      /* Placeholder text */
      'data-[placeholder]:text-muted-foreground',
      /* Truncar texto interno */
      '[&_[data-slot=select-value]]:truncate',
      className
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        aria-hidden="true"
        className="size-[17px] shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>;
}
function SelectScrollUpButton({className,...props}:React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>){
  return <SelectPrimitive.ScrollUpButton className={cn('flex h-7 cursor-default items-center justify-center text-primary',className)} {...props}><ChevronUp className="size-4"/></SelectPrimitive.ScrollUpButton>;
}
function SelectScrollDownButton({className,...props}:React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>){
  return <SelectPrimitive.ScrollDownButton className={cn('flex h-7 cursor-default items-center justify-center text-primary',className)} {...props}><ChevronDown className="size-4"/></SelectPrimitive.ScrollDownButton>;
}
function SelectContent({className, children, position='popper', sideOffset=7, ...props}: React.ComponentPropsWithRef<typeof SelectPrimitive.Content>) {
  return <SelectPrimitive.Portal>
    <SelectPrimitive.Content data-slot="select-content" position={position} sideOffset={sideOffset}
      className={cn(
        'z-[85] max-h-[min(22rem,var(--radix-select-content-available-height))]',
        'min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1.5rem)]',
        'overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground',
        'outline-none will-change-[opacity,transform]',
        /* Sombra más profunda para flotabilidad visual */
        'shadow-[0_20px_60px_-18px_var(--shadow-tint),0_6px_18px_-8px_var(--shadow-tint)]',
        className
      )}
      {...props}>
      <SelectScrollUpButton/>
      <SelectPrimitive.Viewport className="max-h-[min(19rem,55dvh)] scroll-py-1 overflow-y-auto overscroll-contain p-1.5">
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton/>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>;
}
function SelectItem({className, children, ...props}: React.ComponentPropsWithRef<typeof SelectPrimitive.Item>) {
  return <SelectPrimitive.Item data-slot="select-item"
    className={cn(
      'relative flex min-h-11 w-full cursor-pointer select-none items-center',
      'rounded-lg py-2.5 pl-9 pr-3 text-[14px] leading-snug text-popover-foreground',
      'outline-none transition-colors duration-100',
      /* Disabled */
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
      /* Selected item: primary tint background */
      'data-[state=checked]:bg-primary/12 data-[state=checked]:text-foreground data-[state=checked]:font-semibold',
      /* Highlighted (keyboard/hover) */
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      className
    )}
    {...props}>
    <span className="absolute left-3 flex size-4 items-center justify-center text-primary">
      <SelectPrimitive.ItemIndicator><Check className="size-4" aria-hidden="true"/></SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>;
}
function SelectLabel({className,...props}:React.ComponentPropsWithRef<typeof SelectPrimitive.Label>){return <SelectPrimitive.Label className={cn('px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground',className)} {...props}/>;}
function SelectSeparator({className,...props}:React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>){return <SelectPrimitive.Separator className={cn('-mx-0.5 my-1 h-px bg-border',className)} {...props}/>;}
export {Select,SelectGroup,SelectValue,SelectTrigger,SelectContent,SelectItem,SelectLabel,SelectSeparator};
