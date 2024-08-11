import { Routes, Route, useNavigate } from 'react-router-dom'

import Register from './register'

export default function App() {

  const navigate = useNavigate()

  const handleRegisterClick = () => {
    navigate('/register')
  }

  const handleRegister = () => {
    console.debug('App -> handleRegister')

    navigate('/login')
  }

  return <Routes>
    <Route path="/register" element={<Register onRegister={handleRegister} onRegisterClick={handleRegisterClick} />} />
  </Routes>
}