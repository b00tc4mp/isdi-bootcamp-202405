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

export default function ProfileSettings() {
    const [user, setUser] = useState({})
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editDescriptionVisible, setDescriptionVisible] = useState(false)
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

    const handleEditDescriptionClick = () => setDescriptionVisible(true)

    const handleCancelEditDescriptionClick = () => setDescriptionVisible(false)

    const handleEditDescriptionSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editDescriptionInput = form['edit-description-input']

        const newDescription = editDescriptionInput.value

        try {
            logic.updateDescription(newDescription)
                .then(() => {
                    setDescriptionVisible(false)

                    return logic.getUser(userId)
                })
                .then(user => setUser(user))
                .cathc(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error, message)
        }
    }

    return <section className='mt-[64px]'>
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
                    <Input id='edit-avatar-input' type='text' placeholder='new avatar' />
                    <Container className='flex flex-row items-center justify-center mt-2'>
                        <Button type='submit'>save</Button>
                        <Button type='reset' onClick={handleCancelEditAvatarClick}>cancel</Button>
                    </Container>
                </Form>
            </Container>}

        <Container className='ml-2 mr-2 flex flex-row items-center justify-center mt-2'>
            <Paragraph className='m-2'>{user.description}</Paragraph>
            <Button onClick={handleEditDescriptionClick}>
                <Image className='w-[20px] h-[20px]' src='./edit.png' />
            </Button>
        </Container>

        {editDescriptionVisible &&
            <Container>
                <Form onSubmit={handleEditDescriptionSubmit}>
                    <textarea className='text-[inherit] rounded-[5px] border-[none] px-[.5rem] shadow-[0_4px_8px_rgba(0,0,0,0.2)] text-black' id='edit-description-input' type='text' placeholder='new description' />
                    <Container className='flex flex-row items-center justify-center mt-2'>
                        <Button type='submit'>save</Button>
                        <Button type='reset' onClick={handleCancelEditDescriptionClick}>cancel</Button>
                    </Container>
                </Form>
            </Container>}
    </section>
}