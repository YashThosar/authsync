import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Voters() {
  const [voters, setVoters] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/voters')
      .then(response => {
        setVoters(response.data.voters)
        setTotal(response.data.total)
      })
      .catch(error => console.error('Error fetching voters:', error))
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Registered Voters</h2>
        <p style={styles.total}>Total: {total}</p>

        {voters.map((voter, index) => (
          <div key={index} style={styles.voterCard}>
            <span style={styles.index}>{index + 1}</span>
            <span style={styles.name}>{voter.name}</span>
          </div>
        ))}

        {voters.length === 0 && (
          <p style={styles.empty}>No voters registered yet</p>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '500px',
  },
  title: {
    textAlign: 'center',
    color: '#1a1a2e',
    marginBottom: '5px',
  },
  total: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '20px',
  },
  voterCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#f0f2f5',
    marginBottom: '10px',
  },
  index: {
    backgroundColor: '#00d4ff',
    color: 'white',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  name: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a1a2e',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
  }
}

export default Voters