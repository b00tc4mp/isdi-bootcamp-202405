import { useState, useEffect } from 'react'

import Heading from '../library/Heading'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'
import Form from '../library/Form'

import useContext from '../context.js'

import logic from '../../logic'

export default function ProfileSettings() {
    const [user, setUser] = useState(null)
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)
    const { alert } = useContext()

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
    }, [])

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
        <Heading className="text-[30px] items-center font-semibold mt-3">Profile Settings</Heading>
        <Container className=" items-center justify-center" >
            <Container className="flex flex-col items-center gap-3">
                <Image src={!user?.avatar ? "/profileIcon.svg" : user.avatar} className="w-[170px] h-[170px] rounded-xl" />
                <Button className="border border-gray-600 rounded-xl w-36 h-10 bg-gradient-to-br text-gray-600 font-bold" onClick={handleEditAvatarClick}>Edit Your Avatar</Button>
            </Container>

            {editAvatarVisible &&
                <Container className="flex flex-col content-center items-center">
                    <Form className="flex flex-col items-center gap-[0.3rem]" onSubmit={handleEditAvatarSubmit}>
                        <Input className="border-black rounded-[20px] text-center mt-2" id="edit-avatar-input" type="text" placeholder="New avatar" />

                        < Container className="flex items-center gap-2">
                            <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br text-gray-600 font-bold" type="submit">Save</Button>
                            <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br text-gray-600 font-bold" type="button" onClick={handleCancelEditAvatarClick}>Cancel</Button>
                        </Container >
                    </Form >
                </Container >}

            <Container className="flex flex-col gap-1">
                <Heading level="2" className="font-medium text-xl text-center mt-5">Personal Informations</Heading>
                <Input className="text-center" value={user?.name} disabled />
                <Input className="text-center" value={user?.surname} disabled />
                <Input className="text-center" value={user?.username} disabled />
                <Input className="text-center" value={user?.email} disabled />
            </Container>
        </Container >

        <Button className="border border-gray-600 rounded-xl w-36 h-10 bg-gradient-to-br text-gray-600 font-bold mt-2" onClick={handleEditPasswordClick}>Edit Password</Button>
        {editPasswordVisible &&
            <Container className="flex flex-col content-center items-center mb-8 gap-3">
                <Form className="flex flex-col items-center gap-2" onSubmit={handleEditPasswordSubmit}>
                    <Input className="border-gray-600 rounded-[15px] text-center" id="edit-oldPassword-input" type="password" placeholder="Old password" />
                    <Input className="border-gray-600 rounded-[15px] text-center" id="edit-newPassword-input" type="password" placeholder="New password" />
                    <Input className="border-gray-600 rounded-[15px] text-center" id="edit-newPasswordRepeat-input" type="password" placeholder="Repeat new password" />

                    <Container className="flex content-center gap-4">
                        <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br text-gray-600 font-bold" type="submit">Save</Button>
                        <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br text-gray-600 font-bold" type="button" onClick={handleCancelEditPasswordClick}>Cancel</Button>
                    </Container >
                </Form >
            </Container >}
    </section >
}