import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Header from './Header'
import Library from './Library'
import Footer from './Footer'
import GameRegister from './GameRegister'
import GameSearch from './GameSearch'

export default function Home({ onLogout }) {
    const [path, setPath] = useState('/')

    const navigate = useNavigate()

    useEffect(() => {
        navigate(path)
    }, [path])

    const handleHomeClick = () => {
        setPath('/')
    }

    const handleRegisterGameClick = () => {
        setPath('/games/register')
    }

    const handleSearchGameClick = () => {
        setPath('/games/search')
    }

    const handleRegisterGame = (gameId) => {
        setPath(`/games/${gameId}`)
    }

    return <>
        <Header onLogoutClick={onLogout} ></Header>

        <main className='py-10 w-screen h-full dark:bg-[#1e1e1e]'>
            <Routes>
                <Route path='/' element={<p className='text-white'>Hello World</p>} />
                <Route path='/games/register' element={<GameRegister onGameRegister={handleRegisterGame} />} />
                <Route path='/games/search' element={<GameSearch />} />
                <Route path='/games/:gameId' />
            </Routes>
        </main>

        <Footer path={path} onSearchGame={handleSearchGameClick} onRegisterGame={handleRegisterGameClick} onHome={handleHomeClick} ></Footer>
    </>
}