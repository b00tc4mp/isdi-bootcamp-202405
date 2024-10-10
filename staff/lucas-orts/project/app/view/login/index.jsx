import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Image from '../library/Image'

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
        <main className='flex flex-col items-center gap-4 bg-white h-screen text-black'>
            <Heading level='1' className='font-semibold text-xl'>Login</Heading>

            <Form onSubmit={handleLoginSubmit} className='flex-col justify-center items-center text-black'>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='email-input' className='font-semibold mb-1'>Email</Label>
                    <Input type='text' id='email-input' name='email' placeholder='email' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='password-input' className='font-semibold mb-1'>Password</Label>
                    <Input type='password' id='password-input' name='password' placeholder='password' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-center mt-6'>
                    <Button type='submit'>
                        <Image src='/icons/log-in.svg' alt='log-in icon' className='h-[30px] w-[30px]' />
                    </Button>
                </Container>
            </Form>

            <Paragraph className='font-semibold mt-6'>To register click the link below</Paragraph>
            <Link onClick={handleRegisterClick} className='flex items-center justify-center mt-0.2'>
                <Image src='/icons/person.svg' alt='register link icon' className='h-[30px] w-[30px]' />
            </Link>
        </main>
    </>
}