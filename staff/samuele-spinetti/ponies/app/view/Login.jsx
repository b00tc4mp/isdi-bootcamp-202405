import logic from '../logic/index.mjs'

import Link from './components/Link'
import Heading from './components/Heading'
import Input from './components/Input'
import Form from './components/Form'
import Container from './components/Container'
import Label from './components/Label'
import Button from './components/Button'


function Login({ onLogin, onRegisterClick }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)

            onLogin()
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
        <Heading>Login</Heading>

        <Container className={"box"}>

            <Form className={"form"} onSubmit={handleLoginSubmit}>
                <Container className={"form__field"}>
                    <Label htmlFor={"username-input"}>Username</Label>
                    <Input className={"form__input"} type={"text"} id={"username-input"} name={"username"} />
                </Container>

                <Container className={"form__field"}>
                    <Label htmlFor={"password-input"}>Password</Label>
                    <Input className={"form__input"} type={"password"} id={"password-input"} name={"password"} />
                </Container>

                <Button className={"form__button"} type={"submit"}>Login</Button>
            </Form>
        </Container>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>
}


export default Login