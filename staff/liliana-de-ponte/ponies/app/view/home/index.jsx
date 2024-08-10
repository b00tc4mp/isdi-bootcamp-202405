import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import PostList from './PostList'
import Footer from './Footer'
import PoniesPostList from './PoniesPostList'
import FavPostList from './FavPostList'
import Hello from './Hello'
import ResultsPostList from './ResultsPostList'

export default function Home({ onLogout }) {
    console.debug('Home -> call')

    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)

    const handlePostCreated = () => {
        console.debug('Home -> handlePostCreated')

        setRefreshStamp(Date.now())
        navigate('/')
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

        <main className="flex flex-col items-center gap-4 text-md font-serif mt-16 mb-12 dark:bg-pink-900">
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
