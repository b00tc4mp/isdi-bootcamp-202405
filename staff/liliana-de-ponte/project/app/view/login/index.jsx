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

    return <main >
        <Container className="flex-col items-center justify-center">
            <Image className="flex align-center h-32 w-32" src="public/+Vibes.jpg" />
        </Container>

        <Form onSubmit={handleLoginSubmit}>
            <Container className="flex-col items-center gap-4">
                <Input className="h-9 w-11/12 p-2" type="text" id="username-input" name="username" placeholder="Username"></Input>

                <Input className="h-9 w-11/12 p-2" type="password" id="password-input" name="password" placeholder="Password"></Input>

                <Button className=" flex-col items-center bg-[#050968] w-11/12" type="submit">Login</Button>
            </Container>
        </Form>

        <Container className="flex-col items-start mt-14 ml-28">
            <Paragraph>Don't have an account? <Container className="text-[#9747FF] font-bold flex justify-end mr-0"><Link onClick={handleRegisterClick}>Sign up</Link></Container></Paragraph>
        </Container>


    </main>

}