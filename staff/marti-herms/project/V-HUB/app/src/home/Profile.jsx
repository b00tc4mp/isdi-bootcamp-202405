import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import logic from '../../logic'

import useContext from '../context'

import Library from './Library'

import Container from '../library/Container'
import Avatar from '../library/Avatar'
import Button from '../library/Button'
import Form from '../library/Form'
import Input from '../library/Input'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'

import defaultAvatar from '../../images/defaultAvatar.svg'

export default function Profile({ refreshStamp, onChange, onGameClick }) {
    const { alert } = useContext()

    const { userId } = useParams()

    const { sub: loggedInUserId } = extractPayloadFromToken(sessionStorage.token)

    const [editUsernameVisibility, setEditUsernameVisibility] = useState(false)
    const [editAvatarVisibility, setEditAvatarVisibility] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            logic.getUser(userId)
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [userId, refreshStamp])

    const handleEditUsername = (event) => {
        event.preventDefault()
        try {
            const form = event.target

            const usernameInput = form['new-username']

            logic.editUserUsername(usernameInput.value)
                .then(() => {
                    onChange(userId)

                    setEditUsernameVisibility(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditAvatar = (event) => {
        event.preventDefault()
        try {
            const form = event.target

            const avatarInput = form['new-avatar']

            logic.editUserAvatar(avatarInput.value)
                .then(() => {
                    user.avatar = avatarInput.value

                    onChange(userId)

                    setEditAvatarVisibility(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditUsernameClick = () => {
        setLibraryVisibility(false)
        setFavsVisibility(false)
        setdevGamesVisibility(false)
        setEditAvatarVisibility(false)

        setEditUsernameVisibility(true)
    }

    const handleEditAvatarClick = () => {
        setLibraryVisibility(false)
        setFavsVisibility(false)
        setdevGamesVisibility(false)
        setEditUsernameVisibility(false)

        setEditAvatarVisibility(true)
    }

    const handleEditUserCancel = () => {
        setEditUsernameVisibility(false)
        setEditAvatarVisibility(false)
    }

    return <>
        {user && <Container className='flex flex-row justify-center items-center my-4'>
            <Avatar url={user.avatar || defaultAvatar} className='w-20 h-20' />
            <h2 className='text-white text-4xl'>{user.username}</h2>
        </Container>}
        {user && user.id === loggedInUserId && <Container className='m-3 flex flex-col justify-center items-center gap-2 box-content'>
            <Button className='rounded bg-slate-300 h-auto text-black hover:bg-slate-500' onClick={handleEditUsernameClick}>Edit Username</Button>
            <Button className='rounded bg-slate-300 h-auto text-black hover:bg-slate-500' onClick={handleEditAvatarClick}>Edit Avatar</Button>
        </Container>}
        {editUsernameVisibility && <Container className='flex flex-col justify-center items-center'>
            <Form onSubmit={handleEditUsername}>
                <Container className='flex flex-col justify-center items-center'>
                    <Input id='new-username' placeholder='username' className='py-3' />
                </Container>
                <Container className='flex flex-row m-3 justify-around mx-10'>
                    <Button className='dark:bg-white' type='submit'>Submit</Button>
                    <Button className='dark:bg-white' onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
        {editAvatarVisibility && <Container className='flex flex-col justify-center items-center'>
            <Form onSubmit={handleEditAvatar}>
                <Container className='flex flex-col justify-center items-center'>
                    <Input id='new-avatar' placeholder='avatar' className='py-3' />
                </Container>
                <Container className='flex flex-row m-3 justify-around mx-10'>
                    <Button className='dark:bg-white' type='submit'>Submit</Button>
                    <Button className='dark:bg-white' onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
        {user && <Container>
            <Library onGameClick={onGameClick} user={user} />
        </Container>}
    </>
}