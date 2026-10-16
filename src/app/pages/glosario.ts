import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GLOSARIO } from '../data/glosario';
import { normalizar } from '../util/texto';

@Component({
  selector: 'app-glosario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Glosario</h1>
      <p class="intro">Términos del monte, de la guerra y de la diplomacia que aparecen en esta enciclopedia.</p>
      <label class="campo">
        <span>Buscar un término</span>
        <input
          type="search"
          [value]="consulta()"
          (input)="consulta.set($any($event.target).value)"
          placeholder="Por ejemplo: picada"
          autocomplete="off"
        />
      </label>
    </header>

    <div class="contenedor cuerpo" aria-live="polite">
      @for (t of terminos(); track t.termino) {
        <dl class="entrada">
          <dt>{{ t.termino }}</dt>
          <dd>{{ t.definicion }}</dd>
        </dl>
      } @empty {
        <p>No hay términos que coincidan con «{{ consulta() }}».</p>
      }
    </div>
  `,
  styles: `
    .campo {
      display: grid;
      gap: 0.35rem;
      max-width: 26rem;
      margin-top: 1.5rem;
      font-weight: 600;
    }
    input {
      padding: 0.65rem 0.8rem;
      border: 2px solid var(--monte);
      background: var(--hueso);
      font: inherit;
      font-weight: 400;
      color: inherit;
    }
    input:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: 2px;
    }
    .cuerpo {
      padding-block: 1.5rem 4rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      gap: 0 3rem;
    }
    .entrada {
      margin: 0;
      padding: 1rem 0 1.25rem;
      border-top: 2px solid var(--monte);
    }
    dt {
      font-family: var(--fuente-estencil);
      font-size: 1.5rem;
      line-height: 1.15;
    }
    dd {
      margin: 0.35rem 0 0;
      max-width: 52ch;
    }
  `,
})
export class Glosario {
  protected readonly consulta = signal('');

  protected readonly terminos = computed(() => {
    const q = normalizar(this.consulta().trim());
    const ordenados = [...GLOSARIO].sort((a, b) => a.termino.localeCompare(b.termino, 'es'));
    if (!q) return ordenados;
    return ordenados.filter((t) => normalizar(t.termino + ' ' + t.definicion).includes(q));
  });
}
