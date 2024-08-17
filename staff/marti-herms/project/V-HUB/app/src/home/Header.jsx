import { useState, useEffect } from 'react'

import logic from '../../logic'

import useContext from '../context'

import Paragraph from '../library/Paragraph'
import Avatar from '../library/Avatar'

import defaultAvatar from '../../images/defaultAvatar.svg'

export default function Header({ onLogoutClick, onProfileClick }) {
    const { alert } = useContext()

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
    }, [])


    return <header className='fixed top-0 left-0 w-screen bg-slate-700 z-10 flex flex-row justify-end items-center px-3 border-b border-solid border-b-black'>
        <button className='flex flex-row items-center' onClick={onProfileClick}>
            <Avatar url={avatar || defaultAvatar} />
            <Paragraph>{username}</Paragraph>
        </button>
        <button className='bg-white rounded box-content h-5 pt-1/2 pb-1 px-1 hover:bg-slate-500 active:bg-slate-500' onClick={onLogoutClick}>Logout</button>
    </header>
}