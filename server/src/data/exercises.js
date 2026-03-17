export const exerciseLibrary = {
  perder_grasa: {
    bodyweight: [
      { name: 'Sentadilla aire', category: 'pierna', defaultRest: 45, progression: 'sumar 2 reps por semana' },
      { name: 'Flexiones', category: 'empuje', defaultRest: 60, progression: 'sumar 1-2 reps por serie' },
      { name: 'Zancadas caminando', category: 'pierna', defaultRest: 45, progression: 'sumar 2 reps por lado' },
      { name: 'Mountain climbers', category: 'metcon', defaultRest: 30, progression: 'sumar 10 segundos' },
      { name: 'Plancha frontal', category: 'core', defaultRest: 30, progression: 'sumar 10-15 segundos' },
    ],
    gym: [
      { name: 'Sentadilla goblet', category: 'pierna', defaultRest: 60, progression: 'subir 2.5-5%' },
      { name: 'Press banca mancuernas', category: 'empuje', defaultRest: 75, progression: 'subir 2.5-5%' },
      { name: 'Peso muerto rumano', category: 'bisagra', defaultRest: 75, progression: 'subir 2.5-5%' },
      { name: 'Remo con mancuerna', category: 'tirón', defaultRest: 60, progression: 'subir 2.5-5%' },
      { name: 'Bicicleta o cinta HIIT', category: 'metcon', defaultRest: 30, progression: 'sumar 1 intervalo' },
    ],
  },
  ganar_musculo: {
    bodyweight: [
      { name: 'Flexiones inclinadas', category: 'empuje', defaultRest: 75, progression: 'aumentar dificultad' },
      { name: 'Sentadilla tempo', category: 'pierna', defaultRest: 75, progression: 'sumar 2 reps' },
      { name: 'Fondos en banco', category: 'empuje', defaultRest: 60, progression: 'sumar 1-2 reps' },
      { name: 'Puente glúteo unilateral', category: 'bisagra', defaultRest: 60, progression: 'sumar 2 reps por lado' },
      { name: 'Hollow hold', category: 'core', defaultRest: 30, progression: 'sumar 10 segundos' },
    ],
    gym: [
      { name: 'Sentadilla con barra', category: 'pierna', defaultRest: 90, progression: 'subir 2.5-5%' },
      { name: 'Press banca', category: 'empuje', defaultRest: 90, progression: 'subir 2.5-5%' },
      { name: 'Remo con barra', category: 'tirón', defaultRest: 75, progression: 'subir 2.5-5%' },
      { name: 'Press militar', category: 'hombro', defaultRest: 75, progression: 'subir 2.5-5%' },
      { name: 'Hip thrust', category: 'glúteo', defaultRest: 90, progression: 'subir 2.5-5%' },
    ],
  },
  resistencia: {
    bodyweight: [
      { name: 'Circuito sentadilla + jumping jacks', category: 'conditioning', defaultRest: 30, progression: 'sumar 1 ronda' },
      { name: 'Step ups', category: 'pierna', defaultRest: 45, progression: 'sumar 2 reps por lado' },
      { name: 'Flexiones moderadas', category: 'empuje', defaultRest: 45, progression: 'sumar 1-2 reps' },
      { name: 'Bear crawl', category: 'conditioning', defaultRest: 30, progression: 'sumar 10 metros' },
      { name: 'Plancha lateral', category: 'core', defaultRest: 30, progression: 'sumar 10 segundos' },
    ],
    gym: [
      { name: 'Peso muerto rumano liviano', category: 'bisagra', defaultRest: 60, progression: 'subir 2.5%' },
      { name: 'Sentadilla frontal moderada', category: 'pierna', defaultRest: 75, progression: 'subir 2.5%' },
      { name: 'Remo sentado', category: 'tirón', defaultRest: 60, progression: 'subir 2.5%' },
      { name: 'Press inclinado mancuernas', category: 'empuje', defaultRest: 60, progression: 'subir 2.5%' },
      { name: 'Cinta intervalada', category: 'conditioning', defaultRest: 30, progression: 'sumar 1 bloque' },
    ],
  },
}

export function resolveEquipmentProfile(equipment = []) {
  const lower = equipment.map((e) => String(e).toLowerCase())
  const hasGymTools = lower.some((e) => ['mancuernas', 'barra', 'máquinas', 'maquinas', 'cinta', 'bicicleta', 'kettlebell', 'banco'].includes(e))
  return hasGymTools ? 'gym' : 'bodyweight'
}
