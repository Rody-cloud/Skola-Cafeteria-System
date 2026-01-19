import './i18n';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import Home from './pages/Home'
import StaffDashboard from './pages/StaffDashboard'
import ProfessorPortal from './pages/ProfessorPortal'
import Contact from './pages/Contact'
import RoleRoute from './components/RoleRoute'
import './App.css'
import { checkBackendHealth } from './services/api'

// Smart redirect component for the root path
const RootRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Home />;

  if (user.role === 'staff') return <Navigate to="/staff" />;
  if (user.role === 'professor') return <Navigate to="/professor" />;
  return <Home />; // Students stay on home
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
        <div style={{ display: 'none' }}>
          <h1>Unified Cafeteria System</h1>
          <p className="read-the-docs">Backend Status: {backendStatus}</p>
        </div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Contact" element={<Contact />} />

          {/* Student Protected Routes */}
          <Route path="/menu" element={
            <RoleRoute allowedRoles={['student']}>
              <Menu />
            </RoleRoute>
          } />

          {/* Staff Protected Routes */}
          <Route path="/staff" element={
            <RoleRoute allowedRoles={['staff']}>
              <StaffDashboard />
            </RoleRoute>
          } />

          {/* Professor Protected Routes */}
          <Route path="/professor" element={
            <RoleRoute allowedRoles={['professor']}>
              <ProfessorPortal />
            </RoleRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
