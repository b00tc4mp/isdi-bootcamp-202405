import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Container from '../components/Container'

import Search from './Search'

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
        <Search />

        <Container>
            <Paragraph className="m-0 font-serif font-bold decoration-black">{name}!</Paragraph>

            <Button className="bg-white font-bold font-serif h-[30px] rounded-[8px] border-[f7bff8]" onClick={handleHomeClick}>🏠</Button>
            <Button className="bg-white font-bold font-serif h-[30px] rounded-[8px] border-[f7bff8]" onClick={handlePoniesClick}>🪅</Button>
            <Button className="bg-white font-bold font-serif h-[30px] rounded-[8px] border-[f7bff8]" onClick={handleFavsClick}>🏳️‍🌈</Button>
            <Button className="bg-white font-bold font-serif h-[30px] rounded-[8px] border-[f7bff8]" onClick={handleLogout}>Logout</Button>
        </Container>
    </header>

}

export default Header
