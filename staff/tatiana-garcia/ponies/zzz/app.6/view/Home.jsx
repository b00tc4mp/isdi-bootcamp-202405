import { useState } from 'react'

import Header from './home/components/Header'
import PostList from './home/components/PostList'
import Footer from './home/components/Footer'
import PoniesPostList from './home/components/PoniesPostList'
import FavsPostList from './home/components/FavsPostList'

const Home = ({ onLogout }) => {
    console.debug('Home -> constructor')

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