import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavPostList from './home/FavPostList'
import Hello from './home/Hello'
import ResultsPostList from './home/ResultsPostList'

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

        <main className="flex flex-col items-center gap-[1rem] text-[1.1rem] font-serif mt-[3.5rem] mb-[3rem]">
            <Routes>
                <Route path="/" element={<PostList refreshStamp={refreshStamp} />} />

                <Route path="/ponies" element={<PoniesPostList />} />

                <Route path="/favs" element={<FavPostList />} />

                <Route path="/hello/:to" element={<Hello />} />

                <Route path="/search" element={<ResultsPostList />} />

            </Routes>
        </main>

        <Footer onPostCreated={handlePostCreated} />
    </>
}

export default Home