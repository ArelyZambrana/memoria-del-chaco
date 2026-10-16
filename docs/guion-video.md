# Guion del video — Memoria del Chaco

Duración objetivo: 3 a 4 minutos. Graba la pantalla a 1280×720 o más y narra encima. El video de demostración que acompaña al proyecto (`demo-memoria-del-chaco.mp4`) es mudo y sirve de referencia del recorrido.

## 1. Portada y mapa del frente (0:00–1:00)

- Muestra la portada. Di qué es: una enciclopedia interactiva sobre la Guerra del Chaco (1932-1935), hecha con Angular 22.
- Pulsa «Reproducir»: el frente se desplaza entre junio de 1932 y junio de 1935. Pausa a mitad del recorrido.
- Arrastra la fecha. Señala que las marcas son batallas, de color según el bando que ganó.
- Haz clic en una marca: se abre el resumen. Aclara en voz alta que **el mapa es esquemático**, no georreferenciado.

## 2. Una batalla (1:00–1:45)

- Entra a una ficha (por ejemplo Boquerón o Cañada Strongest).
- Muestra comandantes, fuerzas y bajas, el mapa pequeño y las fuentes.
- Señala la nota donde dos fuentes no coinciden: es una regla del proyecto, las discrepancias se dicen.
- Pulsa «Escuchar» (lectura en voz alta con la voz del navegador) y baja a «Anterior / Siguiente».

## 3. Cronología, personajes, contexto (1:45–2:30)

- Cronología: filtra por tipo de hecho.
- Personajes: escribe «Boquerón» en el buscador.
- Contexto y glosario: menciona que están escritos con neutralidad entre Bolivia y Paraguay.

## 4. Mediateca y quiz (2:30–3:15)

- Mediateca: infografías SVG (diagrama de Gantt de batallas y rango de estimaciones de muertos). Di que el archivo de fotos y audio está vacío porque no se pudo verificar la licencia de material histórico, y que ya está listo para recibirlo.
- Quiz: responde una pregunta y muestra la explicación.

## 5. Cierre técnico (3:15–3:45)

- Angular 22: componentes standalone, sin zone.js, señales, rutas con carga diferida.
- Sin librerías de mapas ni gráficos: todo en SVG propio.
- Accesibilidad: teclado, foco visible, «Saltar al contenido», funciona desde 360 px.
- Publicación: GitHub Pages con GitHub Actions. Muestra la URL final del repositorio.
- Limitaciones honestas: mapa esquemático, ficha de Ingavi y algunas biografías incompletas, sin pruebas automatizadas.
