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

import extractPayloadFromToken from '../../util/extractPayloadFromToken'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [makeReviewVisibility, setMakeReviewVisibility] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/games/search' || location.pathname === '/users/search') {
            navigate('/search')
        }
    }, [location])

    const handleHomeClick = () => {
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleAddGameClick = () => {
        navigate('/games/register')
    }

    const handleSearchClick = () => {
        setRefreshStamp(Date.now())
        navigate('/search')
    }

    const handleRefresh = () => {
        setRefreshStamp(Date.now())
    }

    const handleAddGame = () => {
        navigate('/')
    }

    const handleGame = (gameId) => {
        navigate(`/games/${gameId}`)
    }

    const handleProfileClick = () => {
        const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

        navigate(`/profile/${userId}`)
    }

    const handleSearchUser = (userId) => {
        setRefreshStamp(Date.now())

        navigate(`/profile/${userId}`)
    }

    const handleAddReview = () => {
        setMakeReviewVisibility(true)
    }

    const handleCancelReview = () => {
        setMakeReviewVisibility(false)
    }

    return <>
        <Header onLogoutClick={onLogout} onProfileClick={handleProfileClick} refreshStamp={refreshStamp} ></Header>

        <main className='py-[10%] w-screen h-full dark:bg-[#1e1e1e]'>
            <Routes>
                <Route path='/' element={<Library onGameClick={handleGame} />} />
                <Route path='/profile/:userId' element={<Profile refreshStamp={refreshStamp} onChange={handleSearchUser} onGameClick={handleGame} />} />
                <Route path='/profile/:userId/following' element={<p>Hello</p>} />
                <Route path='/profile/:userId/followers' element={<p>Hello</p>} />
                <Route path='/games/register' element={<AddGame onAddGame={handleAddGame} />} />
                <Route path='/search' element={<><Search onChange={handleRefresh} /> <SearchResults refreshStamp={refreshStamp} onGameClick={handleGame} onUserClick={handleSearchUser} /></>} />
                <Route path='/games/:gameId' element={<Game makeReviewVisibility={makeReviewVisibility} onCancel={handleCancelReview} />} />
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