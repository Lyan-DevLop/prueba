import React from 'react'
import { Link } from 'react-router-dom'
import {useTheme} from './ThemeContext'

const Header = () => {
  const { darkMode, toggleTheme } = useTheme()
  return (
    <nav className="navbar">
      <div className="navbar-brand">
          <h1>DISTRIMEDICAS DAGO</h1>
        <ul className="nav-links">
          <Link to="/">Inicio</Link>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/usuarios">Usuarios</Link></li>
          <li><Link to="/proveedores">Proveedores</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        <button onClick={toggleTheme} className="theme-toggle">
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </div>
    </nav>
  )
}

export default Header