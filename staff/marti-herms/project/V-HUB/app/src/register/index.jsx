import logic from '../../logic'

import Input from '../library/Input'
import Logo from '../library/Logo'
import Container from '../library/Container'
import Form from '../library/Form'
import Button from '../library/Button'
import Link from '../library/Link'
import Checkbox from '../library/Checkbox'

import useContext from '../context'

export default function Register({ onLoginClick, onRegister }) {
    const { alert } = useContext()

    const handleRegisterSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const emailInput = form['email-input']
        const passwordInput = form['password-input']
        const rePasswordInput = form['repassword-input']
        const roleInput = form['role-input']

        const username = usernameInput.value
        const email = emailInput.value
        const password = passwordInput.value
        const rePassword = rePasswordInput.value
        const role = roleInput.value || 'regular'

        try {
            logic.registerUser(username, email, password, rePassword, role)
                .then(() => onRegister())
                .catch(error => {
                    console.error(error)

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(message)
        }
    }

    return <main className='flex flex-col w-screen h-screen dark:bg-[#1e1e1e]'>
        <Logo />
        <Container className={'flex flex-col items-center justify-center  text-white w-full h-screen'}>
            <Form className='h-full gap-4' onSubmit={handleRegisterSubmit}>
                <Input id='username-input' type='text' placeholder='Username' />
                <Input id='email-input' type='email' placeholder='Email' />
                <Input id='password-input' type='password' placeholder='Password' />
                <Input id='repassword-input' type='password' placeholder='Repeat Password' />
                <Checkbox id='role-input' value='dev' />
                <Button type='submit' className='bg-rose-500 hover:bg-rose-800'>Register</Button>
                <Link className='text-xl underline underline-offset-2 hover:text-blue-500' onClick={onLoginClick}>Login</Link>
            </Form>
        </Container>
    </main>
}