import { Batalla } from '../models';
import { FUENTES as F } from './fuentes';

export const BATALLAS: Batalla[] = [
  {
    id: 'pitiantuta',
    nombre: 'Pitiantuta (fortín Carlos Antonio López)',
    inicio: '1932-06-15',
    fin: '1932-07-16',
    fechaTexto: '15 de junio – 16 de julio de 1932',
    lugar: 'Laguna Pitiantuta, Chaco Boreal',
    ganador: 'sin-ganador',
    resultado: 'Detonante de la guerra',
    resumen:
      'Un destacamento boliviano destruyó el fortín paraguayo Carlos Antonio López, junto a la laguna Pitiantuta. Un mes después, fuerzas paraguayas recuperaron la zona. El choque convirtió años de incidentes fronterizos en una guerra abierta.',
    desarrollo: [
      'Durante los años veinte, Bolivia y Paraguay levantaron fortines en el Chaco Boreal, una región sin frontera definida. Los incidentes entre patrullas se volvieron frecuentes desde 1928.',
      'El 15 de junio de 1932, un destacamento boliviano al mando del mayor Óscar Moscoso atacó y destruyó el fortín paraguayo Carlos Antonio López. Una de las fuentes consultadas señala que la acción contradijo órdenes del presidente Daniel Salamanca y que el alto mando presentó lo ocurrido de forma distorsionada.',
      'El 16 de julio de 1932, fuerzas paraguayas recuperaron la zona de la laguna.',
      'Desde entonces las operaciones dejaron de ser incidentes aislados. En septiembre comenzaría el asedio de Boquerón.',
    ],
    comandantes: {
      bolivia: ['Mayor Óscar Moscoso (jefe del destacamento)', 'Coronel Enrique Peñaranda (participó en el ataque, según una fuente)'],
      paraguay: ['Guarnición del fortín Carlos Antonio López'],
    },
    significado:
      'Se la considera el punto de partida del conflicto abierto. Quién dio el primer golpe sigue siendo un tema de debate entre historiadores.',
    notas: 'Las fechas y el orden exacto de los hechos varían entre las fuentes consultadas.',
    posicion: { lon: -61.5, lat: -20.0 },
    fuentes: [F['hispanopedia'], F['abcPaz'], F['penaranda']],
  },
  {
    id: 'boqueron',
    nombre: 'Boquerón',
    inicio: '1932-09-09',
    fin: '1932-09-29',
    fechaTexto: '9 – 29 de septiembre de 1932',
    lugar: 'Fortín Boquerón, Chaco Boreal',
    ganador: 'paraguay',
    resultado: 'Victoria paraguaya',
    resumen:
      'Durante veinte días, el ejército paraguayo cercó el fortín de Boquerón, ocupado por Bolivia desde fines de julio. Sin agua ni munición, y con las columnas de socorro detenidas, la guarnición se rindió. Fue la primera gran batalla de la guerra.',
    desarrollo: [
      'Bolivia había ocupado Boquerón el 31 de julio de 1932, cuando el fortín tenía pocos efectivos paraguayos.',
      'El teniente coronel José Félix Estigarribia concentró el ejército y la aviación y cerró un cerco para dejar el fortín sin agua, víveres ni munición, mientras rechazaba los intentos de socorro. Los paraguayos se abastecían por el río Paraguay y luego por tren.',
      'Una de las fuentes cuenta unos 448 sitiados y una columna de socorro de unos 3.500 hombres, frente a unos 7.500 paraguayos. El uso de morteros, poco conocidos por las tropas bolivianas, dio ventaja a los sitiadores.',
      'Tras un ataque final el 26 de septiembre, los últimos defensores, unos 240 y en su mayoría heridos, se rindieron el 29. Las tropas paraguayas encontraron cadáveres sin enterrar y heridos sin atención.',
      'El gobierno de Salamanca aceptó un cese del fuego limitado a la zona de Boquerón. Paraguay lo rechazó y siguió con su plan.',
    ],
    comandantes: {
      bolivia: ['Manuel Marzana (jefe de la guarnición)', 'Filiberto Osorio Quintanilla', 'F. Peña'],
      paraguay: ['José Félix Estigarribia', 'Carlos Fernández', 'Luis Ayala'],
    },
    fuerzas: 'Bolivia: unos 448 sitiados y unos 3.500 en la columna de socorro. Paraguay: unos 7.500.',
    bajas:
      'Alrededor de 2.000 bajas bolivianas según una fuente. Las cifras y su reparto por bando varían entre fuentes, por eso no se comparan aquí.',
    significado:
      'Primera gran batalla y victoria paraguaya. Dio confianza a Paraguay antes de que Bolivia completara su movilización, y el choque fronterizo se transformó en guerra a gran escala. La falta de agua fue decisiva para los sitiados.',
    posicion: { lon: -60.7, lat: -21.8 },
    fuentes: [F['boqueron'], F['laNacionBoqueron'], F['clem']],
  },
  {
    id: 'kilometro-7',
    nombre: 'Kilómetro 7',
    inicio: '1932-11-07',
    fin: '1933-02-28',
    fechaTexto: '7 de noviembre de 1932 – febrero de 1933',
    lugar: 'Chaco central (cerca de 23°25′ S, 60°00′ O)',
    ganador: 'bolivia',
    resultado: 'Victoria boliviana',
    resumen:
      'En un combate prolongado, Bolivia detuvo la ofensiva paraguaya, la hizo retroceder hacia el noreste y recuperó la iniciativa, que conservaría hasta julio de 1933.',
    desarrollo: [
      'Después de Boquerón, la iniciativa estaba en manos paraguayas. En el sector de Kilómetro 7, las fuerzas bolivianas resistieron y recibieron refuerzos entre noviembre de 1932 y febrero de 1933.',
      'Los paraguayos se replegaron hacia el noreste, rumbo a Gondra, que más adelante sería escenario de otro combate, el de Campo Jordán.',
    ],
    comandantes: { bolivia: ['Bernardino Bilbao Rioja'], paraguay: ['José Félix Estigarribia'] },
    significado: 'Devolvió la iniciativa a Bolivia hasta la segunda batalla de Nanawa, en julio de 1933.',
    notas: 'La fuente consultada no ofrece cifras de bajas, así que esta ficha no las incluye.',
    posicion: { lon: -60.01, lat: -23.42 },
    fuentes: [F['km7']],
  },
  {
    id: 'nanawa-1',
    nombre: 'Primera batalla de Nanawa',
    inicio: '1933-01-20',
    fin: '1933-01-26',
    fechaTexto: '20 – 26 de enero de 1933',
    lugar: 'Nanawa, frente sur del Chaco',
    ganador: 'paraguay',
    resultado: 'Victoria paraguaya',
    resumen:
      'Bolivia lanzó tres ataques frontales contra el reducto paraguayo de Nanawa. Los asaltos se estancaron y las lluvias obligaron a abandonar lo capturado. Se la llamó el «Verdún sudamericano».',
    desarrollo: [
      'Nanawa era un reducto paraguayo, un saliente clave del frente sur.',
      'Hans Kundt dirigió el asalto en persona con las divisiones 4.ª y 9.ª: unos 9.000 hombres contra unos 2.500 defensores de la 5.ª División paraguaya, comandada por Luis Irrazábal.',
      'Bolivia lanzó tres ataques que se estancaron. Las lluvias intensas obligaron a abandonar lo que había capturado y Paraguay recuperó esas posiciones.',
      'El soldado y poeta Emiliano R. Fernández dedicó a esta batalla una polca paraguaya.',
    ],
    comandantes: { bolivia: ['Hans Kundt (comandante en jefe)'], paraguay: ['Luis Irrazábal (5.ª División)'] },
    fuerzas: 'Bolivia: unos 9.000 (4.ª y 9.ª División). Paraguay: unos 2.500 (5.ª División).',
    bajas: 'Aproximadamente 2.000 muertos bolivianos y 248 paraguayos.',
    cifras: { etiqueta: 'Muertos', bolivia: 2000, paraguay: 248, nota: 'Cifras aproximadas.' },
    significado:
      'Junto con la segunda batalla, fue una de las más sangrientas de Sudamérica en el siglo XX. Por eso se la comparó con Verdún, de la Primera Guerra Mundial.',
    posicion: { lon: -59.77, lat: -23.49 },
    fuentes: [F['nanawa1']],
  },
  {
    id: 'nanawa-2',
    nombre: 'Segunda batalla de Nanawa',
    inicio: '1933-07-04',
    fin: '1933-07-09',
    fechaTexto: '4 – 9 de julio de 1933',
    lugar: 'Nanawa, frente sur del Chaco',
    ganador: 'paraguay',
    resultado: 'Victoria paraguaya',
    resumen:
      'Fue el último intento boliviano de tomar Nanawa. Bolivia usó tanques ligeros y tanquetas, pero el monte los volvió poco útiles. La defensa paraguaya marcó un punto de inflexión.',
    desarrollo: [
      'Con la toma de Nanawa, Bolivia buscaba aislar Isla Poí, el cuartel general paraguayo, y avanzar hacia Concepción.',
      'Cada bando reunió unos 9.000 hombres. Bolivia empleó 3 tanques ligeros y 2 tanquetas; Paraguay usó 4 aviones de combate como transporte.',
      'Un tanque boliviano fue destruido y dos tanquetas quedaron fuera de combate. Según una de las fuentes, los blindados resultaron casi inútiles en el monte de quebracho.',
      'Un contraataque paraguayo del 11 de julio fracasó.',
    ],
    comandantes: { bolivia: ['Hans Kundt (comandante en jefe)'], paraguay: ['Luis Irrazábal (5.ª División)'] },
    fuerzas: 'Unos 9.000 hombres por bando.',
    bajas: 'Unas 1.600 bajas bolivianas y unas 500 paraguayas.',
    cifras: { etiqueta: 'Bajas totales', bolivia: 1600, paraguay: 500, nota: 'Bajas totales, no solo muertos.' },
    significado:
      'Paraguay recuperó la iniciativa estratégica que Bolivia había tenido desde comienzos de 1933.',
    posicion: { lon: -59.68, lat: -23.58 },
    fuentes: [F['nanawa2']],
  },
  {
    id: 'campo-via',
    nombre: 'Campo Vía',
    inicio: '1933-10-23',
    fin: '1933-12-11',
    fechaTexto: '23 de octubre – 11 de diciembre de 1933',
    lugar: 'Chaco central, bolsón de Campo Vía',
    ganador: 'paraguay',
    resultado: 'Victoria paraguaya',
    resumen:
      'Con picadas abiertas en el monte, el ejército paraguayo infiltró tropas, atacó el 23 de octubre y cercó a grandes fuerzas bolivianas. Las divisiones 4.ª y 9.ª se rindieron el 11 de diciembre. Fue uno de los golpes decisivos de la guerra.',
    desarrollo: [
      'Paraguay construyó un sistema de caminos y picadas en el monte, infiltró tropas y atacó el 23 de octubre de 1933.',
      'Kundt mantuvo posiciones estáticas y grandes fuerzas quedaron cercadas. Según una de las fuentes, varias se rindieron por falta de agua.',
      'El 11 de diciembre se rindieron las divisiones 4.ª y 9.ª. Al día siguiente, el presidente Salamanca relevó a Kundt.',
      'El 19 de diciembre se firmó una tregua temporal. Las hostilidades se reanudaron en enero de 1934 y Bolivia instituyó el reclutamiento obligatorio.',
    ],
    comandantes: {
      bolivia: ['Hans Kundt (comandante en jefe, relevado el 12 de diciembre)'],
      paraguay: ['José Félix Estigarribia (comandante en jefe)'],
    },
    significado:
      'Hundió el prestigio de Kundt y obligó a un cambio de mando en Bolivia: Enrique Peñaranda asumió la jefatura del ejército.',
    posicion: { lon: -61.2, lat: -22.4 },
    fuentes: [F['clem'], F['kundt'], F['penaranda'], F['abcPaz']],
  },
  {
    id: 'canada-strongest',
    nombre: 'Cañada Strongest',
    inicio: '1934-05-10',
    fin: '1934-05-25',
    fechaTexto: '10 – 25 de mayo de 1934',
    lugar: 'Chaco sur-occidental, cerca de Cañada Esperanza',
    ganador: 'bolivia',
    resultado: 'Victoria boliviana',
    resumen:
      'Paraguay intentó rodear el fortín Ballivián, pieza clave de la defensa boliviana. La aviación boliviana detectó la nueva senda, y las tropas bolivianas tendieron una emboscada. Es considerada la mayor victoria del ejército boliviano en la guerra.',
    desarrollo: [
      'Paraguay buscaba rodear y tomar el fortín Ballivián, en el sur, cerca de la frontera con Argentina.',
      'La aviación de reconocimiento boliviana detectó la nueva senda paraguaya y las tropas bolivianas prepararon una emboscada. Una de las fuentes ubica el combate unos 60 km al suroeste de Cañada Strongest, cerca de Cañada Esperanza.',
      'Un destacamento paraguayo de 250 hombres fue capturado el 25 de mayo en el Sendero Lóbrego. Una división paraguaya completa logró escapar.',
      'Bolivia tuvo pérdidas mínimas. Paraguay sufrió unos 400 muertos y 1.500 prisioneros, además de perder armamento, camiones y suministros.',
    ],
    comandantes: { bolivia: ['Enrique Peñaranda'], paraguay: ['José Félix Estigarribia'] },
    bajas: 'Paraguay: unos 400 muertos y 1.500 prisioneros. Bolivia: pérdidas mínimas.',
    significado:
      'Fue el mayor triunfo boliviano, pero no detuvo el avance paraguayo: en agosto de 1934 comenzó la ofensiva sobre Irendagüé.',
    notas:
      'Otra fuente fecha el contraataque boliviano el 19 de mayo, y los datos sobre el número de divisiones no coinciden entre fuentes.',
    posicion: { lon: -61.6, lat: -23.0 },
    fuentes: [F['strongest'], F['clem']],
  },
  {
    id: 'el-carmen',
    nombre: 'Irendagüé y El Carmen',
    inicio: '1934-08-14',
    fin: '1934-12-10',
    fechaTexto: 'Agosto – diciembre de 1934',
    lugar: 'Chaco occidental, frente de Ballivián',
    ganador: 'paraguay',
    resultado: 'Victoria paraguaya',
    resumen:
      'Desde agosto de 1934 el ejército paraguayo rompió el frente boliviano. En noviembre, otras dos divisiones bolivianas quedaron aisladas y se rindieron en El Carmen. Pocos días después, un golpe militar depuso a Salamanca.',
    desarrollo: [
      'Salamanca se negó a abandonar Ballivián. El 14 de agosto, la 6.ª División paraguaya, a cargo de Rafael Franco, atacó y tomó Irendagüé, desbordando el frente boliviano.',
      'El 11 de noviembre, dos divisiones bolivianas más se rindieron en El Carmen tras quedar aisladas.',
      'El 27 de noviembre, un grupo de oficiales encabezado por el capitán Germán Busch arrestó a Salamanca en Villa Montes y lo obligó a renunciar. Lo sucedió el vicepresidente José Luis Tejada Sorzano.',
      'En diciembre, Franco retomó la ofensiva y empujó a la caballería boliviana hacia los Andes. Otra ofensiva a lo largo del Pilcomayo tomó Ibibobo y replegó a los bolivianos hasta Villa Montes.',
    ],
    comandantes: {
      bolivia: ['Enrique Peñaranda', 'José Leonardo Lanza (tras El Carmen)'],
      paraguay: ['Rafael Franco (6.ª División)', 'José Félix Estigarribia'],
    },
    significado:
      'Destruyó al Segundo Ejército boliviano, según una fuente, y dejó el frente a las puertas de Villa Montes.',
    posicion: { lon: -62.0, lat: -22.2 },
    fuentes: [F['clem'], F['golpe1934'], F['villamontes'], F['penaranda']],
  },
  {
    id: 'villa-montes',
    nombre: 'Defensa de Villa Montes',
    inicio: '1935-02-13',
    fin: '1935-06-12',
    fechaTexto: 'Febrero – junio de 1935',
    lugar: 'Villa Montes y el río Pilcomayo',
    ganador: 'bolivia',
    resultado: 'Resistencia boliviana',
    resumen:
      'Villa Montes fue el centro del sistema defensivo boliviano en 1935. Su pérdida habría abierto el camino a la región de Tarija. La defensa resistió la ofensiva paraguaya y recuperó terreno en abril.',
    desarrollo: [
      'Tras la destrucción del Segundo Ejército, a fines de 1934, Bolivia formó un Tercer Ejército de 36 regimientos, con superioridad numérica sobre el paraguayo.',
      'La ofensiva paraguaya comenzó el 13 de febrero de 1935 contra las líneas del coronel (luego general) Bernardino Bilbao Rioja, que resistió.',
      'El 16 de abril Bolivia lanzó una contraofensiva. El 19 de abril, sus fuerzas eliminaron el saliente paraguayo creado en febrero y recuperaron Tarairí.',
      'La contraofensiva tuvo éxito parcial y con altas pérdidas. Luego hubo estancamiento y comenzaron las conversaciones de armisticio.',
    ],
    comandantes: { bolivia: ['Bernardino Bilbao Rioja'], paraguay: ['No consignado en las fuentes consultadas'] },
    significado:
      'Frenó el avance paraguayo en el último tramo de la guerra: Villa Montes no cayó antes del cese del fuego de junio.',
    posicion: { lon: -63.5, lat: -21.26 },
    fuentes: [F['villamontes'], F['clem']],
  },
  {
    id: 'ingavi',
    nombre: 'Ingavi',
    inicio: '1935-04-15',
    fin: '1935-06-12',
    fechaTexto: 'Abril – junio de 1935 (las fuentes difieren)',
    lugar: 'Frente del Pilcomayo, cerca de Villa Montes',
    ganador: 'paraguay',
    resultado: 'Victoria paraguaya',
    resumen:
      'Las fuentes consultadas la describen como la última gran batalla de la guerra, con victoria paraguaya. Una la sitúa en abril de 1935 y otra en junio, pocos días antes del cese del fuego.',
    desarrollo: [
      'Las fuentes coinciden en que fue el último gran combate y en que terminó con victoria paraguaya, pero difieren en el mes.',
      'No ofrecen datos fiables sobre fuerzas, comandantes ni bajas. Esta ficha queda pendiente de ampliarse con bibliografía especializada.',
    ],
    comandantes: { bolivia: [], paraguay: [] },
    significado: 'Cerró el ciclo de grandes batallas pocos días antes del cese del fuego del 14 de junio de 1935.',
    notas: 'Fecha y ubicación aproximadas: la marca en el mapa es solo indicativa.',
    posicion: { lon: -62.9, lat: -21.5 },
    fuentes: [F['abcPaz'], F['ultimaHora']],
  },
];

export function batallaPorId(id: string): Batalla | undefined {
  return BATALLAS.find((b) => b.id === id);
}
