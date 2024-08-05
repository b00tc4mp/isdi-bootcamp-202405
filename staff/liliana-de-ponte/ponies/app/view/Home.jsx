import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavPostList from './home/FavPostList'


const Home = ({ onLogout }) => {
    console.debug('Home -> call')

    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)

    const handlePostCreated = () => {
        console.debug('Home -> handlePostCreated')

        setRefreshStamp(Date.now())
    }

    const handlePoniesClick = () => {
        console.debug('Header -> handlePoniesClick')

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
            onFavsClick={handleFavsClick}
            onPoniesClick={handlePoniesClick}
            onLogout={onLogout}
        />

        <main className="view main">
            <Routes>
                <Route path="/" element={<PostList refreshStamp={refreshStamp} />} />

                <Route path="/ponies" element={<PoniesPostList />} />

                <Route path="/favs" element={<FavPostList />} />
            </Routes>
        </main>

        <Footer onPostCreated={handlePostCreated} />
    </>
}

export default Home