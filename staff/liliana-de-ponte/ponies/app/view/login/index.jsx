import logic from '../../logic/index.js'

import Heading from '../library/Heading.jsx'
import Form from '../library/Form.jsx'
import Label from '../library/Label.jsx'
import Input from '../library/Input.jsx'
import Button from '../library/Button.jsx'
import Link from '../library/Link.jsx'
import Container from '../library/Container.jsx'

import useContext from '../context'

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const { alert } = useContext()

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target //propiedad que permite acceder al elemento

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
        console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    return <main className=" flex flex-col items-center gap-4 text-md font-serif bg-white dark:bg-pink-900 h-screen dark:text-white">
        <Heading level="1">Login</Heading>

        <Form onSubmit={handleLoginSubmit} className="flex-col gap-[0.9rem] min-w-[80%] mt-[40]">
            <Container className="flex-col items-start" >
                <Label htmlFor="username-input">Username</Label>
                <Input className="w-11/12" type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="password-input">Password</Label>
                <Input className="w-11/12" type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button className="dark:bg-pink-900" type="submit">Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main >

}

