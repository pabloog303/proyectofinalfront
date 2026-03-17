import { exerciseLibrary, resolveEquipmentProfile } from '../data/exercises.js'

function getFocusSplit(goal, availability) {
  if (availability <= 2) return ['full body', 'full body']
  if (availability === 3) return ['full body', 'tren inferior + core', 'tren superior + conditioning']
  if (availability === 4) return ['tren inferior', 'empuje + core', 'tirón + posterior', 'conditioning / resistencia']
  return ['tren inferior', 'empuje', 'tirón', 'posterior + core', 'conditioning']
}

function prescribeByLevel(level, goal) {
  if (level === 'principiante') {
    return { sets: 3, reps: goal === 'resistencia' ? '12-15' : '10-12', restSec: 60, intensity: 'RPE 6-7' }
  }
  if (level === 'intermedio') {
    return { sets: 4, reps: goal === 'ganar_musculo' ? '8-12' : '10-14', restSec: 75, intensity: 'RPE 7-8' }
  }
  return { sets: 4, reps: goal === 'resistencia' ? '10-12' : '6-10', restSec: 90, intensity: 'RPE 8' }
}

export function generateDeterministicWorkout(profile) {
  const eqProfile = resolveEquipmentProfile(profile.equipment)
  const pool = exerciseLibrary[profile.goal]?.[eqProfile] || []
  const split = getFocusSplit(profile.goal, profile.weeklyAvailability)
  const prescription = prescribeByLevel(profile.level, profile.goal)

  const weeklyPlan = split.map((focus, index) => {
    const selected = pool.slice(index % Math.max(1, pool.length - 3), (index % Math.max(1, pool.length - 3)) + 4)

    return {
      day: `Día ${index + 1}`,
      focus,
      estimatedDurationMin: profile.sessionsDurationMin,
      workout: selected.map((exercise, i) => ({
        exercise: exercise.name,
        sets: prescription.sets,
        reps: i === selected.length - 1 && profile.goal === 'resistencia' ? '30-40 seg / 8-12 min bloque' : prescription.reps,
        restSec: exercise.defaultRest || prescription.restSec,
        intensity: prescription.intensity,
        notes: `${focus}. Progresión sugerida: ${exercise.progression}`,
      })),
    }
  })

  return weeklyPlan
}

export function generateDynamicRecommendations(profile, history = []) {
  const recommendations = []
  const recentLogs = history.slice(0, 6)
  const completedCount = recentLogs.filter((log) => log.completed || log.completed === 1).length
  const avgRpe = recentLogs.length
    ? recentLogs.reduce((acc, log) => acc + Number(log.perceived_effort || log.perceivedEffort || 0), 0) / recentLogs.length
    : 0

  recommendations.push('Si completas el rango alto de repeticiones 2 semanas seguidas, aumenta 2.5%-5% la carga.')
  recommendations.push('Mantén 1-2 repeticiones en reserva para preservar técnica y recuperación.')

  if (profile.goal === 'ganar_musculo') {
    recommendations.push('Prioriza progresión en ejercicios compuestos y monitorea volumen por grupo muscular.')
  }
  if (profile.goal === 'perder_grasa') {
    recommendations.push('Usa descansos más cortos y añade bloques metabólicos sin comprometer técnica.')
  }
  if (profile.goal === 'resistencia') {
    recommendations.push('Eleva gradualmente el volumen total semanal y controla la fatiga acumulada.')
  }

  if (history.length >= 2) {
    recommendations.push('Tu historial ya permite ajustes más finos. Si completas todo con RPE bajo, sube estímulo la próxima semana.')
  }

  if (recentLogs.length >= 3) {
    if (completedCount / recentLogs.length < 0.6) {
      recommendations.push('Tu adherencia reciente es baja: simplifica el plan y prioriza completar más sesiones antes de subir carga.')
    }

    if (avgRpe >= 8.5) {
      recommendations.push('Tu esfuerzo percibido reciente es alto. Reduce 5%-10% la carga o añade más descanso entre series.')
    }

    if (avgRpe > 0 && avgRpe <= 6.5 && completedCount === recentLogs.length) {
      recommendations.push('Estás tolerando bien las sesiones: es buen momento para aplicar progressive overload la próxima semana.')
    }
  }

  return recommendations
}

export function generateProgressionRules(level) {
  return [
    'Si completas todas las series con técnica sólida, aumenta carga o repeticiones la próxima semana.',
    level === 'principiante'
      ? 'No aumentes carga dos semanas consecutivas si tu técnica aún es inconsistente.'
      : 'Alterna semanas de empuje con semanas de consolidación para evitar fatiga excesiva.',
    'Si fallas el rango mínimo en dos sesiones seguidas, reduce 5%-10% la carga.',
  ]
}
