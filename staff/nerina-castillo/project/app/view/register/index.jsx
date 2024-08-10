import logic from '../../../cor/logic'

import Form from '../library/Form'
import Heading from '../library/Heading'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'

export default function Register({ onRegister, onLoginClick }) {
    // TODO const {alert} = useContext()

    const handleRegisterSubmit = event => {

        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const usernameInput = form['username-input']
        const roleInput = form['role-input']
        const emailInput = form['email-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const username = usernameInput.value
        const role = roleInput.value
        const email = emailInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, username, role, email, password, passwordRepeat)
                .then(() => onRegister())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()
        onLoginClick()
    }

    return (
        <main>
            <Heading level="1">Register</Heading>

            <Form onSubmit={handleRegisterSubmit}>
                <Container>
                    <Label htmlFor='name-input'>name</Label>
                    <Input type='text' id='name-input' name='name-input' placeholder='name' />
                </Container>

                <Container>
                    <Label htmlFor='username-input'>username</Label>
                    <Input type='text' id='username-input' name='username-input' placeholder='username' />
                </Container>


                <Container>
                    <Label htmlFor='role-input'>role</Label>
                    <Input type='text' id='role-input' name='role-input' placeholder='role' />
                </Container>

                {/* <Container>
                    <Label htmlFor='role-input'>role</Label>
                    <select id='role-input' name='role-input'>
                        <option value="">-- select a role --</option>
                        <option value="user">user</option>
                        <option value="band">band</option>
                        <option value="label">label</option>
                        <option value="promoter">promoter</option>
                        <option value="venue">venue</option>
                    </select>
                </Container> */}

                <Container>
                    <Label htmlFor='email-input'>email</Label>
                    <Input type='email' id='email-input' name='email-input' placeholder='email' />
                </Container>

                <Container>
                    <Label htmlFor='password-input'>password</Label>
                    <Input type='password' id='password-input' name='password-input' placeholder='password' />
                </Container>

                <Container>
                    <Label htmlFor='password-repeat-input'>repeat password</Label>
                    <Input type='password' id='password-repeat-input' name='password-repeat-input' placeholder='repeat password' />
                </Container>

                <Button type='submit'>Register</Button>
            </Form>

            <Link onClick={handleLoginClick}>Login</Link>
        </main>
    )
}