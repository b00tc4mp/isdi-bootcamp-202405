import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack as ArrowBackButton, IoMdContrast as ThemeIcon } from 'react-icons/io'
import { IoLogOutOutline as LogoutButton } from 'react-icons/io5'

import logic from '../../logic'

import useContext from '../context'

import Paragraph from '../library/Paragraph'
import Avatar from '../library/Avatar'
import Button from '../library/Button'
import Container from '../library/Container'

import defaultAvatar from '../../images/defaultAvatar.svg'

export default function Header({ onLogoutClick, onProfileClick, refreshStamp }) {
    const { alert } = useContext()
    const { theme, setTheme } = useContext()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        try {
            logic.getUserUsername()
                .then(username => {
                    setUsername(username)

                    return logic.getUserAvatar()
                })
                .then(avatar => setAvatar(avatar))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [refreshStamp])

    const handleBackButton = () => {
        navigate(-1)
    }

    const handleSwitchTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return <header className='fixed top-0 left-0 w-screen h-[60px] bg-gray-600 dark:bg-slate-700 z-10 flex flex-row justify-between items-center px-3 dark:border-b dark:border-solid dark:border-b-black shadow-[0px_1px_1px_gray]'>
        <Button onClick={handleBackButton}><ArrowBackButton className='w-6 h-6 dark:text-white' /></Button>
        <Button onClick={handleSwitchTheme}><ThemeIcon className='w-6 h-6 dark:text-white' /></Button>
        <Container className='flex flex-row justify-center items-center'>
            <Button className='flex flex-row items-center' onClick={onProfileClick}>
                <Avatar className='relative top-[2px]' url={avatar || defaultAvatar} />
                <Paragraph className='relative font-bold text-xl top-[-1px]'>{username}</Paragraph>
            </Button>
            <Button onClick={onLogoutClick}><LogoutButton className='w-9 h-9 dark:text-white' /></Button>
        </Container>
    </header>
}