/**
 * Genera un plan de entrenamiento profesional para medio maratón
 * basado en el nivel del corredor y la fecha objetivo
 */

// Tipos de entrenamientos
const TIPOS_ENTRENAMIENTO = {
  DESCANSO: 'Descanso',
  RECUPERACION: 'Recuperación',
  RODAJE_SUAVE: 'Rodaje Suave',
  RODAJE_MEDIO: 'Rodaje Medio',
  RODAJE_LARGO: 'Rodaje Largo',
  TEMPO: 'Tempo Run',
  INTERVALOS: 'Intervalos',
  FARTLEK: 'Fartlek',
  SERIES: 'Series de Velocidad',
}

/**
 * Genera entrenamientos específicos según nivel y semana
 */
function generarEntrenamientoPorNivel(nivel, semana, totalSemanas, dia, diasPorSemana) {
  const fase = obtenerFase(semana, totalSemanas)
  
  // Principiante
  if (nivel === 'principiante') {
    return generarPlanPrincipiante(semana, totalSemanas, dia, diasPorSemana, fase)
  }
  
  // Intermedio
  if (nivel === 'intermedio') {
    return generarPlanIntermedio(semana, totalSemanas, dia, diasPorSemana, fase)
  }
  
  // Avanzado
  return generarPlanAvanzado(semana, totalSemanas, dia, diasPorSemana, fase)
}

/**
 * Determina la fase del entrenamiento
 */
function obtenerFase(semana, totalSemanas) {
  const porcentaje = semana / totalSemanas
  if (porcentaje <= 0.33) return 'base'
  if (porcentaje <= 0.66) return 'construccion'
  if (porcentaje <= 0.90) return 'intensidad'
  return 'tapering'
}

/**
 * Plan para principiantes (3-4 días/semana)
 */
function generarPlanPrincipiante(semana, totalSemanas, dia, diasPorSemana, fase) {
  const baseKm = fase === 'base' ? 5 : fase === 'construccion' ? 7 : fase === 'intensidad' ? 9 : 5
  
  if (dia > diasPorSemana) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.DESCANSO,
      distancia: 0,
      descripcion: 'Día de descanso completo',
      ritmo: '-',
      objetivo: 'Recuperación muscular'
    }
  }
  
  // Patrón para principiante
  if (dia === 1) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.RODAJE_SUAVE,
      distancia: baseKm + (semana * 0.3),
      descripcion: `Rodaje suave de ${(baseKm + semana * 0.3).toFixed(1)} km`,
      ritmo: '6:30-7:00 min/km',
      objetivo: 'Construcción de base aeróbica'
    }
  }
  
  if (dia === 2) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.DESCANSO,
      distancia: 0,
      descripcion: 'Descanso activo o ejercicios de movilidad',
      ritmo: '-',
      objetivo: 'Recuperación'
    }
  }
  
  if (dia === 3) {
    const distancia = (baseKm - 1) + (semana * 0.2)
    if (fase === 'intensidad' && semana % 2 === 0) {
      return {
        tipo: TIPOS_ENTRENAMIENTO.FARTLEK,
        distancia: distancia,
        descripcion: `Fartlek de ${distancia.toFixed(1)} km - Alternar 2 min rápido / 2 min suave`,
        ritmo: '5:45-6:15 min/km (rápido)',
        objetivo: 'Mejorar velocidad y resistencia'
      }
    }
    return {
      tipo: TIPOS_ENTRENAMIENTO.RODAJE_MEDIO,
      distancia: distancia,
      descripcion: `Rodaje medio de ${distancia.toFixed(1)} km`,
      ritmo: '6:00-6:30 min/km',
      objetivo: 'Ritmo de carrera controlado'
    }
  }
  
  if (dia === 4) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.DESCANSO,
      distancia: 0,
      descripcion: 'Descanso o cross-training ligero',
      ritmo: '-',
      objetivo: 'Recuperación activa'
    }
  }
  
  // Rodaje largo (día más importante)
  const kmLargo = fase === 'tapering' ? 10 : Math.min(baseKm + (semana * 0.8), 18)
  return {
    tipo: TIPOS_ENTRENAMIENTO.RODAJE_LARGO,
    distancia: kmLargo,
    descripcion: `Rodaje largo de ${kmLargo.toFixed(1)} km`,
    ritmo: '6:30-7:00 min/km',
    objetivo: 'Resistencia de larga distancia'
  }
}

/**
 * Plan para intermedios (4-5 días/semana)
 */
function generarPlanIntermedio(semana, totalSemanas, dia, diasPorSemana, fase) {
  const baseKm = fase === 'base' ? 7 : fase === 'construccion' ? 9 : fase === 'intensidad' ? 11 : 6
  
  if (dia > diasPorSemana) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.DESCANSO,
      distancia: 0,
      descripcion: 'Día de descanso',
      ritmo: '-',
      objetivo: 'Recuperación'
    }
  }
  
  if (dia === 1) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.RODAJE_SUAVE,
      distancia: baseKm + (semana * 0.3),
      descripcion: `Rodaje suave de ${(baseKm + semana * 0.3).toFixed(1)} km`,
      ritmo: '5:45-6:15 min/km',
      objetivo: 'Recuperación activa'
    }
  }
  
  if (dia === 2) {
    const distancia = 8 + (semana * 0.2)
    if (fase === 'construccion' || fase === 'intensidad') {
      return {
        tipo: TIPOS_ENTRENAMIENTO.TEMPO,
        distancia: distancia,
        descripcion: `Tempo Run: 2 km calentamiento + ${(distancia - 4).toFixed(1)} km a ritmo tempo + 2 km enfriamiento`,
        ritmo: '5:15-5:30 min/km (tempo)',
        objetivo: 'Umbral anaeróbico'
      }
    }
    return {
      tipo: TIPOS_ENTRENAMIENTO.RODAJE_MEDIO,
      distancia: distancia,
      descripcion: `Rodaje medio de ${distancia.toFixed(1)} km`,
      ritmo: '5:45-6:00 min/km',
      objetivo: 'Resistencia aeróbica'
    }
  }
  
  if (dia === 3) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.DESCANSO,
      distancia: 0,
      descripcion: 'Descanso o yoga/estiramientos',
      ritmo: '-',
      objetivo: 'Recuperación'
    }
  }
  
  if (dia === 4) {
    const distancia = 7 + (semana * 0.25)
    if (fase === 'intensidad' && semana % 2 === 1) {
      return {
        tipo: TIPOS_ENTRENAMIENTO.INTERVALOS,
        distancia: distancia,
        descripcion: `Intervalos: 2 km calentamiento + 6x1000m (rec: 400m) + 2 km enfriamiento`,
        ritmo: '4:45-5:00 min/km (series)',
        objetivo: 'VO2 máx y velocidad'
      }
    }
    return {
      tipo: TIPOS_ENTRENAMIENTO.FARTLEK,
      distancia: distancia,
      descripcion: `Fartlek de ${distancia.toFixed(1)} km - Juegos de ritmo`,
      ritmo: 'Variable',
      objetivo: 'Velocidad y diversión'
    }
  }
  
  if (dia === 5 && diasPorSemana >= 5) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.RECUPERACION,
      distancia: 5,
      descripcion: 'Rodaje muy suave de recuperación 5 km',
      ritmo: '6:15-6:45 min/km',
      objetivo: 'Recuperación activa'
    }
  }
  
  // Rodaje largo
  const kmLargo = fase === 'tapering' ? 12 : Math.min(baseKm + (semana * 1), 19)
  return {
    tipo: TIPOS_ENTRENAMIENTO.RODAJE_LARGO,
    distancia: kmLargo,
    descripcion: `Rodaje largo de ${kmLargo.toFixed(1)} km`,
    ritmo: '5:45-6:15 min/km',
    objetivo: 'Resistencia específica'
  }
}

/**
 * Plan para avanzados (5-6 días/semana)
 */
function generarPlanAvanzado(semana, totalSemanas, dia, diasPorSemana, fase) {
  const baseKm = fase === 'base' ? 9 : fase === 'construccion' ? 11 : fase === 'intensidad' ? 13 : 7
  
  if (dia > diasPorSemana) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.DESCANSO,
      distancia: 0,
      descripcion: 'Descanso',
      ritmo: '-',
      objetivo: 'Recuperación'
    }
  }
  
  if (dia === 1) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.RODAJE_SUAVE,
      distancia: baseKm + (semana * 0.3),
      descripcion: `Rodaje suave de ${(baseKm + semana * 0.3).toFixed(1)} km`,
      ritmo: '5:15-5:45 min/km',
      objetivo: 'Volumen aeróbico'
    }
  }
  
  if (dia === 2) {
    const distancia = 10 + (semana * 0.3)
    return {
      tipo: TIPOS_ENTRENAMIENTO.TEMPO,
      distancia: distancia,
      descripcion: `Tempo Run: 3 km calentamiento + ${(distancia - 6).toFixed(1)} km a ritmo tempo + 3 km enfriamiento`,
      ritmo: '4:45-5:00 min/km (tempo)',
      objetivo: 'Umbral de lactato'
    }
  }
  
  if (dia === 3) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.RECUPERACION,
      distancia: 6,
      descripcion: 'Rodaje recuperación 6 km',
      ritmo: '5:45-6:15 min/km',
      objetivo: 'Recuperación activa'
    }
  }
  
  if (dia === 4) {
    const distancia = 10 + (semana * 0.25)
    if (fase === 'intensidad') {
      return {
        tipo: TIPOS_ENTRENAMIENTO.SERIES,
        distancia: distancia,
        descripcion: `Series: 3 km calentamiento + 8x1000m (rec: 2min) + 2 km enfriamiento`,
        ritmo: '4:30-4:45 min/km (series)',
        objetivo: 'Potencia aeróbica máxima'
      }
    }
    return {
      tipo: TIPOS_ENTRENAMIENTO.INTERVALOS,
      distancia: distancia,
      descripcion: `Intervalos: 3 km + 5x1km (rec: 400m) + 2 km`,
      ritmo: '4:40-4:55 min/km',
      objetivo: 'VO2 máx'
    }
  }
  
  if (dia === 5) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.RODAJE_MEDIO,
      distancia: 8 + (semana * 0.2),
      descripcion: `Rodaje medio de ${(8 + semana * 0.2).toFixed(1)} km`,
      ritmo: '5:15-5:30 min/km',
      objetivo: 'Ritmo de carrera'
    }
  }
  
  if (dia === 6 && diasPorSemana >= 6) {
    return {
      tipo: TIPOS_ENTRENAMIENTO.RECUPERACION,
      distancia: 6,
      descripcion: 'Rodaje muy suave 6 km',
      ritmo: '5:45-6:15 min/km',
      objetivo: 'Recuperación'
    }
  }
  
  // Rodaje largo
  const kmLargo = fase === 'tapering' ? 14 : Math.min(baseKm + (semana * 1.2), 20)
  return {
    tipo: TIPOS_ENTRENAMIENTO.RODAJE_LARGO,
    distancia: kmLargo,
    descripcion: `Rodaje largo de ${kmLargo.toFixed(1)} km`,
    ritmo: '5:15-5:45 min/km',
    objetivo: 'Resistencia específica de medio maratón'
  }
}

export default function generatePlan({ raceDate, level, daysPerWeek }) {
  const startDate = new Date()
  const endDate = new Date(raceDate)
  const totalWeeks = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24 * 7))

  const plan = []

  for (let week = 1; week <= totalWeeks; week++) {
    const days = []

    for (let d = 1; d <= 7; d++) {
      const entreno = generarEntrenamientoPorNivel(level, week, totalWeeks, d, daysPerWeek)
      days.push({
        day: d,
        ...entreno,
        done: false,
      })
    }

    plan.push({ week, days })
  }

  return { startDate, raceDate, level, daysPerWeek, plan }
}

