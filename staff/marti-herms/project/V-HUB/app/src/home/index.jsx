import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Header from './Header'
import Library from './Library'
import Footer from './Footer'
import GameRegister from './GameRegister'
import GameSearch from './GameSearch'
import GameSearchResults from './GameSearchResults'
import Game from './Game'
import Profile from './Profile'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [makeReviewVisibility, setMakeReviewVisibility] = useState(false)

    const navigate = useNavigate()

    const handleHomeClick = () => {
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleRegisterGameClick = () => {
        navigate('/games/register')
    }

    const handleSearchGameClick = () => {
        setRefreshStamp(Date.now())
        navigate('/games/search')
    }

    const handleInputChange = () => {
        setRefreshStamp(Date.now())
    }

    const handleRegisterGame = (gameId) => {
        navigate(`/games/${gameId}`)
    }

    const handleGame = (gameId) => {
        navigate(`/games/${gameId}`)
    }

    const handleProfileClick = () => {
        const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

        navigate(`/profile/${userId}`)
    }

    const handleSearchUser = (userId) => {
        navigate(`/profile/${userId}`)
    }

    const handleAddReview = () => {
        setMakeReviewVisibility(true)
    }

    const handleCancelReview = () => {
        setMakeReviewVisibility(false)
    }

    return <>
        <Header onLogoutClick={onLogout} onProfileClick={handleProfileClick} ></Header>

        <main className='my-10 w-screen h-full dark:bg-[#1e1e1e]'>
            <Routes>
                <Route path='/' element={<Library onGameClick={handleGame} />} />
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='/games/register' element={<GameRegister onGameRegister={handleRegisterGame} />} />
                <Route path='/games/search' element={<><GameSearch onChange={handleInputChange} /> <GameSearchResults refreshStamp={refreshStamp} onGameClick={handleGame} /></>} />
                <Route path='/games/:gameId' element={<Game makeReviewVisibility={makeReviewVisibility} onCancel={handleCancelReview} />} />
            </Routes>
        </main>

        <Footer makeReviewVisibility={makeReviewVisibility}
            onSearchGame={handleSearchGameClick}
            onRegisterGame={handleRegisterGameClick}
            onHome={handleHomeClick}
            onAddReview={handleAddReview}
            onCancel={handleCancelReview} ></Footer>
    </>
}