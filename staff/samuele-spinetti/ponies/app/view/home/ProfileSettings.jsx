import logic from '../../logic'

import Heading from '../library/Heading'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Avatar from './Avatar'
import Form from '../library/Form'

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
        < Container className={"flex flex-col items-center gap-2"} >
            <Heading className={"m-0 mt-8"}>Hello {user?.username}!</Heading>
            <Avatar url={user?.avatar} className={"w-[10rem] h-[10rem] [clip-path:circle(50%)] bg-[#bebebe]"} />
            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} onClick={handleEditAvatarClick}>Edit Your Avatar</Button>
            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} onClick={handleEditPasswordClick}>Edit Password</Button>

            {editAvatarVisible &&
                <Container className={"flex flex-col content-center items-center"}>
                    <Form className={"form-edit-avatar"} onSubmit={handleEditAvatarSubmit}>
                        <Label htmlFor={"edit-avatar-input"}></Label>
                        <Input className={"border-white rounded-[20px]"} id={"edit-avatar-input"} type={"text"} />

                        <Container className={"flex content-center gap-2"}>
                            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} type={"submit"}>Save</Button>
                            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} type={"button"} onClick={handleCancelEditAvatarClick}>Cancel</Button>
                        </Container>
                    </Form>
                </Container>
            }

            {editPasswordVisible &&
                <Container className={"flex flex-col content-center items-center"}>
                    <Form className={"flex flex-col items-center gap-[0.3rem]"} onSubmit={handleEditPasswordSubmit}>
                        <Label htmlFor={"edit-oldPassword-input"}></Label>
                        <Input className={"border-white rounded-[20px]"} id={"edit-oldPassword-input"} type={"password"} placeholder={"Old password"} />
                        <Label htmlFor={"edit-newPassword-input"}></Label>
                        <Input className={"border-white rounded-[20px]"} id={"edit-newPassword-input"} type={"password"} placeholder={"New Password"} />

                        <Container className={"flex content-center gap-4"}>
                            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} type={"submit"}>Save</Button>
                            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} type={"button"} onClick={handleCancelEditPasswordClick}>Cancel</Button>
                        </Container>
                    </Form>
                </Container>
            }
        </Container >
    </section >
}

export default ProfileSettings