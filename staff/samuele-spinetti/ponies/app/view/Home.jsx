import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavPostList from './home/FavPostList'
import ProfileSettings from './home/ProfileSettings'

import { useState } from 'react'

const Home = ({ onLogout }) => {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [view, setView] = useState('home')

    const handlePostCreated = () => {

        setRefreshStamp(Date.now())
    }

    const handleProfileSettings = () => {
        setView('profile')
    }

    const handleHome = () => {
        setView('home')
    }

    const handleFavsPosts = () => {
        setView('favorites')
    }

    const handleFollowingUsersPosts = () => {
        setView('following')
    }

    return <>
        <Header
            onHomeClicked={handleHome}
            onFavsPostsClicked={handleFavsPosts}
            onFollowingUsersPostsClicked={handleFollowingUsersPosts}
            onProfileSettingsClicked={handleProfileSettings}
            onLogout={onLogout} />

        <main className='view main'>
            {view === 'home' && <PostList refreshStamp={refreshStamp} />}

            {view === 'following' && <PoniesPostList />}

            {view === 'favorites' && <FavPostList />}

            {view === 'profile' && <ProfileSettings />}
        </main>

        <Footer
            onPostCreated={handlePostCreated} />
    </>
}

export default Home