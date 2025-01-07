import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { mockDB } from 'com'

import Header from './Header'
import Footer from './Footer'
import Hello from './Hello'
import Carousel from './Carousel'
import PopularEventsList from './PopularEventsList'
import BannerEvent from './BannerEvent'
import EventsList from './EventsList'
import FavsEventsList from './FavsEventsList'
import ResultsEventsList from './ResultsEventsList'
import RandomEventsList from './RandomEventsList'
import GoingEventsList from './GoingEventsList'
import SkeletonLoader from './SkeletonLoader'
import Map from './Map'
import Calendar from './Calendar'

const { events, bannerEvent } = mockDB

export default function Home({ onLogout }) {
    // console.debug('Home -> call')

    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false)
        }, 3000)

        return () => clearTimeout(timeoutId)
    }, [])

    const handleHomeClick = () => {
        // console.debug('Home -> handleHomeClick')
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleEventCreated = () => {
        // console.debug('Home -> handleEventCreated')
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleUsersClick = () => {
        // console.debug('Home -> handleUsersClick')
        navigate('/users/events')
    }

    const handleFavsClick = () => {
        // console.debug('Home -> handleFavsClick')
        navigate('/events/favs')
    }

    const handleMapClick = () => {
        // console.debug('Home -> handleMapClick')
        navigate('/map')
    }

    const handleCalendarClick = () => {
        // console.debug('Home -> handleCalendarClick')
        navigate('/calendar')
    }

    const handleGoingClick = () => {
        // console.debug('Home -> handleGoingClick')
        navigate('/events/going')
    }

    return (
        <>
            <Header onEventCreated={handleEventCreated} onUsersClick={handleUsersClick} onLogout={onLogout} />

            <main className="flex flex-col gap-4 pt-4 mt-16 mr-0 min-h-screen max-w-screen overflow-auto bg-white dark:bg-background_grey">
                {loading ? (
                    <SkeletonLoader />) : (<Routes>
                        <Route path="/" element={
                            <>
                                <Carousel onEventGoingToggled={setRefreshStamp} onEventFavToggled={setRefreshStamp} />
                                <BannerEvent event={bannerEvent} />
                                <EventsList refreshStamp={refreshStamp} />
                                <PopularEventsList refreshStamp={refreshStamp} />
                                <RandomEventsList refreshStamp={refreshStamp} />
                            </>
                        }
                        />
                        <Route path='/' element={<EventsList refreshStamp={refreshStamp} />} />
                        <Route path="/search" element={<ResultsEventsList />} />
                        <Route path="/hello/:to" element={<Hello />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/calendar" element={<Calendar events={events} />} />
                        <Route path="events/going" element={<GoingEventsList />} />
                        <Route path="events/favs" element={<FavsEventsList />} />
                    </Routes>
                )}
            </main>

            <Footer onHomeClick={handleHomeClick} onMapClicked={handleMapClick} onCalendarClicked={handleCalendarClick} onGoingEventsClicked={handleGoingClick} onFavsEventsClicked={handleFavsClick} />
        </>
    )
}