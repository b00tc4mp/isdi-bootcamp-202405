import { useEffect, useState } from 'react'

import logic from '../../logic'

import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

import useContext from '../Context'

export default function Header({ onLogout }) {
    const [name, setName] = useState(null)

    const { theme, setTheme } = useContext()

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


    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleSwitchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    return <header className='fixed left-0 top-0 h-11 w-screen flex items-center justify-end bg-custom-1 gap-2 shadow shadow-black z-10'>
        <Paragraph className='text-white'>{name}</Paragraph>
        <Button onClick={handleSwitchTheme}>{theme === 'dark' ? 'L' : 'D'}</Button>
        <Button className='rounded-sm bg-slate-200 px-1 min-w-16 h-6 text-black mr-8' onClick={handleLogoutClick}>Logout</Button>
    </header>
}