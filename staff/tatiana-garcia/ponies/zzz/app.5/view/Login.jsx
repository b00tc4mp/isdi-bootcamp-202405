import logic from '../logic/index.js'

import Heading from './components/Heading'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

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
        console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    return <main className="view">
        <Heading>Login</Heading>

        <Form onSubmit={handleLoginSubmit} className="Form--column">
            <Container className="Container--column Container--column-left create-post-section__buttons" >
                <Label htmlFor="username-input">{'Username'}</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="password-input">{'Password'}</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button className='form__button' type="submit">{'Login'}</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>
}

export default Login