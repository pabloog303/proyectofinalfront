import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { generateWorkoutPlan } from '../../services/aiFitnessApi.js'
import { saveFitnessAssessment } from '../../services/securedAiApi.js'
import GlassCard from '../ui/GlassCard.jsx'
import MotionInView from '../ui/MotionInView.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'
import '../../styles/ai/AIAssessment.css'

const equipmentOptions = ['mancuernas', 'barra', 'cinta', 'bicicleta', 'kettlebell', 'banco', 'bandas']

const initialForm = {
  age: 28,
  weightKg: 72,
  heightCm: 175,
  level: 'intermedio',
  goal: 'resistencia',
  weeklyAvailability: 4,
  sessionsDurationMin: 60,
  equipment: ['mancuernas', 'barra'],
  injuries: [],
}

export default function AIAssessment({ onPlanGenerated }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const equipmentLabel = useMemo(() => form.equipment.join(', '), [form.equipment])

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleEquipment(item) {
    setForm((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter((eq) => eq !== item)
        : [...prev.equipment, item],
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await saveFitnessAssessment(form)
      const response = await generateWorkoutPlan(form)
      setResult(response)
      localStorage.setItem('planmi21k_ai_assessment', JSON.stringify(form))
      localStorage.setItem('planmi21k_ai_plan', JSON.stringify(response))
      onPlanGenerated(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="ai-assessment-page">
      <MotionInView className="ai-assessment-shell">
        <div className="ai-assessment-header">
          <p className="ai-kicker">AI Fitness Coach</p>
          <h1>Construye tu plan inteligente</h1>
          <p>
            Completa tu fitness assessment y genera una rutina personalizada con progresión,
            recomendaciones y scoring de rendimiento.
          </p>
        </div>

        <div className="ai-assessment-grid">
          <GlassCard className="ai-assessment-form-card">
            <form className="ai-form" onSubmit={handleSubmit}>
              <div className="ai-form-grid">
                <label>
                  <span>Edad</span>
                  <input type="number" value={form.age} onChange={(e) => updateField('age', Number(e.target.value))} />
                </label>
                <label>
                  <span>Peso (kg)</span>
                  <input type="number" value={form.weightKg} onChange={(e) => updateField('weightKg', Number(e.target.value))} />
                </label>
                <label>
                  <span>Estatura (cm)</span>
                  <input type="number" value={form.heightCm} onChange={(e) => updateField('heightCm', Number(e.target.value))} />
                </label>
                <label>
                  <span>Disponibilidad semanal</span>
                  <input type="number" min="1" max="7" value={form.weeklyAvailability} onChange={(e) => updateField('weeklyAvailability', Number(e.target.value))} />
                </label>
                <label>
                  <span>Nivel</span>
                  <select value={form.level} onChange={(e) => updateField('level', e.target.value)}>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </label>
                <label>
                  <span>Objetivo</span>
                  <select value={form.goal} onChange={(e) => updateField('goal', e.target.value)}>
                    <option value="ganar_musculo">Ganar músculo</option>
                    <option value="perder_grasa">Perder grasa</option>
                    <option value="resistencia">Resistencia</option>
                  </select>
                </label>
                <label>
                  <span>Duración por sesión</span>
                  <input type="number" min="20" max="180" value={form.sessionsDurationMin} onChange={(e) => updateField('sessionsDurationMin', Number(e.target.value))} />
                </label>
                <label>
                  <span>Equipo disponible</span>
                  <div className="ai-equipment-list">
                    {equipmentOptions.map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={`ai-chip ${form.equipment.includes(item) ? 'active' : ''}`}
                        onClick={() => toggleEquipment(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </label>
              </div>

              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="ai-submit" type="submit" disabled={loading}>
                {loading ? 'Generando plan…' : 'Generar plan AI'}
              </motion.button>

              {error ? <div className="ai-error">{error}</div> : null}
            </form>
          </GlassCard>

          <GlassCard className="ai-assessment-preview-card">
            <p className="ai-mini-kicker">Assessment Preview</p>
            <h3>Perfil actual</h3>
            <ul className="ai-preview-list">
              <li><span>Nivel</span><strong>{form.level}</strong></li>
              <li><span>Objetivo</span><strong>{form.goal.replace('_', ' ')}</strong></li>
              <li><span>Días</span><strong>{form.weeklyAvailability} / semana</strong></li>
              <li><span>Duración</span><strong>{form.sessionsDurationMin} min</strong></li>
              <li><span>Equipo</span><strong>{equipmentLabel || 'Sin equipo'}</strong></li>
            </ul>
            <p className="ai-preview-copy">
              La IA usará este perfil para crear una rutina con ejercicios, series, repeticiones,
              descansos y reglas de progresión.
            </p>
          </GlassCard>
        </div>
      </MotionInView>

      {result ? (
        <MotionInView className="ai-results-shell" delay={0.08}>
          <div className="ai-results-head">
            <p className="ai-kicker">Resultado generado</p>
            <h2>{result.summary}</h2>
          </div>

          <div className="ai-score-grid">
            <GlassCard className="ai-score-card">
              <ProgressBar value={result.score.readiness} label="Readiness" sublabel="Capacidad para progresar" />
            </GlassCard>
            <GlassCard className="ai-score-card">
              <ProgressBar value={result.score.recovery} label="Recovery" sublabel="Recuperación estimada" />
            </GlassCard>
            <GlassCard className="ai-score-card">
              <ProgressBar value={result.score.adherencePrediction} label="Adherence" sublabel="Probabilidad de adherencia" />
            </GlassCard>
          </div>

          <div className="ai-workout-grid">
            {result.weeklyPlan.map((day) => (
              <GlassCard key={day.day} className="ai-day-card">
                <p className="ai-mini-kicker">{day.day}</p>
                <h3>{day.focus}</h3>
                <p className="ai-duration">~ {day.estimatedDurationMin} min</p>
                <div className="ai-exercise-list">
                  {day.workout.map((exercise) => (
                    <div key={`${day.day}-${exercise.exercise}`} className="ai-exercise-item">
                      <strong>{exercise.exercise}</strong>
                      <span>{exercise.sets} series · {exercise.reps}</span>
                      <span>Descanso: {exercise.restSec}s</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="ai-insights-grid">
            <GlassCard className="ai-info-card">
              <h3>Recomendaciones AI</h3>
              <ul>
                {result.recommendations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </GlassCard>
            <GlassCard className="ai-info-card">
              <h3>Progressive overload</h3>
              <ul>
                {result.progressionRules.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </GlassCard>
            <GlassCard className="ai-info-card">
              <h3>Coaching insights</h3>
              <ul>
                {result.coachingInsights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </GlassCard>
          </div>
        </MotionInView>
      ) : null}
    </section>
  )
}

AIAssessment.propTypes = {
  onPlanGenerated: PropTypes.func,
}

AIAssessment.defaultProps = {
  onPlanGenerated: () => {},
}
