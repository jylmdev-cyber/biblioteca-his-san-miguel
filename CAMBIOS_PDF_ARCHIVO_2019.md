# v1.2.0 — PDF confiables y archivo HIS 2019–2022

## Corrección del visor

**Antes:** `iframe src="https://bvs.minsa.gob.pe/...pdf"` provocaba pantalla gris en algunos navegadores, por restricciones de incrustación del servidor BVS y protección del navegador.

**Ahora:** Astro comprueba si existe `public/pdfs/<slug>.pdf` y, solo en ese caso, genera un `<object type="application/pdf">` servido **desde el propio sitio**. El usuario dispone de lectura embebida, apertura de visor completo, descarga y enlace a la edición original en BVS. Si no se ha descargado una copia local, se muestra un mensaje con enlace BVS, nunca una pantalla gris sin explicación.

## Cómo activar el visor de Cáncer en localhost

```bash
npm install
npm run sync:pdf -- --only=cancer
npm run dev
```

Debe encontrarse `public/pdfs/cancer.pdf`, con cabecera `%PDF-`. Si se produce un error HTTP 403 u otro bloqueo del MINSA, el script lo informa y conserva el acceso al archivo original. En ese caso también puedes descargarlo manualmente desde el navegador y guardarlo como `public/pdfs/cancer.pdf` antes de ejecutar el build; no existe un método fiable para forzar un iframe remoto en GitHub Pages.

Para descargar todos los documentos verificables: `npm run sync:pdf`.

En GitHub Actions, el workflow ya ejecuta `npm run sync:pdf` **antes** del `npm run build`, de modo que el sitio publicado muestre los archivos realmente obtenidos. Las descargas son de mejor esfuerzo, sin necesidad de backend ni API externa.

## Manuales históricos añadidos

| Año | Ficha | ID BVS |
|---|---|---|
| 2019 | Planificación Familiar | 5809 |
| 2019 | Adulto mujer y varón | 5790 |
| 2020 | Adolescente | 5163 |
| 2020 | Adulto Mayor | 11366 (CONTENIDO) |
| 2020 | Salud Ocular | 7519 |
| 2021 | Salud Mental | 5796 |
| 2021 | Telemedicina versión 2 | 5798 |
| 2021 | Daños No Transmisibles | 5797 |
| 2022 | Discapacidad | 6144 |
| 2022 | Emergencias/Urgencias primer nivel | 5782 |

**Resultado:** 18 fichas anteriores + 10 fichas históricas = **28 fichas**. Se preservan los **22 códigos** previamente documentados; no se han extrapolado códigos antiguos a la versión vigente.

## Archivos modificados

- `src/components/astro/OfficialPdf.astro` — componente del visor PDF local y estados de error.
- `src/pages/manuales/[slug].astro` — integra el visor y diferencia ediciones antiguas.
- `src/components/islands/CatalogExplorer.tsx` — badge «Edición histórica» y filtros de año dinámicos.
- `src/pages/index.astro` — acceso al archivo histórico.
- `src/pages/manuales/index.astro` — texto aclaratorio del catálogo.
- `src/content/manuales/*-2019.md` ... `*-2022.md` — diez fichas nuevas.
- `scripts/sync-pdfs.mjs` — descarga validada del PDF oficial por URL BVS.
- `scripts/audit-history.mjs` — verifica cobertura por años, fichas y PDF locales.
- `.github/workflows/deploy.yml` — descarga antes de compilar.
- `README.md` y `package.json` — documentación y scripts.

## Comprobaciones ejecutadas

- `npm run audit:catalog` ✓ (28 fichas, 22 códigos).
- `npm run audit:history` ✓ (años 2019–2022 presentes; 23 URLs oficiales referenciadas; 1 PDF incluido en este ZIP).
- `npm run audit:ui` ✓ (sin Select nativos).
- `npm run audit:contrast` ✓ (20 pares de contraste AA).
- `npm run sync:pdf -- --only=tuberculosis` ✓ (archivo local PDF válido).
- `yaml.safe_load` en 28 frontmatters ✓.

**Pendiente:** descargar las demás copias oficiales (este entorno no dispone de conectividad hacia BVS), instalar paquetes npm, compilar Astro y validar la experiencia real en un navegador de escritorio y móvil. No se presentan capturas de un build no ejecutado.
