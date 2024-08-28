import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../library/Button'
import Container from '../library/Container'

import useContext from '../context'

export default function Header({ onFavsClick, onHomeClick, onLikesClick, onLogout }) {
    console.debug('Header -> call')

    const [name, setName] = useState(null)
    const [selectedButton, setSelectedButton] = useState('') // Estado para el botón seleccionado

    const { theme, setTheme } = useContext()

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

    const handleFavsClick = () => {
        console.debug('Header -> handleFavsClick')

        setSelectedButton('favs')
        onFavsClick()
    }

    const handleLikesClick = () => {
        console.debug('Header -> handleLikesClick')

        setSelectedButton('likes')
        onLikesClick()
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

    const handleSwitchTheme = () => {
        console.debug('Header -> handleSwitchTheme')

        setSelectedButton('theme')
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return <header className="fixed left-0 top-0 w-full flex justify-between items-center gap-2 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-90 dark:text-white p-2 box-border shadow-md rounded-b-md">
        <Container className="text-sm font-medium text-gray-900 dark:text-gray-100 flex gap-2">
            <h1>Hello {name} ⚡️!</h1>

            <Button
                onClick={handleFavsClick}
                className={`w-8 h-8 ${selectedButton === 'favs' ? 'bg-white' : 'bg-cyan-100'} bg-opacity-50 text-cyan-700 border border-cyan-300 rounded-md shadow-lg transition-transform transform hover:scale-95 hover:bg-opacity-70`}
            >
                🔐
            </Button>

            <Button
                onClick={handleHomeClick}
                className={`w-8 h-8 ${selectedButton === '/' ? 'bg-white' : 'bg-cyan-200'} bg-opacity-50 text-cyan-800 border border-cyan-400 rounded-md shadow-lg transition-transform transform hover:scale-95 hover:bg-opacity-70`}
            >
                ⚡️
            </Button>

            <Button
                onClick={handleLikesClick}
                className={`w-8 h-8 ${selectedButton === 'likes' ? 'bg-white' : 'bg-cyan-200'} bg-opacity-50 text-cyan-800 border border-cyan-400 rounded-md shadow-lg transition-transform transform hover:scale-95 hover:bg-opacity-70`}
            >
                ♥️
            </Button>

            <Button
                onClick={handleSwitchTheme}
                className={`w-8 h-8 ${selectedButton === 'theme' ? 'bg-white' : 'bg-white dark:bg-cyan-400'} bg-opacity-50 text-cyan-700 dark:text-cyan-100 border border-cyan-400 rounded-md shadow-lg transition-transform transform hover:scale-95 hover:bg-opacity-70 dark:hover:bg-opacity-70`}
            >
                {theme === 'dark' ? '⚪️' : '⚫️'}
            </Button>

            <Button
                onClick={handleLogout}
                className={`w-8 h-8 ${selectedButton === 'logout' ? 'bg-white' : 'bg-cyan-50'} bg-opacity-50 text-cyan-900 border border-cyan-200 rounded-md shadow-lg transition-transform transform hover:scale-95 hover:bg-opacity-70`}
            >
                🚪
            </Button>
        </Container>
    </header>
}
