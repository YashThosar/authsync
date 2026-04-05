import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Register from './Register'
import Verify from './Verify'
import Voters from './Voters'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/voters" element={<Voters />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App