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

        this.state = { editUserVisibility: false }
    }

    handleOptions() {
        this.setState({ editUserVisibility: true })
    }

    handleEditUserInfo(event) {
        event.preventDefault()
        try {
            const form = event.target

            const avatarInput = form["new-avatar"]
            const usernameInput = form["new-username"]
            // const newPasswordInput = form["new-password"]
            const actualPasswordInput = form["actual-password"]

            logic.editUserInfo(avatarInput.value, usernameInput.value, /*newPasswordInput.value,*/ actualPasswordInput.value, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                this.setState({ editUserVisibility: false })

                this.props.onChange(usernameInput.value)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleEditUserCancel() {
        this.setState({ editUserVisibility: false })
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
            {user.username === sessionStorage.username && <Button onClick={this.handleOptions.bind(this)}>Edit</Button>}
            {this.state.editUserVisibility && <Container className="Container--center-column">
                <Form className="Form--column" onSubmit={this.handleEditUserInfo.bind(this)}>
                    <Container>
                        <Label htmlFor="new-avatar">Avatar</Label>
                        <Input id="new-avatar" defaultValue={user.avatar} />
                    </Container>
                    <Container>
                        <Label htmlFor="new-username">Username</Label>
                        <Input id="new-username" defaultValue={user.username} />
                    </Container>
                    {/* <Container>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </Container> */}
                    <Container>
                        <Label htmlFor="actual-password">Password</Label>
                        <Input id="actual-password" type="password" required={true} />
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