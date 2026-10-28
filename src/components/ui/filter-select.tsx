import * as React from 'react';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from './select';

type FilterSelectProps = {
  label: string;
  value: string;
  options: readonly string[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
};

/** Único punto de entrada de filtros: misma interacción, estilo e iconografía para todo el sitio. */
export function FilterSelect({
  label,
  value,
  options,
  onValueChange,
  placeholder,
  icon,
  className = ''
}: FilterSelectProps) {
  const id = React.useId();
  return (
    <div className={`min-w-0 space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-muted-foreground"
      >
        {icon && <span className="shrink-0 text-muted-foreground/80" aria-hidden="true">{icon}</span>}
        <span>{label}</span>
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} aria-label={label}>
          <SelectValue placeholder={placeholder || `Seleccionar ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent align="start" collisionPadding={12}>
          {options.length ? (
            options.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-muted-foreground">
              No hay opciones disponibles.
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
