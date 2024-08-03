import logic from '../../logic'

import Heading from '../components/Heading'
import Container from '../components/Container'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Avatar from './Avatar'
import Form from '../components/Form'

import { useState, useEffect } from 'react'

const ProfileSettings = () => {
    const [user, setUser] = useState(null)
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)

    useEffect(() => {
        try {
            logic.getUser()
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [user])

    const handleEditAvatarClick = () => {
        setEditAvatarVisible(true)
    }

    const handleCancelEditAvatarClick = () => {
        setEditAvatarVisible(false)
    }

    const handleEditAvatarSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editAvatarInput = form['edit-avatar-input']

        const newAvatar = editAvatarInput.value

        try {
            logic.updateAvatar(newAvatar)
                .then(() => setEditAvatarVisible(false))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            logic.getUser()
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditPasswordClick = () => {
        setEditPasswordVisible(true)
    }

    const handleCancelEditPasswordClick = () => {
        setEditPasswordVisible(false)
    }

    const handleEditPasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editOldPasswordInput = form['edit-oldPassword-input']
        const editNewPasswordInput = form['edit-newPassword-input']

        const oldPassword = editOldPasswordInput.value
        const newPassword = editNewPasswordInput.value

        try {
            logic.updatePassword(oldPassword, newPassword)
                .then(() => setEditPasswordVisible(false))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section>
        < Container className={"container-edit-avatar"} >
            <Heading className={"edit-avatar-heading"}>Hello {user?.username}!</Heading>
            <Avatar url={user?.avatar} className={"container-edit-avatar__avatar"} />
            <Button className={"edit-avatar-button"} onClick={handleEditAvatarClick}>Edit Your Avatar</Button>
            <Button className={"edit-password-button"} onClick={handleEditPasswordClick}>Edit Password</Button>

            {editAvatarVisible &&
                <Container className={"container-form-avatar"}>
                    <Form className={"form-edit-avatar"} onSubmit={handleEditAvatarSubmit}>
                        <Label htmlFor={"edit-avatar-input"}></Label>
                        <Input id={"edit-avatar-input"} type={"text"} />

                        <Container className={"container-form-button"}>
                            <Button type={"submit"}>Save</Button>
                            <Button type={"button"} onClick={handleCancelEditAvatarClick}>Cancel</Button>
                        </Container>
                    </Form>
                </Container>
            }

            {editPasswordVisible &&
                <Container className={"container-form-password"}>
                    <Form className={"form-edit-password"} onSubmit={handleEditPasswordSubmit}>
                        <Label htmlFor={"edit-oldPassword-input"}></Label>
                        <Input id={"edit-oldPassword-input"} type={"password"} placeholder={"Old password"} />
                        <Label htmlFor={"edit-newPassword-input"}></Label>
                        <Input id={"edit-newPassword-input"} type={"password"} placeholder={"New Password"} />

                        <Container className={"container-password-button"}>
                            <Button type={"submit"}>Save</Button>
                            <Button type={"button"} onClick={handleCancelEditPasswordClick}>Cancel</Button>
                        </Container>
                    </Form>
                </Container>
            }
        </Container >
    </section >
}

export default ProfileSettings