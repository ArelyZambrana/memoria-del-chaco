import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BotonEscuchar } from '../shared/boton-escuchar';
import { MapaFrente } from '../shared/mapa-frente';

const RESUMEN_NARRADO =
  'La Guerra del Chaco enfrentó a Bolivia y Paraguay entre 1932 y 1935 por el control del Chaco Boreal, una extensa región de monte entre el río Pilcomayo y el río Paraguay. ' +
  'Comenzó con el choque de Pitiantuta, en junio de 1932. Paraguay ganó batallas decisivas como Boquerón, Nanawa y Campo Vía. Bolivia logró victorias como Cañada Strongest y resistió en Villa Montes. ' +
  'Las armas callaron el 14 de junio de 1935. El Tratado de Paz, Amistad y Límites, firmado en 1938, dividió la zona en disputa: cerca de tres cuartas partes quedaron bajo soberanía paraguaya. ' +
  'La guerra dejó cerca de cien mil muertos entre ambos países, según el historiador Eric Hobsbawm.';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, MapaFrente, BotonEscuchar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="heroe">
      <div class="contenedor-ancho">
        <app-mapa-frente>
          <h1>Guerra del Chaco</h1>
          <p class="bajada">
            Tres años de combates entre Bolivia y Paraguay por el Chaco Boreal, de 1932 a 1935. Mueve la fecha y mira cómo
            se desplazó el frente.
          </p>
          <app-boton-escuchar clave="inicio" [texto]="resumen" />
        </app-mapa-frente>
      </div>
    </section>

    <section class="contenedor indice">
      <h2>Por dónde empezar</h2>
      <ul class="lista-indice">
        @for (e of entradas; track e.ruta) {
          <li>
            <a [routerLink]="e.ruta">
              <strong>{{ e.titulo }}</strong>
              <span>{{ e.descripcion }}</span>
            </a>
          </li>
        }
      </ul>
    </section>

    <section class="contenedor ruta">
      <h2>Ruta de lectura en seis paradas</h2>
      <p class="intro-ruta">Si tienes pocos minutos, sigue las paradas en este orden: cuentan la guerra de principio a fin.</p>
      <ol>
        @for (p of paradas; track p.ruta) {
          <li>
            <a [routerLink]="p.ruta">{{ p.titulo }}</a>
            <span>{{ p.nota }}</span>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .heroe {
      background: var(--monte);
      color: var(--hueso);
      padding: clamp(2rem, 5vw, 3.5rem) 0 clamp(2rem, 4vw, 3rem);
    }
    h1 {
      margin: 0;
      font-family: var(--fuente-estencil);
      font-size: clamp(2.6rem, 6vw, 4.8rem);
      line-height: 1;
      letter-spacing: 0.01em;
    }
    .bajada {
      margin: 1rem 0 1.25rem;
      max-width: 44ch;
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      line-height: 1.5;
    }
    app-boton-escuchar {
      --fondo-boton: var(--monte);
      --quebracho: var(--hueso);
    }
    .indice,
    .ruta {
      padding-block: clamp(2.5rem, 5vw, 4rem) 0;
    }
    .ruta {
      padding-bottom: clamp(3rem, 6vw, 5rem);
    }
    h2 {
      margin: 0 0 1.5rem;
      font-family: var(--fuente-estencil);
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      line-height: 1.1;
    }
    .lista-indice {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
      gap: 0 3rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .lista-indice a {
      display: block;
      padding: 1.1rem 0;
      border-top: 2px solid var(--monte);
      color: inherit;
      text-decoration: none;
    }
    .lista-indice strong {
      display: block;
      font-size: 1.25rem;
      font-weight: 650;
    }
    .lista-indice span {
      display: block;
      margin-top: 0.2rem;
      color: var(--apagado);
      max-width: 34ch;
    }
    .lista-indice a:hover strong {
      color: var(--quebracho);
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
    }
    .lista-indice a:focus-visible {
      outline: 3px solid var(--quebracho);
      outline-offset: -3px;
    }
    .intro-ruta {
      max-width: 54ch;
      margin: -0.75rem 0 1.5rem;
    }
    ol {
      margin: 0;
      padding: 0;
      list-style: none;
      counter-reset: parada;
      max-width: 46rem;
    }
    ol li {
      display: grid;
      grid-template-columns: 2.5rem minmax(0, 1fr);
      grid-template-areas: 'n enlace' '. nota';
      padding: 0.9rem 0;
      border-top: 1px solid var(--borde);
      counter-increment: parada;
    }
    ol li::before {
      content: counter(parada);
      grid-area: n;
      font-family: var(--fuente-estencil);
      font-size: 1.5rem;
      color: var(--quebracho);
      line-height: 1.2;
    }
    ol a {
      grid-area: enlace;
      font-size: 1.15rem;
      font-weight: 650;
    }
    ol span {
      grid-area: nota;
      color: var(--apagado);
    }
  `,
})
export class Inicio {
  protected readonly resumen = RESUMEN_NARRADO;

  protected readonly entradas = [
    { ruta: '/contexto', titulo: 'Contexto', descripcion: 'Por qué se disputó el Chaco y cómo llegaron a la guerra los dos ejércitos.' },
    { ruta: '/cronologia', titulo: 'Cronología', descripcion: 'Los hechos de 1879 a 2009, filtrables por tipo.' },
    { ruta: '/batallas', titulo: 'Batallas', descripcion: 'Diez combates con fechas, comandantes, cifras y mapa.' },
    { ruta: '/personajes', titulo: 'Personajes', descripcion: 'Presidentes, comandantes y mediadores de ambos bandos.' },
    { ruta: '/mediateca', titulo: 'Mediateca', descripcion: 'Infografías, narraciones en voz alta y archivo multimedia.' },
    { ruta: '/glosario', titulo: 'Glosario', descripcion: 'Quince términos del monte, la guerra y la diplomacia.' },
    { ruta: '/quiz', titulo: 'Quiz', descripcion: 'Doce preguntas para comprobar lo que aprendiste.' },
  ];

  protected readonly paradas = [
    { ruta: '/contexto', titulo: 'El conflicto de fondo', nota: 'Una frontera sin trazar y la búsqueda de una salida.' },
    { ruta: '/batallas/pitiantuta', titulo: 'Pitiantuta', nota: 'El choque que convirtió los incidentes en guerra.' },
    { ruta: '/batallas/boqueron', titulo: 'Boquerón', nota: 'La primera gran batalla, decidida por la sed.' },
    { ruta: '/batallas/nanawa-1', titulo: 'Nanawa', nota: 'El «Verdún sudamericano».' },
    { ruta: '/batallas/campo-via', titulo: 'Campo Vía', nota: 'Dos divisiones cercadas en el monte.' },
    { ruta: '/batallas/villa-montes', titulo: 'Villa Montes y la paz', nota: 'La resistencia final y el cese del fuego.' },
  ];
}
