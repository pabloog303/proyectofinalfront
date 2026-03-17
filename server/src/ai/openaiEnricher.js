import OpenAI from 'openai'

const apiKey = globalThis.process?.env?.OPENAI_API_KEY
const llmModel = globalThis.process?.env?.OPENAI_MODEL || 'gpt-4.1-mini'
const client = apiKey ? new OpenAI({ apiKey, timeout: 15_000 }) : null

export async function enrichPlanWithOpenAI(profile, basePlan) {
  if (!client) {
    return {
      ...basePlan,
      metadata: {
        ...basePlan.metadata,
        llmEnabled: false,
        llmModel: null,
      },
    }
  }

  try {
    const completion = await client.chat.completions.create({
      model: llmModel,
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'Eres un coach fitness premium. Enriqueces planes estructurados, manteniendo seguridad y consistencia. Devuelve solo JSON válido.',
        },
        {
          role: 'user',
          content: JSON.stringify({ profile, basePlan }),
        },
      ],
    })

    const parsed = JSON.parse(completion.choices[0].message.content)
    return {
      ...basePlan,
      recommendations: parsed.recommendations || basePlan.recommendations,
      coachingInsights: parsed.coachingInsights || basePlan.coachingInsights,
      metadata: {
        ...basePlan.metadata,
        llmEnabled: true,
        llmModel,
      },
    }
  } catch (error) {
    return {
      ...basePlan,
      metadata: {
        ...basePlan.metadata,
        llmEnabled: false,
        llmModel,
        llmFallbackReason: error.message,
      },
    }
  }
}
