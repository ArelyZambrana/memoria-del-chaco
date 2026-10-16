import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="contenedor pagina">
      <h1>Esta página no existe</h1>
      <p>La dirección que abriste no corresponde a ninguna sección de la enciclopedia.</p>
      <p><a routerLink="/">Volver al mapa del frente</a></p>
    </div>
  `,
  styles: `
    .pagina {
      padding-block: 4rem 6rem;
    }
    h1 {
      margin: 0 0 1rem;
      font-family: var(--fuente-estencil);
      font-size: clamp(2.2rem, 6vw, 3.5rem);
      line-height: 1.05;
    }
  `,
})
export class NoEncontrada {}
