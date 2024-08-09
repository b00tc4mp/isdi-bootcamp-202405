import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Register from './register'
import Login from './login'
import Home from './home'

import { Context } from './Context'

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

    const handleRegister = () => {
        navigate('/login')
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }

    const handleLogout = () => {
        navigate('/login')
    }

    const handleAlertAccept = () => setAlertMessage(null)

    return <Context.Provider value={{ theme, setTheme, alert: setAlertMessage }}>
        <Routes>
            <Route path='/login' element={logic.isLoggedIn() ? <Navigate to='/' /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
            <Route path='/register' element={logic.isLoggedIn() ? <Navigate to='/' /> : <Register onRegister={handleRegister} onLoginClick={handleRegister} />} />
            <Route path='/*' element={logic.isLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to='/login' />} />
        </Routes>

        {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
    </Context.Provider>
}