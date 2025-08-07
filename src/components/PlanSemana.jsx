import React, { useEffect } from 'react'
import '../styles/PlanSemana.css'

export default function PlanSemana({ plan, setPlan }) {
  // Inicializa completado en false si no existe para cada entreno
  useEffect(() => {
    const planActualizado = {
      ...plan,
      planSemanal: plan.planSemanal.map(sem => ({
        ...sem,
        entrenos: sem.entrenos.map(e => ({
          ...e,
          completado: e.completado ?? false, // solo si no existe
        })),
      })),
    }
    // Solo actualiza si hay alguna diferencia para evitar render infinito
    const distinto = plan.planSemanal.some((sem, i) =>
      sem.entrenos.some((e, j) => e.completado !== planActualizado.planSemanal[i].entrenos[j].completado)
    )
    if (distinto) setPlan(planActualizado)
  }, [plan, setPlan])

  function toggleCompletar(semIndex, entrenoId) {
    const nuevoPlanSemanal = plan.planSemanal.map((sem, i) => {
      if (i !== semIndex) return sem
      return {
        ...sem,
        entrenos: sem.entrenos.map(e => {
          if (e.id !== entrenoId) return e
          return { ...e, completado: !e.completado }
        }),
      }
    })
    setPlan({ ...plan, planSemanal: nuevoPlanSemanal })
  }

  return (
    <div className="plan-semana">
      <h2>Plan Semanal</h2>
      {plan.planSemanal.length === 0 && <p>No hay plan generado.</p>}
      {plan.planSemanal.map((sem, i) => (
        <div key={sem.semana}>
          <h3>Semana {sem.semana}</h3>
          <ul>
            {sem.entrenos.map(entreno => (
              <li key={entreno.id} className={entreno.completado ? 'completado' : ''}>
                <div className="entreno-item">
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={entreno.completado}
                      onChange={() => toggleCompletar(i, entreno.id)}
                    />
                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        className="path"
                      ></path>
                    </svg>
                  </label>
                  <span className="descripcion-entreno">
                    Día {entreno.dia}: {entreno.descripcion}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
