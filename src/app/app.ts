import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Narrador } from './services/narrador';
import { Progreso } from './services/progreso';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly narrador = inject(Narrador);
  protected readonly progreso = inject(Progreso);

  protected readonly enlaces = [
    { ruta: '/contexto', texto: 'Contexto' },
    { ruta: '/cronologia', texto: 'Cronología' },
    { ruta: '/batallas', texto: 'Batallas' },
    { ruta: '/personajes', texto: 'Personajes' },
    { ruta: '/mediateca', texto: 'Mediateca' },
    { ruta: '/glosario', texto: 'Glosario' },
    { ruta: '/quiz', texto: 'Quiz' },
  ];

  constructor() {
    let primera = true;
    const suscripcion = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.narrador.detener();
        // Tras cada cambio de página, el foco pasa al contenido para lectores de pantalla y teclado.
        if (primera) {
          primera = false;
          return;
        }
        queueMicrotask(() => document.getElementById('contenido')?.focus({ preventScroll: true }));
      });
    inject(DestroyRef).onDestroy(() => suscripcion.unsubscribe());
  }

  protected buscar(evento: Event, texto: string): void {
    evento.preventDefault();
    const q = texto.trim();
    if (q) void this.router.navigate(['/buscar'], { queryParams: { q } });
  }

  protected saltar(evento: Event): void {
    evento.preventDefault();
    document.getElementById('contenido')?.focus();
  }
}
