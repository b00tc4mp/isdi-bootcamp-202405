import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Heading from '../library/Heading'
import logic from '../../logic/index.js'
import Header from './Header'
import Footer from './Footer'
import ResultsPostList from './ResultsPostList'
import FollowingPostList from './FollowingUserPostList'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()
    const [name, setName] = useState(null)

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => setName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleFollowClick = () => navigate('/')

    const handlePostCreated = () => setRefreshStamp(Date.now())

    const handleSearchClick = () => navigate('/search')

    return <>
        <Header
            onHomeClick={handleFollowClick}
            onSearchClick={handleSearchClick}
            onFollowClick={handleFollowClick}
            onLogout={onLogout}
        />

        <main>
            <Heading>Hello, {name}</Heading>

            <Routes>
                <Route path='/' element={<FollowingPostList refreshStamp={refreshStamp} />} />

                <Route path='/search' element={<ResultsPostList refreshStamp={refreshStamp} />} />
            </Routes>
        </main>

        <Footer onPostCreated={handlePostCreated}></Footer>
    </>
}