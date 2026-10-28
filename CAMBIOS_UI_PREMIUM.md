# Biblioteca HIS · Red Integrada de Salud San Miguel
## Actualización de experiencia de usuario — v1.1.0 (28/10/2026)

### Alcance

Rediseño visual e interactivo **sobre el proyecto existente**. No se modificaron las 18 fichas de manuales, ni se alteraron los 22 códigos de la biblioteca. Todo el contenido sigue siendo informativo; el documento oficial del MINSA prevalece frente a la interfaz.

### Cambios principales

| Módulo | Antes | Ahora |
| --- | --- | --- |
| Select (7 instancias) | `<select>` nativo con popup sujeto al navegador | Componente único Radix Select, patrón shadcn/ui, con portal, ancho consistente y scroll |
| Dropdown | `<option>` de color no predecible | Menú `bg-popover`, borde tokenizado, sombra graduada y selección con marca ✓ |
| Select abierto | Apenas visible en oscuro | Borde turquesa, halo de foco, flecha rotada y panel elevado |
| Buscador catálogo | Entrada + 6 filtros siempre expuestos | Borrado inmediato, filtros colapsables en móvil, chips removibles y consulta compartible |
| Catálogo | Tarjetas con sombras genéricas | Cards con hover sutil, estados de foco y distinciones de disponibilidad |
| Códigos | Select nativo + búsqueda básica | Select consistente, búsqueda, código copiable y feedback accesible |
| Modo oscuro | Azul/gris bastante uniforme | Azul petróleo profundo con superficies escalonadas y acento turquesa |
| Tema | Cambio abrupto | Transición corta con preferencia persistente, sincronización entre pestañas y respeto a movimiento reducido |
| Tipografía | Tamaños heterogéneos | Escala y alturas de línea normalizadas, jerarquía y espaciado coherentes |
| Componentes | Inputs, tabs y acordeones sin animación consistente | Estados completos y animaciones accesibles |

### Componente Select

**Archivos:** `src/components/ui/select.tsx`, `src/components/ui/filter-select.tsx`.

- `Select`/`SelectTrigger`/`SelectContent`/`SelectItem`/`SelectValue`: composición Radix.
- Ancho del popup basado en `--radix-select-trigger-width`.
- Disposición ajustada a la pantalla mediante Popper de Radix (`collisionPadding=12`).
- Lista con altura máxima, scroll y botones automáticos de desplazamiento.
- Los ítems proporcionan estado resaltado (teclado/ratón), selección y check.
- Trigger de 48 px, filas seleccionables de 44 px o más, pensados para consulta desde celular.
- `aria-label` o `label` visible vinculado al trigger; gestión de foco y cierre por Escape por Radix.
- No se utiliza `native select` en los componentes React ni páginas Astro.

**Aspecto en modo claro:** trigger blanco, borde azul grisáceo y texto antracita; menú flotante blanco con separación del trigger, selección turquesa tenue, check verde petróleo y hover suave.

**Aspecto en modo oscuro:** trigger azul profundo sobre panel ligeramente más claro; menú azul pizarra elevado, borde gris azulado y sombra intensa; opción resaltada en turquesa oscuro, texto blanco y check turquesa brillante.

### Paleta (valores OKLCH)

| Token | Claro | Oscuro |
| --- | --- | --- |
| background | `oklch(0.982 0.007 225)` | `oklch(0.177 0.025 240)` |
| foreground | `oklch(0.235 0.035 239)` | `oklch(0.963 0.009 213)` |
| card | `oklch(1 0 0)` | `oklch(0.232 0.032 238)` |
| popover | `oklch(1 0 0)` | `oklch(0.267 0.032 232)` |
| primary | `oklch(0.415 0.111 189)` | `oklch(0.815 0.117 183)` |
| accent | `oklch(0.924 0.039 190)` | `oklch(0.323 0.048 197)` |
| muted | `oklch(0.948 0.011 222)` | `oklch(0.300 0.028 232)` |
| border | `oklch(0.884 0.016 224)` | `oklch(0.390 0.033 231)` |
| ring | `oklch(0.480 0.120 190)` | `oklch(0.832 0.122 184)` |

Todos los tokens están en `src/styles/global.css` y conectados con Tailwind v4 mediante `@theme inline`. Incluye `--secondary`, `--destructive`, `--surface-raised`, `--surface-hover`, `--input`, `--success`, `--warning` y colores de primer plano.

**Contraste:** `npm run audit:contrast` verifica 10 pares clave en cada tema (20 pruebas), con umbral AA **4.5:1**. Resultados comprobados: texto principal vs fondo **15.80:1** (claro), **16.99:1** (oscuro); texto atenuado vs card **7.55:1** (claro), **8.60:1** (oscuro). Esta comprobación matemática no sustituye una auditoría visual manual o un análisis de componentes renderizados.

### Accesibilidad y rendimiento

- Se mantiene la salida `output: 'static'` y GitHub Pages (`PUBLIC_BASE_PATH`).
- Sin dependencias de iconos o tipografías adicionales; fuente del sistema priorizada para IPRESS con conexión limitada.
- En los filtros se reutiliza una única isla React ya existente; no se hidratan todos los cards individualmente.
- La navegación móvil se puede cerrar tocando fuera o pulsando Escape.
- Enfoque visible y diferencias de estados para interacciones.
- Se respeta `prefers-reduced-motion`.
- Se persiste `his-theme` en `localStorage` si está disponible y se sincroniza el tema entre pestañas.
- Los filtros disponibles se serializan en la URL mediante `history.replaceState` para compartir búsquedas sin recargar la página.
- El navegador no envía diagnósticos ni datos de pacientes a servidores de búsqueda.

### Cambios en dependencias

Se incorporó `@radix-ui/react-select` (`^2.2.6`). Se conservan Astro 7.4.2+, Tailwind CSS v4, React 19 y el resto de dependencias.

### Instalación

Se recomienda **Node.js 24** (el contenedor de edición solo dispone de Node 22.16, inferior al mínimo esperado por Astro 7).

```bash
npm install
npm run audit:catalog
npm run audit:ui
npm run audit:contrast
npm run check
npm run build
npm run dev
```

El workflow de GitHub Actions instala con Node 24, valida catálogo, componentes, contraste, Astro y compila. Para activar Pages: *Settings → Pages → Source: GitHub Actions*.

### Validación y límites conocidos

**Comprobado aquí:** sintaxis AST de 14 archivos TypeScript/TSX; catálogos originales sin alteración; 18 fichas y 22 códigos válidos; auditoría de Select y tokens; 20 pruebas de contraste OKLCH.

**No comprobado aquí:** compilación real `npm run check`/`npm run build`, navegación con navegador automatizado ni capturas del frontend renderizado. El registro npm no fue accesible (`EAI_AGAIN`) y no se pudo instalar la nueva dependencia. Antes de publicar, realizar los comandos anteriores y las pruebas manuales indicadas a continuación.

### Lista de pruebas manuales pendiente

- Móvil 360 px: abrir los siete Select, comprobar ancho/scroll, abrir los filtros, seleccionar y eliminar chips.
- Desktop: pestaña, flechas, escritura por teclado, Enter y Escape dentro de Select.
- Pantallas claro y oscuro: abrir Select, seleccionar opciones largas, comprobar el foco, hover, deshabilitado y el scroll.
- Comprobar búsqueda por código, reset y enlace con consulta `?q=A150&ano=2025`.
- Confirmar funcionamiento de enlaces internos en URL con `base`, por ejemplo `/biblioteca-his-san-miguel/manuales/`.
- Validar con Lighthouse (performance, accesibilidad, SEO) en el sitio publicado.
