// src/App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth.jsx'
import ConfigPlan from './components/ConfigPlan.jsx'
import PlanSemana from './components/PlanSemana.jsx'
import Estadisticas from './components/Estadisticas.jsx'
import AcercaDe from './components/AcercaDe.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('planmi21k_user')) || null
  })

  const [plan, setPlan] = useState(() => {
    return JSON.parse(localStorage.getItem('planmi21k_plan')) || null
  })

  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    localStorage.setItem('planmi21k_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('planmi21k_plan', JSON.stringify(plan))
  }, [plan])

  // Logout
  function logout() {
    setUser(null)
    setPlan(null)
    localStorage.removeItem('planmi21k_user')
    localStorage.removeItem('planmi21k_plan')
  }

  function handleLogin(userData) {
    setUser(userData)
    setShowAuth(false)
  }

  // Componente de protección de rutas
  function ProtectedRoute({ children }) {
    if (!user) {
      setShowAuth(true)
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <>
      <Navbar onLogout={logout} user={user} hasLogin={!!user} />
      
      {showAuth && !user && (
        <div className="modal-overlay" onClick={() => setShowAuth(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuth(false)}>×</button>
            <Auth onLogin={handleLogin} />
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/mi-plan" replace /> : <Auth onLogin={handleLogin} />
          } 
        />
        <Route
          path="/configurar-plan"
          element={
            <ProtectedRoute>
              {plan ? (
                <Navigate to="/mi-plan" replace />
              ) : (
                <ConfigPlan user={user} setPlan={setPlan} />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/mi-plan"
          element={
            <ProtectedRoute>
              {plan ? (
                <PlanSemana plan={plan} setPlan={setPlan} />
              ) : (
                <Navigate to="/configurar-plan" replace />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/estadisticas"
          element={
            <ProtectedRoute>
              {plan ? (
                <Estadisticas plan={plan} />
              ) : (
                <Navigate to="/configurar-plan" replace />
              )}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
