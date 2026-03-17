export async function generateWorkoutPlan(payload) {
  const token = localStorage.getItem('planmi21k_token')
  const response = await fetch('/api/generate-workout-plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo generar el plan AI')
  }

  return data
}
