import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavPostList from './home/FavPostList'
import ProfileSettings from './home/ProfileSettings'
import ResultsPostList from './home/ResultsPostList'


const Home = ({ onLogout }) => {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()

    const handlePostCreated = () => {

        setRefreshStamp(Date.now())
    }

    const handleProfileSettings = () => {
        navigate('/settings')
    }

    const handleHome = () => {
        navigate('/')
    }

    const handleFavsPosts = () => {
        navigate('/favs')
    }

    const handleFollowingUsersPosts = () => {
        navigate('/ponies')
    }

    return <>
        <Header
            onHomeClicked={handleHome}
            onFavsPostsClicked={handleFavsPosts}
            onFollowingUsersPostsClicked={handleFollowingUsersPosts}
            onProfileSettingsClicked={handleProfileSettings}
            onLogout={onLogout} />

        <main className='view main'>
            <Routes>
                <Route path="/" element={<PostList refreshStamp={refreshStamp} />} />
                <Route path="/ponies" element={<PoniesPostList />} />
                <Route path="/favs" element={<FavPostList />} />
                <Route path="/settings" element={<ProfileSettings />} />
                <Route path="/search" element={<ResultsPostList />} />
            </Routes>
        </main >

        <Footer
            onPostCreated={handlePostCreated} />
    </>
}

export default Home