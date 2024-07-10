import logic from "../../logic/index.mjs"

import Container from "../components/Container"
import Avatar from "./Avatar"
import Heading from "../components/Heading"
import Paragraph from "../components/Paragraph"
import Button from "../components/Button"
import Form from "../components/Form"
import Label from "../components/Label"
import Input from "../components/Input"

const PASSWORD_REGEX = /^\w{8,}$/;

const { Component } = React;

class Profile extends Component {
    constructor() {
        super();

        this.state = { editUserVisibility: false }
    }

    handleOptions() {
        this.setState({ editUserVisibility: true });
    }

    handleEditUser() {
        this.setState({ editUserVisibility: false })
    }

    handleEditUserCancel() {
        this.setState({ editUserVisibility: false })
    }

    render() {
        const username = this.props.username;

        const avatar = logic.getUserAvatar(username);

        return <>
            <Container className="Container--profile">
                <Avatar url={avatar} />
                <Heading level="3">{username}</Heading>
            </Container>
            <Container className="Container--profile">
                <Paragraph>{logic.getUserPostNumber(username) + ' posts'}</Paragraph>
                <Paragraph>{logic.getUserFollowers(username).length + ' followers'}</Paragraph>
                <Paragraph>{logic.getUserFollowed(username).length + ' followed'}</Paragraph>
            </Container>
            {username === sessionStorage.username && <Button onClick={this.handleOptions.bind(this)}>Edit</Button>}
            {this.state.editUserVisibility && <Container className="Container--center-column">
                <Form className="Form--column" onSubmit={this.handleEditUser.bind(this)}>
                    <Container>
                        <Label htmlFor="new-avatar">Avatar</Label>
                        <Input id="new-avatar" defaultValue={avatar} />
                    </Container>
                    <Container>
                        <Label htmlFor="new-username">Username</Label>
                        <Input id="new-username" defaultValue={username} />
                    </Container>
                    <Container>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </Container>
                    <Container>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" pattern={PASSWORD_REGEX} required={true} />
                    </Container>
                </Form>
                <Container className="Container--actions">
                    <Button type="submit">Submit</Button>
                    <Button onClick={this.handleEditUserCancel.bind(this)}>Cancel</Button>
                </Container>
            </Container>}
        </>
    }
}

export default Profile