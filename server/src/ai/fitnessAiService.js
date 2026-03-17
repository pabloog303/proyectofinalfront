import { buildStructuredPrompt } from './promptBuilder.js'
import { generateUserScore, generateCoachingInsights } from './scoringEngine.js'
import {
  generateDeterministicWorkout,
  generateDynamicRecommendations,
  generateProgressionRules,
} from './rulesEngine.js'
import { enrichPlanWithOpenAI } from './openaiEnricher.js'

export async function generateWorkoutPlan(profile) {
  const weeklyPlan = generateDeterministicWorkout(profile)
  const score = generateUserScore(profile)
  const recommendations = generateDynamicRecommendations(profile, profile.history || [])
  const progressionRules = generateProgressionRules(profile.level)
  const coachingInsights = generateCoachingInsights(profile, score)

  // Punto de integración futura con LLM:
  // 1) se construye prompt estructurado
  // 2) se enriquece el resultado de reglas con respuesta del modelo
  const llmPromptPreview = buildStructuredPrompt(profile)

  const basePlan = {
    summary: `Plan inteligente de ${profile.weeklyAvailability} días orientado a ${profile.goal.replaceAll('_', ' ')} para nivel ${profile.level}.`,
    weeklyPlan,
    recommendations,
    progressionRules,
    coachingInsights,
    score,
    metadata: {
      engine: 'hybrid-rules-v1',
      llmReady: true,
      promptPreview: llmPromptPreview,
      generatedAt: new Date().toISOString(),
    },
  }

  return enrichPlanWithOpenAI(profile, basePlan)
}
