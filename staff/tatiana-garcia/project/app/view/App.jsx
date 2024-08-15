import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Register from './register'
import Login from './login/index.jsx'
import Home from './home/index.jsx'
import Contact from './contact/index.jsx'

import logic from '../logic/index.js'

export default function App() {
  const navigate = useNavigate()

  const handleLogin = () => { navigate('/') }

  const handleRegisterClick = () => { navigate('/register') }

  const handleRegister = () => { navigate('/login') }

  // const handleContact = () => { navigate('/contact') }

  const handleLoginClick = () => { navigate('/login') }

  const handleLogout = () => {
    logic.logoutUser()

    navigate('/login')
  }

  return <Routes>
    <Route path='/*' element={<Home onLogout={handleLogout} />} />
    <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
    <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
    <Route path='/contact' element={<Contact onRegisterPetsitterClick={handleRegisterClick} />} />

  </Routes>
}