import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Login from './login'
import Register from './register'
import UserInvestor from './register/UserInvestor'
import UserProject from './register/UserProject'
import Home from './home'
import Alert from './common/Alert'

import { Context } from './context'

import logic from '../logic'

const App = () => {
    console.debug('App -> call')

    const navigate = useNavigate()

    const [alertMessage, setAlertMessage] = useState(null)

    const handleLogin = () => { console.debug('App -> handleLogin'), navigate('/') }

    const handleRegister = () => { console.debug('App -> handleRegister'), navigate('/login') }

    const handleRegisterClick = () => { console.debug('App -> handleRegisterClick'), navigate('/register') }

    const handleRegisterProject = () => { console.debug('App -> handleRegisterClick'), navigate('/register/user-project') }

    const handleRegisterInvestor = () => { console.debug('App -> handleRegisterProject'), navigate('/register/user-investor') }

    const handleLoginClick = () => { console.debug('App -> handleLoginClick'), navigate('/login') }

    const handleLogout = () => { console.debug('App -> handleLogout'), navigate('/login') }



    const handleAlertAccept = () => setAlertMessage(null)

    return <Context.Provider value={{ alert: setAlertMessage }}>
        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onUserProjectClick={handleRegisterProject} onUserInvestorClick={handleRegisterInvestor} onLoginClick={handleLoginClick} />} />

            <Route path="/register/user-investor" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <UserInvestor onRegister={handleRegister} onLoginClick={handleLoginClick} />} />

            <Route path="/register/user-project" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <UserProject onRegister={handleRegister} onLoginClick={handleLoginClick} />} />

            <Route path="/*" element={logic.isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>

        {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
    </Context.Provider>
}

export default App

