import logic from "../../logic"

import Form from "../library/Form"
import Heading from '../library/Heading'
import Input from '../library/Input'
import Label from '../library/Label'
import Link from '../library/Link'
import Button from '../library/Button'
import Container from "../library/Container"

import useContext from '../context'

export default function Register({ onRegister, onLoginClick }) {
    const { alert } = useContext()

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
                .then(() => onRegister())
                .catch(error => {
                    console.error(error)

                    alert(message)
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

    return <main className="flex flex-col items-center gap-4">
        <Heading level="1">Register</Heading>

        <Form onSubmit={handleRegisterSubmit} className="flex-col">
            <Container className="flex-col items-start">
                <Label htmlFor="name-input">Name</Label>
                <Input type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="surname-input">Surname</Label>
                <Input type="text" id="surname-input" name="surname" placeholder="surname" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="email-input">E-mail</Label>
                <Input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="password-input">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="password-repeat-input">Repeat Password</Label>
                <Input type="password" id="password-repeat-input" name="password-repeat" placeholder="repeat password" />
            </Container>


            <Button type="submit">Register</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>
}