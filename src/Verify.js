import React, { useState } from 'react'
import axios from 'axios'

const API = 'http://127.0.0.1:8000'

function Verify() {
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleVerify = async () => {
    if (!image) {
      setMessage('Please select an image')
      setSuccess(false)
      return
    }
    setLoading(true)
    setMessage('')
    const formData = new FormData()
    formData.append('image', image)
    try {
      const res = await axios.post(`${API}/verify`, formData)
      setSuccess(res.data.success)
      setMessage(res.data.message)
    } catch {
      setMessage('Error connecting to API')
      setSuccess(false)
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Verify Voter</h1>
        <p className="page-subtitle">Check if a face is registered in the system</p>
      </div>

      <div className="card" style={{ maxWidth: '480px' }}>
        <div className="form-group">
          <label className="form-label">Face Photo</label>
          <label className="file-input-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
            />
            <span style={{ fontSize: '28px' }}>🔍</span>
            <p className="file-input-text">Click to upload a photo to verify</p>
            {image && <p className="file-selected">✓ {image.name}</p>}
          </label>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Face'}
        </button>

        {message && (
          <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`}>
            {success ? '✅ ' : '❌ '}{message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Verify