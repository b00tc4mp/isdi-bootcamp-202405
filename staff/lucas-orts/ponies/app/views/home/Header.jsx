import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

import './Header.css'

const Header = ({ onHomeClick, onFollowClick, onFavsClick, onLogout }) => {
    const [name, setName] = useState(null)

    useEffect(() => {
        try {
            logic.getUserName((error, name) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setName(name)
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


    return <header className="header">
        <Paragraph>Hello, {name}!</Paragraph>
        <Button onClick={handleHomeClick}>🏠</Button>
        <Button onClick={handleFollowClick}>Following</Button>
        <Button onClick={handleFavsClick}>🏴‍☠️</Button>
        <Button onClick={handleLogout}>Logout</Button>
    </header>
}

export default Header