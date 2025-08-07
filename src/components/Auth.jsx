import React, { useState } from 'react'
import '../styles/Auth.css'

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function register() {
    const users = JSON.parse(localStorage.getItem('planmi21k_users')) || []
    if (users.find(u => u.email === email)) {
      setError('Usuario ya registrado')
      return
    }
    users.push({ email, password })
    localStorage.setItem('planmi21k_users', JSON.stringify(users))
    setError('')
    alert('Registro exitoso! Ahora inicia sesión')
    setMode('login')
  }

  function login() {
    const users = JSON.parse(localStorage.getItem('planmi21k_users')) || []
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      onLogin(user)
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="form">
        <p>
          {mode === 'login' ? 'Iniciar Sesión' : 'Registro'}
          <span>PlanMi21K</span>
        </p>

        <input
          type="email" 
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="oauthButton" onClick={mode === 'login' ? login : register}>
          {mode === 'login' ? 'Entrar' : 'Registrar'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="separator">
          <div></div>
          <span>ó</span>
          <div></div>
        </div>

        <button
          className="oauthButton"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
            setError('')
          }}
        >
          {mode === 'login' ? 'Crear una cuenta nueva' : 'Ya tengo una cuenta'}
        </button>
      </div>
    </div>
  )
}
