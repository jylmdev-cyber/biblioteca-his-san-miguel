/** WCAG 2.x: contraste calculado desde tokens OKLCH, sin dependencias externas. */
import { readFileSync } from 'node:fs';
const css=readFileSync('src/styles/global.css','utf8');
const block=name=>{
  const re=name==='light'?/:root\s*\{([^}]+)\}/: /\.dark\s*\{([^}]+)\}/;
  const match=css.match(re); if(!match)throw new Error('No existe tema '+name);
  return Object.fromEntries([...match[1].matchAll(/--([\w-]+):\s*oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)\s*;/g)]
    .map(m=>[m[1],[Number(m[2]),Number(m[3]),Number(m[4])]]));
};
function luminance([L,C,h]){
 const a=C*Math.cos(h*Math.PI/180),b=C*Math.sin(h*Math.PI/180);
 const l=(L+0.3963377774*a+0.2158037573*b)**3;
 const m=(L-0.1055613458*a-0.0638541728*b)**3;
 const s=(L-0.0894841775*a-1.291485548*b)**3;
 const r=4.0767416621*l-3.3077115913*m+0.2309699292*s;
 const g=-1.2684380046*l+2.6097574011*m-0.3413193965*s;
 const bl=-0.0041960863*l-0.7034186147*m+1.707614701*s;
 const clamp=x=>Math.min(1,Math.max(0,x));
 return .2126*clamp(r)+.7152*clamp(g)+.0722*clamp(bl);
}
const pairs=[['foreground','background'],['foreground','card'],['popover-foreground','popover'],['muted-foreground','background'],['muted-foreground','card'],['primary','background'],['primary','card'],['primary','primary-foreground'],['accent-foreground','accent'],['secondary-foreground','secondary']];
let failures=0;
for(const name of ['light','dark']){
 const colors=block(name);
 for(const [fg,bg] of pairs){
  if(!colors[fg]||!colors[bg]){console.error('Falta token',fg,bg);failures++;continue;}
  const a=luminance(colors[fg]),b=luminance(colors[bg]);
  const contrast=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
  if(contrast<4.5){console.error(`NO AA ${name}: ${fg}/${bg} = ${contrast.toFixed(2)}:1`);failures++;}
  else console.log(`AA ${name.padEnd(5)} ${fg.padEnd(20)} / ${bg.padEnd(20)} ${contrast.toFixed(2)}:1`);
 }
}
if(failures){console.error(`${failures} pares no cumplen AA`);process.exitCode=1;}
else console.log('OK: 20 pares contrastados superan WCAG AA (4.5:1).');
