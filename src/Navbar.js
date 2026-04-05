import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeContext'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/register', label: 'Register' },
    { to: '/verify', label: 'Verify' },
    { to: '/voters', label: 'Voters' },
  ]

  return (
    <nav className="navbar">
      <span className="navbar-logo">AuthSync</span>
      <div className="navbar-links">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar