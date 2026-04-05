import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://127.0.0.1:8000'

function Voters() {
  const [voters, setVoters] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    axios.get(`${API}/voters`)
      .then(res => {
        setVoters(res.data.voters)
        setTotal(res.data.total)
      })
      .catch(err => console.error('Error fetching voters'))
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Registered Voters</h1>
        <p className="page-subtitle">{total} voter{total !== 1 ? 's' : ''} registered in the system</p>
      </div>

      <div className="card">
        {voters.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p className="empty-text">No voters registered yet</p>
          </div>
        ) : (
          <div className="voter-list">
            {voters.map((voter, index) => (
              <div key={index} className="voter-item">
                <span className="voter-number">#{String(index + 1).padStart(2, '0')}</span>
                <div className="voter-avatar">
                  {voter.name.charAt(0).toUpperCase()}
                </div>
                <span className="voter-name">{voter.name}</span>
                <span className="voter-badge">Registered</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Voters