import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BATALLAS } from '../data/batallas';
import { MedioArchivo } from '../models';
import { BotonEscuchar } from '../shared/boton-escuchar';
import { Infografias } from '../shared/infografias';

@Component({
  selector: 'app-mediateca',
  imports: [Infografias, BotonEscuchar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="cabecera-pagina contenedor">
      <h1>Mediateca</h1>
      <p class="intro">
        Tres formas de recorrer la guerra sin leer: gráficos que se explican solos, narraciones en voz alta y un archivo
        de fotos, audio y video que puedes ampliar.
      </p>
    </header>

    <div class="contenedor cuerpo">
      <section aria-labelledby="t-info">
        <h2 id="t-info">Infografías</h2>
        <app-infografias />
      </section>

      <section aria-labelledby="t-voz">
        <h2 id="t-voz">Narraciones</h2>
        <p class="aviso">
          Tu navegador lee cada batalla con su voz sintética, sin descargar archivos de audio. Si no ves los botones, tu
          navegador no ofrece síntesis de voz.
        </p>
        <ul class="voces">
          @for (b of batallas; track b.id) {
            <li>
              <div>
                <strong>{{ b.nombre }}</strong>
                <span>{{ b.fechaTexto }}</span>
              </div>
              <app-boton-escuchar [clave]="'med-' + b.id" [texto]="narrar(b.id)" />
            </li>
          }
        </ul>
      </section>

      <section aria-labelledby="t-arch">
        <h2 id="t-arch">Archivo de fotos, audio y video</h2>
        @if (medios(); as lista) {
          @if (lista.length > 0) {
            <div class="galeria">
              @for (m of lista; track m.archivo) {
                <figure>
                  @switch (m.tipo) {
                    @case ('imagen') {
                      <img [src]="'media/' + m.archivo" [alt]="m.descripcion" loading="lazy" />
                    }
                    @case ('video') {
                      <video controls preload="metadata" [src]="'media/' + m.archivo"></video>
                    }
                    @case ('audio') {
                      <audio controls preload="metadata" [src]="'media/' + m.archivo"></audio>
                    }
                  }
                  <figcaption>
                    <strong>{{ m.titulo }}</strong>
                    <span>{{ m.descripcion }}</span>
                    <small>{{ m.credito }}. Licencia: {{ m.licencia }}.</small>
                  </figcaption>
                </figure>
              }
            </div>
          } @else {
            <div class="vacio">
              <p>
                Todavía no hay archivos en esta galería. Para agregar fotos históricas, audios o videos, copia los
                archivos en <code>public/media/</code> y descríbelos en <code>public/media/mediateca.json</code>.
              </p>
              <p>
                Usa solo material de dominio público o con licencia que permita reutilizarlo, e indica siempre la autoría.
                Las instrucciones y un ejemplo están en el archivo README del proyecto.
              </p>
            </div>
          }
        } @else {
          <p>Cargando archivo…</p>
        }
      </section>
    </div>
  `,
  styles: `
    .cuerpo {
      display: grid;
      gap: 4rem;
      padding-block: 1.5rem 4rem;
    }
    h2 {
      margin: 0 0 1.25rem;
      font-family: var(--fuente-estencil);
      font-size: clamp(1.7rem, 3vw, 2.3rem);
      line-height: 1.1;
    }
    .aviso {
      max-width: 62ch;
      margin: 0 0 1rem;
    }
    .voces {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
      gap: 0 3rem;
    }
    .voces li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.8rem 0;
      border-top: 1.5px solid var(--monte);
    }
    .voces strong,
    .voces span {
      display: block;
    }
    .voces span {
      color: var(--apagado);
      font-size: 0.93rem;
    }
    .galeria {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
      gap: 1.75rem;
    }
    figure {
      margin: 0;
    }
    img,
    video {
      display: block;
      width: 100%;
      height: auto;
      background: var(--monte);
    }
    audio {
      width: 100%;
    }
    figcaption {
      display: grid;
      gap: 0.2rem;
      margin-top: 0.5rem;
    }
    figcaption small {
      color: var(--apagado);
    }
    .vacio {
      padding: 1.25rem 1.5rem;
      border-left: 8px solid var(--polvo);
      background: var(--hueso);
      max-width: 52rem;
    }
    .vacio p {
      margin: 0 0 0.6rem;
    }
    .vacio p:last-child {
      margin: 0;
    }
    code {
      font-size: 0.92em;
      background: var(--salar-2);
      padding: 0.05rem 0.3rem;
    }
  `,
})
export class Mediateca {
  protected readonly batallas = BATALLAS;
  protected readonly medios = signal<MedioArchivo[] | null>(null);

  constructor() {
    fetch('media/mediateca.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((datos: unknown) => this.medios.set(Array.isArray(datos) ? (datos as MedioArchivo[]) : []))
      .catch(() => this.medios.set([]));
  }

  protected narrar(id: string): string {
    const b = BATALLAS.find((x) => x.id === id);
    if (!b) return '';
    return [b.nombre + '.', b.fechaTexto + '.', b.resumen, ...b.desarrollo, b.significado].join(' ');
  }
}
