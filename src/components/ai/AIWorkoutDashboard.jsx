import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import GlassCard from '../ui/GlassCard.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'
import MotionInView from '../ui/MotionInView.jsx'
import { getLatestAiPlan, getWorkoutLogs, regenerateAiPlan, saveWorkoutLog } from '../../services/securedAiApi.js'
import '../../styles/ai/AIWorkoutDashboard.css'

export default function AIWorkoutDashboard({ plan }) {
  const [remotePlan, setRemotePlan] = useState(null)
  const [logState, setLogState] = useState({})
  const [logs, setLogs] = useState([])

  useEffect(() => {
    let cancelled = false

    async function loadLatest() {
      try {
        const response = await getLatestAiPlan()
        if (!cancelled && response?.plan?.plan) {
          setRemotePlan(response.plan.plan)
        }
      } catch {
        // fallback silencioso al plan local
      }

      try {
        const historyResponse = await getWorkoutLogs()
        if (!cancelled) {
          setLogs(historyResponse.logs || [])
        }
      } catch {
        // fallback silencioso
      }
    }

    loadLatest()
    return () => {
      cancelled = true
    }
  }, [])

  const effectivePlan = remotePlan || plan

  if (!effectivePlan) return null

  const recentLogs = logs.slice(0, 5)
  const completedRecent = recentLogs.filter((log) => log.completed === 1 || log.completed === true).length
  const adherencePct = recentLogs.length ? Math.round((completedRecent / recentLogs.length) * 100) : 0

  async function handleRegenerate() {
    try {
      const assessment = JSON.parse(localStorage.getItem('planmi21k_ai_assessment') || 'null')
      if (!assessment) return

      const nextPlan = await regenerateAiPlan(assessment)
      localStorage.setItem('planmi21k_ai_plan', JSON.stringify(nextPlan))
      setRemotePlan(nextPlan)
    } catch {
      // noop
    }
  }

  async function handleLogWorkout(dayLabel) {
    const formState = logState[dayLabel] || { completed: true, perceivedEffort: 7, notes: '' }

    try {
      await saveWorkoutLog({
        dayLabel,
        completed: formState.completed,
        perceivedEffort: Number(formState.perceivedEffort),
        notes: formState.notes,
      })

      setLogState((prev) => ({
        ...prev,
        [dayLabel]: {
          ...formState,
          saved: true,
          error: '',
        },
      }))
    } catch (error) {
      setLogState((prev) => ({
        ...prev,
        [dayLabel]: {
          ...formState,
          saved: false,
          error: error.message,
        },
      }))
    }
  }

  function updateLogField(dayLabel, field, value) {
    setLogState((prev) => ({
      ...prev,
      [dayLabel]: {
        completed: true,
        perceivedEffort: 7,
        notes: '',
        ...prev[dayLabel],
        [field]: value,
        saved: false,
        error: '',
      },
    }))
  }

  return (
    <section className="ai-dashboard-page">
      <MotionInView className="ai-dashboard-head">
        <p className="ai-kicker">AI Coach Dashboard</p>
        <h1>Tu sistema inteligente de entrenamiento</h1>
        <p>{effectivePlan.summary}</p>
      </MotionInView>

      <div className="ai-dashboard-score-grid">
        <GlassCard className="ai-score-card"><ProgressBar value={effectivePlan.score?.readiness || 0} label="Readiness" sublabel="Preparación actual" /></GlassCard>
        <GlassCard className="ai-score-card"><ProgressBar value={effectivePlan.score?.recovery || 0} label="Recovery" sublabel="Recuperación estimada" /></GlassCard>
        <GlassCard className="ai-score-card"><ProgressBar value={effectivePlan.score?.adherencePrediction || 0} label="Adherence" sublabel="Sostenibilidad del plan" /></GlassCard>
      </div>

      <div className="ai-dashboard-layout">
        <GlassCard className="ai-dashboard-panel main">
          <h2>Rutina semanal</h2>
          <div className="ai-dashboard-days">
            {effectivePlan.weeklyPlan?.map((day) => (
              <div className="ai-dashboard-day" key={day.day}>
                <div className="ai-dashboard-day-head">
                  <h3>{day.day}</h3>
                  <span>{day.focus}</span>
                </div>
                <div className="ai-dashboard-exercises">
                  {day.workout?.map((exercise) => (
                    <div className="ai-dashboard-exercise" key={`${day.day}-${exercise.exercise}`}>
                      <strong>{exercise.exercise}</strong>
                      <span>{exercise.sets} x {exercise.reps}</span>
                      <span>{exercise.restSec}s descanso</span>
                    </div>
                  ))}
                </div>

                <div className="ai-log-box">
                  <div className="ai-log-row">
                    <label className="ai-inline-check">
                      <input
                        type="checkbox"
                        checked={(logState[day.day]?.completed ?? true)}
                        onChange={(e) => updateLogField(day.day, 'completed', e.target.checked)}
                      />
                      <span>Entrenamiento completado</span>
                    </label>

                    <label className="ai-rpe-field">
                      <span>RPE</span>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={logState[day.day]?.perceivedEffort ?? 7}
                        onChange={(e) => updateLogField(day.day, 'perceivedEffort', e.target.value)}
                      />
                    </label>
                  </div>

                  <textarea
                    className="ai-log-notes"
                    placeholder="Notas del día: técnica, fatiga, sensaciones..."
                    value={logState[day.day]?.notes ?? ''}
                    onChange={(e) => updateLogField(day.day, 'notes', e.target.value)}
                  />

                  <div className="ai-log-actions">
                    <button className="ai-mini-action" onClick={() => handleLogWorkout(day.day)}>
                      Guardar sesión
                    </button>
                    {logState[day.day]?.saved ? <span className="ai-log-ok">Guardado</span> : null}
                    {logState[day.day]?.error ? <span className="ai-log-error">{logState[day.day].error}</span> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="ai-dashboard-side">
          <GlassCard className="ai-dashboard-panel">
            <h2>Recomendaciones</h2>
            <ul>
              {effectivePlan.recommendations?.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="ai-log-actions" style={{ marginTop: 16 }}>
              <button className="ai-mini-action" onClick={handleRegenerate}>Regenerar con historial</button>
            </div>
          </GlassCard>
          <GlassCard className="ai-dashboard-panel">
            <h2>Insights</h2>
            <ul>
              {effectivePlan.coachingInsights?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </GlassCard>
          <GlassCard className="ai-dashboard-panel">
            <h2>Motor IA</h2>
            <p>Engine: {effectivePlan.metadata?.engine}</p>
            <p>LLM Ready: {effectivePlan.metadata?.llmReady ? 'Sí' : 'No'}</p>
            <p>Generado: {new Date(effectivePlan.metadata?.generatedAt).toLocaleString('es-ES')}</p>
            <p>Adherencia reciente: {adherencePct}%</p>
          </GlassCard>
          <GlassCard className="ai-dashboard-panel">
            <h2>Historial reciente</h2>
            {recentLogs.length ? (
              <div className="ai-dashboard-exercises">
                {recentLogs.map((log) => (
                  <div className="ai-dashboard-exercise" key={log.id}>
                    <strong>{log.day_label}</strong>
                    <span>{log.completed ? 'Completado' : 'No completado'}</span>
                    <span>RPE: {log.perceived_effort ?? '-'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Aún no hay sesiones registradas.</p>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

AIWorkoutDashboard.propTypes = {
  plan: PropTypes.object,
}
