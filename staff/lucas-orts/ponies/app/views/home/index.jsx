import { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"

import Header from './Header'
import PostList from './PostList'
import Footer from './Footer'
import FollowingPostList from './FollowingPostList'
import FavsPostList from './FavsPostList'

import Hello from '../library/Hello'
import ResultsPostList from './ResultsPostList'


export default function Home({ onLogout }) {

    const navigate = useNavigate()
    const [refreshStamp, setRefreshStamp] = useState(null)

    const handlePostCreated = () => {
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleFollowClick = () => {
        navigate('/follows')
    }

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleFavsClick = () => {
        navigate('/favs')
    }
    return <>
        <Header
            onHomeClick={handleHomeClick}

            onFollowClick={handleFollowClick}

            onFavsClick={handleFavsClick}

            onLogout={onLogout}
        />

        <main className="flex flex-col items-center gap-4 mt-16 mb-12 dark:bg-black">
            <Routes>
                <Route path="/" element={<PostList refreshStamp={refreshStamp} />} />

                <Route path="/follows" element={<FollowingPostList />} />

                <Route path="/favs" element={<FavsPostList />} />

                <Route path="hello/:to" element={<Hello />} />

                <Route path="/search" element={<ResultsPostList />} />

            </Routes>
        </main>
        <Footer onPostCreated={handlePostCreated} />
    </>
}