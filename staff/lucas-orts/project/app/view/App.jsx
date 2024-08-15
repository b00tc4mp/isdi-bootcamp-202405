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
        navigate('/login')
    }

    const handleAlertAccept = () => setAlertMessage(null)

    return <Context.Provider value={{ theme, setTheme, alert: setAlertMessage }}>
        <Routes>
            <Route path="/login"><Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} /></Route>
            <Route path="/register">  <Register onRegister={handleRegister} onLoginClick={handleLoginClick} /></Route>
            <Route path="/*"><Home onLogout={handleLogout} /></Route>
        </Routes>

        {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
    </Context.Provider>
}

export default App