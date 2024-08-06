import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import Home from './Home'

import logic from '../logic'

export default function App() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/')
    }

    const handleRegister = () => {
        navigate('/login')
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }

    const handleLogout = () => {
        navigate('/login')
    }

    return <Routes>
        <Route path='/login' element={logic.isLoggedIn() ? <Navigate to='/' /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
        <Route path='/register' element={logic.isLoggedIn() ? <Navigate to='/' /> : <Register onRegister={handleRegister} onLoginClick={handleRegister} />} />
        <Route path='/*' element={logic.isLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to='/login' />} />
    </Routes>
}