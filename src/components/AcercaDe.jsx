import '../styles/AcercaDe.css'

export default function AcercaDe() {
  return (
    <div className="acerca-de">
      <div className="hero-section">
        <h1>PlanMi21K</h1>
        <p className="subtitle">Tu entrenador personal para el medio maratón</p>
      </div>

      <div className="content-section">
        <div className="card">
          <h2>¿Qué es PlanMi21K?</h2>
          <p>
            PlanMi21K es una aplicación profesional diseñada para ayudarte a alcanzar tu objetivo
            de completar un medio maratón (21.0975 km). Generamos planes de entrenamiento
            personalizados basados en tu nivel de experiencia, disponibilidad y fecha de carrera.
          </p>
        </div>

        <div className="card">
          <h2>Objetivo</h2>
          <p>
            Nuestro objetivo es proporcionar planes de entrenamiento estructurados y científicamente
            fundamentados que te preparen física y mentalmente para completar tu medio maratón con
            éxito, minimizando el riesgo de lesiones y maximizando tu rendimiento.
          </p>
        </div>

        <div className="card">
          <h2>Metodología de Entrenamiento</h2>
          <div className="metodologia">
            <div className="metodo-item">
              <h3>Progresión Gradual</h3>
              <p>
                Incremento progresivo del volumen e intensidad, siguiendo la regla del 10% semanal
                para prevenir lesiones y permitir una adaptación adecuada.
              </p>
            </div>
            <div className="metodo-item">
              <h3>Variedad de Entrenamientos</h3>
              <p>
                Combinación de rodajes suaves, entrenamientos de tempo, series de velocidad y
                rodajes largos para desarrollar resistencia aeróbica, velocidad y economía de carrera.
              </p>
            </div>
            <div className="metodo-item">
              <h3>Recuperación Activa</h3>
              <p>
                Días de descanso estratégicamente planificados para permitir la adaptación muscular
                y prevenir el sobreentrenamiento.
              </p>
            </div>
            <div className="metodo-item">
              <h3>Periodización</h3>
              <p>
                División del plan en fases: base aeróbica, construcción de resistencia, pico de
                forma y tapering antes de la carrera.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Niveles de Entrenamiento</h2>
          <div className="niveles">
            <div className="nivel principiante">
              <h3>Principiante</h3>
              <ul>
                <li>Puedes correr 5-8 km cómodamente</li>
                <li>3-4 días de entrenamiento por semana</li>
                <li>Enfoque en construir base aeróbica</li>
                <li>Duración: 12-16 semanas</li>
              </ul>
            </div>
            <div className="nivel intermedio">
              <h3>Intermedio</h3>
              <ul>
                <li>Puedes correr 10-15 km regularmente</li>
                <li>4-5 días de entrenamiento por semana</li>
                <li>Incluye trabajo de velocidad y tempo</li>
                <li>Duración: 10-12 semanas</li>
              </ul>
            </div>
            <div className="nivel avanzado">
              <h3>Avanzado</h3>
              <ul>
                <li>Experiencia previa en medio maratón</li>
                <li>5-6 días de entrenamiento por semana</li>
                <li>Alta intensidad y volumen</li>
                <li>Duración: 8-10 semanas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Beneficios</h2>
          <div className="beneficios">
            <div className="beneficio-item">
              <div className="icon-circle">24/7</div>
              <h3>Acceso Completo</h3>
              <p>Tu plan siempre disponible, en cualquier momento y lugar</p>
            </div>
            <div className="beneficio-item">
              <div className="icon-circle">P</div>
              <h3>Personalización</h3>
              <p>Planes adaptados a tu nivel y disponibilidad</p>
            </div>
            <div className="beneficio-item">
              <div className="icon-circle">S</div>
              <h3>Seguimiento</h3>
              <p>Monitorea tu progreso y cumplimiento</p>
            </div>
            <div className="beneficio-item">
              <div className="icon-circle">R</div>
              <h3>Resultados</h3>
              <p>Metodología probada para alcanzar tus metas</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Consejos Importantes</h2>
          <ul className="consejos">
            <li>✅ Escucha siempre a tu cuerpo y descansa si sientes dolor</li>
            <li>✅ Mantente hidratado antes, durante y después de cada entrenamiento</li>
            <li>✅ Complementa tu entrenamiento con una alimentación adecuada</li>
            <li>✅ Incluye ejercicios de fuerza y flexibilidad</li>
            <li>✅ Usa calzado apropiado y renuévalo cada 600-800 km</li>
            <li>✅ Consulta con un médico antes de comenzar si tienes dudas</li>
          </ul>
        </div>

        <div className="cta-section">
          <h2>¿Listo para comenzar?</h2>
          <p>Configura tu plan personalizado y comienza tu viaje hacia el medio maratón</p>
        </div>
      </div>
    </div>
  )
}
