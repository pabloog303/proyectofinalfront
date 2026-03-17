function authHeaders() {
  const token = localStorage.getItem('planmi21k_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function saveFitnessAssessment(payload) {
  const response = await fetch('/api/fitness-assessment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data?.error || 'No se pudo guardar el assessment')
  return data
}

export async function saveWorkoutLog(payload) {
  const response = await fetch('/api/workout-log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data?.error || 'No se pudo guardar el workout log')
  return data
}

export async function getWorkoutLogs() {
  const response = await fetch('/api/workout-log', {
    headers: {
      ...authHeaders(),
    },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data?.error || 'No se pudo cargar el historial')
  return data
}

export async function regenerateAiPlan(payload) {
  const response = await fetch('/api/generate-workout-plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data?.error || 'No se pudo regenerar el plan')
  return data
}

export async function getLatestAiPlan() {
  const response = await fetch('/api/workout-plan/latest', {
    headers: {
      ...authHeaders(),
    },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data?.error || 'No se pudo cargar el plan')
  return data
}
