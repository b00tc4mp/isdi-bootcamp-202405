import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../library/Button'
import Paragraph from '../library/Paragraph'

import useContext from '../context'


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


    return <header className="fixed start-0 top-0 w-full flex justify-around items-center  bg-[white] box-border shadow-[0_4px_8px_rgba(0,0,0,0.2)] py-2 px-0 z-10 dark:bg-slate-800 dark:text-white">
        <Paragraph>Hello, {name}!</Paragraph>
        <Button onClick={handleHomeClick} >🏚️</Button>
        <Button onClick={handlePoniesClick} >Following</Button>
        <Button onClick={handleFavsClick} >💫</Button>
        <Button onClick={handleSwitchTheme} >{theme === 'dark' ? '☀️' : '🌑'}</Button>
        <Button className={"bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[5px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] mr-px-[.5rem]"} onClick={handleLogout} >Logout</Button>
    </header>
}

