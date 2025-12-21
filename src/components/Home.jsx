import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">PlanMi21K</h1>
          <p className="hero-subtitle">
            Tu entrenador personal para completar tu primer medio maratón
          </p>
          <p className="hero-description">
            Genera planes de entrenamiento profesionales y personalizados
            basados en tu nivel, disponibilidad y fecha objetivo
          </p>
          <div className="hero-buttons">
            <Link to="/configurar-plan" className="btn-primary">
              Crear Mi Plan
            </Link>
            <Link to="/acerca-de" className="btn-secondary">
              Saber Más
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>¿Por qué PlanMi21K?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">P</div>
            <h3>Personalizado</h3>
            <p>Planes adaptados a tu nivel (principiante, intermedio, avanzado) y días disponibles para entrenar</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">C</div>
            <h3>Científico</h3>
            <p>Basado en metodología probada: progresión gradual, periodización y variedad de entrenamientos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">S</div>
            <h3>Seguimiento</h3>
            <p>Marca tus entrenamientos completados y visualiza tu progreso con estadísticas detalladas</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">G</div>
            <h3>Gratis</h3>
            <p>100% gratuito, sin suscripciones ni pagos. Tus datos se guardan localmente en tu dispositivo</p>
          </div>
        </div>
      </section>

      <section className="training-types">
        <h2>Tipos de Entrenamientos</h2>
        <p className="section-subtitle">
          Planes completos con entrenamientos variados para desarrollar todas tus capacidades
        </p>
        <div className="training-grid">
          <div className="training-item">
            <span className="training-badge rodaje-suave">Rodaje Suave</span>
            <p>Recuperación activa y construcción de base aeróbica</p>
          </div>
          <div className="training-item">
            <span className="training-badge rodaje-largo">Rodaje Largo</span>
            <p>Resistencia de larga distancia (hasta 20 km)</p>
          </div>
          <div className="training-item">
            <span className="training-badge tempo">Tempo Run</span>
            <p>Entrenamiento de umbral anaeróbico</p>
          </div>
          <div className="training-item">
            <span className="training-badge intervalos">Intervalos</span>
            <p>Series de velocidad para mejorar VO2 máx</p>
          </div>
          <div className="training-item">
            <span className="training-badge fartlek">Fartlek</span>
            <p>Juegos de ritmo para variedad y diversión</p>
          </div>
          <div className="training-item">
            <span className="training-badge series">Series</span>
            <p>Potencia aeróbica máxima (nivel avanzado)</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>¿Cómo Funciona?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Crea tu Cuenta</h3>
            <p>Registro rápido y sencillo. Tus datos se guardan solo en tu navegador</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Configura tu Plan</h3>
            <p>Selecciona tu nivel, fecha de carrera y días disponibles</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Entrena</h3>
            <p>Sigue tu plan personalizado y marca entrenamientos completados</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Completa tu 21K</h3>
            <p>Alcanza tu meta preparado y confiado</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>¿Listo para tu Medio Maratón?</h2>
          <p>Comienza hoy y alcanza tu meta con un plan profesional</p>
          <Link to="/configurar-plan" className="btn-cta">
            Comenzar Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
