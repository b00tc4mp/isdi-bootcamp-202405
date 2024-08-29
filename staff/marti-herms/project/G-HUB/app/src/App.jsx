import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Home from './home'
import Register from './register'
import Login from './login'
import Alert from './common/Alert'

import { Context } from './context'

import logic from '../logic'

export default function App() {
  const navigate = useNavigate()

  const [theme, setTheme] = useState(localStorage.theme)
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    document.documentElement.className = theme
    localStorage.theme = theme
  }, [theme])

  const handleLogin = () => {
    navigate('/')
  }

  const handleRegisterClick = () => {
    navigate('/register')
  }

  const handleRegister = () => {
    navigate('/login')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    logic.logoutUser()
    navigate('/login')
  }

  const handleAlertAccept = () => setAlertMessage(null)

  return <Context.Provider value={{ theme, setTheme, alert: setAlertMessage }}>
    <Routes>
      <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
      <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
      <Route path='/*' element={logic.isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to='/login' />} />
    </Routes>

    {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
  </Context.Provider>
}