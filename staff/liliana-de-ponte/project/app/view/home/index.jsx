import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'


export default function Home({ onLogout }) {

    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)

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

        </main>


    </>
}