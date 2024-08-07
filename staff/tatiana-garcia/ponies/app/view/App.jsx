import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'

import logic from '../logic/index.js'

const App = () => {
    console.debug('App -> call')

    const navigate = useNavigate()

    const handleLogin = () => {
        console.debug('App -> handleLogin')

        navigate('/')
    }

    const handleRegisterClick = () => {
        console.debug('App -> handleRegisterClick')

        navigate('/register')
    }

    const handleRegister = () => {
        console.debug('App -> handleRegister')

        navigate('/login')
    }

    const handleLoginClick = () => {
        console.debug('App -> handleLoginClick')

        navigate('/login')
    }

    const handleLogout = () => {
        console.debug('App -> handleLogout')

        navigate('/login')
    }

    return <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />} />
        <Route path="/*" element={logic.isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
    </Routes>
}


export default App