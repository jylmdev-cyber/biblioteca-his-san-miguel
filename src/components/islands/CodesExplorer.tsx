import * as React from 'react';
import { Search, Copy, Check, BookOpenText, X, Hash, Layers, FileSearch, ExternalLink } from 'lucide-react';
import type { CodeEntry } from '@/data/codes';
import { normalizeTerm } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FilterSelect } from '@/components/ui/filter-select';

export default function CodesExplorer({
  items,
  base,
  refs
}: {
  items: CodeEntry[];
  base: string;
  refs: Record<string, string>;
}) {
  const [q, setQ] = React.useState('');
  const [family, setFamily] = React.useState('Todos');
  const [copied, setCopied] = React.useState('');
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const visible = React.useMemo(
    () =>
      items.filter(
        c =>
          (family === 'Todos' || c.family === family) &&
          normalizeTerm(`${c.code} ${c.label} ${c.manual}`).includes(normalizeTerm(q))
      ),
    [items, q, family]
  );

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(''), 1700);
    } catch {
      setCopied('');
    }
  }

  return (
    <section aria-label="Índice de códigos HIS">
      <div className="surface-panel theme-surface grid gap-4 p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
        <div className="space-y-2">
          <label htmlFor="code-search" className="flex items-center gap-1.5 text-xs font-semibold text-foreground/85">
            <Hash className="size-3.5 text-primary/70" aria-hidden="true" />
            <span>Buscar código o procedimiento</span>
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="code-search"
              type="search"
              className="h-12 pl-11 pr-11"
              placeholder="Ej.: 99214, consejería, TB…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            {q && (
              <button
                onClick={() => setQ('')}
                aria-label="Limpiar búsqueda de códigos"
                type="button"
                className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
        <FilterSelect
          label="Familia de códigos"
          icon={<Layers className="size-3.5 text-primary/70" aria-hidden="true" />}
          value={family}
          onValueChange={setFamily}
          options={['Todos', 'CIE-10', 'CPMS']}
        />
      </div>

      <p className="my-5 flex items-center gap-2 text-sm text-muted-foreground" role="status" aria-live="polite">
        <span className="size-2 rounded-full bg-primary/60" aria-hidden="true"></span>
        <span>{visible.length} coincidencias · Selección editorial no exhaustiva</span>
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {visible.map((c, i) => (
          <article
            key={`${c.code}-${i}`}
            className="interactive-card flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <code className="font-mono text-base font-extrabold text-primary">{c.code}</code>
                <Badge>{c.family}</Badge>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6">{c.label}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  className="ui-link inline-flex items-center gap-1.5 text-xs text-muted-foreground underline"
                  href={`${base}manuales/${c.manual}/`}
                >
                  <BookOpenText className="size-3.5 text-primary/70" aria-hidden="true" />
                  <span>Manual · p. {c.page}</span>
                </a>
                {refs[c.manual] && (
                  <a
                    href={`${refs[c.manual]}#page=${c.page}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-link inline-flex items-center gap-1 text-xs font-semibold text-primary underline"
                  >
                    <span>PDF original p. {c.page}</span>
                    <ExternalLink className="size-3 opacity-70" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
            <button
              type="button"
              className="ui-action grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background text-muted-foreground hover:bg-accent hover:text-primary"
              onClick={() => void copy(c.code)}
              title={`Copiar ${c.code}`}
              aria-label={`Copiar código ${c.code}`}
            >
              <span className="sr-only" role="status">
                {copied === c.code ? 'Copiado' : ''}
              </span>
              {copied === c.code ? <Check className="size-4.5 text-success" /> : <Copy className="size-4.5" />}
            </button>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          <FileSearch className="size-8 mx-auto mb-3 opacity-50" aria-hidden="true" />
          <p className="font-semibold text-foreground">No se encontraron códigos.</p>
          <p className="mt-1">Prueba con otro término o selecciona otra familia de códigos.</p>
        </div>
      )}
    </section>
  );
}
