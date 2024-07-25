import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

import './Header.css'

const Header = ({ onHomeClick, onPoniesClick, onFavsClick, onLogout }) => {
    console.debug('Header -> call')

    const [name, setName] = useState(null)

    useEffect(() => {
        console.debug('Header -> useEffect')
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

    return <header className="Header">
        <Paragraph className="Paragraph--user-name">Hello, {name}!</Paragraph>

        <Button className="Button--header" onClick={handleHomeClick}>🏠</Button>
        <Button className="Button--header" onClick={handlePoniesClick}>🪅</Button>
        <Button className="Button--header" onClick={handleFavsClick}>🏳️‍🌈</Button>
        <Button className="Button--header" onClick={handleLogout}>Logout</Button>

    </header>

}

export default Header
