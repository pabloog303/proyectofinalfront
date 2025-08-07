// src/components/ConfigPlan.jsx
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../styles/ConfigPlan.css'

export default function ConfigPlan({ user, setPlan }) {
  const [fechaCarrera, setFechaCarrera] = useState('')
  const [nivel, setNivel] = useState('principiante')
  const [diasPorSemana, setDiasPorSemana] = useState(3)
  const [error, setError] = useState('')

  function generarPlan() {
    if (!fechaCarrera) {
      setError('Por favor selecciona la fecha de la carrera')
      return
    }
    setError('')

    const fechaFin = new Date(fechaCarrera)
    const hoy = new Date()
    const diffDias = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24))
    const semanas = Math.floor(diffDias / 7)

    let planSemanal = []
    for (let i = 1; i <= semanas; i++) {
      let entrenos = []
      for (let d = 1; d <= 7; d++) {
        entrenos.push({
          id: uuidv4(),
          dia: d,
          descripcion:
            d <= diasPorSemana
              ? nivel === 'principiante'
                ? 'Entrenamiento suave'
                : nivel === 'intermedio'
                ? 'Entrenamiento moderado'
                : 'Entrenamiento intenso'
              : 'Descanso',
          completado: false,
        })
      }
      planSemanal.push({ semana: i, entrenos })
    }

    setPlan({ fechaCarrera, nivel, diasPorSemana, planSemanal })
  }

  return (
    <div className="config-plan">
      <h2>Configura tu plan para el medio maratón</h2>
      <div>
        <label>Fecha de la carrera:</label><br />
        <input
          type="date"
          value={fechaCarrera}
          onChange={e => setFechaCarrera(e.target.value)}
        />
      </div>
      <div>
        <label>Nivel de experiencia:</label><br />
        <select value={nivel} onChange={e => setNivel(e.target.value)}>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>
      <div>
        <label>Días disponibles para entrenar por semana:</label><br />
        <input
          type="number"
          min="1"
          max="7"
          value={diasPorSemana}
          onChange={e => setDiasPorSemana(Number(e.target.value))}
        />
      </div>
      <button onClick={generarPlan}>
        Generar plan
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
