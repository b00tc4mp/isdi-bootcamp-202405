import { useState, useEffect } from 'react'

import logic from '../../logic'

import Button from '../library/Button'
import Paragraph from '../library/Paragraph'

//TODO useContext

export default function Header({ onLogout }) {
    const [name, setName] = useState(null)

    //TODO theme

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

    // const handleHomeClick = () => onHomeClick()

    const handleLogout = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <header>
        <Button onClick={handleLogout}>Logout</Button>
    </header>
}