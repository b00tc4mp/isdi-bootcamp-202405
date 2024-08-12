import logic from '../../logic'

import Input from '../library/Input'
import Logo from '../library/Logo'
import Container from '../library/Container'
import Form from '../library/Form'
import Button from '../library/Button'
import Link from '../library/Link'

import useContext from '../context'

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
    const { alert } = useContext()

    const handleLoginSubmit = (event) => {
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

    return <main className='flex flex-col w-screen h-screen dark:bg-[#1e1e1e]'>
        <Logo />
        <Container className={'flex flex-col items-center justify-center text-white w-screen h-full'}>
            <Form className='gap-10' onSubmit={handleLoginSubmit}>
                <Input id='username-input' type='text' placeholder='Username' />
                <Input id='password-input' type='password' placeholder='Password' />
                <Button className='bg-rose-500 hover:bg-rose-800' type='submit' >Login</Button>
                <Link className='text-xl underline underline-offset-2 hover:text-blue-500' onClick={onRegisterClick}>Register</Link>
            </Form>
        </Container>
    </main>
}