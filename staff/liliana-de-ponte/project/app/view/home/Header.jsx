import logic from '../../logic/index.js'

import { useState, useEffect } from 'react'

import Container from '../library/Container'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'

//todo

export default function Header({ onHomeClick, onLikesClick, onLogout }) {

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

    const handleLikesClick = () => {
        onLikesClick()
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

        <Container>
            <Paragraph>{name}!</Paragraph>

            <Button onClick={handleHomeClick}>Home</Button>
            <Button onClick={handleLikesClick}>Lik</Button>
            <Button onClick={handleLogout}>Log</Button>
        </Container>


    </header>
}