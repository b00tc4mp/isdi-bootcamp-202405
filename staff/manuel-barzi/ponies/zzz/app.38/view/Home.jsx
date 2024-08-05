import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavsPostList from './home/FavsPostList'

import { useState } from 'react'

const Home = ({ onLogout }) => {
    console.debug('Home -> call')

    const [refreshStamp, setRefreshStamp] = useState(null)
    const [view, setView] = useState('home')

    const handlePostCreated = () => {
        console.debug('Home -> handlePostCreated')

        setRefreshStamp(Date.now())
    }

    const handlePoniesClick = () => {
        console.debug('Home -> handlePoniesClick')

        setView('ponies')
    }

    const handleHomeClick = () => {
        console.debug('Home -> handleHomeClick')

        setView('home')
    }

    const handleFavsClick = () => {
        console.debug('Home -> handleFavsClick')

        setView('favs')
    }

    return <>
        <Header
            onHomeClick={handleHomeClick}
            onPoniesClick={handlePoniesClick}
            onFavsClick={handleFavsClick}
            onLogout={onLogout}
        />

        <main className="view main">
            {view === 'home' && <PostList refreshStamp={refreshStamp} />}

            {view === 'ponies' && <PoniesPostList />}

            {view === 'favs' && <FavsPostList />}
        </main>

        <Footer onPostCreated={handlePostCreated} />
    </>
}

export default Home