import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Search from './Search'
import Button from '../library/Button'
import Lottie from 'lottie-react'
import userIconAnimation from '../../public/UserIcon.json'
import searchIconAnimation from '../../public/SearchIcon.json'


export default function Footer({ onSearchFound, onProfileClicked }) {
    console.debug('Footer -> call')

    const [searchVisible, setSearchVisible] = useState(false)
    const navigate = useNavigate()
    const [isLooping, setIsLooping] = useState(false)

    const handleSearchUserClick = () => {
        console.debug('Footer -> handleSearchUserClick')

        setSearchVisible(true)
    }

    const handleUnsearchUserClick = () => {
        console.debug('Footer -> handleUnsearchUserClick')

        setSearchVisible(false)
    }

    const handleSearchFound = () => {
        setSearchVisible(false)

        onSearchFound()
    }

    const handleProfileClick = () => {
        console.debug('Footer -> handleProfileClick')

        onProfileClicked()
    }

    const handleMouseEnter = () => {
        setIsLooping(true)
    }

    const handleMouseLeave = () => {
        setIsLooping(false)
    }

    return <footer className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-2 bg-gradient-to-b from-cyan-950 via-gray-900 to-cyan-900 bg-opacity-80 text-blue-300 p-2 shadow-lg rounded-t-md">
        <Button
            onClick={handleSearchUserClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95" >
            <Lottie animationData={searchIconAnimation} loop={isLooping} className="w-full h-full" />
        </Button>

        <Button
            onClick={handleProfileClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
            <Lottie animationData={userIconAnimation} loop={isLooping} className="w-full h-full" />
        </Button>

        {searchVisible && (
            <Search
                onSearchFound={handleSearchFound}
                onUnsearchPost={handleUnsearchUserClick}
            />
        )}
    </footer>
}
