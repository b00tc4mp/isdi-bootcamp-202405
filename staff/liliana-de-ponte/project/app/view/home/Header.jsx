import logic from '../../logic/index.js'

import { useState, useEffect } from 'react'

import Container from '../library/Container'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Image from '../library/Image'

//todo

export default function Header({ onHomeClick, onLogout }) {

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

    const handleLogout = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <header className="bg-[#050968]">

        <Container>
            <Paragraph>{name}!</Paragraph>

            <Button onClick={handleHomeClick}><Image src="public/home.svg"></Image></Button>
            <Button onClick={handleLogout}><Image src="public/exit.svg"></Image></Button>
        </Container>


    </header>
}