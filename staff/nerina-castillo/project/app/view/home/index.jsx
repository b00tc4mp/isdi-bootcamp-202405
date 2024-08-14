import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Heading from '../library/Heading'
import logic from '../../logic/index.js'
import Header from './Header'
import Footer from './Footer'
import ResultsPostList from './ResultsPostList'
import FollowingPostList from './FollowingUserPostList'
import EventList from './EventList'
import Calendar from './Calendar'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [events, setEvents] = useState([])

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => setName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    useEffect(() => {
        logic.getAllEvents()
            .then(events => setEvents(events))
            .catch(error => {
                console.error(error)
                alert(error.message)
            })
    }, [refreshStamp])

    const handleFollowClick = () => navigate('/')

    const handlePostCreated = () => setRefreshStamp(Date.now())

    const handleSearchClick = () => navigate('/search')

    const handleCalendarSearch = () => navigate('/calendar')

    return <>
        <Header
            onHomeClick={handleFollowClick}
            onSearchClick={handleSearchClick}
            onCalendarClick={handleCalendarSearch}
            onFollowClick={handleFollowClick}
            onLogout={onLogout}
        />

        <main>
            <Heading>Hello, {name}</Heading>

            <Routes>
                <Route path='/' element={<FollowingPostList refreshStamp={refreshStamp} />} />

                <Route path='/search' element={<ResultsPostList refreshStamp={refreshStamp} />} />

                <Route path='/events' element={<EventList refreshStamp={refreshStamp} />} />

                <Route path='/calendar' element={<Calendar events={events} />} />
            </Routes>
        </main>

        <Footer onPostCreated={handlePostCreated}></Footer>
    </>
}