import { describe, expect, test } from 'vitest'
import { generateUserScore } from '../src/ai/scoringEngine.js'

describe('scoringEngine', () => {
  test('retorna scores dentro de rangos razonables', () => {
    const score = generateUserScore({
      weeklyAvailability: 4,
      sessionsDurationMin: 60,
      injuries: [],
      level: 'intermedio',
    })

    expect(score.readiness).toBeGreaterThanOrEqual(55)
    expect(score.recovery).toBeGreaterThanOrEqual(50)
    expect(score.adherencePrediction).toBeGreaterThanOrEqual(58)
  })
})
