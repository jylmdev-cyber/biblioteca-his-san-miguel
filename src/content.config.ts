import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const manuales = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/manuales' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    year: z.number().int().min(2010).max(2100).optional(),
    category: z.enum(['Estrategias sanitarias', 'Curso de vida', 'Atención y prevención', 'Herramientas transversales']),
    program: z.string(),
    course: z.string().optional(),
    type: z.enum(['Manual', 'Guía', 'Documento de apoyo']).default('Manual'),
    status: z.enum(['verificado', 'pendiente']),
    pdf: z.string().url().optional(),
    source: z.string().url(),
    keywords: z.array(z.string()).default([]),
    codes: z.array(z.string()).default([]),
    updated: z.string().optional(),
    featured: z.boolean().default(false),
    /** Notas del equipo OITE, no pertenecen al manual oficial. */
    digitizerTips: z.array(z.string()).default([]),
  }),
});

export const collections = { manuales };
