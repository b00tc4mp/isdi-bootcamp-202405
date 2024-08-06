import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './home/Header'
import Body from './home/Body'
import Footer from './home/Footer'

import './Home.css'


export default function Home({ onLogout }) {
    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)

    const handleHomeFeed = () => {
        navigate('/')
    }

    const handleSearchUser = (userId) => {
        setRefreshStamp(Date.now())
        navigate(`/profile/${userId}`)
    }

    const handlePostCreatedOrCanceled = () => {
        setRefreshStamp(Date.now())
        navigate('/')
    }

    const handleUserFollow = () => {
        setRefreshStamp(Date.now())
    }

    const handleFollowedFeed = () => {
        navigate('/followed')
    }

    const handleFavsFeed = () => {
        navigate('/favs')
    }

    const handlePostSearch = () => {
        navigate('/search')
    }

    return <>
        <Header onLogout={onLogout} />

        <Routes>
            <Route path='/' element={<Body refreshStamp={refreshStamp} feed='home' onProfile={handleSearchUser} onFollow={handleUserFollow} />} />
            <Route path='/followed' element={<Body refreshStamp={refreshStamp} feed='followed' onProfile={handleSearchUser} onFollow={handleUserFollow} />} />
            <Route path='/favs' element={<Body refreshStamp={refreshStamp} feed='favs' onProfile={handleSearchUser} onFollow={handleUserFollow} />} />
            <Route path='/profile/:userId' element={<Body refreshStamp={refreshStamp} feed='profile' onProfile={handleSearchUser} onFollow={handleUserFollow} />} />
            <Route path='/search' element={<Body refreshStamp={refreshStamp} feed='search' onProfile={handleSearchUser} onFollow={handleUserFollow} />} />
        </Routes>


        <Footer onHomeButtonClick={handleHomeFeed}
            onPostSearch={handlePostSearch}
            onPostCreated={handlePostCreatedOrCanceled}
            onFollowedButtonClick={handleFollowedFeed}
            onSavedPostsButtonClick={handleFavsFeed} />
    </>

}