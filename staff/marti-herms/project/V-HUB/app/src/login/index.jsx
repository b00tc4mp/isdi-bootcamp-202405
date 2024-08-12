import logic from '../../logic'

import Input from '../library/Input'
import VSeparator from '../library/VSeparator'
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

    return <main className='flex flex-row w-screen h-screen'>
        <Container className={'flex flex-col items-center justify-center bg-[#1e1e1e] text-white w-1/3 h-full'}>
            <img className='top-3 w-72 h-72' src='../images/logo.svg' alt='logo' />
            <h2 className='text-center text-7xl'>V-HUB</h2>
        </Container>
        <VSeparator />
        <Container className={'flex flex-col items-center justify-center bg-[#1e1e1e] text-white w-2/3 h-full'}>
            <Form className='gap-14' onSubmit={handleLoginSubmit}>
                <Input id='username-input' type='text' placeholder='Username' />
                <Input id='password-input' type='password' placeholder='Password' />
                <Button className='bg-rose-500 hover:bg-rose-800' type='submit' >Login</Button>
                <Link className='text-xl underline underline-offset-2 hover:text-blue-500' onClick={onRegisterClick}>Register</Link>
            </Form>
        </Container>
    </main>
}