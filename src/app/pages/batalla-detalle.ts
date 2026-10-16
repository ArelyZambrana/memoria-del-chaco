import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BATALLAS, batallaPorId } from '../data/batallas';
import { Progreso } from '../services/progreso';
import { BotonEscuchar } from '../shared/boton-escuchar';
import { MapaFrente } from '../shared/mapa-frente';

@Component({
  selector: 'app-batalla-detalle',
  imports: [RouterLink, MapaFrente, BotonEscuchar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (batalla(); as b) {
      <article class="contenedor detalle">
        <nav class="migas" aria-label="Ruta de navegación">
          <a routerLink="/batallas">Batallas</a>
        </nav>

        <header class="encabezado" [attr.data-ganador]="b.ganador">
          <p class="fechas">{{ b.fechaTexto }}</p>
          <h1>{{ b.nombre }}</h1>
          <p class="resultado">{{ b.resultado }}. {{ b.lugar }}.</p>
          <app-boton-escuchar [clave]="b.id" [texto]="narracion()" />
        </header>

        <div class="columnas">
          <div class="prosa">
            <p class="entradilla">{{ b.resumen }}</p>

            <h2>Cómo se desarrolló</h2>
            @for (p of b.desarrollo; track $index) {
              <p>{{ p }}</p>
            }

            <h2>Por qué importa</h2>
            <p>{{ b.significado }}</p>

            @if (b.notas) {
              <p class="nota">{{ b.notas }}</p>
            }

            <h2>Fuentes consultadas</h2>
            <ul class="fuentes">
              @for (f of b.fuentes; track f.url) {
                <li><a [href]="f.url" target="_blank" rel="noopener">{{ f.titulo }}</a></li>
              }
            </ul>
          </div>

          <aside class="lateral" aria-label="Ficha de la batalla">
            <app-mapa-frente modo="mini" [resaltar]="b.id" />

            <dl class="ficha">
              <div>
                <dt>Comandantes de Bolivia</dt>
                <dd>
                  @for (c of b.comandantes.bolivia; track c) {
                    <span>{{ c }}</span>
                  } @empty {
                    <span>No consignados en las fuentes consultadas</span>
                  }
                </dd>
              </div>
              <div>
                <dt>Comandantes de Paraguay</dt>
                <dd>
                  @for (c of b.comandantes.paraguay; track c) {
                    <span>{{ c }}</span>
                  } @empty {
                    <span>No consignados en las fuentes consultadas</span>
                  }
                </dd>
              </div>
              @if (b.fuerzas) {
                <div>
                  <dt>Fuerzas</dt>
                  <dd>{{ b.fuerzas }}</dd>
                </div>
              }
              @if (b.bajas) {
                <div>
                  <dt>Bajas</dt>
                  <dd>{{ b.bajas }}</dd>
                </div>
              }
            </dl>

            @if (barras(); as bs) {
              <figure class="barras">
                <figcaption>{{ b.cifras!.etiqueta }} reportados. {{ b.cifras!.nota }}</figcaption>
                @for (barra of bs; track barra.bando) {
                  <div class="fila">
                    <span class="rotulo">{{ barra.nombre }}</span>
                    <span class="pista">
                      <span class="barra" [attr.data-bando]="barra.bando" [style.width.%]="barra.ancho"></span>
                    </span>
                    <span class="valor">{{ barra.texto }}</span>
                  </div>
                }
              </figure>
            }
          </aside>
        </div>

        <nav class="vecinas" aria-label="Batallas anterior y siguiente">
          @if (anterior(); as a) {
            <a [routerLink]="['/batallas', a.id]" class="previa"><span>Anterior</span>{{ a.nombre }}</a>
          } @else {
            <span></span>
          }
          @if (siguiente(); as s) {
            <a [routerLink]="['/batallas', s.id]" class="proxima"><span>Siguiente</span>{{ s.nombre }}</a>
          }
        </nav>
      </article>
    } @else {
      <div class="contenedor vacio">
        <h1>No encontramos esa batalla</h1>
        <p>La dirección no corresponde a ninguna batalla de esta enciclopedia.</p>
        <p><a routerLink="/batallas">Ver todas las batallas</a></p>
      </div>
    }
  `,
  styles: `
    .detalle {
      padding-block: 1.5rem 4rem;
    }
    .migas {
      margin-bottom: 1.5rem;
    }
    .encabezado {
      padding-left: 1.25rem;
      border-left: 10px solid var(--monte);
      margin-bottom: 2.5rem;
    }
    .encabezado[data-ganador='bolivia'] {
      border-left-color: var(--bolivia);
    }
    .encabezado[data-ganador='paraguay'] {
      border-left-color: var(--paraguay);
    }
    .fechas {
      margin: 0;
      font-weight: 650;
    }
    h1 {
      margin: 0.2rem 0 0.4rem;
      font-family: var(--fuente-estencil);
      font-size: clamp(2.2rem, 6vw, 4rem);
      line-height: 1.05;
    }
    .resultado {
      margin: 0 0 1rem;
      font-style: italic;
      color: var(--apagado);
    }
    .columnas {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 24rem);
      gap: 3rem;
      align-items: start;
    }
    .lateral {
      position: sticky;
      top: 5.5rem;
      display: grid;
      gap: 1.75rem;
    }
    .ficha {
      margin: 0;
      font-size: 0.97rem;
    }
    .ficha div {
      padding: 0.75rem 0;
      border-top: 1.5px solid var(--monte);
    }
    .ficha dt {
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    .ficha dd {
      margin: 0;
    }
    .ficha dd span {
      display: block;
    }
    .barras {
      margin: 0;
      padding-top: 0.75rem;
      border-top: 1.5px solid var(--monte);
    }
    .barras figcaption {
      font-weight: 700;
      margin-bottom: 0.6rem;
      font-size: 0.97rem;
    }
    .fila {
      display: grid;
      grid-template-columns: 4.5rem minmax(0, 1fr) 4rem;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.4rem;
    }
    .pista {
      display: block;
      height: 1.1rem;
      background: var(--salar-2);
    }
    .barra {
      display: block;
      height: 100%;
      background: var(--monte);
    }
    .barra[data-bando='bolivia'] {
      background: var(--bolivia);
    }
    .barra[data-bando='paraguay'] {
      background: var(--paraguay);
    }
    .valor {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .vecinas {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 3.5rem;
      padding-top: 1.5rem;
      border-top: 2px solid var(--monte);
    }
    .vecinas a {
      display: block;
      max-width: 20rem;
      font-size: 1.15rem;
      font-weight: 650;
    }
    .vecinas a span {
      display: block;
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--apagado);
    }
    .proxima {
      text-align: right;
      margin-left: auto;
    }
    .vacio {
      padding-block: 4rem;
    }
    @media (max-width: 60rem) {
      .columnas {
        grid-template-columns: 1fr;
      }
      .lateral {
        position: static;
      }
    }
  `,
})
export class BatallaDetalle {
  /** Parámetro «:id» de la ruta, enlazado con withComponentInputBinding. */
  readonly id = input.required<string>();

  private readonly progreso = inject(Progreso);

  protected readonly batalla = computed(() => batallaPorId(this.id()));

  protected readonly narracion = computed(() => {
    const b = this.batalla();
    if (!b) return '';
    return [b.nombre + '.', b.fechaTexto + '.', b.resumen, ...b.desarrollo, b.significado].join(' ');
  });

  protected readonly anterior = computed(() => {
    const i = BATALLAS.findIndex((b) => b.id === this.id());
    return i > 0 ? BATALLAS[i - 1] : undefined;
  });

  protected readonly siguiente = computed(() => {
    const i = BATALLAS.findIndex((b) => b.id === this.id());
    return i >= 0 && i < BATALLAS.length - 1 ? BATALLAS[i + 1] : undefined;
  });

  protected readonly barras = computed(() => {
    const c = this.batalla()?.cifras;
    if (!c) return null;
    const max = Math.max(c.bolivia, c.paraguay);
    const fmt = (n: number) => n.toLocaleString('es-BO');
    return [
      { bando: 'bolivia', nombre: 'Bolivia', ancho: (c.bolivia / max) * 100, texto: fmt(c.bolivia) },
      { bando: 'paraguay', nombre: 'Paraguay', ancho: (c.paraguay / max) * 100, texto: fmt(c.paraguay) },
    ];
  });

  constructor() {
    effect(() => {
      if (this.batalla()) this.progreso.marcarLeida(this.id());
    });
  }
}
