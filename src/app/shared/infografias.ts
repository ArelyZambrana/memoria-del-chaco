import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BATALLAS } from '../data/batallas';
import { DIA_MS, msDe } from '../util/fecha';

const T0 = msDe('1932-06-01');
const T1 = msDe('1935-07-01');
const ANCHO = 900;
const IZQ = 250;
const DER = 24;
const SUP = 40;
const FILA = 38;
const PLOT = ANCHO - IZQ - DER;

function xDe(ms: number): number {
  return Math.round((IZQ + ((ms - T0) / (T1 - T0)) * PLOT) * 10) / 10;
}

const GANTT = BATALLAS.map((b, i) => {
  const x1 = xDe(msDe(b.inicio));
  const x2 = xDe(msDe(b.fin) + DIA_MS);
  return {
    id: b.id,
    nombre: b.nombre.replace(/ \(.*\)/, ''),
    fechas: b.fechaTexto,
    ganador: b.ganador,
    x: x1,
    ancho: Math.max(x2 - x1, 8),
    y: SUP + i * FILA,
  };
});

const ANIOS = [1932, 1933, 1934, 1935].map((anio) => ({
  anio,
  x: Math.max(IZQ, xDe(msDe(`${anio}-01-01`))),
}));

/** Estimaciones de muertos y bajas según tres fuentes distintas. */
const IZQ2 = 330;
const PLOT2 = 450;
const MAX2 = 90000;
const x2De = (v: number) => IZQ2 + (v / MAX2) * PLOT2;

const ESTIMACIONES = [
  { bando: 'bolivia', rotulo: 'Bolivia: muertos en combate', desde: 0, hasta: 52397, texto: 'más de 52.000' },
  { bando: 'paraguay', rotulo: 'Paraguay: muertos en combate', desde: 0, hasta: 36000, texto: 'unos 36.000' },
  { bando: 'bolivia', rotulo: 'Bolivia: muertos y heridos', desde: 60000, hasta: 80000, texto: '60.000 a 80.000' },
  { bando: 'paraguay', rotulo: 'Paraguay: muertos y heridos', desde: 30000, hasta: 50000, texto: '30.000 a 50.000' },
].map((e, i) => ({
  ...e,
  x: x2De(e.desde),
  ancho: x2De(e.hasta) - x2De(e.desde),
  xTexto: x2De(e.hasta) + 10,
  y: 28 + i * 48,
}));

const EJE2 = [0, 30000, 60000, 90000].map((v) => ({ v, x: x2De(v), texto: v.toLocaleString('es-BO') }));

@Component({
  selector: 'app-infografias',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="grafico">
      <figcaption>
        <h3>Cuándo se libró cada batalla</h3>
        <p>Cada barra va del inicio al final del combate. Color ocre: victoria boliviana. Azul: paraguaya. Gris: sin ganador definido.</p>
      </figcaption>
      <div class="desplazable" tabindex="0" role="group" aria-label="Gráfico de barras, desplazable en pantallas pequeñas">
        <svg [attr.viewBox]="'0 0 ' + ancho + ' ' + altoGantt" role="img" aria-labelledby="g1-titulo">
          <title id="g1-titulo">Duración de las diez batallas entre junio de 1932 y junio de 1935</title>
          @for (a of anios; track a.anio) {
            <line class="guia" [attr.x1]="a.x" [attr.x2]="a.x" y1="24" [attr.y2]="altoGantt - 6" />
            <text class="anio" [attr.x]="a.x + 6" y="18">{{ a.anio }}</text>
          }
          @for (f of gantt; track f.id) {
            <text class="etiqueta" [attr.x]="izq - 12" [attr.y]="f.y + 13" text-anchor="end">{{ f.nombre }}</text>
            <rect class="barra" [attr.data-ganador]="f.ganador" [attr.x]="f.x" [attr.y]="f.y" [attr.width]="f.ancho" height="18">
              <title>{{ f.nombre }}: {{ f.fechas }}</title>
            </rect>
          }
        </svg>
      </div>
      <details>
        <summary>Ver los datos como lista</summary>
        <ul>
          @for (f of gantt; track f.id) {
            <li>{{ f.nombre }}: {{ f.fechas }}</li>
          }
        </ul>
      </details>
    </figure>

    <figure class="grafico">
      <figcaption>
        <h3>Cuántos murieron: las fuentes no coinciden</h3>
        <p>
          Las estimaciones varían según qué se cuente y quién lo cuente. Las barras largas muestran muertos en combate
          (Andrew Clem); los tramos flotantes, rangos de muertos y heridos (ABC Color). El historiador Eric Hobsbawm
          calcula unos 100.000 muertos en total.
        </p>
      </figcaption>
      <div class="desplazable" tabindex="0" role="group" aria-label="Gráfico de estimaciones, desplazable en pantallas pequeñas">
        <svg viewBox="0 0 900 232" role="img" aria-labelledby="g2-titulo">
          <title id="g2-titulo">Estimaciones de muertos y bajas por país</title>
          @for (t of eje2; track t.v) {
            <line class="guia" [attr.x1]="t.x" [attr.x2]="t.x" y1="10" y2="208" />
            <text class="anio" [attr.x]="t.x" y="226" text-anchor="middle">{{ t.texto }}</text>
          }
          @for (e of estimaciones; track e.rotulo) {
            <text class="etiqueta" [attr.x]="izq2 - 12" [attr.y]="e.y + 17" text-anchor="end">{{ e.rotulo }}</text>
            <rect class="barra" [attr.data-ganador]="e.bando" [attr.x]="e.x" [attr.y]="e.y" [attr.width]="e.ancho" height="26" />
            <text class="valor" [attr.x]="e.xTexto" [attr.y]="e.y + 18">{{ e.texto }}</text>
          }
        </svg>
      </div>
    </figure>
  `,
  styles: `
    :host {
      display: grid;
      gap: 3rem;
    }
    .grafico {
      margin: 0;
    }
    h3 {
      margin: 0 0 0.35rem;
      font-family: var(--fuente-estencil);
      font-size: 1.6rem;
      line-height: 1.15;
    }
    figcaption p {
      margin: 0 0 1rem;
      max-width: 70ch;
    }
    .desplazable {
      overflow-x: auto;
      border: 2px solid var(--monte);
      background: var(--hueso);
    }
    .desplazable:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: 2px;
    }
    svg {
      display: block;
      width: 100%;
      min-width: 44rem;
      height: auto;
    }
    .guia {
      stroke: var(--borde);
      stroke-width: 1.5;
    }
    .anio {
      font-family: var(--fuente-texto);
      font-size: 14px;
      font-weight: 650;
      fill: var(--monte);
    }
    .etiqueta {
      font-family: var(--fuente-texto);
      font-size: 14px;
      fill: var(--monte);
    }
    .valor {
      font-family: var(--fuente-texto);
      font-size: 14px;
      font-weight: 650;
      fill: var(--monte);
    }
    .barra {
      fill: #8a8f84;
    }
    .barra[data-ganador='bolivia'] {
      fill: var(--bolivia);
    }
    .barra[data-ganador='paraguay'] {
      fill: var(--paraguay);
    }
    details {
      margin-top: 0.75rem;
    }
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    summary:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: 2px;
    }
    details ul {
      margin: 0.5rem 0 0;
      padding-left: 1.2rem;
    }
  `,
})
export class Infografias {
  protected readonly ancho = ANCHO;
  protected readonly izq = IZQ;
  protected readonly izq2 = IZQ2;
  protected readonly altoGantt = SUP + GANTT.length * FILA + 10;
  protected readonly gantt = GANTT;
  protected readonly anios = ANIOS;
  protected readonly estimaciones = ESTIMACIONES;
  protected readonly eje2 = EJE2;
}
