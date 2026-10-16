import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Narrador } from '../services/narrador';

@Component({
  selector: 'app-boton-escuchar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (narrador.disponible) {
      <button
        type="button"
        class="boton-escuchar"
        [attr.aria-pressed]="leyendo()"
        (click)="narrador.alternar(clave(), texto())"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3 7.5h3.2L10.5 4v12l-4.3-3.5H3z" />
          @if (leyendo()) {
            <path class="ondas" d="M13 6.5c1.5 1.1 1.5 5.9 0 7M15.5 4.5c2.8 2.3 2.8 8.7 0 11" />
          } @else {
            <path class="ondas" d="M13.2 7.2c1.1 1.5 1.1 4.1 0 5.6" />
          }
        </svg>
        <span>{{ leyendo() ? 'Detener lectura' : 'Escuchar' }}</span>
      </button>
    }
  `,
  styles: `
    .boton-escuchar {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.9rem;
      border: 1.5px solid currentColor;
      background: transparent;
      color: inherit;
      font: inherit;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
    }
    .boton-escuchar[aria-pressed='true'] {
      background: currentColor;
    }
    .boton-escuchar[aria-pressed='true'] span {
      color: var(--fondo-boton, #e3e6da);
    }
    svg {
      width: 1.15rem;
      height: 1.15rem;
      fill: currentColor;
    }
    .ondas {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
    }
    .boton-escuchar[aria-pressed='true'] svg {
      fill: var(--fondo-boton, #e3e6da);
    }
    .boton-escuchar[aria-pressed='true'] .ondas {
      stroke: var(--fondo-boton, #e3e6da);
    }
    .boton-escuchar:focus-visible {
      outline: 3px solid var(--quebracho, #8c2f1f);
      outline-offset: 2px;
    }
  `,
})
export class BotonEscuchar {
  readonly clave = input.required<string>();
  readonly texto = input.required<string>();

  protected readonly narrador = inject(Narrador);
  protected readonly leyendo = computed(() => this.narrador.activo() === this.clave());
}
