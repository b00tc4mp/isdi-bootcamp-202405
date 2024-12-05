import { useEffect, useState } from 'react'

import logic from '../../logic'

import Container from '../components/Container'
import Avatar from '../components/Avatar'
import Heading from '../components/Heading'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'


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
        <Container className='Container--profile'>
            <Avatar url={user && user.avatar} />
            <Heading level='3'>{user && user.username}</Heading>
        </Container>
        <Container className='Container--profile'>
            <Paragraph className='Paragraph--center'>{user && postQuantity + ' posts'}</Paragraph>
            <Paragraph className='Paragraph--center'>{user && user.followers.length + ' followers'}</Paragraph>
            <Paragraph className='Paragraph--center'>{user && user.following.length + ' followed'}</Paragraph>
        </Container>
        {user && user.id === logic.getUserId() && <Container className='Container--options'>
            <Button onClick={handleEditUsernameClick}>Edit Username</Button>
            <Button onClick={handleEditAvatarClick}>Edit Avatar</Button>
        </Container>}
        {editUsernameVisibility && <Container className='Container--center-column'>
            <Form className='Form--column' onSubmit={handleEditUsername}>
                <Container>
                    <Label htmlFor='new-username'>Username</Label>
                    <Input id='new-username' defaultValue={user && user.username} />
                </Container>
                <Container>
                    <Label htmlFor='password'>Password</Label>
                    <Input id='password' type='password' required={true} />
                </Container>
                <Container className='Container--actions Container--space-around'>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
        {editAvatarVisibility && <Container className='Container--center-column'>
            <Form className='Form--column' onSubmit={handleEditAvatar}>
                <Container>
                    <Label htmlFor='new-avatar'>Avatar</Label>
                    <Input id='new-avatar' defaultValue={user && user.avatar} />
                </Container>
                <Container className='Container--actions Container--space-around'>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
    </>
}