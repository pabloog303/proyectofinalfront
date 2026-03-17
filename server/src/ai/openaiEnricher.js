import OpenAI from 'openai'

const apiKey = globalThis.process?.env?.OPENAI_API_KEY
const client = apiKey ? new OpenAI({ apiKey }) : null

export async function enrichPlanWithOpenAI(profile, basePlan) {
  if (!client) {
    return {
      ...basePlan,
      metadata: {
        ...basePlan.metadata,
        llmEnabled: false,
      },
    }
  }

  const completion = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
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
      llmModel: 'gpt-4.1-mini',
    },
  }
}
