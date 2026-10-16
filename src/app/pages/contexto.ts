import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CONTEXTO } from '../data/contexto';
import { FUENTES } from '../data/fuentes';
import { BotonEscuchar } from '../shared/boton-escuchar';

@Component({
  selector: 'app-contexto',
  imports: [BotonEscuchar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Contexto</h1>
      <p class="intro">
        Por qué dos países pobres y poco poblados se enfrentaron en uno de los conflictos más sangrientos de Sudamérica
        en el siglo XX.
      </p>
      <app-boton-escuchar clave="contexto" [texto]="narracion()" />
    </header>

    <div class="contenedor diseno">
      <nav class="toc" aria-label="Secciones de esta página">
        <ul>
          @for (s of secciones; track s.id) {
            <li><a [href]="'#' + s.id" (click)="ir($event, s.id)">{{ s.titulo }}</a></li>
          }
        </ul>
      </nav>

      <div class="prosa">
        @for (s of secciones; track s.id) {
          <section [id]="s.id">
            <h2>{{ s.titulo }}</h2>
            @for (p of s.parrafos; track $index) {
              <p>{{ p }}</p>
            }
          </section>
        }

        <section id="fuentes">
          <h2>Fuentes consultadas</h2>
          <ul class="fuentes">
            @for (f of fuentes; track f.url) {
              <li><a [href]="f.url" target="_blank" rel="noopener">{{ f.titulo }}</a></li>
            }
          </ul>
        </section>
      </div>
    </div>
  `,
  styles: `
    .diseno {
      display: grid;
      grid-template-columns: 15rem minmax(0, 1fr);
      gap: 3rem;
      padding-block: 1.5rem 4rem;
    }
    .toc {
      position: sticky;
      top: 5.5rem;
      align-self: start;
      border-top: 2px solid var(--monte);
      padding-top: 1rem;
    }
    .toc ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 0.6rem;
    }
    .toc a {
      color: inherit;
      text-underline-offset: 3px;
    }
    .toc a:hover {
      color: var(--quebracho);
    }
    section {
      scroll-margin-top: 5.5rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 52rem) {
      .diseno {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .toc {
        position: static;
      }
    }
  `,
})
export class Contexto {
  protected readonly secciones = CONTEXTO;
  protected readonly fuentes = [
    FUENTES['britannica'],
    FUENTES['clem'],
    FUENTES['hispanopedia'],
    FUENTES['abcPaz'],
    FUENTES['ultimaHora'],
  ];

  protected readonly narracion = computed(() =>
    CONTEXTO.map((s) => s.titulo + '. ' + s.parrafos.join(' ')).join(' '),
  );

  /** Desplaza suavemente hasta la sección sin cambiar la ruta de Angular. */
  protected ir(evento: Event, id: string): void {
    evento.preventDefault();
    const destino = document.getElementById(id);
    if (!destino) return;
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    destino.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
    destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
  }
}
