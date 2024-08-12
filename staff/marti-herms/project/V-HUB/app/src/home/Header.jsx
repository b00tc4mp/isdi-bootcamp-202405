import { useState, useEffect } from 'react'

import useContext from '../context'

import logic from '../../logic'

import Paragraph from '../library/Paragraph'

export default function Header({ onLogoutClick }) {
    const [username, setUsername] = useState(null)

    useEffect(() => {
        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <header className='flex flex-row justify-end px-4 border border-solid border-b-black'>
        <Paragraph>{username}</Paragraph>
        <button onClick={onLogoutClick}>Logout</button>
    </header>
}