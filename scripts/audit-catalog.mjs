import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const root = new URL('../src/content/manuales/', import.meta.url);
const files = readdirSync(root).filter(name => name.endsWith('.md'));
const get = (txt, key) => {
  const match = txt.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return undefined;
  try { return JSON.parse(match[1]); } catch { return match[1]; }
};
const ids = new Set();
for(const file of files){
  const txt=readFileSync(new URL(file,root),'utf8');
  assert.match(txt,/^---\s*\n/);
  assert.match(txt,/\n---\s*\n/);
  for(const key of ['title','shortTitle','description','category','program','status','source']) assert.ok(get(txt,key),`${file}: falta ${key}`);
  assert.ok(!ids.has(file),`${file}: duplicado`); ids.add(file);
  const status=get(txt,'status');
  assert.ok(['verificado','pendiente'].includes(status),`${file}: status inválido`);
  const source=get(txt,'source');
  assert.ok(source?.startsWith('https://'),`${file}: source debe ser HTTPS`);
  if(status==='verificado'){
    const pdf=get(txt,'pdf');
    assert.ok(pdf?.startsWith('https://bvs.minsa.gob.pe/'),`${file}: PDF oficial requerido`);
    assert.ok(pdf?.endsWith('.pdf'),`${file}: enlace no PDF`);
  } else assert.ok(!get(txt,'pdf'),`${file}: pendiente con PDF`);
  const year=get(txt,'year');if(year)assert.ok(year>=2010&&year<=2100,`${file}: año inválido`);
}
const data=readFileSync(new URL('../src/data/codes.ts',import.meta.url),'utf8');
const refs=[...data.matchAll(/manual:'([^']+)'/g)].map(m=>m[1]);
for(const ref of refs)assert.ok(ids.has(`${ref}.md`),`Referencia a manual inexistente: ${ref}`);
console.log(`OK: ${files.length} fichas y ${refs.length} referencias de códigos; coherencia local comprobada.`);
