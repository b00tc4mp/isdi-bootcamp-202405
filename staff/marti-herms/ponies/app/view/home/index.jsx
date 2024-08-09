import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

export default function Home({ onLogout }) {
    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)
    const [addPostVisibility, setAddPostVisibility] = useState(false)

    const handleHomeFeed = () => {
        navigate('/')
    }

    const handleSearchUser = (userId) => {
        setRefreshStamp(Date.now())
        navigate(`/profile/${userId}`)
    }

    const handlePostCreatedOrCanceled = () => {
        setAddPostVisibility(false)
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

    const handleAddPostButton = () => {
        setAddPostVisibility(true)
    }

    return <>
        <Header onLogout={onLogout} />

        <Routes>
            <Route path='/' element={<Body refreshStamp={refreshStamp} feed='home' onProfile={handleSearchUser} onFollow={handleUserFollow} addPost={addPostVisibility} onPostCreated={handlePostCreatedOrCanceled} />} />
            <Route path='/followed' element={<Body refreshStamp={refreshStamp} feed='followed' onProfile={handleSearchUser} onFollow={handleUserFollow} addPost={addPostVisibility} onPostCreated={handlePostCreatedOrCanceled} />} />
            <Route path='/favs' element={<Body refreshStamp={refreshStamp} feed='favs' onProfile={handleSearchUser} onFollow={handleUserFollow} addPost={addPostVisibility} onPostCreated={handlePostCreatedOrCanceled} />} />
            <Route path='/profile/:userId' element={<Body refreshStamp={refreshStamp} feed='profile' onProfile={handleSearchUser} onFollow={handleUserFollow} addPost={addPostVisibility} onPostCreated={handlePostCreatedOrCanceled} />} />
            <Route path='/search' element={<Body refreshStamp={refreshStamp} feed='search' onProfile={handleSearchUser} onFollow={handleUserFollow} addPost={addPostVisibility} onPostCreated={handlePostCreatedOrCanceled} />} />
        </Routes>


        <Footer onHomeButtonClick={handleHomeFeed}
            onPostSearch={handlePostSearch}
            onFollowedButtonClick={handleFollowedFeed}
            onSavedPostsButtonClick={handleFavsFeed}
            onAddPostButton={handleAddPostButton} />
    </>

}