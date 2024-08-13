import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

export default function Home({ onLogout }) {

    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)

    const handleEventCreated = () => {
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleLikesClick = () => {
        navigate('/likes')
    }

    return <>
        <Header>
            onHomeClick={handleHomeClick}
            onLikesClick={handleLikesClick}
            onLogout={onLogout}
        </Header>

        <main>
            <h1>Esto es home</h1>
        </main>

        <Footer onEventCreated={handleEventCreated}></Footer>
    </>
}