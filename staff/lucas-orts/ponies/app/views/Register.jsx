import logic from "../logic"

import Form from "./components/Form"
import Heading from './components/Heading'
import Input from './components/Input'
import Label from './components/Label'
import Link from './components/Link'
import Button from './components/Button'
import Container from "./components/Container"

function Register({ onRegister, onLoginClick }) {


    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const surNameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const surname = surNameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            alert('user successfully registered')

            onRegister()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    return <main className="view">
        <Heading level="1">Register</Heading>

        <Form onSubmit={handleRegisterSubmit}>
            <Container className="Container--column Container--column-left">
                <Label htmlFor="name-input">Name</Label>
                <Input type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="surname-input">Surname</Label>
                <Input type="text" id="surname-input" name="surname" placeholder="surname" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="email-input">Email</Label>
                <Input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="userame" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="password-input">Password</Label>
                <Input className="form__input" type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="password-repeat-input">Repeat Password</Label>
                <Input type="password" id="password-repeat-input" name="passwordrepeat" placeholder="repeat password" />
            </Container>

            <Button type="submit">Register</Button>
        </Form>

        <Link href="" onClick={handleLoginClick}>Login</Link>
    </main>
}

export default Register