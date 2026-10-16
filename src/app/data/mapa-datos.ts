import { EtapaFrente } from '../models';

/** Ríos principales del mapa esquemático: pares [lon, lat]. */
export const RIO_PARAGUAY: [number, number][] = [
  [-57.7, -19.2],
  [-57.6, -20.0],
  [-57.85, -21.0],
  [-57.9, -21.9],
  [-57.93, -22.3],
  [-57.6, -23.0],
  [-57.43, -23.4],
  [-57.45, -24.2],
  [-57.4, -24.8],
  [-57.65, -25.2],
  [-57.9, -25.4],
  [-58.3, -25.7],
];

export const RIO_PILCOMAYO: [number, number][] = [
  [-63.8, -21.1],
  [-63.5, -21.3],
  [-63.1, -21.7],
  [-62.6, -22.0],
  [-62.0, -22.5],
  [-61.4, -23.2],
  [-60.6, -23.9],
  [-59.8, -24.5],
  [-59.0, -24.9],
  [-58.2, -25.4],
];

export interface Lugar {
  nombre: string;
  lon: number;
  lat: number;
  ancla: 'start' | 'end';
}

export const LUGARES: Lugar[] = [
  { nombre: 'Asunción', lon: -57.63, lat: -25.28, ancla: 'end' },
  { nombre: 'Concepción', lon: -57.43, lat: -23.4, ancla: 'end' },
  { nombre: 'Villa Montes', lon: -63.5, lat: -21.26, ancla: 'start' },
  { nombre: 'Isla Poí', lon: -59.35, lat: -23.45, ancla: 'start' },
];

/**
 * Posiciones aproximadas del frente en momentos clave.
 * Es una representación esquemática para entender el movimiento general de la guerra,
 * no un levantamiento topográfico.
 */
export const ETAPAS: EtapaFrente[] = [
  {
    fecha: '1932-06-15',
    titulo: 'El choque de Pitiantuta',
    texto: 'Un destacamento boliviano destruye el fortín paraguayo Carlos Antonio López. Es el comienzo de la guerra abierta.',
    lons: [-61.6, -61.4, -61.5, -61.8, -62.2, -62.6],
  },
  {
    fecha: '1932-07-31',
    titulo: 'Bolivia ocupa Boquerón',
    texto: 'Las fuerzas bolivianas avanzan hacia el este y toman el fortín de Boquerón, en el corazón del Chaco paraguayo.',
    lons: [-60.6, -60.5, -60.6, -61.2, -61.8, -62.4],
  },
  {
    fecha: '1932-09-29',
    titulo: 'Cae la guarnición de Boquerón',
    texto: 'Tras veinte días de cerco, sin agua ni munición, los defensores se rinden. Paraguay recupera la iniciativa.',
    lons: [-60.9, -60.8, -60.9, -61.3, -61.9, -62.4],
  },
  {
    fecha: '1933-01-26',
    titulo: 'Bolivia empuja hacia el sur',
    texto: 'Después de Kilómetro 7, Bolivia lleva la ofensiva al reducto de Nanawa. Los tres asaltos fracasan.',
    lons: [-61.0, -60.9, -60.8, -59.9, -59.9, -60.8],
  },
  {
    fecha: '1933-07-09',
    titulo: 'Segunda batalla de Nanawa',
    texto: 'El último intento boliviano de tomar Nanawa, con tanques y tanquetas, termina otra vez en fracaso.',
    lons: [-61.0, -60.9, -60.8, -59.9, -59.8, -60.7],
  },
  {
    fecha: '1933-12-11',
    titulo: 'Campo Vía',
    texto: 'Paraguay cerca a grandes fuerzas bolivianas. Las divisiones 4.ª y 9.ª se rinden. Kundt es relevado.',
    lons: [-61.4, -61.6, -61.9, -60.5, -60.2, -60.8],
  },
  {
    fecha: '1934-05-25',
    titulo: 'Cañada Strongest',
    texto: 'Bolivia tiende una emboscada y logra su mayor victoria de la guerra. No logra frenar el avance paraguayo.',
    lons: [-61.6, -62.0, -62.4, -61.3, -60.6, -61.0],
  },
  {
    fecha: '1934-11-11',
    titulo: 'El Carmen',
    texto: 'Dos divisiones bolivianas más se rinden. Dieciséis días después, los militares deponen a Salamanca.',
    lons: [-62.0, -62.5, -62.8, -61.9, -61.0, -61.3],
  },
  {
    fecha: '1934-12-10',
    titulo: 'A las puertas de Villa Montes',
    texto: 'La ofensiva paraguaya empuja a los bolivianos hacia los Andes y hacia Villa Montes.',
    lons: [-62.4, -63.0, -63.2, -62.6, -61.8, -61.8],
  },
  {
    fecha: '1935-04-19',
    titulo: 'Villa Montes resiste',
    texto: 'Bolivia contraataca, recupera Tarairí y elimina el saliente paraguayo. Villa Montes no cae.',
    lons: [-62.6, -63.0, -63.2, -62.8, -62.0, -62.0],
  },
  {
    fecha: '1935-06-14',
    titulo: 'Se callan las armas',
    texto: 'El 12 de junio se firma el cese formal de hostilidades en Buenos Aires. El 14, al mediodía, se oyen los últimos disparos.',
    lons: [-62.6, -63.0, -63.2, -62.8, -62.0, -62.0],
  },
];
