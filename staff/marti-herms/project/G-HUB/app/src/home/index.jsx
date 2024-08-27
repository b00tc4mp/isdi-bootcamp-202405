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
import Chat from './Chat.jsx'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'
import paths from '../../util/paths.js'

export default function Home({ onLogout }) {
    const [makeReviewVisibility, setMakeReviewVisibility] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/games/search' || location.pathname === '/users/search') {
            navigate(paths.search)
        }
    }, [location])

    const handleHomeClick = () => {
        navigate(paths.home)
    }

    const handleAddGameClick = () => {
        navigate(paths.addGame)
    }

    const handleSearchClick = () => {
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
        navigate(paths.profile + userId)
    }

    const handleAddReview = () => {
        setMakeReviewVisibility(true)
    }

    const handleCancelReview = () => {
        setMakeReviewVisibility(false)
    }

    const handleChat = (userId) => {
        navigate(paths.chat + userId)
    }

    return <>
        <Header onLogoutClick={onLogout} onProfileClick={handleProfileClick} ></Header>

        <main className='pb-[7%] w-screen h-auto dark:bg-[#1e1e1e]'>
            <Routes>
                <Route path={paths.home} element={<Library onGameClick={handleGame} />} />
                <Route path={paths.profile + ':userId'} element={<Profile onChange={handleSearchUser} onGameClick={handleGame} />} />
                <Route path={paths.following + ':userId'} element={<UserList onUserClick={handleSearchUser} onChatClick={handleChat} />} />
                <Route path={paths.followers + ':userId'} element={<UserList onUserClick={handleSearchUser} onChatClick={handleChat} />} />
                <Route path={paths.addGame} element={<AddGame onAddGame={handleAddGame} />} />
                <Route path={paths.search} element={<><Search /> <SearchResults onGameClick={handleGame} onUserClick={handleSearchUser} onChatClick={handleChat} /></>} />
                <Route path={paths.game + ':gameId'} element={<Game makeReviewVisibility={makeReviewVisibility} onCancel={handleCancelReview} />} />
                <Route path={paths.chat + ':userId'} element={<Chat onOpenChat={handleChat} />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </main>

        <Footer makeReviewVisibility={makeReviewVisibility}
            onSearchGame={handleSearchClick}
            onAddGame={handleAddGameClick}
            onHome={handleHomeClick}
            onAddReview={handleAddReview}
            onCancel={handleCancelReview}
            onChat={handleChat} ></Footer>
    </>
}