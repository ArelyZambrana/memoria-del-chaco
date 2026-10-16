import { Injectable, signal } from '@angular/core';

/**
 * Lee textos en voz alta con la síntesis de voz del navegador (Web Speech API).
 * No necesita archivos de audio ni conexión a servicios externos.
 */
@Injectable({ providedIn: 'root' })
export class Narrador {
  readonly disponible = typeof window !== 'undefined' && 'speechSynthesis' in window;
  /** Identificador del texto que se está leyendo, o null. */
  readonly activo = signal<string | null>(null);

  alternar(id: string, texto: string): void {
    if (!this.disponible) return;
    if (this.activo() === id) {
      this.detener();
      return;
    }
    this.leer(id, texto);
  }

  detener(): void {
    if (!this.disponible) return;
    window.speechSynthesis.cancel();
    this.activo.set(null);
  }

  private leer(id: string, texto: string): void {
    window.speechSynthesis.cancel();
    const trozos = this.partir(texto);
    if (trozos.length === 0) return;

    const voz = this.elegirVoz();
    this.activo.set(id);

    trozos.forEach((trozo, i) => {
      const dicho = new SpeechSynthesisUtterance(trozo);
      dicho.lang = voz?.lang ?? 'es-ES';
      if (voz) dicho.voice = voz;
      dicho.rate = 0.95;
      const ultimo = i === trozos.length - 1;
      dicho.onend = () => {
        if (ultimo && this.activo() === id) this.activo.set(null);
      };
      dicho.onerror = () => {
        if (this.activo() === id) this.activo.set(null);
      };
      window.speechSynthesis.speak(dicho);
    });
  }

  private elegirVoz(): SpeechSynthesisVoice | undefined {
    const voces = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('es'));
    return (
      voces.find((v) => v.lang.toLowerCase().startsWith('es-bo')) ??
      voces.find((v) => /es-(419|mx|us|ar)/i.test(v.lang)) ??
      voces[0]
    );
  }

  /** Parte el texto en frases de longitud moderada: algunos navegadores cortan las locuciones largas. */
  private partir(texto: string): string[] {
    const frases = texto.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]*/g) ?? [];
    const trozos: string[] = [];
    let actual = '';
    for (const frase of frases) {
      if ((actual + frase).length > 220 && actual) {
        trozos.push(actual.trim());
        actual = frase;
      } else {
        actual += frase;
      }
    }
    if (actual.trim()) trozos.push(actual.trim());
    return trozos;
  }
}
