import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import EventList from './EventList'
import LikeEventList from './LikeEventList'
import AttendanceEventList from './AttendanceEventList'
import ResultsEventList from './ResultsEventList'
import MoreInfoEvent from './MoreInfoEvent'

export default function Home({ onLogout, eventId }) {

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


    const handleAttendancesClick = () => {
        navigate('/attendees')
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

                <Route path="/attendees" element={<AttendanceEventList />} />

                <Route path="/search" element={<ResultsEventList />} />

                <Route path="/info/:eventId" element={<MoreInfoEvent />} />

            </Routes>
        </main >

        <Footer
            onEventCreated={handleEventCreated}
            onLikesClick={handleLikesClick}
            onAttendancesClick={handleAttendancesClick}></Footer>
    </>
}