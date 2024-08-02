import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavPostList from './home/FavPostList'

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
        console.debug('Header -> handlePoniesClick')

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
            onFavsClick={handleFavsClick}
            onPoniesClick={handlePoniesClick}
            onLogout={onLogout}
        />

        <main className="view main">
            {view === 'home' && <PostList refreshStamp={refreshStamp} />}

            {view === 'ponies' && <PoniesPostList />}

            {view === 'favs' && <FavPostList />}
        </main>

        <Footer onPostCreated={handlePostCreated} />
    </>
}

export default Home