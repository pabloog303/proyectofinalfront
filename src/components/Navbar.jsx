import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import runningIcon from '../assets/un logo de un person.png' // importa el logo

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <img src={runningIcon} alt="Runner Icon" className="logo" />
        <h3>PlanMi21K</h3>
      </div>
      <div>
        <Link to="/">Plan</Link>
        <Link to="/estadisticas">Estadísticas</Link>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </nav>
  )
}
