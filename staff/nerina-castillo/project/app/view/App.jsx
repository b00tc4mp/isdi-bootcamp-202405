import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
//TODO context

import Register from './register'

import logic from '../logic'

export default function App() {
    const navigate = useNavigate()

    //TODO alert

    const handleRegister = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    const handleLogin = () => navigate('/')

    const handleLoginClick = () => navigate('/login')

    return <Routes>
        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegister={handleRegister} onLoginClick={handleLoginClick} />}></Route>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />

    </Routes>
}