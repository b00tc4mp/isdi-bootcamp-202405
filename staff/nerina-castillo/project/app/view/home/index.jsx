import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ResultsPostList from './ResultsPostList'
import FollowingPostList from './FollowingUserPostList'
import BandList from './BandList'
import LabelList from './LabelList'
import PromotersList from './PromotersList'
import VenuesList from './VenuesList'
import ResultsEventList from './ResultsEventList.jsx'
import Container from '../library/Container.jsx'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

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

                <Route path='/events' element={<ResultsEventList />} />

                <Route path='/calendar' element={<ResultsEventList />} />

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