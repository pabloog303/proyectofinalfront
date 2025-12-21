import { useEffect } from 'react'
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
          completado: e.completado ?? false,
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

  // Obtener semana actual
  const hoy = new Date()
  const fechaInicio = new Date(plan.fechaInicio || hoy)
  const diffDias = Math.ceil((hoy - fechaInicio) / (1000 * 60 * 60 * 24))
  const semanaActual = Math.max(1, Math.ceil(diffDias / 7))

  // Agrupar entrenamientos por semana y filtrar descansos completos
  const semanasConEntrenos = plan.planSemanal.map(sem => ({
    ...sem,
    entrenosActivos: sem.entrenos.filter(e => e.distancia > 0)
  }))

  return (
    <div className="plan-semana">
      <div className="plan-header">
        <h2>Tu Plan de Entrenamiento</h2>
        <div className="plan-info">
          <span className="info-badge">Carrera: {new Date(plan.fechaCarrera).toLocaleDateString('es-ES')}</span>
          <span className="info-badge">Nivel: {plan.nivel}</span>
          <span className="info-badge">Semana {semanaActual} de {plan.totalSemanas || plan.planSemanal.length}</span>
        </div>
      </div>

      {plan.planSemanal.length === 0 && <p>No hay plan generado.</p>}
      
      {semanasConEntrenos.map((sem, i) => {
        const esActual = sem.semana === semanaActual
        const yaCompletada = sem.semana < semanaActual
        
        return (
          <div key={sem.semana} className={`semana-card ${esActual ? 'actual' : ''} ${yaCompletada ? 'completada' : ''}`}>
            <div className="semana-header">
              <h3>
                {esActual && '• '}
                Semana {sem.semana}
                {esActual && ' - Semana Actual'}
                {yaCompletada && ' ✓'}
              </h3>
              <div className="semana-stats">
                <span className="km-total">
                  {sem.entrenos.reduce((acc, e) => acc + (e.distancia || 0), 0).toFixed(1)} km
                </span>
                <span className="progreso-semana">
                  {sem.entrenosActivos.filter(e => e.completado).length}/{sem.entrenosActivos.length} completados
                </span>
              </div>
            </div>
            
            <div className="entrenos-grid">
              {sem.entrenos.map(entreno => {
                // No mostrar días de descanso sin entrenamiento
                if (entreno.distancia === 0) {
                  return (
                    <div key={entreno.id} className="entreno-descanso">
                      <div className="dia-badge">Día {entreno.dia}</div>
                      <div className="descanso-icon">Descanso</div>
                      <p className="descanso-text">{entreno.descripcion}</p>
                    </div>
                  )
                }

                return (
                  <div key={entreno.id} className={`entreno-card ${entreno.completado ? 'completado' : ''}`}>
                    <div className="entreno-header">
                      <div className="dia-badge">Día {entreno.dia}</div>
                      <span className={`tipo-badge tipo-${entreno.tipo?.toLowerCase().replace(/ /g, '-')}`}>
                        {entreno.tipo}
                      </span>
                    </div>
                    
                    <div className="entreno-body">
                      <div className="distancia-main">
                        <span className="numero">{entreno.distancia.toFixed(1)}</span>
                        <span className="unidad">km</span>
                      </div>
                      
                      <p className="descripcion">{entreno.descripcion}</p>
                      
                      <div className="entreno-detalles">
                        <div className="detalle-item">
                          <span className="icon">Ritmo:</span>
                          <span>{entreno.ritmo}</span>
                        </div>
                        <div className="detalle-item">
                          <span className="icon">Objetivo:</span>
                          <span>{entreno.objetivo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="entreno-footer">
                      <label className="checkbox-container">
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
                        <span className="checkbox-label">
                          {entreno.completado ? 'Completado ✓' : 'Marcar como completado'}
                        </span>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
