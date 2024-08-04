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


    return <header className="Header">
        <Paragraph>Hello, {name}!</Paragraph>
        <Button onClick={handleHomeClick} >🏚️</Button>
        <Button onClick={handlePoniesClick} >Following</Button>
        <Button onClick={handleFavsClick} >💫</Button>
        <Button className={"Button--logout"} onClick={handleLogout} >Logout</Button>
    </header>
}


export default Header