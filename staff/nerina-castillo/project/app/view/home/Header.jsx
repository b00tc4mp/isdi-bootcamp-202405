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

    return <header className='fixed start-0 top-0 w-full flex justify-around py-2 px-0 z-10 bg-slate-800 text-slate-300 border-b border-slate-300'>
        <Button onClick={handleHomeClick}>home</Button>
        <Button onClick={handleSearchClick}>search</Button>
        <Button onClick={handleCalendarSearch}>calendar</Button>
        <Button onClick={handleLogout}>logout</Button>
    </header>
}