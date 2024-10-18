import logic from '../../logic'

import Form from '../library/Form'
import Heading from '../library/Heading'
import Input from '../library/Input'
import Label from '../library/Label'
import Link from '../library/Link'
import Button from '../library/Button'
import Container from "../library/Container"

import useContext from '../context'

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {

    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)
                .then(() => onLogin())
                .catch(error => {
                    console.error(error)

                    let message = error.message

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'incorrect username and/or password'

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    return <main className="flex flex-col items-center gap-4 bg-white dark:bg-black h-screen dark:text-white">

        <Heading level="1">Login</Heading>

        <Form onSubmit={handleLoginSubmit}>
            <Container className="flex-col items-start">
                <Label htmlFor="username-input" text="Username" />
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="password-input" text="Password" />
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button type="submit">Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>
}