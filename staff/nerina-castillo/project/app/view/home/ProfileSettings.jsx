import { useState, useEffect } from 'react'
import useContext from '../context.js'
import logic from '../../logic'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'
import Form from '../library/Form'
import Paragraph from '../library/Paragraph'
import Label from '../library/Label.jsx'

export default function ProfileSettings() {
    const [user, setUser] = useState({})
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editUsernameVisible, setEditUsernameVisible] = useState(false)
    const [editDescriptionVisible, setEditDescriptionVisible] = useState(false)
    const [editEmailVisible, setEditEmailVisible] = useState(false)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)
    const [loading, setLoadind] = useState(true)
    const { alert } = useContext()
    const userId = logic.getUserId()

    useEffect(() => {
        setLoadind(true)
        try {
            logic.getUser(userId)
                .then(user => {
                    setLoadind(false)
                    setUser(user)
                })
                .catch(error => {
                    console.lerror(error)

                    alert(error.message)
                    setLoadind(false)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
            setLoadind(false)
        }
    }, [userId, alert])

    const handleEditAvatarClick = () => setEditAvatarVisible(true)

    const handleCancelEditAvatarClick = () => setEditAvatarVisible(false)

    const handleEditAvatarSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editAvatarInput = form['edit-avatar-input']

        const newAvatar = editAvatarInput.value

        try {
            logic.updateAvatar(newAvatar)
                .then(() => {
                    setEditAvatarVisible(false)

                    return logic.getUser(userId)
                })
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

    const handleEditDescriptionClick = () => setEditDescriptionVisible(true)

    const handleCancelEditDescriptionClick = () => setEditDescriptionVisible(false)

    const handleEditDescriptionSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editDescriptionInput = form['edit-description-input']

        const newDescription = editDescriptionInput.value

        try {
            logic.updateDescription(newDescription)
                .then(() => {
                    setEditDescriptionVisible(false)

                    return logic.getUser(userId)
                })
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

    const handleEditUsernameClick = () => setEditUsernameVisible(true)

    const handleCancelEditUsernameClick = () => setEditUsernameVisible(false)

    const handleEditUsernameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editUsernameInput = form['edit-username-input']

        const newUsername = editUsernameInput.value

        try {
            logic.updateUsername(newUsername)
                .then(() => {
                    setEditUsernameVisible(false)

                    return logic.getUser(userId)
                })
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

    const handleEditEmailClick = () => setEditEmailVisible(true)

    const handleCancelEditEmailClick = () => setEditEmailVisible(false)

    const handleEditEmailSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editEmailInput = form['edit-email-input']

        const newEmail = editEmailInput.value

        try {
            logic.updateEmail(newEmail)
                .then(() => {
                    setEditEmailVisible(false)

                    return logic.getUser(userId)
                })
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

    const handleEditPasswordClick = () => setEditPasswordVisible(true)

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
                .then(() => {
                    setEditPasswordVisible(false)

                    return logic.getUser(userId)
                })
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

    return <section className='mt-[40px] mb-[60px] min-h-screen flex flex-col'>
        <Heading className='mt-6 ml-2 text-2xl font-bold'>profile settings</Heading>

        <Container className='flex flex-col items-center justify-center mt-6'>
            <Image src={!user?.avatar ? './music.png' : user.avatar} className='w-40 h-40 rounded-full clip-path-40' />
            <Button onClick={handleEditAvatarClick}>
                <Image className='w-[20px] h-[20px]' src='./edit.png' />
            </Button>
        </Container>

        {editAvatarVisible &&
            <Container>
                <Form onSubmit={handleEditAvatarSubmit}>
                    <Label htmlFor='edit-avatar-input' className='text-slate-500'>edit avatar</Label>
                    <Input id='edit-avatar-input' type='text' placeholder='new avatar' />
                    <Container className='flex flex-row items-center justify-center mt-2'>
                        <Button type='submit'>save</Button>
                        <Button type='reset' onClick={handleCancelEditAvatarClick}>cancel</Button>
                    </Container>
                </Form>
            </Container>}

        <Container className='ml-2 mr-2 flex flex-row justify-between mt-2'>
            <Paragraph className='m-2'>{user.username}</Paragraph>
            <Button onClick={handleEditUsernameClick}>
                <Image className='w-[20px] h-[20px]' src='./edit.png' />
            </Button>
        </Container>

        {editUsernameVisible &&
            <Container>
                <Form onSubmit={handleEditUsernameSubmit}>
                    <Label htmlFor='edit-username-input' className='text-slate-500'>edit username</Label>
                    <Input id='edit-username-input' type='text' placeholder='new username' />
                    <Container className='flex flex-row items-center justify-center mt-2'>
                        <Button type='submit'>save</Button>
                        <Button type='reset' onClick={handleCancelEditUsernameClick}>cancel</Button>
                    </Container>
                </Form>
            </Container>}

        <Container className='ml-2 mr-2 flex flex-row justify-between mt-2'>
            <Paragraph className='m-2'>{!user?.description ? 'add a new description' : user.description}</Paragraph>
            <Button onClick={handleEditDescriptionClick}>
                <Image className='w-[20px] h-[20px]' src='./edit.png' />
            </Button>
        </Container>

        {editDescriptionVisible &&
            <Container>
                <Form onSubmit={handleEditDescriptionSubmit}>
                    <Label htmlFor='edit-description-input' className='text-slate-500'>edit description</Label>
                    <textarea className='text-[inherit] rounded-[5px] border-[none] px-[.5rem] shadow-[0_4px_8px_rgba(0,0,0,0.2)] text-black' id='edit-description-input' type='text' placeholder='new description' />
                    <Container className='flex flex-row items-center justify-center mt-2'>
                        <Button type='submit'>save</Button>
                        <Button type='reset' onClick={handleCancelEditDescriptionClick}>cancel</Button>
                    </Container>
                </Form>
            </Container>}

        <Container className='ml-2 mr-2 flex flex-row justify-between mt-2'>
            <Paragraph className='m-2'>{user.email}</Paragraph>
            <Button onClick={handleEditEmailClick}>
                <Image className='w-[20px] h-[20px]' src='./edit.png' />
            </Button>
        </Container>

        {editEmailVisible &&
            <Container>
                <Form onSubmit={handleEditEmailSubmit}>
                    <Label htmlFor='edit-email-input' className='text-slate-500'>edit email</Label>
                    <Input id='edit-email-input' type='text' placeholder='new email' />
                    <Container className='flex flex-row items-center justify-center mt-2'>
                        <Button type='submit'>save</Button>
                        <Button type='reset' onClick={handleCancelEditEmailClick}>cancel</Button>
                    </Container>
                </Form>
            </Container>}

        <Container className='ml-2 mr-2 flex flex-row justify-between mt-2'>
            <Paragraph className='m-2'>password</Paragraph>
            <Button onClick={handleEditPasswordClick}>
                <Image className='w-[20px] h-[20px]' src='./edit.png' />
            </Button>
        </Container>

        {editPasswordVisible &&
            <Container>
                <Form onSubmit={handleEditPasswordSubmit}>
                    <Label htmlFor='edit-password-input' className='text-slate-500'>edit password</Label>
                    <Input id='edit-oldPassword-input' type='password' placeholder='old password' />
                    <Input id='edit-newPassword-input' type='password' placeholder='new password' />
                    <Input id='edit-newPasswordRepeat-input' type='password' placeholder='repeat new password' />
                    <Container className='flex flex-row items-center justify-center mt-2'>
                        <Button type='submit'>save</Button>
                        <Button type='reset' onClick={handleCancelEditPasswordClick}>cancel</Button>
                    </Container>
                </Form>
            </Container>}
    </section>
}