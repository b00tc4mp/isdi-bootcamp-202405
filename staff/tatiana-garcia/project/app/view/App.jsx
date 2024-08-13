import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Register from './register'
import Login from './login/index.jsx'
import Home from './home/index.jsx'

import logic from '../logic/index.js'

export default function App() {
  const navigate = useNavigate()

  const handleLogin = () => { navigate('/') }

  const handleRegisterClick = () => { navigate('/register') }

  const handleRegister = () => { navigate('/login') }

  const handleLoginClick = () => { navigate('/login') }

  const handleLogout = () => { navigate('/login') }

  return <Routes>
    <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
    <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
    <Route path="/*" element={logic.isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
  </Routes>
}