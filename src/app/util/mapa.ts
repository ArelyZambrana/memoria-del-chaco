/**
 * Proyección sencilla (equirectangular) para el mapa esquemático del Chaco.
 * Cubre aproximadamente 64,4° O – 56,6° O y 19,2° S – 26,4° S.
 */
export const MAPA_ANCHO = 760;
export const MAPA_ALTO = 700;

const LON0 = -64.4;
const LAT0 = -19.2;
const KX = 97;
const KY = 105;

export interface Punto {
  x: number;
  y: number;
}

export function proyectar(lon: number, lat: number): Punto {
  return {
    x: Math.round((lon - LON0) * KX * 10) / 10,
    y: Math.round((LAT0 - lat) * KY * 10) / 10,
  };
}

/** Latitudes en las que se mide el frente, de norte a sur. */
export const LATS_FRENTE = [-19.6, -20.8, -22.0, -23.1, -24.1, -25.0];

export function trazo(puntos: Punto[]): string {
  return puntos.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
}
