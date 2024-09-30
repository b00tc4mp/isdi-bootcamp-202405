import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Hello from './Hello'
import Header from './Header'
import Footer from './Footer'
import UsersInvestorList from './UsersInvestorList'
import UsersProjectList from './UsersProjectList'
import MatchList from './MatchList'
import LikesList from './LikesList'
import Profile from './Profile'
import ResultsList from './ResultsList'
import Chats from './Chats'
import Chat from './Chat'

import logic from '../../logic'
import Paragraph from '../library/Paragraph'

export default function Home({ onLogout }) {
    console.debug('Home -> call')

    const navigate = useNavigate()
    const [userRole, setUserRole] = useState(null)
    const [refreshStamp, setRefreshStamp] = useState(null)


    useEffect(() => {
        console.debug('Home -> useEffect')

        try {
            logic.getUserRole()
                .then(role => {
                    setUserRole(role)
                    if (role === 'investor') {
                        navigate('/')

                    } else if (role === 'project') {
                        navigate('/')
                    }
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }, [])


    const handleHomeClick = () => {
        console.debug('Home -> handleHomeClick')
        navigate('/')
    }

    const handleMatchClick = () => {
        console.debug('Home -> handleMatchClick')
        navigate('/match')
    }

    const handleLikeClick = () => {
        console.debug('Home -> handleLikeClick')
        navigate('/likes')
    }

    const handleChatClick = () => {
        console.debug('Home -> handleChatClick')
        navigate('/chats')
    }

    const handleSearchClick = () => {
        console.debug('Home -> handleSearchClick')
        navigate('/search')
    }

    const handleProfileClicked = () => {
        console.debug('Home -> handleProfileClick')

        navigate('/profile')
    }

    return <>
        <Header
            onHomeClick={handleHomeClick}
            onMatchClick={handleMatchClick}
            onLikesClick={handleLikeClick}
            onChatClick={handleChatClick}
            onLogout={onLogout}>
        </Header>

        <main className="flex flex-col items-center gap-4 mt-14 mb-12 bg-cyan-900 h-full ">
            <Routes>
                <Route
                    path="/"
                    element={
                        userRole === 'investor' ?
                            <UsersInvestorList refreshStamp={refreshStamp} /> :
                            userRole === 'project' ?
                                <UsersProjectList refreshStamp={refreshStamp} /> :
                                <Paragraph text="Loading..." />
                    }
                />
                <Route path="/hello/:to" element={<Hello />} />
                <Route path="/match" element={<MatchList />} />
                <Route path="/likes" element={<LikesList />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chats/:chatId" element={<Chat />} />
                <Route path="/search" element={<ResultsList />} />
                <Route path="/profile" element={<Profile />} />

            </Routes>
        </main>

        <Footer
            onSearchClick={handleSearchClick}
            onProfileClicked={handleProfileClicked} />

    </>
}