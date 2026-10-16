import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PREGUNTAS } from '../data/quiz';
import { Progreso } from '../services/progreso';

@Component({
  selector: 'app-quiz',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Quiz</h1>
      <p class="intro">
        Doce preguntas sobre lo que leíste. Después de cada respuesta verás la explicación.
        @if (mejor() !== null) {
          Tu mejor resultado hasta ahora: {{ mejor() }} de {{ total }}.
        }
      </p>
    </header>

    <div class="contenedor cuerpo">
      @if (!terminado()) {
        @if (pregunta(); as p) {
          <section aria-labelledby="enunciado">
            <p class="avance" aria-live="polite">Pregunta {{ indice() + 1 }} de {{ total }}</p>
            <progress [max]="total" [value]="indice() + (respondida() ? 1 : 0)" aria-label="Avance del quiz"></progress>

            <h2 id="enunciado">{{ p.enunciado }}</h2>

            <ul class="opciones">
              @for (o of p.opciones; track $index) {
                <li>
                  <button
                    type="button"
                    [disabled]="respondida()"
                    [attr.data-estado]="estado($index)"
                    (click)="responder($index)"
                  >
                    <span class="letra">{{ letras[$index] }}</span>
                    <span>{{ o }}</span>
                  </button>
                </li>
              }
            </ul>

            @if (respondida()) {
              <div class="explicacion" role="status" [attr.data-acierto]="acerto()">
                <p class="veredicto">{{ acerto() ? 'Correcto.' : 'No es esa.' }}</p>
                <p>{{ p.explicacion }}</p>
                <button type="button" class="siguiente" (click)="avanzar()">
                  {{ indice() + 1 === total ? 'Ver resultado' : 'Siguiente pregunta' }}
                </button>
              </div>
            }
          </section>
        }
      } @else {
        <section class="resultado" aria-live="polite">
          <h2>Obtuviste {{ puntaje() }} de {{ total }}</h2>
          <p>{{ mensaje() }}</p>
          <div class="acciones">
            <button type="button" class="siguiente" (click)="reiniciar()">Intentarlo de nuevo</button>
            <a routerLink="/batallas">Repasar las batallas</a>
          </div>
        </section>
      }
    </div>
  `,
  styles: `
    .cuerpo {
      padding-block: 1.5rem 4rem;
      max-width: 46rem;
      margin-inline: 0;
    }
    .avance {
      margin: 0 0 0.4rem;
      font-weight: 650;
    }
    progress {
      width: 100%;
      height: 0.6rem;
      accent-color: var(--quebracho);
    }
    h2 {
      margin: 1.5rem 0 1.25rem;
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      line-height: 1.3;
      font-weight: 650;
    }
    .opciones {
      display: grid;
      gap: 0.75rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .opciones button {
      display: grid;
      grid-template-columns: 2rem minmax(0, 1fr);
      gap: 0.75rem;
      align-items: baseline;
      width: 100%;
      padding: 0.85rem 1rem;
      border: 2px solid var(--monte);
      background: var(--hueso);
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .opciones button:not(:disabled):hover {
      background: var(--salar-2);
    }
    .opciones button:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: 2px;
    }
    .opciones button:disabled {
      cursor: default;
    }
    .letra {
      font-family: var(--fuente-estencil);
      font-size: 1.2rem;
    }
    button[data-estado='correcta'] {
      background: var(--monte);
      color: var(--hueso);
    }
    button[data-estado='incorrecta'] {
      border-style: dashed;
      border-color: var(--quebracho);
      color: var(--quebracho);
      text-decoration: line-through;
    }
    .explicacion {
      margin-top: 1.5rem;
      padding: 1rem 1.25rem;
      border-left: 8px solid var(--quebracho);
      background: var(--hueso);
    }
    .explicacion[data-acierto='true'] {
      border-left-color: var(--monte);
    }
    .veredicto {
      margin: 0 0 0.25rem;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .explicacion p {
      margin: 0 0 0.75rem;
    }
    .siguiente {
      padding: 0.65rem 1.1rem;
      border: 2px solid var(--monte);
      background: var(--monte);
      color: var(--hueso);
      font: inherit;
      font-weight: 650;
      cursor: pointer;
    }
    .siguiente:hover {
      background: var(--quebracho);
      border-color: var(--quebracho);
    }
    .siguiente:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: 2px;
    }
    .resultado h2 {
      font-family: var(--fuente-estencil);
      font-size: clamp(2rem, 5vw, 3rem);
      margin-top: 0;
    }
    .acciones {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
  `,
})
export class Quiz {
  private readonly progreso = inject(Progreso);

  protected readonly total = PREGUNTAS.length;
  protected readonly letras = ['A', 'B', 'C', 'D'];
  protected readonly mejor = this.progreso.mejorQuiz;

  protected readonly indice = signal(0);
  protected readonly elegida = signal<number | null>(null);
  protected readonly puntaje = signal(0);
  protected readonly terminado = signal(false);

  protected readonly pregunta = computed(() => PREGUNTAS[this.indice()]);
  protected readonly respondida = computed(() => this.elegida() !== null);
  protected readonly acerto = computed(() => this.elegida() === this.pregunta()?.correcta);

  protected readonly mensaje = computed(() => {
    const p = this.puntaje();
    if (p === this.total) return 'Respuestas perfectas. Conoces bien la guerra y sus fechas clave.';
    if (p >= this.total * 0.75) return 'Muy buen resultado. Repasa las batallas que fallaste para completar el panorama.';
    if (p >= this.total * 0.5) return 'Vas por buen camino. La cronología y las batallas te ayudarán a afianzar lo que falta.';
    return 'Todavía hay mucho por descubrir. Prueba la ruta de lectura de la página de inicio y vuelve a intentarlo.';
  });

  protected estado(i: number): 'correcta' | 'incorrecta' | null {
    if (!this.respondida()) return null;
    if (i === this.pregunta().correcta) return 'correcta';
    if (i === this.elegida()) return 'incorrecta';
    return null;
  }

  protected responder(i: number): void {
    if (this.respondida()) return;
    this.elegida.set(i);
    if (i === this.pregunta().correcta) this.puntaje.update((p) => p + 1);
  }

  protected avanzar(): void {
    if (this.indice() + 1 >= this.total) {
      this.terminado.set(true);
      this.progreso.registrarQuiz(this.puntaje());
      return;
    }
    this.indice.update((i) => i + 1);
    this.elegida.set(null);
  }

  protected reiniciar(): void {
    this.indice.set(0);
    this.elegida.set(null);
    this.puntaje.set(0);
    this.terminado.set(false);
  }
}
