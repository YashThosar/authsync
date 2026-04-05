import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://127.0.0.1:8000'

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, voters: [] })
  const [clearing, setClearing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/voters`)
      setStats(res.data)
    } catch (err) {
      console.error('Error fetching stats')
    }
  }

  const handleClear = async () => {
    if (!window.confirm('Are you sure? This will allow all voters to vote again.')) return
    setClearing(true)
    try {
      const res = await axios.delete(`${API}/clear-voters`)
      setMessage(res.data.message)
      fetchStats()
    } catch (err) {
      setMessage('Error clearing voters')
    }
    setClearing(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of the AuthSync authentication system</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Registered</p>
          <p className="stat-value">{stats.total}</p>
          <p className="stat-desc">voters in database</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">System Status</p>
          <p className="stat-value" style={{ fontSize: '28px', color: 'var(--success)', letterSpacing: 0 }}>Active</p>
          <p className="stat-desc">API is running</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Auth Model</p>
          <p className="stat-value" style={{ fontSize: '22px', letterSpacing: 0 }}>FaceNet</p>
          <p className="stat-desc">128-dim face encoding</p>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/register" className="action-card">
              <span className="action-icon">👤</span>
              <span className="action-title">Register</span>
              <span className="action-desc">Add a new voter</span>
            </Link>
            <Link to="/verify" className="action-card">
              <span className="action-icon">🔍</span>
              <span className="action-title">Verify</span>
              <span className="action-desc">Check a voter's face</span>
            </Link>
            <Link to="/voters" className="action-card">
              <span className="action-icon">📋</span>
              <span className="action-title">View Voters</span>
              <span className="action-desc">See all registered</span>
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Election Reset</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Clear all registered voters from the database. Use this at the start of a new election cycle to allow everyone to vote again.
          </p>
          <button
            className="btn btn-danger"
            onClick={handleClear}
            disabled={clearing || stats.total === 0}
          >
            {clearing ? 'Clearing...' : `Clear All Voters (${stats.total})`}
          </button>
          {message && (
            <div className="alert alert-success" style={{ marginTop: '12px' }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard