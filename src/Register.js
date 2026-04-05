import React, { useState } from 'react'
import axios from 'axios'

const API = 'http://127.0.0.1:8000'

function Register() {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async () => {
    if (!name || !image) {
      setMessage('Please enter name and select an image')
      setSuccess(false)
      return
    }
    setLoading(true)
    setMessage('')
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    try {
      const res = await axios.post(`${API}/register`, formData)
      setSuccess(res.data.success)
      setMessage(res.data.message)
      if (res.data.success) { setName(''); setImage(null) }
    } catch {
      setMessage('Error connecting to API')
      setSuccess(false)
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Register Voter</h1>
        <p className="page-subtitle">Add a new voter to the authentication database</p>
      </div>

      <div className="card" style={{ maxWidth: '480px' }}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter voter's full name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Face Photo</label>
          <label className="file-input-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
            />
            <span style={{ fontSize: '28px' }}>📷</span>
            <p className="file-input-text">Click to upload a photo</p>
            {image && <p className="file-selected">✓ {image.name}</p>}
          </label>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Register Voter'}
        </button>

        {message && (
          <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Register