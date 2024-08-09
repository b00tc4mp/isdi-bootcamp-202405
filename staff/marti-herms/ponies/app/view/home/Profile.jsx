import { useEffect, useState } from 'react'

import logic from '../../logic'
import Avatar from './Avatar'

import Container from '../library/Container'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'


export default function Profile({ userId, postQuantity, refreshStamp, onChange }) {
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
            const passwordInput = form['password']

            logic.editUserUsername(usernameInput.value, passwordInput.value)
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
        <Container className='flex-row items-center'>
            <Avatar url={user && user.avatar} className='w-20 h-20' />
            <Heading level='3'>{user && user.username}</Heading>
        </Container>
        <Container className='flex-row items-center'>
            <Paragraph className='text-center dark:text-white'>{user && postQuantity + ' posts'}</Paragraph>
            <Paragraph className='text-center dark:text-white'>{user && user.followers.length + ' followers'}</Paragraph>
            <Paragraph className='text-center dark:text-white'>{user && user.following.length + ' followed'}</Paragraph>
        </Container>
        {user && user.id === logic.getUserId() && <Container className='m-3 flex-col justify-start flex-wrap box-content'>
            <Button className='rounded-sm bg-slate-300 min-w-40 h-6 text-black hover:bg-slate-500' onClick={handleEditUsernameClick}>Edit Username</Button>
            <Button className='rounded-sm bg-slate-300 min-w-40 h-6 text-black hover:bg-slate-500' onClick={handleEditAvatarClick}>Edit Avatar</Button>
        </Container>}
        {editUsernameVisibility && <Container className='flex-col justify-center'>
            <Form className='flex-col' onSubmit={handleEditUsername}>
                <Container>
                    <Label htmlFor='new-username'>Username</Label>
                    <Input id='new-username' defaultValue={user && user.username} />
                </Container>
                <Container>
                    <Label htmlFor='password'>Password</Label>
                    <Input id='password' type='password' required={true} />
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
                    <Label htmlFor='new-avatar'>Avatar</Label>
                    <Input id='new-avatar' defaultValue={user && user.avatar} />
                </Container>
                <Container className='flex-row m-3 justify-around'>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
    </>
}