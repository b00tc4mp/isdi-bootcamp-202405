import logic from '../../../logic'

import { useState, useEffect } from 'react'

import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import Container from '../../components/Container'

import Search from './Search'

export default function Header({ onHomeClick, onPoniesClick, onFavsClick, onLogout }) {
    console.debug('Header -> call')

    const [name, setName] = useState(null)

    useEffect(() => {
        console.debug('Header -> useEfect')

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

    return <header className="fixed left-0 top-0 w-full flex justify-between items-center gap-2 bg-white p-[1px] box-border shadow-[0px_1px_1px_lightgray] bg-gradient-to-r from-violet-500 to-fuchsia-500 z-40]">
        <Search />

        <Container>
            <Paragraph>{name}</Paragraph>
            <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleHomeClick}>🏯</Button>
            <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handlePoniesClick}>🦄</Button>
            <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleFavsClick}>🤩</Button>
            <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleLogout}>🚪</Button>
        </Container>
    </header>
}