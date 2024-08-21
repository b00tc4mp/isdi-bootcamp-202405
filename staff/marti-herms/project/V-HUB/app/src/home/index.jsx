import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import Header from './Header'
import Library from './Library'
import Footer from './Footer'
import AddGame from './AddGame'
import Search from './Search'
import SearchResults from './SearchResults'
import Game from './Game'
import Profile from './Profile'
import UserList from './UserList'
import NotFoundPage from './NotFoundPage'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'
import paths from '../../util/paths.js'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [makeReviewVisibility, setMakeReviewVisibility] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/games/search' || location.pathname === '/users/search') {
            navigate(paths.search)
        }
    }, [location])

    const handleHomeClick = () => {
        // setRefreshStamp(Date.now())
        navigate(paths.home)
    }

    const handleAddGameClick = () => {
        navigate(paths.addGame)
    }

    const handleSearchClick = () => {
        // setRefreshStamp(Date.now())
        navigate(paths.search)
    }

    const handleAddGame = () => {
        navigate(paths.home)
    }

    const handleGame = (gameId) => {
        navigate(paths.game + gameId)
    }

    const handleProfileClick = () => {
        const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

        navigate(paths.profile + userId)
    }

    const handleSearchUser = (userId) => {
        // setRefreshStamp(Date.now())

        navigate(paths.profile + userId)
    }

    const handleAddReview = () => {
        setMakeReviewVisibility(true)
    }

    const handleCancelReview = () => {
        setMakeReviewVisibility(false)
    }

    return <>
        <Header onLogoutClick={onLogout} onProfileClick={handleProfileClick} refreshStamp={refreshStamp} ></Header>

        <main className='pb-[7%] w-screen h-auto dark:bg-[#1e1e1e]'>
            <Routes>
                <Route path={paths.home} element={<Library onGameClick={handleGame} />} />
                <Route path={paths.profile + ':userId'} element={<Profile refreshStamp={refreshStamp} onChange={handleSearchUser} onGameClick={handleGame} />} />
                <Route path={paths.following + ':userId'} element={<UserList onUserClick={handleSearchUser} />} />
                <Route path={paths.followers + ':userId'} element={<UserList onUserClick={handleSearchUser} />} />
                <Route path={paths.addGame} element={<AddGame onAddGame={handleAddGame} />} />
                <Route path={paths.search} element={<><Search /> <SearchResults refreshStamp={refreshStamp} onGameClick={handleGame} onUserClick={handleSearchUser} /></>} />
                <Route path={paths.game + ':gameId'} element={<Game makeReviewVisibility={makeReviewVisibility} onCancel={handleCancelReview} />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </main>

        <Footer makeReviewVisibility={makeReviewVisibility}
            onSearchGame={handleSearchClick}
            onAddGame={handleAddGameClick}
            onHome={handleHomeClick}
            onAddReview={handleAddReview}
            onCancel={handleCancelReview} ></Footer>
    </>
}