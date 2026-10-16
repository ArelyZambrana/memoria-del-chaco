import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ETIQUETAS_CATEGORIA, EVENTOS } from '../data/eventos';
import { Evento } from '../models';

type Filtro = 'todos' | Evento['categoria'];

@Component({
  selector: 'app-cronologia',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Cronología</h1>
      <p class="intro">
        Los antecedentes, la guerra y la paz, de 1879 a 2009. Filtra por tipo de hecho para seguir un solo hilo.
      </p>
      <div class="filtros" role="group" aria-label="Filtrar por tipo de hecho">
        @for (f of filtros; track f.valor) {
          <button
            type="button"
            class="filtro"
            [attr.aria-pressed]="filtro() === f.valor"
            (click)="filtro.set(f.valor)"
          >
            {{ f.texto }}
          </button>
        }
      </div>
    </header>

    <div class="contenedor cuerpo">
      @for (g of grupos(); track g.anio) {
        <section class="anio" [attr.aria-labelledby]="'a' + g.anio">
          <h2 [id]="'a' + g.anio">{{ g.anio }}</h2>
          <ol class="linea">
            @for (e of g.eventos; track e.id) {
              <li [attr.data-categoria]="e.categoria">
                <p class="meta">
                  <time>{{ e.fechaTexto }}</time>
                  <span class="categoria">{{ etiqueta(e.categoria) }}</span>
                </p>
                <h3>{{ e.titulo }}</h3>
                <p>{{ e.resumen }}</p>
                @if (e.batallaId) {
                  <a [routerLink]="['/batallas', e.batallaId]">Leer la batalla</a>
                }
              </li>
            }
          </ol>
        </section>
      } @empty {
        <p>No hay hechos de este tipo.</p>
      }
    </div>
  `,
  styles: `
    .cuerpo {
      padding-block: 1rem 4rem;
    }
    .anio {
      display: grid;
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: 0 2rem;
      padding-top: 2rem;
    }
    .anio h2 {
      position: sticky;
      top: 5.5rem;
      align-self: start;
      margin: 0;
      font-family: var(--fuente-estencil);
      font-size: 2.2rem;
      line-height: 1;
    }
    .linea {
      margin: 0;
      padding: 0 0 0 1.75rem;
      list-style: none;
      border-left: 3px solid var(--monte);
    }
    .linea li {
      position: relative;
      padding: 0 0 2rem;
      max-width: 40rem;
    }
    .linea li::before {
      content: '';
      position: absolute;
      left: calc(-1.75rem - 9px);
      top: 0.35rem;
      width: 15px;
      height: 15px;
      background: var(--salar);
      border: 4px solid var(--monte);
    }
    li[data-categoria='militar']::before {
      background: var(--quebracho);
      border-color: var(--quebracho);
    }
    li[data-categoria='politica']::before {
      background: var(--monte);
      border-radius: 50%;
    }
    li[data-categoria='diplomacia']::before {
      background: var(--rio);
      border-color: var(--rio);
      transform: rotate(45deg);
    }
    li[data-categoria='antecedente']::before {
      background: var(--salar);
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0 1rem;
      margin: 0;
      font-size: 0.95rem;
    }
    time {
      font-weight: 700;
    }
    .categoria {
      color: var(--apagado);
      font-style: italic;
    }
    h3 {
      margin: 0.2rem 0 0.35rem;
      font-size: 1.3rem;
      line-height: 1.25;
    }
    li p:not(.meta) {
      margin: 0 0 0.5rem;
      max-width: 62ch;
    }
    @media (max-width: 40rem) {
      .anio {
        grid-template-columns: 1fr;
      }
      .anio h2 {
        position: static;
        margin-bottom: 1rem;
      }
    }
  `,
})
export class Cronologia {
  protected readonly filtro = signal<Filtro>('todos');

  protected readonly filtros: { valor: Filtro; texto: string }[] = [
    { valor: 'todos', texto: 'Todos' },
    { valor: 'antecedente', texto: 'Antecedentes' },
    { valor: 'militar', texto: 'Militar' },
    { valor: 'politica', texto: 'Política' },
    { valor: 'diplomacia', texto: 'Diplomacia' },
  ];

  protected readonly grupos = computed(() => {
    const f = this.filtro();
    const visibles = EVENTOS.filter((e) => f === 'todos' || e.categoria === f).sort((a, b) =>
      a.fecha.localeCompare(b.fecha),
    );
    const porAnio = new Map<string, Evento[]>();
    for (const e of visibles) {
      const anio = e.fecha.slice(0, 4);
      porAnio.set(anio, [...(porAnio.get(anio) ?? []), e]);
    }
    return [...porAnio.entries()].map(([anio, eventos]) => ({ anio, eventos }));
  });

  protected etiqueta(categoria: string): string {
    return ETIQUETAS_CATEGORIA[categoria] ?? categoria;
  }
}
