import logic from '../../logic'

import Heading from '../components/Heading'
import Container from '../components/Container'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Avatar from './Avatar'
import Form from '../components/Form'

import { Component } from 'react'

class ProfileSettings extends Component {
    constructor() {
        super()

        this.state = { user: null, editAvatarVisible: false, editPasswordVisible: false }
    }

    componentDidMount() {
        try {
            logic.getUser((error, user) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ user })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleEditAvatarClick() {
        this.setState({ editAvatarVisible: true })
    }

    handleCancelEditAvatarClick() {
        this.setState({ editAvatarVisible: false })
    }

    handleEditAvatarSubmit(event) {
        event.preventDefault()

        const form = event.target

        const editAvatarInput = form['edit-avatar-input']

        const newAvatar = editAvatarInput.value

        try {
            logic.updateAvatar(newAvatar, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ editAvatarVisible: false })

                logic.getUser((error, user) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.setState({ user })
                })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleEditPasswordClick() {
        this.setState({ editPasswordVisible: true })
    }

    handleCancelEditPasswordClick() {
        this.setState({ editPasswordVisible: false })
    }

    handleEditPasswordSubmit(event) {
        event.preventDefault()

        const form = event.target

        const editOldPasswordInput = form['edit-oldPassword-input']
        const editNewPasswordInput = form['edit-newPassword-input']

        const oldPassword = editOldPasswordInput.value
        const newPassword = editNewPasswordInput.value

        try {
            logic.updatePassword(oldPassword, newPassword, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ editPasswordVisible: false })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <section>
            <Container className={"container-edit-avatar"}>
                <Heading className={"edit-avatar-heading"}>Hello {this.state.user?.username}!</Heading>
                <Avatar url={this.state.user?.avatar} className={"container-edit-avatar__avatar"} />
                <Button className={"edit-avatar-button"} onClick={this.handleEditAvatarClick.bind(this)}>Edit Your Avatar</Button>
                <Button className={"edit-password-button"} onClick={this.handleEditPasswordClick.bind(this)}>Edit Password</Button>

                {this.state.editAvatarVisible &&
                    <Container className={"container-form-avatar"}>
                        <Form className={"form-edit-avatar"} onSubmit={this.handleEditAvatarSubmit.bind(this)}>
                            <Label htmlFor={"edit-avatar-input"}></Label>
                            <Input id={"edit-avatar-input"} type={"text"} />

                            <Container className={"container-form-button"}>
                                <Button type={"submit"}>Save</Button>
                                <Button type={"button"} onClick={this.handleCancelEditAvatarClick.bind(this)}>Cancel</Button>
                            </Container>
                        </Form>
                    </Container>
                }

                {this.state.editPasswordVisible &&
                    <Container className={"container-form-password"}>
                        <Form className={"form-edit-password"} onSubmit={this.handleEditPasswordSubmit.bind(this)}>
                            <Label htmlFor={"edit-oldPassword-input"}></Label>
                            <Input id={"edit-oldPassword-input"} type={"password"} placeholder={"Old password"} />
                            <Label htmlFor={"edit-newPassword-input"}></Label>
                            <Input id={"edit-newPassword-input"} type={"password"} placeholder={"New Password"} />

                            <Container className={"container-password-button"}>
                                <Button type={"submit"}>Save</Button>
                                <Button type={"button"} onClick={this.handleCancelEditPasswordClick.bind(this)}>Cancel</Button>
                            </Container>
                        </Form>
                    </Container>
                }
            </Container>
        </section>
    }
}

export default ProfileSettings