// src/components/ConfigPlan.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import '../styles/ConfigPlan.css'

export default function ConfigPlan({ user, setPlan }) {
  const navigate = useNavigate()
  const [fechaCarrera, setFechaCarrera] = useState('')
  const [nivel, setNivel] = useState('principiante')
  const [diasPorSemana, setDiasPorSemana] = useState(3)
  const [error, setError] = useState('')

  function generarPlan() {
    if (!fechaCarrera) {
      setError('Por favor selecciona la fecha de la carrera')
      return
    }

    const fechaFin = new Date(fechaCarrera)
    const hoy = new Date()
    
    if (fechaFin <= hoy) {
      setError('La fecha de la carrera debe ser futura')
      return
    }

    const diffDias = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24))
    const semanas = Math.floor(diffDias / 7)

    if (semanas < 4) {
      setError('Necesitas al menos 4 semanas para prepararte adecuadamente')
      return
    }

    setError('')

    // Genera el plan profesional
    let planSemanal = []
    
    for (let i = 1; i <= semanas; i++) {
      const fase = obtenerFase(i, semanas)
      let entrenos = []
      
      for (let d = 1; d <= 7; d++) {
        const entrenamientoData = generarEntrenamientoPorDia(nivel, i, semanas, d, diasPorSemana, fase)
        entrenos.push({
          id: uuidv4(),
          dia: d,
          ...entrenamientoData,
          completado: false,
        })
      }
      planSemanal.push({ semana: i, entrenos })
    }

    const nuevoPlan = { 
      fechaCarrera, 
      nivel, 
      diasPorSemana, 
      planSemanal,
      fechaInicio: hoy.toISOString(),
      totalSemanas: semanas
    }
    
    setPlan(nuevoPlan)
    
    // Navegar automáticamente al plan después de generarlo
    setTimeout(() => {
      navigate('/mi-plan')
    }, 100)
  }

  function obtenerFase(semana, totalSemanas) {
    const porcentaje = semana / totalSemanas
    if (porcentaje <= 0.33) return 'base'
    if (porcentaje <= 0.66) return 'construccion'
    if (porcentaje <= 0.90) return 'intensidad'
    return 'tapering'
  }

  function generarEntrenamientoPorDia(nivel, semana, totalSemanas, dia, diasPorSemana, fase) {
    const baseKm = nivel === 'principiante' ? 5 : nivel === 'intermedio' ? 7 : 9
    
    // Días de descanso
    if (dia > diasPorSemana) {
      return {
        tipo: 'Descanso',
        distancia: 0,
        descripcion: 'Día de descanso completo',
        ritmo: '-',
        objetivo: 'Recuperación muscular'
      }
    }

    // PRINCIPIANTE
    if (nivel === 'principiante') {
      if (dia === 1) {
        const dist = baseKm + (semana * 0.3)
        return {
          tipo: 'Rodaje Suave',
          distancia: dist,
          descripcion: `Rodaje suave ${dist.toFixed(1)} km`,
          ritmo: '6:30-7:00 min/km',
          objetivo: 'Base aeróbica'
        }
      }
      if (dia === 2) {
        return {
          tipo: 'Descanso',
          distancia: 0,
          descripcion: 'Descanso o movilidad',
          ritmo: '-',
          objetivo: 'Recuperación'
        }
      }
      if (dia === 3) {
        const dist = (baseKm - 1) + (semana * 0.2)
        if (fase === 'intensidad' && semana % 2 === 0) {
          return {
            tipo: 'Fartlek',
            distancia: dist,
            descripcion: `Fartlek ${dist.toFixed(1)} km - Alternar 2 min rápido/suave`,
            ritmo: '5:45-6:15 min/km',
            objetivo: 'Velocidad'
          }
        }
        return {
          tipo: 'Rodaje Medio',
          distancia: dist,
          descripcion: `Rodaje medio ${dist.toFixed(1)} km`,
          ritmo: '6:00-6:30 min/km',
          objetivo: 'Ritmo controlado'
        }
      }
      if (dia === 4) {
        return {
          tipo: 'Descanso',
          distancia: 0,
          descripcion: 'Descanso activo',
          ritmo: '-',
          objetivo: 'Recuperación'
        }
      }
      // Rodaje largo
      const largo = fase === 'tapering' ? 10 : Math.min(baseKm + (semana * 0.8), 18)
      return {
        tipo: 'Rodaje Largo',
        distancia: largo,
        descripcion: `Rodaje largo ${largo.toFixed(1)} km`,
        ritmo: '6:30-7:00 min/km',
        objetivo: 'Resistencia larga distancia'
      }
    }

    // INTERMEDIO
    if (nivel === 'intermedio') {
      if (dia === 1) {
        const dist = baseKm + (semana * 0.3)
        return {
          tipo: 'Rodaje Suave',
          distancia: dist,
          descripcion: `Rodaje suave ${dist.toFixed(1)} km`,
          ritmo: '5:45-6:15 min/km',
          objetivo: 'Recuperación activa'
        }
      }
      if (dia === 2) {
        const dist = 8 + (semana * 0.2)
        if (fase === 'construccion' || fase === 'intensidad') {
          return {
            tipo: 'Tempo Run',
            distancia: dist,
            descripcion: `Tempo: 2km calentamiento + ${(dist - 4).toFixed(1)}km tempo + 2km vuelta a la calma`,
            ritmo: '5:15-5:30 min/km (tempo)',
            objetivo: 'Umbral anaeróbico'
          }
        }
        return {
          tipo: 'Rodaje Medio',
          distancia: dist,
          descripcion: `Rodaje medio ${dist.toFixed(1)} km`,
          ritmo: '5:45-6:00 min/km',
          objetivo: 'Resistencia aeróbica'
        }
      }
      if (dia === 3) {
        return {
          tipo: 'Descanso',
          distancia: 0,
          descripcion: 'Descanso o yoga',
          ritmo: '-',
          objetivo: 'Recuperación'
        }
      }
      if (dia === 4) {
        const dist = 7 + (semana * 0.25)
        if (fase === 'intensidad' && semana % 2 === 1) {
          return {
            tipo: 'Intervalos',
            distancia: dist,
            descripcion: `Intervalos: 2km + 6x1000m (rec:400m) + 2km`,
            ritmo: '4:45-5:00 min/km (series)',
            objetivo: 'VO2 máx'
          }
        }
        return {
          tipo: 'Fartlek',
          distancia: dist,
          descripcion: `Fartlek ${dist.toFixed(1)} km`,
          ritmo: 'Variable',
          objetivo: 'Juegos de ritmo'
        }
      }
      if (dia === 5 && diasPorSemana >= 5) {
        return {
          tipo: 'Recuperación',
          distancia: 5,
          descripcion: 'Rodaje recuperación 5 km',
          ritmo: '6:15-6:45 min/km',
          objetivo: 'Recuperación activa'
        }
      }
      // Rodaje largo
      const largo = fase === 'tapering' ? 12 : Math.min(baseKm + (semana * 1), 19)
      return {
        tipo: 'Rodaje Largo',
        distancia: largo,
        descripcion: `Rodaje largo ${largo.toFixed(1)} km`,
        ritmo: '5:45-6:15 min/km',
        objetivo: 'Resistencia específica'
      }
    }

    // AVANZADO
    if (dia === 1) {
      const dist = baseKm + (semana * 0.3)
      return {
        tipo: 'Rodaje Suave',
        distancia: dist,
        descripcion: `Rodaje suave ${dist.toFixed(1)} km`,
        ritmo: '5:15-5:45 min/km',
        objetivo: 'Volumen aeróbico'
      }
    }
    if (dia === 2) {
      const dist = 10 + (semana * 0.3)
      return {
        tipo: 'Tempo Run',
        distancia: dist,
        descripcion: `Tempo: 3km + ${(dist - 6).toFixed(1)}km tempo + 3km`,
        ritmo: '4:45-5:00 min/km (tempo)',
        objetivo: 'Umbral lactato'
      }
    }
    if (dia === 3) {
      return {
        tipo: 'Recuperación',
        distancia: 6,
        descripcion: 'Rodaje recuperación 6 km',
        ritmo: '5:45-6:15 min/km',
        objetivo: 'Recuperación activa'
      }
    }
    if (dia === 4) {
      const dist = 10 + (semana * 0.25)
      if (fase === 'intensidad') {
        return {
          tipo: 'Series',
          distancia: dist,
          descripcion: `Series: 3km + 8x1000m (rec:2min) + 2km`,
          ritmo: '4:30-4:45 min/km (series)',
          objetivo: 'Potencia aeróbica'
        }
      }
      return {
        tipo: 'Intervalos',
        distancia: dist,
        descripcion: `Intervalos: 3km + 5x1km (rec:400m) + 2km`,
        ritmo: '4:40-4:55 min/km',
        objetivo: 'VO2 máx'
      }
    }
    if (dia === 5) {
      const dist = 8 + (semana * 0.2)
      return {
        tipo: 'Rodaje Medio',
        distancia: dist,
        descripcion: `Rodaje medio ${dist.toFixed(1)} km`,
        ritmo: '5:15-5:30 min/km',
        objetivo: 'Ritmo de carrera'
      }
    }
    if (dia === 6 && diasPorSemana >= 6) {
      return {
        tipo: 'Recuperación',
        distancia: 6,
        descripcion: 'Rodaje suave 6 km',
        ritmo: '5:45-6:15 min/km',
        objetivo: 'Recuperación'
      }
    }
    // Rodaje largo
    const largo = fase === 'tapering' ? 14 : Math.min(baseKm + (semana * 1.2), 20)
    return {
      tipo: 'Rodaje Largo',
      distancia: largo,
      descripcion: `Rodaje largo ${largo.toFixed(1)} km`,
      ritmo: '5:15-5:45 min/km',
      objetivo: 'Resistencia medio maratón'
    }
  }

  return (
    <div className="config-plan">
      <h2>Configura tu Plan de Medio Maratón</h2>
      <p className="intro-text">
        Personaliza tu plan de entrenamiento para alcanzar tu objetivo de 21K
      </p>
      
      <div className="form-container">
        <div className="form-group">
          <label>Fecha de la carrera:</label>
          <input
            type="date"
            value={fechaCarrera}
            onChange={e => setFechaCarrera(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="form-group">
          <label>Nivel de experiencia:</label>
          <select value={nivel} onChange={e => setNivel(e.target.value)}>
            <option value="principiante">Principiante - Puedo correr 5-8 km</option>
            <option value="intermedio">Intermedio - Puedo correr 10-15 km</option>
            <option value="avanzado">Avanzado - Experiencia en medio maratón</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Días disponibles por semana:</label>
          <div className="dias-selector">
            {[3, 4, 5, 6].map(num => (
              <button
                key={num}
                className={`dia-btn ${diasPorSemana === num ? 'active' : ''}`}
                onClick={() => setDiasPorSemana(num)}
              >
                {num} días
              </button>
            ))}
          </div>
        </div>

        <button className="generar-btn" onClick={generarPlan}>
          Generar Mi Plan Personalizado
        </button>
        
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="info-card">
        <h3>¿Qué incluye tu plan?</h3>
        <ul>
          <li>Entrenamientos progresivos adaptados a tu nivel</li>
          <li>Rodajes largos para construir resistencia</li>
          <li>Entrenamientos de velocidad (tempo, intervalos, fartlek)</li>
          <li>Días de recuperación estratégicamente planificados</li>
          <li>Tapering final para llegar fresco a la carrera</li>
        </ul>
      </div>
    </div>
  )
}
