import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import logic from '../../logic/index.js'
import Header from './Header'
import Footer from './Footer'
import ResultsPostList from './ResultsPostList'
import FollowingPostList from './FollowingUserPostList'
import Calendar from './Calendar'
import BandList from './BandList'
import LabelList from './LabelList'
import PromotersList from './PromotersList'
import VenuesList from './VenuesList'
import ResultsEventList from './ResultsEventList.jsx'
import Container from '../library/Container.jsx'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const location = useLocation()

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

    return <> <Container>
        <Header
            onHomeClick={handleFollowClick}
            onSearchClick={handleSearchClick}
            onCalendarClick={handleCalendarSearch}
            onFollowClick={handleFollowClick}
            onLogout={onLogout}
        />

        <main className='bg-slate-700 text-slate-300 min-h-screen'>

            <Routes>
                <Route path='/' element={<FollowingPostList refreshStamp={refreshStamp} />} />

                <Route path='/search' element={<ResultsPostList refreshStamp={refreshStamp} />} />

                <Route path='/events' element={<ResultsEventList refreshStamp={refreshStamp} />} />

                <Route path='/calendar' element={<ResultsEventList refreshStamp={refreshStamp} />} />

                <Route path='/bands' element={<BandList refreshStamp={refreshStamp} />} />

                <Route path='/labels' element={<LabelList refreshStamp={refreshStamp} />} />

                <Route path='/promoters' element={<PromotersList refreshStamp={refreshStamp} />} />

                <Route path='/venues' element={<VenuesList refreshStamp={refreshStamp} />} />

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
    </Container>
    </>
}