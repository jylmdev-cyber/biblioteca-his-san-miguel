import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { strict as assert } from 'node:assert';

const read=p=>readFileSync(p,'utf8');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(join(dir,item.name)):[join(dir,item.name)]);
const sources=walk('src').filter(f=>/\.(tsx|astro)$/.test(f));
const nativeSelects=sources.filter(f=>/<select[\s>]/.test(read(f)));
assert.deepEqual(nativeSelects,[],'Todos los Select deben utilizar el componente accesible compartido');
const css=read('src/styles/global.css');
for(const key of ['background','foreground','card','card-foreground','popover','popover-foreground','primary','primary-foreground','secondary','secondary-foreground','accent','accent-foreground','muted','muted-foreground','border','input','ring','destructive']){
  assert(new RegExp(`--${key}:`).test(css),`Falta token de diseño: ${key}`);
  assert(new RegExp(`--color-${key}:`).test(css),`Falta vincular --color-${key} al tema Tailwind`);
}
assert(css.includes('@theme inline'),'Debe emplearse Tailwind v4 @theme inline');
assert(css.includes('@custom-variant dark'),'El tema oscuro debe usarse por clase .dark');
const select=read('src/components/ui/select.tsx');
for(const text of ['@radix-ui/react-select','SelectPrimitive.Portal','SelectPrimitive.ItemIndicator','data-slot="select-item"','data-slot="select-trigger"','SelectPrimitive.Viewport']) assert(select.includes(text),`Falta primitiva Select ${text}`);
for(const path of ['src/components/islands/CatalogExplorer.tsx','src/components/islands/CodesExplorer.tsx']) assert(read(path).includes('<FilterSelect'),'Falta usar Select compartido en '+path);
assert(read('package.json').includes('@radix-ui/react-select'),'Dependencia Radix Select no declarada');
console.log(`OK: ${sources.length} archivos de interfaz inspeccionados, 0 selects nativos, tokens de tema y Radix Select presentes.`);
