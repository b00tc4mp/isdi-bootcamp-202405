import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import Heading from '../library/Heading'
import logic from '../../logic/index.js'
import Header from './Header'
import Footer from './Footer'
import ResultsPostList from './ResultsPostList'
import FollowingPostList from './FollowingUserPostList'
import EventList from './EventList'
import Calendar from './Calendar'
import BandList from './BandList'
import LabelList from './LabelList'
import PromotersList from './PromotersList'
import VenuesList from './VenuesList'
import ResultsEventList from './ResultsEventList.jsx'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [events, setEvents] = useState([])
    const location = useLocation()

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

    const handleEventCreated = () => setRefreshStamp(Date.now())

    const handleBandsClick = () => navigate('/bands')

    const handleLabelsClick = () => navigate('/labels')

    const handlePromotersClick = () => navigate('/promoters')

    const handleVenuesClick = () => navigate('/venues')

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

                <Route path='/events' element={<ResultsEventList refreshStamp={refreshStamp} />} />

                <Route path='/calendar' element={<>
                    <ResultsEventList refreshStamp={refreshStamp} />
                    <Calendar events={events} />
                </>} />

                <Route path='/bands' element={<BandList refreshStamp={refreshStamp} />} />

                <Route path='/labels' element={<LabelList refreshStamp={refreshStamp} />} />

                <Route path='/promoters' element={<PromotersList refreshStamp={refreshStamp} />} />

                <Route path='/venues' element={<VenuesList refreshStamp={refreshStamp} />} />

                {/* <Route path='/events-results' element={<ResultsEventList refreshStamp={refreshStamp} />} /> */}
            </Routes>
        </main>

        <Footer
            onPostCreated={handlePostCreated}
            onEventCreated={handleEventCreated}
            location={location.pathname}
            onBandsClick={handleBandsClick}
            onLabelsClick={handleLabelsClick}
            onPromotersClick={handlePromotersClick}
            onVenuesClick={handleVenuesClick}
        ></Footer>
    </>
}