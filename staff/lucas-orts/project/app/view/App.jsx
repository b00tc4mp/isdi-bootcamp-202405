import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './home/Header'
import Home from './home'
import Login from './login'
import Register from './register'
import logic from '../logic'

import Alert from './common/Alert'
import { Context } from './context'

export default function App() {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(logic.isUserLoggedIn())
    const [alertMessage, setAlertMessage] = useState(null)

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        navigate('/') // Redirigir a Home después de logout
    }

    const handleLogin = () => {
        setIsAuthenticated(true)
        navigate('/')
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }

    const handleAlertAccept = () => setAlertMessage(null)

    return (
        <Context.Provider value={{ alert: setAlertMessage }}>
            <>
                <Header
                    onHomeClick={handleHomeClick}
                    onLogout={handleLogout}
                    onLoginClick={handleLoginClick} // Aquí pasamos la función correctamente
                    isAuthenticated={isAuthenticated}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
                    <Route path="/register" element={<Register onRegister={() => navigate('/login')} onLoginClick={handleLoginClick} />} />
                </Routes>
                {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
            </>
        </Context.Provider>
    )
}
