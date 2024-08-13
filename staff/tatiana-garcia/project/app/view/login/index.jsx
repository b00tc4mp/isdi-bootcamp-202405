import logic from '../../logic/index.js'

import Heading from '../library/Heading.jsx'
import Container from '../library/Container.jsx'
import Form from '../library/Form.jsx'
import Label from '../library/Label.jsx'
import Input from '../library/Input.jsx'
import Button from '../library/Button.jsx'
import Link from '../library/Link.jsx'

import { errors } from '../../../com/index.js'

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

    return <main>
        <Heading>Login</Heading>

        <Form onSubmit={handleLoginSubmit} className="flex-col">
            <Container>
                <Label htmlFor='username-input'>Nombre de usuario</Label>
                <Input type='text' id='username-input' name='username' placeholder='nombre de usuario' />
            </Container>

            <Container>
                <Label htmlFor='password-input'>Contraseña</Label>
                <Input type='password' id='password-input' name='password' placeholder='contraseña' />
            </Container>

            <Button type='submit'>Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>¿Eres nuevo/a? Regístrate</Link>

    </main>
}