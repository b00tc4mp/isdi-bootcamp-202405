import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import EventList from './EventList'
import LikeEventList from './LikeEventList'

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
        <Header
            onHomeClick={handleHomeClick}
            onLogout={onLogout}>
        </Header>

        <main className="flex flex-col items-center gap-4 mt-16 mb-12">
            <Routes>
                <Route path="/" element={<EventList refreshStamp={refreshStamp} />} />

                <Route path="/likes" element={<LikeEventList />} />

            </Routes>
        </main >

        <Footer
            onEventCreated={handleEventCreated}
            onLikesClick={handleLikesClick}></Footer>
    </>
}