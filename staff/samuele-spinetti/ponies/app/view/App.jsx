import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Context from '../Context'

import Login from './login'
import Register from './register'
import Home from './home'
import Alert from './common/Alert'

import logic from '../logic'

const App = () => {
    const navigate = useNavigate()

    const [theme, setTheme] = useState(localStorage.theme)

    const [message, setMessage] = useState(null)

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
        navigate('/login')
    }

    const handleAlertAccept = () => {
        setMessage(null)
    }

    return <Context.Provider value={{ theme, setTheme, alert: setMessage }}>
        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
            <Route path="/*" element={logic.isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>
        {message && <Alert message={message} onAccept={handleAlertAccept} />}
    </Context.Provider>
}

export default App