import Link from '../library/Link'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'

import logic from '../../logic'

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
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

    return <main className='w-screen h-screen flex flex-col justify-center items-center gap-2 text-base bg-custom-2'>
        <Heading className='text-white text-5xl font-sans'>Login</Heading>

        <Form className='flex-col justify-center gap-6 w-[80%] max-w-[230px]' onSubmit={handleLoginSubmit}>
            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='username-input'>Username:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='username-input' type='text' name='username' placeholder='eden, samu...' />
            </Container>

            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='password-input'>Password:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='password-input' type='password' name='password' placeholder='12345678' />
            </Container>

            <Button className='mt-[2px] w-[60%] self-center p-1 rounded shadow shadow-black bg-red-300 hover:bg-red-600' type='submit'>Login</Button>
        </Form>

        <Link onClick={onRegisterClick} text='Register' />
    </main>
}