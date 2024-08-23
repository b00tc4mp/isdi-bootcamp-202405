import { useState, useEffect } from 'react'
import logic from '../../logic'
import Button from '../library/Button'
import Image from '../library/Image'

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

    return <header className='fixed start-0 top-0 w-full flex justify-around py-4 px-0 z-10 bg-slate-800 text-slate-300 border-b border-slate-300'>
        <Button onClick={handleHomeClick}>
            <Image src='./home.png' className='w-[30px] h-[30px]' />
        </Button>
        <Button onClick={handleSearchClick}>
            <Image src='./search.png' className='w-[30px] h-[30px]' />
        </Button>
        <Button onClick={handleCalendarSearch}>
            <Image src='./calendar.png' className='w-[30px] h-[30px]' />
        </Button>
        <Button onClick={handleLogout}>
            <Image src='./logout.png' className='w-[30px] h-[30px]' />
        </Button>
    </header>
}