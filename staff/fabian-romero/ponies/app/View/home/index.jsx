import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import PostList from './PostList'
import Footer from './Footer'
import PoniesPostList from './PoniesPostList'
import FavsPostList from './FavsPostList'
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

        <main className="flex flex-col items-center gap-4 mt-16 mb-12 dark:bg-black">
            <Routes>
                <Route path="/" element={<PostList refreshStamp={refreshStamp} />} />

                <Route path="/ponies" element={<PoniesPostList />} />

                <Route path="/favs" element={<FavsPostList />} />

                <Route path="/hello/:to" element={<Hello />} />

                <Route path="/search" element={<ResultsPostList />} />
            </Routes>
        </main>

        <Footer onPostCreated={handlePostCreated} />
    </>
}