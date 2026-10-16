const formato = new Intl.DateTimeFormat('es-BO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const DIA_MS = 86_400_000;

/** Convierte una fecha ISO (yyyy-mm-dd) en milisegundos UTC. */
export function msDe(iso: string): number {
  return Date.parse(iso + 'T00:00:00Z');
}

export function formatearFecha(ms: number): string {
  return formato.format(new Date(ms));
}
