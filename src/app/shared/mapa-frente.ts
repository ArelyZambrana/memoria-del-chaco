import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BATALLAS, batallaPorId } from '../data/batallas';
import { ETAPAS, LUGARES, RIO_PARAGUAY, RIO_PILCOMAYO } from '../data/mapa-datos';
import { DIA_MS, formatearFecha, msDe } from '../util/fecha';
import { LATS_FRENTE, MAPA_ALTO, MAPA_ANCHO, Punto, proyectar, trazo } from '../util/mapa';

const T0 = msDe('1932-06-15');
const T1 = msDe('1935-06-30');
const TOTAL_DIAS = Math.round((T1 - T0) / DIA_MS);

const ETAPAS_MS = ETAPAS.map((e) => ({ ...e, ms: msDe(e.fecha) }));

const MARCADORES = BATALLAS.map((b) => ({
  id: b.id,
  nombre: b.nombre,
  ganador: b.ganador,
  inicioMs: msDe(b.inicio),
  ...proyectar(b.posicion.lon, b.posicion.lat),
}));

const MARCAS_TIEMPO = MARCADORES.map((m) => ({
  id: m.id,
  izq: ((m.inicioMs - T0) / (T1 - T0)) * 100,
}));

const ANIOS = [1932, 1933, 1934, 1935].map((anio) => ({
  anio,
  izq: Math.max(0, ((msDe(`${anio}-01-01`) - T0) / (T1 - T0)) * 100),
}));

/** Cuadrícula de referencia cada grado de longitud y latitud. */
const GRILLA = [
  ...[-64, -63, -62, -61, -60, -59, -58, -57].map((lon) => {
    const a = proyectar(lon, -19.2);
    const b = proyectar(lon, -26.4);
    return { id: `lon${lon}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  }),
  ...[-20, -21, -22, -23, -24, -25, -26].map((lat) => {
    const a = proyectar(-64.4, lat);
    const b = proyectar(-56.6, lat);
    return { id: `lat${lat}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  }),
];

@Component({
  selector: 'app-mapa-frente',
  imports: [RouterLink],
  templateUrl: './mapa-frente.html',
  styleUrl: './mapa-frente.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapaFrente {
  /** «completo» incluye la línea de tiempo y el panel; «mini» solo el mapa. */
  readonly modo = input<'completo' | 'mini'>('completo');
  /** En modo mini, la batalla que se resalta. */
  readonly resaltar = input<string | null>(null);

  protected readonly ancho = MAPA_ANCHO;
  protected readonly alto = MAPA_ALTO;
  protected readonly totalDias = TOTAL_DIAS;
  protected readonly anios = ANIOS;
  protected readonly marcasTiempo = MARCAS_TIEMPO;
  protected readonly grilla = GRILLA;
  protected readonly rioParaguay = trazo(RIO_PARAGUAY.map(([lon, lat]) => proyectar(lon, lat)));
  protected readonly rioPilcomayo = trazo(RIO_PILCOMAYO.map(([lon, lat]) => proyectar(lon, lat)));
  protected readonly lugares = LUGARES.map((l) => ({ ...l, ...proyectar(l.lon, l.lat) }));
  protected readonly textoBolivia = proyectar(-64.0, -19.9);
  protected readonly textoParaguay = proyectar(-59.6, -20.4);
  protected readonly textoArgentina = proyectar(-63.2, -25.4);

  protected readonly dias = signal(0);
  protected readonly reproduciendo = signal(false);
  private readonly elegida = signal<string | null>(null);
  private temporizador: ReturnType<typeof setInterval> | null = null;

  private readonly fechaMs = computed(() => {
    if (this.modo() === 'mini') {
      const b = this.resaltar() ? batallaPorId(this.resaltar()!) : undefined;
      return b ? msDe(b.fin) : T1;
    }
    return T0 + this.dias() * DIA_MS;
  });

  protected readonly fechaTexto = computed(() => formatearFecha(this.fechaMs()));

  protected readonly etapa = computed(() => {
    const t = this.fechaMs();
    let actual = ETAPAS_MS[0];
    for (const e of ETAPAS_MS) {
      if (e.ms <= t) actual = e;
    }
    return actual;
  });

  protected readonly etapaFecha = computed(() => formatearFecha(this.etapa().ms));

  protected readonly batallaActiva = computed(() => {
    const id = this.elegida();
    if (id) return batallaPorId(id);
    const t = this.fechaMs();
    const visibles = BATALLAS.filter((b) => msDe(b.inicio) <= t);
    return visibles.length ? visibles[visibles.length - 1] : undefined;
  });

  private readonly puntosFrente = computed<Punto[]>(() => {
    const t = this.fechaMs();
    let i = 0;
    while (i < ETAPAS_MS.length - 1 && ETAPAS_MS[i + 1].ms <= t) i++;
    const a = ETAPAS_MS[i];
    const b = ETAPAS_MS[Math.min(i + 1, ETAPAS_MS.length - 1)];
    const f = a === b || t <= a.ms ? 0 : Math.min(1, (t - a.ms) / (b.ms - a.ms));
    return LATS_FRENTE.map((lat, k) => proyectar(a.lons[k] + (b.lons[k] - a.lons[k]) * f, lat));
  });

  protected readonly frente = computed(() => trazo(this.puntosFrente()));

  protected readonly zonaBolivia = computed(() => {
    const p = this.puntosFrente();
    return `M0,0 L${p[0].x},0 ${trazo(p).replace('M', 'L')} L${p[p.length - 1].x},${MAPA_ALTO} L0,${MAPA_ALTO} Z`;
  });

  protected readonly zonaParaguay = computed(() => {
    const p = this.puntosFrente();
    return `M${MAPA_ANCHO},0 L${p[0].x},0 ${trazo(p).replace('M', 'L')} L${p[p.length - 1].x},${MAPA_ALTO} L${MAPA_ANCHO},${MAPA_ALTO} Z`;
  });

  protected readonly marcadores = computed(() => {
    const t = this.fechaMs();
    const mini = this.modo() === 'mini';
    const activa = mini ? this.resaltar() : this.batallaActiva()?.id;
    return MARCADORES.map((m) => ({
      ...m,
      visible: mini || m.inicioMs <= t,
      activa: m.id === activa,
      tenue: mini && m.id !== activa,
    }));
  });

  protected readonly descripcion = computed(
    () =>
      `Mapa esquemático del Chaco Boreal al ${this.fechaTexto()}. ${this.etapa().titulo}: ${this.etapa().texto}`,
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => this.detener());
  }

  protected alMover(evento: Event): void {
    this.detener();
    this.elegida.set(null);
    this.dias.set((evento.target as HTMLInputElement).valueAsNumber);
  }

  protected alternarReproduccion(): void {
    if (this.reproduciendo()) {
      this.detener();
      return;
    }
    this.elegida.set(null);
    if (this.dias() >= TOTAL_DIAS) this.dias.set(0);
    this.reproduciendo.set(true);
    this.temporizador = setInterval(() => {
      const siguiente = this.dias() + 4;
      if (siguiente >= TOTAL_DIAS) {
        this.dias.set(TOTAL_DIAS);
        this.detener();
      } else {
        this.dias.set(siguiente);
      }
    }, 50);
  }

  protected irA(id: string): void {
    if (this.modo() === 'mini') return;
    const b = batallaPorId(id);
    if (!b) return;
    this.detener();
    this.elegida.set(id);
    this.dias.set(Math.min(TOTAL_DIAS, Math.max(0, Math.round((msDe(b.inicio) - T0) / DIA_MS))));
  }

  private detener(): void {
    if (this.temporizador !== null) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
    this.reproduciendo.set(false);
  }
}
