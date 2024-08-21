import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Register from './register/index.jsx'
import RegisterPetsitterUser from './registerPetssiterUser/index.jsx'
import Login from './login/index.jsx'
import Home from './home/index.jsx'
import Contact from './contact/index.jsx'
import Alert from './common/Alert.jsx'

import { Context } from './context.js'

import logic from '../logic/index.js'
import Petsitters from './pettsiters/index.jsx'
import Settings from './settings/index.jsx'

export default function App() {
  const navigate = useNavigate()

  const [alertMessage, setAlertMessage] = useState(null)

  const handleLogin = () => { navigate('/') }

  const handleRegisterClick = () => { navigate('/register') }

  const handleRegisterPetsitterUserClick = () => { navigate('/registerPetsitter') }

  const handleRegister = () => {
    setAlertMessage('¡Te has registrado correctamente! Ya puedes loguearte en Exoticus')
    navigate('/login')
  }

  const handleRegisterPetsitterUser = () => {
    setAlertMessage('¡Te has registrado correctamente! Ya puedes loguearte en Exoticus')
    navigate('/login')
  }

  const handleLoginClick = () => { navigate('/login') }

  const handleLogout = () => {
    logic.logoutUser()

    navigate('/login')
  }

  const handleAlertAccept = () => setAlertMessage(null)

  return <Context.Provider value={{ alert: setAlertMessage }}>
    <Routes>
      <Route path='/*' element={<Home onLogout={handleLogout} />} />
      <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/settings' /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
      <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
      <Route path='/contact' element={<Contact onRegisterPetsitterUserClick={handleRegisterPetsitterUserClick} />} />
      <Route path='/registerPetsitter' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <RegisterPetsitterUser onRegisterPetsitterUser={handleRegisterPetsitterUser} onLoginClick={handleLoginClick} />} />
      <Route path='/petsitters' element={<Petsitters />} />
      <Route path='/settings' element={<Settings onLogoutClick={handleLogout} />} />
    </Routes>

    {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
  </Context.Provider>
}