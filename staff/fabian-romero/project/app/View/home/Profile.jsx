import { useState, useEffect } from 'react'

import logic from '../../logic'

import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Avatar from './Avatar'
import Form from '../library/Form'
import Confirm from '../common/Confirm'

export default function Profile() {

    const [user, setUser] = useState(null)
    const [userRole, setRole] = useState(null)
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editImageVisible, setEditImageVisible] = useState(false)
    const [editDescriptionVisible, setEditDescriptionVisible] = useState(false)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)


    useEffect(() => {
        try {
            logic.getUserName()
                .then(user => {
                    setUser(user)

                    return logic.getUserRole();
                })
                .then(role => {
                    setRole(role)
                    if (role === 'project' || role === 'investor') {
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }, [])

    const handleDeleteUserClick = () => setConfirmMessage('Delete User?')

    const handleDeleteUserAccept = () => {
        try {
            logic.deleteUserById(user.id)
                .then(() => onDeleteUserById())
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

        const newDescription = editDescriptionInput.value

        try {
            logic.updateDescription(newDescription)
                .then(() => {
                    setEditDescriptionVisible(false)
                    onDescriptionEdited()
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
        setEditAvatarVisible(true)
    }

    const handleCancelEditImageClick = () => {
        setEditAvatarVisible(false)
    }

    const handleEditImageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const newImageInput = form['new-image-input']

        const newImage = newImageInput.value

        try {
            logic.updateImage(newImage)
                .then(() => setEditImageVisible(false))
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


    return <section className="w-full bg-gradient-to-t from-white via-cyan-50 to-cyan-100 dark:bg-black dark:bg-opacity-90 dark:text-white p-6 box-border">

        {userRole === 'project' && (
            <>
                <Button
                    onClick={handleEditAvatarClick}
                    className="px-5 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Edit Your Avatar
                </Button>

                <Button
                    onClick={handleEditImageClick}
                    className="px-5 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Edit Your Image
                </Button>

                <Button
                    onClick={handleEditDescriptionSubmit}
                    className="px-5 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Edit Description
                </Button>

                <Button
                    onClick={handleEditPasswordClick}
                    className="px-5 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Edit Password
                </Button>

                <Button
                    onClick={handleDeleteUserClick}
                    className="px-5 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Delete Profile
                </Button>

                {editAvatarVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditAvatarSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-avatar-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Avatar URL </Label>
                            <Input
                                id="edit-avatar-input"
                                type="text"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditAvatarClick}
                                    className="px-4 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editImageVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditImageSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-avatar-input" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                New Image URL
                            </Label>
                            <Input
                                id="edit-avatar-input"
                                type="text"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditImageClick}
                                    className="px-4 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editPasswordVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditPasswordSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-oldPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> Old Password </Label>
                            <Input
                                id="edit-oldPassword-input"
                                type="password"
                                placeholder="Old Password"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Label htmlFor="edit-newPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Password </Label>
                            <Input
                                id="edit-newPassword-input"
                                type="password"
                                placeholder="New Password"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600"> Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditPasswordClick}
                                    className="px-4 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editDescriptionVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditDescriptionClick} className="flex flex-col gap-4 mt-4">

                            <Container className="flex flex-col gap-2">
                                <Label htmlFor="edit-description-input" className="text-sm font-medium dark:text-gray-100">
                                    Description
                                </Label>

                                <Input
                                    id="edit-description-input"
                                    type="text"
                                    defaultValue={user.description}
                                    className="p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                                />
                            </Container>

                            <Container className="flex justify-center gap-4 mt-4">
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-md transition-transform transform hover:scale-95 hover:bg-cyan-600"
                                >
                                    Save
                                </Button>

                                <Button
                                    type="button"
                                    onClick={handleCancelEditDescriptionClick}
                                    className="px-4 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-md transition-transform transform hover:scale-95 hover:bg-violet-600"
                                >
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
        )}

        {userRole === 'investor' && (
            <>
                <Button
                    onClick={handleEditAvatarClick}
                    className="px-5 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Edit Your Avatar
                </Button>

                <Button
                    onClick={handleEditImageClick}
                    className="px-5 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Edit Your Image
                </Button>

                <Button
                    onClick={handleEditPasswordClick}
                    className="px-5 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Edit Password
                </Button>

                <Button
                    onClick={handleDeleteUserClick}
                    className="px-5 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Delete Profile
                </Button>

                {editAvatarVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditAvatarSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-avatar-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Avatar URL </Label>
                            <Input
                                id="edit-avatar-input"
                                type="text"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditAvatarClick}
                                    className="px-4 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editImageVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditImageSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-avatar-input" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                New Image URL
                            </Label>
                            <Input
                                id="edit-avatar-input"
                                type="text"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600" > Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditImageClick}
                                    className="px-4 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}

                {editPasswordVisible && (
                    <Container className="flex flex-col items-center gap-4 mt-6 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-sm">
                        <Form onSubmit={handleEditPasswordSubmit} className="flex flex-col w-full gap-4">
                            <Label htmlFor="edit-oldPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> Old Password </Label>
                            <Input
                                id="edit-oldPassword-input"
                                type="password"
                                placeholder="Old Password"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Label htmlFor="edit-newPassword-input" className="text-sm font-medium text-gray-900 dark:text-gray-100"> New Password </Label>
                            <Input
                                id="edit-newPassword-input"
                                type="password"
                                placeholder="New Password"
                                className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-400" />

                            <Container className="flex justify-center gap-3 mt-4 w-full">
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-600"> Save
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelEditPasswordClick}
                                    className="px-4 py-2 text-sm bg-violet-500 text-white border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-violet-600" > Cancel
                                </Button>
                            </Container>
                        </Form>
                    </Container>
                )}
                {confirmMessage && (
                    <Confirm message={confirmMessage} onAccept={handleDeleteUserAccept} onCancel={handleDeleteUserCancel} />
                )}

            </>
        )}
    </section>
}
