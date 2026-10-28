import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  BookOpenText,
  ClipboardCheck,
  ListChecks,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  ExternalLink,
  Info
} from 'lucide-react';
import type { CodeEntry } from '@/data/codes';

const issues = [
  {
    title: 'Tipo de diagnóstico incorrecto',
    icon: <AlertTriangle className="size-4 text-amber-500 shrink-0" aria-hidden="true" />,
    detail: 'Distinguir presuntivo (P), definitivo (D) y repetido (R). La asignación depende del diagnóstico o actividad y del documento aplicable.'
  },
  {
    title: 'LAB incompleto o fuera de posición',
    icon: <Info className="size-4 text-sky-500 shrink-0" aria-hidden="true" />,
    detail: 'Revisar los casilleros LAB 1, 2 y 3 según las indicaciones del procedimiento específico. No generalizar un LAB de otro programa.'
  },
  {
    title: 'Códigos de una edición anterior',
    icon: <AlertTriangle className="size-4 text-rose-500 shrink-0" aria-hidden="true" />,
    detail: 'Antes de corregir o validar, cotejar la edición y fuente oficial del manual usado. Esta biblioteca puede incluir documentos históricos.'
  },
];

export default function ManualToolkit({
  tips,
  codes,
  pdf,
  base
}: {
  tips: string[];
  codes: CodeEntry[];
  pdf?: string;
  base: string;
}) {
  return (
    <Tabs defaultValue="digitacion" className="w-full">
      <TabsList aria-label="Herramientas del manual" className="mb-4 justify-start">
        <TabsTrigger value="digitacion" className="gap-1.5">
          <ClipboardCheck className="size-4" aria-hidden="true" />
          <span>Digitación</span>
        </TabsTrigger>
        <TabsTrigger value="errores" className="gap-1.5">
          <ListChecks className="size-4" aria-hidden="true" />
          <span>Calidad</span>
        </TabsTrigger>
        <TabsTrigger value="codigos" className="gap-1.5">
          <BookOpenText className="size-4" aria-hidden="true" />
          <span>Códigos ({codes.length})</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="digitacion" className="surface-panel p-5 sm:p-7">
        <h3 className="flex items-center gap-2 text-base font-bold tracking-tight">
          <ClipboardCheck className="size-4.5 text-primary" aria-hidden="true" />
          <span>Antes de ingresar la información</span>
        </h3>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
          {tips.map(t => (
            <li key={t} className="flex items-start gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-1 size-[17px] shrink-0 text-success" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <a
          className="ui-link mt-6 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-primary underline"
          href={`${base}puntos-digitacion/`}
        >
          <span>Ver checklist para puntos de digitación</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </TabsContent>

      <TabsContent value="errores" className="surface-panel px-5 sm:px-7">
        <Accordion type="single" collapsible>
          {issues.map((c, i) => (
            <AccordionItem key={c.title} value={`i-${i}`}>
              <AccordionTrigger className="gap-2.5 text-left">
                <span className="flex items-center gap-2.5">
                  {c.icon}
                  <span>{c.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-muted-foreground">
                {c.detail}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="flex items-center gap-1.5 py-4 text-xs leading-5 text-muted-foreground">
          <Info className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
          <span>Lista operativa propuesta para OITE; no reemplaza reglas normativas.</span>
        </p>
      </TabsContent>

      <TabsContent value="codigos" className="surface-panel p-5 sm:p-7">
        {codes.length ? (
          <div className="space-y-3">
            {codes.slice(0, 10).map((c, i) => (
              <div
                key={`${c.code}-${i}`}
                className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border pb-3 last:border-0"
              >
                <div className="flex items-center gap-2.5">
                  <FileCode2 className="size-4 text-primary shrink-0 opacity-70" aria-hidden="true" />
                  <code className="rounded-lg border border-primary/15 bg-accent px-2.5 py-1.5 font-mono text-sm font-bold text-accent-foreground">
                    {c.code}
                  </code>
                </div>
                <span className="min-w-0 flex-1 text-sm leading-6">{c.label}</span>
                {pdf && (
                  <a
                    className="ui-link inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-primary underline"
                    href={`${pdf}#page=${c.page}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>PDF p. {c.page}</span>
                    <ExternalLink className="size-3 opacity-80" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 py-2 text-sm leading-7 text-muted-foreground">
            <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span>No se han incorporado códigos a esta ficha hasta verificar su sección operativa. Consulte el PDF original.</span>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
