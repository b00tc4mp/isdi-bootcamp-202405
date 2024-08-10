import logic from '../logic'

import Heading from './components/Heading'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Button from './components/Button'
import Link from './components/Link'
import Container from './components/Container'

import { errors } from '../../com/index.js'

const { NotFoundError, CredentialsError } = errors

function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

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

    return <main className="view">
        <Heading level="1">Login</Heading>

        <Form onSubmit={handleLoginSubmit} className="Form--column">
            <Container className="Container--column Container--column-left" >
                <Label htmFor="username-input">Username</Label>
                <Input className="Input--full-width" type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="password-input">Password</Label>
                <Input className="Input--full-width" type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button className="Button--form" type="submit">Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>

}

export default Login 