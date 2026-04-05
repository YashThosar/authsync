import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>AuthSync</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Register</Link>
        <Link to="/verify" style={styles.link}>Verify</Link>
        <Link to="/voters" style={styles.link}>Voters</Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: '15px 30px',
  },
  logo: {
    color: '#00d4ff',
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  }
}

export default Navbar