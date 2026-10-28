import * as React from 'react';
import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  BookOpenText,
  RotateCcw,
  X,
  ChevronDown,
  FileSearch,
  Sparkles,
  Calendar,
  FileText,
  History,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  Users,
  User,
  HeartHandshake,
  FileCheck2,
  Filter,
  Stethoscope,
  Heart,
  Baby,
  Syringe,
  Ribbon,
  ShieldAlert,
  Brain,
  Smile,
  Eye,
  Droplets,
  HeartPulse,
  Accessibility,
  Siren,
  Microscope,
  Video,
  Megaphone,
  FileSpreadsheet
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterSelect } from '@/components/ui/filter-select';
import { normalizeTerm } from '@/lib/utils';

export type ManualCard = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  year?: number;
  category: string;
  program: string;
  course?: string;
  type: string;
  status: 'verificado' | 'pendiente';
  codes: string[];
  keywords: string[];
  featured: boolean;
};

const DEFAULTS = {
  category: 'Todas',
  program: 'Todos',
  course: 'Todos',
  year: 'Todos',
  type: 'Todos',
  status: 'Todos'
} as const;

type FilterKey = keyof typeof DEFAULTS;

const QUERY_KEYS: Record<FilterKey, string> = {
  category: 'categoria',
  program: 'programa',
  course: 'curso',
  year: 'ano',
  type: 'tipo',
  status: 'disponibilidad'
};

const LABELS: Record<FilterKey, string> = {
  category: 'Categoría',
  program: 'Programa / estrategia',
  course: 'Curso de vida',
  year: 'Año',
  type: 'Tipo de manual',
  status: 'Disponibilidad'
};

const FILTER_ICONS: Record<FilterKey, React.ReactNode> = {
  category: <Layers className="size-3.5 text-primary/70" />,
  program: <Activity className="size-3.5 text-primary/70" />,
  course: <Users className="size-3.5 text-primary/70" />,
  year: <Calendar className="size-3.5 text-primary/70" />,
  type: <FileText className="size-3.5 text-primary/70" />,
  status: <FileCheck2 className="size-3.5 text-primary/70" />
};

/** Devuelve icono y colores contextualmente asignados a cada estrategia o etapa de vida */
function getManualTheme(m: ManualCard) {
  const s = m.slug.toLowerCase();
  const c = (m.course || '').toLowerCase();

  if (s.includes('tuberculosis')) {
    return {
      icon: <Stethoscope className="size-5" aria-hidden="true" />,
      colors: 'bg-teal-500/12 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300'
    };
  }
  if (s.includes('materno')) {
    return {
      icon: <Heart className="size-5" aria-hidden="true" />,
      colors: 'bg-rose-500/12 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300'
    };
  }
  if (s.includes('nino') || c.includes('niño') || c.includes('nino')) {
    return {
      icon: <Baby className="size-5" aria-hidden="true" />,
      colors: 'bg-sky-500/12 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300'
    };
  }
  if (s.includes('adolescente') || c.includes('adolescente')) {
    return {
      icon: <Users className="size-5" aria-hidden="true" />,
      colors: 'bg-violet-500/12 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300'
    };
  }
  if (s.includes('adulto-mayor') || c.includes('mayor')) {
    return {
      icon: <HeartHandshake className="size-5" aria-hidden="true" />,
      colors: 'bg-amber-500/12 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300'
    };
  }
  if (s.includes('adulto') || c.includes('adulto')) {
    return {
      icon: <User className="size-5" aria-hidden="true" />,
      colors: 'bg-blue-500/12 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300'
    };
  }
  if (s.includes('inmunizaciones')) {
    return {
      icon: <Syringe className="size-5" aria-hidden="true" />,
      colors: 'bg-cyan-500/12 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300'
    };
  }
  if (s.includes('cancer')) {
    return {
      icon: <Ribbon className="size-5" aria-hidden="true" />,
      colors: 'bg-purple-500/12 text-purple-700 dark:bg-purple-400/15 dark:text-purple-300'
    };
  }
  if (s.includes('vih') || s.includes('its')) {
    return {
      icon: <ShieldAlert className="size-5" aria-hidden="true" />,
      colors: 'bg-red-500/12 text-red-700 dark:bg-red-400/15 dark:text-red-300'
    };
  }
  if (s.includes('salud-mental')) {
    return {
      icon: <Brain className="size-5" aria-hidden="true" />,
      colors: 'bg-fuchsia-500/12 text-fuchsia-700 dark:bg-fuchsia-400/15 dark:text-fuchsia-300'
    };
  }
  if (s.includes('salud-bucal')) {
    return {
      icon: <Smile className="size-5" aria-hidden="true" />,
      colors: 'bg-sky-500/12 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300'
    };
  }
  if (s.includes('salud-ocular')) {
    return {
      icon: <Eye className="size-5" aria-hidden="true" />,
      colors: 'bg-indigo-500/12 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300'
    };
  }
  if (s.includes('anemia')) {
    return {
      icon: <Droplets className="size-5" aria-hidden="true" />,
      colors: 'bg-rose-600/12 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300'
    };
  }
  if (s.includes('danos-no-transmisibles')) {
    return {
      icon: <HeartPulse className="size-5" aria-hidden="true" />,
      colors: 'bg-orange-500/12 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300'
    };
  }
  if (s.includes('discapacidad')) {
    return {
      icon: <Accessibility className="size-5" aria-hidden="true" />,
      colors: 'bg-blue-600/12 text-blue-800 dark:bg-blue-400/15 dark:text-blue-300'
    };
  }
  if (s.includes('emergencias')) {
    return {
      icon: <Siren className="size-5" aria-hidden="true" />,
      colors: 'bg-red-600/12 text-red-800 dark:bg-red-400/15 dark:text-red-300'
    };
  }
  if (s.includes('epidemiologia')) {
    return {
      icon: <Microscope className="size-5" aria-hidden="true" />,
      colors: 'bg-emerald-600/12 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300'
    };
  }
  if (s.includes('telemedicina')) {
    return {
      icon: <Video className="size-5" aria-hidden="true" />,
      colors: 'bg-teal-600/12 text-teal-800 dark:bg-teal-400/15 dark:text-teal-300'
    };
  }
  if (s.includes('planificacion')) {
    return {
      icon: <Sparkles className="size-5" aria-hidden="true" />,
      colors: 'bg-pink-500/12 text-pink-700 dark:bg-pink-400/15 dark:text-pink-300'
    };
  }
  if (s.includes('promocion')) {
    return {
      icon: <Megaphone className="size-5" aria-hidden="true" />,
      colors: 'bg-amber-600/12 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300'
    };
  }
  if (s.includes('guia-hoja-his')) {
    return {
      icon: <FileSpreadsheet className="size-5" aria-hidden="true" />,
      colors: 'bg-slate-500/12 text-slate-700 dark:bg-slate-400/15 dark:text-slate-300'
    };
  }

  // Fallback por categoría
  if (m.category === 'Curso de vida') {
    return {
      icon: <Users className="size-5" aria-hidden="true" />,
      colors: 'bg-sky-500/12 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300'
    };
  }
  if (m.category === 'Estrategias sanitarias') {
    return {
      icon: <Activity className="size-5" aria-hidden="true" />,
      colors: 'bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300'
    };
  }
  return {
    icon: <BookOpenText className="size-5" aria-hidden="true" />,
    colors: 'bg-accent text-accent-foreground'
  };
}

export default function CatalogExplorer({ manuals, base }: { manuals: ManualCard[]; base: string }) {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState<Record<FilterKey, string>>({ ...DEFAULTS });
  const [ready, setReady] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const deferredQuery = React.useDeferredValue(query);
  const searchRef = React.useRef<HTMLInputElement>(null);

  /* ── Opciones dinámicas de cada filtro ──────────────────────── */
  const options = React.useMemo(
    () => ({
      category: ['Todas', ...new Set(manuals.map(m => m.category))],
      program: ['Todos', ...new Set(manuals.map(m => m.program))].sort((a, b) =>
        a === 'Todos' ? -1 : b === 'Todos' ? 1 : a.localeCompare(b, 'es')
      ),
      course: ['Todos', ...new Set(manuals.map(m => m.course).filter((v): v is string => !!v))],
      year: ['Todos', ...new Set(manuals.map(m => String(m.year || '')).filter(Boolean))].sort((a, b) =>
        a === 'Todos' ? -1 : b === 'Todos' ? 1 : Number(b) - Number(a)
      ),
      type: ['Todos', ...new Set(manuals.map(m => m.type))],
      status: ['Todos', 'Con PDF oficial', 'Pendiente']
    }),
    [manuals]
  );
  const keys = Object.keys(DEFAULTS) as FilterKey[];

  /* ── Hidratar filtros desde URL ────────────────────────────── */
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
    setFilters(
      Object.fromEntries(
        keys.map(key => {
          const raw = params.get(QUERY_KEYS[key]);
          return [key, raw && options[key].includes(raw) ? raw : DEFAULTS[key]];
        })
      ) as Record<FilterKey, string>
    );
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Sincronizar URL con debounce ──────────────────────────── */
  React.useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete('q');
      keys.forEach(key => url.searchParams.delete(QUERY_KEYS[key]));
      if (query.trim()) url.searchParams.set('q', query.trim());
      keys.forEach(key => {
        if (filters[key] !== DEFAULTS[key]) url.searchParams.set(QUERY_KEYS[key], filters[key]);
      });
      window.history.replaceState(window.history.state, '', url.pathname + (url.search || '') + url.hash);
    }, 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, ready]);

  /* ── Índice de búsqueda y filtrado ─────────────────────────── */
  const index = React.useMemo(
    () =>
      manuals.map(m => ({
        manual: m,
        text: normalizeTerm(
          [m.title, m.description, m.category, m.program, m.course || '', m.shortTitle, ...m.keywords, ...m.codes].join(' ')
        )
      })),
    [manuals]
  );

  const visible = React.useMemo(() => {
    const needle = normalizeTerm(deferredQuery);
    return index
      .filter(({ manual: m, text }) => {
        const f = filters;
        return (
          text.includes(needle) &&
          (f.category === 'Todas' || m.category === f.category) &&
          (f.course === 'Todos' || m.course === f.course) &&
          (f.program === 'Todos' || m.program === f.program) &&
          (f.year === 'Todos' || String(m.year) === f.year) &&
          (f.type === 'Todos' || m.type === f.type) &&
          (f.status === 'Todos' || (f.status === 'Con PDF oficial' ? m.status === 'verificado' : m.status === 'pendiente'))
        );
      })
      .map(({ manual }) => manual)
      .sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.year || 0) - Number(a.year || 0) ||
          a.title.localeCompare(b.title, 'es')
      );
  }, [index, deferredQuery, filters]);

  const update = (key: FilterKey, value: string) => setFilters(prev => ({ ...prev, [key]: value }));
  const active = keys.filter(key => filters[key] !== DEFAULTS[key]);
  const hasActiveFilters = active.length > 0 || query.trim().length > 0;
  const reset = () => {
    setQuery('');
    setFilters({ ...DEFAULTS });
    searchRef.current?.focus();
  };
  const clearSearch = () => {
    setQuery('');
    searchRef.current?.focus();
  };

  /* ────────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* ═══ PANEL DE BÚSQUEDA Y FILTROS ═══ */}
      <section aria-label="Buscador y filtros" className="catalog-filter-panel surface-panel theme-surface overflow-hidden">
        {/* Cabecera del panel */}
        <div className="border-b border-border/60 bg-muted/30 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2.5 text-[15px] font-bold tracking-tight">
              <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Search className="size-4" aria-hidden="true" />
              </span>
              Encuentra tu manual
            </h2>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.08em] text-muted-foreground">
              <Activity className="size-3.5 text-primary/70" aria-hidden="true" />
              Búsqueda por tema, programa o código HIS
            </span>
          </div>
        </div>

        {/* Buscador */}
        <div className="px-5 pt-5 sm:px-7 sm:pt-6">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground/70"
            />
            <Input
              ref={searchRef}
              type="search"
              aria-label="Buscar manual, tema o código HIS"
              placeholder="Buscar por nombre, programa, código HIS (ej: tuberculosis, A150)…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="h-[3.25rem] w-full rounded-xl bg-background pl-12 pr-12 text-[15px] sm:h-14 sm:text-base"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Borrar búsqueda"
                title="Borrar búsqueda"
                className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Toggle filtros (móvil) */}
        <div className="px-5 sm:px-7">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="catalog-filters"
            onClick={() => setMobileOpen(v => !v)}
            className="mt-4 flex min-h-11 w-full items-center justify-between rounded-xl border border-border bg-secondary/60 px-4 text-sm font-semibold text-secondary-foreground transition-colors duration-150 hover:bg-surface-hover md:hidden"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-primary" />
              Filtros avanzados
              {active.length > 0 && (
                <Badge className="border-primary/30 bg-primary/12 font-bold tabular-nums text-primary">
                  {active.length}
                </Badge>
              )}
            </span>
            <ChevronDown className={`size-4 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Grid de filtros */}
        <div
          id="catalog-filters"
          className={`${mobileOpen ? 'grid' : 'hidden'} gap-x-5 gap-y-4 px-5 pt-5 sm:grid-cols-2 sm:px-7 md:grid lg:grid-cols-3`}
        >
          {keys.map(key => (
            <FilterSelect
              key={key}
              label={LABELS[key]}
              icon={FILTER_ICONS[key]}
              options={options[key]}
              value={filters[key]}
              onValueChange={value => update(key, value)}
            />
          ))}
        </div>

        {/* Barra de resultados y limpiar */}
        <div className="mt-5 border-t border-border/60 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status" aria-live="polite" aria-atomic="true">
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
              <span>
                Mostrando <strong className="font-bold text-foreground tabular-nums">{visible.length}</strong> de{' '}
                <strong className="font-bold text-foreground tabular-nums">{manuals.length}</strong> manuales
              </span>
            </p>
            <Button variant="outline" size="sm" onClick={reset} disabled={!hasActiveFilters} className="gap-2">
              <RotateCcw className="size-3.5" />
              Limpiar filtros
            </Button>
          </div>

          {/* Chips de filtros activos */}
          {active.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtros activos">
              {active.map(key => (
                <button
                  type="button"
                  key={key}
                  onClick={() => update(key, DEFAULTS[key])}
                  className="group/chip inline-flex min-h-8 items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary transition-all duration-150 hover:border-primary/50 hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-label={`Quitar filtro ${LABELS[key]}: ${filters[key]}`}
                >
                  <Filter className="size-3 shrink-0 opacity-70" aria-hidden="true" />
                  <span className="max-w-52 truncate">
                    {LABELS[key]}: {filters[key]}
                  </span>
                  <X className="size-3 opacity-60 transition-opacity group-hover/chip:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ RESULTADOS ═══ */}
      {visible.length === 0 ? (
        <div
          className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center sm:px-10 sm:py-20"
          role="status"
        >
          <div className="grid size-16 place-items-center rounded-2xl bg-muted/60 text-muted-foreground">
            <FileSearch className="size-8" aria-hidden="true" />
          </div>
          <h3 className="mt-6 text-xl font-bold tracking-tight">No se encontraron manuales</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Intenta otra palabra clave o restablece los filtros para explorar todos los documentos disponibles.
          </p>
          <Button variant="outline" className="mt-7 gap-2" onClick={reset}>
            <RotateCcw className="size-4" />
            Restablecer búsqueda
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Resultados de manuales">
          {visible.map(m => {
            const theme = getManualTheme(m);
            return (
              <Card key={m.slug} className="interactive-card group flex h-full flex-col overflow-hidden">
                {/* Cabecera de card con icono temático */}
                <div className="flex items-start justify-between gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-105 ${theme.colors}`}
                  >
                    {theme.icon}
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge className="tabular-nums">
                      <Calendar className="mr-1 size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                      {m.year ?? 'Año por validar'}
                    </Badge>
                    {m.featured && (
                      <Badge className="border-primary/25 bg-primary/10 text-primary">
                        <Sparkles className="mr-1 size-3 shrink-0" aria-hidden="true" />
                        Destacado
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-1 flex-col p-5 pt-4 sm:p-6 sm:pt-4">
                  <div className="flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[.12em] text-primary/80">
                    <Layers className="size-3 shrink-0" aria-hidden="true" />
                    <span>{m.category}</span>
                  </div>
                  <h3 className="mt-1.5 text-[17px] font-bold leading-snug tracking-tight text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted-foreground line-clamp-3">
                    {m.description}
                  </p>

                  {/* Badges de estado con iconos semánticos */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <Badge>
                      <FileText className="mr-1 size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                      {m.type}
                    </Badge>
                    {m.year && m.year < 2023 && (
                      <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        <History className="mr-1 size-3 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                        Edición histórica
                      </Badge>
                    )}
                    <Badge
                      className={
                        m.status === 'verificado'
                          ? 'border-success/35 bg-success/10 text-success'
                          : 'border-warning/35 bg-warning/10 text-warning'
                      }
                    >
                      {m.status === 'verificado' ? (
                        <>
                          <CheckCircle2 className="mr-1 size-3 shrink-0" aria-hidden="true" />
                          PDF identificado
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1 size-3 shrink-0" aria-hidden="true" />
                          En validación
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                {/* Footer / CTA */}
                <a
                  href={`${base}manuales/${m.slug}/`}
                  className="ui-link mx-5 mb-5 flex min-h-11 items-center justify-between gap-2 rounded-xl border border-border bg-muted/40 px-4 text-sm font-bold text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:mx-6 sm:mb-6"
                  aria-label={`Consultar manual ${m.title}`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpenText className="size-4 shrink-0" aria-hidden="true" />
                    Consultar ficha
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
