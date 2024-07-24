import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import FollowingPostList from './home/FollowingPostList'
import FavsPostList from './home/FavsPostList'

import { useState } from 'react'

const Home = ({ onLogout }) => {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [view, setView] = useState('home')

    const handlePostCreated = () => {
        setRefreshStamp(Date.now())
    }

    const handleFollowClick = () => {
        setView('follows')
    }

    const handleHomeClick = () => {
        setView('home')
    }

    const handleFavsClick = () => {
        console.debug('Home -> handleFavsClick')

        setView('favs')
    }
    return <>
        <Header
            onHomeClick={handleHomeClick}

            onFollowClick={handleFollowClick}

            onFavsClick={handleFavsClick}

            onLogout={onLogout}
        />

        <main className="view main">
            {view === 'home' && <PostList refreshStamp={refreshStamp} />}

            {view === 'follows' && <FollowingPostList />}

            {view === 'favs' && <FavsPostList />}
        </main>
        <Footer onPostCreated={handlePostCreated} />
    </>
}

export default Home