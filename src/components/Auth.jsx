import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/Auth.css'
import { loginApi, registerApi } from '../services/authApi.js'

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function register() {
    try {
      const response = await registerApi({ email, password })
      localStorage.setItem('planmi21k_token', response.token)
      setError('')
      onLogin(response.user)
    } catch (err) {
      setError(err.message === 'EMAIL_ALREADY_EXISTS' ? 'Ese correo ya está registrado' : 'No se pudo completar el registro')
    }
  }

  async function login() {
    try {
      const response = await loginApi({ email, password })
      localStorage.setItem('planmi21k_token', response.token)
      setError('')
      onLogin(response.user)
    } catch {
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

Auth.propTypes = {
  onLogin: PropTypes.func.isRequired,
}
