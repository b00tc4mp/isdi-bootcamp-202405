import logic from '../logic'

import Form from './components/Form'
import Heading from './components/Heading'
import Input from './components/Input'
import Label from './components/Label'
import Link from './components/Link'
import Button from './components/Button'
import Container from "./components/Container"

function Login({ onLogin, onRegisterClick }) {


    const handleLoginSubmit = event => {
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

                    alert(error.message)

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
        event.preventDefault()

        onRegisterClick()
    }

    return <main className="view">

        <Heading level="1">Login</Heading>

        <Form onSubmit={handleLoginSubmit}>
            <Container className="form__field">
                <Label htmlFor="username-input" text="Username" />
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="form__field">
                <Label htmlFor="password-input" text="Password" />
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button className="form__button" type="submit">Login</Button>
        </Form>

        <Link href={""} onClick={handleRegisterClick}>Register</Link>
    </main>
}

export default Login
