import React, { useState } from 'react'
import axios from 'axios'

function Register() {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async () => {
    if (!name || !image) {
      setMessage('Please enter name and select an image')
      return
    }

    setLoading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)

    try {
      const response = await axios.post('http://127.0.0.1:8000/register', formData)
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
        <h2 style={styles.title}>Register Voter</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />

        <button
          onClick={handleSubmit}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Register'}
        </button>

        {message && (
          <p style={{ ...styles.message, color: success ? 'green' : 'red' }}>
            {message}
          </p>
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
    backgroundColor: '#00d4ff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
}

export default Register