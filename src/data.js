// Fuente: V = dato Veracruz 2025-26 · N = referencia nacional · E = estimación a validar
export const TIPOS={cumple:'Cumpleaños infantil',boda:'Boda',xv:'XV años',bautizo:'Bautizo',comunion:'Primera comunión',baby:'Baby shower'}
export const NIVELES={diy:'Lo organizo yo',dia:'Coordinador el día',parcial:'Planner parcial',completo:'Planner completo'}
export const FORMATOS={salon:'Salón',jardin:'Casa o jardín',aire:'Aire libre',destino:'Destino'}
export const REGIONES={puerto:['Veracruz / Boca del Río',1],xalapa:['Xalapa',1],coatza:['Coatzacoalcos',1],poza:['Poza Rica',.95],cordoba:['Córdoba–Orizaba',.92],tuxtlas:['Los Tuxtlas',.9],rural:['Zona rural',.85]}
export const PLANNER={dia:[8000,10000,12200],parcial:[14000,18000,22000],completo:[25000,40000,55000]}
const A=['boda','xv'],F=['jardin','aire','destino']
// q: ad adultos, ni niños, pe personas, ev 1, mesa pe/10, mes pe/25, rep pe*1.3 (reposición 30%)
export const CAT=[
{id:'salon',g:'Lugar',n:'Salón de fiestas',q:'ev',p:[6000,15000,38000],s:'V',f:['salon']},
{id:'carpa',g:'Lugar',n:'Carpa con estructura',q:'ev',p:[3000,6000,15000],s:'E',f:F},
{id:'banq',g:'Comida',n:'Banquete 3 tiempos',q:'pe',p:[350,550,1089],s:'N',t:['boda','xv','comunion','bautizo']},
{id:'taq',g:'Comida',n:'Taquiza 5–6 guisos',q:'pe',p:[90,120,160],s:'N',t:['cumple','baby','bautizo','comunion']},
{id:'pastel',g:'Comida',n:'Pastel (porciones)',q:'pe',p:[30,55,90],s:'E'},
{id:'dulces',g:'Comida',n:'Mesa de dulces',q:'pe',p:[30,50,80],s:'N'},
{id:'barra',g:'Bebidas',n:'Barra libre 5 h (adultos)',q:'ad',p:[450,550,700],s:'N',t:A},
{id:'agua',g:'Bebidas',n:'Agua, refrescos y hielo',q:'pe',p:[25,40,60],s:'E'},
{id:'mes',g:'Personal',n:'Meseros 5–6 h',q:'mes',p:[500,650,880],s:'N'},
{id:'cap',g:'Personal',n:'Capitán de meseros',q:'ev',p:[900,1150,1400],s:'E'},
{id:'limp',g:'Personal',n:'Limpieza del evento',q:'ev',p:[500,700,900],s:'E'},
{id:'mesas',g:'Mobiliario',n:'Mesa + 10 sillas plegables',q:'mesa',p:[150,180,220],s:'N'},
{id:'loza',g:'Mobiliario',n:'Loza, cristalería y cubiertos',q:'pe',p:[35,55,100],s:'N',t:['boda','xv','comunion','bautizo']},
{id:'rep',g:'Desechables',n:'Vasos, platos y servilletas (+30 %)',q:'rep',p:[12,18,28],s:'E',t:['cumple','baby']},
{id:'luz',g:'Logística',n:'Planta de luz (apagones)',q:'ev',p:[1500,3000,4500],s:'E',f:F},
{id:'pista',g:'Mobiliario',n:'Pista de baile',q:'ev',p:[2500,4000,6000],s:'E'},
{id:'brin',g:'Diversión',n:'Brincolín',q:'ev',p:[800,1300,1900],s:'N',t:['cumple']},
{id:'show',g:'Diversión',n:'Show infantil',q:'ev',p:[750,1200,2400],s:'N',t:['cumple']},
{id:'pina',g:'Diversión',n:'Piñata + relleno',q:'ev',p:[460,780,1200],s:'V',t:['cumple','xv']},
{id:'globos',g:'Decoración',n:'Arco de globos',q:'ev',p:[500,2500,5000],s:'V'},
{id:'dj',g:'Música',n:'DJ con sonido e iluminación',q:'ev',p:[3500,7000,15000],s:'N',t:['boda','xv','cumple']},
{id:'mari',g:'Música',n:'Mariachi (2 horas)',q:'ev',p:[6000,8000,12000],s:'N',t:A},
{id:'foto',g:'Foto y video',n:'Fotografía y video',q:'ev',p:[8000,20000,40000],s:'E',t:A},
{id:'civil',g:'Trámites',n:'Registro civil (según horario)',q:'ev',p:[1301,4294,8587],s:'V',t:['boda']},
{id:'iglesia',g:'Trámites',n:'Donativo a la parroquia',q:'ev',p:[3000,6000,20000],s:'N',t:['boda','xv','bautizo','comunion']},
{id:'plat',g:'Trámites',n:'Pláticas prematrimoniales',q:'ev',p:[100,500,4000],s:'N',t:['boda']},
{id:'ropon',g:'Bautizo',n:'Ropón, vela, concha y bolo',q:'ev',p:[1900,3500,7500],s:'N',t:['bautizo']},
{id:'recu',g:'Recuerdos',n:'Recuerdos para invitados',q:'pe',p:[15,25,45],s:'N'}]
export const FASES=[
['4 meses antes',['Definir presupuesto y lista de invitados','Reservar fecha y lugar',['boda','Iniciar trámites de registro civil e iglesia']]],
['2–3 meses antes',['Cotizar 3 proveedores por rubro','Contratar comida y música','Anticipo máximo 30 % a cuenta de empresa, con contrato']],
['1 mes antes',['Enviar invitaciones por WhatsApp','Revisar permisos del municipio',['jardin','Contratar carpa y planta de luz'],['aire','Contratar carpa y planta de luz']]],
['2 semanas antes',['Cerrar confirmaciones','Prueba de menú y pastel']],
['1 semana antes',['Confirmar por escrito a cada proveedor','Asignar mesas e imprimir lista']]]
export const DIA=[[-240,'Montaje del lugar y decoración'],[-120,'Llega comida y mobiliario'],[-60,'Prueba de sonido y luz'],[0,'Inicio y recepción de invitados'],[90,'Comida o cena'],[150,'Pastel y momento principal'],[210,'Baile o show'],[300,'Cierre y desmontaje']]
export const FRAUDE=['Tiene RFC y emite factura','Firma contrato con fechas y penalizaciones','Pide anticipo de 30 % o menos','Cobra a cuenta de empresa, no personal','Dio 2 referencias que respondieron','Tiene dirección física visitada']
export const PLANB=[['Nortes y lluvia (oct–mar)','Carpa con laterales o salón de respaldo. Fecha alterna acordada por escrito.'],['Calor y humedad (abr–sep)','Sombra, ventiladores, hielo extra y 1 L de agua por persona.'],['Apagones','Planta de luz con combustible para 6 horas y música con batería.'],['Permisos municipales','Cada ayuntamiento es distinto: pregunta 1 mes antes por ruido y cierre de calle.'],['Fraude de proveedores','Anticipo máximo 30 %, contrato y cuenta de empresa.'],['Mosquitos','Repelente, velas de citronela y ventiladores en la zona de mesas.']]
