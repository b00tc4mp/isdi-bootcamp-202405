import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../library/Button'
import Lottie from 'lottie-react'
import MatchIconAnimation from '../../public/MatchIcon.json'
import GlobalIconAnimation from '../../public/GlobalIcon.json'
import FavIconAnimation from '../../public/FavIcon.json'
import ChatIconAnimation from '../../public/ChatIcon.json'
import LogoutIconAnimation from '../../public/LogoutIcon.json'



export default function Header({ onMatchClick, onHomeClick, onLikesClick, onChatClick, onLogout }) {
    console.debug('Header -> call')

    const [name, setName] = useState(null)
    const [selectedButton, setSelectedButton] = useState('')
    const [isLooping, setIsLooping] = useState(false)

    useEffect(() => {
        console.debug('Header -> useEffect')

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

    const handleHomeClick = () => {
        console.debug('Header -> handleHomeClick')

        setSelectedButton('/')
        onHomeClick()
    }

    const handleMatchClick = () => {
        console.debug('Header -> handleMatchClick')

        setSelectedButton('favs')
        onMatchClick()
    }

    const handleLikesClick = () => {
        console.debug('Header -> handleLikesClick')

        setSelectedButton('likes')
        onLikesClick()
    }

    const handleChatClick = () => {
        console.debug('Header -> handleChatClick')

        setSelectedButton('chat')
        onChatClick()
    }

    const handleLogout = () => {
        console.debug('Header -> handleLogout')

        setSelectedButton('logout')
        try {
            logic.logoutUser()
            onLogout()
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleMouseEnter = () => {
        setIsLooping(true)
    }

    const handleMouseLeave = () => {
        setIsLooping(false)
    }

    return <header className="fixed z-40 left-0 top-0 w-full flex justify-between items-center bg-gradient-to-b from-cyan-950 via-gray-900 to-cyan-900 p-2 box-border shadow-lg rounded-b-md bg-opacity-70 text-blue-300">

        <div className="flex w-full items-center gap-4">
            <h1 className="text-sm fixed font-medium text-orange-400">Hello {name} ⚡️!</h1>
        </div>

        <div className="flex items-center gap-3">
            <Button
                onClick={handleMatchClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                <Lottie animationData={MatchIconAnimation} loop={isLooping} className="w-full h-full" />
            </Button>

            <Button
                onClick={handleHomeClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                <Lottie animationData={GlobalIconAnimation} loop={isLooping} className="w-full h-full" />
            </Button>

            <Button
                onClick={handleLikesClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                <Lottie animationData={FavIconAnimation} loop={isLooping} className="w-full h-full" />
            </Button>

            <Button
                onClick={handleChatClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                <Lottie animationData={ChatIconAnimation} loop={isLooping} className="w-full h-full" />
            </Button>

            <Button
                onClick={handleLogout}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                <Lottie animationData={LogoutIconAnimation} loop={isLooping} className="w-full h-full" />
            </Button>
        </div>
    </header>
}