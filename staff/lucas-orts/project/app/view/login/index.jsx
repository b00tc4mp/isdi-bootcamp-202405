import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'

import useContext from '../context'

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick, onLoginClick }) {
    console.debug('Login -> call')

    const { alert } = useContext()

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target

        const emailInput = form['email-input']
        const passwordInput = form['password-input']

        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(email, password)
                .then(() => onLogin())
                .catch(error => {
                    console.error(error)

                    let message = error.message

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'incorrect email and/or password'

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

    return <>
        <main className='flex flex-col items-center gap-4 bg-white dark:bg-black h-screen dark:text-white'>
            <Heading level='1'>Login</Heading>

            <Form onSubmit={handleLoginSubmit} className='flex-col'>
                <Container className='flex-col items-start'>
                    <Label htmlFor='email-input'>Email</Label>
                    <Input type='text' id='email-input' name='email' placeholder='email' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='password-input'>Password</Label>
                    <Input type='password' id='password-input' name='password' placeholder='password' />
                </Container>

                <Button type='submit'>Login</Button>
            </Form>

            <Link onClick={handleRegisterClick}>Register</Link>
        </main>
    </>
}