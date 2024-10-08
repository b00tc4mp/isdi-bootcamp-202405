import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ResultsPostList from './ResultsPostList'
import FollowingPostList from './FollowingUserPostList'
import ResultsEventList from './ResultsEventList'
import Container from '../library/Container'
import Menu from './Menu'
import UserProfile from './UserProfile'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [isListVisible, setIsListVisible] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleFollowClick = () => navigate('/')

    const handlePostCreated = () => setRefreshStamp(Date.now())

    const handleSearchClick = () => navigate('/search')

    const handleCalendarSearch = () => navigate('/calendar')

    const handleEventCreated = () => setRefreshStamp(Date.now())


    return <> <Container>
        <Header
            onHomeClick={handleFollowClick}
            onCalendarClick={handleCalendarSearch}
        />

        <main className='bg-slate-700 text-slate-300 min-h-screen'>

            <Routes>
                <Route path='/' element={<FollowingPostList refreshStamp={refreshStamp} />} />

                <Route path='/search' element={<ResultsPostList refreshStamp={refreshStamp} />} />

                <Route path='/events' element={<ResultsEventList />} />

                <Route path='/calendar' element={<ResultsEventList />} />

                <Route path='/menu' element={<Menu onLogOut={onLogout} refreshStamp={refreshStamp} isListVisible={isListVisible} setListVisibility={setIsListVisible} />} />

                <Route path='/profile' element={<UserProfile />} />
            </Routes>
        </main>

        <Footer
            onPostCreated={handlePostCreated}
            onEventCreated={handleEventCreated}
            location={location.pathname}
            onSearchClick={handleSearchClick}
        ></Footer>
    </Container>
    </>
}