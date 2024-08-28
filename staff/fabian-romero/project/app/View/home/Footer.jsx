import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Search from './Search'
import Button from '../library/Button'

export default function Footer({ onSearchFound, onProfileClicked }) {
    console.debug('Footer -> call')

    const [searchVisible, setSearchVisible] = useState(false)
    const navigate = useNavigate()

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

    return (
        <footer className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-2 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-90 dark:text-white p-2 shadow-md rounded-t-md">
            <Button
                onClick={handleSearchUserClick}
                className="w-8 h-8 bg-cyan-200 bg-opacity-50 text-cyan-700 border border-cyan-300 rounded-md shadow-lg transition-transform transform hover:scale-95 hover:bg-opacity-70">
                🔍
            </Button>

            <Button
                onClick={handleProfileClick}
                className="w-8 h-8 bg-cyan-200 bg-opacity-50 text-cyan-700 border border-cyan-300 rounded-md shadow-lg transition-transform transform hover:scale-95 hover:bg-opacity-70">
                👤
            </Button>

            {searchVisible && (
                <Search
                    onSearchFound={handleSearchFound}
                    onUnsearchPost={handleUnsearchUserClick}
                />
            )}

        </footer>
    )
}
