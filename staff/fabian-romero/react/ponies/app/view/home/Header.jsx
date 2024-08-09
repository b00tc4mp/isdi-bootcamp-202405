import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'

import Search from './Search'

import useContext from '../../context'
// import './Header.css'

export default function Header({ onHomeClick, onPoniesClick, onFavsClick, onLogout }) {
    console.debug('Header -> call')

    const [name, setName] = useState(null)

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

        onHomeClick()
    }

    const handlePoniesClick = () => {
        console.debug('Header -> handlePoniesClick')

        onPoniesClick()
    }

    const handleFavsClick = () => {
        console.debug('Header -> handleFavsClick')

        onFavsClick()
    }

    const handleLogout = () => {
        console.debug('Header -> handleLogout')

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

        <Container>
            <Paragraph>{name}</Paragraph>
            <Button onClick={handleHomeClick}>🏚️</Button>
            <Button onClick={handlePoniesClick}>🦄</Button>
            <Button onClick={handleFavsClick}>🏳️‍🌈</Button>
            <Button onClick={handleSwitchTheme}>{theme === 'dark' ? '🌞' : '🌚'}</Button>
            <Button onClick={handleLogout}>🚪</Button>
        </Container>
    </header>
}