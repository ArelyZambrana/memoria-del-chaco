export type Bando = 'bolivia' | 'paraguay';
export type Ganador = Bando | 'sin-ganador';
export type CategoriaEvento = 'antecedente' | 'militar' | 'politica' | 'diplomacia';

export interface Fuente {
  titulo: string;
  url: string;
}

export interface Evento {
  id: string;
  /** Fecha ISO (yyyy-mm-dd) usada solo para ordenar. */
  fecha: string;
  fechaTexto: string;
  titulo: string;
  resumen: string;
  categoria: CategoriaEvento;
  batallaId?: string;
}

export interface CifraComparada {
  etiqueta: string;
  bolivia: number;
  paraguay: number;
  nota: string;
}

export interface Batalla {
  id: string;
  nombre: string;
  inicio: string;
  fin: string;
  fechaTexto: string;
  lugar: string;
  ganador: Ganador;
  resultado: string;
  resumen: string;
  desarrollo: string[];
  comandantes: { bolivia: string[]; paraguay: string[] };
  fuerzas?: string;
  bajas?: string;
  cifras?: CifraComparada;
  significado: string;
  notas?: string;
  /** Posición aproximada, solo para el mapa esquemático. */
  posicion: { lon: number; lat: number };
  fuentes: Fuente[];
}

export type BandoPersonaje = Bando | 'mediacion';

export interface Personaje {
  id: string;
  nombre: string;
  bando: BandoPersonaje;
  cargo: string;
  vida: string;
  resumen: string;
  papel: string[];
}

export interface TerminoGlosario {
  termino: string;
  definicion: string;
}

export interface PreguntaQuiz {
  id: string;
  enunciado: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export interface SeccionContexto {
  id: string;
  titulo: string;
  parrafos: string[];
}

export interface EtapaFrente {
  fecha: string;
  titulo: string;
  texto: string;
  /** Longitudes del frente en seis latitudes, de norte a sur. */
  lons: number[];
}

export interface MedioArchivo {
  tipo: 'imagen' | 'video' | 'audio';
  titulo: string;
  descripcion: string;
  archivo: string;
  credito: string;
  licencia: string;
}
