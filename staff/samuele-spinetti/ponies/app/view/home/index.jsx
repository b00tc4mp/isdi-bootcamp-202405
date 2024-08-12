import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import PostList from './PostList'
import Footer from './Footer'
import PoniesPostList from './PoniesPostList'
import FavPostList from './FavPostList'
import ProfileSettings from './ProfileSettings'
import ResultsPostList from './ResultsPostList'


const Home = ({ onLogout }) => {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()

    const handlePostCreated = () => {

        setRefreshStamp(Date.now())
        navigate('/')
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