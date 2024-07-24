import { useState } from 'react'

import Login from './Login'
import Register from './Register'
import Home from './Home'

import logic from '../logic'

const App = () => {
    const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'login')

    const handleLogin = () => {
        setView('home')
    }

    const handleRegisterClick = () => {
        setView('register')
    }

    const handleRegister = () => {
        setView('login')
    }

    const handleLoginClick = () => {
        setView('login')
    }

    const handleLogout = () => {
        setView('login')
    }

    return <>
        {view === 'login' && <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />}

        {view === 'register' && <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />}

        {view === 'home' && <Home onLogout={handleLogout} />}
    </>
}

export default App
