import logic from '../../logic'

import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import './Header.css'

import { useEffect, useState } from 'react'

export default function Header({ onLogout }) {
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
    })


    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <header className='Header'>
        <Paragraph>{name}</Paragraph>
        <Button className='rounded-sm bg-slate-200 px-1 min-w-16 h-6 text-black mr-2.5' onClick={handleLogoutClick}>Logout</Button>
    </header>
}