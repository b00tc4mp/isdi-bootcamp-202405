import logic from '../../logic'

import Container from '../components/Container'
import Avatar from './Avatar'
import Heading from '../components/Heading'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'

import { Component } from 'react'

class Profile extends Component {
    constructor() {
        super()

        this.state = { editUsernameVisibility: false, editAvatarVisibility: false }
    }

    handleEditUsernameClick() {
        this.setState({ editUsernameVisibility: true, editAvatarVisibility: false })
    }

    handleEditAvatarClick() {
        this.setState({ editUsernameVisibility: false, editAvatarVisibility: true })
    }

    handleEditUsername(event) {
        event.preventDefault()
        try {
            const form = event.target

            const usernameInput = form["new-username"]
            const actualPasswordInput = form["actual-password"]

            logic.editUserUsername(usernameInput.value, actualPasswordInput.value, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                this.props.onChange(usernameInput.value)

                this.setState({ editUsernameVisibility: false })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleEditAvatar(event) {
        event.preventDefault()
        try {
            const form = event.target

            const avatarInput = form["new-avatar"]

            logic.editUserAvatar(avatarInput.value, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                this.props.onChange(this.props.user.username)

                this.setState({ editAvatarVisibility: false })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleEditUserCancel() {
        this.setState({ editUsernameVisibility: false, editAvatarVisibility: false })
    }

    render() {
        const { user } = this.props

        return <>
            <Container className="Container--profile">
                <Avatar url={user.avatar} />
                <Heading level="3">{user.username}</Heading>
            </Container>
            <Container className="Container--profile">
                <Paragraph className="Paragraph--center">{user.yourPosts.length + ' posts'}</Paragraph>
                <Paragraph className="Paragraph--center">{user.followers.length + ' followers'}</Paragraph>
                <Paragraph className="Paragraph--center">{user.following.length + ' followed'}</Paragraph>
            </Container>
            {user.username === sessionStorage.username && <div>
                {/* <Button onClick={this.handleEditUsernameClick.bind(this)}>Edit Username</Button> */}
                <Button onClick={this.handleEditAvatarClick.bind(this)}>Edit Avatar</Button>
            </div>}
            {/* {this.state.editUsernameVisibility && <Container className="Container--center-column">
                <Form className="Form--column" onSubmit={this.handleEditUsername.bind(this)}>
                    <Container>
                        <Label htmlFor="new-username">Username</Label>
                        <Input id="new-username" defaultValue={user.username} />
                    </Container>
                    <Container>
                        <Label htmlFor="actual-password">Password</Label>
                        <Input id="actual-password" type="password" required={true} />
                    </Container>
                    <Container className="Container--actions Container--space-around">
                        <Button type="submit">Submit</Button>
                        <Button onClick={this.handleEditUserCancel.bind(this)}>Cancel</Button>
                    </Container>
                </Form>
            </Container>} */}
            {this.state.editAvatarVisibility && <Container className="Container--center-column">
                <Form className="Form--column" onSubmit={this.handleEditAvatar.bind(this)}>
                    <Container>
                        <Label htmlFor="new-avatar">Avatar</Label>
                        <Input id="new-avatar" defaultValue={user.avatar} />
                    </Container>
                    <Container className="Container--actions Container--space-around">
                        <Button type="submit">Submit</Button>
                        <Button onClick={this.handleEditUserCancel.bind(this)}>Cancel</Button>
                    </Container>
                </Form>
            </Container>}
        </>
    }
}

export default Profile