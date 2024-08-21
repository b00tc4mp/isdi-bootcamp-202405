import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Login from './login'
import Register from './register'
import Home from './home'
import Alert from './common/Alert'

import { Context } from './context'

import logic from '../logic'

const App = () => {
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
        navigate('/')
    }

    const handleAlertAccept = () => setAlertMessage(null)

    return <Context.Provider value={{ theme, setTheme, alert: setAlertMessage }}>
        <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
            <Route path="/register" element={<Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
            <Route path="/*" element={<Home onLogout={handleLogout} />} />
        </Routes>

        {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
    </Context.Provider>
}

export default App