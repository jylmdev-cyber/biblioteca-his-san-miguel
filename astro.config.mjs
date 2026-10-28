import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Configuración de Astro para despliegue estático en GitHub Pages.
 * 
 * En GitHub Actions, estas variables de entorno se inyectan dinámicamente según el repositorio:
 * - Repositorio de organización o usuario (<usuario>.github.io): PUBLIC_BASE_PATH='/'
 * - Repositorio de proyecto (<usuario>.github.io/<repo>): PUBLIC_BASE_PATH='/<repo>/'
 * 
 * Si compilas localmente sin variables, se asume '/' por defecto.
 */
const site = process.env.PUBLIC_SITE_URL || 'https://ris-san-miguel.github.io';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto'
  }
});
