import logic from '../logic/index.js'

import Heading from './components/Heading'
import Paragraph from './components/Paragraph'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

import { errors } from 'com'

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
        <Container className='Container--center'>
            <Heading level="1">Login</Heading>
        </Container>

        <Container className='Container--center'>
            <Paragraph className='Paragraph--center' >How <span className='Ponie--font'>ponie</span> feel today?</Paragraph>
        </Container>

        <Form onSubmit={handleLoginSubmit}>
            <Container className="Container--column">
                <Label htmlFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="Container--column">
                <Label htmlFor="password-input">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className='Container--right'>
                <Paragraph className='Paragraph--weight600'>Forgot your password?</Paragraph>
            </Container>

            <Container className='Container--buttons--center'>
                <Button className="Button" type="submit">Login</Button>

                <Button className="Button--reverse">
                    <Link className='a--reverse' onClick={handleRegisterClick}>Register</Link>
                </Button>
            </Container>
        </Form>

        <Container className='Container--center Container--column'>
            <Container className='Container--center'>
                <Paragraph className='Paragraph--weight600'>or Login with</Paragraph>
            </Container>

            <Container className='Container--center'>
                <img className="Social-network" src="img/icon set/social media.png" alt="social-network" />
            </Container>
        </Container>
    </main >

}

export default Login