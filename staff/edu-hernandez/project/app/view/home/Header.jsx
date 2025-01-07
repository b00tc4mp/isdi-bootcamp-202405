import { useState, useEffect, useRef } from 'react'
import useContext from '../context.js'
import { FaPlus, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa'

import logic from '../../logic'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Image from '../library/Image'
import CreateEvent from './CreateEvent'
import Search from './Search'

export default function Header({ onEventCreated, onLogout }) {
    const [username, setName] = useState(null)
    const [createEventVisible, setCreateEventVisible] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const { theme, setTheme, alert } = useContext()
    const menuRef = useRef(null)

    useEffect(() => {
        // console.debug('Header -> useEffect')

        try {
            logic.getUsernameUser()

                .then(username => setName(username))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuRef])

    const toggleMenu = () => setMenuVisible(prev => !prev)

    const handleCreateEventClick = () => {
        // console.debug('Header -> handleCreateEventClick')
        setCreateEventVisible(true)
    }

    const handleCancelCreateEventClick = () => {
        // console.debug('Header -> handleCancelEventClick')
        setCreateEventVisible(false)
    }

    const handleEventCreated = () => {
        // console.debug('Header -> handleEventCreated')
        setCreateEventVisible(false)

        onEventCreated()
    }

    const handleLogout = () => {
        // console.debug('Header -> handleLogout')

        if (window.confirm('Log out?')) {
            // console.debug('Header -> LogoutMessage')

            try {
                logic.logoutUser()
                onLogout()
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        }
    }

    const handleSwitchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    return (
        <header className="flex items-center justify-between p-3 fixed top-0 left-0 z-10 bg-white dark:shadow-custom w-full dark:bg-background_grey">
            <Button className="mr-4" onClick={toggleMenu}>
                <Image src="/avatar/avatarIcon.png" alt="Avatar" className="h-11 w-11 rounded-full cursor-pointer"></Image>
            </Button>

            <div className='flex-grow'>
                <Search />
            </div>
            <div className="absolute right-6 font-bevan text-2xl text-dark_white">
                cities
            </div>

            {menuVisible && (
                <Container ref={menuRef}
                    className="flex flex-col absolute  rounded-lg shadow-lg space-y-2 z-10 top-20 left-0 px-4 py-4 bg-white border-gray-300 dark:bg-background_grey border dark:border-light_grey">

                    <Paragraph className="font-bevan font-regular text-lg text-grey dark:text-dark_white">{username}</Paragraph>

                    <Button
                        className="flex flex-row gap-4 text-grey dark:text-dark_white" onClick={handleCreateEventClick}>
                        <FaPlus className="h-5 w-5 text-light_grey dark:text-dark_white" />Create Event
                    </Button>

                    {createEventVisible && (
                        <CreateEvent onEventCreated={handleEventCreated} onCancelCreateEvent={handleCancelCreateEventClick} />
                    )}

                    <Button onClick={handleSwitchTheme} className="flex flex-row gap-4 text-grey dark:text-dark_white">
                        {theme === 'dark' ?
                            (<FaSun className="h-5 w-5 text-dark_white dark:text-dark_white" />) : (<FaMoon className="h-5 w-5 text-light_grey dark:text-dark_white" />)}
                        Switch Theme
                    </Button>

                    <Button onClick={handleLogout} className="flex flex-row gap-4 text-grey dark:text-dark_white">
                        <FaSignOutAlt className="h-5 w-5text-light_grey dark:text-dark_white" />
                        Logout
                    </Button>
                </Container>
            )}
        </header>
    )
}
