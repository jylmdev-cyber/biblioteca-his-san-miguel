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
  // NTS N° 238-MINSA/DGIESP-2025: Control de Crecimiento y Desarrollo del Niño
  {code:'99381',label:'Control de Crecimiento y Desarrollo (CRED) en menor de 1 año',family:'CPMS',manual:'nino',page:24,note:'LAB = N.° secuencial de control (1 al 11)'},
  {code:'99382',label:'Control de Crecimiento y Desarrollo (CRED) de 1 a 4 años',family:'CPMS',manual:'nino',page:28,note:'LAB = N.° de control consecutivo según edad'},
  {code:'99383',label:'Control de Crecimiento y Desarrollo (CRED) de 5 a 11 años (escolar)',family:'CPMS',manual:'nino',page:34,note:'Ampliación NTS 238-MINSA'},
  {code:'96110',label:'Evaluación del desarrollo psicomotor (EEDP / TEPSI / Pauta Breve)',family:'CPMS',manual:'nino',page:40,note:'LAB = Instrumento aplicado'},
  {code:'85018',label:'Tamizaje de anemia / Dosaje de hemoglobina',family:'CPMS',manual:'nino',page:45},
  {code:'99403',label:'Consejería nutricional para la prevención de malnutrición y anemia',family:'CPMS',manual:'nino',page:48},
  {code:'Z001',label:'Control de salud de rutina del niño',family:'CIE-10',manual:'nino',page:22},
];
