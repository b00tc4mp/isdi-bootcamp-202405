import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import Header from './Header'
import Library from './Library'
import Footer from './Footer'
import GameRegister from './GameRegister'
import GameSearch from './GameSearch'
import GameSearchResults from './GameSearchResults'
import Game from './Game'

export default function Home({ onLogout }) {
    const location = useLocation()

    const [path, setPath] = useState(location.pathname)
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [makeReviewVisibility, setMakeReviewVisibility] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        navigate(path)
    }, [path])

    const handleHomeClick = () => {
        setRefreshStamp(Date.now())
        setPath('/')
    }

    const handleRegisterGameClick = () => {
        setPath('/games/register')
    }

    const handleSearchGameClick = () => {
        setRefreshStamp(Date.now())
        setPath('/games/search')
    }

    const handleInputChange = () => {
        setRefreshStamp(Date.now())
    }

    const handleRegisterGame = (gameId) => {
        setPath(`/games/${gameId}`)
    }

    const handleGame = (gameId) => {
        setPath(`/games/${gameId}`)
    }

    const handleAddReview = () => {
        setMakeReviewVisibility(true)
    }

    const handleCancelReview = () => {
        setMakeReviewVisibility(false)
    }

    return <>
        <Header onLogoutClick={onLogout} ></Header>

        <main className='py-10 w-screen h-full dark:bg-[#1e1e1e]'>
            <Routes>
                <Route path='/' element={<Library onGameClick={handleGame} />} />
                <Route path='/games/register' element={<GameRegister onGameRegister={handleRegisterGame} />} />
                <Route path='/games/search' element={<><GameSearch onChange={handleInputChange} /> <GameSearchResults refreshStamp={refreshStamp} onGameClick={handleGame} /></>} />
                <Route path='/games/:gameId' element={<Game makeReviewVisibility={makeReviewVisibility} onCancel={handleCancelReview} />} />
            </Routes>
        </main>

        <Footer path={path}
            makeReviewVisibility={makeReviewVisibility}
            onSearchGame={handleSearchGameClick}
            onRegisterGame={handleRegisterGameClick}
            onHome={handleHomeClick}
            onAddReview={handleAddReview}
            onCancel={handleCancelReview} ></Footer>
    </>
}