import logic from '../logic'

import Heading from './components/Heading'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

import { errors } from '../../com/index.js'

const { NotFoundError, CredentialsError } = errors


function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    console.error(error)

                    let message = error.message

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'incorrect username or password'

                    alert(message)

                    return
                }

                onLogin()
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

    return <main className="view--login">
        <Container className="Container--login">Ponies</Container>

        <Heading className="Heading--login" level={1}>Login</Heading>

        <Form className={"Form"} onSubmit={handleLoginSubmit}>
            <Container className="Container--field">
                <Label htmlFor={"username-input"}>Username</Label>
                <Input type={"text"} id={"username-input"} name={"username"} placeholder={"username"} />
            </Container>

            <Container className="Container--field">
                <Label htmlFor={"password-input"}>Password</Label>
                <Input type={"password"} id={"password-input"} name={"password"} placeholder={"password"} />
            </Container>

            <Button className={"Button--section"} type={"submit"}>Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>

    </main>

}

export default Login