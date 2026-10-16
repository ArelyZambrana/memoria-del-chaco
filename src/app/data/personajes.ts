import { Personaje } from '../models';

export const PERSONAJES: Personaje[] = [
  {
    id: 'salamanca',
    nombre: 'Daniel Salamanca',
    bando: 'bolivia',
    cargo: 'Presidente de Bolivia',
    vida: 'Cochabamba, 1869 – Cochabamba, 1935',
    resumen:
      'Gobernó Bolivia del 5 de marzo de 1931 hasta ser depuesto en noviembre de 1934, en plena guerra.',
    papel: [
      'Reavivó las tensiones con Paraguay y ordenó ampliar los fortines en el Chaco.',
      'Su relación con el alto mando militar fue difícil. A fines de 1933 reemplazó a Hans Kundt por Enrique Peñaranda.',
      'El 27 de noviembre de 1934, los militares lo arrestaron en Villa Montes y lo obligaron a renunciar. Se retiró a Cochabamba y murió en julio de 1935, pocos días después del cese del fuego.',
    ],
  },
  {
    id: 'kundt',
    nombre: 'Hans Kundt',
    bando: 'bolivia',
    cargo: 'Comandante en jefe del ejército boliviano (1932 – 1933)',
    vida: 'Neustrelitz, 1869 – Lugano, 1939',
    resumen:
      'Militar alemán que reorganizó el ejército boliviano según el modelo prusiano y volvió a dirigirlo al comenzar la guerra.',
    papel: [
      'Llegó a Bolivia en 1908 como jefe de una misión militar alemana y se nacionalizó boliviano.',
      'Impulsó la compra de armamento moderno, incluidos tanques, que resultaron casi inútiles en el monte.',
      'Ordenó ataques frontales contra posiciones bien defendidas, como en Nanawa, y no resolvió los problemas de agua y logística.',
      'Fue relevado el 12 de diciembre de 1933, tras la derrota de Campo Vía.',
    ],
  },
  {
    id: 'penaranda',
    nombre: 'Enrique Peñaranda',
    bando: 'bolivia',
    cargo: 'Comandante en jefe del ejército boliviano desde fines de 1933; presidente 1940 – 1943',
    vida: 'Sorata, 1892 – Madrid, 1969',
    resumen:
      'Asumió el mando del ejército tras Campo Vía y dirigió la victoria boliviana de Cañada Strongest.',
    papel: [
      'Como coronel participó en 1932 en el ataque al fortín Carlos Antonio López.',
      'Salamanca lo ascendió a general y lo nombró comandante en jefe tras la derrota de Campo Vía.',
      'Fue uno de los generales que participaron en el golpe del 27 de noviembre de 1934.',
      'Más tarde fue presidente de Bolivia, del 15 de abril de 1940 al 20 de diciembre de 1943.',
    ],
  },
  {
    id: 'bilbao-rioja',
    nombre: 'Bernardino Bilbao Rioja',
    bando: 'bolivia',
    cargo: 'Comandante boliviano en Kilómetro 7 y en Villa Montes',
    vida: 'No consignada en las fuentes consultadas',
    resumen: 'Dirigió dos de los combates en los que Bolivia resistió o ganó terreno.',
    papel: [
      'En Kilómetro 7 (1932 – 1933), Bolivia detuvo la ofensiva paraguaya.',
      'En 1935 defendió Villa Montes contra la ofensiva paraguaya.',
    ],
  },
  {
    id: 'busch',
    nombre: 'Germán Busch',
    bando: 'bolivia',
    cargo: 'Capitán; luego presidente de Bolivia (1937 – 1939)',
    vida: 'No consignada en las fuentes consultadas',
    resumen:
      'Encabezó al grupo de oficiales que arrestó a Salamanca el 27 de noviembre de 1934.',
    papel: [
      'El alto mando ordenó al grupo de Busch arrestar al presidente y obligarlo a renunciar.',
      'La renuncia fue redactada en los términos que impusieron los conspiradores.',
    ],
  },
  {
    id: 'marzana',
    nombre: 'Manuel Marzana',
    bando: 'bolivia',
    cargo: 'Jefe de la guarnición de Boquerón',
    vida: 'No consignada en las fuentes consultadas',
    resumen: 'Comandó a los sitiados durante veinte días y capituló el 29 de septiembre de 1932.',
    papel: [
      'Su guarnición, de unos 448 hombres, resistió sin agua ni munición mientras la columna de socorro no lograba romper el cerco.',
    ],
  },
  {
    id: 'estigarribia',
    nombre: 'José Félix Estigarribia',
    bando: 'paraguay',
    cargo: 'Comandante en jefe del ejército paraguayo; presidente 1939 – 1940',
    vida: 'Caraguatay, 1888 – cerca de Altos, 1940',
    resumen:
      'Dirigió las operaciones paraguayas durante toda la guerra y combinó el combate posicional con tácticas de guerrilla.',
    papel: [
      'Comandó el cerco de Boquerón en septiembre de 1932.',
      'Su estrategia detuvo el avance boliviano hacia el río Paraguay. Se sigue estudiando en academias militares.',
      'Después de la guerra fue enviado a Washington para negociar una paz duradera. Fue elegido presidente y gobernó desde agosto de 1939.',
      'Murió el 7 de septiembre de 1940 en un accidente aéreo. Recibió póstumamente el grado de mariscal.',
    ],
  },
  {
    id: 'ayala',
    nombre: 'Eusebio Ayala',
    bando: 'paraguay',
    cargo: 'Presidente de Paraguay (1932 – 1936)',
    vida: 'No consignada en las fuentes consultadas',
    resumen: 'Gobernó Paraguay durante casi toda la guerra.',
    papel: [
      'Fue derrocado en 1936, ya terminada la guerra, en un golpe de Estado.',
    ],
  },
  {
    id: 'franco',
    nombre: 'Rafael Franco',
    bando: 'paraguay',
    cargo: 'Comandante de la 6.ª División paraguaya',
    vida: 'No consignada en las fuentes consultadas',
    resumen: 'Condujo la ofensiva de 1934 que tomó Irendagüé y desbordó el frente boliviano.',
    papel: [
      'El 14 de agosto de 1934 atacó y tomó Irendagüé.',
      'En diciembre empujó a la caballería boliviana hacia los Andes y tomó Ibibobo.',
    ],
  },
  {
    id: 'irrazabal',
    nombre: 'Luis Irrazábal',
    bando: 'paraguay',
    cargo: 'Comandante de la defensa de Nanawa (5.ª División)',
    vida: 'No consignada en las fuentes consultadas',
    resumen: 'Defendió Nanawa en las dos batallas de 1933.',
    papel: [
      'En enero de 1933, con unos 2.500 hombres, resistió el asalto de unos 9.000.',
      'En julio de 1933 volvió a rechazar a las divisiones bolivianas.',
    ],
  },
  {
    id: 'emiliano-fernandez',
    nombre: 'Emiliano R. Fernández',
    bando: 'paraguay',
    cargo: 'Soldado y poeta',
    vida: 'No consignada en las fuentes consultadas',
    resumen: 'Escribió una polca paraguaya inspirada en la batalla de Nanawa.',
    papel: ['Su obra es un ejemplo de cómo la guerra entró en la música y la memoria popular paraguaya.'],
  },
  {
    id: 'saavedra-lamas',
    nombre: 'Carlos Saavedra Lamas',
    bando: 'mediacion',
    cargo: 'Canciller argentino',
    vida: 'No consignada en las fuentes consultadas',
    resumen: 'Figura clave en las gestiones diplomáticas que condujeron a la paz.',
    papel: [
      'Su mediación en el conflicto del Chaco le valió el Premio Nobel de la Paz de 1936.',
      'La firma del cese formal de hostilidades, el 12 de junio de 1935, tuvo lugar en Buenos Aires.',
    ],
  },
];
