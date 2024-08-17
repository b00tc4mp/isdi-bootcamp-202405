import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'

import { Context } from './context.js'

import Login from './login'
import Register from './register'
import Home from './home'
import Alert from './common/Alert'

import logic from '../logic/index.js'

export default function App() {
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState(null)

  const handleLogin = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleRegister = () => navigate('/login')

  const handleLoginClick = () => navigate('/login')

  const handleLogout = () => navigate('/login')

  const handleAlertAccept = () => setAlertMessage(null)

  return <Context.Provider value={{ alert: setAlertMessage }}>
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
    </Routes>
    {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
  </Context.Provider>
}