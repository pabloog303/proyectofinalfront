// src/App.jsx
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth.jsx'
import ConfigPlan from './components/ConfigPlan.jsx'
import PlanSemana from './components/PlanSemana.jsx'
import Estadisticas from './components/Estadisticas.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('planmi21k_user')) || null
  })

  const [plan, setPlan] = useState(() => {
    return JSON.parse(localStorage.getItem('planmi21k_plan')) || null
  })

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

  if (!user) {
    return <Auth onLogin={setUser} />
  }

  if (!plan) {
    return (
      <>
        <Navbar onLogout={logout} user={user} />
        <ConfigPlan user={user} setPlan={setPlan} />
      </>
    )
  }

  return (
    <>
      <Navbar onLogout={logout} user={user} />
      <Routes>
        <Route path="/" element={<PlanSemana plan={plan} setPlan={setPlan} />} />
        <Route path="/estadisticas" element={<Estadisticas plan={plan} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
