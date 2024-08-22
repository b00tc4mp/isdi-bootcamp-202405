import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import StartPage from './start'
import Game from './game'

export default function App() {
    const [username, setUsername] = useState(sessionStorage.username)

    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/game')
    }

    const handleStartPage = () => {
        navigate('/')
    }

    return <Routes>
        <Route path='/*' element={<StartPage onStartClick={handleStart} setUsername={setUsername} />} />
        <Route path='/game' element={!username ? <Navigate to='/' /> : <Game username={username} onHomeClick={handleStartPage} />} />
    </Routes>
}