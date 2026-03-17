export function generateUserScore(profile) {
  const readiness = Math.max(55, Math.min(95, 70 + profile.weeklyAvailability * 3 - (profile.injuries?.length || 0) * 7))
  const recovery = Math.max(50, Math.min(92, 72 + (profile.sessionsDurationMin >= 60 ? 6 : 0) - (profile.level === 'principiante' ? 0 : 3)))
  const adherencePrediction = Math.max(58, Math.min(96, 68 + (5 - Math.abs(4 - profile.weeklyAvailability)) * 4))

  return {
    readiness,
    recovery,
    adherencePrediction,
  }
}

export function generateCoachingInsights(profile, score) {
  const insights = []

  if (score.readiness >= 82) {
    insights.push('Tu readiness es alto: puedes tolerar progresión moderada esta semana.')
  }
  if (profile.weeklyAvailability <= 2) {
    insights.push('Tu disponibilidad es baja: prioriza sesiones full-body y consistencia.')
  }
  if (profile.goal === 'resistencia') {
    insights.push('Para resistencia, el volumen y los descansos controlados serán clave.')
  }
  if (profile.goal === 'ganar_musculo') {
    insights.push('El progreso dependerá de tensión mecánica, técnica y recuperación.')
  }
  if (profile.goal === 'perder_grasa') {
    insights.push('El entrenamiento debe maximizar adherencia y gasto energético sostenible.')
  }

  return insights
}
