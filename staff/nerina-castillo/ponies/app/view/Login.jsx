import logic from '../logic/index'

import Button from './components/Button'
import Input from './components/Input'
import Link from './components/Link'
import Label from './components/Label'
import Form from './components/Form'
import Heading from './components/Heading'
import Container from './components/Container'



function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const handleRegisterClick = (event) => {
        console.debug('Login -> handleRegisterClick')
        event.preventDefault()

        onRegisterClick()
    }

    const handleLoginSubmit = (event) => {
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