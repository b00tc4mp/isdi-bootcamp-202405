import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavsPostList from './home/FavsPostList'

import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Hello from './components/Hello'
import SearchResults from './home/SearchResults'

const Home = ({ onLogout }) => {
    console.debug('Home -> call')

    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()

    const handlePostCreated = () => {
        console.debug('Home -> handlePostCreated')

        setRefreshStamp(Date.now())
    }

    const handlePoniesClick = () => {
        console.debug('Home -> handlePoniesClick')

        navigate('/ponies')
    }

    const handleHomeClick = () => {
        console.debug('Home -> handleHomeClick')

        navigate('/')
    }

    const handleFavsClick = () => {
        console.debug('Home -> handleFavsClick')

        navigate('/favs')
    }

    return <>
        <Header
            onHomeClick={handleHomeClick}
            onPoniesClick={handlePoniesClick}
            onFavsClick={handleFavsClick}
            onLogout={onLogout}
        />

        <main className="view main">
            <Routes>
                <Route path="/" element={<PostList refreshStamp={refreshStamp} />} />

                <Route path="/ponies" element={<PoniesPostList />} />

                <Route path="/favs" element={<FavsPostList />} />

                <Route path="/hello/:to" element={<Hello />} />

                <Route path="/search" element={<SearchResults />} />

            </Routes>
        </main>

        <Footer onPostCreated={handlePostCreated} />
    </>
}

export default Home