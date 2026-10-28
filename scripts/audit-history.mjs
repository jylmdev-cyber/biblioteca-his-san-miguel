import { readdirSync,readFileSync,statSync,existsSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const folder=new URL('../src/content/manuales/',import.meta.url);
const pdfs=new URL('../public/pdfs/',import.meta.url);
const all=readdirSync(folder).filter(f=>f.endsWith('.md'));
const years=new Set();
let verified=0,local=0;
for(const f of all){
  const txt=readFileSync(new URL(f,folder),'utf8');
  const y=txt.match(/^year: ?(\d{4})$/m)?.[1];
  if(y) years.add(Number(y));
  const src=txt.match(/^pdf: ?"(https:\/\/[^"\n]+)"$/m)?.[1];
  if(src){verified++;const target=new URL(`${f.slice(0,-3)}.pdf`,pdfs);if(existsSync(target)){local++;const bytes=readFileSync(target).subarray(0,5).toString();assert.equal(bytes,'%PDF-',`${f}: archivo no es PDF`);}}
}
for(const y of [2019,2020,2021,2022]) assert.ok(years.has(y),`Falta ${y}`);
console.log(`OK: ${all.length} fichas, ${verified} PDF oficiales identificados, ${local} copias locales, años 2019–2022 cubiertos.`);
