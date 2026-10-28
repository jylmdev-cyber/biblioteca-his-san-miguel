/** Selección NO exhaustiva. Solo valores extraídos de documentos identificados. */
export type CodeEntry = {
  code: string; label: string; family: 'CIE-10' | 'CPMS'; manual: string;
  page: number; note?: string;
};
export const codes: CodeEntry[] = [
  {code:'A150',label:'Tuberculosis pulmonar',family:'CIE-10',manual:'tuberculosis',page:9},
  {code:'A156',label:'Pleuresía tuberculosa',family:'CIE-10',manual:'tuberculosis',page:9},
  {code:'99199.57',label:'Censo de contactos',family:'CPMS',manual:'tuberculosis',page:17},
  {code:'99401.36',label:'Consejería integral en salud respiratoria',family:'CPMS',manual:'tuberculosis',page:14},
  {code:'C0011',label:'Visita familiar integral',family:'CPMS',manual:'tuberculosis',page:14},
  {code:'86580',label:'Prueba intradérmica para TB (PPD)',family:'CPMS',manual:'tuberculosis',page:20},
  {code:'86480',label:'Prueba IGRA para infección tuberculosa',family:'CPMS',manual:'tuberculosis',page:20},
  {code:'99199.58',label:'Recolección de muestra para tuberculosis',family:'CPMS',manual:'tuberculosis',page:25},
  {code:'99199.12',label:'Terapia preventiva, contacto TB sensible',family:'CPMS',manual:'tuberculosis',page:22},
  {code:'99199.59',label:'Terapia preventiva, contacto TB resistente',family:'CPMS',manual:'tuberculosis',page:23},
  {code:'99199.60',label:'Terapia preventiva, población vulnerable',family:'CPMS',manual:'tuberculosis',page:23},
  {code:'99205.03',label:'Tratamiento directamente observado TB sensible',family:'CPMS',manual:'tuberculosis',page:37},
  {code:'99205.04',label:'DOT TB resistente en primer nivel',family:'CPMS',manual:'tuberculosis',page:38},
  {code:'99206.02',label:'DOT TB resistente en segundo y tercer nivel',family:'CPMS',manual:'tuberculosis',page:38},
  {code:'99214',label:'Evaluación médica',family:'CPMS',manual:'tuberculosis',page:34},
  {code:'99216',label:'Atención en consultorio de enfermería',family:'CPMS',manual:'tuberculosis',page:35},
  {code:'99499.08',label:'Teleorientación síncrona',family:'CPMS',manual:'tuberculosis',page:15},
  {code:'99215.03',label:'Valoración clínica del adulto mayor (VACAM)',family:'CPMS',manual:'adulto-mayor',page:8},
  {code:'99249.01',label:'Valoración geriátrica integral (VGI)',family:'CPMS',manual:'adulto-mayor',page:8},
  {code:'99209.04',label:'Evaluación nutricional antropométrica',family:'CPMS',manual:'adulto-mayor',page:8},
  {code:'99384',label:'Evaluación integral del adolescente (edición consultada)',family:'CPMS',manual:'adolescente',page:14},
  {code:'Z003',label:'Examen del estado de desarrollo del adolescente (edición consultada)',family:'CIE-10',manual:'adolescente',page:14},
];
