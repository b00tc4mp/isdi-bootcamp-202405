import { useState, useEffect } from 'react'

import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Image from '../library/Image'

import logic from '../../logic'
import { useNavigate } from 'react-router-dom'

export default function Header({ onLogout, onLoginClick, isAuthenticated }) {
    const [name, setName] = useState(null)

    const navigate = useNavigate()


    useEffect(() => {
        if (isAuthenticated) {
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
        } else {
            setName(null)
        }
    }, [isAuthenticated])

    const handleProfileClick = () => {
        navigate('/profile')
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

    return (
        <header className='fixed left-0 top-0 w-screen flex justify-between items-center gap-2 bg-lightGreen p-2 box-border shadow-[0px_1px_1px_lightgray] z-10'>
            <Container className='justify-between flex items-center w-full'>
                <Image src='/icons/logo.png' alt='log-in icon' className='h-[100px] w-[100px]' />
                {!isAuthenticated ? (
                    <Button onClick={onLoginClick}>
                        <Image src='/icons/log-in.svg' alt='log-in icon' className='h-[30px] w-[30px]' />
                    </Button>
                ) : (
                    <>
                        <Paragraph className="m-0 font-semibold text-lg">{name}</Paragraph>
                        <Container>
                            <Button onClick={handleProfileClick}>
                                <Image src='/icons/settings.svg' alt='settings icon' className='h-[30px] w-[30px]' />
                            </Button>
                            <Button onClick={handleLogout}>
                                <Image src='/icons/log-out.svg' alt='log-out icon' className='h-[30px] w-[30px]' />
                            </Button>
                        </Container>
                    </>
                )}
            </Container>
        </header>
    )
}
