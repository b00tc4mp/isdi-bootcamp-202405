import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import logic from '../../logic'

import useContext from '../context'

import Container from '../library/Container'
import Avatar from '../library/Avatar'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Form from '../library/Form'
import Input from '../library/Input'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'

import defaultAvatar from '../../images/defaultAvatar.svg'

export default function Profile({ refreshStamp, onChange }) {
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

    const handleEditUsernameClick = () => {
        setEditUsernameVisibility(true)
        setEditAvatarVisibility(false)
    }

    const handleEditAvatarClick = () => {
        setEditUsernameVisibility(false)
        setEditAvatarVisibility(true)
    }

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

    const handleEditUserCancel = () => {
        setEditUsernameVisibility(false)
        setEditAvatarVisibility(false)
    }

    return <>
        {user && <Container className='flex flex-row justify-center items-center'>
            <Avatar url={user.avatar || defaultAvatar} className='w-20 h-20' />
            <h2 className='text-white text-4xl'>{user.username}</h2>
        </Container>}
        {user && user.id === loggedInUserId && <Container className='m-3 flex-col justify-start flex-wrap box-content'>
            <Button className='rounded-sm bg-slate-300 min-w-40 h-6 text-black hover:bg-slate-500' onClick={handleEditUsernameClick}>Edit Username</Button>
            <Button className='rounded-sm bg-slate-300 min-w-40 h-6 text-black hover:bg-slate-500' onClick={handleEditAvatarClick}>Edit Avatar</Button>
        </Container>}
        {editUsernameVisibility && <Container className='flex-col justify-center'>
            <Form className='flex-col' onSubmit={handleEditUsername}>
                <Container>
                    <label htmlFor='new-username'>Username</label>
                    <Input id='new-username' />
                </Container>
                <Container className='flex-row m-3 justify-around'>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
        {editAvatarVisibility && <Container className='flex-col justify-center'>
            <Form className='flex-col' onSubmit={handleEditAvatar}>
                <Container>
                    <label htmlFor='new-avatar'>Avatar</label>
                    <Input id='new-avatar' />
                </Container>
                <Container className='flex-row m-3 justify-around'>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
    </>
}