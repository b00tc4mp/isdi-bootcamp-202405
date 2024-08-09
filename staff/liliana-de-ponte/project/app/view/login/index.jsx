import logic from '../../logic/index.js'

import Image from '../library/Image'
import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Link from '../library/Link'
//context

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {

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
                        message = 'incorrect username and/on password'

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

    return <main>
        {/* <Image src="public/+Vibes.jpg" /> */}

        <Form onSubmit={handleLoginSubmit} className="flex-col gap-[0.9rem]">
            <Container className="flex-col items-start">
                <Input className="w-11/12" type="text" id="username-input" name="username" placeholder="Username"></Input>
                <Input className="w-11/12" type="password" id="password-input" name="password" placeholder="Password"></Input>
            </Container>

            <Button type="submit">Login</Button>
        </Form>

        <Paragraph>Don't have an account?</Paragraph>
        <Link onClick={handleRegisterClick}>Sign up</Link>
    </main>

}