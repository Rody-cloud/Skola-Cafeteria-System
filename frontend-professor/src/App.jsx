import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import './App.css'
import { checkBackendHealth } from './services/api'

// Placeholder Dashboard Component
const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="card">
      <h2>Welcome, Professor {user?.name}!</h2>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
      <h3>Dashboard</h3>
      <p>Coming Soon...</p>
    </div>
  );
};

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking backend...')

  useEffect(() => {
    checkBackendHealth()
      .then(message => setBackendStatus('Connected'))
      .catch(err => setBackendStatus('Error connecting to backend'))
  }, [])

  return (
    <Router>
      <AuthProvider>
        <div>
          <h1>Professor Portal</h1>
          <p className="read-the-docs">Backend Status: {backendStatus}</p>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
