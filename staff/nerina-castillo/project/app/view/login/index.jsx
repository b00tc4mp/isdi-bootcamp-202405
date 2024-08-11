import useContext from '../context.js'

import logic from '../../logic/index'

import Link from '../library/Link'
import Heading from '../library/Heading'
import Input from '../library/Input'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Button from '../library/Button'

import { errors } from '../../../com/index.js'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
    const { alert } = useContext()

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
                        message = 'incorrect username or password'

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
        <Heading level='1'>Login</Heading>

        <Form onSubmit={handleLoginSubmit}>
            <Container className='bg-green-400'>
                <Label htmlFor='username-input'>username</Label>
                <Input type='text' id='username-input' name='username-input'></Input>
            </Container>

            <Container>
                <Label htmlFor='password-input'>password</Label>
                <Input type='password' id='password-input' name='password-input'></Input>
            </Container>

            <Button type='submit'>Login</Button>
        </Form>

        <Link href='' onClick={handleRegisterClick}>I haven't an account</Link>
    </main>
}