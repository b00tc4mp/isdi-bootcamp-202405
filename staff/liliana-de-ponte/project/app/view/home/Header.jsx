import logic from '../../logic/index.js'

import { MdLogout } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { useState, useEffect } from 'react'

import Container from '../library/Container'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Search from './Search.jsx'

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

    return <header className="bg-[#050968] fixed left-0 top-0 w-full">
        <Search />

        <Container className="flex justify-between items-center">
            <Paragraph className="text-[#FFEBF4]">{name}!</Paragraph>
            <Container className=" flex justify-end items-center gap-[2rem]">
                <Button onClick={handleHomeClick}><IoHomeOutline size={22} /></Button>
                <Button onClick={handleLogout}><MdLogout size={22} /></Button>
            </Container>
        </Container>


    </header>
}