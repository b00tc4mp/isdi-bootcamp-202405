import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './home'
import Login from './login'
import Register from './register'
import logic from '../logic'

import Header from './home/Header'
import Footer from './home/Footer'

import Alert from './common/Alert'
import { Context } from './context'

export default function App({ }) {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(logic.isUserLoggedIn())
    const [alertMessage, setAlertMessage] = useState(null)

    const handleLoginClick = () => {
        navigate('/login')
    }
    const handleLogin = () => {
        setIsAuthenticated(true)
        navigate('/')
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        navigate('/') // Redirigir a Home después de logout
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }

    const handleAlertAccept = () => setAlertMessage(null)

    return (
        <Context.Provider value={{ alert: setAlertMessage }}>
            <>
                <Header
                    onLoginClick={handleLoginClick}
                    onLogout={handleLogout}
                    isAuthenticated={isAuthenticated} />

                <Routes>
                    <Route path='/*' element={<Home onLoginClick={handleLoginClick} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path='/login' element={<Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
                    <Route path='/register' element={<Register onRegister={() => navigate('/login')} onLoginClick={handleLoginClick} />} />
                </Routes>
                <Footer
                    isAuthenticated={isAuthenticated}
                />
                {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
            </>
        </Context.Provider>
    )
}
