import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Home from './Home'
import Register from './Register'
import Login from './Login'

export default function App() {
  const navigate = useNavigate()

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
    navigate('/login')
  }

  return <Routes>
    <Route path='/login' element={<Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
    <Route path='/register' element={<Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
    <Route path='/*' element={<Home onLogout={handleLogout} />} />
  </Routes>
}