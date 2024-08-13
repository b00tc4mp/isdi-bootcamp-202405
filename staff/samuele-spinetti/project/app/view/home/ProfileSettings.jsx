import { useState, useEffect, useContext } from 'react'

import Heading from '../library/Heading'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'
import Form from '../library/Form'

import Context from '../../Context'

import logic from '../../logic'

export default function ProfileSettings() {
    const [user, setUser] = useState(null)
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)
    const { alert } = useContext(Context)

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
        setEditPasswordVisible(false)
    }

    const handleCancelEditAvatarClick = () => setEditAvatarVisible(false)

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
        setEditAvatarVisible(false)
    }

    const handleCancelEditPasswordClick = () => setEditPasswordVisible(false)

    const handleEditPasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editOldPasswordInput = form['edit-oldPassword-input']
        const editNewPasswordInput = form['edit-newPassword-input']
        const editNewPasswordRepeatInput = form['edit-newPasswordRepeat-input']

        const oldPassword = editOldPasswordInput.value
        const newPassword = editNewPasswordInput.value
        const newPasswordRepeat = editNewPasswordRepeatInput.value

        try {
            logic.updatePassword(oldPassword, newPassword, newPasswordRepeat)
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

    return <section className="flex flex-col items-center gap-3">
        <Heading className="text-[30px]">Profile Settings</Heading>
        <Container className=" items-center justify-center" >
            <Container className="flex flex-col">
                <Image src={!user?.avatar ? "/userIcon.svg" : user.avatar} className="w-[170px] h-[170px]  bg-[#bebebe]" />
                <Button className="bg-[#ffd4ff] border-white rounded-[10px]" onClick={handleEditAvatarClick}>Edit Your Avatar</Button>
            </Container>

            <Container className="fle flex-col">
                <Heading level="2">Personal Informations</Heading>
                <Input value={user?.name} disabled />
                <Input value={user?.surname} disabled />
                <Input value={user?.username} disabled />
                <Input value={user?.email} disabled />
                <Button className="bg-[#ffd4ff] border-white rounded-[10px]" onClick={handleEditPasswordClick}>Edit Password</Button>
            </Container>
        </Container >

        {editAvatarVisible &&
            <Container className="flex flex-col content-center items-center">
                <Form className="form-edit-avatar" onSubmit={handleEditAvatarSubmit}>
                    <Label htmlFor="edit-avatar-input"></Label>
                    <Input className="border-white rounded-[20px]" id="edit-avatar-input" type="text" />

                    < Container className="flex content-center gap-2">
                        <Button className="bg-[#ffd4ff] border-white rounded-[10px]" type="submit">Save</Button>
                        <Button className="bg-[#ffd4ff] border-white rounded-[10px]" type="button" onClick={handleCancelEditAvatarClick}>Cancel</Button>
                    </Container >
                </Form >
            </Container >
        }

        {editPasswordVisible &&
            <Container className="flex flex-col content-center items-center">
                <Form className="flex flex-col items-center gap-[0.3rem]" onSubmit={handleEditPasswordSubmit}>
                    <Label htmlFor="edit-oldPassword-input"></Label>
                    <Input className="border-white rounded-[20px]" id="edit-oldPassword-input" type="password" placeholder="Old password" />
                    < Label htmlFor="edit-newPassword-input"></Label >
                    <Input className="border-white rounded-[20px]" id="edit-newPassword-input" type="password" placeholder="New password" />
                    <Label htmlFor="edit-newPasswordRepeat-input"></Label>
                    <Input className="border-white rounded-[20px]" id="edit-newPasswordRepeat-input" type="password" placeholder="Repeat new password" />

                    <Container className="flex content-center gap-4">
                        <Button className="bg-[#ffd4ff] border-white rounded-[10px]" type="submit">Save</Button>
                        <Button className="bg-[#ffd4ff] border-white rounded-[10px]" type="button" onClick={handleCancelEditPasswordClick}>Cancel</Button>
                    </Container >
                </Form >
            </Container >
        }
    </section >
}