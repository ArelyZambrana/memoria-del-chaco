import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PERSONAJES } from '../data/personajes';
import { BandoPersonaje } from '../models';

type Filtro = 'todos' | BandoPersonaje;

@Component({
  selector: 'app-personajes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Personajes</h1>
      <p class="intro">
        Presidentes, comandantes y mediadores. Abre cada nombre para ver qué hizo durante la guerra.
      </p>
      <div class="filtros" role="group" aria-label="Filtrar por bando">
        @for (f of filtros; track f.valor) {
          <button type="button" class="filtro" [attr.aria-pressed]="filtro() === f.valor" (click)="filtro.set(f.valor)">
            {{ f.texto }}
          </button>
        }
      </div>
    </header>

    <ul class="contenedor lista">
      @for (p of visibles(); track p.id) {
        <li [attr.data-bando]="p.bando">
          <details>
            <summary>
              <span class="nombre">{{ p.nombre }}</span>
              <span class="cargo">{{ p.cargo }}</span>
            </summary>
            <div class="detalle">
              <p class="vida">{{ p.vida }}</p>
              <p class="resumen">{{ p.resumen }}</p>
              <ul>
                @for (linea of p.papel; track $index) {
                  <li>{{ linea }}</li>
                }
              </ul>
            </div>
          </details>
        </li>
      } @empty {
        <li>No hay personajes en este grupo.</li>
      }
    </ul>
  `,
  styles: `
    .lista {
      margin: 0 auto;
      padding-block: 1.5rem 4rem;
      list-style: none;
    }
    .lista > li {
      border-top: 2px solid var(--monte);
      border-left: 8px solid var(--monte);
    }
    .lista > li[data-bando='bolivia'] {
      border-left-color: var(--bolivia);
    }
    .lista > li[data-bando='paraguay'] {
      border-left-color: var(--paraguay);
    }
    summary {
      display: grid;
      grid-template-columns: minmax(0, 20rem) minmax(0, 1fr);
      gap: 0.25rem 2rem;
      align-items: baseline;
      padding: 1rem 1.25rem;
      cursor: pointer;
      list-style: none;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary::after {
      content: '+';
      justify-self: end;
      grid-column: 3;
      grid-row: 1;
      font-size: 1.6rem;
      line-height: 1;
    }
    details[open] summary::after {
      content: '–';
    }
    summary:hover .nombre {
      color: var(--quebracho);
    }
    summary:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: -3px;
    }
    summary {
      grid-template-columns: minmax(0, 20rem) minmax(0, 1fr) auto;
    }
    .nombre {
      font-family: var(--fuente-estencil);
      font-size: 1.5rem;
      line-height: 1.15;
    }
    .cargo {
      color: var(--apagado);
    }
    .detalle {
      padding: 0 1.25rem 1.5rem;
      max-width: 46rem;
    }
    .vida {
      margin: 0 0 0.5rem;
      font-style: italic;
      color: var(--apagado);
    }
    .resumen {
      margin: 0 0 0.75rem;
      font-weight: 600;
    }
    .detalle ul {
      margin: 0;
      padding-left: 1.2rem;
    }
    .detalle li {
      margin-bottom: 0.4rem;
    }
    @media (max-width: 44rem) {
      summary {
        grid-template-columns: minmax(0, 1fr) auto;
      }
      summary::after {
        grid-column: 2;
        grid-row: 1;
      }
      .cargo {
        grid-column: 1 / -1;
      }
    }
  `,
})
export class Personajes {
  protected readonly filtro = signal<Filtro>('todos');

  protected readonly filtros: { valor: Filtro; texto: string }[] = [
    { valor: 'todos', texto: 'Todos' },
    { valor: 'bolivia', texto: 'Bolivia' },
    { valor: 'paraguay', texto: 'Paraguay' },
    { valor: 'mediacion', texto: 'Mediación' },
  ];

  protected readonly visibles = computed(() => {
    const f = this.filtro();
    return PERSONAJES.filter((p) => f === 'todos' || p.bando === f);
  });
}
