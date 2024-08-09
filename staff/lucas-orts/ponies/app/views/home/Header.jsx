import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../library/Button'
import Paragraph from '../library/Paragraph'

import Search from './Search'

import useContext from '../context'

const Header = ({ onHomeClick, onFollowClick, onFavsClick, onLogout }) => {
    const { alert, theme, setTheme } = useContext()

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

    const handleHomeClick = () => {
        onHomeClick()
    }

    const handleFollowClick = () => {
        onFollowClick()
    }

    const handleFavsClick = () => {
        onFavsClick()
    }

    const handleLogout = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleSwitchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    return <header className="fixed left-0 top-0 w-full flex justify-between items-center gap-2 bg-white p-2 box-border shadow-[0px_1px_1px_lightgray] dark:bg-black dark:text-white">
        <Search />

        <Paragraph>{name}</Paragraph>
        <Button onClick={handleHomeClick}>🏠</Button>
        <Button onClick={handleFollowClick}>Following</Button>
        <Button onClick={handleFavsClick}>🏴‍☠️</Button>
        <Button onClick={handleSwitchTheme}>{theme === 'dark' ? '🌞' : '🌚'}</Button>
        <Button onClick={handleLogout}>Logout</Button>
    </header>
}

export default Header