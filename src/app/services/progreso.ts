import { Injectable, signal } from '@angular/core';

const CLAVE_LEIDAS = 'chaco:leidas';
const CLAVE_QUIZ = 'chaco:mejor-quiz';

function leer<T>(clave: string, porDefecto: T): T {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

function guardar(clave: string, valor: unknown): void {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    /* El almacenamiento puede estar bloqueado: la app sigue funcionando sin guardar. */
  }
}

/** Recuerda en el navegador qué batallas se leyeron y el mejor puntaje del quiz. */
@Injectable({ providedIn: 'root' })
export class Progreso {
  readonly leidas = signal<string[]>(leer<string[]>(CLAVE_LEIDAS, []));
  readonly mejorQuiz = signal<number | null>(leer<number | null>(CLAVE_QUIZ, null));

  marcarLeida(id: string): void {
    if (this.leidas().includes(id)) return;
    const nuevas = [...this.leidas(), id];
    this.leidas.set(nuevas);
    guardar(CLAVE_LEIDAS, nuevas);
  }

  registrarQuiz(puntaje: number): void {
    const mejor = this.mejorQuiz();
    if (mejor === null || puntaje > mejor) {
      this.mejorQuiz.set(puntaje);
      guardar(CLAVE_QUIZ, puntaje);
    }
  }

  reiniciar(): void {
    this.leidas.set([]);
    this.mejorQuiz.set(null);
    guardar(CLAVE_LEIDAS, []);
    guardar(CLAVE_QUIZ, null);
  }
}
