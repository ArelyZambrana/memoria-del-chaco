import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BATALLAS } from '../data/batallas';
import { Ganador } from '../models';
import { Progreso } from '../services/progreso';

type Filtro = 'todas' | Ganador;

@Component({
  selector: 'app-batallas',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Batallas</h1>
      <p class="intro">
        Diez combates entre 1932 y 1935, en orden cronológico. El color de la barra indica quién se quedó con el campo:
        ocre para Bolivia, azul para Paraguay.
      </p>
      <div class="filtros" role="group" aria-label="Filtrar por resultado">
        @for (f of filtros; track f.valor) {
          <button type="button" class="filtro" [attr.aria-pressed]="filtro() === f.valor" (click)="filtro.set(f.valor)">
            {{ f.texto }}
          </button>
        }
      </div>
    </header>

    <ul class="contenedor lista">
      @for (b of visibles(); track b.id) {
        <li [attr.data-ganador]="b.ganador">
          <a [routerLink]="['/batallas', b.id]">
            <span class="fechas">{{ b.fechaTexto }}</span>
            <span class="nombre">{{ b.nombre }}</span>
            <span class="resultado">{{ b.resultado }}</span>
            <span class="resumen">{{ b.resumen }}</span>
            @if (leidas().includes(b.id)) {
              <span class="leida">Ya la leíste</span>
            }
          </a>
        </li>
      } @empty {
        <li>No hay batallas con ese resultado.</li>
      }
    </ul>
  `,
  styles: `
    .lista {
      margin: 0 auto;
      padding-block: 1.5rem 4rem;
      list-style: none;
    }
    li {
      border-left: 8px solid var(--monte);
      margin-bottom: 1rem;
      background: var(--hueso);
    }
    li[data-ganador='bolivia'] {
      border-left-color: var(--bolivia);
    }
    li[data-ganador='paraguay'] {
      border-left-color: var(--paraguay);
    }
    a {
      display: grid;
      grid-template-columns: 14rem minmax(0, 1fr);
      grid-template-areas:
        'fechas nombre'
        'resultado resumen'
        '. leida';
      gap: 0.25rem 2rem;
      padding: 1.25rem 1.5rem;
      color: inherit;
      text-decoration: none;
    }
    a:hover .nombre {
      color: var(--quebracho);
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
    }
    a:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: 2px;
    }
    .fechas {
      grid-area: fechas;
      font-weight: 650;
    }
    .nombre {
      grid-area: nombre;
      font-family: var(--fuente-estencil);
      font-size: 1.6rem;
      line-height: 1.15;
    }
    .resultado {
      grid-area: resultado;
      font-style: italic;
      color: var(--apagado);
    }
    .resumen {
      grid-area: resumen;
      max-width: 62ch;
    }
    .leida {
      grid-area: leida;
      font-size: 0.9rem;
      color: var(--rio-texto);
      font-weight: 600;
    }
    @media (max-width: 44rem) {
      a {
        grid-template-columns: 1fr;
        grid-template-areas: 'fechas' 'nombre' 'resultado' 'resumen' 'leida';
      }
    }
  `,
})
export class Batallas {
  private readonly progreso = inject(Progreso);
  protected readonly leidas = this.progreso.leidas;
  protected readonly filtro = signal<Filtro>('todas');

  protected readonly filtros: { valor: Filtro; texto: string }[] = [
    { valor: 'todas', texto: 'Todas' },
    { valor: 'paraguay', texto: 'Victoria paraguaya' },
    { valor: 'bolivia', texto: 'Victoria boliviana' },
    { valor: 'sin-ganador', texto: 'Sin ganador definido' },
  ];

  protected readonly visibles = computed(() => {
    const f = this.filtro();
    return BATALLAS.filter((b) => f === 'todas' || b.ganador === f);
  });
}
