import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//TODO context

import Register from './register'
import Login from './login'
import Home from './home'

import logic from '../logic'

export default function App() {
    const navigate = useNavigate()

    //TODO alert

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