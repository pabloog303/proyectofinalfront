import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import '../styles/Home.css'
import MotionInView from './ui/MotionInView.jsx'
import GlassCard from './ui/GlassCard.jsx'
import Countdown from './ui/Countdown.jsx'
import ProgressBar from './ui/ProgressBar.jsx'
import WeekTimeline from './ui/WeekTimeline.jsx'

export default function Home() {
  const savedPlan = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('planmi21k_plan')) || null
    } catch {
      return null
    }
  }, [])

  const dashboard = useMemo(() => {
    if (!savedPlan?.planSemanal?.length) return null

    const totalEntrenos = savedPlan.planSemanal.reduce(
      (acc, sem) => acc + sem.entrenos.filter((e) => e.distancia > 0).length,
      0,
    )
    const completados = savedPlan.planSemanal.reduce(
      (acc, sem) => acc + sem.entrenos.filter((e) => e.completado && e.distancia > 0).length,
      0,
    )
    const porcentaje = totalEntrenos > 0 ? (completados / totalEntrenos) * 100 : 0

    const totalKm = savedPlan.planSemanal.reduce(
      (acc, sem) => acc + sem.entrenos.reduce((sum, e) => sum + (e.distancia || 0), 0),
      0,
    )
    const kmCompletados = savedPlan.planSemanal.reduce(
      (acc, sem) => acc + sem.entrenos.reduce((sum, e) => sum + (e.completado ? (e.distancia || 0) : 0), 0),
      0,
    )

    const hoy = new Date()
    const fechaInicio = new Date(savedPlan.fechaInicio || hoy)
    const diffDias = Math.ceil((hoy - fechaInicio) / (1000 * 60 * 60 * 24))
    const semanaActual = Math.max(1, Math.ceil(diffDias / 7))
    const totalSemanas = savedPlan.totalSemanas || savedPlan.planSemanal.length

    return {
      porcentaje,
      totalEntrenos,
      completados,
      totalKm,
      kmCompletados,
      semanaActual,
      totalSemanas,
      fechaCarrera: savedPlan.fechaCarrera,
      nivel: savedPlan.nivel,
    }
  }, [savedPlan])

  return (
    <div className="home">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="hero">
        <div className="hero-content">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Entrenamiento Profesional
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
          >
            PLAN<br />
            <span className="accent">MI</span> 21K
          </motion.h1>

          <motion.p
            className="hero-distance"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1], delay: 0.10 }}
          >
            21.0975 KM · MEDIO MARATÓN
          </motion.p>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
          >
            Convierte tu preparación en un sistema inteligente: planes personalizados, coaching dinámico,
            scoring de rendimiento y progresión guiada por IA.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1], delay: 0.20 }}
          >
            <Link to="/ai-assessment" className="btn-primary">
              Probar AI Coach
            </Link>
            <Link to="/configurar-plan" className="btn-primary">
              Crear Mi Plan Gratis
            </Link>
            <Link to="/acerca-de" className="btn-secondary">
              Ver Metodología
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.25 }}
          >
            <div className="hero-stat">
              <span className="hero-stat-value">AI</span>
              <span className="hero-stat-label">Coach</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">Insights</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">1:1</span>
              <span className="hero-stat-label">Personalización</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">Gratis</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ DASHBOARD (si hay plan) ══════════════════ */}
      <section className="levels-section" style={{ paddingTop: 0 }}>
        <MotionInView className="section-header" delay={0.05}>
          <p className="section-tag">Experiencia tipo app</p>
          <h2 className="section-title">Tu Dashboard<br />de Rendimiento</h2>
          <p className="section-subtitle">
            Tecnología + disciplina. Mira tu estado hoy y qué viene en el camino hacia tu 21K.
          </p>
        </MotionInView>

        <div className="levels-grid" style={{ alignItems: 'stretch' }}>
          <MotionInView delay={0.06}>
            <GlassCard className="level-card" as="article">
              <div className="level-badge">Estado</div>
              {dashboard ? (
                <>
                  <h3 style={{ marginBottom: 8 }}>Plan activo</h3>
                  <p className="level-desc">
                    Nivel <strong style={{ color: 'var(--color-text)' }}>{dashboard.nivel}</strong> · Semana{' '}
                    <strong style={{ color: 'var(--color-text)' }}>{dashboard.semanaActual}</strong> de{' '}
                    <strong style={{ color: 'var(--color-text)' }}>{dashboard.totalSemanas}</strong>
                  </p>
                  <ProgressBar
                    value={dashboard.porcentaje}
                    label="Progreso"
                    sublabel={`${dashboard.completados} de ${dashboard.totalEntrenos} entrenamientos`}
                  />
                </>
              ) : (
                <>
                  <h3 style={{ marginBottom: 8 }}>Sin plan aún</h3>
                  <p className="level-desc">
                    Crea tu plan y desbloquea un dashboard con progreso, timeline y countdown a tu carrera.
                  </p>
                  <div style={{ marginTop: 14 }}>
                    <Link to="/configurar-plan" className="btn-primary">
                      Crear mi plan
                    </Link>
                  </div>
                </>
              )}
            </GlassCard>
          </MotionInView>

          <MotionInView delay={0.10}>
            <GlassCard className="level-card" as="article">
              <div className="level-badge">Countdown</div>
              <h3 style={{ marginBottom: 8 }}>Próxima carrera</h3>
              <p className="level-desc">Cuenta regresiva para tu fecha objetivo. Mentalidad de competición.</p>
              <Countdown targetDate={dashboard?.fechaCarrera} />
            </GlassCard>
          </MotionInView>

          <MotionInView delay={0.14}>
            <GlassCard className="level-card" as="article">
              <div className="level-badge">Timeline</div>
              <h3 style={{ marginBottom: 8 }}>Ruta de 12 semanas</h3>
              <p className="level-desc">Visualiza tu avance. Cada semana cuenta. Cada sesión suma.</p>
              <WeekTimeline total={12} current={Math.min(12, dashboard?.semanaActual || 1)} />
              {dashboard ? (
                <p className="level-desc" style={{ marginTop: 16 }}>
                  Kilómetros completados: <strong style={{ color: 'var(--color-text)' }}>{dashboard.kmCompletados.toFixed(1)}</strong> /{' '}
                  <strong style={{ color: 'var(--color-text)' }}>{dashboard.totalKm.toFixed(1)}</strong>
                </p>
              ) : null}
            </GlassCard>
          </MotionInView>
        </div>
      </section>

      {/* ══════════════════ NIVELES ══════════════════ */}
      <section className="levels-section">
        <MotionInView className="section-header">
          <p className="section-tag">Elige tu punto de partida</p>
          <h2 className="section-title">Planes para<br />Cada Nivel</h2>
          <p className="section-subtitle">
            Sin importar dónde estés hoy, tenemos el plan correcto para llevarte a la meta.
          </p>
        </MotionInView>

        <div className="levels-grid">
          <MotionInView delay={0.05}>
            <div className="level-card" style={{ '--level-color': '#3d9eff' }}>
            <div className="level-badge" style={{ background: 'rgba(61,158,255,0.1)', borderColor: 'rgba(61,158,255,0.35)', color: '#3d9eff' }}>
              Nivel 01
            </div>
            <h3>Principiante</h3>
            <p className="level-desc">
              Puedes correr 5–8 km cómodamente. Construiremos tu base aeróbica con progresión inteligente.
            </p>
            <div className="level-specs">
              <div className="level-spec">
                <span>Días / semana</span>
                <span>3 – 4 días</span>
              </div>
              <div className="level-spec">
                <span>Duración plan</span>
                <span>12 – 16 semanas</span>
              </div>
              <div className="level-spec">
                <span>Volumen inicial</span>
                <span>~20 km / sem</span>
              </div>
            </div>
            </div>
          </MotionInView>

          <MotionInView delay={0.10}>
            <div className="level-card featured" style={{ '--level-color': 'var(--color-accent)' }}>
            <div className="level-badge">Nivel 02 · Popular</div>
            <h3>Intermedio</h3>
            <p className="level-desc">
              Corres 10–15 km regularmente. Añadiremos Tempo Runs e Intervalos para romper tu techo.
            </p>
            <div className="level-specs">
              <div className="level-spec">
                <span>Días / semana</span>
                <span>4 – 5 días</span>
              </div>
              <div className="level-spec">
                <span>Duración plan</span>
                <span>10 – 12 semanas</span>
              </div>
              <div className="level-spec">
                <span>Volumen inicial</span>
                <span>~35 km / sem</span>
              </div>
            </div>
            </div>
          </MotionInView>

          <MotionInView delay={0.15}>
            <div className="level-card" style={{ '--level-color': '#00e676' }}>
            <div className="level-badge" style={{ background: 'rgba(0,230,118,0.1)', borderColor: 'rgba(0,230,118,0.35)', color: '#00e676' }}>
              Nivel 03
            </div>
            <h3>Avanzado</h3>
            <p className="level-desc">
              Experiencia previa en medio maratón. Series de velocidad y periodización compleja para mejorar tu marca.
            </p>
            <div className="level-specs">
              <div className="level-spec">
                <span>Días / semana</span>
                <span>5 – 6 días</span>
              </div>
              <div className="level-spec">
                <span>Duración plan</span>
                <span>8 – 10 semanas</span>
              </div>
              <div className="level-spec">
                <span>Volumen inicial</span>
                <span>~55 km / sem</span>
              </div>
            </div>
            </div>
          </MotionInView>
        </div>
      </section>

      {/* ══════════════════ FASES ══════════════════ */}
      <section className="phases-section">
        <div className="phases-inner">
          <MotionInView className="section-header">
            <p className="section-tag">Estructura científica</p>
            <h2 className="section-title">4 Fases de<br />Periodización</h2>
            <p className="section-subtitle">
              Cada bloque tiene un propósito concreto. Nada al azar, todo con intención.
            </p>
          </MotionInView>

          <div className="phases-grid">
            <div className="phase-card">
              <div className="phase-number">01</div>
              <div className="phase-icon" style={{ background: 'rgba(61,158,255,0.1)', color: '#3d9eff' }}>
                BASE
              </div>
              <h4>Base Aeróbica</h4>
              <p>Construye los cimientos: resistencia cardiovascular, adaptación muscular y hábito de entrenamiento.</p>
            </div>
            <div className="phase-card">
              <div className="phase-number">02</div>
              <div className="phase-icon" style={{ background: 'rgba(167,130,255,0.1)', color: '#a782ff' }}>
                CONS
              </div>
              <h4>Construcción</h4>
              <p>Aumenta volumen e introduce Tempo Runs para elevar tu umbral anaeróbico semana a semana.</p>
            </div>
            <div className="phase-card">
              <div className="phase-number">03</div>
              <div className="phase-icon" style={{ background: 'rgba(255,107,0,0.1)', color: 'var(--color-accent)' }}>
                INT
              </div>
              <h4>Intensidad</h4>
              <p>Intervalos y series de alta intensidad mejoran tu VO2 máx y capacidad de correr rápido con fatiga.</p>
            </div>
            <div className="phase-card">
              <div className="phase-number">04</div>
              <div className="phase-icon" style={{ background: 'rgba(0,230,118,0.1)', color: '#00e676' }}>
                TAP
              </div>
              <h4>Tapering</h4>
              <p>Reducción estratégica del volumen para llegar fresco, con los músculos cargados de glucógeno el día de la carrera.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TIPOS ENTRENAMIENTO ══════════════════ */}
      <section className="training-types">
        <MotionInView className="section-header">
          <p className="section-tag">Variedad inteligente</p>
          <h2 className="section-title">7 Tipos de<br />Entrenamiento</h2>
          <p className="section-subtitle">
            Cada sesión tiene un objetivo claro: velocidad, resistencia, recuperación o potencia.
          </p>
        </MotionInView>

        <div className="training-grid">
          <div className="training-item">
            <span className="training-badge rodaje-suave">Rodaje Suave</span>
            <p>Recuperación activa y base aeróbica</p>
          </div>
          <div className="training-item">
            <span className="training-badge rodaje-largo">Rodaje Largo</span>
            <p>Resistencia de fondo hasta 20 km</p>
          </div>
          <div className="training-item">
            <span className="training-badge tempo">Tempo Run</span>
            <p>Umbral anaeróbico y ritmo de carrera</p>
          </div>
          <div className="training-item">
            <span className="training-badge intervalos">Intervalos</span>
            <p>VO2 máx · Series de 1000 m</p>
          </div>
          <div className="training-item">
            <span className="training-badge fartlek">Fartlek</span>
            <p>Juegos de ritmo y variedad</p>
          </div>
          <div className="training-item">
            <span className="training-badge series">Series</span>
            <p>Potencia aeróbica avanzada</p>
          </div>
          <div className="training-item">
            <span className="training-badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-sub)', borderColor: 'var(--color-border)' }}>
              Descanso
            </span>
            <p>Recuperación programada y activa</p>
          </div>
        </div>
      </section>

      {/* ══════════════════ CÓMO FUNCIONA ══════════════════ */}
      <section className="how-it-works">
        <div className="how-it-works-inner">
          <MotionInView className="section-header">
            <p className="section-tag">Simple y efectivo</p>
            <h2 className="section-title">Empieza en<br />4 Pasos</h2>
          </MotionInView>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Crea tu Cuenta</h3>
              <p>Registro en segundos. Tus datos se guardan de forma privada en tu navegador.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3>Configura tu Plan</h3>
              <p>Elige nivel, fecha de carrera y días disponibles. El algoritmo hace el resto.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3>Entrena con Propósito</h3>
              <p>Sigue tu plan semana a semana. Marca entrenamientos y visualiza tu progreso.</p>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <h3>Cruza la Meta</h3>
              <p>Llega preparado, confiado y con energía para disfrutar cada kilómetro.</p>
            </div>
          </div>
          <div className="step-arrow" />
        </div>
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section className="features">
        <MotionInView className="section-header">
          <p className="section-tag">Por qué PlanMi21K</p>
          <h2 className="section-title">Todo lo que<br />Necesitas</h2>
        </MotionInView>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">PER</div>
            <h3>Personalizado</h3>
            <p>Planes únicos adaptados a tu nivel, días disponibles y semanas hasta la carrera. No hay dos planes iguales.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">SCI</div>
            <h3>Científico</h3>
            <p>Metodología basada en periodización progresiva, variedad de estímulos y tapering estratégico.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">PRG</div>
            <h3>Seguimiento Real</h3>
            <p>Marca entrenamientos completados y visualiza estadísticas detalladas por tipo, semana y fase.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">100</div>
            <h3>100% Gratis</h3>
            <p>Sin suscripciones, sin pagos ocultos. Tus datos se guardan localmente — tú tienes el control total.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="cta">
        <div className="cta-content">
          <p className="cta-eyebrow">Tu carrera empieza hoy</p>
          <h2>Listo para tus<br /><span>21K</span></h2>
          <p>
            Miles de corredores ya tienen su plan. Únete y cruza la meta con la preparación que mereces.
          </p>
          <Link to="/configurar-plan" className="btn-cta">
            Crear Mi Plan Ahora
          </Link>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">Plan<span>Mi</span>21K</div>
          <p className="footer-tagline">
            Entrenamiento de medio maratón · Basado en ciencia deportiva · 100% gratuito
          </p>
        </div>
      </footer>

      {/* CTA flotante tipo app */}
      <div className="fab">
        <Link to={dashboard ? '/mi-plan' : '/configurar-plan'} className="fab-btn">
          {dashboard ? 'Ir a mi plan' : 'Crear plan'}
        </Link>
      </div>

    </div>
  )
}
