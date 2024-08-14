import { useState, useEffect } from 'react'

import logic from '../../logic'

import Button from '../library/Button'

//TODO useContext

export default function Header({ onHomeClick, onLogout, onSearchClick, onCalendarClick }) {
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


    const handleLogout = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleHomeClick = () => onHomeClick()

    const handleSearchClick = () => onSearchClick()

    const handleCalendarSearch = () => onCalendarClick()

    return <header>
        <Button onClick={handleHomeClick}>home</Button>
        <Button onClick={handleSearchClick}>search</Button>
        <Button onClick={handleCalendarSearch}>calendar</Button>
        <Button onClick={handleLogout}>logout</Button>
    </header>
}