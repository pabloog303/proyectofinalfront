import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import runningIcon from '../assets/un logo de un person.png'

export default function Navbar({ user, onLogout, hasLogin }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/" className="logo-link">
          <img src={runningIcon} alt="Runner Icon" className="logo" />
          <h3>PlanMi21K</h3>
        </Link>
      </div>
      
      {/* Botón hamburguesa */}
      <button 
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menú */}
      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        {hasLogin ? (
          <>
            <Link to="/mi-plan" onClick={closeMenu}>Mi Plan</Link>
            <Link to="/estadisticas" onClick={closeMenu}>Estadísticas</Link>
            <Link to="/acerca-de" onClick={closeMenu}>Acerca de</Link>
            <button onClick={() => { closeMenu(); onLogout(); }}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/" onClick={closeMenu}>Inicio</Link>
            <Link to="/acerca-de" onClick={closeMenu}>Acerca de</Link>
            <Link to="/configurar-plan" className="btn-crear-plan" onClick={closeMenu}>Crear Plan</Link>
          </>
        )}
      </div>
    </nav>
  )
}
