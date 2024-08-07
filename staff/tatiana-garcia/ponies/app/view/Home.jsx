import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './home/components/Header'
import PostList from './home/components/PostList'
import Footer from './home/components/Footer'
import PoniesPostList from './home/components/PoniesPostList'
import FavsPostList from './home/components/FavsPostList'
import Hello from './home/components/Hello.jsx'
import ResultsPostList from './home/components/ResultsPostList.jsx'

const Home = ({ onLogout }) => {
    console.debug('Home -> constructor')

    const navigate = useNavigate()

    const [refreshStamp, setRefreshStamp] = useState(null)

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

        <main className="flex flex-col items-center gap-4 mt-20 mb-12">
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

export default Home