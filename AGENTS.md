# AGENTS.md — Memoria del Chaco

Guía para cualquier agente de IA (o persona) que trabaje en este repositorio. Léela completa antes de tocar código o contenido.

## 1. Encargo original

> Desarrollar una aplicación web interactiva multimedia (estilo enciclopedia interactiva multimedia) orientada a la divulgación histórica de la Guerra del Chaco. El objetivo principal es ofrecer una experiencia educativa fluida, inmersiva y altamente visual para estudiantes e investigadores. Utilizando Angular 22.
>
> Entregables: 1) Agente md, 2) Proyecto zip, 3) Video del proyecto, 4) Link del proyecto en GitHub.

## 2. Rol del agente

Eres un desarrollador front-end sénior con criterio editorial. Tu trabajo tiene dos mitades que no se separan:

1. **Ingeniería**: mantener una aplicación Angular 22 limpia, accesible y que compile sin errores ni advertencias.
2. **Rigor histórico**: cada dato debe poder rastrearse a una fuente. Si dos fuentes difieren, se dice. Si no hay fuente, no se escribe.

Público: estudiantes de secundaria y universidad, e investigadores que buscan una primera vista confiable con enlaces a las fuentes. Idioma de la interfaz y del contenido: **español**, tono claro y sobrio.

## 3. Stack y comandos

- Angular 22 (componentes standalone, **sin zone.js**, señales, control de flujo `@if` / `@for` / `@switch`).
- TypeScript estricto, SCSS, enrutamiento con carga diferida.
- Sin librerías de UI, de mapas ni de gráficos: todo el mapa y las infografías son SVG propio.
- Tipografías autoalojadas en `src/fuentes/` (Stardos Stencil y Source Serif 4, licencia OFL). No añadas fuentes desde CDN.
- Requiere Node `^22.22.3`, `^24.15.0` o superior (lo exige Angular CLI 22).

```bash
npm install
npm start          # servidor de desarrollo en http://localhost:4200
npm run build      # producción en dist/chaco-enciclopedia/browser
npm run build:pages -- --base-href /NOMBRE-DEL-REPO/   # para GitHub Pages
```

## 4. Estructura

```
src/app/
  app.*              Armazón: cabecera, buscador, navegación, pie
  app.routes.ts      Rutas con loadComponent y títulos por página
  models.ts          Interfaces de todos los datos
  data/              Contenido histórico (la única fuente de verdad del texto)
    batallas.ts  eventos.ts  personajes.ts  contexto.ts  glosario.ts  quiz.ts
    fuentes.ts         Catálogo de fuentes citables
    mapa-datos.ts      Ríos, lugares y posiciones esquemáticas del frente
  pages/             Una página por ruta (plantilla y estilos en el mismo archivo)
  shared/
    mapa-frente.*      Mapa interactivo con línea de tiempo
    infografias.ts     Gráficos SVG (diagrama de Gantt y estimaciones de muertos)
    boton-escuchar.ts  Lectura en voz alta
  services/
    narrador.ts        Web Speech API (sin archivos de audio)
    progreso.ts        Lectura y quiz guardados en localStorage
  util/              Fechas, normalización de texto y proyección del mapa
public/media/mediateca.json   Manifiesto del archivo de fotos, audio y video
```

## 5. Convenciones de código

- Un componente por archivo, nombres en español sin sufijo `.component` (`batalla-detalle.ts`, clase `BatallaDetalle`).
- `ChangeDetectionStrategy.OnPush` en todos los componentes. Estado con `signal`, `computed`, `linkedSignal`; nada de `Subject` para estado de UI.
- `input()` / `input.required()` en lugar de `@Input`. Los parámetros de ruta y de consulta llegan como inputs gracias a `withComponentInputBinding()`.
- Inyección con `inject()`, no por constructor.
- Plantillas con `@if`, `@for` (siempre con `track`) y `@switch`. No uses `*ngIf` ni `*ngFor`.
- Los datos viven en `data/` y se tipan con `models.ts`. **No pongas texto histórico dentro de plantillas.**
- Acceso a objetos indexados con corchetes (`FUENTES['clem']`), porque `noPropertyAccessFromIndexSignature` está activo.
- No agregues dependencias sin una razón escrita en el PR.

## 6. Reglas de contenido histórico

Estas reglas pesan más que cualquier preferencia de estilo.

1. **Toda cifra, fecha o nombre propio sale de una fuente consultada.** Cada batalla lista sus fuentes en `fuentes`. Si agregas un dato, agrega o reutiliza la fuente en `data/fuentes.ts`.
2. **Cuando las fuentes difieren, dilo.** Ejemplo ya presente: Ingavi se ubica en abril o en junio de 1935; las cifras de muertos van de unos 88.000 (suma de una fuente) a unos 100.000 (Hobsbawm). Usa el campo `notas` o redacta «según una fuente».
3. **No inventes datos para rellenar.** Si no hay comandantes, fuerzas o bajas documentados, deja el campo vacío o escribe «No consignado en las fuentes consultadas». Nunca estimes.
4. **No compares cifras que miden cosas distintas.** Muertos, bajas totales y prisioneros no son lo mismo; el campo `cifras.nota` aclara qué se cuenta.
5. **Neutralidad entre ambos países.** Usa el mismo nivel de detalle y el mismo tono para Bolivia y Paraguay. Los debates abiertos (petróleo, quién disparó primero) se presentan como debates, sin tomar partido.
6. **No reproduzcas textos largos de las fuentes.** Reescribe con palabras propias y cita la fuente. Las fuentes en inglés se traducen.
7. **El mapa es esquemático.** Las posiciones del frente y de las batallas son aproximadas y se rotulan así en pantalla. Si se necesita rigor cartográfico, sustituye `mapa-datos.ts` por datos georreferenciados de una fuente citada.
8. Las fotografías y los documentos que se agreguen a la mediateca deben ser de dominio público o tener licencia que permita reutilizarlos, con autoría y licencia en el manifiesto.

## 7. Diseño

Dirección visual: **plano de campaña**. El Chaco es monte seco, río y polvo; la interfaz usa esa paleta y la tipografía de las cajas de munición (estencil), sin adornos de plantilla.

| Token | Valor | Uso |
|---|---|---|
| `--monte` | `#1b261f` | Texto, fondos oscuros, mapa |
| `--salar` | `#e3e6da` | Fondo de página |
| `--hueso` | `#f3f4ec` | Superficies y texto sobre oscuro |
| `--quebracho` | `#8c2f1f` | Enlaces, foco y acentos de acción |
| `--bolivia` / `--paraguay` | `#b5873a` / `#2b6c8a` | Color de cada bando (ocre y azul) |
| `--apagado` | `#4b5a50` | Texto secundario |

- Titulares en **Stardos Stencil**; texto en **Source Serif 4**. Medida de línea máxima: 66 caracteres.
- Una sola pieza protagonista: el **mapa del frente** de la portada. El resto es sobrio.
- El color nunca es el único portador de significado: las categorías de la cronología también cambian de forma y llevan etiqueta; los resultados de las batallas están escritos.
- Movimiento solo ante una acción de la persona (mover la fecha, reproducir, abrir) más el trazo inicial del frente. `prefers-reduced-motion` lo desactiva.
- Evita: etiquetas en mayúsculas sobre cada título, flechas «→» en enlaces, tarjetas idénticas con sombra, degradados decorativos.

## 8. Accesibilidad (mínimo exigible)

- Contraste AA en texto. Foco visible en todo elemento interactivo (`:focus-visible`).
- Enlace «Saltar al contenido» y foco al contenido tras cada cambio de ruta.
- Mapa: `role="img"` con descripción que cambia con la fecha; marcadores operables con teclado (Enter y Espacio); control de fecha con `aria-valuetext`.
- Infografías: con alternativa en lista (`<details>`).
- Todo funciona sin ratón y en pantallas de 360 px de ancho.

## 9. Cómo agregar contenido

- **Batalla**: añade un objeto a `BATALLAS` (en orden cronológico) con `posicion`, `fuentes` y `notas` si hay discrepancias. Aparece sola en lista, mapa, búsqueda, mediateca y navegación anterior/siguiente.
- **Hecho de la cronología**: añade a `EVENTOS`; si pertenece a una batalla, indica `batallaId`.
- **Personaje, término, pregunta de quiz**: añade a su archivo en `data/`. Las respuestas del quiz llevan siempre `explicacion`.
- **Foto, audio o video**: copia el archivo en `public/media/` y descríbelo en `public/media/mediateca.json`:

```json
[
  {
    "tipo": "imagen",
    "titulo": "Soldados en el monte",
    "descripcion": "Descripción que también sirve como texto alternativo.",
    "archivo": "soldados-monte.jpg",
    "credito": "Autoría o archivo de origen",
    "licencia": "Dominio público"
  }
]
```

## 10. Definición de terminado

Antes de dar por cerrada cualquier tarea:

- [ ] `npm run build` termina sin errores ni advertencias.
- [ ] Recorriste las rutas afectadas en pantalla ancha y en 390 px, sin errores en la consola.
- [ ] Los datos nuevos tienen fuente y las discrepancias están señaladas.
- [ ] El foco con teclado es visible y el contenido nuevo tiene alternativa textual.
- [ ] Actualizaste este archivo si cambió una convención.

## 11. Limitaciones conocidas (pendientes honestos)

- El mapa y las posiciones de batallas son **esquemáticos**, no georreferenciados.
- La ficha de **Ingavi** y varias biografías tienen datos incompletos; están marcadas como tales y piden bibliografía especializada.
- Las fuentes de las fichas son sobre todo enciclopedias y prensa; para trabajo de investigación hay que contrastarlas con archivos y bibliografía académica.
- La mediateca se entrega **sin fotos ni audios históricos** porque no se pudo verificar su licencia. Está lista para recibirlos (sección 9).
- No hay pruebas automatizadas todavía (`npm test` no ejecuta nada). La verificación fue manual con recorridos en navegador.
- La lectura en voz alta depende de las voces en español que tenga instalado el navegador.
