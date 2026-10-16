# Memoria del Chaco

Enciclopedia interactiva multimedia sobre la **Guerra del Chaco (1932-1935)**, hecha con **Angular 22**.

Qué incluye:

- **Mapa del frente** en la portada: mueve la fecha o pulsa «Reproducir» y mira cómo se desplazó el frente. Cada marca es una batalla.
- **Cronología** de 1879 a 2009, filtrable por tipo de hecho.
- **Diez batallas** con fechas, comandantes, fuerzas, bajas, mapa y fuentes.
- **Personajes**, **contexto** y **glosario**.
- **Mediateca**: infografías en SVG, lectura en voz alta de cada batalla y un archivo de fotos, audio y video que puedes ampliar.
- **Quiz** de doce preguntas con explicación y **buscador** sobre todo el contenido.

El contenido sale de fuentes públicas que se citan en cada ficha; donde difieren, se indica.

## Requisitos

- Node.js `^22.22.3`, `^24.15.0` o superior (lo exige Angular CLI 22)
- npm 10 o superior

## Uso

```bash
npm install
npm start          # http://localhost:4200
npm run build      # genera dist/chaco-enciclopedia/browser
```

## Publicar en GitHub Pages

1. Crea un repositorio vacío en GitHub y súbelo:

   ```bash
   git init
   git add .
   git commit -m "Enciclopedia interactiva de la Guerra del Chaco"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada `push` a `main` ejecuta `.github/workflows/deploy.yml`, que compila y publica. La dirección será
   `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

Para probar el empaquetado de Pages en tu computadora: `npm run build:pages -- --base-href /NOMBRE-DEL-REPO/`.
El script copia `index.html` a `404.html` para que las rutas profundas funcionen al recargar.

## Agregar fotos, audio o video

Copia los archivos en `public/media/` y descríbelos en `public/media/mediateca.json` (ejemplo en [AGENTS.md](AGENTS.md#9-cómo-agregar-contenido)). Usa solo material de dominio público o con licencia que permita reutilizarlo e indica la autoría.

## Estructura

Está descrita en [AGENTS.md](AGENTS.md), junto con las convenciones de código, las reglas de contenido histórico, el diseño y la lista de pendientes.

## Licencias

Código del proyecto: el que elijas al publicarlo. Tipografías Stardos Stencil y Source Serif 4: SIL Open Font License 1.1 (ver `src/fuentes/`).
