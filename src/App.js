import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Register from './Register'
import Verify from './Verify'
import Voters from './Voters'

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/voters" element={<Voters />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App