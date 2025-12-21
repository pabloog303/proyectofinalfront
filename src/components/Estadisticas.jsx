import '../styles/Estadisticas.css'

export default function Estadisticas({ plan }) {
  if (!plan || !plan.planSemanal) return <p>No hay plan para mostrar estadísticas</p>

  // Calcular estadísticas generales
  const totalEntrenos = plan.planSemanal.reduce(
    (acc, sem) => acc + sem.entrenos.filter(e => e.distancia > 0).length,
    0
  )
  
  const completados = plan.planSemanal.reduce(
    (acc, sem) => acc + sem.entrenos.filter(e => e.completado && e.distancia > 0).length,
    0
  )

  const porcentaje = totalEntrenos > 0 ? ((completados / totalEntrenos) * 100).toFixed(1) : 0

  // Calcular kilómetros
  const totalKm = plan.planSemanal.reduce(
    (acc, sem) => acc + sem.entrenos.reduce((sum, e) => sum + (e.distancia || 0), 0),
    0
  ).toFixed(1)

  const kmCompletados = plan.planSemanal.reduce(
    (acc, sem) => acc + sem.entrenos.reduce((sum, e) => sum + (e.completado ? (e.distancia || 0) : 0), 0),
    0
  ).toFixed(1)

  const kmRestantes = (totalKm - kmCompletados).toFixed(1)

  // Calcular semanas
  const hoy = new Date()
  const fechaCarrera = new Date(plan.fechaCarrera)
  const fechaInicio = new Date(plan.fechaInicio || hoy)
  
  const semanasRestantes = Math.max(0, Math.ceil((fechaCarrera - hoy) / (1000 * 60 * 60 * 24 * 7)))
  const semanasTranscurridas = Math.ceil((hoy - fechaInicio) / (1000 * 60 * 60 * 24 * 7))
  const totalSemanas = plan.totalSemanas || plan.planSemanal.length

  // Estadísticas por tipo de entrenamiento
  const tiposStats = {}
  plan.planSemanal.forEach(sem => {
    sem.entrenos.forEach(e => {
      if (e.distancia > 0 && e.tipo) {
        if (!tiposStats[e.tipo]) {
          tiposStats[e.tipo] = { total: 0, completados: 0, km: 0 }
        }
        tiposStats[e.tipo].total++
        if (e.completado) {
          tiposStats[e.tipo].completados++
          tiposStats[e.tipo].km += e.distancia
        }
      }
    })
  })

  // Recomendaciones
  const generarRecomendaciones = () => {
    const recomendaciones = []
    
    if (porcentaje < 50) {
      recomendaciones.push('Tu cumplimiento está por debajo del 50%. Intenta mantener la consistencia.')
    } else if (porcentaje >= 80) {
      recomendaciones.push('¡Excelente cumplimiento! Sigue así.')
    }

    if (semanasRestantes <= 2) {
      recomendaciones.push('Estás en fase de tapering. Reduce volumen y descansa bien.')
    } else if (semanasRestantes <= 4) {
      recomendaciones.push('Última fase de entrenamiento. Mantén la intensidad.')
    }

    const kmPromedioPorSemana = (parseFloat(kmCompletados) / semanasTranscurridas).toFixed(1)
    recomendaciones.push(`Promedio semanal: ${kmPromedioPorSemana} km/semana`)

    if (parseFloat(kmRestantes) > 200) {
      recomendaciones.push('Aún te quedan muchos kilómetros. ¡No abandones!')
    }

    return recomendaciones
  }

  const recomendaciones = generarRecomendaciones()

  return (
    <div className="estadisticas">
      <h2 className="titulo">Estadísticas de Tu Entrenamiento</h2>
      
      <div className="stats-grid">
        {/* Card principal */}
        <div className="stat-card principal">
          <h3>Progreso General</h3>
          <div className="stat-main">
            <span className="stat-numero">{porcentaje}%</span>
            <span className="stat-label">Completado</span>
          </div>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${porcentaje}%` }} />
          </div>
          <p className="stat-detalle">{completados} de {totalEntrenos} entrenamientos</p>
        </div>

        {/* Kilómetros */}
        <div className="stat-card">
          <div className="stat-icon-text">KM</div>
          <h3>Kilómetros</h3>
          <div className="stat-numero">{kmCompletados}</div>
          <div className="stat-label">de {totalKm} km totales</div>
          <div className="stat-secundario">{kmRestantes} km restantes</div>
        </div>

        {/* Semanas */}
        <div className="stat-card">
          <div className="stat-icon-text">SEM</div>
          <h3>Semanas</h3>
          <div className="stat-numero">{semanasTranscurridas}</div>
          <div className="stat-label">de {totalSemanas} semanas</div>
          <div className="stat-secundario">{semanasRestantes} semanas restantes</div>
        </div>

        {/* Fecha carrera */}
        <div className="stat-card">
          <div className="stat-icon-text">META</div>
          <h3>Fecha de Carrera</h3>
          <div className="stat-fecha">{fechaCarrera.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div className="stat-secundario">{semanasRestantes > 0 ? `En ${semanasRestantes} semana${semanasRestantes !== 1 ? 's' : ''}` : '¡Es esta semana!'}</div>
        </div>
      </div>

      {/* Estadísticas por tipo */}
      <div className="tipos-section">
        <h3>Progreso por Tipo de Entrenamiento</h3>
        <div className="tipos-grid">
          {Object.entries(tiposStats).map(([tipo, stats]) => (
            <div key={tipo} className="tipo-card">
              <h4>{tipo}</h4>
              <div className="tipo-stats">
                <div className="tipo-stat">
                  <span className="tipo-numero">{stats.completados}/{stats.total}</span>
                  <span className="tipo-label">Completados</span>
                </div>
                <div className="tipo-stat">
                  <span className="tipo-numero">{stats.km.toFixed(1)}</span>
                  <span className="tipo-label">km totales</span>
                </div>
              </div>
              <div className="tipo-progress">
                <div className="tipo-fill" style={{ width: `${(stats.completados / stats.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="recomendaciones-section">
        <h3>Recomendaciones</h3>
        <div className="recomendaciones-list">
          {recomendaciones.map((rec, i) => (
            <div key={i} className="recomendacion-item">
              {rec}
            </div>
          ))}
        </div>
      </div>

      {/* Motivación */}
      <div className="motivacion-card">
        <h3>¡Sigue adelante!</h3>
        <p>
          {porcentaje >= 80
            ? '¡Estás haciendo un trabajo increíble! Tu dedicación te llevará a cruzar esa línea de meta.'
            : porcentaje >= 50
            ? 'Vas por buen camino. Mantén el enfoque y la consistencia.'
            : 'Cada entrenamiento cuenta. ¡No te rindas, tú puedes lograrlo!'}
        </p>
      </div>
    </div>
  )
}
