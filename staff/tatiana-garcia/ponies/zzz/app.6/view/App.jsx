import { useState } from 'react'

import Login from './Login'
import Register from './Register'
import Home from './Home'

import logic from '../logic/index.js'

const App = () => {
    console.debug('App -> call')

    const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'login')


    const handleLogin = () => {
        console.debug('App -> handleLogin')

        setView('home')
    }

    const handleRegisterClick = () => {
        console.debug('App -> handleRegisterClick')

        setView('register')
    }

    const handleRegister = () => {
        console.debug('App -> handleRegister')

        setView('login')
    }

    const handleLoginClick = () => {
        console.debug('App -> handleLoginClick')

        setView('login')
    }

    const handleLogout = () => {
        console.debug('App -> handleLogout')

        setView('login')
    }

    return <>
        {view === 'login' && <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />}

        {view === 'register' && <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />}

        {view === 'home' && <Home onLogout={handleLogout} />}
    </>
}


export default App