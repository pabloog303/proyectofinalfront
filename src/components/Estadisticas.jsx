import React from 'react'
import '../styles/Estadisticas.css'

export default function Estadisticas({ plan }) {
  if (!plan || !plan.planSemanal) return <p>No hay plan para mostrar estadísticas</p>

  const totalEntrenos = plan.planSemanal.reduce(
    (acc, sem) => acc + sem.entrenos.length,
    0
  )
  const completados = plan.planSemanal.reduce(
    (acc, sem) => acc + sem.entrenos.filter(e => e.completado).length,
    0
  )

  const porcentaje = totalEntrenos > 0 ? ((completados / totalEntrenos) * 100).toFixed(1) : 0

  return (
    <div className="estadisticas">
      <p className="titulo">📊 Estadísticas de Cumplimiento</p>
      <p><strong>Total entrenamientos:</strong> {totalEntrenos}</p>
      <p><strong>Entrenamientos completados:</strong> {completados}</p>
      <p><strong>Progreso:</strong> {porcentaje}%</p>

      <div className="progress-bar">
        <div className="fill" style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  )
}
