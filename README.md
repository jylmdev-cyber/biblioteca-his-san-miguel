# Biblioteca Digital de Manuales HIS · RIS San Miguel

<p align="center">
  <img src="https://img.shields.io/badge/Astro-7.4-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-Componentes-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/GitHub_Pages-Desplegado-222222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/Accesibilidad-WCAG_AA_Pass-emerald?style=for-the-badge" alt="WCAG AA" />
  <img src="https://img.shields.io/badge/Licencia-MIT-blue?style=for-the-badge" alt="Licencia MIT" />
</p>

---

## 📋 Descripción y Propósito

La **Biblioteca Digital de Manuales HIS** es una plataforma web estática de alto rendimiento desarrollada para el personal asistencial (medicina, enfermería, obstetricia, odontología, psicología, etc.) y los puntos de digitación de la **Red Integrada de Salud San Miguel** (DIRESA Cajamarca).

El sistema centraliza y facilita la consulta de los manuales oficiales de codificación del **Ministerio de Salud del Perú (MINSA)**, permitiendo verificar en pocos segundos:
- Códigos diagnósticos **CIE-10** y procedimientos **CPMS**.
- Asignación estricta de tipo de diagnóstico (**P**resuntivo, **D**efinitivo, **R**epetido).
- Ubicación y significado exacto de los valores auxiliares **LAB 1, 2 y 3**.
- Trazabilidad documental con visores locales de PDFs oficiales y enlaces a la Biblioteca Virtual en Salud (BVS MINSA).

> [!NOTE]
> **Alcance informativo:** Esta plataforma es una herramienta de soporte y consulta técnica para el personal de las IPRESS. No captura ni procesa datos personales de pacientes y no sustituye las normativas sanitarias vigentes aprobadas por el MINSA.

---

## ✨ Características Principales

- 🔍 **Buscador en Tiempo Real con Debounce:** Búsqueda instantánea normalizada (sin distinción de mayúsculas ni tildes) por título, estrategia, código o palabras clave.
- 🎛️ **Filtros Facetados Avanzados:** Selects accesibles (construidos con Radix UI) para filtrar por categoría, estrategia sanitaria, curso de vida, año de edición, tipo de documento y disponibilidad de PDF.
- 🩺 **Iconografía Clínica Semántica:** Identificación visual rápida de cada estrategia (Tuberculosis, Materno Perinatal, Niño, Inmunizaciones, Cáncer, Salud Mental, etc.) con [Lucide Icons](https://lucide.dev/).
- 📄 **Visor Local de PDF sin Bloqueos:** Despliegue de documentos oficiales incrustados (`<object type="application/pdf">`) alojados bajo el mismo dominio para evitar restricciones de CORS o bloqueos de servidores externos.
- 📋 **Índice Interactivo de Códigos:** Catálogo de códigos frecuentes con botón de copiado rápido al portapapeles y referencia directa a la página del manual fuente.
- 🌙 **Modo Oscuro Profesional:** Paleta basada en espacios de color **OKLCH** con ratio de contraste WCAG AA verificado (superior a 7:1) para prevenir fatiga visual en jornadas prolongadas.
- 📱 **Mobile-First & Puntos de Digitación:** Diseño responsive adaptado a celulares, tablets y estaciones de trabajo, incluyendo checklist interactivo e imprimible para control de calidad de tramas.
- 🏛️ **Archivo Documental Histórico:** Conservación trazable de ediciones oficiales desde 2019 hasta 2022 para revisión de registros anteriores y auditorías.

---

## 🛠️ Stack Tecnológico

| Tecnología | Rol en el Proyecto |
|---|---|
| **[Astro 7](https://astro.build/)** | Generador de sitios estáticos (SSG), arquitectura de islas y ruteo basado en archivos. |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Motor de estilos moderno configurado mediante `@tailwindcss/vite` y variables nativas OKLCH. |
| **[shadcn/ui](https://ui.shadcn.com/) + Radix UI** | Primitivas accesibles y robustas para `Select`, `Tabs`, `Accordion`, `Card`, `Badge` e `Input`. |
| **[React 19](https://react.dev/)** | Hidratación parcial selectiva únicamente en las islas interactivas (`client:load`, `client:visible`). |
| **[TypeScript 5.9](https://www.typescriptlang.org/)** | Tipado estricto en colecciones de contenido, componentes y utilidades. |
| **[Lucide Icons](https://lucide.dev/)** | Set de iconografía técnica y clínica consistente. |
| **GitHub Actions + Pages** | Canalización CI/CD automatizada para validación, auditoría y despliegue estático. |

---

## 🚀 Instalación y Desarrollo Local

### Requisitos Previos
- **Node.js:** Versión `20.x`, `22.x` (LTS recomendada) o `24.x`.
- **npm:** Versión `9.x` o superior.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jylmdev-cyber/biblioteca-his-san-miguel.git
   cd biblioteca-his-san-miguel
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar auditorías de calidad (opcional pero recomendado):**
   ```bash
   npm run audit:catalog   # Valida coherencia del catálogo y códigos
   npm run audit:ui        # Verifica componentes y ausencia de selects nativos
   npm run audit:contrast  # Comprueba contrastes WCAG AA (light y dark)
   npm run check           # Validación estricta de TypeScript y Astro
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre tu navegador en [http://localhost:4321](http://localhost:4321).

5. **Compilar para producción localmente:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Despliegue en GitHub Pages

El proyecto está 100% preconfigurado para publicarse automáticamente en **GitHub Pages** mediante **GitHub Actions**.

### Paso a paso para publicar:

1. **Crear el repositorio en GitHub:**
   Crea un nuevo repositorio en tu cuenta u organización (por ejemplo `biblioteca-his-san-miguel` o `tu-usuario.github.io`).

2. **Subir los archivos:**
   ```bash
   git add .
   git commit -m "feat: configuracion de produccion para GitHub Pages"
   git push -u origin main
   ```

3. **Habilitar GitHub Pages en el repositorio:**
   - Ve a **Settings** en la barra superior de tu repositorio (`https://github.com/jylmdev-cyber/biblioteca-his-san-miguel/settings/pages`).
   - En la sección **Build and deployment > Source**, selecciona:
     👉 **`GitHub Actions`** (en lugar de "Deploy from a branch").

4. **Despliegue automático:**
   - Cada vez que hagas `git push` a la rama `main`, se disparará automáticamente el flujo de trabajo configurado en `.github/workflows/deploy.yml`.
   - El workflow compila y publica el sitio en:
     👉 **`https://jylmdev-cyber.github.io/biblioteca-his-san-miguel/`**

### Despliegue Manual con Variables de Entorno (Opcional)

Si necesitas compilar localmente para la ruta oficial:
```bash
# En entornos Linux / macOS:
PUBLIC_SITE_URL=https://jylmdev-cyber.github.io PUBLIC_BASE_PATH=/biblioteca-his-san-miguel/ npm run build

# En PowerShell (Windows):
$env:PUBLIC_SITE_URL="https://jylmdev-cyber.github.io"
$env:PUBLIC_BASE_PATH="/biblioteca-his-san-miguel/"
npm run build
```
La carpeta generada `dist/` contendrá todo el sitio listo para ser transferido a cualquier hosting estático o servidor Apache / Nginx / Cloudflare Pages.

---

## 📂 Estructura del Proyecto

```text
biblioteca-his-san-miguel/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline CI/CD para GitHub Pages
├── public/
│   ├── favicon.svg                 # Isotipo institucional vectorial
│   └── pdfs/
│       └── tuberculosis.pdf        # Muestra local verificada
├── src/
│   ├── components/
│   │   ├── astro/
│   │   │   └── OfficialPdf.astro   # Visor local de PDF y fallback BVS
│   │   ├── islands/
│   │   │   ├── CatalogExplorer.tsx # Buscador, filtros y cards del catálogo
│   │   │   ├── CodesExplorer.tsx   # Buscador interactivo de códigos CIE/CPMS
│   │   │   └── ManualToolkit.tsx   # Tabs de apoyo a la digitación y control
│   │   └── ui/                     # Primitivas accesibles estilo shadcn/ui
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── filter-select.tsx
│   │       ├── input.tsx
│   │       └── select.tsx
│   ├── content/
│   │   └── manuales/               # 28 fichas Markdown con esquema Zod
│   ├── data/
│   │   └── codes.ts                # Índice curado de códigos frecuentes
│   ├── layouts/
│   │   └── SiteLayout.astro        # Layout base con header, footer y modo oscuro
│   ├── lib/
│   │   ├── urls.ts                 # Enrutamiento seguro compatible con subrutas
│   │   └── utils.ts                # Normalización de texto y cn()
│   ├── pages/
│   │   ├── index.astro             # Página de inicio renovada
│   │   ├── 404.astro               # Página de error amigable
│   │   ├── codigos/index.astro     # Buscador de códigos
│   │   ├── guia-his/index.astro    # Guía rápida de llenado (P/D/R y LAB)
│   │   ├── manuales/index.astro    # Catálogo general
│   │   ├── manuales/[slug].astro   # Ficha individual del manual
│   │   └── puntos-digitacion/      # Checklist de control de calidad
│   └── styles/
│       └── global.css              # Variables OKLCH y utilidades Tailwind v4
├── scripts/
│   ├── audit-catalog.mjs           # Verificación de integridad de colecciones
│   ├── audit-contrast.mjs          # Verificación matemática de contraste WCAG
│   ├── audit-history.mjs           # Control de ediciones 2019-2022
│   ├── audit-ui.mjs                # Auditoría de componentes y Selects
│   └── sync-pdfs.mjs               # Sincronizador de PDFs desde BVS MINSA
├── astro.config.mjs                # Configuración de Astro y Vite
├── package.json
└── tsconfig.json
```

---

## 📝 Cómo Agregar o Actualizar un Manual

Las fichas se gestionan como colecciones de contenido en `src/content/manuales/*.md`.

### Estructura de una Ficha Markdown:

```markdown
---
title: "Tuberculosis: prevención, diagnóstico, tratamiento y seguimiento"
shortTitle: "Tuberculosis"
description: "Registro HIS de prevención, estudio de contactos, diagnóstico y DOT."
category: "Estrategias sanitarias"
program: "Tuberculosis"
type: "Manual"
status: "verificado"
year: 2025
source: "https://bvs.minsa.gob.pe/local/MINSA/7986.pdf"
pdf: "https://bvs.minsa.gob.pe/local/MINSA/7986.pdf"
keywords:
  - "Tuberculosis"
  - "DOTS"
  - "Sintomático respiratorio"
codes:
  - "A150"
  - "99199.57"
  - "99205.03"
featured: true
digitizerTips:
  - "Contrastar el tipo de diagnóstico P/D/R con el procedimiento concreto."
  - "Verificar que el casillero LAB 1 corresponda a la modalidad de DOT."
---

## Resumen ejecutivo

Síntesis de las actividades clínicas y preventivas según la norma técnica...

## Secciones clave

- **Prevención:** Consejería y censo de contactos (p. 14–24).
- **Recuperación:** DOT sensible y soporte integral (p. 34–50).
```

### Reglas de Calidad para Nuevas Fichas:
1. **`status`:** Usar `"verificado"` únicamente cuando el PDF oficial ha sido comprobado en la BVS o repositorio MINSA. Si el documento aún no está confirmado, usar `"pendiente"`.
2. **`year`:** Indicar el año de publicación oficial. Documentos anteriores a 2023 reciben automáticamente la etiqueta visual de **"Edición histórica"**.
3. **`codes`:** Indicar los códigos CIE-10 y CPMS vinculados a los procedimientos del manual.

---

## 🔍 Scripts de Auditoría Integrados

El proyecto cuenta con suites de validación automatizadas que se ejecutan antes de compilar:

```bash
# Validar estructura y consistencia de las 28 fichas:
npm run audit:catalog

# Validar que no existan selects nativos y que la UI use Radix/shadcn:
npm run audit:ui

# Validar ratios de contraste de color en ambos modos (WCAG AA):
npm run audit:contrast

# Descargar copias de consulta de los PDFs verificados:
npm run sync:pdf

# Comprobar estado de los manuales del archivo histórico (2019-2022):
npm run audit:history
```

---

## 📚 Fuentes Oficiales

Los contenidos técnicos y documentos enlazados proceden de los repositorios institucionales abiertos del Estado Peruano:
- **Biblioteca Virtual en Salud del MINSA (BVS):** [https://bvs.minsa.gob.pe/manuales-del-sistema-de-informacion-his/](https://bvs.minsa.gob.pe/manuales-del-sistema-de-informacion-his/)
- **Repositorio Institucional del Ministerio de Salud:** [https://repositorio.minsa.gob.pe/](https://repositorio.minsa.gob.pe/)
- **Dirección Regional de Salud Cajamarca (DIRESA):** [https://diresacajamarca.gob.pe/](https://diresacajamarca.gob.pe/)

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT** para su código fuente e interfaz de usuario. Consulta el archivo [LICENSE](LICENSE) para más detalles.

*Los manuales normativos, denominaciones sanitarias y códigos médicos pertenecen al Ministerio de Salud del Perú (MINSA).*
