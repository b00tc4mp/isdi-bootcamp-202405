import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IoIosSend as SubmitIcon } from 'react-icons/io'
import { MdCancel as CancelIcon, MdOutlineEdit as EditIcon } from 'react-icons/md'
import { FaUserPen as AvatarIcon } from 'react-icons/fa6'

import logic from '../../logic'

import useContext from '../context'

import Library from './Library'

import Container from '../library/Container'
import Avatar from '../library/Avatar'
import Button from '../library/Button'
import Form from '../library/Form'
import Input from '../library/Input'

import extractPayloadFromToken from '../../util/extractPayloadFromToken.js'
import paths from '../../util/paths.js'

import defaultAvatar from '../../images/defaultAvatar.svg'

export default function Profile({ refreshStamp, onChange, onGameClick }) {
    const { alert } = useContext()

    const navigate = useNavigate()

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

    const handleEditUsernameClick = () => {
        setEditAvatarVisibility(false)

        setEditUsernameVisibility(true)
    }

    const handleEditAvatarClick = () => {
        setEditUsernameVisibility(false)

        setEditAvatarVisibility(true)
    }

    const handleEditUserCancel = () => {
        setEditUsernameVisibility(false)
        setEditAvatarVisibility(false)
    }

    const handleFollowers = () => {
        navigate(paths.followers + userId)
    }

    const handleFollowing = () => {
        navigate(paths.following + userId)
    }

    return <>
        {user && <Container className='flex flex-row justify-center items-center my-4'>
            <Avatar url={user.avatar || defaultAvatar} className='w-[7rem] h-[7rem] relative top-[5px]' />
            <h2 className='dark:text-white text-4xl'>{user.username}</h2>
        </Container>}
        {user && user.id === loggedInUserId && <Container className='m-3 flex flex-row justify-center items-center box-content'>
            <Button className='rounded-s bg-slate-300 h-auto text-black hover:bg-slate-500 p-1' onClick={handleEditAvatarClick}><AvatarIcon className='w-8 h-8' /></Button>
            <Button className='rounded-e bg-slate-300 h-auto text-black hover:bg-slate-500 p-1' onClick={handleEditUsernameClick}><EditIcon className='w-8 h-8' /></Button>
        </Container>}
        {user && <Container className='flex flex-col items-center my-2 gap-2'>
            <Button className='w-[150px] rounded bg-slate-300 h-auto text-black hover:bg-slate-500' onClick={handleFollowing}>Following</Button>
            <Button className='w-[150px] rounded bg-slate-300 h-auto text-black hover:bg-slate-500' onClick={handleFollowers}>Followers</Button>
        </Container>}
        {editUsernameVisibility && <Container className='flex flex-col justify-center items-center my-8'>
            <Form onSubmit={handleEditUsername}>
                <Container className='flex flex-col justify-center items-center'>
                    <Input id='new-username' placeholder='username' className='py-3' />
                </Container>
                <Container className='flex flex-row m-3 justify-around mx-10'>
                    <Button type='submit'><SubmitIcon className='w-8 h-8 dark:text-white' /></Button>
                    <Button onClick={handleEditUserCancel}><CancelIcon className='w-8 h-8 dark:text-white' /></Button>
                </Container>
            </Form>
        </Container>}
        {editAvatarVisibility && <Container className='flex flex-col justify-center items-center my-8'>
            <Form onSubmit={handleEditAvatar}>
                <Container className='flex flex-col justify-center items-center'>
                    <Input id='new-avatar' placeholder='avatar' className='py-3' />
                </Container>
                <Container className='flex flex-row m-3 justify-around mx-10'>
                    <Button type='submit'><SubmitIcon className='w-8 h-8 dark:text-white' /></Button>
                    <Button onClick={handleEditUserCancel}><CancelIcon className='w-8 h-8 dark:text-white' /></Button>
                </Container>
            </Form>
        </Container>}
        {user && <Container className='mt-6'>
            <Library onGameClick={onGameClick} user={user} />
        </Container>}
    </>
}