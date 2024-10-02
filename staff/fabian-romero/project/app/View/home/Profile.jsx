import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logic from '../../logic'

import extractPayloadFromToken from '../../util/extractPayloadFromToken.js'

import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Avatar from './Avatar'
import Form from '../library/Form'
import Confirm from '../common/Confirm'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Image from '../library/Image'

export default function Profile() {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [userRole, setRole] = useState(null)
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editImageVisible, setEditImageVisible] = useState(false)
    const [editDescriptionVisible, setEditDescriptionVisible] = useState(false)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)

    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    useEffect(() => {
        reloadUserData()

    }, [])

    const reloadUserData = () => {
        try {
            logic.getUser(userId)
                .then(user => {
                    setUser(user)

                    return logic.getUserRole()
                })
                .then(role => {
                    setRole(role)
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


    const handleDeleteUserClick = () => setConfirmMessage('Delete User?')

    const handleDeleteUserAccept = () => {
        try {
            logic.deleteUserById(user.id)
                .then(() => {
                    setConfirmMessage(null)
                    navigate('/login')
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

    const handleDeleteUserCancel = () => setConfirmMessage(null)

    const handleEditDescriptionClick = () => {
        console.debug('User -> handleEditDescriptionClick')
        setEditDescriptionVisible(true)
    }

    const handleCancelEditDescriptionClick = () => {
        console.debug('User -> handleCancelEditDescriptionClick')
        setEditDescriptionVisible(false)
    }

    const handleEditDescriptionSubmit = event => {
        console.debug('User -> handleEditDescriptionSubmit')
        event.preventDefault()

        const form = event.target

        const editDescriptionInput = form['edit-description-input']

        const newDescription = editDescriptionInput.value.trim()

        try {
            logic.updateDescription(newDescription)
                .then(() => {
                    reloadUserData()
                    setEditDescriptionVisible(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            logic.getUserName()
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
                .then(() => {
                    reloadUserData()
                    setEditAvatarVisible(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            logic.getUserName()
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

    const handleEditImageClick = () => {
        setEditImageVisible(true)
    }

    const handleCancelEditImageClick = () => {
        setEditImageVisible(false)
    }

    const handleEditImageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const newImageInput = form['new-image-input']

        const newImage = newImageInput.value

        try {
            logic.updateImage(newImage)
                .then(() => {
                    reloadUserData()
                    setEditImageVisible(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            logic.getUserName()
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


    return <section className="flex flex-col items-center gap-4 mt-1 mb-12  bg-cyan-900 h-full">

        <ProfileView user={user} />

        {userRole === 'project' && (
            <>
                <section className="flex flex-col items-center gap-4 mt-1 mb-12 " role="group">
                    <Button
                        onClick={handleEditAvatarClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Edit Your Avatar
                    </Button>


                    <Button
                        onClick={handleEditImageClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Edit Your Image
                    </Button>

                    <Button
                        onClick={handleEditDescriptionClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Edit Description
                    </Button>

                    <Button
                        onClick={handleEditPasswordClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Edit Password
                    </Button>

                    <Button
                        onClick={handleDeleteUserClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Delete Profile
                    </Button>
                </section>


                {editAvatarVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-gradient-to-b from-cyan-800 via-cyan-700 to-cyan-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditAvatarSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-avatar-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Avatar URL </Label>
                            <Input
                                id="edit-avatar-input"
                                type="text"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditAvatarClick}
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editImageVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-gradient-to-b from-cyan-800 via-cyan-700 to-cyan-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditImageSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="new-image-input" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                New Image URL
                            </Label>
                            <Input
                                id="new-image-input"
                                type="text"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditImageClick}
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editPasswordVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-gradient-to-b from-cyan-800 via-cyan-700 to-cyan-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditPasswordSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-oldPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> Old Password </Label>
                            <Input
                                id="edit-oldPassword-input"
                                type="password"
                                placeholder="Old Password"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Label htmlFor="edit-newPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Password </Label>
                            <Input
                                id="edit-newPassword-input"
                                type="password"
                                placeholder="New Password"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105"> Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditPasswordClick}
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editDescriptionVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-gradient-to-b from-cyan-800 via-cyan-700 to-cyan-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditDescriptionSubmit} className="flex flex-col gap-4 mt-4">

                            <Container className="flex flex-col gap-2">
                                <Label htmlFor="edit-description-input" className="text-sm font-medium dark:text-gray-100">
                                    Description
                                </Label>

                                <Input
                                    id="edit-description-input"
                                    type="text"
                                    defaultValue={user.description}
                                    className="p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                                />
                            </Container>

                            <Container className="flex justify-center gap-4 mt-4">
                                <Button
                                    type="submit"
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105">
                                    Save
                                </Button>

                                <Button
                                    type="button"
                                    onClick={handleCancelEditDescriptionClick}
                                    className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105">
                                    Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {confirmMessage && (
                    <Confirm message={confirmMessage} onAccept={handleDeleteUserAccept} onCancel={handleDeleteUserCancel} />
                )}
            </>
        )
        }

        {
            userRole === 'investor' && (
                <>
                    <Button
                        onClick={handleEditAvatarClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Edit Your Avatar
                    </Button>

                    <Button
                        onClick={handleEditImageClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Edit Your Image
                    </Button>

                    <Button
                        onClick={handleEditPasswordClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Edit Password
                    </Button>

                    <Button
                        onClick={handleDeleteUserClick}
                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Delete Profile
                    </Button>

                    {editAvatarVisible && (
                        <Container className="flex flex-col items-center gap-4 mt-6 bg-gradient-to-b from-cyan-800 via-cyan-700 to-cyan-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                            <Form onSubmit={handleEditAvatarSubmit} className="flex flex-col w-full gap-4">
                                <Label htmlFor="edit-avatar-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Avatar URL </Label>
                                <Input
                                    id="edit-avatar-input"
                                    type="text"
                                    className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                                <Container className="flex justify-center gap-3 mt-4 w-full">
                                    <Button
                                        type="submit"
                                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Save
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleCancelEditAvatarClick}
                                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Cancel
                                    </Button>
                                </Container>
                            </Form>
                        </Container>
                    )}

                    {editImageVisible && (
                        <Container className="flex flex-col items-center gap-4 mt-6 bg-gradient-to-b from-cyan-800 via-cyan-700 to-cyan-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                            <Form onSubmit={handleEditImageSubmit} className="flex flex-col w-full gap-4">
                                <Label htmlFor="new-image-input" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    New Image URL
                                </Label>
                                <Input
                                    id="new-image-input"
                                    type="text"
                                    className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                                <Container className="flex justify-center gap-3 mt-4 w-full">
                                    <Button
                                        type="submit"
                                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Save
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleCancelEditImageClick}
                                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Cancel
                                    </Button>
                                </Container>
                            </Form>
                        </Container>
                    )}

                    {editPasswordVisible && (
                        <Container className="flex flex-col items-center gap-4 mt-6 bg-gradient-to-b from-cyan-800 via-cyan-700 to-cyan-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                            <Form onSubmit={handleEditPasswordSubmit} className="flex flex-col w-full gap-4">
                                <Label htmlFor="edit-oldPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> Old Password </Label>
                                <Input
                                    id="edit-oldPassword-input"
                                    type="password"
                                    placeholder="Old Password"
                                    className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                                <Label htmlFor="edit-newPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Password </Label>
                                <Input
                                    id="edit-newPassword-input"
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                                <Container className="flex justify-center gap-3 mt-4 w-full">
                                    <Button
                                        type="submit"
                                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105" > Save
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleCancelEditPasswordClick}
                                        className="px-2 py-1 text-xs bg-transparent text-yellow-500 border border-yellow-500 rounded-md shadow-lg transition-transform transform hover:scale-105"  > Cancel
                                    </Button>
                                </Container>
                            </Form>
                        </Container>
                    )}
                    {confirmMessage && (
                        <Confirm message={confirmMessage} onAccept={handleDeleteUserAccept} onCancel={handleDeleteUserCancel} />
                    )}

                </>
            )
        }
    </section >
}

function ProfileView({ user }) {
    if (!user) return null

    return (
        <article className="min-w-full shadow-md p-2 rounded-lg transform transition-transform duration-300 ease-in-out">
            <Container className="flex flex-row items-center gap-1">
                <Avatar url={user.avatar || 'default-avatar.png'} className="w-10 h-10" />
                <Heading level="3" className="text-sm text-orange-400 font-semibold">
                    {user.username}
                </Heading>
            </Container>

            <Image src={user.image} className="w-full rounded-md shadow-md my-2" />

            {user.role === 'project' && (
                <Container className="flex flex-col p-4 bg-gradient-to-b from-cyan-800 via-sky-800 to-cyan-800 rounded-lg bg-opacity-60">
                    <Paragraph className="text-2xl font-bold text-white mb-2 text-center">
                        {user.title}
                    </Paragraph>
                    <Paragraph className="text-xs text-white mb-1 text-center">
                        Category #: {user.category}
                    </Paragraph>
                    <Paragraph className="text-sm text-justify text-white mt-4">
                        {user.description}
                    </Paragraph>
                </Container>
            )}

            {user.role === 'investor' && (
                <Container className="flex flex-col p-4 bg-gradient-to-b from-cyan-800 via-sky-800 to-cyan-800 rounded-lg bg-opacity-60">
                    <Paragraph className="text-2xl font-bold text-white mb-2 text-center">
                        {user.title}
                    </Paragraph>
                    <Paragraph className="text-lg text-justify text-white mt-4">
                        {user.description}
                    </Paragraph>
                </Container>
            )}
        </article>
    )
}
