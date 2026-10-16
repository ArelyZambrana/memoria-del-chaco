import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BATALLAS } from '../data/batallas';
import { CONTEXTO } from '../data/contexto';
import { EVENTOS } from '../data/eventos';
import { GLOSARIO } from '../data/glosario';
import { PERSONAJES } from '../data/personajes';
import { normalizar } from '../util/texto';

interface Entrada {
  tipo: string;
  titulo: string;
  extracto: string;
  enlace: string[];
  titulado: string;
  cuerpo: string;
}

function crear(tipo: string, titulo: string, extracto: string, cuerpo: string, enlace: string[]): Entrada {
  return { tipo, titulo, extracto, enlace, titulado: normalizar(titulo), cuerpo: normalizar(titulo + ' ' + cuerpo) };
}

const INDICE: Entrada[] = [
  ...BATALLAS.map((b) =>
    crear(
      'Batalla',
      b.nombre,
      b.resumen,
      [b.resumen, ...b.desarrollo, b.significado, ...b.comandantes.bolivia, ...b.comandantes.paraguay].join(' '),
      ['/batallas', b.id],
    ),
  ),
  ...EVENTOS.map((e) => crear('Cronología', e.titulo + ' (' + e.fechaTexto + ')', e.resumen, e.resumen, ['/cronologia'])),
  ...PERSONAJES.map((p) =>
    crear('Personaje', p.nombre, p.cargo + '. ' + p.resumen, [p.cargo, p.resumen, ...p.papel].join(' '), ['/personajes']),
  ),
  ...GLOSARIO.map((t) => crear('Glosario', t.termino, t.definicion, t.definicion, ['/glosario'])),
  ...CONTEXTO.map((s) => crear('Contexto', s.titulo, s.parrafos[0], s.parrafos.join(' '), ['/contexto'])),
];

@Component({
  selector: 'app-buscar',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Buscar</h1>
      <form (submit)="enviar($event)" role="search">
        <label>
          <span>Busca un lugar, una fecha, un nombre o un término</span>
          <input
            type="search"
            [value]="texto()"
            (input)="texto.set($any($event.target).value)"
            placeholder="Por ejemplo: Boquerón"
            autocomplete="off"
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
    </header>

    <div class="contenedor cuerpo" aria-live="polite">
      @if (consulta().trim().length < 2) {
        <p>Escribe al menos dos letras para buscar.</p>
      } @else {
        <p class="cuenta">{{ resultados().length }} resultado{{ resultados().length === 1 ? '' : 's' }} para «{{ consulta() }}»</p>
        <ul>
          @for (r of resultados(); track r.tipo + r.titulo) {
            <li>
              <a [routerLink]="r.enlace">
                <span class="tipo">{{ r.tipo }}</span>
                <span class="titulo">{{ r.titulo }}</span>
                <span class="extracto">{{ r.extracto }}</span>
              </a>
            </li>
          } @empty {
            <li class="sin">No encontramos nada. Prueba con otra palabra o revisa la ortografía.</li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    form {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    label {
      display: grid;
      gap: 0.35rem;
      font-weight: 600;
      flex: 1 1 22rem;
      max-width: 34rem;
    }
    input {
      padding: 0.7rem 0.8rem;
      border: 2px solid var(--monte);
      background: var(--hueso);
      font: inherit;
      font-weight: 400;
      color: inherit;
    }
    input:focus-visible,
    button:focus-visible,
    a:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: 2px;
    }
    button {
      padding: 0.75rem 1.2rem;
      border: 2px solid var(--monte);
      background: var(--monte);
      color: var(--hueso);
      font: inherit;
      font-weight: 650;
      cursor: pointer;
    }
    button:hover {
      background: var(--quebracho);
      border-color: var(--quebracho);
    }
    .cuerpo {
      padding-block: 1.5rem 4rem;
    }
    .cuenta {
      font-weight: 650;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      max-width: 52rem;
    }
    li a {
      display: grid;
      gap: 0.15rem;
      padding: 1rem 0;
      border-top: 1.5px solid var(--monte);
      color: inherit;
      text-decoration: none;
    }
    li a:hover .titulo {
      color: var(--quebracho);
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    .tipo {
      font-size: 0.9rem;
      color: var(--apagado);
      font-style: italic;
    }
    .titulo {
      font-family: var(--fuente-estencil);
      font-size: 1.4rem;
      line-height: 1.15;
    }
    .extracto {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-width: 62ch;
    }
  `,
})
export class Buscar {
  /** Parámetro «?q=», enlazado con withComponentInputBinding. */
  readonly q = input<string>('');

  private readonly router = inject(Router);
  protected readonly texto = linkedSignal(() => this.q());
  protected readonly consulta = computed(() => this.q());

  protected readonly resultados = computed(() => {
    const q = normalizar(this.consulta().trim());
    if (q.length < 2) return [];
    return INDICE.map((e) => ({ e, puntos: (e.titulado.includes(q) ? 3 : 0) + (e.cuerpo.includes(q) ? 1 : 0) }))
      .filter((x) => x.puntos > 0)
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, 40)
      .map((x) => x.e);
  });

  protected enviar(evento: Event): void {
    evento.preventDefault();
    void this.router.navigate(['/buscar'], { queryParams: { q: this.texto().trim() } });
  }
}
