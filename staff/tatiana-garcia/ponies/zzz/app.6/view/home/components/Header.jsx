import { useState, useEffect } from 'react'

import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'

import logic from '../../../logic'

import './Header.css'


const Header = ({ onHomeClick, onPoniesClick, onFavsClick, onLogout }) => {
    console.debug('Header -> call')

    const [name, setName] = useState(null)

    useEffect(() => {
        console.debug('Header -> useEfect')

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

    return <header className="header">
        <Paragraph>Hello, {name}!</Paragraph>
        <Button onClick={handleHomeClick}>🏯</Button>
        <Button onClick={handlePoniesClick}>🦄</Button>
        <Button onClick={handleFavsClick}>🤩</Button>
        <Button className='post-action-button' onClick={handleLogout}>Logout</Button>
    </header>

}

export default Header