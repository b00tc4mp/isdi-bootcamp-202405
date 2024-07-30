import logic from '../../logic'

import Container from '../components/Container'
import Avatar from '../components/Avatar'
import Heading from '../components/Heading'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'

import { useState } from 'react'

const Profile = ({ user, onChange }) => {
    const [editUsernameVisibility, setEditUsernameVisibility] = useState(false)
    const [editAvatarVisibility, setEditAvatarVisibility] = useState(false)

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

            const usernameInput = form["new-username"]
            const passwordInput = form["password"]

            logic.editUserUsername(usernameInput.value, passwordInput.value, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                onChange(usernameInput.value)

                setEditUsernameVisibility(false)
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

            const avatarInput = form["new-avatar"]

            logic.editUserAvatar(avatarInput.value, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                user.avatar = avatarInput.value

                onChange(user.username)

                setEditAvatarVisibility(false)
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
        <Container className="Container--profile">
            <Avatar url={user.avatar} />
            <Heading level="3">{user.username}</Heading>
        </Container>
        <Container className="Container--profile">
            <Paragraph className="Paragraph--center">{user.posts.length + ' posts'}</Paragraph>
            <Paragraph className="Paragraph--center">{user.followers.length + ' followers'}</Paragraph>
            <Paragraph className="Paragraph--center">{user.following.length + ' followed'}</Paragraph>
        </Container>
        {user.username === logic.getUserUsername() && <Container className='Container--options'>
            <Button onClick={handleEditUsernameClick}>Edit Username</Button>
            <Button onClick={handleEditAvatarClick}>Edit Avatar</Button>
        </Container>}
        {editUsernameVisibility && <Container className="Container--center-column">
            <Form className="Form--column" onSubmit={handleEditUsername}>
                <Container>
                    <Label htmlFor="new-username">Username</Label>
                    <Input id="new-username" defaultValue={user.username} />
                </Container>
                <Container>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required={true} />
                </Container>
                <Container className="Container--actions Container--space-around">
                    <Button type="submit">Submit</Button>
                    <Button onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
        {editAvatarVisibility && <Container className="Container--center-column">
            <Form className="Form--column" onSubmit={handleEditAvatar}>
                <Container>
                    <Label htmlFor="new-avatar">Avatar</Label>
                    <Input id="new-avatar" defaultValue={user.avatar} />
                </Container>
                <Container className="Container--actions Container--space-around">
                    <Button type="submit">Submit</Button>
                    <Button onClick={handleEditUserCancel}>Cancel</Button>
                </Container>
            </Form>
        </Container>}
    </>
}

export default Profile