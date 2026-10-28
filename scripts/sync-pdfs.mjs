/** Guarda copias de consulta de PDF desde BVS MINSA para servirlos desde GitHub Pages.
 * Nunca reescribe PDF válidos ya existentes. Este script no requiere dependencias npm.
 */
import { readdir, readFile, mkdir, open, rename, stat, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const contentDir = path.join(root, 'src/content/manuales');
const targetDir = path.join(root, 'public/pdfs');
const args = process.argv.slice(2);
const concurrency = Math.max(1, Math.min(4, Number(args.find(x=>x.startsWith('--jobs='))?.split('=')[1] || 3)));
const strict = args.includes('--strict');
const only = args.find(x=>x.startsWith('--only='))?.slice(7).split(',').filter(Boolean);
const maxBytes = 40*1024*1024;
const attempts = 2;
await mkdir(targetDir,{recursive:true});
const files=(await readdir(contentDir)).filter(file=>file.endsWith('.md'));
const documents=[];
for (const file of files) {
  const raw = await readFile(path.join(contentDir,file),'utf8');
  const text = raw.match(/^---\s*\n([\s\S]*?)\n---/m)?.[1] || '';
  const pdf = text.match(/^pdf:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim();
  if(!pdf) continue;
  const url=new URL(pdf);
  if (url.protocol!=='https:'||url.hostname!=='bvs.minsa.gob.pe'||!url.pathname.endsWith('.pdf')) throw Error(`URL no oficial en ${file}`);
  const slug=file.slice(0,-3);
  if(!only || only.includes(slug)) documents.push({slug,url:url.toString()});
}
async function validPdf(file){
  try {
    const info=await stat(file);
    if(info.size < 100 || info.size > maxBytes) return false;
    const f=await open(file,'r');
    try {const b=Buffer.alloc(5);await f.read(b,0,5,0);return b.toString()==='%PDF-';}
    finally {await f.close();}
  } catch {return false;}
}
async function fetchPdf({slug,url}){
  const dest=path.join(targetDir,`${slug}.pdf`);
  if(await validPdf(dest)) return {slug,status:'local',size:(await stat(dest)).size};
  let lastError;
  for(let attempt=1;attempt<=attempts;attempt++){
    let temp=dest+'.partial';
    try {
      const response=await fetch(url,{signal:AbortSignal.timeout(65000),headers:{'Accept':'application/pdf,application/octet-stream;q=0.8','User-Agent':'Mozilla/5.0 (compatible; RIS-San-Miguel-HIS/1.2)'}});
      if(!response.ok||!response.body) throw Error(`HTTP ${response.status}`);
      if(new URL(response.url).hostname!=='bvs.minsa.gob.pe') throw Error('Redirección a dominio no autorizado');
      const length=Number(response.headers.get('content-length')||0);
      if(length>maxBytes) throw Error('Documento excede el tamaño máximo de 40 MB');
      const f=await open(temp,'w');
      let size=0;let first=Buffer.alloc(0);
      try {
        for await (const chunk of response.body) {
          const b=Buffer.from(chunk);
          if(first.length<5) first=Buffer.concat([first,b]).subarray(0,5);
          size+=b.length;
          if(size>maxBytes) throw Error('PDF mayor al límite de 40 MB');
          await f.write(b);
        }
      } finally {await f.close();}
      if(size<100||first.toString()!=='%PDF-') throw Error('El servidor respondió HTML o un documento no válido');
      await rename(temp,dest);
      return {slug,status:'descargado',size};
    } catch(error){lastError=error;await rm(temp,{force:true}).catch(()=>{});}
  }
  return {slug,status:'fallo',reason:String(lastError?.message||lastError)};
}
const results=[];
let cursor=0;
async function worker(){while(cursor<documents.length){const i=cursor++;const result=await fetchPdf(documents[i]);results.push(result);console.log(`${result.status==='fallo'?'AVISO':'OK'} ${result.slug}: ${result.status}${result.reason?' ('+result.reason+')':''}`);}}
await Promise.all(Array.from({length:concurrency},worker));
console.log(`PDF locales: ${results.filter(r=>r.status!=='fallo').length}/${documents.length}. Los no descargados conservarán enlaces oficiales externos.`);
if (strict && results.some(r=>r.status==='fallo')) process.exitCode=1;
