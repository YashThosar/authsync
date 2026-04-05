import React, { useState } from 'react'
import axios from 'axios'

function Verify() {
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleVerify = async () => {
    if (!image) {
      setMessage('Please select an image')
      return
    }

    setLoading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await axios.post('http://127.0.0.1:8000/verify', formData)
      setSuccess(response.data.success)
      setMessage(response.data.message)
    } catch (error) {
      setMessage('Error connecting to API')
      setSuccess(false)
    }

    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verify Voter</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />

        <button
          onClick={handleVerify}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        {message && (
          <div style={{
            ...styles.resultBox,
            backgroundColor: success ? '#d4edda' : '#f8d7da',
            borderColor: success ? '#28a745' : '#dc3545',
          }}>
            <p style={{ color: success ? '#28a745' : '#dc3545', margin: 0, fontWeight: 'bold' }}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    textAlign: 'center',
    color: '#1a1a2e',
    marginBottom: '10px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  resultBox: {
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid',
    textAlign: 'center',
  }
}

export default Verify