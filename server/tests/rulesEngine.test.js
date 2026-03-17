import { describe, expect, test } from 'vitest'
import { generateDeterministicWorkout, generateDynamicRecommendations } from '../src/ai/rulesEngine.js'

describe('rulesEngine', () => {
  test('genera un plan semanal con la cantidad correcta de días', () => {
    const plan = generateDeterministicWorkout({
      level: 'intermedio',
      goal: 'resistencia',
      weeklyAvailability: 4,
      sessionsDurationMin: 60,
      equipment: ['mancuernas', 'barra'],
    })

    expect(plan).toHaveLength(4)
    expect(plan[0].workout.length).toBeGreaterThan(0)
  })

  test('genera recomendaciones adaptativas cuando la adherencia es baja', () => {
    const recommendations = generateDynamicRecommendations(
      { goal: 'resistencia' },
      [
        { completed: 0, perceived_effort: 9 },
        { completed: 1, perceived_effort: 9 },
        { completed: 0, perceived_effort: 8 },
        { completed: 0, perceived_effort: 9 },
      ],
    )

    expect(recommendations.some((item) => item.includes('adherencia reciente es baja'))).toBe(true)
    expect(recommendations.some((item) => item.includes('esfuerzo percibido reciente es alto'))).toBe(true)
  })
})
